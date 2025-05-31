import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaLeaf, FaSave, FaTimes, FaEye, FaEyeSlash, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import Sidebar from './Sidebar';
import '../CSS/UserForm.css';

function UserForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user'
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('');
    const [globalError, setGlobalError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const role = sessionStorage.getItem('role');

        if (!token) {
            navigate('/');
            return;
        }

        if (role !== 'admin') {
            navigate('/home');
            return;
        }

        if (isEditing) {
            fetchUser();
        }
    }, [id, navigate]);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            const response = await axios.get(`http://localhost:3001/usuarios/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setFormData({
                username: response.data.username || '',
                email: response.data.email || '',
                role: response.data.role || 'user',
                password: ''
            });
            setErrors({});
        } catch (error) {
            console.error('Erro ao carregar usuário:', error);
            setGlobalError(error.response?.data?.error || 'Erro ao carregar dados do usuário');
            setTimeout(() => navigate('/usuarios'), 2000);
        } finally {
            setLoading(false);
        }
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'username':
                if (!value || !value.trim()) return 'Nome de usuário é obrigatório';
                if (value.trim().length < 3) return 'Nome de usuário deve ter no mínimo 3 caracteres';
                return '';
            case 'email':
                if (!value || !value.trim()) return 'Email é obrigatório';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Email inválido';
                return '';
            case 'password':
                if (!isEditing && (!value || !value.trim())) return 'Senha é obrigatória para novos usuários';
                if (value && value.trim().length < 6) return 'Senha deve ter no mínimo 6 caracteres';
                return '';
            case 'role':
                if (!value) return 'Tipo de usuário é obrigatório';
                if (!['admin', 'user', 'colaborador'].includes(value)) return 'Tipo de usuário inválido';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
        setGlobalError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGlobalError('');
        setSuccess('');
        setLoading(true);

        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            // Prepara os dados para envio
            const dataToSend = {
                username: formData.username.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
                role: formData.role
            };

            console.log('Enviando dados:', { ...dataToSend, password: '***' });

            const headers = { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            if (isEditing) {
                const response = await axios.put(`http://localhost:3001/usuarios/${id}`, dataToSend, { headers });
                console.log('Resposta da atualização:', response.data);
                setSuccess('Usuário atualizado com sucesso!');
            } else {
                const response = await axios.post('http://localhost:3001/usuarios', dataToSend, { headers });
                console.log('Resposta da criação:', response.data);
                setSuccess('Usuário criado com sucesso!');
            }

            setTimeout(() => {
                navigate('/usuarios');
            }, 1500);

        } catch (error) {
            console.error('Erro completo:', error);
            
            if (error.response?.status === 401) {
                sessionStorage.clear();
                navigate('/');
            } else {
                const errorMessage = error.response?.data?.error || 
                                   'Erro ao salvar usuário. Por favor, verifique os dados e tente novamente.';
                setGlobalError(errorMessage);
                
                if (error.response?.data?.errors) {
                    setErrors(error.response.data.errors);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="loading-spinner"></div>
                Carregando...
            </div>
        );
    }

    return (
        <div className="user-form-page">
            <nav className="nav">
                <div className="logo-sidebar">
                    <div className="toggle" onClick={() => document.querySelector('.sidebar').classList.toggle('active')}>&#9776;</div>
                    <Link to="/dashboard" className="logo">
                        <h1>RECOMPENSA</h1>
                        <h1>VERDE</h1>
                        <FaLeaf className="leaf-icon" />
                    </Link>
                </div>

                <div className="navigation">
                    <Link to="/atendimento">Fale conosco</Link>
                    <Link to="/sobre">Sobre</Link>
                </div>
            </nav>

            <Sidebar />

            <div className="user-form-content">
                <div className="form-header">
                    <h1>{isEditing ? 'Editar Usuário' : 'Novo Usuário'}</h1>
                </div>

                {globalError && (
                    <div className="error-message" style={{ padding: '10px', marginBottom: '20px' }}>
                        <FaExclamationCircle style={{ marginRight: '8px' }} />
                        {globalError}
                    </div>
                )}

                {success && (
                    <div className="success-message" style={{ padding: '10px', marginBottom: '20px' }}>
                        <FaCheckCircle style={{ marginRight: '8px' }} />
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="user-form">
                    <div className="form-group">
                        <label htmlFor="username">
                            Nome de Usuário
                            <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? 'error' : ''}
                            maxLength="255"
                            placeholder="Digite o nome de usuário"
                        />
                        {errors.username && <span className="field-error">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                            <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                            maxLength="255"
                            placeholder="Digite o email"
                        />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Senha
                            {!isEditing && <span className="required">*</span>}
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'error' : ''}
                                maxLength="255"
                                placeholder={isEditing ? "Digite a nova senha (opcional)" : "Digite a senha"}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <span className="field-error">{errors.password}</span>}
                        {isEditing && <span className="field-hint">Deixe em branco para manter a senha atual</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">
                            Tipo de Usuário
                            <span className="required">*</span>
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className={errors.role ? 'error' : ''}
                        >
                            <option value="admin">Administrador</option>
                            <option value="colaborador">Colaborador</option>
                            <option value="user">Usuário</option>
                        </select>
                        {errors.role && <span className="field-error">{errors.role}</span>}
                    </div>

                    <div className="form-actions">
                        <button 
                            type="button" 
                            onClick={() => navigate('/usuarios')} 
                            className="cancel-button"
                            disabled={loading}
                        >
                            <FaTimes /> Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="save-button"
                            disabled={loading}
                        >
                            <FaSave /> {isEditing ? 'Atualizar' : 'Criar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserForm;

