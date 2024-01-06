import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Moteur {
    id: number;
    type: string;
    puissance: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const MoteursAdmin: React.FC = () => {
    const [moteurs, setMoteurs] = useState<Moteur[]>([]);
    const [nouveauType, setNouveauType] = useState('');
    const [nouvellePuissance, setNouvellePuissance] = useState(0);

    useEffect(() => {
        axios.get<Moteur[]>('http://localhost:3000/api/moteurs', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => setMoteurs(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const nouveauMoteur = { type: nouveauType, puissance: nouvellePuissance };
        
        axios.post('http://localhost:3000/api/moteurs', nouveauMoteur, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setMoteurs([...moteurs, res.data]);
                setNouveauType('');
                setNouvellePuissance(0);
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="container mt-4">
            <h1>Gestion des Moteurs</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Puissance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {moteurs.map(moteur => (
                        <tr key={moteur.id}>
                            <td>{moteur.id}</td>
                            <td>{moteur.type}</td>
                            <td>{moteur.puissance} CV</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => {}}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Type de moteur: </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={nouveauType} 
                        onChange={e => setNouveauType(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Puissance (CV): </label>
                    <input 
                        type="number" 
                        className="form-control"
                        value={nouvellePuissance} 
                        onChange={e => setNouvellePuissance(parseInt(e.target.value, 10))} 
                    />
                </div>
                <button type="submit" className="btn btn-success">Ajouter Moteur</button>
            </form>
        </div>
    );
};

export default MoteursAdmin;
