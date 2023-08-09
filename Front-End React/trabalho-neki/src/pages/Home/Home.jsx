import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { signOut } = useContext(AuthContext);

  const EfetuarLogout = async () => {
    await signOut();
  };

  return (
    <div className="container-home">
      <div className="box1"></div>
      <div className="box2">
        <h2>O que deseja fazer?</h2>
        <div className="divBtn">
          <Link to="/skills">
            <button
              aria-label="Skills cadastradas"
              tabIndex={0}
              className="btn"
            >
              Ver Skills
            </button>
          </Link>
          <Link to="/cadastroskill">
            <button aria-label="Cadastro Skill" tabIndex={0} className="btn">
              Cadastrar Skills
            </button>
          </Link>
          <button
            aria-label="Cadastro Skill"
            tabIndex={0}
            className="btn"
            onClick={() => EfetuarLogout()}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
