
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ updateAuthStatus}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    //causa o efeito de direcionar para a página inicial se ja estiver autenticado
    useEffect(() => {
        const  tokenExists = sessionStorage.getItem("token") !== null;
        if (tokenExists) {
            navigate("/home");
        } 
    }, [navigate]); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/login", {
                username,
                password,
            });

            if (response.data.accessToken) {
                sessionStorage.setItem("token", response.data.accessToken);
                sessionStorage.setItem("role", response.data.role);
                updateAuthStatus(true);
                navigate("/home");
                alert("Login bem-sucedido!");
            } else {
                alert("Não foi possível fazer login");
            }
        } catch (error) {
            alert("Erro ao conectar ao servidor.");
        }
    };

    //botar a imagem do nosso projeto;
    return (
        <div>
            <img src="" alt="" />
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" value={username}
                    onChange={(e) => setUsername(e.target.value)} />

                <label>Senha</label>
                <input type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button type="Submit">Login</button>
            </form>
        </div>
    );
}

export default Login;