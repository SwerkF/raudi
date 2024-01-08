import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModelesList = () => {
    const [modeles, setModeles] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/modele')
            .then(response => {
                setModeles(response.data.slice(0, 10)); // Limite à 10 modèles
            })
            .catch(error => console.log(error));
    }, []);

    const voirDetails = (id) => {
        navigate(`/modele/${id}`);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Bienvenue chez Raudi</h1>
            <p className="text-center mb-4">
                Raudi est une marque innovante de voitures, offrant une gamme de modèles modernes et élégants. Découvrez nos derniers modèles et leurs caractéristiques uniques ci-dessous.
            </p>
            <div className="row">
                {modeles.map(modele => (
                    <div className="col-md-4 mb-4" key={modele.id}>
                        <div className="card">
                            <div className="card-header">
                                <img src={"http://localhost:3000/src/" + modele.image} alt={modele.nom} className="card-img-top" />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{modele.nom}</h5>
                                <p className="card-text">{modele.description}</p>
                                <p className="card-text fw-bold">{modele.prix} €</p>
                                <button className="btn btn-primary" onClick={() => voirDetails(modele.id)}>Voir les détails</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModelesList;
