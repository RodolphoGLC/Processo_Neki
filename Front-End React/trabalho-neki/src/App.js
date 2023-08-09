import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import TelaInicial from "./pages/TelaInicial/TelaInicial";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Skills from "./pages/Skills/Skills"
import CadastroSkill from "./pages/CadastroSkill/CadastroSkill";
import EditarSkill from "./pages/EditarSkill/EditarSkill";

import AuthContext from "./context/AuthContext";

import "./App.css";

function App() {
  return (
    <div>
      <AuthContext>
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/" element={<TelaInicial />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registrar" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/cadastroskill" element={<CadastroSkill />} />
              <Route path="/editarskill" element={<EditarSkill />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthContext>
    </div>
  );
}

export default App;