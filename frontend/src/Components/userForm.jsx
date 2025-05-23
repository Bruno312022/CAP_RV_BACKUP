import React, { useState} from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from 'axios';



function UserForm() {

    const [username, setUsername] = useState('');
    const [password, setPasssword] = useState('');
    const [confirmPassword, setConfirmpassword] = useState('');
    const [role, setRole] = useState('common')
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //condição para verificar se a senha confirmada está correta
        if ( password !== confirmPassword ) {
            alert("As senhas não coincidem!");
            return;
        } 

        const userData = { username, password, role};
        const token = sessionStorage.getItem("token");
        try {
            if (id) {
                        await axios.put(`http://localhost:3001/usuarios/${id}`, userData, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                } else {
                        await axios.post(`http://localhost:3001/usuarios`, userData, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        alert("Usuário criado com sucesso");
                }
                navigate('/usuarios')
        } catch (error) {
            alert("Erro ao salvar usuário: ");
            
        };
    }; 
    return(
        <div>
            <h2>{id ? "Editar Usuário" : "Novo Usuário"}</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" value={username} 
                        onChange={(e) => setUsername(e.target.value)} required/>
                
                <label>Senha</label>
                <input type="password" value={password}     
                        onChange={(e) => setPasssword(e.target.value)} required/>
                
                <label>Confirmar senha</label>
                <input type="password" value={confirmPassword} 
                        onChange={(e) => setConfirmpassword(e.target.value)} required/>
                
                <label>Role</label>
                <select value={role} 
                        onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="colaborador">Colaborador</option>
                    <option value="common">Comum</option>
                </select>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default UserForm;

