import { Link, useParams } from "react-router-dom";
import "../styles/ProductoPage.css";
import { obtenerProductos } from "../services/Productos.service";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { IMG_URL } from "../helpers/config";

const menuItems = [
        {
            name : "VIDEOJUEGOS",
            path : "/productos/videojuego/all",
            subMenuItems : [
                {
                    name : "Playstation 5",
                    path : "/productos/videojuego/playstation-5"
                },
                {
                    name : "Playstation 4",
                    path : "/productos/videojuego/playstation-4"
                },
                {
                    name : "Playstation 3",
                    path : "/productos/videojuego/playstation-3"
                },
                {
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
                    name : "Playstation 5",
                    path : "/productos/consola/playstation-5",
                },
                {
                    name : "Playstation 4",
                    path : "/productos/consola/playstation-4"
                },
                {
                    name : "Playstation 3",
                    path : "/productos/consola/playstation-3"
                },
                {
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
                    name : "Playstation 5",
                    path : "/productos/accesorio/playstation-5",
                },
                {
                    name : "Playstation 4",
                    path : "/productos/accesorio/playstation-4"
                },
                {
                    name : "Playstation 3",
                    path : "/productos/accesorio/playstation-3"
                },
                {
                    name : "Nintendo Switch",
                    path : "/productos/accesorio/nintendo-Switch"
                }
            ]
        },
    ]

const ProductosPage = () => {

    const [ loading, setLoading ] = useState(true);
    const [listaProductos, setListaProductos] = useState();
    const { categoria, plataforma } = useParams();

    const Banners = {
        videojuego : "https://www.mundodeportivo.com/alfabeta/hero/2022/01/personajes-populares-videojuegos.webp?width=1200&aspect_ratio=16:9",
        consola : "https://puntoseguido.upc.edu.pe/wp-content/uploads/2020/05/consolas.jpeg",
        accesorio : "https://plugmedia-wp-uploads.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2020/08/ps5controllertitle-696x392.jpg"
    }

    const getProductos = async(categoria, plataforma) => {
        const res = await obtenerProductos(categoria, plataforma);
        setListaProductos(res.data);
        setLoading(false);
    }

    useEffect(()=>{
        getProductos(categoria,plataforma);
    },[categoria,plataforma])

    const imgUrl = Banners[categoria];

    return (
        <>
        <section className="banner-productos">
            <div className="banner" style={{backgroundImage : `url(${imgUrl})`}}>
                <span className="banner-title">{categoria}s</span>
            </div>
        </section>
        {loading ? <Loader /> : 
            <section className="productos-grid">
                 <div className="productos-rutas-left">
                    <ul className="ul">
                        {menuItems.map((menuItem, index) => (
                            <li key={index}>
                                <a style={{color : `${window.location.pathname.includes(menuItem.path) && "#ff7009"}`}} href={menuItem.path} >{menuItem.name}</a>
                                {menuItem.subMenuItems && (
                                    <ul className="submenu-rutas-left">
                                        {menuItem.subMenuItems.map((subMenuItem, subIndex) => (
                                            <li key={subIndex}>
                                                <a style={{color : `${window.location.pathname.includes(subMenuItem.path) && "#ff7009"}`}} href={subMenuItem.path}>{subMenuItem.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="container-productos-grid">
                    {listaProductos.length === 0 ? <div className="sin-resultado">Sin resultados</div>
                        :
                        listaProductos.map(producto => (
                            <div key={producto._id} className="producto">
                                <Link to={`/detalle/${producto._id}`}>
                                    <img src={`${IMG_URL}${producto.imagen}`} alt={producto.nombre} />
                                </Link>
                                <p>
                                    <span>{producto.nombre}</span> <br/>
                                    <strong>{`S/${producto.precio}`}</strong>
                                </p>
                                <button>Añadir al carrito</button>
                            </div>
                        ))}
                </div>
            </section>}
            <div id="div"></div>
        </>
    )
}

export default ProductosPage;