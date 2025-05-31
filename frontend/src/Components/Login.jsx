import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';
import { FaGoogle, FaLeaf } from 'react-icons/fa';

function Login({ updateAuthStatus }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Verifica se é o login admin/1234
            if (email === 'admin' && password === '1234') {
                const response = await axios.post('http://localhost:3001/login', {
                    username: email,
                    password
                });
                
                if (response.data.accessToken) {
                    console.log('Token recebido:', response.data.accessToken);
                    sessionStorage.setItem('token', response.data.accessToken);
                    sessionStorage.setItem('role', response.data.role || 'user');
                    if (updateAuthStatus) {
                        updateAuthStatus(true);
                    }
                    const redirectUrl = sessionStorage.getItem('redirectUrl');
                    console.log('URL de redirecionamento:', redirectUrl);
                    
                    if (redirectUrl && redirectUrl !== '/') {
                        sessionStorage.removeItem('redirectUrl');
                        navigate(redirectUrl);
                    } else {
                        navigate('/home');
                    }
                }
                return;
            }

            // Se não for admin, tenta o login normal
            const response = await axios.post('http://localhost:3001/login', {
                username: email,
                password
            });
            
            if (response.data.accessToken) {
                console.log('Token recebido:', response.data.accessToken);
                sessionStorage.setItem('token', response.data.accessToken);
                sessionStorage.setItem('role', response.data.role || 'user');
                if (updateAuthStatus) {
                    updateAuthStatus(true);
                }
                const redirectUrl = sessionStorage.getItem('redirectUrl');
                console.log('URL de redirecionamento:', redirectUrl);
                
                if (redirectUrl && redirectUrl !== '/') {
                    sessionStorage.removeItem('redirectUrl');
                    navigate(redirectUrl);
                } else {
                    navigate('/home');
                }
            }
        } catch (error) {
            console.error('Erro no login:', error);
            alert('Email ou senha inválidos');
        }
    };

    const handleGoogleLogin = () => {
        // Implementação futura do login com Google
        alert('Login com Google será implementado em breve!');
    };

    const handleGovBrLogin = () => {
        // Implementação futura do login com gov.br
        alert('Login com gov.br será implementado em breve!');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <div className="project-title">
                        <div className="title-container">
                            <h1>RECOMPENSA VERDE</h1>
                            <FaLeaf className="leaf-icon" />
                        </div>
                        <p>Sustentabilidade em Ação</p>
                    </div>
                    <h2>Bem-vindo</h2>
                    <p>Faça login para acessar sua conta</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Usuário</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu usuário"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Entrar
                    </button>
                </form>

                <div className="divider">
                    <span>ou continue com</span>
                </div>

                <div className="social-login">
                    <button onClick={handleGovBrLogin} className="social-button govbr-button">
                        <span className="govbr-text">gov.br</span>
                        <span>Entrar com gov.br</span>
                    </button>

                    <button onClick={handleGoogleLogin} className="social-button google-button">
                        <FaGoogle />
                        <span>Entrar com Google</span>
                    </button>
                </div>

                <div className="login-footer">
                    <p>
                        Não tem uma conta? <a href="/register">Cadastre-se</a>
                    </p>
                    <p>
                        <a href="/forgot-password">Esqueceu sua senha?</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;