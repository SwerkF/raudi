// importer useEffect et useState
import { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';

// importer axios
import axios from "axios";

function Customise() {
  const [modele, setModele] = useState<any>(null);
  const [options, setOptions] = useState<any>([]);
  const [chosenOptions, setChosenOptions] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);

  const [adresse, setAdresse] = useState<any>("");
  const [cp, setCp] = useState<any>("");
  const [ville, setVille] = useState<any>("");
  const [tel, setTel] = useState<any>("");

  // Récupérer les modeles 
  useEffect(() => {
    const id = window.location.href.split("/")[4];
    axios.get(`http://localhost:3000/api/modele/${id}`)
        .then((response) => {
            console.log(response.data);
            setModele(response.data);
            setTotal(response.data.prix);
        })
    }, []);

    // Récupérer les options
    useEffect(() => {
        if (modele && modele.date_fabrication) {
            axios.get(`http://localhost:3000/api/options`)
                .then((response:any) => {
                    // si le modele est plus récent que l'option, on l'affiche
                    const filteredOptions = response.data.filter((option : any) => new Date(modele.date_fabrication) >= new Date(option.date_fabrication));
                    setOptions(filteredOptions);
                })
        }
    }, [modele]); 

    // Récupérer le total de la commande
    const handleGetTotal = () => {
        let total = modele.prix;
        chosenOptions.map((option: any) => {
            total += option.prix;
        });
        return total;
    };

    // Gérer les options
    const handleOption = (option: any) => {
        // add or remove option
        let newChosenOptions = [...chosenOptions];
        if (newChosenOptions.includes(option)) {
        newChosenOptions = newChosenOptions.filter(
            (item: any) => item.id !== option.id
        );
        } else {
        newChosenOptions.push(option);
        }
        setChosenOptions(newChosenOptions);
    };

    // Gérer les couleurs
    const handleGetColor = (color: string) => {
        // using color which is modele.couleur, return hex color

        switch (color) {
        case "Rouge":
            return "#FF0000";
            break;
        case "Noir":
            return "#000000";
            break;
        case "Blanc":
            return "#FFFFFF";
            break;
        case "Bleu":
            return "#0000FF";
            break;
        case "Vert":
            return "#00FF00";
            break;
        case "Jaune":
            return "#FFFF00";
            break;
        case "Orange":
            return "#FFA500";
            break;
        default:
            return "#000000";
            break;
        }
    };

    const handleSubmit = () => {
        const token = localStorage.getItem("token");
        const id = window.location.href.split("/")[4];
        // if all values are not set return
        if (!adresse || !cp || !ville || !tel) {
            return alert("Veuillez remplir tous les champs");
        }
        axios
        .post(
            `http://localhost:3000/api/achat`,
            {
            modele_id: id,
            options: chosenOptions,
            adresse: adresse,
            cp: cp,
            ville: ville,
            tel: tel,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        )
        .then((response) => {
            if (response.status === 200) {
            alert("Votre commande a bien été prise en compte");
            window.location.href = "/";
            }
        });
    };

    return (
        <>
        {
            modele && (
                <>
                    <div className="container">
                        <h1>Cutomisation de {modele.nom}</h1>
                        <div className="row">
                            <div className="col-9">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>1. Votre modele</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex flex-row align-items-center"> 
                                        <img src={"http://localhost:3000/src/"+modele.image} alt={modele.nom} height={"100px"}/>
                                            <p className="mb-0 m-2">Prix: <span className="fw-bold">{modele.prix} €</span> 
                                                - Vitesse max: <span className="fw-bold">{modele.vitesse_max}</span> km/h 
                                                - Couleur: <span style={{width: "20px", height: "20px", borderRadius: "50%", backgroundColor: handleGetColor(modele.couleur), display: "inline-block"}}></span> <span className="fw-bold">{modele.couleur}</span>
                                                - Nombre de portes: <span className="fw-bold">{modele.nombre_portes}</span>
                                                - Nombre de places: <span className="fw-bold">{modele.nombre_places}</span>
                                                - Type de moteur: <span className="fw-bold">{modele.moteur.type}</span>

                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title">2. Choisissez vos options</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                        {
                                            options && options.map((option: any) => {
                                                return (
                                                    // checkboxes no cards
                                                    <div key={option.id} className="col-4 d-flex flex-row align-items-center">
                                                        <input type="checkbox"  className="m-1" name={option.nom} value={option.nom} onChange={() => handleOption(option)} />
                                                        <label htmlFor={option.nom}>{option.nom} - {option.prix} €</label>
                                                    </div>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                </div>
                                
                                <hr/>
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title">3. Adresse de livraison</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="adresse">Adresse</label>
                                            <input type="text" className="form-control" name="adresse" id="adresse" onChange={(e) => setAdresse(e.target.value)} />
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="ville">Ville</label>
                                                    <input type="text" className="form-control" name="ville" id="ville" onChange={(e) => setVille(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="cp">Code postal</label>
                                                    <input type="text" className="form-control" name="cp" id="cp" onChange={(e) => setCp(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tel">Téléphone</label>
                                            <input type="text" className="form-control" name="tel" id="tel" onChange={(e) => setTel(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title">4. Paiement</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="numero">Numéro de carte</label>
                                            <input type="text" className="form-control" name="numero" id="numero" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nom">Nom</label>
                                            <input type="text" className="form-control" name="nom" id="nom" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="date">Date d'expiration</label>
                                            <input type="text" className="form-control" name="date" id="date" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="code">Code de sécurité</label>
                                            <input type="text" className="form-control" name="code" id="code" />
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-primary w-100" onClick={() => handleSubmit()}>Payer</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="card">
                                    <div className="card-header">
                                        Récapitulatif
                                    </div>
                                    <div className="card-body">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>Modele {modele.nom}</td>
                                                    <td>{modele.prix} €</td>
                                                </tr>
                                                { chosenOptions.length > 0 && (
                                                    <tr>
                                                        <td className="fw-bold">Vos options:</td>
                                                    </tr>
                                                )}
                                                {
                                                    chosenOptions.map((option: any) => {
                                                        return (
                                                            <tr key={option.id}>
                                                                <td>{option.nom}</td>
                                                                <td>{option.prix} €</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="card-footer">
                                        <p className="fw-bold">TOTAL: {handleGetTotal()} €</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                
                </>
                )
            }
        </>
    );
}

export default Customise;
