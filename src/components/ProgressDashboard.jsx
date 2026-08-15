import React, { useState } from 'react';
import { Award, Flame, Bookmark, Trash2, Download, Upload, RotateCcw, Volume2, CheckCircle, Database, ShieldCheck, Mail, LogOut, Sparkles } from 'lucide-react';
import { uiTranslations } from '../data/uiTranslations';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export default function ProgressDashboard({ 
  completedLessons = [], 
  totalLessons = 28, 
  streak = 1, 
  bookmarks = [], 
  onRemoveBookmark, 
  onResetProgress, 
  onExportData, 
  onSpeak,
  lang,
  userSession
}) {
  const t = uiTranslations[lang] || uiTranslations.en;
  const percentage = Math.round((completedLessons.length / totalLessons) * 100);

  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!supabase || !authEmail.trim() || !authPassword.trim()) return;

    try {
      if (isLoginMode) {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword
        });
        if (error) setAuthMessage(error.message);
        else setAuthMessage('Logged in successfully! Your streak is syncing to Supabase.');
      } else {
        const { error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: {
            emailRedirectTo: window.location.origin
          }
        });
        if (error) setAuthMessage(error.message);
        else setAuthMessage('Account created! Please check your email to confirm sign up.');
      }
    } catch (err) {
      setAuthMessage(err.message);
    }
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      setAuthMessage('Logged out.');
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      
      {/* Banner */}
      <div className="card-base" style={{ marginBottom: '2rem', backgroundColor: 'var(--surface-cream)' }}>
        <span className="eyebrow">Personal Learner Hub</span>
        <h2 style={{ fontSize: '1.8rem', marginTop: '0.2rem', marginBottom: '0.5rem' }}>
          Your Kokborok Learning Progress
        </h2>
        <p style={{ color: '#5C4A3C', fontSize: '0.95rem' }}>
          Track your daily learning streak, lesson completions, quiz performance, and saved vocabulary bookmarks.
        </p>
      </div>

      {/* Top Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        
        {/* Streak Metric */}
        <div className="card-base" style={{ borderLeft: '5px solid var(--accent-ochre)', backgroundColor: 'var(--surface-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Flame size={22} color="var(--accent-ochre)" fill="var(--accent-ochre)" />
            <span className="eyebrow" style={{ color: 'var(--accent-ochre)' }}>{t.streak}</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent-deep-maroon)' }}>
            {streak} Days
          </div>
          <div style={{ fontSize: '0.8rem', color: '#665544', marginTop: '0.2rem' }}>
            Keep practicing daily to maintain your streak!
          </div>
        </div>

        {/* Lessons Completed Metric */}
        <div className="card-base" style={{ borderLeft: '5px solid var(--accent-forest-green)', backgroundColor: 'var(--surface-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Award size={22} color="var(--accent-forest-green)" />
            <span className="eyebrow" style={{ color: 'var(--accent-forest-green)' }}>Curriculum Mastery</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent-forest-green)' }}>
            {completedLessons.length} / {totalLessons}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#665544', marginTop: '0.2rem' }}>
            {percentage}% of all Kokborok lessons completed
          </div>
        </div>

        {/* Bookmarks Metric */}
        <div className="card-base" style={{ borderLeft: '5px solid var(--accent-maroon)', backgroundColor: 'var(--surface-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Bookmark size={22} color="var(--accent-maroon)" />
            <span className="eyebrow" style={{ color: 'var(--accent-maroon)' }}>Saved Words</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent-maroon)' }}>
            {bookmarks.length} Words
          </div>
          <div style={{ fontSize: '0.8rem', color: '#665544', marginTop: '0.2rem' }}>
            Bookmarked for fast review
          </div>
        </div>

      </div>

      {/* SUPABASE CLOUD BACKEND STATUS */}
      <div className="card-base" style={{ marginBottom: '2rem', backgroundColor: 'var(--surface-card)', borderTop: '5px solid var(--accent-teal)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Database size={20} color="var(--accent-teal)" />
          <span className="eyebrow" style={{ color: 'var(--accent-teal)' }}>Supabase Cloud Database Status</span>
        </div>

        {isSupabaseConfigured() ? (
          <div>
            <p style={{ fontSize: '0.9rem', color: '#554433', marginBottom: '1rem' }}>
              <strong>Supabase Backend Active</strong>: Free tier PostgreSQL database is connected and ready.
            </p>

            {userSession ? (
              <div style={{ padding: '1rem', backgroundColor: '#EBF4ED', borderRadius: '12px', border: '1px solid #B8DCBE', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--accent-forest-green)', fontSize: '0.95rem' }}>
                    Logged in as: {userSession.user.email}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#556655' }}>
                    Your streaks, completed lessons, and bookmarks are automatically syncing to Supabase Cloud!
                  </div>
                </div>
                <button onClick={handleSignOut} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            ) : (
              <form onSubmit={handleAuthSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
                <input 
                  type="email"
                  placeholder="Learner Email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  style={{ padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-hairline)' }}
                  required
                />
                <input 
                  type="password"
                  placeholder="Password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  style={{ padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-hairline)' }}
                  required
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1rem', fontSize: '0.85rem', flex: 1, backgroundColor: 'var(--accent-teal)' }}>
                    {isLoginMode ? 'Log In' : 'Sign Up'}
                  </button>
                  <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="btn-secondary" style={{ padding: '0.65rem', fontSize: '0.75rem' }}>
                    {isLoginMode ? 'Need Account?' : 'Have Account?'}
                  </button>
                </div>
              </form>
            )}

            {authMessage && (
              <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--accent-maroon)', fontWeight: '600' }}>
                {authMessage}
              </div>
            )}
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '0.9rem', color: '#665544', marginBottom: '0.5rem' }}>
              <strong>Supabase Free Tier Integration Supported</strong>: To enable Cloud Database sync, add your Supabase credentials to `.env` or Vercel environment variables:
            </p>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--surface-cream)', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--accent-deep-maroon)' }}>
              VITE_SUPABASE_URL=https://your-project.supabase.co<br/>
              VITE_SUPABASE_ANON_KEY=your-anon-key
            </div>
            <p style={{ fontSize: '0.8rem', color: '#776655', marginTop: '0.5rem' }}>
              Currently running in <strong>Guest Mode</strong> (all streaks & progress saved automatically in your browser).
            </p>
          </div>
        )}
      </div>

      {/* BOOKMARKS MANAGER */}
      <div className="card-base" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-deep-maroon)', marginBottom: '1rem' }}>
          Saved Vocabulary Bookmarks ({bookmarks.length})
        </h3>

        {bookmarks.length === 0 ? (
          <p style={{ fontSize: '0.9rem', color: '#665544' }}>
            No bookmarked words yet! Click the bookmark icon on any flashcard or dictionary item to save it here.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {bookmarks.map((item, idx) => (
              <div key={idx} className="card-base" style={{ backgroundColor: 'var(--surface-cream)', padding: '1rem', borderLeft: '4px solid var(--accent-ochre)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent-deep-maroon)' }}>
                      {item.kokborok}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-ink)' }}>
                      {item.english}
                    </div>
                    {item.bengali && (
                      <div style={{ fontSize: '0.8rem', color: '#665544' }}>
                        {item.bengali}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <button 
                      onClick={() => onSpeak(item.kokborok)}
                      className="btn-secondary" 
                      style={{ padding: '0.25rem 0.5rem' }}
                    >
                      <Volume2 size={14} />
                    </button>
                    <button 
                      onClick={() => onRemoveBookmark(item.kokborok)}
                      className="btn-secondary" 
                      style={{ padding: '0.25rem 0.5rem', color: 'var(--accent-maroon)' }}
                      title="Remove Bookmark"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DATA MANAGEMENT & BACKUP */}
      <div className="card-base" style={{ backgroundColor: 'var(--surface-card)' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-deep-maroon)', marginBottom: '0.75rem' }}>
          Data Backup & Management
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#665544', marginBottom: '1.25rem' }}>
          All progress data is stored locally in your browser for fast offline access. You can export your data JSON to sync across devices or reset progress.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={onExportData} className="btn-secondary">
            <Download size={16} /> {t.exportData}
          </button>

          <button onClick={onResetProgress} className="btn-secondary" style={{ color: 'var(--accent-maroon)', borderColor: 'var(--accent-maroon)' }}>
            <RotateCcw size={16} /> {t.resetProgress}
          </button>
        </div>
      </div>

    </div>
  );
}
