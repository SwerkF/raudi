import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Option {
    id: number;
    nom: string;
    prix: number;
}

const OptionsAdmin: React.FC = () => {
    const [options, setOptions] = useState<Option[]>([]);
    const [nouvelleOptionNom, setNouvelleOptionNom] = useState('');
    const [nouvelleOptionPrix, setNouvelleOptionPrix] = useState(0);

    // Charger les options existantes
    useEffect(() => {
        axios.get<Option[]>('http://localhost:3000/api/options', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => setOptions(res.data))
            .catch(err => console.error(err));
    }, []);

    // Gérer la soumission du nouveau formulaire d'option
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const nouvelleOption = { nom: nouvelleOptionNom, prix: nouvelleOptionPrix };
        
        axios.post('http://localhost:3000/api/options', nouvelleOption,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setOptions([...options, res.data]);
                setNouvelleOptionNom('');
                setNouvelleOptionPrix(0);
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (optionId: number) => {
        axios.delete(`http://localhost:3000/api/options/${optionId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(() => {
                // Juste mettre un message après la suppression
                alert('Option supprimée');
            })
            .catch(err => console.error(err));
    };
    
    
    return (
        <div className="container mt-4">
            <h1>Options de Véhicules</h1>

            {/* Tableau pour afficher les options existantes */}
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prix (€)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {options.map(option => (
                        <tr key={option.id}>
                            <td>{option.id}</td>
                            <td>{option.nom}</td>
                            <td>{option.prix}</td>
                            <td>
                                <div>
                                    <button className="btn btn-danger me-2" onClick={()=>handleDelete(option.id)}><i className="bi bi-trash"></i></button>
                                    <button className="btn btn-warning"><i className="bi bi-pencil-square"></i></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Nom de l'option: </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={nouvelleOptionNom} 
                        onChange={e => setNouvelleOptionNom(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Prix: </label>
                    <input 
                        type="number" 
                        className="form-control"
                        value={nouvelleOptionPrix} 
                        onChange={e => setNouvelleOptionPrix(parseInt(e.target.value, 10))} 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Ajouter Option</button>
            </form>
        </div>
    );
};

export default OptionsAdmin;
