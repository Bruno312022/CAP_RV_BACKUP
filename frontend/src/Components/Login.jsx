import React, { useState, useEffect }from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [useremail, setUseremail] = useState("");
    const [userpassword, setUserpassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem("Authenticated") === "true";
        if (isAuthenticated) {
            navigate("/Home");
        }
        
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://localhost:3001/login", {
                useremail,
                userpassword,
            });

            if ( response.data.success ){
                sessionStorage.setItem("Authenticated", "true");
                sessionStorage.setItem("role", response.data.role);
                updateAuthStatus(true);
                alert("Login bem-sucedido.");
                navigate("/Home")
            } else {
                alert("Usuário ou senha incorretos.")
            }
        } catch (error){
            alert("Erro ao conctar-se com o servidor.")
        }

    };

    return (
        <>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>

                    <div className="input">
                        <input type="email" placeholder="E-mail"
                            onChange={(e) => setUseremail(e.target.value)} /*required*/ />
                       
                    </div>

                    <div className="input">
                        <input type="password" placeholder="Senha"
                            onChange={(e) => setUserpassword(e.target.value)} /*requiredd*/ />
                    </div><br />

                    <div className="cadastrar-resetar">
                        <Link to="/Cadastro">Cadastre-se</Link>
                        <Link to="/Cadastro">Esqueceu sua senha?</Link>
                    </div><br />
                    <button type="submit" className="btn">Entrar</button><br />
                </form><br /><hr />

                <p>Entre com:</p>
                <div className="opcoes">
                    <Link to="/Home"></Link>
                    <Link to="/Home"></Link>
                    <Link to="/Home"></Link>
                    <Link to="/Home"></Link>
                </div>
            </div>
        </>
    );
}

export default Login;