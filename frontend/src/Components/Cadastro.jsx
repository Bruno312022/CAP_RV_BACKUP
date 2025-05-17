//importação de módulos
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Cadastro() {
    //definição de variaveis | useState para ler e armazenar dados e navigate para estabelecer navegação
    const [useremail, setUseremail] = useState("");
    const [userpassword, setUserpassword] = useState("");
    const [usertelefone, setUsertelefone] = useState("");
    const [userendereco, setUserendereco] = useState("");
    const navigate = useNavigate();

    //handleSubmit realiza chamada das variaves deinifidas
    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Cadastro bem-sucedido!");
        navigate('/');
    }
    //estrutura análoga ao HTML
    return (
        <>
            <div className="Cadastro-container">
                <h1>Cadastre-se</h1>
                <form onSubmit={handleSubmit}>
                    <h3>Dados pessoais</h3>
                    <p>Inisra seus dados pessoais para realizar o cadastro e ter acesso as funcionalidades da aplicação</p><hr />
                    <div className="Input">
                        <input type="text" placeholder="Nome"
                            onChange={(e) => setUserpassword(e.target.value)} /*required*/ />
                    </div>

                    <div className="Input">
                        <input type="email" placeholder="E-mail"
                            onChange={(e) => setUseremail(e.target.value)} /*required*/ />
                    </div>

                    <div className="Input">
                        <input type="text" placeholder="Número de telefone"
                            onChange={(e) => setUsertelefone(e.target.value)} /*required*/ />
                    </div>

                    <div className="Input">
                        <input type="password" placeholder="Senha"
                            onChange={(e) => setUserpassword(e.target.value)} /*required*/ />
                    </div>

                    <div className="Input">
                        <input type="password" placeholder="Confirme a senha"
                            onChange={(e) => setUserpassword(e.target.value)} /*required*/ />
                    </div>
                    
                    <div className="Input">
                        <input type="text" placeholder="Endereço"
                            onChange={(e) => setUserendereco(e.target.value)} /*required*/ />
                    </div>
                    <button className="btn" type="submit">Cadastrar</button>
                </form>
            </div>
        </>
    );
}

export default Cadastro;