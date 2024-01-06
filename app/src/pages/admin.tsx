import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AchatsParMoisChart from '../components/AchatsParMoisChart';
import AchatsUtilisateurs from '../components/AchatAdmin';
import MoteursAdmin from '../components/MoteurAdmin';
import OptionsAdmin from '../components/OptionsAdmin';
import AdminModele from '../components/AdminModele'

const Admin = () => {

  const [user, setUser] = useState<any>(null);
  const [components, setComponents] = useState<any>(''); // [
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:3000/api/user/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data.user.role.nom !== 'Admin' && res.data.user.role.nom !== 'Comptable') {
          window.location.href = '/';
        } else {
          setUser(res.data.user);
          setComponents('ModeleAdmin');
        }
      })
      .catch(err => {
        console.error(err);
    })
  }, []);

  const handleChange = (event:any) => {
    setComponents(event.target.value);
  }

  return (
    <>
      <div className="container mt-4">
        <h1>Administration</h1>
        <div className="row">
          <div className="col">
            <select className="form-select" aria-label="Default select example" onChange={handleChange}>
              {
                user && user.role.nom === 'Admin' ? (
                  <>
                    <option value="ModeleAdmin">Modele</option>
                    <option value="AchatsUtilisateurs">Achats Utilisateurs</option>
                    <option value="MoteursAdmin">Moteurs</option>
                    <option value="OptionsAdmin">Options</option>
                    <option value="AchatsParMoisChart">Achats par mois</option>
                  </>
                ) : (
                  <>
                    <option value="AchatsUtilisateurs">Achats Utilisateurs</option>
                    <option value="AchatsParMoisChart">Achats par mois</option>
                  </>
                )
              }
            </select>
          </div>
        </div>
        <div className="row mt-4">
         {
          // if user role is admin,  display all options, else display AchatAdmin or AchatsParMoisChart
            user && user.role.nom === 'Admin' ? (
              components === 'AchatsUtilisateurs' ? <AchatsUtilisateurs /> 
              : components === 'ModeleAdmin' ? <AdminModele />
              : components === 'MoteursAdmin' ? <MoteursAdmin /> 
              : components === 'OptionsAdmin' ? <OptionsAdmin />
              : components === 'AchatsParMoisChart' ? <AchatsParMoisChart />
              : <AchatsUtilisateurs />
            ) : (
              components === 'AchatsUtilisateurs' ? <AchatsUtilisateurs /> : <AchatsParMoisChart />
            )
         }
        </div>
      </div>
    </>
  );
};

export default Admin;
