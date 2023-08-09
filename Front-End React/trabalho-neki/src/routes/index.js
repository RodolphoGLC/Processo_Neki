import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./privateRoutes";

import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import TelaInicial from "../pages/TelaInicial/TelaInicial";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import Skills from "../pages/Skills/Skills"
import CadastroSkill from "../pages/CadastroSkill/CadastroSkill";
import EditarSkill from "../pages/EditarSkill/EditarSkill";
import AuthContext from "../context/AuthContext";

import "../App.css";

export function Rotas() {
  return (
    <AuthContext>
      <BrowserRouter>
        <div className="container">
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<TelaInicial />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            {/*Rotas privadas*/}
            <Route path="/home" element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/skills" element={<PrivateRoutes />}>
              <Route path="/skills" element={<Skills />} />
            </Route>
            <Route path="/cadastroskill" element={<PrivateRoutes />}>
              <Route path="/cadastroskill" element={<CadastroSkill />} />
            </Route>
            <Route path="/editarskill" element={<PrivateRoutes />}>
              <Route path="/editarskill" element={<EditarSkill />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext>
  );
}
