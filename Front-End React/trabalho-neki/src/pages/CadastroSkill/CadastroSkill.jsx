import React from "react";
import { useForm } from "react-hook-form";
import { Api } from "../../api/api";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import ToastError from "../../components/Toasts/ToastError";
import ToastSuccess from "../../components/Toasts/ToastSuccess";
import "./Cadastro.css";

const schema = Yup.object().shape({
  imgUrl: Yup.string().required("*Campo obrigatório."),
  nome: Yup.string().required("*Campo obrigatório."),
  level: Yup.string()
    .required("*Campo obrigatório.")
    .matches(/^[0-9]+$/, "O Level só pode conter números.")
    .test("is-between-0-and-10", "O Level deve estar entre 0 e 10", (value) => {
      if (value) {
        const numericValue = parseInt(value);
        return numericValue >= 0 && numericValue <= 10;
      }
      return false;
    }),
  descricao: Yup.string().required("*Campo obrigatório."),
});

const CadastroSkill = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      imgUrl: "",
      nome: "",
      level: "",
      descricao: "",
      associar: "",
    },
  });

  const notify = () => toast();
  const navigate = useNavigate();

  const { errors, isSubmitting } = formState;
  console.log("error", errors);

  const handleSubmitData = async (data) => {
    let idUser = parseInt(localStorage.getItem("idUser"));

    let newUserData = {
      urlImg: data.imgUrl,
      nome: data.nome,
      level: data.level,
      descricao: data.descricao,
    };

    try {
      console.log(newUserData);
      let token = localStorage.getItem("token");

      await Api.post(`/skills/${idUser}`, newUserData, {
        headers: { Authorization: `Bearer ${token}` },
      }).then();
      ToastSuccess({ message: "Cadastro realizado com sucesso!" });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      ToastError({ message: "Erro ao realizar o cadastro!" });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(handleSubmitData)} className="form">
        <h2>Cadastrar uma skills</h2>
        <label htmlFor="imgUrl">
          Link da Imagem:
          <input
            {...register("imgUrl")}
            type="text"
            id="imgUrl"
            className="formulario-input"
            placeholder="Link"
          />
        </label>
        {errors.imgUrl && <p>{errors.imgUrl.message}</p>}
        <label htmlFor="nome">
          Nome da Skill:
          <input
            {...register("nome")}
            type="text"
            id="nome"
            className="formulario-input"
            placeholder="Nome"
          />
        </label>
        {errors.nome && <p>{errors.nome.message}</p>}
        <label htmlFor="level">
          Level da Skill
          <input
            {...register("level")}
            type="number"
            id="level"
            pattern="[0-9]*"
            inputMode="numeric"
            className="formulario-input"
            placeholder="(1 - 10)"
          />
        </label>
        {errors.level && <p>{errors.level.message}</p>}
        <label htmlFor="descricao">
          Descrição da Skill:
          <input
            {...register("descricao")}
            type="text"
            id="descricao"
            className="formulario-input"
            placeholder="Descricao"
          />
        </label>
        {errors.descricao && <p>{errors.descricao.message}</p>}
        <button
          aria-label="Cadastrar"
          className="btnsenha"
          type="submit"
          onClick={notify}
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar Skill"}
        </button>
        <ToastContainer
          position="top-center"
          theme="dark"
          hideProgressBar={true}
        />
        <Link to="/home">
          <button aria-label="Cancelar" id="cancelarBtn" className="btnsenha">
            Cancelar
          </button>
        </Link>
      </form>
    </div>
  );
};

export default CadastroSkill;
