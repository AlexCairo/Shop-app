import { useEffect, useState } from 'react';
import '../styles/CarruselProductos.css'; // Estilos CSS para el carrusel
import { MdOutlineNavigateNext,MdOutlineNavigateBefore } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IMG_URL } from "../helpers/config";
import { Link } from 'react-router-dom';

const CarruselProductos = ({ productosCarrusel }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imagesPerSlide, setImagesPerSlide] = useState(2);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handlePrevClick = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? productosCarrusel.length - imagesPerSlide : prevIndex - imagesPerSlide
      );
    };
  
    const handleNextClick = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === productosCarrusel.length - imagesPerSlide ? 0 : prevIndex + imagesPerSlide
      );
    };

    useEffect(() => {
     
      const handleResize = () => {
        setWindowWidth(window.innerWidth); 
      };
  
      window.addEventListener('resize', handleResize);

      if (windowWidth >= 585) {
        setImagesPerSlide(3);
      } else if (windowWidth >= 810) {
        setImagesPerSlide(4);
      } else {
        setImagesPerSlide(2);
      }
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [windowWidth]); 

    return (
        <section className="carousel-container">
          <MdOutlineNavigateBefore className="button button-prev" onClick={handlePrevClick} />
          <div className="carousel-productos">
            <div
              className="carousel-productos-inner"
              style={{ transform: `translateX(-${currentIndex * (100 / imagesPerSlide)}%)` }}
            >
              {productosCarrusel.map((producto) => (
                <div key={producto._id} className="carousel-productos-item">
                  <Link to={`/detalle/${producto._id}`}>
                    <img src={`${IMG_URL}${producto.imagen}`} alt={producto.nombre} />
                  </Link>
                  <p>
                      <span>{producto.nombre}</span> <br/>
                      <strong>{`S/${producto.precio}`}</strong>
                  </p>
                  <AiOutlineShoppingCart className="icon-add-cart"/>
                </div>
              ))}
            </div>
          </div>
          <MdOutlineNavigateNext className="button button-next" onClick={handleNextClick} />
        </section>
      );
    };

export default CarruselProductos;