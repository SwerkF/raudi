import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  adresse: string | null;
  code_postal: string | null;
  ville: string | null;
  telephone: string | null;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  createdAt: string;
  updatedAt: string;
  role_id: number;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get<User>(`http://localhost:3000/api/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res:any) => {
        console.log(res.data.user);
        setUser(res.data.user);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (champ: keyof User, value: string) => {
    setUser((prevUser) => (prevUser ? { ...prevUser, [champ]: value } : null));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await axios.put(`http://localhost:3000/api/user/${user.id}`, user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("Profile updated successfully");
      } catch (err) {
        console.error(err);
        alert("Failed to update profile");
      }
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && user.newPassword === user.confirmNewPassword) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/user/${user.id}/password`, 
          {
            oldPassword: user.oldPassword,
            newPassword: user.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        alert("Mot de passe mis à jour avec succès.");
        setUser({ ...user, oldPassword: '', newPassword: '', confirmNewPassword: '' });
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la mise à jour du mot de passe.");
      }
    } else {
      alert("Les mots de passe ne correspondent pas.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <form onSubmit={handleUpdateProfile} className="mt-3 row">
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <i className="bi bi-person-circle fs-1"></i>                
                <span className="font-weight-bold">{user.nom}</span>
                <span className="text-black-50">{user.email}</span>
            </div>
        </div>
        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Paramètres du profil</h4>
                </div>
                <h5 className="text-left">Informations personnelles</h5>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <label className="labels">Nom</label>
                        <input type="text" className="form-control" placeholder="Nom" value={user.nom || ''}
                               onChange={(e)=> handleChange('nom', e.target.value)}/>
                    </div>
                    <div className="col-md-6">
                        <label className="labels">Prénom</label>
                        <input type="text" className="form-control" value={user.prenom || ''} placeholder="Prénom"
                               onChange={(e)=> handleChange('prenom', e.target.value)}/>
                    </div>
                </div>

                <div className="row mt-3">
                  <h5 className="text-left">Téléphone</h5>
                  <div className="col-md-12">
                      <label className="labels">Téléphone</label>
                      <input type="text" className="form-control" placeholder="Entrez numéro de téléphone" 
                              value={user.telephone || ''} 
                              onChange={(e)=> handleChange('telephone', e.target.value)}/>
                  </div>
                </div>
                <h5 className="text-left mt-3">Adresse</h5>
                <div className="row mt-3">
                    <div className="col-md-12 mb-2">
                        <label className="labels">Adresse</label>
                        <input type="text" className="form-control" placeholder="Entrez adresse" 
                               value={user.adresse || ''} 
                               onChange={(e)=> handleChange('adresse', e.target.value)}/>
                    </div>
                    <div className="col-md-6 mb-2">
                        <label className="labels">Code postal</label>
                        <input type="text" className="form-control" placeholder="Entrez code postal" 
                               value={user.code_postal || ''} 
                               onChange={(e)=> handleChange('code_postal', e.target.value)}/>
                    </div>
                    <div className="col-md-6">
                        <label className="labels">Ville</label>
                        <input type="text" className="form-control" placeholder="Entrez ville" 
                               value={user.ville || ''} 
                               onChange={(e)=> handleChange('ville', e.target.value)}/>
                    </div>
                </div>
                <div className="mt-5 text-center">
                    <button className="btn btn-primary profile-button w-100" type="submit">Enregistrer le profil</button>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="p-3 py-5">
                <form onSubmit={handlePasswordUpdate}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-right">Changer le mot de passe</h4>
                    </div>
                    <div className="col-md-12 mb-2">
                        <input type="password" className="form-control" placeholder="Ancien mot de passe" 
                               value={user.oldPassword || ''}
                               onChange={(e)=> handleChange('oldPassword', e.target.value)}/>
                    </div>
                    <div className="col-md-12 mb-2">
                        <input type="password" className="form-control" placeholder="Nouveau mot de passe" 
                               value={user.newPassword || ''}
                               onChange={(e)=> handleChange('newPassword', e.target.value)}/>
                    </div>
                    <div className="col-md-12 mb-2">
                        <input type="password" className="form-control" placeholder="Confirmer le nouveau mot de passe" 
                               value={user.confirmNewPassword || ''}
                               onChange={(e)=> handleChange('confirmNewPassword', e.target.value)}/>
                    </div>
                    <div className="mt-5 text-center">
                        <button className="btn btn-primary w-100" type="submit" >Changer le mot de passe</button>
                    </div>
                </form>
            </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
