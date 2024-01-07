import { useState, useEffect } from "react";
import axios from "axios";
// navigation link
import { useNavigate } from "react-router-dom";

function Nav() {
    
    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);

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
                        setUser(response.data.user);
                        console.log(response.data.user)
                    } else {
                        localStorage.removeItem("token");
                    }
                })
                .catch((err) => {
                    localStorage.removeItem("token");
                })
                
        } else {
            navigate("/login");
        }
    }, []);

    const handleRedirect = (menu: string) => {
        navigate(menu);
    }

    const handleDisconnect = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Car Configurator</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" 
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">Accueil</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/modeles">Modeles</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            {user ? (
                                <>
                                    <li className="nav-item" onClick={() => handleRedirect("/profile/"+user.id)}>
                                        <button className="nav-link">Profile</button>
                                    </li>
                                    <li className="nav-item" onClick={() => handleDisconnect()}>
                                        <button className="nav-link">Logout</button>
                                    </li>
                                    {
                                        user.role && user.role.nom == "Admin" ? (
                                            <li className="nav-item" onClick={() => handleRedirect("/admin")}>
                                                <button className="nav-link">Admin</button>
                                            </li>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    <li className="nav-item" onClick={() => handleRedirect("/login")}>
                                        <button className="nav-link">Login</button>
                                    </li>
                                    <li className="nav-item" onClick={() => handleRedirect("/register")}>
                                        <button className="nav-link">Register</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav