import React, { useState } from 'react';
import { X, Mail, Lock, User, LogOut, CheckCircle, Clock, ShieldCheck } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabase';

export default function AuthModal({ isOpen, onClose, userSession, onSignOut }) {
  if (!isOpen) return null;

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const client = getSupabaseClient();
    if (!client) {
      setMessage('Cloud backend connection is initializing...');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (isLoginMode) {
        const { error } = await client.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim()
        });
        if (error) setMessage({ type: 'error', text: error.message });
        else {
          setMessage({ type: 'success', text: 'Successfully logged in! Your streak and progress are now syncing to your account.' });
          setTimeout(() => onClose(), 1200);
        }
      } else {
        const { error } = await client.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            emailRedirectTo: window.location.origin
          }
        });
        const isRateLimit = error && (
          error.message.toLowerCase().includes('rate limit') || 
          error.message.toLowerCase().includes('email rate limit') ||
          error.status === 429
        );
        if (isRateLimit) {
          setMessage({
            type: 'rate_limit',
            title: 'Hourly Email Limit Reached',
            body: 'Supabase email verification quota has been momentarily exceeded. Please try again in 1 hour.',
            note: 'Your local progress & streak are safe on this device!'
          });
        } else if (error) {
          setMessage({ type: 'error', text: error.message });
        } else {
          setMessage({ type: 'success', text: 'Account created! Please check your email to confirm sign up.' });
        }
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(43, 33, 25, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem'
    }}>
      <div className="card-base animate-fade-in" style={{ width: '100%', maxWidth: '440px', backgroundColor: 'var(--surface-card)', position: 'relative' }}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#776655' }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <User size={22} color="var(--accent-maroon)" />
          <h3 style={{ fontSize: '1.4rem', color: 'var(--accent-deep-maroon)', margin: 0 }}>
            {userSession ? 'Learner Profile' : 'Learner Account & Cloud Sync'}
          </h3>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#665544', marginBottom: '1.25rem' }}>
          {userSession ? 'Logged in & syncing streaks to your account.' : 'Log in or sign up to sync your Kokborok streak across all devices.'}
        </p>

        {/* AUTH FORM / LOGGED IN STATUS */}
        <div>
          {userSession ? (
            <div style={{ padding: '1rem', backgroundColor: '#EBF4ED', borderRadius: '12px', border: '1px solid #B8DCBE', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-forest-green)', fontWeight: '700', marginBottom: '0.3rem' }}>
                <CheckCircle size={18} /> Logged In
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-ink)', marginBottom: '0.2rem' }}>
                {userSession.user.email}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#556655', marginBottom: '1rem' }}>
                Your daily streak and lesson progress are automatically synchronized with your cloud database.
              </div>

              <button 
                onClick={() => { onSignOut(); onClose(); }}
                className="btn-secondary" 
                style={{ width: '100%', justifyContent: 'center', color: 'var(--accent-maroon)', borderColor: 'var(--accent-maroon)' }}
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          ) : (
            <form onSubmit={handleAuthSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label className="eyebrow" style={{ fontSize: '0.65rem', color: 'var(--accent-ochre)', marginBottom: '0.3rem', display: 'block' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email"
                    placeholder="learner@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border-hairline)' }}
                  />
                  <Mail size={15} color="#887766" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="eyebrow" style={{ fontSize: '0.65rem', color: 'var(--accent-ochre)', marginBottom: '0.3rem', display: 'block' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border-hairline)' }}
                  />
                  <Lock size={15} color="#887766" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {message && (
                typeof message === 'object' && message.type === 'rate_limit' ? (
                  <div style={{ 
                    padding: '0.85rem 1rem', 
                    backgroundColor: 'rgba(217, 119, 6, 0.08)', 
                    border: '1px solid rgba(217, 119, 6, 0.25)', 
                    borderRadius: '10px', 
                    marginBottom: '1rem',
                    color: '#92400e'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <Clock size={16} color="#d97706" />
                      <span>{message.title}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', margin: '0 0 0.5rem 0', opacity: 0.9, lineHeight: 1.4 }}>
                      {message.body}
                    </p>
                    <div style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.35rem', 
                      fontSize: '0.75rem', 
                      fontWeight: '600',
                      color: 'var(--accent-teal)',
                      backgroundColor: 'rgba(13, 148, 136, 0.08)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '6px'
                    }}>
                      <ShieldCheck size={14} />
                      <span>{message.note}</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ 
                    padding: '0.75rem 0.9rem', 
                    backgroundColor: message?.type === 'success' ? 'rgba(16, 185, 129, 0.08)' : '#FFF4E5', 
                    border: `1px solid ${message?.type === 'success' ? 'rgba(16, 185, 129, 0.25)' : '#F5D0A9'}`, 
                    color: message?.type === 'success' ? '#065f46' : 'var(--accent-maroon)', 
                    borderRadius: '8px', 
                    fontSize: '0.85rem', 
                    marginBottom: '1rem', 
                    fontWeight: '600' 
                  }}>
                    {typeof message === 'object' ? message.text : message}
                  </div>
                )
              )}

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  {loading ? 'Processing...' : isLoginMode ? 'Log In' : 'Create Account'}
                </button>

                <button 
                  type="button" 
                  onClick={() => { setIsLoginMode(!isLoginMode); setMessage(''); }} 
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem' }}
                >
                  {isLoginMode ? 'Sign Up' : 'Log In'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
