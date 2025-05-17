import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { DiLinux } from "react-icons/di";
import { BiLogoGoogle, BiUserCircle, BiLock } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";


function Login() {
    const [useremail, setUseremail] = useState("");
    const [userpassword, setUserpassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Login bem-sucedido");
        navigate('/Home');
    }

    return (
        <>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>

                    <div className="input">
                        <input type="email" placeholder="E-mail"
                            onChange={(e) => setUseremail(e.target.value)} /*required*/ />
                        <BiUserCircle />
                    </div>

                    <div className="input">
                        <input type="password" placeholder="Senha"
                            onChange={(e) => setUserpassword(e.target.value)} /*requiredd*/ />
                        <BiLock />
                    </div><br />

                    <div className="cadastrar-resetar">
                        <Link to="/Cadastro">Cadastre-se</Link>
                        <Link to="/Cadastro">Esqueceu sua senha?</Link>
                    </div><br />
                    <button type="submit" className="btn">Entrar</button><br />
                </form><br /><hr />

                <p>Entre com:</p>
                <div className="opcoes">
                    <Link to="/Home"><DiLinux /></Link>
                    <Link to="/Home"><BiLogoGoogle /></Link>
                    <Link to="/Home"><FaLinkedin /></Link>
                    <Link to="/Home"></Link>
                </div>
            </div>
        </>
    );
}

export default Login;