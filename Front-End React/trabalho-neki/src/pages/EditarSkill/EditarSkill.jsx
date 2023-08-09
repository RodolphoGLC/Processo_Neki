import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Api } from "../../api/api";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ToastError from "../../components/Toasts/ToastError";
import ToastSuccess from "../../components/Toasts/ToastSuccess";
import "./Editar.css";

const EditarSkill = () => {
  const [skill, setSkill] = useState([]);
  const [cadastroHabilitado, setCadastroHabilitado] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    let idSkill = parseInt(localStorage.getItem("idSkill"));

    const getSkill = async () => {
      await Api.get(`/skills/${idSkill}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          console.log(response.data);
          setSkill(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    getSkill();
  });

  const { register, handleSubmit, formState } = useForm({
    mode: "all",
    defaultValues: {
      imgUrl: skill.urlImg,
      nome: skill.nome,
      level: skill.level,
      descricao: skill.descricao,
    },
  });

  const notify = () => toast();
  const navigate = useNavigate();

  const { errors, isSubmitting } = formState;
  console.log("error", errors);

  const handleSubmitData = async (data) => {
    let idSkill = parseInt(localStorage.getItem("idSkill"));

    let newUserData = {
      id: skill.id,
      urlImg: data?.imgUrl || skill.urlImg,
      nome: data?.nome || skill.nome,
      level: data?.level || skill.level,
      descricao: data?.descricao || skill.descricao,
      usuario: skill.usuario,
    };

    try {
      console.log(newUserData);

      await Api.put(`/skills/${idSkill}`, newUserData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      ToastSuccess({ message: "Update realizado com sucesso!" });
      setTimeout(() => {
        navigate("/skills");
      }, 2000);
    } catch (error) {
      ToastError({ message: "Erro ao realizar o update!" });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(handleSubmitData)} className="form">
        <h2>Edição de Skill</h2>
        <label htmlFor="imgUrl">
          Link da Imagem:
          <input
            {...register("imgUrl")}
            type="text"
            id="imgUrl"
            placeholder={skill.urlImg}
          />
        </label>
        {errors.imgUrl && <p>{errors.imgUrl.message}</p>}
        <label htmlFor="nome">
          Nome da Skill:
          <input
            {...register("nome")}
            type="text"
            id="nome"
            placeholder={skill.nome}
          />
        </label>
        {errors.nome && <p>{errors.nome.message}</p>}
        <label htmlFor="level">
          Level da Skill
          <input
            {...register("level", {
              validate: (value) => {
                const numericValue = parseInt(value);
                if (!isNaN(numericValue)) {
                  if (numericValue >= 0 && numericValue <= 10) {
                    setCadastroHabilitado(true);
                    return true;
                  } else {
                    setCadastroHabilitado(false);
                    return "Digite um valor entre 0 e 10";
                  }
                } else {
                  setCadastroHabilitado(false);
                  return "Só pode números";
                }
              },
            })}
            type="number"
            id="level"
            pattern="[0-9]*"
            inputMode="numeric"
            placeholder={skill.level}
          />
        </label>
        {errors.level && <p>{errors.level.message}</p>}
        <label htmlFor="imgUrl">
          Descrição da Skill:
          <input
            {...register("descricao")}
            type="text"
            id="descricao"
            placeholder={skill.descricao}
          />
        </label>
        {errors.descricao && <p>{errors.descricao.message}</p>}
        <button
          disabled={!cadastroHabilitado}
          aria-label="Cadastrar"
          className="btnsenha"
          type="submit"
          onClick={notify}
        >
          {isSubmitting ? "Editando..." : "Editar"}
        </button>
        <Link to="/home">
          <button aria-label="Cancelar" className="btnsenha">
            Cancelar
          </button>
        </Link>
      </form>
      <ToastContainer
        position="top-center"
        theme="dark"
        hideProgressBar={true}
      />
    </div>
  );
};

export default EditarSkill;
