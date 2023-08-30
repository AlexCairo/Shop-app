import { BsWhatsapp } from "react-icons/bs";
import { BiUser, BiShoppingBag, BiLogOutCircle } from "react-icons/bi";
import { AiOutlineUserAdd, AiOutlineCloseSquare } from "react-icons/ai";
import "../styles/Navbar.css"
import { HiMiniBars3BottomLeft } from "react-icons/hi2"
import { useContext, useState, useEffect } from "react";
import { SiPlaystation5, SiPlaystation4, SiPlaystation3,SiNintendoswitch } from "react-icons/si"
import MenuWithSubmenu from "../components/SubMenu"; 
import { NavbarLink } from "../components/LinkandNavLink";
import { GoTriangleDown } from "react-icons/go";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate()
    const [openMenu, SetOpenMenu] = useState(false);
    const toggle = () => SetOpenMenu(!openMenu);
    const { user, logout } = useContext(UserContext);
    
    const closeMenuOnSmallScreen = () => {
        if (window.innerWidth <= 925) {
          SetOpenMenu(false);
        }
    }
    const handleLogout = () => {
        logout();
        navigate("/");
    } 

    const menuItems = [
        {
            name : "VIDEOJUEGOS",
            path : "/productos/videojuego/all",
            subMenuItems : [
                {
                    icon : <SiPlaystation5/>,
                    name : "Playstation 5",
                    path : "/productos/videojuego/playstation-5"
                },
                {
                    icon : <SiPlaystation4/>,
                    name : "Playstation 4",
                    path : "/productos/videojuego/playstation-4"
                },
                {
                    icon : <SiPlaystation3/>,
                    name : "Playstation 3",
                    path : "/productos/videojuego/playstation-3"
                },
                {
                    icon : <SiNintendoswitch/>,
                    name : "Nintendo Switch",
                    path : "/productos/videojuego/nintendo-Switch"
                }
            ]
        },
        {
            name : "CONSOLAS",
            path : "/productos/consola/all",
            subMenuItems : [
                {
                    icon : <SiPlaystation5/>,
                    name : "Playstation 5",
                    path : "/productos/consola/playstation-5",
                },
                {
                    icon : <SiPlaystation4/>,
                    name : "Playstation 4",
                    path : "/productos/consola/playstation-4"
                },
                {
                    icon : <SiPlaystation3/>,
                    name : "Playstation 3",
                    path : "/productos/consola/playstation-3"
                },
                {
                    icon : <SiNintendoswitch/>,
                    name : "Nintendo Switch",
                    path : "/productos/consola/nintendo-Switch"
                },
            ]
        },
        {
            name : "ACCESORIOS",
            path : "/productos/accesorio/all",
            subMenuItems : [
                {
                    icon : <SiPlaystation5/>,
                    name : "Playstation 5",
                    path : "/productos/accesorio/playstation-5",
                },
                {
                    icon : <SiPlaystation4/>,
                    name : "Playstation 4",
                    path : "/productos/accesorio/playstation-4"
                },
                {
                    icon : <SiPlaystation3/>,
                    name : "Playstation 3",
                    path : "/productos/accesorio/playstation-3"
                },
                {
                    icon : <SiNintendoswitch/>,
                    name : "Nintendo Switch",
                    path : "/productos/accesorio/nintendo-Switch"
                }
            ]
        },
    ]

    useEffect(() => {
        window.addEventListener('resize', closeMenuOnSmallScreen);
    
        // Limpia el listener cuando el componente se desmonta
        return () => {
          window.removeEventListener('resize', closeMenuOnSmallScreen);
        };
      }, []);

    return (
        <header>
            <section className = "pre-navbar">
                <div className = "pre-navbar-logo">
                    <div onClick={toggle}>
                        <HiMiniBars3BottomLeft />
                    </div>
                    <NavbarLink to={"/"}>CYBER</NavbarLink>
                </div>
                <div className="navbar-links">
                    <ul className="list-links">
                        <li><a className = "link-item" href = "/productos/videojuego/all" >Videojuegos</a><GoTriangleDown/> </li>
                        <li><a className = "link-item" href = "/productos/consola/all" >Consolas</a><GoTriangleDown/> </li>
                        <li><a className = "link-item" href = "/productos/accesorio/all" >Accesorios</a><GoTriangleDown/> </li>
                    </ul>
                </div>
                <ul>
                    <li>
                        <a className="pre-navbar-link" href="/">
                            <BsWhatsapp className = "pre-navbar-icon" /> <br/>
                            <strong>Escríbenos</strong>
                        </a>
                    </li>
                    <li>
                        <a className="pre-navbar-link" href={`/cuenta/${user ? "detalle" : "login"}`}>
                            <BiUser className = "pre-navbar-icon" /> <br/>
                            <strong>Mi Perfil</strong>
                        </a>
                    </li>
                    <li>
                        <a className="pre-navbar-link" href="/">
                            <BiShoppingBag className = "pre-navbar-icon" /> <br/>
                            <strong>Mi Bolsa</strong>
                        </a>
                    </li>
                </ul>
            </section>
            <div className="div" style={{ left: openMenu ? "0%" : "-100%"}}>
                    <div className="div-close-menu">
                        <AiOutlineCloseSquare className="icon-close-menu" onClick={toggle}/>
                    </div>
                    <ul className="div-list">
                        {menuItems.map((item,index) => (
                            <MenuWithSubmenu
                                key={index}
                                menuItems = {item}
                            /> 
                        ))}                  
                    </ul>
                    {user ? 
                    <>
                        <li className="div-menu-user">
                            <span><BiUser className="div-icon-user"/>{user}</span>
                        </li>
                        <button className="button-logout-user" onClick={handleLogout}>
                            <BiLogOutCircle className="icon-logout-user"/>Logout
                        </button>
                    </> : 
                    <>
                        <li className="div-menu-user">
                            <a href="/cuenta/login"><BiUser className="div-icon-user"/>iniciar sesión</a>
                        </li>
                        <li className="div-menu-user">
                            <a href="/cuenta/register"><AiOutlineUserAdd className="div-icon-user"/>crear cuenta</a>
                        </li>
                    </>
                    }
            </div>
        </header>
    )
}

export default Navbar;