import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function UserList() {
    const [ users, setUsers] = useState([]);

    //carrga lista de usuários ao montar o componente
    
    useEffect(() => {
        fetchUsers();
    }, []);

    //fecthUser sofre os efeitos do componente useEffect
    //carrega os usuários
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/usuarios");
            setUsers(response.data);
        } catch (error) {
            alert("Erro ao carregar usuários!");
        }
    };
     //função de deletar
    const handleDelete =  async (userId) => {
        try {
            await axios.delete(`http://localhost:3001/usuarios/${userId}`);
            alert("Usuário deletado com sucesso");
            fetchUsers();
        } catch (error) {
            alert("Erro ao deletar usuário!");
        }
    };

    //front
    
    return(
        <div>
            <h2>lista de usuários</h2>
            <Link to="/usuarios/cadastro">Novo usuário</Link>
            <ul>
                {users.map( user => (
                    <li key={user.id}>
                        {user.username} ({user.role})
                        <Link to={`/usuarios/editar/${user.id}`}>Editar</Link>
                        <button onClick={() => handleDelete(user.id)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );

   
};

export default UserList;