import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    
    const navigate = useNavigate();
    const [data, setData] = useState<any>([]); 


   const handleChange = (champ: any, event: any) => {
        setData({ ...data, [champ]: event.target.value });
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(data);
        axios.post("http://localhost:3000/api/user/register", data)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token);
                    navigate("/");
                }
            });
    };

    const  handleRedirect = () => {
        navigate("/login");
    }

    return (
        <>
          <div className="card bg-light">
            <div className="card-body mx-auto" style={{ maxWidth: '400px' }}>
              <h4 className="card-title mt-3 text-center">Créer un compte</h4>
              <p className="text-center">Commencez par créer votre compte</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group input-group mb-2">
                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                  <input name="" className=" form-control" placeholder="Nom" type="text"  onChange={(e)=>handleChange('nom',e )}/>
                </div>
                <div className="form-group input-group mb-2">
                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                  <input name="" className=" form-control" placeholder="Prenom" type="text"  onChange={(e)=>handleChange('prenom',e )}/>
                </div>
                <div className="form-group input-group mb-2">
                    <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                  <input name="" className="form-control" placeholder="Adresse email" type="email" onChange={(e)=>handleChange('email',e )} />
                </div>
                <div className="form-group input-group mb-2">
                    <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                  <select className="custom-select" style={{ maxWidth: '120px' }} >
                    <option selected>+33</option>
                    <option value="1">+242</option>
                  </select>
                  <input name="" className="form-control" placeholder="Numéro de téléphone" type="text" onChange={(e)=>handleChange('telephone',e )}/>
                </div>
                <div className="form-group input-group mb-2">
                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                  <input className="form-control" placeholder="Mot de passe" type="password" />
                </div>
                <div className="form-group input-group mb-2">
                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                  <input className="form-control" placeholder="Confirmer le mot de passe" type="password" onChange={(e)=>handleChange('password',e )} />
                </div>
                <div className="form-group mt-2 text-center">
                  <button type="submit" className="btn btn-primary btn-block">Créer un compte</button>
                </div>
                <p className="text-center">Deja un compte? <a href="#" onClick={handleRedirect}>Connexion</a> </p>
              </form>
            </div>
          </div>
        </>
      )
      

}

export default Register