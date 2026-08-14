import React from 'react';
import { BookOpen, Sparkles, Languages, Settings, Award, Flame, Search, Layers, Grid, UserCheck, User } from 'lucide-react';
import { uiTranslations } from '../data/uiTranslations';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  lang, 
  setLang, 
  streak, 
  completedCount, 
  totalLessons,
  bookmarkedCount,
  userSession,
  onOpenAuthModal
}) {
  const t = uiTranslations[lang] || uiTranslations.en;

  return (
    <header style={{ backgroundColor: 'var(--surface-card)', borderBottom: '1px solid var(--border-hairline)' }}>
      {/* Signature Tripuri Risa/Rignai 5-Stripe Band */}
      <div className="risa-stripe" />
      
      <div className="container" style={{ padding: '0.75rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => setCurrentTab('learn')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'var(--accent-maroon)',
              color: '#FFFDF8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem'
            }}>
              ক
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.35rem', margin: 0, lineHeight: 1.1 }}>{t.appTitle}</h1>
                <span className="eyebrow" style={{ backgroundColor: 'var(--surface-cream)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-hairline)' }}>
                  Borok / Tripura
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#66584C', margin: 0 }}>{t.appSubtitle}</p>
            </div>
          </div>

          {/* User Progress Stats & Quick Language / Auth Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            
            {/* Supabase User Account / Auth Sync Button */}
            <button
              onClick={onOpenAuthModal}
              className="btn-secondary"
              style={{ 
                padding: '0.3rem 0.75rem', 
                fontSize: '0.8rem',
                borderColor: userSession ? 'var(--accent-forest-green)' : 'var(--border-hairline)',
                backgroundColor: userSession ? '#EBF4ED' : 'var(--surface-cream)',
                color: userSession ? 'var(--accent-forest-green)' : 'var(--text-ink)'
              }}
              title={userSession ? `Logged in: ${userSession.user.email}` : 'Log in / Sync Account'}
            >
              {userSession ? <UserCheck size={15} /> : <User size={15} />}
              <span>{userSession ? 'Cloud Synced' : 'Account / Sync'}</span>
            </button>

            {/* Streak Badge */}
            <div 
              title="Daily Learning Streak"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#FFF4E5',
                border: '1px solid #F5D0A9',
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.8rem',
                fontWeight: '700',
                color: 'var(--accent-ochre)'
              }}
            >
              <Flame size={15} fill="var(--accent-ochre)" color="var(--accent-ochre)" />
              <span>{streak} {t.streak}</span>
            </div>

            {/* Completion Badge */}
            <div 
              title="Lessons Completed"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#EBF4ED',
                border: '1px solid #B8DCBE',
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.8rem',
                fontWeight: '700',
                color: 'var(--accent-forest-green)'
              }}
            >
              <Award size={15} />
              <span>{completedCount}/{totalLessons} {t.completed}</span>
            </div>

            {/* Language Switcher Button */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="btn-secondary"
              style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }}
              title="Switch UI Language"
            >
              <Languages size={14} />
              <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
            </button>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginTop: '0.75rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid var(--border-hairline)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          paddingBottom: '0.25rem',
          flexWrap: 'nowrap'
        }}>
          {[
            { id: 'learn', label: t.navLearn, icon: BookOpen },
            { id: 'practice', label: t.navPractice, icon: Sparkles },
            { id: 'srs', label: t.navSRS, icon: Layers },
            { id: 'dictionary', label: t.navDictionary, icon: Search },
            { id: 'grammar', label: t.navGrammar, icon: Grid },
            { id: 'counting', label: 'Numbers & Classifiers', icon: Award },
            { id: 'script', label: 'Script Guide', icon: Languages },
            { id: 'culture', label: 'Culture & Heritage', icon: BookOpen }
          ].map((nav) => {
            const Icon = nav.icon;
            const isActive = currentTab === nav.id;
            return (
              <button
                key={nav.id}
                onClick={() => setCurrentTab(nav.id)}
                className={`chip-pill ${isActive ? 'active' : ''}`}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.35rem', 
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  lineHeight: '1.2'
                }}
              >
                <Icon size={14} style={{ flexShrink: 0 }} />
                <span>{nav.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
