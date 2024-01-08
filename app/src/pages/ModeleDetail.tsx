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
                console.log(response.data);
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
                        <img src={"http://localhost:3000/src/"+modele.image} className="img-fluid rounded-start" alt={modele.nom} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{modele.nom}</h5>
                            <p className="card-text">{modele.description}</p>
                            <div className="d-flex justify-content-between flex-wrap">
                                <div className="col-6 mb-3">
                                    <p className="card-text fw-bold">Type de moteur : {modele.moteur.type}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <p className="card-text fw-bold">Nombre de places : {modele.nombre_places}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <p className="card-text fw-bold">Prix : {modele.prix} €</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <p className="card-text fw-bold">Nombre de portes : {modele.nombre_portes}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <p className="card-text fw-bold">Taille : {modele.taille} cm</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <p className="card-text fw-bold">Vitesse max : {modele.vitesse_max} km/h</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end gap-2 flex-wrap">
                                <button className="btn btn-primary w-75" onClick={() => navigate(`/modele/${modele.id}/customise`)}>Acheter</button>
                                <button className="btn btn-light" onClick={() => navigate('/modele')}>Retour</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModeleDetail;
