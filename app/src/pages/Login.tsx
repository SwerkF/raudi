import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    
    const navigate = useNavigate();
    const [data, setData] = useState<any>([]);

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
                .catch((err:any) => {
                    localStorage.removeItem("token");
                    console.log(err)
                })
                
        }
    }, []);

    const handleChange = (champ: any, event: any) => {
        setData({ ...data, [champ]: event.target.value });
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        axios.post("http://localhost:3000/api/user/login", data)
            .then((response) => {
                if(response.status === 200) {
                    localStorage.setItem("token", response.data.token);
                    window.location.href = "/";
                }
            })
    }

    // redirect register
    const  handleRedirect = () => {
        navigate("/register");
    }

    return (
        <>
            <div className="card bg-light">
            <article className="card-body mx-auto" style={{ maxWidth: '400px' }}>
              <h4 className="card-title mt-3 text-center">Connexion</h4>
              <p className="text-center">Connectez-vous à votre compte</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group input-group mb-2">
                    <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                  <input name="" className="form-control" placeholder="Adresse email" type="email" onChange={(e)=>handleChange('email',e )} />
                </div>
                <div className="form-group input-group mb-2">
                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                  <input className="form-control" placeholder="Mot de passe" type="password" onChange={(e)=>handleChange('password',e )}/>
                </div>
                <div className="form-group mt-2 text-center">
                  <button type="submit" className="btn btn-primary btn-block">Connexion</button>
                </div>
                <p className="text-center">Pas encore de compte? <a  onClick={handleRedirect} href="#">Créer un compte</a> </p>
              </form>
            </article>
          </div>
        </>
    )

}

export default Login