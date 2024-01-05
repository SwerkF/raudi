// importer useEffect et useState
import { useEffect, useState } from "react"

// importer axios
import axios from "axios"

function Customise() {

    // Créer une variable React 
    const [modele, setModele] = useState<any>(null)
  
    // Changer la valeur de la variable React
    // setModele("Tesla Model S")

    // Lancement au chargement de la page
    // Permet de faire des requêtes de base de données
    useEffect(() => {
        // Requete HTTP GET avec axios
        axios.get("http://localhost:3000/api/modele/1")
            .then((response) => {
                // Changer la valeur de la variable React
                setModele(response.data);
            })
    }, [])

    // Affichage des informations
    return (
        <>
            <h2>Customise</h2>
            <p>Modele: {modele?.nom}</p>
        </>
    )
}

export default Customise
