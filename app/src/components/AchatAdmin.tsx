import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Achat {
    id: number;
    date_achat: Date;
    user_id: number;
    prix: number;
    vehicule: {
      id: number;
      nom: string;
      prix: number;
        modele: {
            id: number;
            nom: string;
            prix: number;
        };
      options: {
        id: number;
        nom: string;
        prix: number;
      }[];
    };
  }

const AchatsUtilisateurs: React.FC = () => {
  
  const navigate = useNavigate();
  const [achats, setAchats] = useState<Achat[]>([]);
  const [mois, setMois] = useState<string>('');

  useEffect(() => {
    let isMounted = true; 
    axios.get<Achat[]>('http://localhost:3000/api/achat', {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if (isMounted) { 
          setAchats(res.data);
        }
      })
      .catch(err => {
        console.error('Une erreur est survenue lors de la récupération des achats: ', err);
        navigate('/login');
      });
  
    return () => {
      isMounted = false;
    };
  }, []);
      

  const filtrerParMois = (mois: string) => {

    const debutMois = new Date(mois);
    const finMois = new Date(debutMois.getFullYear(), debutMois.getMonth() + 1, 0, 23, 59, 59);

    return achats.filter(achat => { 
        const dateAchat = new Date(achat.date_achat); 
        return dateAchat >= debutMois && dateAchat <= finMois;
    }
    );
  };
  const dateFormat = (date: any) => {
    const dateAchat = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateAchat.toLocaleDateString('fr-FR', options);
}

  const achatsFiltres = mois ? filtrerParMois(mois) : achats;

const getTotals = (achats: any) => {        
    let prix = achats.vehicule.modele.prix;
        const achat = achats.vehicule;
        for (let i = 0; i < achat.options.length; i++) {
            const option = achat.options[i];
            prix += option.prix;
        }
        return prix;
}

const getOptions = (achats: any) => {        
    const achat = achats.vehicule;
    let options = [];
    for (let i = 0; i < achat.options.length; i++) {
        options.push({ optionNom: achat.options[i].nom, optionPrix: achat.options[i].prix });
    }
    return options;
}


  return (
    <div className="container">
      <div className="d-flex align-items-center p-3 my-3  rounded shadow-sm">
        <div className="lh-1 d-flex">
          <h1 className="h6 mb-0 w-100">Filtre des achats (Mois)</h1>
          <input 
                className="form-control ms-5" 
              type="month" 
              value={mois} 
              onChange={(e) => setMois(e.target.value)} 
            />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Numéro</th>
            <th scope="col">Date achat</th>
            <th scope="col">Modele</th>
            <th scope="col">Prix Modele</th>
            <th scope="col">Options</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
        {achatsFiltres.map(achat => (

          <tr key={achat.id}>
            <th> {achat.id}</th>
            <td>{dateFormat(achat.date_achat)}</td>
            <td>{achat.vehicule.modele.nom}</td>
            <td>{achat.vehicule.modele.prix}</td>

            <td>
        {
          getOptions(achat).length > 0 ?
          getOptions(achat).map((opt, index) => (
            <div key={index}>
              {opt.optionNom} - {opt.optionPrix} €
            </div>
          )) :
          <div>Pas d'options</div>
        }
      </td>
      <td>{getTotals(achat)} €</td>
          </tr>
          ))}
        </tbody>
      </table>


    </div>


  );
};

export default AchatsUtilisateurs;
