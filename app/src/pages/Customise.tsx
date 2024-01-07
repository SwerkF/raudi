// importer useEffect et useState
import { useEffect, useState } from "react"

// importer axios
import axios from "axios"

function Customise() {

    const [modele, setModele] = useState<any>(null)
    const [options, setOptions] = useState<any>([])
    const [chosenOptions, setChosenOptions] = useState<any>([])
    const [total, setTotal] = useState<number>(0)

    const [adresse, setAdresse] = useState<any>('')
    const [cp, setCp] = useState<any>('');
    const [ville, setVille] = useState<any>('');
    const [tel, setTel] = useState<any>('');

    useEffect(() => {
        const id = window.location.href.split("/")[4];
        axios.get(`http://localhost:3000/api/modele/${id}`)
            .then((response) => {
                setModele(response.data);
                setTotal(response.data.prix);
                axios.get(`http://localhost:3000/api/options`)
                    .then((response) => {
                        setOptions(response.data);
                    })
                
            })
    }, [])

    const handleGetTotal = () => {
        let total = modele.prix;
        chosenOptions.map((option: any) => {
            total += option.prix;
        })
        return total;
    }

    const handleOption = (option: any) => {
        // add or remove option
        let newChosenOptions = [...chosenOptions];
        if(newChosenOptions.includes(option)) {
            newChosenOptions = newChosenOptions.filter((item: any) => item.id !== option.id);
        } else {
            newChosenOptions.push(option);
        }
        setChosenOptions(newChosenOptions);
    }

    const handleGetColor = (color: string) => {
        // using color which is modele.couleur, return hex color
        
        switch(color) {
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
            default:
                return "#000000";
                break;
        }
    }

    const handleSubmit = () => {
        const token = localStorage.getItem("token");
        const id = window.location.href.split("/")[4];
        // if all values are not set return
        if(!adresse || !cp || !ville || !tel) {
            return alert("Veuillez remplir tous les champs");
        }

        axios.post(`http://localhost:3000/api/achat`, {
            modele_id: id,
            options: chosenOptions,
            adresse: adresse,
            cp: cp,
            ville: ville,
            tel: tel
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if(response.status === 200) {
                    alert("Votre commande a bien été prise en compte");
                    window.location.href = "/";
                }
            })
    }

    return (
        <>
            {
                modele &&  (
                    <>
                        <div className="container">
                            <h1>Cutomisation de {modele.nom}</h1>
                            <div className="row">
                                <div className="col-9">
                                    <h2>1. Votre modele</h2>
                                    <div className="d-flex justif-content-start">
                                        <div className="image" style={{paddingRight: "30px"}}>
                                            <img src={'http://localhost:3000/src/'+modele.image} width={'100px'} alt={modele.image} />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <p className="fw-bold mb-0">Modele {modele.nom}</p>
                                            <p className="mb-0">{modele.prix} € - {modele.vitesse_max} km/h - <span style={{width: "20px", height: "20px", borderRadius: "50%", backgroundColor: handleGetColor(modele.couleur), display: "inline-block"}}></span> {modele.couleur}
                                            </p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <h2 className="mt-4">2. Choisissez vos options</h2>
                                    <div className="row">
                                        {
                                            options && options.map((option: any) => {
                                                return (
                                                    // checkboxes no cards
                                                    <div key={option.id} className="col-3 d-flex flex-row align-items-center">
                                                        <input type="checkbox" name={option.nom} value={option.nom} onChange={() => handleOption(option)} />
                                                        <label htmlFor={option.nom}>{option.nom} - {option.prix} €</label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <hr/>
                                    <h3 className="mt-4">3. Vos informations</h3>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="adresse">Adresse</label>
                                                <input type="text" className="form-control" name="adresse" id="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="cp">Code postal</label>
                                                <input type="text" className="form-control" name="cp" id="cp" value={cp} onChange={(e) => setCp(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="ville">Ville</label>
                                                <input type="text" className="form-control" name="ville" id="ville" value={ville} onChange={(e) => setVille(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="tel">Téléphone</label>
                                                <input type="text" className="form-control" name="tel" id="tel" value={tel} onChange={(e) => setTel(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <h3 className="mt-4">4. Paiement</h3>
                                    <div className="row">
                                        <div className="card">
                                            <div className="card-header">
                                                <p>Carte bancaire</p>
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
    )
}

export default Customise
