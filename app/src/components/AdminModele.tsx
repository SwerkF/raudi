import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function AdminModele() {
  const navigate = useNavigate();

  const [modeles, setModeles] = useState<any>(null);
  const [currentModele, setCurrentModele] = useState<any>({
    id: 0,
    nom: "",
    prix: 0,
    description: "",
    nombre_portes: 0,
    nombre_places: 0,
    image: null,
    taille: 0,
    vitesse_max: 0,
    couleur: "",
    moteur_id: 1,
    date_fabrication: "",
  });
  const [submitModele, setSubmitModele] = useState<any>({
    nom: "",
    prix: 0,
    description: "",
    nombre_portes: 0,
    nombre_places: 0,
    image: null,
    taille: 0,
    vitesse_max: 0,
    couleur: "",
    moteur_id: 1,
    date_fabrication: "",
  });
  const [moteurs, setMoteurs] = useState<any>(null);

  useEffect(() => {
    // Récupération des modeles
    axios
      .get("http://localhost:3000/api/modele", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setModeles(response.data);

          // Récupération des moteurs
          axios
            .get("http://localhost:3000/api/moteurs", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                setMoteurs(response.data);
              }
            })
            .catch((err) => {
              console.error(err);
              navigate("/");
            });
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  }, []);

  // Edit modele
  const handleEdit = (modele: any) => {
    const formData = new FormData();
    formData.append("nom", String(currentModele.nom));
    formData.append("prix", String(currentModele.prix));
    formData.append("description", String(currentModele.description));
    formData.append("nombre_portes", String(currentModele.nombre_portes));
    formData.append("nombre_places", String(currentModele.nombre_places));
    formData.append("taille", String(currentModele.taille));
    formData.append("vitesse_max", String(currentModele.vitesse_max));
    formData.append("couleur", String(currentModele.couleur));
    formData.append("moteur_id", String(currentModele.moteur_id));
    formData.append("date_fabrication", currentModele.date_fabrication);

    if (currentModele.image) {
      formData.append("image", currentModele.image[0]);
    }

    // Update
    axios
      .put(`http://localhost:3000/api/modele/${currentModele.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file upload
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/admin";
        }
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Delete modele
  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/api/modele/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/admin";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Add modele
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Creation formdata pour envoi des données + image
    const formData = new FormData();
    formData.append("nom", String(submitModele.nom));
    formData.append("prix", String(submitModele.prix));
    formData.append("description", String(submitModele.description));
    formData.append("nombre_portes", String(submitModele.nombre_portes));
    formData.append("nombre_places", String(submitModele.nombre_places));
    formData.append("taille", String(submitModele.taille));
    formData.append("vitesse_max", String(submitModele.vitesse_max));
    formData.append("couleur", String(submitModele.couleur));
    formData.append("moteur_id", String(submitModele.moteur_id));
    formData.append("date_fabrication", submitModele.date_fabrication);
    
    formData.append("image", submitModele.image[0]);

    // Envoi des données
    axios
      .post("http://localhost:3000/api/modele", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file upload
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/admin";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="container mt-4">
        <h1>Modele</h1>
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Nom</th>
                  <th>Prix</th>
                  <th>Edit</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {modeles &&
                  modeles.map((modele: any) => (
                    <tr key={modele.id}>
                      <td>{modele.id}</td>
                      <td>
                        {modele.image ? (
                          <img src={"http://localhost:3000/src/"+modele.image} alt="Modèle" height={"50px"} />
                        ) : (
                          "Pas d'images"
                        )}
                      </td>
                      <td>{modele.nom}</td>
                      <td>{modele.prix}</td>
                      <td style={{ width: "5%" }}>
                        <button
                          onClick={() => setCurrentModele(modele)}
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                      </td>
                      <td style={{ width: "5%" }}>
                        <button
                          onClick={() => handleDelete(modele.id)}
                          className="btn btn-danger"
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col shadow p-3">
          <form onSubmit={handleSubmit} className="row mt-3">
            <div className="col-6 mb-3">
              <label className="form-label">Nom du modele: </label>
              <input
                type="text"
                className="form-control"
                value={submitModele.nom}
                onChange={(e) =>
                  setSubmitModele({ ...submitModele, nom: e.target.value })
                }
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Prix du modele: </label>
              <input
                type="number"
                className="form-control"
                value={submitModele.prix}
                onChange={(e) =>
                  setSubmitModele({ ...submitModele, prix: e.target.value })
                }
              />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label">Description du modele: </label>
              <textarea
                className="form-control"
                value={submitModele.description}
                onChange={(e) =>
                  setSubmitModele({
                    ...submitModele,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Nombre de portes: </label>
              <input
                type="number"
                className="form-control"
                value={submitModele.nombre_portes}
                onChange={(e) =>
                  setSubmitModele({
                    ...submitModele,
                    nombre_portes: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Nombre de places: </label>
              <input
                type="number"
                className="form-control"
                value={submitModele.nombre_places}
                onChange={(e) =>
                  setSubmitModele({
                    ...submitModele,
                    nombre_places: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Taille: </label>
              <input
                type="number"
                className="form-control"
                value={submitModele.taille}
                onChange={(e) =>
                  setSubmitModele({ ...submitModele, taille: e.target.value })
                }
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Vitesse max: </label>
              <input
                type="number"
                className="form-control"
                value={submitModele.vitesse_max}
                onChange={(e) =>
                  setSubmitModele({
                    ...submitModele,
                    vitesse_max: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Couleur: </label>
              <input
                type="text"
                className="form-control"
                value={submitModele.couleur}
                onChange={(e) =>
                  setSubmitModele({ ...submitModele, couleur: e.target.value })
                }
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Moteur: </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) =>
                  setSubmitModele({
                    ...submitModele,
                    moteur_id: e.target.value,
                  })
                }
              >
                {moteurs &&
                  moteurs.map((moteur: any) => (
                    <option key={moteur.id} value={moteur.id}>
                      {moteur.type} - {moteur.puissance} CV
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Image: </label>
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  setSubmitModele({ ...submitModele, image: e.target.files })
                }
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Date de fabrication: </label>
              <input
                type="date"
                className="form-control"
                onChange={(e) =>
                  setSubmitModele({
                    ...submitModele,
                    date_fabrication: e.target.value,
                  })
                }
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Ajouter Modele
            </button>
          </form>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modifier Modele
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {currentModele ? (
                  <>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label className="form-label">Nom du modele: </label>
                        <input
                          type="text"
                          className="form-control"
                          value={currentModele.nom}
                          onChange={(e) =>
                            setCurrentModele({
                              ...currentModele,
                              nom: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label">Prix du modele: </label>
                        <input
                          type="number"
                          className="form-control"
                          value={currentModele.prix}
                          onChange={(e) =>
                            setCurrentModele({
                              ...currentModele,
                              prix: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label className="form-label">
                          Description du modele:{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={currentModele.description}
                          onChange={(e) =>
                            setCurrentModele({
                              ...currentModele,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label">Nombre de portes: </label>
                        <input
                          type="number"
                          className="form-control"
                          value={currentModele.nombre_portes}
                          onChange={(e) =>
                            setCurrentModele({
                              ...currentModele,
                              nombre_portes: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label">Nombre de places: </label>
                        <input
                          type="number"
                          className="form-control"
                          value={currentModele.nombre_places}
                          onChange={(e) =>
                            setCurrentModele({
                              ...currentModele,
                              nombre_places: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label">Taille: </label>
                        <input
                          type="number"
                          className="form-control"
                          value={currentModele.taille}
                          onChange={(e) =>
                            setCurrentModele({
                              ...currentModele,
                              taille: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label">Vitesse max: </label>
                        <input
                          type="number"
                          className="form-control"
                          value={currentModele.vitesse_max}
                          onChange={(e) =>
                            setCurrentModele({
                              ...currentModele,
                              vitesse_max: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label">Couleur: </label>
                        <input
                          type="text"
                          className="form-control"
                          value={currentModele.couleur}
                          onChange={(e) =>
                            setCurrentModele({
                              ...currentModele,
                              couleur: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label">Moteur: </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) =>
                            setCurrentModele({
                              ...currentModele,
                              moteur_id: e.target.value,
                            })
                          }
                        >
                          {moteurs &&
                            moteurs.map((moteur: any) => (
                              <option key={moteur.id} value={moteur.id}>
                                {moteur.type} - {moteur.puissance} CV
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label">Image: </label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={(e) =>
                            setCurrentModele({
                              ...currentModele,
                              image: e.target.files,
                            })
                          }
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label">
                          Date de fabrication:{" "}
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          onChange={(e) =>
                            setCurrentModele({
                              ...currentModele,
                              date_fabrication: e.target.value,
                            })
                          }
                        /></div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={() => handleEdit(currentModele)}
                  type="button"
                  className="btn btn-primary"
                >
                  Sauvegarder les changements
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminModele;
