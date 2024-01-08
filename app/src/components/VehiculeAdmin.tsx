// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Vehicule {
//   id: number;
//   createdAt: string;
//   updatedAt: string;
//   modele_id: number;
// }

// const VehiculeAdmin: React.FC = () => {
//   const [vehicules, setVehicules] = useState<Vehicule[]>([]);
//   const [newVehicule, setNewVehicule] = useState<{ modele_id: number }>({ modele_id: 0 });
//   const [selectedVehicule, setSelectedVehicule] = useState<Vehicule | null>(null);

//   useEffect(() => {
//     axios
//       .get<Vehicule[]>('http://localhost:3000/api/vehicules', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       })
//       .then((res) => setVehicules(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleAddSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         'http://localhost:3000/api/vehicules',
//         newVehicule,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       setVehicules([...vehicules, response.data]);
//       setNewVehicule({ modele_id: 0 }); // Reset form
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleUpdateSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (selectedVehicule) {
//       try {
//         await axios.put(
//           `http://localhost:3000/api/vehicules/${selectedVehicule.id}`,
//           selectedVehicule,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           }
//         );
//         setVehicules(
//           vehicules.map((v) =>
//             v.id === selectedVehicule.id ? selectedVehicule : v
//           )
//         );
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/vehicules/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setVehicules(vehicules.filter((vehicule) => vehicule.id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSelectVehicule = (id: number) => {
//     const vehicule = vehicules.find((v) => v.id === id) || null;
//     setSelectedVehicule(vehicule);
//   };

//   // ... JSX and t

//   // Omettons l'implémentation de handleUpdate pour la brièveté
//   // Il faudrait envoyer une requête PUT à votre API et gérer la réponse

//   return (
//     <div className="container mt-4">
//       <h1>Gestion des Véhicules</h1>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Créé le</th>
//             <th>Mis à jour le</th>
//             <th>ID du Modèle</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {vehicules.map((vehicule) => (
//             <tr key={vehicule.id}>
//               <td>{vehicule.id}</td>
//               <td>{new Date(vehicule.createdAt).toLocaleString()}</td>
//               <td>{new Date(vehicule.updatedAt).toLocaleString()}</td>
//               <td>{vehicule.modele_id}</td>
//               <td>
//                 <button className="btn btn-danger me-2" onClick={() => handleDelete(vehicule.id)}>
//                   Supprimer
//                 </button>
//                 <button className="btn btn-primary" onClick={() => handleSelectVehicule(vehicule.id)}>
//                   Modifier
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <form onSubmit={handleAddSubmit} className="mt-3">
//         <div className="mb-3">
//           <label htmlFor="modele_id" className="form-label">ID du Modèle:</label>
//           <input
//             type="number"
//             className="form-control"
//             id="modele_id"
//             value={newVehicule.modele_id}
//             onChange={(e) => setNewVehicule({ ...newVehicule, modele_id: parseInt(e.target.value, 10) })}
//           />
//         </div>
//         <button type="submit" className="btn btn-success">
//           Ajouter Véhicule
//         </button>
//       </form>

//       <div className="modal fade" id="updateModal"  aria-labelledby="updateModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="updateModalLabel">Modifier Véhicule</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <form onSubmit={handleUpdateSubmit}>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label htmlFor="update_modele_id" className="form-label">ID du Modèle:</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="update_modele_id"
//                     value={selectedVehicule ? selectedVehicule.modele_id : 0}
//                     onChange={(e) => setSelectedVehicule({ ...selectedVehicule, modele_id: parseInt(e.target.value, 10) } as Vehicule)}
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
//                 <button type="submit" className="btn btn-primary">Sauvegarder les changements</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehiculeAdmin;
