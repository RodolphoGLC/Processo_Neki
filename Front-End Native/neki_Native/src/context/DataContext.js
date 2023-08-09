import React, { createContext, useState } from 'react';
import jwt_decode from 'jwt-decode';

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [dadosUsuario, setDadosUsuario] = useState('');
    const [login, setLogin] = useState([]);
    const [Editar, setEditar] = useState('');

    const armazenarEditar = (skill) => {
        setEditar(skill);
    }

    const armazenarLogin = (user, senha, validacao) => {
        if (validacao === true) {
            setLogin({
                user: user,
                senha: senha
            })
        }
        else if (validacao === false) {
            setLogin({
                user: user,
                senha: ""
            })
        }
    }

    const armazenarDadosUsuario = (jwt) => {
        var jwtDecodificado = jwt_decode(jwt);

        var usuario = jwtDecodificado.user;

        usuario = JSON.parse(usuario);

        setDadosUsuario({
            id: usuario.id,
            nome: usuario.username,
            token: jwt
        })
    }

    return (
        <DataContext.Provider value={{
            dadosUsuario,
            armazenarDadosUsuario,
            armazenarLogin,
            Editar,
            armazenarEditar,
            login
        }}>
            {children}
        </DataContext.Provider>
    )
}