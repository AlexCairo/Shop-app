import "../styles/MiPerfil.css";
import FormComponent from "../components/FormComponent";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useEffect,useContext } from "react";
import { BiLogOut } from "react-icons/bi";

const MiPerfilPage = () => {

    const navigate = useNavigate()
    const { loginRegister } = useParams();
    const token = localStorage.token;
    const { user, email, logout } = useContext(UserContext)

    const logoutUser = () => {
        logout();
        navigate("/cuenta/login");
    }

    useEffect(()=>{
        if (token && (loginRegister === "login" || loginRegister === "register")) {
            navigate("/cuenta/detalle");
          }      
    },[loginRegister,token,navigate])

    return (
            <section className="mi-perfil-section">
            {!token ? (<FormComponent />) : (
                    <>
                    <h1 className="mi-perfil-title">Mi Cuenta</h1>                    
                    <div className="informacion-cuenta">
                        <span className="informacion-cuenta-subtitle">Información de la cuenta</span>
                        <div className="informacion-cuenta-blocks">
                            <div className="informacion-block">
                                <h4 className="informacion-block-title">Información del contacto</h4>
                                <ul className="informacion-block-about">
                                    <li>{user}</li>
                                    <li>{email}</li>
                                </ul>
                                <a href="/" className="informacion-block-tools">Editar</a>
                            </div>
                            <div className="informacion-block">
                                <h4 className="informacion-block-title">Mis pedidos</h4>
                                <ul>

                                </ul>
                                <a href="/" className="informacion-block-tools">Ver más</a>
                            </div>
                        </div>
                        <button onClick={logoutUser} className="informacion-cuenta-logout-button"><BiLogOut /> Salir de la cuenta</button>
                    </div>
                    </>
            )}
            </section>
    )
}

export default MiPerfilPage;