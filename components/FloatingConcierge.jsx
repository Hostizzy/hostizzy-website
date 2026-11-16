'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, X, Send, Sparkles, MessageCircle, ArrowRight, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'hostizzy-chat';
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function loadMessages() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const { messages, timestamp } = JSON.parse(raw);
        if (Date.now() - timestamp > TTL_MS) {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }
        return messages;
    } catch { return null; }
}

function saveMessages(messages) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, timestamp: Date.now() }));
    } catch { /* storage full */ }
}

const WELCOME_MSG = {
    role: 'assistant',
    content: "Hi! I'm Hostizzy's AI assistant. I can help you with:\n\n- **Service plans & pricing**\n- **Revenue estimates** for your property\n- **How our management works**\n- **Any questions** about listing your property\n\nHow can I help you today?",
    quickReplies: ['View Plans', 'Revenue Estimate', 'How It Works', 'Talk to Team'],
};

// Quick reply configs per keyword in AI response
const QUICK_REPLY_TRIGGERS = [
    { keywords: ['plan', 'pricing', 'cost', 'fee', 'price'], replies: ['SmartStart', 'ChannelPro', 'Hybrid Core', 'TotalCare360', 'StayPrime', 'Signature'] },
    { keywords: ['property', 'villa', 'apartment', 'farmhouse', 'list'], replies: ['List My Property', 'Get Revenue Estimate', 'Talk to Team'] },
    { keywords: ['location', 'city', 'area', 'where'], replies: ['Delhi NCR', 'Himachal Pradesh', 'Uttarakhand', 'Rajasthan'] },
    { keywords: ['contact', 'call', 'speak', 'human', 'team', 'whatsapp'], replies: ['WhatsApp Us', 'Fill Contact Form'] },
];

function getQuickReplies(aiMessage) {
    const lower = aiMessage.toLowerCase();
    for (const trigger of QUICK_REPLY_TRIGGERS) {
        if (trigger.keywords.some(k => lower.includes(k))) {
            return trigger.replies;
        }
    }
    return ['Learn More', 'Talk to Team'];
}

const FloatingConcierge = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([WELCOME_MSG]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [leadData, setLeadData] = useState({ name: '', phone: '' });
    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const [honeypot, setHoneypot] = useState('');
    const loadedAt = useRef(Date.now());
    const [messageCount, setMessageCount] = useState(0);
    // Measured after mount, never during render — reading window.innerWidth
    // in the render body makes the server and client disagree and breaks hydration.
    const [isMobile, setIsMobile] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Track viewport after mount so server and client render the same markup
    useEffect(() => {
        const measure = () => setIsMobile(window.innerWidth < 640);
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    // Load persisted messages
    useEffect(() => {
        const saved = loadMessages();
        if (saved && saved.length > 0) {
            setMessages(saved);
            setMessageCount(saved.filter(m => m.role === 'user').length);
        }
        setHasLoaded(true);
    }, []);

    // Save messages when they change
    useEffect(() => {
        if (hasLoaded && messages.length > 1) {
            saveMessages(messages);
        }
    }, [messages, hasLoaded]);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, showLeadForm]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Show lead form after 3 user messages (if not already submitted)
    useEffect(() => {
        if (messageCount >= 3 && !leadSubmitted && !showLeadForm) {
            setShowLeadForm(true);
        }
    }, [messageCount, leadSubmitted, showLeadForm]);

    const sendMessage = useCallback(async (text) => {
        const msg = (text || input).trim();
        if (!msg || isTyping) return;

        // Handle special quick reply actions
        if (msg === 'WhatsApp Us') {
            window.open('https://wa.me/919560493335?text=Hi%2C%20I%20need%20help', '_blank');
            return;
        }
        if (msg === 'Fill Contact Form') {
            window.location.href = '/contact';
            return;
        }
        if (msg === 'List My Property') {
            window.location.href = '/contact';
            return;
        }

        const userMsg = { role: 'user', content: msg };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput('');
        setIsTyping(true);
        setMessageCount(prev => prev + 1);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: msg,
                    history: updatedMessages.slice(-10).map(m => ({ role: m.role, content: m.content })),
                }),
            });

            if (!res.ok) throw new Error('Failed');
            const data = await res.json();
            const quickReplies = getQuickReplies(data.reply);
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply, quickReplies }]);
        } catch {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Sorry, I'm having trouble connecting. You can reach our team directly on WhatsApp for instant help!",
                quickReplies: ['WhatsApp Us', 'Fill Contact Form'],
            }]);
        } finally {
            setIsTyping(false);
        }
    }, [input, isTyping, messages]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleLeadSubmit = async () => {
        if (!leadData.name.trim() || !leadData.phone.trim()) return;
        let ok = false;
        try {
            const res = await fetch('/api/property-leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: leadData.name.trim(),
                    phone: leadData.phone.trim(),
                    source: 'chatbot',
                    timestamp: new Date().toISOString(),
                    _hp_website: honeypot,
                    _formLoadedAt: loadedAt.current,
                }),
            });
            ok = res.ok;
        } catch { /* handled below */ }
        if (!ok) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Sorry, that didn't go through. Please try again, or message us on WhatsApp at +91 95604 93335.",
                quickReplies: ['WhatsApp Us'],
            }]);
            return;
        }
        setLeadSubmitted(true);
        setShowLeadForm(false);
        setMessages(prev => [...prev, {
            role: 'assistant',
            content: `Thanks ${leadData.name.split(' ')[0]}! Our team will call you shortly. In the meantime, feel free to keep asking questions!`,
            quickReplies: ['View Plans', 'Revenue Estimate'],
        }]);
    };

    const clearChat = () => {
        setMessages([WELCOME_MSG]);
        setMessageCount(0);
        setShowLeadForm(false);
        setLeadSubmitted(false);
        setLeadData({ name: '', phone: '' });
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            marginBottom: '1rem',
                            borderRadius: '1.25rem',
                            width: isMobile ? 'calc(100vw - 2rem)' : '380px',
                            height: isMobile ? 'calc(100vh - 6rem)' : '520px',
                            background: '#fff',
                            boxShadow: '0 25px 60px -12px rgba(0,0,0,0.25)',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                            padding: '14px 16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            flexShrink: 0,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '34px', height: '34px', borderRadius: '10px',
                                    background: 'rgba(254,88,88,0.15)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Sparkles size={16} color="#FE5858" />
                                </div>
                                <div>
                                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>Hostizzy AI</div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.65rem' }}>
                                        {isTyping ? 'Typing...' : 'Online'}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <a
                                    href="https://wa.me/919560493335?text=Hi%2C%20I%20need%20help"
                                    target="_blank" rel="noopener noreferrer"
                                    style={{
                                        background: '#25D366', color: '#fff', border: 'none',
                                        borderRadius: '6px', padding: '5px 8px', fontSize: '0.65rem',
                                        fontWeight: 600, cursor: 'pointer', textDecoration: 'none',
                                        display: 'flex', alignItems: 'center', gap: '3px',
                                    }}
                                >
                                    <MessageCircle size={11} /> WhatsApp
                                </a>
                                <button onClick={() => setIsOpen(false)}
                                    style={{
                                        background: 'rgba(255,255,255,0.1)', border: 'none',
                                        borderRadius: '6px', padding: '5px', cursor: 'pointer',
                                        color: '#94a3b8', display: 'flex',
                                    }}>
                                    <X size={15} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div style={{
                            flex: 1, overflowY: 'auto', padding: '14px',
                            display: 'flex', flexDirection: 'column', gap: '10px',
                            background: '#f8fafc',
                        }}>
                            {messages.map((msg, i) => (
                                <div key={i}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    }}>
                                        <div style={{
                                            maxWidth: '85%',
                                            padding: '10px 14px',
                                            borderRadius: msg.role === 'user'
                                                ? '14px 14px 4px 14px'
                                                : '14px 14px 14px 4px',
                                            background: msg.role === 'user' ? '#FE5858' : '#fff',
                                            color: msg.role === 'user' ? '#fff' : '#1e293b',
                                            fontSize: '0.83rem',
                                            lineHeight: '1.5',
                                            border: msg.role === 'user' ? 'none' : '1px solid #e2e8f0',
                                            boxShadow: msg.role === 'user' ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
                                            whiteSpace: 'pre-wrap',
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: msg.content
                                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                .replace(/\n/g, '<br/>')
                                        }}
                                        />
                                    </div>
                                    {/* Quick Reply Chips */}
                                    {msg.role === 'assistant' && msg.quickReplies && i === messages.length - 1 && (
                                        <div style={{
                                            display: 'flex', flexWrap: 'wrap', gap: '6px',
                                            marginTop: '8px', paddingLeft: '4px',
                                        }}>
                                            {msg.quickReplies.map((reply, j) => (
                                                <button key={j}
                                                    onClick={() => sendMessage(reply)}
                                                    style={{
                                                        padding: '6px 12px', borderRadius: '16px',
                                                        border: '1px solid #e2e8f0', background: '#fff',
                                                        color: '#334155', fontSize: '0.75rem', fontWeight: 600,
                                                        cursor: 'pointer', transition: 'all 0.15s',
                                                        display: 'flex', alignItems: 'center', gap: '4px',
                                                    }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = '#FE5858'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#FE5858'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#334155'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                                                >
                                                    {reply} <ArrowRight size={12} />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <div style={{
                                        padding: '12px 18px', borderRadius: '14px 14px 14px 4px',
                                        background: '#fff', border: '1px solid #e2e8f0',
                                        display: 'flex', gap: '4px', alignItems: 'center',
                                    }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8', animation: 'chatDot 1.4s infinite', animationDelay: '0s' }} />
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8', animation: 'chatDot 1.4s infinite', animationDelay: '0.2s' }} />
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8', animation: 'chatDot 1.4s infinite', animationDelay: '0.4s' }} />
                                    </div>
                                </div>
                            )}

                            {/* Inline Lead Capture Form */}
                            {showLeadForm && !leadSubmitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        background: '#fff', border: '2px solid #FE5858', borderRadius: '14px',
                                        padding: '14px', marginTop: '4px',
                                    }}
                                >
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                                        Want our team to call you?
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '10px' }}>
                                        Share your details — we'll reach out within 24 hours.
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }}>
                                        <input type="text" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot} onChange={e => setHoneypot(e.target.value)} style={{ position: 'absolute', width: 1, height: 1, padding: 0, border: 0, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }} />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', borderRadius: '8px', padding: '6px 10px', border: '1px solid #e2e8f0' }}>
                                            <User size={14} color="#94a3b8" />
                                            <input
                                                placeholder="Your name"
                                                value={leadData.name}
                                                onChange={e => setLeadData(p => ({ ...p, name: e.target.value }))}
                                                style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.8rem', width: '100%', fontFamily: 'inherit' }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', borderRadius: '8px', padding: '6px 10px', border: '1px solid #e2e8f0' }}>
                                            <Phone size={14} color="#94a3b8" />
                                            <input
                                                placeholder="Phone number"
                                                type="tel"
                                                value={leadData.phone}
                                                onChange={e => setLeadData(p => ({ ...p, phone: e.target.value }))}
                                                style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.8rem', width: '100%', fontFamily: 'inherit' }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button onClick={handleLeadSubmit}
                                                disabled={!leadData.name.trim() || !leadData.phone.trim()}
                                                style={{
                                                    flex: 1, padding: '8px', borderRadius: '8px',
                                                    background: leadData.name.trim() && leadData.phone.trim() ? '#FE5858' : '#e2e8f0',
                                                    color: leadData.name.trim() && leadData.phone.trim() ? '#fff' : '#94a3b8',
                                                    border: 'none', fontSize: '0.75rem', fontWeight: 600,
                                                    cursor: leadData.name.trim() && leadData.phone.trim() ? 'pointer' : 'default',
                                                }}>
                                                Request Callback
                                            </button>
                                            <button onClick={() => setShowLeadForm(false)}
                                                style={{
                                                    padding: '8px 12px', borderRadius: '8px', background: '#f1f5f9',
                                                    color: '#64748b', border: 'none', fontSize: '0.7rem', cursor: 'pointer',
                                                }}>
                                                Later
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div style={{
                            padding: '10px 14px', borderTop: '1px solid #e2e8f0',
                            background: '#fff', display: 'flex', gap: '8px', alignItems: 'flex-end',
                            flexShrink: 0,
                        }}>
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me anything..."
                                rows={1}
                                style={{
                                    flex: 1, padding: '9px 12px', borderRadius: '10px',
                                    border: '1px solid #e2e8f0', fontSize: '0.83rem',
                                    resize: 'none', fontFamily: 'inherit', outline: 'none',
                                    maxHeight: '80px', lineHeight: '1.4',
                                    transition: 'border-color 0.2s',
                                }}
                                onFocus={e => e.target.style.borderColor = '#FE5858'}
                                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={!input.trim() || isTyping}
                                style={{
                                    width: '38px', height: '38px', borderRadius: '10px',
                                    background: input.trim() && !isTyping ? '#FE5858' : '#e2e8f0',
                                    color: input.trim() && !isTyping ? '#fff' : '#94a3b8',
                                    border: 'none', cursor: input.trim() && !isTyping ? 'pointer' : 'default',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.2s', flexShrink: 0,
                                }}
                            >
                                <Send size={15} />
                            </button>
                        </div>

                        {/* Footer */}
                        <div style={{
                            padding: '5px 14px 8px', textAlign: 'center',
                            fontSize: '0.6rem', color: '#94a3b8', flexShrink: 0,
                        }}>
                            <button onClick={clearChat} style={{
                                background: 'none', border: 'none', color: '#94a3b8',
                                fontSize: '0.6rem', cursor: 'pointer', textDecoration: 'underline',
                            }}>
                                Clear chat
                            </button>
                            {' · '}Powered by AI
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
                style={{
                    width: '58px', height: '58px', borderRadius: '16px',
                    background: '#1e293b', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 30px -5px rgba(30,41,59,0.4)',
                    border: '2px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer', position: 'relative',
                }}
            >
                {isOpen ? <X size={22} /> : <MessageSquare size={22} style={{ color: '#FE5858' }} />}
                {!isOpen && (
                    <span style={{
                        position: 'absolute', top: '-2px', right: '-2px',
                        width: '11px', height: '11px', borderRadius: '50%',
                        background: '#22c55e', border: '2px solid #1e293b',
                    }} />
                )}
            </motion.button>

            <style>{`
                @keyframes chatDot {
                    0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
                    30% { opacity: 1; transform: translateY(-4px); }
                }
            `}</style>
        </div>
    );
};

export default FloatingConcierge;
