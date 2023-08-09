import React, { useState, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastError from "../../components/Toasts/ToastError";
import "./Login.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [username, setUsername] = useState(localStorage.getItem("Username"));
  const [password, setPassword] = useState(localStorage.getItem("Password"));
  const [showPassword, setShowPassword] = useState(false);
  const [validacao, setValidacao] = useState(false);
  const { signIn, signed } = useContext(AuthContext);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(username, password, validacao);
    ToastError({ message: "Usuário ou senha inválidos" });
  };
  if (!signed) {
    return (
      <div className="container-login" onSubmit={handleSubmit}>
        <ToastContainer />
        <form className="formulario">
          <div id="response-error"></div>
          <h2>Faça seu login</h2>
          <label>
            Usuário:
            <input
              id="cpf"
              aria-label="digite aqui o nome de usuário"
              className="formulario-cpf"
              type="text"
              name="usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Senha:
            <div className="input-with-icon">
              <input
                id="senha"
                aria-label="digite aqui sua senha"
                className="formulario-senha"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Digite aqui sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="btn-toggle-password"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </label>
          <div className="divLembrar">
            <input
              type="checkbox"
              onChange={(e) => {
                if (validacao === false) {
                  setValidacao(true);
                } else {
                  setValidacao(false);
                }
              }}
            />
            <h3>Deseja lembrar a senha?</h3>
          </div>

          <button aria-label="Entrar" className="btnsenha" type="submit">
            Entrar
          </button>
        </form>
        <div className="naotemconta">
          <p>Ainda não possui uma conta?</p>
          <Link to={"/registrar"}>
            <button>Crie sua conta aqui</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/home" />;
  }
};

export default Login;
