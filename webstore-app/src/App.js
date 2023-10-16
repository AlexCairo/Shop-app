import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//Pages
import ErrorPage from "../src/pages/ErrorPage";
import PrincipalPage from "../src/pages/PrincipalPage";
import ProductosPage from "../src/pages/ProductosPage";
import DetallePage from "../src/pages/DetallePage";
import MiBolsaPage from "../src/pages/MiBolsaPage";
import MiPerfilPage from "../src/pages/MiPerfilPage";

//Context
import { UserProvider } from "./context/UserContext";
import { CarritoProvider } from "./context/CarritoContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CarritoProvider>
          <Navbar />
          <Routes>
            <Route path = "/" element = {<PrincipalPage />} />
            <Route path = "/productos/:categoria/:plataforma" element = {< ProductosPage />} />
            <Route path = "/detalle/:idProducto" element = {< DetallePage />} />
            <Route path = "/mi-bolsa" element = {<MiBolsaPage />} />
            <Route path = "/cuenta/:loginRegister" element = {<MiPerfilPage />} />
            <Route path = "*" element = {<ErrorPage />} />
          </Routes>
          <Footer/>
        </CarritoProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
