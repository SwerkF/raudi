import React, { useState, useEffect } from 'react';
import axios from "axios";

const ModelesList = () => {
    const [modeles, setModeles] = useState<any[]>([]); // Initialiser avec un tableau vide

    useEffect(() => {
        axios.get('http://localhost:3000/api/modele')
            .then((response) => {
                const modelesData = response.data.slice(0, 10); // Prendre seulement les 10 premiers modèles
                setModeles(modelesData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h2>Liste des Modèles</h2>
            <ul>
                {modeles.map((modele: any) => (
                    <li key={modele.id}>Modele: {modele.nom} - {modele.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default ModelesList;
