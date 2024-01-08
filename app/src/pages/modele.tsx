import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Modele = () => {
    const [modeles, setModeles] = useState<any[]>([]);
    const [recherche, setRecherche] = useState('');
    const [tri, setTri] = useState<string>('nom');
    const [moteurs, setMoteurs] = useState<string[]>([]);
    const [moteurSelectionne, setMoteurSelectionne] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/modele')
            .then(response => {
                setModeles(response.data);
            })
            .catch(error => console.log(error));

        axios.get('http://localhost:3000/api/moteurs')
            .then(response => {
                setMoteurs(response.data.map((moteur: any) => moteur.type));
            })
            .catch(error => console.log(error));
    }, []);

    const trierModeles = (modeles:any, critere:any) => {
        return [...modeles].sort((a, b) => {
            if (critere === 'nom') {
                return a[critere].localeCompare(b[critere]);
            } else if (critere === 'prix' || critere === 'vitesse_max') {
                return parseFloat(b[critere]) - parseFloat(a[critere]);
            }
        });
    };

    const filtrerParMoteur = (modeles:any, moteurSelectionne:any) => {
        return moteurSelectionne ? modeles.filter((modele:any) => modele.moteur === moteurSelectionne) : modeles;
    };

    const modelesFiltres = filtrerParMoteur(
        trierModeles(modeles, tri)
            .filter(modele =>
                modele.nom.toLowerCase().includes(recherche.toLowerCase())
            ),
        moteurSelectionne
    ).slice(0, 10);

    const voirDetails = (id:number) => {
        navigate(`/modele/${id}`);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Liste des Modèles</h2>
            <div className="mb-4 text-center">
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Rechercher un modèle..."
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                />
                <button className="btn btn-secondary me-2" onClick={() => setTri('nom')}>Trier par Nom</button>
                <button className="btn btn-secondary me-2" onClick={() => setTri('prix')}>Trier par Prix</button>
                <button className="btn btn-secondary me-2" onClick={() => setTri('vitesse_max')}>Trier par Vitesse</button>
            </div>
            <div className="row">
                {modelesFiltres.map((modele:any) => (
                    <div className="col-md-4 mb-4" key={modele.id}>
                        <div className="card h-100">
                            <img src={"http://localhost:3000/src/"+modele.image} alt={modele.nom} style={{
                                width: "100%",
                                height: "10vw",
                                objectFit: "cover"
                            
                            }} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{modele.nom}</h5>
                                <p className="card-text">{modele.description}</p>
                                <p className="card-text"><strong>Prix : {modele.prix} €</strong></p>
                                <p className="card-text"><strong>Vitesse Max : {modele.vitesse_max} km/h</strong></p>
                                <button className="btn btn-primary mt-auto" onClick={() => voirDetails(modele.id)}>
                                    Voir Détails
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Modele;