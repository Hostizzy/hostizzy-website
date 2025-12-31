'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight } from 'lucide-react';
import SEO from '../../components/SEO';

export default function Login() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                router.push('/admin');
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO title="Admin Login - Hostizzy" description="Secure access to Hostizzy management console" />
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                padding: '2rem'
            }}>
                <div className="card shadow-premium" style={{
                    maxWidth: '420px',
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

                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
                        Admin Console
                    </h1>
                    <p style={{ color: '#64748b', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
                        Enter your credentials to access the admin panel
                    </p>

                    <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="username" style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                placeholder="admin"
                                required
                                autoComplete="username"
                                style={{
                                    width: '100%',
                                    padding: '0.9rem 1.25rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="password" style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                placeholder="••••••••"
                                required
                                autoComplete="current-password"
                                style={{
                                    width: '100%',
                                    padding: '0.9rem 1.25rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                        </div>

                        {error && (
                            <div style={{
                                padding: '0.75rem 1rem',
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
                            style={{
                                width: '100%',
                                padding: '1rem',
                                justifyContent: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'Authenticating...' : 'Access Dashboard'}
                            {!loading && <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />}
                        </button>
                    </form>

                    <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#64748b' }}>
                        Authorized personnel only. <br />
                        Unauthorized access is strictly prohibited.
                    </div>
                </div>
            </div>
        </>
    );
}
