import React, { useEffect, useState } from "react";

const carritoContext = React.createContext();
const { Provider } = carritoContext;

function CarritoProvider({children}){

  const [lista, setLista] = useState([]);

  function agregar(producto, cantidad) {
    const nProducto = {  ...producto, cantidad};
    console.log(nProducto);
    const productoRepetido = lista.some(item => item.nombre === nProducto.nombre);
    if(productoRepetido) {
      const nLista = lista.map(item => {
        if (item.nombre === nProducto.nombre) {
          return { ...item, cantidad : item.cantidad + cantidad };
        }
      })
      setLista(nLista);
    } else {
      const nLista = [...lista, nProducto ];
      setLista(nLista);
    }
  }

  function quitar(id) {
    const nLista = lista.filter((elem) => elem._id !== id);
    setLista(nLista);
  }

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setLista(JSON.parse(carritoGuardado));
    }
  },[]);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(lista));
  },[lista]);

    return(
        <Provider value={{lista, agregar, quitar}}>
            {children}
        </Provider>
    )
}

export { CarritoProvider, carritoContext };