import { useState, useEffect } from "react";
import axios from "axios";
// navigation link
import { useNavigate } from "react-router-dom";
import Raudi from "../assets/RAUDI.png";

function Nav() {
    
    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);
    const [active, setActive] = useState<string>("home");

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
                
        } 
    }, []);

    const handleRedirect = (menu: string) => {
        navigate(menu);
    }

    const handleActive = (menu: string) => {
        setActive(menu);
    }

    const handleDisconnect = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={Raudi} alt="logo"  height="50" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" 
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item" onClick={() => handleRedirect("/")} >
                                <button className={active === "home" ? "nav-link active" : "nav-link"} onClick={() => handleActive("home")}>Home</button>
                            </li>
                            <li className="nav-item" onClick={() => handleRedirect("/modele")}>
                                <button className={active === "catalogue" ? "nav-link active" : "nav-link"} onClick={() => handleActive("catalogue")}>Catalogue</button>
                            </li>
                            <li className="nav-item" onClick={() => handleRedirect("/contact")}>
                                <button className={active === "contact" ? "nav-link active" : "nav-link"} onClick={() => handleActive("contact")}>Contact</button>
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