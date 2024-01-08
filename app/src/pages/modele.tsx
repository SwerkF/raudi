import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModelesList = () => {
    const [modeles, setModeles] = useState<any[]>([]);
    const [recherche, setRecherche] = useState('');
    const [tri, setTri] = useState<string>('nom');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/modele')
            .then(response => {
                setModeles(response.data); // Pas de limite ici, on gère la limite après le tri et la recherche
            })
            .catch(error => console.log(error));
    }, []);

    const trierModeles = (modeles: any, critere: any) => {
        return [...modeles].sort((a, b) => {
            if (critere === 'nom') {
                return a[critere].localeCompare(b[critere]);
            } else if (critere === 'id') {
                return a[critere] - b[critere];
            }
        });
    };

    const modelesFiltres = trierModeles(modeles, tri)
        .filter(modele =>
            modele.nom.toLowerCase().includes(recherche.toLowerCase()) ||
            modele.id.toString().includes(recherche)
        )
        .slice(0, 10); // Limite à 10 modèles après le tri et la recherche

    const voirDetails = (id: any) => {
        navigate(`/modele/${id}`);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Liste des Modèles</h2>
            <div className="mb-4 text-center">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Rechercher un modèle..."
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                />
                <button className="btn btn-secondary mr-2" onClick={() => setTri('nom')}>Trier par Nom</button>
                <button className="btn btn-secondary" onClick={() => setTri('id')}>Trier par ID</button>
            </div>
            <div className="row">
                {modelesFiltres.map(modele => (
                    <div className="col-md-4 mb-4" key={modele.id}>
                        <div className="card h-100">
                            <img src={"http://localhost:3000/src/"+modele.image} alt={modele.nom} className="card-img-top" />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{modele.nom}</h5>
                                <p className="card-text">{modele.description}</p>
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

export default ModelesList;
