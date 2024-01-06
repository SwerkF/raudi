import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [nom, setNom] = useState<string>("");
    const [prenom, setPrenom] = useState<string>("");

    // handle all var
    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleNomChange = (event: any) => {
        setNom(event.target.value);
    }

    const handlePrenomChange = (event: any) => {
        setPrenom(event.target.value);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        axios.post("http://localhost:3000/api/user/register", {
            email: email,
            password: password,
            nom: nom,
            prenom: prenom
        })
            .then((response) => {
                if(response.status === 200) {
                    localStorage.setItem("token", response.data.token);
                    navigate("/");
                }
            })
    };

    return (
        <>
            <div className="container">
                <div className="card w-50">
                    <div className="card-header">
                        <h1>Register</h1>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={handleEmailChange} className="form-control" id="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" value={password} onChange={handlePasswordChange} className="form-control" id="password" placeholder="Mot de passe" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nom">Nom</label>
                            <input type="text" value={nom} onChange={handleNomChange} className="form-control" id="nom" placeholder="Nom" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="prenom">Prénom</label>
                            <input type="text" value={prenom} onChange={handlePrenomChange} className="form-control" id="prenom" placeholder="Prénom" />
                        </div>
                        <button onClick={handleSubmit} className="btn btn-primary">S'inscrire</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Register