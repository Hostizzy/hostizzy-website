'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, FileText, Briefcase, Users, LogOut,
  Plus, Trash2, Edit, Sparkles, Loader, X, Eye, EyeOff,
  Mail, Calculator, ChevronRight, Building2
} from 'lucide-react';

const PRIMARY = '#FE5858';
const SIDEBAR_BG = '#0f172a';
const SIDEBAR_WIDTH = 240;

// ─── Helpers ───────────────────────────────────────────

function authHeaders(token) {
  return { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
}

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

function truncate(str, len = 60) {
  if (!str) return '-';
  return str.length > len ? str.slice(0, len) + '...' : str;
}

// ─── Main Component ────────────────────────────────────

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Login state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Dashboard state
  const [stats, setStats] = useState({ blogs: 0, careers: 0, contacts: 0, leads: 0, propertyLeads: 0 });
  const [statsLoading, setStatsLoading] = useState(false);

  // Blogs state
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogModal, setBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({ title: '', excerpt: '', content: '', image: '' });
  const [blogSaving, setBlogSaving] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Careers state
  const [careers, setCareers] = useState([]);
  const [careersLoading, setCareersLoading] = useState(false);
  const [careerModal, setCareerModal] = useState(false);
  const [careerForm, setCareerForm] = useState({ role: '', department: 'Marketing', location: '', experience: '', description: '' });
  const [careerSaving, setCareerSaving] = useState(false);

  // Property Leads state
  const [propertyLeads, setPropertyLeads] = useState([]);
  const [propertyLeadsLoading, setPropertyLeadsLoading] = useState(false);

  // Leads state
  const [leadsSubTab, setLeadsSubTab] = useState('property');
  const [contacts, setContacts] = useState([]);
  const [calcLeads, setCalcLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);

  // ─── Auth ──────────────────────────────────────────

  useEffect(() => {
    const saved = localStorage.getItem('adminToken');
    if (saved) {
      setToken(saved);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch {
      setLoginError('Login failed. Please try again.');
    }
    setLoginLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  // ─── Data Fetching ────────────────────────────────

  const fetchStats = useCallback(async () => {
    if (!token) return;
    setStatsLoading(true);
    try {
      const [blogsRes, careersRes, contactsRes, leadsRes, propertyLeadsRes] = await Promise.all([
        fetch('/api/blogs'),
        fetch('/api/careers'),
        fetch('/api/contacts', { headers: authHeaders(token) }),
        fetch('/api/calculator-leads', { headers: authHeaders(token) }),
        fetch('/api/property-leads', { headers: authHeaders(token) })
      ]);
      const [blogsData, careersData, contactsData, leadsData, propertyLeadsData] = await Promise.all([
        blogsRes.json(), careersRes.json(), contactsRes.json(), leadsRes.json(), propertyLeadsRes.json()
      ]);
      setStats({
        blogs: Array.isArray(blogsData) ? blogsData.length : 0,
        careers: Array.isArray(careersData) ? careersData.length : 0,
        contacts: Array.isArray(contactsData) ? contactsData.length : 0,
        leads: Array.isArray(leadsData) ? leadsData.length : 0,
        propertyLeads: Array.isArray(propertyLeadsData) ? propertyLeadsData.length : 0,
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      // If auth fails, logout
      if (err?.status === 403) handleLogout();
    }
    setStatsLoading(false);
  }, [token]);

  const fetchBlogs = useCallback(async () => {
    setBlogsLoading(true);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data.sort((a, b) => new Date(b.date) - new Date(a.date)) : []);
    } catch { setBlogs([]); }
    setBlogsLoading(false);
  }, []);

  const fetchCareers = useCallback(async () => {
    setCareersLoading(true);
    try {
      const res = await fetch('/api/careers');
      const data = await res.json();
      setCareers(Array.isArray(data) ? data : []);
    } catch { setCareers([]); }
    setCareersLoading(false);
  }, []);

  const fetchLeads = useCallback(async () => {
    if (!token) return;
    setLeadsLoading(true);
    try {
      const [contactsRes, leadsRes] = await Promise.all([
        fetch('/api/contacts', { headers: authHeaders(token) }),
        fetch('/api/calculator-leads', { headers: authHeaders(token) })
      ]);
      const [contactsData, leadsData] = await Promise.all([
        contactsRes.json(), leadsRes.json()
      ]);
      setContacts(Array.isArray(contactsData) ? contactsData.sort((a, b) => new Date(b.timestamp || b.createdAt) - new Date(a.timestamp || a.createdAt)) : []);
      setCalcLeads(Array.isArray(leadsData) ? leadsData.sort((a, b) => new Date(b.createdAt || b.timestamp) - new Date(a.createdAt || a.timestamp)) : []);
    } catch { setContacts([]); setCalcLeads([]); }
    setLeadsLoading(false);
  }, [token]);

  const fetchPropertyLeads = useCallback(async () => {
    if (!token) return;
    setPropertyLeadsLoading(true);
    try {
      const res = await fetch('/api/property-leads', { headers: authHeaders(token) });
      const data = await res.json();
      setPropertyLeads(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch property leads:', err);
    } finally {
      setPropertyLeadsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (activeTab === 'dashboard') fetchStats();
    if (activeTab === 'blogs') fetchBlogs();
    if (activeTab === 'careers') fetchCareers();
    if (activeTab === 'leads') fetchLeads();
    if (activeTab === 'leads' && propertyLeads.length === 0) fetchPropertyLeads();
  }, [isAuthenticated, activeTab, fetchStats, fetchBlogs, fetchCareers, fetchLeads, fetchPropertyLeads]);

  // ─── Blog Actions ─────────────────────────────────

  const openNewBlog = () => {
    setEditingBlog(null);
    setBlogForm({ title: '', excerpt: '', content: '', image: '' });
    setAiTopic('');
    setBlogModal(true);
  };

  const openEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({ title: blog.title || '', excerpt: blog.excerpt || '', content: blog.content || '', image: blog.image || '' });
    setAiTopic('');
    setBlogModal(true);
  };

  const saveBlog = async () => {
    if (!blogForm.title.trim()) return;
    setBlogSaving(true);
    try {
      const url = editingBlog ? `/api/blogs/${editingBlog.id}` : '/api/blogs';
      const method = editingBlog ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: authHeaders(token),
        body: JSON.stringify(blogForm)
      });
      setBlogModal(false);
      fetchBlogs();
      fetchStats();
    } catch (err) { console.error('Save blog failed:', err); }
    setBlogSaving(false);
  };

  const deleteBlog = async (id) => {
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE', headers: authHeaders(token) });
      setDeleteConfirm(null);
      fetchBlogs();
      fetchStats();
    } catch (err) { console.error('Delete blog failed:', err); }
  };

  const generateAiBlog = async () => {
    if (!aiTopic.trim()) return;
    setAiGenerating(true);
    try {
      const res = await fetch('/api/ai-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic })
      });
      const data = await res.json();
      if (data.title) {
        setBlogForm({
          title: data.title || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          image: blogForm.image || ''
        });
      }
    } catch (err) { console.error('AI generation failed:', err); }
    setAiGenerating(false);
  };

  // ─── Career Actions ───────────────────────────────

  const openNewCareer = () => {
    setCareerForm({ role: '', department: 'Marketing', location: '', experience: '', description: '' });
    setCareerModal(true);
  };

  const saveCareer = async () => {
    if (!careerForm.role.trim()) return;
    setCareerSaving(true);
    try {
      await fetch('/api/careers', {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(careerForm)
      });
      setCareerModal(false);
      fetchCareers();
      fetchStats();
    } catch (err) { console.error('Save career failed:', err); }
    setCareerSaving(false);
  };

  // ─── Styles ───────────────────────────────────────

  const styles = {
    loginContainer: {
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '20px'
    },
    loginCard: {
      background: '#fff', borderRadius: '16px', padding: '48px 40px', width: '100%', maxWidth: '420px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
    },
    logo: {
      fontSize: '28px', fontWeight: '800', color: SIDEBAR_BG, textAlign: 'center', marginBottom: '8px'
    },
    logoAccent: { color: PRIMARY },
    loginSubtitle: {
      textAlign: 'center', color: '#64748b', fontSize: '14px', marginBottom: '32px'
    },
    inputGroup: { marginBottom: '20px' },
    label: {
      display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px'
    },
    input: {
      width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: '8px',
      fontSize: '14px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
    },
    passwordWrapper: { position: 'relative' },
    passwordToggle: {
      position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
      background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px'
    },
    loginBtn: {
      width: '100%', padding: '14px', background: PRIMARY, color: '#fff', border: 'none',
      borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
      transition: 'opacity 0.2s'
    },
    errorMsg: {
      background: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: '8px',
      fontSize: '13px', marginBottom: '20px', border: '1px solid #fecaca'
    },
    // Authenticated layout
    layout: { display: 'flex', minHeight: '100vh', background: '#f1f5f9' },
    sidebar: {
      width: `${SIDEBAR_WIDTH}px`, background: SIDEBAR_BG, color: '#fff', display: 'flex',
      flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
      transition: 'transform 0.3s'
    },
    sidebarLogo: {
      padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)'
    },
    sidebarLogoText: {
      fontSize: '22px', fontWeight: '800', color: '#fff', margin: 0
    },
    nav: { flex: 1, padding: '16px 12px' },
    navItem: (active) => ({
      display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
      borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500',
      color: active ? '#fff' : '#94a3b8', background: active ? PRIMARY : 'transparent',
      marginBottom: '4px', transition: 'all 0.2s', border: 'none', width: '100%',
      textAlign: 'left'
    }),
    logoutBtn: {
      display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 28px',
      borderTop: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer',
      color: '#94a3b8', fontSize: '14px', background: 'none', border: 'none', width: '100%',
      textAlign: 'left'
    },
    main: { flex: 1, marginLeft: `${SIDEBAR_WIDTH}px`, minHeight: '100vh' },
    topBar: {
      background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '16px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    },
    topBarTitle: { fontSize: '20px', fontWeight: '700', color: '#0f172a' },
    topBarBreadcrumb: {
      display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px'
    },
    content: { padding: '32px' },
    // Stats
    statsGrid: {
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px', marginBottom: '24px'
    },
    statCard: {
      background: '#fff', borderRadius: '12px', padding: '24px',
      border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px'
    },
    statIcon: (color) => ({
      width: '48px', height: '48px', borderRadius: '12px', display: 'flex',
      alignItems: 'center', justifyContent: 'center', background: color + '15', color: color
    }),
    statNumber: { fontSize: '28px', fontWeight: '700', color: '#0f172a', lineHeight: 1 },
    statLabel: { fontSize: '13px', color: '#64748b', marginTop: '4px' },
    // Cards & Tables
    card: {
      background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden'
    },
    cardHeader: {
      padding: '20px 24px', borderBottom: '1px solid #e2e8f0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    },
    cardTitle: { fontSize: '16px', fontWeight: '600', color: '#0f172a' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: {
      textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: '600',
      color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em',
      borderBottom: '1px solid #e2e8f0', background: '#f8fafc'
    },
    td: (i) => ({
      padding: '14px 16px', fontSize: '14px', color: '#334155',
      borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#f8fafc'
    }),
    // Buttons
    btnPrimary: {
      display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px',
      background: PRIMARY, color: '#fff', border: 'none', borderRadius: '8px',
      fontSize: '13px', fontWeight: '600', cursor: 'pointer'
    },
    btnSecondary: {
      display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px',
      background: '#f1f5f9', color: '#334155', border: '1px solid #e2e8f0', borderRadius: '8px',
      fontSize: '13px', fontWeight: '500', cursor: 'pointer'
    },
    btnDanger: {
      display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px',
      background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '6px',
      fontSize: '12px', cursor: 'pointer'
    },
    btnSmall: {
      display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px',
      background: '#f1f5f9', color: '#334155', border: '1px solid #e2e8f0', borderRadius: '6px',
      fontSize: '12px', cursor: 'pointer'
    },
    // Modal
    overlay: {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px'
    },
    modal: {
      background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '640px',
      maxHeight: '90vh', overflow: 'auto'
    },
    modalHeader: {
      padding: '20px 24px', borderBottom: '1px solid #e2e8f0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    },
    modalBody: { padding: '24px' },
    modalFooter: {
      padding: '16px 24px', borderTop: '1px solid #e2e8f0',
      display: 'flex', justifyContent: 'flex-end', gap: '10px'
    },
    textarea: (rows) => ({
      width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: '8px',
      fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit',
      minHeight: `${rows * 24}px`, boxSizing: 'border-box'
    }),
    select: {
      width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: '8px',
      fontSize: '14px', outline: 'none', background: '#fff', boxSizing: 'border-box'
    },
    badge: (active) => ({
      display: 'inline-block', padding: '4px 10px', borderRadius: '12px', fontSize: '12px',
      fontWeight: '500', background: active ? '#dcfce7' : '#f1f5f9',
      color: active ? '#16a34a' : '#64748b'
    }),
    subTab: (active) => ({
      padding: '10px 20px', border: 'none', borderBottom: active ? `2px solid ${PRIMARY}` : '2px solid transparent',
      background: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: active ? '600' : '400',
      color: active ? PRIMARY : '#64748b'
    }),
    emptyState: {
      textAlign: 'center', padding: '48px 20px', color: '#94a3b8', fontSize: '14px'
    },
    // Delete confirm
    confirmOverlay: {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: '20px'
    },
    confirmBox: {
      background: '#fff', borderRadius: '12px', padding: '32px', maxWidth: '400px', width: '100%',
      textAlign: 'center'
    },
    // Mobile hamburger
    hamburger: {
      display: 'none', position: 'fixed', top: '12px', left: '12px', zIndex: 150,
      background: SIDEBAR_BG, border: 'none', borderRadius: '8px', padding: '10px 12px',
      cursor: 'pointer', color: '#fff'
    },
    mobileOverlay: {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 99
    },
    // AI section
    aiSection: {
      background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px',
      padding: '16px', marginBottom: '20px'
    },
    aiInputRow: {
      display: 'flex', gap: '8px', alignItems: 'center'
    }
  };

  // ─── Login Screen ─────────────────────────────────

  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <div style={styles.logo}>
            Host<span style={styles.logoAccent}>izzy</span>
          </div>
          <p style={styles.loginSubtitle}>Admin Panel</p>
          {loginError && <div style={styles.errorMsg}>{loginError}</div>}
          <form onSubmit={handleLogin}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <input
                style={styles.input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoFocus
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  style={styles.input}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  style={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" style={{ ...styles.loginBtn, opacity: loginLoading ? 0.7 : 1 }} disabled={loginLoading}>
              {loginLoading && <Loader size={18} className="spin" />}
              {loginLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          .spin { animation: spin 1s linear infinite; }
          @media (max-width: 480px) {
            div[style*="padding: 48px 40px"] { padding: 32px 24px !important; }
          }
        `}</style>
      </div>
    );
  }

  // ─── Tab Content Renderers ────────────────────────

  const renderDashboard = () => (
    <>
      <div style={styles.statsGrid}>
        {[
          { label: 'Property Leads', value: stats.propertyLeads || 0, icon: <Building2 size={24} />, color: '#ef4444', action: () => setActiveTab('leads') },
          { label: 'Total Blog Posts', value: stats.blogs, icon: <FileText size={24} />, color: '#3b82f6' },
          { label: 'Active Job Openings', value: stats.careers, icon: <Briefcase size={24} />, color: '#8b5cf6' },
          { label: 'Contact Inquiries', value: stats.contacts, icon: <Mail size={24} />, color: '#10b981' },
          { label: 'Calculator Leads', value: stats.leads, icon: <Calculator size={24} />, color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} style={{ ...styles.statCard, cursor: s.action ? 'pointer' : 'default' }} onClick={s.action || undefined}>
            <div style={styles.statIcon(s.color)}>{s.icon}</div>
            <div>
              <div style={styles.statNumber}>{statsLoading ? '-' : s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.card}>
        <div style={{ ...styles.cardHeader, flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
          <div style={styles.cardTitle}>Quick Actions</div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>Manage your content from the sidebar tabs</div>
        </div>
        <div style={{ padding: '20px 24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button style={styles.btnPrimary} onClick={() => { setActiveTab('blogs'); setTimeout(openNewBlog, 100); }}>
            <Plus size={16} /> New Blog Post
          </button>
          <button style={styles.btnSecondary} onClick={() => { setActiveTab('careers'); setTimeout(openNewCareer, 100); }}>
            <Plus size={16} /> Add Job Opening
          </button>
          <button style={styles.btnPrimary} onClick={() => setActiveTab('leads')}>
            <Building2 size={16} /> View Property Leads
          </button>
          <button style={styles.btnSecondary} onClick={() => setActiveTab('leads')}>
            <Users size={16} /> View Leads
          </button>
        </div>
      </div>
    </>
  );

  const renderBlogs = () => (
    <>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.cardTitle}>Blog Posts</div>
          <button style={styles.btnPrimary} onClick={openNewBlog}><Plus size={16} /> New Post</button>
        </div>
        {blogsLoading ? (
          <div style={styles.emptyState}><Loader size={20} className="spin" /> Loading...</div>
        ) : blogs.length === 0 ? (
          <div style={styles.emptyState}>No blog posts yet. Create your first post!</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Excerpt</th>
                  <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, i) => (
                  <tr key={blog.id}>
                    <td style={{ ...styles.td(i), fontWeight: '500', maxWidth: '250px' }}>{truncate(blog.title, 45)}</td>
                    <td style={{ ...styles.td(i), whiteSpace: 'nowrap' }}>{formatDate(blog.date)}</td>
                    <td style={{ ...styles.td(i), color: '#64748b', maxWidth: '300px' }}>{truncate(blog.excerpt, 80)}</td>
                    <td style={{ ...styles.td(i), textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button style={{ ...styles.btnSmall, marginRight: '8px' }} onClick={() => openEditBlog(blog)}>
                        <Edit size={14} /> Edit
                      </button>
                      <button style={styles.btnDanger} onClick={() => setDeleteConfirm(blog.id)}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Blog Modal */}
      {blogModal && (
        <div style={styles.overlay} onClick={() => setBlogModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={{ fontSize: '18px', fontWeight: '600' }}>
                {editingBlog ? 'Edit Blog Post' : 'New Blog Post'}
              </div>
              <button onClick={() => setBlogModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>
            <div style={styles.modalBody}>
              {/* AI Generate */}
              <div style={styles.aiSection}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color={PRIMARY} /> AI Generate Content
                </div>
                <div style={styles.aiInputRow}>
                  <input
                    style={{ ...styles.input, flex: 1 }}
                    type="text"
                    placeholder="Enter a topic (e.g. vacation rental pricing)"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && generateAiBlog()}
                  />
                  <button
                    style={{ ...styles.btnPrimary, whiteSpace: 'nowrap', opacity: aiGenerating ? 0.7 : 1 }}
                    onClick={generateAiBlog}
                    disabled={aiGenerating}
                  >
                    {aiGenerating ? <Loader size={14} className="spin" /> : <Sparkles size={14} />}
                    {aiGenerating ? 'Generating...' : 'Generate'}
                  </button>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Title</label>
                <input style={styles.input} value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} placeholder="Blog post title" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Excerpt</label>
                <textarea style={styles.textarea(3)} value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} placeholder="Short description..." />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Content</label>
                <textarea style={styles.textarea(10)} value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} placeholder="Full blog content (supports markdown)..." />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Image URL</label>
                <input style={styles.input} value={blogForm.image} onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })} placeholder="https://..." />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.btnSecondary} onClick={() => setBlogModal(false)}>Cancel</button>
              <button
                style={{ ...styles.btnPrimary, opacity: blogSaving ? 0.7 : 1 }}
                onClick={saveBlog}
                disabled={blogSaving}
              >
                {blogSaving ? <Loader size={14} className="spin" /> : null}
                {blogSaving ? 'Saving...' : (editingBlog ? 'Update Post' : 'Create Post')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div style={styles.confirmOverlay} onClick={() => setDeleteConfirm(null)}>
          <div style={styles.confirmBox} onClick={(e) => e.stopPropagation()}>
            <Trash2 size={32} color="#dc2626" style={{ marginBottom: '16px' }} />
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Delete Blog Post?</div>
            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>This action cannot be undone.</div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button style={styles.btnSecondary} onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button style={{ ...styles.btnPrimary, background: '#dc2626' }} onClick={() => deleteBlog(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const renderCareers = () => (
    <>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.cardTitle}>Job Openings</div>
          <button style={styles.btnPrimary} onClick={openNewCareer}><Plus size={16} /> Add Position</button>
        </div>
        {careersLoading ? (
          <div style={styles.emptyState}><Loader size={20} className="spin" /> Loading...</div>
        ) : careers.length === 0 ? (
          <div style={styles.emptyState}>No job openings yet.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Location</th>
                  <th style={styles.th}>Experience</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Posted</th>
                </tr>
              </thead>
              <tbody>
                {careers.map((job, i) => (
                  <tr key={job.id}>
                    <td style={{ ...styles.td(i), fontWeight: '500' }}>{job.role}</td>
                    <td style={styles.td(i)}>{job.department}</td>
                    <td style={styles.td(i)}>{job.location}</td>
                    <td style={styles.td(i)}>{job.experience || '-'}</td>
                    <td style={styles.td(i)}>
                      <span style={styles.badge(job.isActive !== false)}>{job.isActive !== false ? 'Active' : 'Inactive'}</span>
                    </td>
                    <td style={{ ...styles.td(i), whiteSpace: 'nowrap' }}>{formatDate(job.postedDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Career Modal */}
      {careerModal && (
        <div style={styles.overlay} onClick={() => setCareerModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={{ fontSize: '18px', fontWeight: '600' }}>Add Job Position</div>
              <button onClick={() => setCareerModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Role</label>
                <input style={styles.input} value={careerForm.role} onChange={(e) => setCareerForm({ ...careerForm, role: e.target.value })} placeholder="e.g. Growth Marketing Manager" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Department</label>
                <select style={styles.select} value={careerForm.department} onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })}>
                  <option>Marketing</option>
                  <option>Engineering</option>
                  <option>Growth</option>
                  <option>Operations</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Location</label>
                <input style={styles.input} value={careerForm.location} onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })} placeholder="e.g. Remote / New Delhi" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Experience</label>
                <input style={styles.input} value={careerForm.experience} onChange={(e) => setCareerForm({ ...careerForm, experience: e.target.value })} placeholder="e.g. 2-4 years" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Description</label>
                <textarea style={styles.textarea(5)} value={careerForm.description} onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })} placeholder="Job description..." />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.btnSecondary} onClick={() => setCareerModal(false)}>Cancel</button>
              <button
                style={{ ...styles.btnPrimary, opacity: careerSaving ? 0.7 : 1 }}
                onClick={saveCareer}
                disabled={careerSaving}
              >
                {careerSaving ? <Loader size={14} className="spin" /> : null}
                {careerSaving ? 'Saving...' : 'Add Position'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const renderPropertyLeads = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Property Leads</h2>
        <button onClick={fetchPropertyLeads} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontSize: '0.85rem' }}>
          Refresh
        </button>
      </div>

      {propertyLeadsLoading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}><Loader size={20} className="spin" /> Loading...</div>
      ) : propertyLeads.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No property leads yet.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem', color: '#64748b', fontWeight: 600 }}>Name</th>
                <th style={{ padding: '0.75rem', color: '#64748b', fontWeight: 600 }}>Phone</th>
                <th style={{ padding: '0.75rem', color: '#64748b', fontWeight: 600 }}>Email</th>
                <th style={{ padding: '0.75rem', color: '#64748b', fontWeight: 600 }}>City</th>
                <th style={{ padding: '0.75rem', color: '#64748b', fontWeight: 600 }}>Property Type</th>
                <th style={{ padding: '0.75rem', color: '#64748b', fontWeight: 600 }}>Bedrooms</th>
                <th style={{ padding: '0.75rem', color: '#64748b', fontWeight: 600 }}>Service Interest</th>
                <th style={{ padding: '0.75rem', color: '#64748b', fontWeight: 600 }}>Revenue</th>
                <th style={{ padding: '0.75rem', color: '#64748b', fontWeight: 600 }}>Source</th>
                <th style={{ padding: '0.75rem', color: '#64748b', fontWeight: 600 }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {propertyLeads.map((lead, i) => (
                <tr key={lead.id || i} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{lead.name}</td>
                  <td style={{ padding: '0.75rem' }}><a href={`tel:${lead.phone}`} style={{ color: '#3b82f6' }}>{lead.phone}</a></td>
                  <td style={{ padding: '0.75rem' }}><a href={`mailto:${lead.email}`} style={{ color: '#3b82f6' }}>{lead.email}</a></td>
                  <td style={{ padding: '0.75rem' }}>{lead.city || '\u2014'}</td>
                  <td style={{ padding: '0.75rem' }}>{lead.propertyType || '\u2014'}</td>
                  <td style={{ padding: '0.75rem' }}>{lead.bedrooms || '\u2014'}</td>
                  <td style={{ padding: '0.75rem' }}>{lead.serviceInterest || '\u2014'}</td>
                  <td style={{ padding: '0.75rem' }}>{lead.currentRevenue || '\u2014'}</td>
                  <td style={{ padding: '0.75rem' }}><span style={{ padding: '0.2rem 0.5rem', borderRadius: '999px', background: '#f0f9ff', color: '#3b82f6', fontSize: '0.75rem', fontWeight: 600 }}>{lead.source || 'website'}</span></td>
                  <td style={{ padding: '0.75rem', color: '#94a3b8', fontSize: '0.8rem' }}>{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '\u2014'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderLeads = () => (
    <>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <button style={styles.subTab(leadsSubTab === 'property')} onClick={() => { setLeadsSubTab('property'); if (propertyLeads.length === 0) fetchPropertyLeads(); }}>
          <Building2 size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Property Leads ({propertyLeads.length})
        </button>
        <button style={styles.subTab(leadsSubTab === 'contacts')} onClick={() => setLeadsSubTab('contacts')}>
          <Mail size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Contact Inquiries ({contacts.length})
        </button>
        <button style={styles.subTab(leadsSubTab === 'calculator')} onClick={() => setLeadsSubTab('calculator')}>
          <Calculator size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Calculator Leads ({calcLeads.length})
        </button>
      </div>

      <div style={styles.card}>
        {leadsSubTab === 'property' ? (
          propertyLeadsLoading ? (
            <div style={styles.emptyState}><Loader size={20} className="spin" /> Loading...</div>
          ) : propertyLeads.length === 0 ? (
            <div style={styles.emptyState}>No property leads yet.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Phone</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>City</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>BHK</th>
                    <th style={styles.th}>Service</th>
                    <th style={styles.th}>Revenue</th>
                    <th style={styles.th}>Source</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyLeads.map((lead, i) => (
                    <tr key={lead.id || i}>
                      <td style={{ ...styles.td(i), fontWeight: '600', whiteSpace: 'nowrap' }}>{lead.name}</td>
                      <td style={{ ...styles.td(i), whiteSpace: 'nowrap' }}><a href={`tel:${lead.phone}`} style={{ color: '#3b82f6' }}>{lead.phone}</a></td>
                      <td style={styles.td(i)}><a href={`mailto:${lead.email}`} style={{ color: '#3b82f6' }}>{lead.email}</a></td>
                      <td style={styles.td(i)}>{lead.city || '—'}</td>
                      <td style={styles.td(i)}>{lead.propertyType || '—'}</td>
                      <td style={styles.td(i)}>{lead.bedrooms || '—'}</td>
                      <td style={styles.td(i)}>{lead.serviceInterest || '—'}</td>
                      <td style={styles.td(i)}>{lead.currentRevenue || '—'}</td>
                      <td style={styles.td(i)}><span style={{ padding: '0.15rem 0.5rem', borderRadius: '999px', background: '#f0f9ff', color: '#3b82f6', fontSize: '0.7rem', fontWeight: 600 }}>{lead.source || 'web'}</span></td>
                      <td style={{ ...styles.td(i), whiteSpace: 'nowrap' }}>{formatDate(lead.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : leadsLoading ? (
          <div style={styles.emptyState}><Loader size={20} className="spin" /> Loading...</div>
        ) : leadsSubTab === 'contacts' ? (
          contacts.length === 0 ? (
            <div style={styles.emptyState}>No contact inquiries yet.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Phone</th>
                    <th style={styles.th}>Department</th>
                    <th style={styles.th}>Message</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c, i) => (
                    <tr key={c.id || i}>
                      <td style={{ ...styles.td(i), fontWeight: '500', whiteSpace: 'nowrap' }}>{c.name || '-'}</td>
                      <td style={styles.td(i)}>{c.email || '-'}</td>
                      <td style={{ ...styles.td(i), whiteSpace: 'nowrap' }}>{c.phone || '-'}</td>
                      <td style={styles.td(i)}>{c.department || c.inquiryType || '-'}</td>
                      <td style={{ ...styles.td(i), maxWidth: '200px', color: '#64748b' }}>{truncate(c.message, 50)}</td>
                      <td style={{ ...styles.td(i), whiteSpace: 'nowrap' }}>{formatDate(c.timestamp || c.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          calcLeads.length === 0 ? (
            <div style={styles.emptyState}>No calculator leads yet.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>City</th>
                    <th style={styles.th}>Property Type</th>
                    <th style={styles.th}>Bedrooms</th>
                    <th style={styles.th}>Revenue Est.</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {calcLeads.map((l, i) => (
                    <tr key={l.id || i}>
                      <td style={{ ...styles.td(i), fontWeight: '500' }}>{l.email || '-'}</td>
                      <td style={styles.td(i)}>{l.city || '-'}</td>
                      <td style={styles.td(i)}>{l.propertyType || '-'}</td>
                      <td style={styles.td(i)}>{l.bedrooms || '-'}</td>
                      <td style={styles.td(i)}>{l.revenue ? `₹${Number(l.revenue).toLocaleString('en-IN')}` : '-'}</td>
                      <td style={{ ...styles.td(i), whiteSpace: 'nowrap' }}>{formatDate(l.createdAt || l.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </>
  );

  // ─── Tab Map ──────────────────────────────────────

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { key: 'blogs', label: 'Blogs', icon: <FileText size={18} /> },
    { key: 'careers', label: 'Careers', icon: <Briefcase size={18} /> },
    { key: 'leads', label: 'Leads', icon: <Users size={18} /> },
  ];

  const tabLabels = { dashboard: 'Dashboard', blogs: 'Blog Posts', careers: 'Job Openings', leads: 'Leads & Inquiries' };

  const tabContent = {
    dashboard: renderDashboard,
    blogs: renderBlogs,
    careers: renderCareers,
    leads: renderLeads,
  };

  // ─── Authenticated Layout ─────────────────────────

  return (
    <div style={styles.layout}>
      {/* Mobile hamburger */}
      <button
        style={styles.hamburger}
        className="mobile-hamburger"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <LayoutDashboard size={20} />}
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && <div style={styles.mobileOverlay} className="mobile-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside style={styles.sidebar} className={sidebarOpen ? 'sidebar-open' : 'sidebar'}>
        <div style={styles.sidebarLogo}>
          <div style={styles.sidebarLogoText}>
            Host<span style={{ color: PRIMARY }}>izzy</span>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Admin Panel</div>
        </div>
        <nav style={styles.nav}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              style={styles.navItem(activeTab === tab.key)}
              onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main content */}
      <main style={styles.main} className="admin-main">
        <div style={styles.topBar}>
          <div style={styles.topBarTitle}>{tabLabels[activeTab]}</div>
          <div style={styles.topBarBreadcrumb}>
            Admin <ChevronRight size={14} /> {tabLabels[activeTab]}
          </div>
        </div>
        <div style={styles.content}>
          {tabContent[activeTab]()}
        </div>
      </main>

      {/* Global styles for responsive */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }

        @media (max-width: 768px) {
          .mobile-hamburger { display: flex !important; }
          .sidebar { transform: translateX(-100%) !important; }
          .sidebar-open { transform: translateX(0) !important; }
          .mobile-overlay { display: block !important; }
          .admin-main { margin-left: 0 !important; }
        }
        @media (min-width: 769px) {
          .mobile-overlay { display: none !important; }
        }
      `}</style>
    </div>
  );
}
