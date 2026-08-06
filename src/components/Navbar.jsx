import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {

    const navigate = useNavigate();


    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };


    return (

        <nav style={{
            padding: "15px",
            background: "#222",
            color: "white"
        }}>


            <h2>
                Research Nexus
            </h2>


            <div>


                <Link 
                    to="/dashboard"
                    style={{color:"white", margin:"10px"}}
                >
                    Dashboard
                </Link>



                <Link 
                    to="/projects"
                    style={{color:"white", margin:"10px"}}
                >
                    Projects
                </Link>



                <Link 
                    to="/profile"
                    style={{color:"white", margin:"10px"}}
                >
                    Profile
                </Link>



                <button onClick={logout}>
                    Logout
                </button>


            </div>


        </nav>

    );
}


export default Navbar;