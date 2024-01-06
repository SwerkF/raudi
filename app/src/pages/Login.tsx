import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            axios.get("http://localhost:3000/api/user/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    if(response.status === 200) {
                        navigate("/");
                    } else {
                        localStorage.removeItem("token");
                    }
                })
                .catch((err) => {
                    localStorage.removeItem("token");
                })
                
        }
    }, []);

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        axios.post("http://localhost:3000/api/user/login", {
            email: email,
            password: password
        })
            .then((response) => {
                if(response.status === 200) {
                    localStorage.setItem("token", response.data.token);
                    window.location.href = "/";
                }
            })
    }

    // redirect register
    const handleRedirect = () => {
        navigate("/register");
    }

    return (
        <>
            <div className="container">
                <div className="card w-50">
                    <div className="card-header">
                        <h1>Login</h1>
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
                        <button onClick={handleSubmit} className="btn btn-primary">Se connecter</button>
                    </div>
                    <div className="card-footer">
                        Vous n'avez pas de compte ? <button onClick={handleRedirect} className="btn btn-link">Inscrivez-vous</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Login