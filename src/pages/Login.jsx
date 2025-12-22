import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { Lock, ArrowRight } from 'lucide-react';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Connection error. Is the server running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO title="Admin Login - Hostizzy" description="Secure access to Hostizzy management console." />
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                padding: '2rem'
            }}>
                <div className="card shadow-premium" style={{
                    maxWidth: '400px',
                    width: '100%',
                    padding: '3rem 2.5rem',
                    background: 'white',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'rgba(254, 88, 88, 0.1)',
                        borderRadius: '1rem',
                        display: 'grid',
                        placeItems: 'center',
                        margin: '0 auto 2rem'
                    }}>
                        <Lock size={32} color="var(--color-primary)" />
                    </div>

                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Admin Console</h1>
                    <p style={{ color: 'var(--color-muted)', marginBottom: '2.5rem' }}>Please enter your access password to continue.</p>

                    <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem' }}>Secret Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.9rem 1.25rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                            />
                        </div>

                        {error && (
                            <div style={{
                                padding: '0.75rem',
                                background: '#fee2e2',
                                color: '#991b1b',
                                borderRadius: '0.5rem',
                                fontSize: '0.85rem',
                                marginBottom: '1.5rem',
                                fontWeight: 500
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', justifyContent: 'center' }}
                        >
                            {loading ? 'Authenticating...' : 'Access Dashboard'}
                            {!loading && <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />}
                        </button>
                    </form>

                    <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                        Authorized personnel only. <br />Unauthorized access is strictly prohibited.
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
