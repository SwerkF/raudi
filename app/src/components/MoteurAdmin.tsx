import React, { useState, useEffect } from "react";
import axios from "axios";

interface Moteur {
  id: number;
  type: string;
  puissance: number;
}

const MoteursAdmin: React.FC = () => {
  const [moteurs, setMoteurs] = useState<Moteur[]>([]);
  const [newMoteur, setNewMoteur] = useState<{
    type: string;
    puissance: number;
  }>({ type: "", puissance: 0 });
  const [selectedMoteur, setSelectedMoteur] = useState<Moteur | null>(null);

  useEffect(() => {
    axios
      .get<Moteur[]>("http://localhost:3000/api/moteurs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setMoteurs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChangeNew = (champ: keyof Moteur, value: string) => {
    setNewMoteur((prev) => ({
      ...prev,
      [champ]: champ === "puissance" ? parseInt(value, 10) : value,
    }));
  };

  const handleChangeSelected = (champ: keyof Moteur, value: string) => {
    setSelectedMoteur(
      (prev) =>
        ({
          ...prev,
          [champ]: champ === "puissance" ? parseInt(value, 10) : value,
        } as Moteur)
    );
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/api/moteurs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        window.alert("Moteur supprimé");
        const moteursFiltres = moteurs.filter((moteur) => moteur.id !== id);
        setMoteurs(moteursFiltres);
      })
      .catch((err) => console.error(err));
  };

  const handleGetWhere = (id: number) => {
    axios
      .get(`http://localhost:3000/api/moteurs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setSelectedMoteur(res.data))
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/moteurs", newMoteur, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMoteurs([...moteurs, res.data]);
        setNewMoteur({ type: "", puissance: 0 }); // Réinitialisation du formulaire
      })
      .catch((err) => console.error(err));
  };

  const handleUpdate = () => {
    if (selectedMoteur) {
      axios
        .put(
          `http://localhost:3000/api/moteurs/${selectedMoteur.id}`,
          selectedMoteur,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          window.alert("Moteur mis à jour");
          setMoteurs(
            moteurs.map((m) =>
              m.id === selectedMoteur.id ? selectedMoteur : m
            )
          );
          setSelectedMoteur(null); // Réinitialisation du moteur sélectionné
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>    
    <h1 className="text-center">Gestion des moteurs</h1>
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h5 className="">Liste des Moteurs</h5>
        </div>
        <div className="card-body d-flex">
            <table className="table w-50">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Puissance (CV)</th>
                  <th>Edite</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {moteurs.map((moteur) => (
                  <tr key={moteur.id}>
                    <td>{moteur.id}</td>
                    <td>{moteur.type}</td>
                    <td>{moteur.puissance}</td>
                    <td style={{ width: "5%" }}>
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => handleDelete(moteur.id)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                    <td style={{ width: "5%" }}>
                      <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#updateModal"
                        onClick={() => handleGetWhere(moteur.id)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <form onSubmit={handleSubmit} className="mt-3 ms-5 ps-5 w-25">
              <div className="mb-3">
                <label className="form-label">Type de moteur: </label>
                <input
                  type="text"
                  className="form-control"
                  value={newMoteur.type}
                  onChange={(e) => handleChangeNew("type", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Puissance (CV): </label>
                <input
                  type="number"
                  className="form-control"
                  value={newMoteur.puissance.toString()}
                  onChange={(e) => handleChangeNew("puissance", e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Ajouter Moteur
              </button>
            </form>
        </div>
      </div>

      <div
        className="modal fade"
        id="updateModal"
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateModalLabel">
                Modifier Moteur
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Type de moteur: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedMoteur ? selectedMoteur.type : ""}
                    onChange={(e) =>
                      handleChangeSelected("type", e.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Puissance (CV): </label>
                  <input
                    type="number"
                    className="form-control"
                    value={
                      selectedMoteur ? selectedMoteur.puissance.toString() : ""
                    }
                    onChange={(e) =>
                      handleChangeSelected("puissance", e.target.value)
                    }
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
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
};

export default MoteursAdmin;
