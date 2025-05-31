import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaSave, FaTimes } from 'react-icons/fa';
import AdminNavbar from './AdminNavbar';
import '../CSS/ColaboradorForm.css';

function ColaboradorForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        nome: '',
        telefone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchColaborador();
        }
    }, [id]);

    const fetchColaborador = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.get(`http://localhost:3001/usuarios/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { username, email, nome, telefone } = response.data;
            setFormData(prev => ({
                ...prev,
                username,
                email: email || '',
                nome: nome || '',
                telefone: telefone || ''
            }));
        } catch (error) {
            console.error('Erro ao carregar dados do colaborador:', error);
            setError('Erro ao carregar dados do colaborador');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem');
            setLoading(false);
            return;
        }

        try {
            const token = sessionStorage.getItem('token');
            const userData = {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                nome: formData.nome,
                telefone: formData.telefone,
                role: 'colaborador'
            };

            if (id) {
                await axios.put(`http://localhost:3001/usuarios/${id}`, userData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:3001/usuarios', userData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            navigate('/colaboradores');
        } catch (error) {
            console.error('Erro ao salvar colaborador:', error);
            setError('Erro ao salvar colaborador');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="colaborador-form-page">
            <AdminNavbar />
            <div className="colaborador-form-content">
                <div className="form-header">
                    <h1>{id ? 'Editar Colaborador' : 'Novo Colaborador'}</h1>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="colaborador-form">
                    <div className="form-group">
                        <label htmlFor="username">Nome de Usuário</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {!id && (
                        <>
                            <div className="form-group">
                                <label htmlFor="password">Senha</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required={!id}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirmar Senha</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required={!id}
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nome">Nome Completo</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate('/colaboradores')} className="cancel-button">
                            <FaTimes /> Cancelar
                        </button>
                        <button type="submit" className="save-button" disabled={loading}>
                            <FaSave /> {loading ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ColaboradorForm; 