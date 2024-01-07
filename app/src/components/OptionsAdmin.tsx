import React, { useState, useEffect } from "react";
import axios from "axios";

interface Option {
  id: number;
  nom: string;
  prix: number;
}

const OptionsAdmin: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [newOption, setNewOption] = useState<{ nom: string; prix: number }>({
    nom: "",
    prix: 0,
  });
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const loadOptions = () => {
    axios
      .get<Option[]>("http://localhost:3000/api/options", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setOptions(res.data))
      .catch((err) => {
        console.error(err);
        alert("Erreur lors du chargement des données.");
      });
  };

  useEffect(loadOptions, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/options", newOption, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setOptions([...options, res.data]);
        setNewOption({ nom: "", prix: 0 }); // Reset form
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de l'ajout de l'option.");
      });
  };

  const handleDelete = (optionId: number) => {
    axios
      .delete(`http://localhost:3000/api/options/${optionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        alert("Option supprimée");
        setOptions(options.filter((opt) => opt.id !== optionId));
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de la suppression de l'option.");
      });
  };

  const handleChange = (champ: keyof Option, value: string) => {
    if (selectedOption) {
      setSelectedOption({
        ...selectedOption,
        [champ]: champ === "prix" ? parseFloat(value) : value,
      });
    } else {
      setNewOption((prevOption) => ({
        ...prevOption,
        [champ]: champ === "prix" ? parseFloat(value) : value,
      }));
    }
  };

  const handleUpdate = () => {
    if (selectedOption) {
      axios
        .put(
          `http://localhost:3000/api/options/${selectedOption.id}`,
          selectedOption,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          window.alert("Option mise à jour");
          setOptions(
            options.map((opt) =>
              opt.id === selectedOption.id ? selectedOption : opt
            )
          );
          setSelectedOption(null); // Reset selected option
        })
        .catch((err) => {
          console.error(err);
          alert("Erreur lors de la mise à jour de l'option.");
        });
    }
  };

  const handleGetWhere = (optionId: number) => {
    axios
      .get(`http://localhost:3000/api/options/${optionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setSelectedOption(res.data))
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de la récupération des détails de l'option.");
      });
  };


  return (
    <div className="container mt-4">
      <h1>Options de Véhicules</h1>
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
          {options.map((option) => (
            <tr key={option.id}>
              <td>{option.id}</td>
              <td>{option.nom}</td>
              <td>{option.prix}</td>
              <td>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => handleDelete(option.id)}
                >
                  Supprimer
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleGetWhere(option.id)}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Modifier
                </button>
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
            value={newOption.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Prix: </label>
          <input
            type="number"
            className="form-control"
            value={newOption.prix.toString()}
            onChange={(e) => handleChange("prix", e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter Option
        </button>
      </form>

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
                Mise à jour de l'option
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
                <label className="form-label">Nom de l'option: </label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedOption ? selectedOption.nom : ""}
                  onChange={(e) => handleChange("nom", e.target.value)}
                />
                <label className="form-label">Prix: </label>
                <input
                  type="number"
                  className="form-control"
                  value={selectedOption ? selectedOption.prix.toString() : ""}
                  onChange={(e) => handleChange("prix", e.target.value)}
                />
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
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsAdmin;
