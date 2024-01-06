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
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button onClick={() => handleRedirect("/")} className="navbar-brand">Logo</button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item" onClick={() => handleRedirect("/")}>
                                <button className="nav-link active" aria-current="page">Home</button>
                            </li>   
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            {user ? (
                                <>
                                    <li className="nav-item" onClick={() => handleRedirect("/profile")}>
                                        <button className="nav-link">Profile</button>
                                    </li>
                                    <li className="nav-item" onClick={() => handleRedirect("/logout")}>
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