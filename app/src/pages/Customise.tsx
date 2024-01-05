// importer useEffect et useState
import { useEffect, useState } from "react"

// importer axios
import axios from "axios"

function Customise() {

    const [modele, setModele] = useState<any>(null)
    const [options, setOptions] = useState<any>([])
    const [chosenOptions, setChosenOptions] = useState<any>([])
    const [total, setTotal] = useState<number>(0)

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
        setTotal(total);
    }

    const handleAddOption = (option: any) => {
        setChosenOptions([...chosenOptions, option]);
        handleGetTotal();
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

    return (
        <>
            {
                modele &&  (
                    <>
                        <h1>Cutomisation de {modele.nom}</h1>
                        <div className="container">
                            <div className="row">
                                <div className="col-9">
                                    <h2>1. Votre modele</h2>
                                    <div className="d-flex justif-content-start">
                                        <div className="image" style={{paddingRight: "30px"}}>
                                            <img src={'http://localhost:3000/images/'+modele.image} width={'100px'} alt={modele.image} />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <p className="fw-bold mb-0">Modele {modele.nom}</p>
                                            <p className="mb-0">{modele.prix} € - {modele.vitesse_max} km/h - <span style={{width: "20px", height: "20px", borderRadius: "50%", backgroundColor: handleGetColor(modele.couleur), display: "inline-block"}}></span> {modele.couleur}
                                            </p>
                                        </div>
                                    </div>
                                    <h2>2. Choisissez vos options</h2>
                                    <div className="row">
                                        {
                                            options && options.map((option: any) => {
                                                return (
                                                    // checkboxes no cards
                                                    <div key={option.id} className="col-3 d-flex flex-row align-items-center">
                                                        <input type="checkbox" name={option.nom} value={option.nom} onChange={() => handleAddOption(option)} />
                                                        <label htmlFor={option.nom}>{option.nom} - {option.prix} €</label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="card">
                                        <div className="card-header">
                                            Récapitulatif
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p>Modèle {modele.nom}</p>
                                                </div>
                                                <div className="col-6">
                                                    <p>{modele.prix}</p>
                                                </div>
                                                {
                                                    options && options.map((option: any) => {
                                                        return (
                                                            <div key={option.id} className="row">
                                                                <div className="col-6">
                                                                    <p>{option.nom}</p>
                                                                </div>
                                                                <div className="col-6">
                                                                    <p>{option.prix}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <p>Total</p>
                                                </div>
                                                <div className="col-6">
                                                    {total}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-primary">Commander</button>
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
