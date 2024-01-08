import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModeleDetail = () => {
    const [modele, setModele] = useState<any>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/modele/${id}`)
            .then(response => {
                setModele(response.data);
            })
            .catch(error => console.log(error));
    }, [id]);

    const retourner = () => {
        navigate('/modele/');
    };

    if (!modele) {
        return <div className="text-center">Chargement...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={modele.image} className="img-fluid rounded-start" alt={modele.nom} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{modele.nom}</h5>
                            <p className="card-text">{modele.description}</p>
                            <p className="card-text"><small className="text-muted">Prix: {modele.prix} €</small></p>
                            <button className="btn btn-primary" onClick={retourner}>Retour aux modèles</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModeleDetail;
