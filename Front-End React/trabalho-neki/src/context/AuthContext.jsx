import React from "react";
import { createContext, useState } from "react";
import { Api } from "../api/api";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (username, password, validacao) => {
    try {
      const loginRequestData = {
        username: username,
        password: password,
      };
      const response = await Api.post("/auth/signin", loginRequestData);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setUser(response.data);
        Api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        localStorage.clear();
        if (validacao === true) {
          localStorage.setItem("idUser", response.data.id);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("roles", response.data.roles);
          localStorage.setItem("Username", loginRequestData.username);
          localStorage.setItem("Password", loginRequestData.password);
        } else {
          localStorage.setItem("idUser", response.data.id);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("roles", response.data.roles);
          localStorage.setItem("Username", loginRequestData.username);
        }
        Navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem("idUser");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");

    if (localStorage.getItem("idSkill") !== null) {
      localStorage.removeItem("idSkill");
    }
    setUser(null);
    return <Navigate to={"/"} />;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signed: !!user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
