import { Link } from "react-router-dom";
import "./TelaInicial.css";

const TelaInicial = () => {
  return (
    <div className="container-home">
      <div className="box1"></div>
      <div className="box2">
        <h2>Bem vindo ao NekiSkills</h2>
        <div className="divBtn">
          <Link to={`/login`}>
            <button aria-label="Login" tabIndex={0} className="btn">
              Logar
            </button>
          </Link>
          <Link to={`/registrar`}>
            <button aria-label="Cadastro" tabIndex={0} className="btn">
              Cadastrar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TelaInicial;
