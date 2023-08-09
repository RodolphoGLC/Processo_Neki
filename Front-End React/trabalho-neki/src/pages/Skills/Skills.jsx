import { useState, useEffect } from "react";
import { Api } from "../../api/api";
import "react-toastify/dist/ReactToastify.css";
import "./Skills.css";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ToastError from "../../components/Toasts/ToastError";
import ToastSuccess from "../../components/Toasts/ToastSuccess";
import Return from "../../assets/return.png";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();
  const notify = () => toast();

  useEffect(() => {
    let idUser = localStorage.getItem("idUser");
    let token = localStorage.getItem("token");

    const SkillsUsuario = async () => {
      await Api.get(`/skills/usuario/${idUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          console.log(response.data);
          setSkills(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    SkillsUsuario();
  }, []);

  const deletarSkill = async (id) => {
    let tokenUser = localStorage.getItem("token");

    if (window.confirm("Você dejesa deletar a skill?") === true) {
      await Api.delete(`/skills/${id}`, {
        headers: { Authorization: `Bearer ${tokenUser}` },
      })
        .then(() => {
          ToastSuccess({ message: "Delete realizado com sucesso!" });
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        })
        .catch((e) => {
          console.log(e);
          ToastError({ message: "Erro ao realizar o delete!" });
        });
    }
  };

  return (
    <div className="container-skills">
      <Link to="/home">
        <button className="setaVoltar">
          <img
            src={Return}
            alt="Voltar para a página inicial"
            className="setaImg"
          />
        </button>
      </Link>
      <div className="titulo">Minhas skills</div>
      <div>
        {skills.length === 0 ? (
          <p className="textoMessage">Não há skills disponíveis no momento.</p>
        ) : (
          skills.map((d, i) => (
            <div key={i} className="skillIndividual">
              <div className="imgdiv">
                <img
                  alt="Imagem da Skill"
                  src={d.urlImg}
                  className="imgSkill"
                />
              </div>
              <div className="nomeleveldescricao">
                <div className="nl">
                  <p>
                    {d.nome} - {d.level}
                  </p>
                </div>
                <div className="d">
                  <p>{d.descricao}</p>
                </div>
              </div>
              <div className="btns">
                <button
                  className="btnVgRmvItem"
                  onClick={() => {
                    deletarSkill(d.id);
                    notify();
                  }}
                >
                  Excluir
                </button>
                <Link to="/editarskill">
                  <button
                    className="btnVgRmvItem"
                    onClick={() => {
                      localStorage.setItem("idSkill", d.id);
                    }}
                  >
                    Editar
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer
        position="top-center"
        theme="dark"
        hideProgressBar={true}
      />
    </div>
  );
};

export default Skills;
