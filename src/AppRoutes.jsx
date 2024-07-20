import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaBaseFormulario from "./pages/PaginaBaseFormulario";
import CadastroPaises from "./pages/CadastroPaises";
import CadastroEstados from "./pages/CadastroEstados";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaBaseFormulario />}>
                <Route path="/paises" element={<CadastroPaises />} />                  
                <Route path="/estados" element={<CadastroEstados />} />   
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
