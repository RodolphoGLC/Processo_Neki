import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Api } from "../../api/api";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import ToastError from "../../components/Toasts/ToastError";
import ToastSuccess from "../../components/Toasts/ToastSuccess";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Register.css";

const schema = Yup.object().shape({
  usuario: Yup.string().required("*Campo obrigatório."),
  senha: Yup.string().required("*Campo obrigatório."),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref("senha"), null], "As senhas precisam ser iguais.")
    .required("*Campo obrigatório."),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      usuario: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  const notify = () => toast();
  const navigate = useNavigate();

  const { errors, isSubmitting } = formState;
  console.log("error", errors);

  const handleSubmitData = async (data) => {
    let newUserData = {
      username: data.usuario,
      password: data.senha,
    };

    try {
      await Api.post(
        "/auth/signup",
        newUserData
      );
      reset();
      ToastSuccess({ message: "Registro realizado com sucesso!" });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      ToastError({ message: "Erro ao realizar o cadastro!" });
    }
  };

  return (
    <div className="container-register">
      <form onSubmit={handleSubmit(handleSubmitData)} className="formulario">
        <div id="response-error"></div>
        <h2 style={{ marginTop: "30px" }}>Crie sua conta</h2>
        <label htmlFor="usuario" aria-label="Campo de Usuario">
          Usuário:
          <input
            {...register("usuario")}
            type="text"
            className="formulario-cpf"
            id="usuario"
            placeholder="Usuário"
          />
        </label>
        {errors.usuario && <p>{errors.usuario.message}</p>}
        <label htmlFor="senha">
          Senha:
          <div className="input-with-icon">
            <input
              {...register("senha")}
              id="senha"
              className="formulario-senha"
              type={showPassword ? "text" : "password"}
              placeholder="Digite aqui sua senha"
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
        {errors.senha && <p>{errors.senha.message}</p>}
        <label htmlFor="confirmarSenha">
          Confirme sua senha:
          <div className="input-with-icon">
            <input
              {...register("confirmarSenha")}
              type={showPassword ? "text" : "password"}
              className="formulario-senha"
              id="confirmarSenha"
              placeholder="Confirme sua senha"
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
        {errors.confirmarSenha && <p>{errors.confirmarSenha.message}</p>}
        <div>
          <button
            className="btnsenha"
            style={{ marginBottom: "30px" }}
            type="submit"
            onClick={notify}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
          <ToastContainer
            position="top-center"
            theme="dark"
            hideProgressBar={true}
          />
        </div>
      </form>
      <div className="naotemconta">
        <p>Você já tem uma conta?</p>
        <Link to={"/login"}>
          <button>Fazer login</button>
        </Link>
      </div>
      <div id="result"></div>
    </div>
  );
};

export default Register;
