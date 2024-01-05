import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModelesList = () => {
    const [modeles, setModeles] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/modele')
            .then(response => {
                let modelesData = response.data.slice(0, 10); // Limite à 10 modèles
                setModeles(modelesData);
            })
            .catch(error => console.log(error));
    }, []);

    const voirDetails = (id) => {
        navigate(`/modele/${id}`); // Redirige vers la page de détail
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Liste des Modèles</h2>
            <div className="row">
                {modeles.map(modele => (
                    <div className="col-md-4 mb-4" key={modele.id}>
                        <div className="card h-100">
                            <img src={modele.image} alt={modele.nom} className="card-img-top" />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{modele.nom}</h5>
                                <p className="card-text">{modele.description}</p>
                                <p className="card-text"><small className="text-muted">ID: {modele.id}</small></p>
                                <p className="card-text"><small className="text-muted">Prix: {modele.prix} €</small></p>
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
