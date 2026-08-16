import React, { useState } from 'react';
import { Heart, X, Globe, ExternalLink, User, ShieldAlert, FileText } from 'lucide-react';

export default function Footer({ setTab }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <footer style={{ backgroundColor: 'var(--surface-cream)', marginTop: '4rem', borderTop: '1px solid var(--border-hairline)' }}>
      {/* 5-Stripe Risa Divider Band */}
      <div className="risa-stripe" />
      
      <div className="container" style={{ padding: '2.5rem 1rem 1.5rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          
          {/* Column 1: Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                backgroundColor: 'var(--accent-maroon)',
                color: '#FFFDF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '0.9rem'
              }}>
                ক
              </div>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Kokborok Language Initiative</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#524438', lineHeight: 1.5 }}>
              Dedicated to preserving, teaching, and celebrating the Kokborok language of Tripura. Sourced directly from authoritative linguistic and cultural reference materials.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="eyebrow" style={{ marginBottom: '0.85rem' }}>Learning Modules</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
              <li>
                <button onClick={() => setTab('learn')} style={{ background: 'none', border: 'none', color: 'var(--accent-maroon)', cursor: 'pointer', fontWeight: '500' }}>
                  28 Guided Lessons
                </button>
              </li>
              <li>
                <button onClick={() => setTab('script')} style={{ background: 'none', border: 'none', color: 'var(--accent-maroon)', cursor: 'pointer', fontWeight: '500' }}>
                  Roman & Bengali Script Guide
                </button>
              </li>
              <li>
                <button onClick={() => setTab('grammar')} style={{ background: 'none', border: 'none', color: 'var(--accent-maroon)', cursor: 'pointer', fontWeight: '500' }}>
                  Grammar & Tense Rules
                </button>
              </li>
              <li>
                <button onClick={() => setTab('counting')} style={{ background: 'none', border: 'none', color: 'var(--accent-maroon)', cursor: 'pointer', fontWeight: '500' }}>
                  79 Classifier Counting Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Governance & Cultural Respect */}
          <div>
            <h4 className="eyebrow" style={{ marginBottom: '0.85rem' }}>Official Standard</h4>
            <p style={{ fontSize: '0.85rem', color: '#524438', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              Official language of Tripura (notified Jan 19, 1979) and TTAADC (notified Apr 20, 1999). Sino-Tibetan language family, Boro group.
            </p>
          </div>
        </div>

        {/* Copyright & Bottom Info Bar with Profile Trigger & Terms Link */}
        <div className="footer-bottom-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-hairline)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: '#524438', flexWrap: 'wrap' }}>
            <span>© {new Date().getFullYear()} Kokborok Language Initiative. All rights reserved.</span>
            <button 
              onClick={() => setIsTermsOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-maroon)',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: 0,
                fontWeight: '500'
              }}
            >
              Terms & Conditions
            </button>
          </div>

          {/* Profile Trigger Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            aria-label="View Developer Profile"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: 'var(--surface-card)',
              border: '1.5px solid var(--border-hairline)',
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-pill)',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
              color: 'var(--text-ink)',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}
            className="profile-trigger-btn"
          >
            <div style={{ position: 'relative', width: '26px', height: '26px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--accent-maroon)' }}>
              <img 
                src="https://res.cloudinary.com/naqb7hm2/image/upload/v1786887445/team-1_kptdki.jpg" 
                alt="Hriday Adhikari" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span>Developer Profile</span>
            <User size={15} style={{ color: 'var(--accent-maroon)' }} />
          </button>
        </div>

      </div>

      {/* Developer Profile Modal */}
      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(43, 33, 25, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            style={{
              backgroundColor: 'var(--surface-card)',
              border: '1.5px solid var(--border-hairline)',
              borderRadius: 'var(--radius-card)',
              maxWidth: '460px',
              width: '100%',
              padding: '2rem 1.75rem 1.75rem 1.75rem',
              boxShadow: 'var(--shadow-hover)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              aria-label="Close Modal"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'var(--surface-cream)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-ink)',
                transition: 'var(--transition-smooth)'
              }}
            >
              <X size={18} />
            </button>

            {/* Profile Avatar */}
            <div style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              padding: '3px',
              background: 'linear-gradient(135deg, var(--accent-maroon), var(--accent-ochre))',
              marginBottom: '1rem',
              boxShadow: '0 4px 14px rgba(124, 42, 42, 0.2)'
            }}>
              <img 
                src="https://res.cloudinary.com/naqb7hm2/image/upload/v1786887445/team-1_kptdki.jpg" 
                alt="Hriday Adhikari" 
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>

            {/* Name & Title */}
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.25rem', color: 'var(--accent-deep-maroon)' }}>
              Hriday Adhikari
            </h3>
            <span className="eyebrow" style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>
              Software Engineer & Creator
            </span>

            {/* Social & Website Links */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a 
                href="https://hridayadhikari.in" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--accent-maroon)',
                  color: '#FFFDF8',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <Globe size={15} />
                <span>Website</span>
                <ExternalLink size={12} />
              </a>

              <a 
                href="https://github.com/hridayadhikari" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--surface-cream)',
                  border: '1px solid var(--border-hairline)',
                  color: 'var(--text-ink)',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
                <span>GitHub</span>
              </a>

              <a 
                href="https://www.instagram.com/hridayadhikari" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--surface-cream)',
                  border: '1px solid var(--border-hairline)',
                  color: 'var(--text-ink)',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>

            {/* About Section */}
            <div style={{
              backgroundColor: 'var(--surface-cream)',
              borderRadius: '12px',
              padding: '1rem 1.15rem',
              border: '1px solid var(--border-hairline)',
              textAlign: 'left'
            }}>
              <h4 className="eyebrow" style={{ fontSize: '0.7rem', marginBottom: '0.4rem', color: 'var(--accent-maroon)' }}>About</h4>
              <p style={{ fontSize: '0.88rem', color: '#4A3E31', lineHeight: 1.5, margin: 0 }}>
                Software engineer specializing in backend systems (Laravel, FastAPI, Python) and web applications. Passionate about building purposeful digital tools, applied AI systems, and preserving Tripura’s cultural & linguistic heritage through modern software.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {isTermsOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(43, 33, 25, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setIsTermsOpen(false)}
        >
          <div 
            style={{
              backgroundColor: 'var(--surface-card)',
              border: '1.5px solid var(--border-hairline)',
              borderRadius: 'var(--radius-card)',
              maxWidth: '560px',
              maxHeight: '85vh',
              width: '100%',
              padding: '2rem 1.75rem 1.75rem 1.75rem',
              boxShadow: 'var(--shadow-hover)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsTermsOpen(false)}
              aria-label="Close Terms Modal"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'var(--surface-cream)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-ink)',
                transition: 'var(--transition-smooth)'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <FileText size={22} color="var(--accent-maroon)" />
              <h3 style={{ fontSize: '1.3rem', margin: 0, color: 'var(--accent-deep-maroon)' }}>
                Terms & Conditions
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.88rem', color: '#4A3E31', textAlign: 'left', lineHeight: 1.6 }}>
              
              {/* Educational Purpose */}
              <section>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-maroon)', marginBottom: '0.3rem' }}>
                  1. Educational & Preservation Initiative
                </h4>
                <p>
                  This portal is non-commercial and dedicated to the open-access learning, preservation, and celebration of the Kokborok language of Tripura. Content is curated from standard reference dictionaries and linguistic documentation.
                </p>
              </section>

              {/* TTS Limitations & Contribution Notice */}
              <section style={{ backgroundColor: 'var(--surface-cream)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-hairline)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <ShieldAlert size={18} color="var(--accent-maroon)" />
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-maroon)', margin: 0 }}>
                    2. Text-to-Speech (TTS) & Audio Pronunciation Notice
                  </h4>
                </div>
                <ul style={{ margin: '0.5rem 0 0 1.2rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>
                    <strong>Native Audio Call for Collaboration:</strong> High-definition native Kokborok voice recordings are actively sought to build a complete audio library. If you are a native speaker or linguist interested in helping record vocabulary, please contact us at <a href="mailto:contact@hridayadhikari.in" style={{ color: 'var(--accent-maroon)', fontWeight: '600', textDecoration: 'underline' }}>contact@hridayadhikari.in</a>.
                  </li>
                  <li>
                    <strong>Browser Web Speech Synthesis:</strong> Currently, speech relies on device-level Speech Synthesis (utilizing South Asian speech synthesis engines like Bengali/Hindi/Indian English models).
                  </li>
                  <li>
                    <strong>Phonetic Approximation Disclaimer:</strong> Automated browser voice playback is a phonetic approximation and may not perfectly capture authentic Kokborok tones, glottal stops, or regional dialectic variations.
                  </li>
                </ul>
              </section>

              {/* Accuracy & Modifications */}
              <section>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-maroon)', marginBottom: '0.3rem' }}>
                  3. Content Accuracy & Community Contributions
                </h4>
                <p>
                  While every effort is made to maintain orthographic accuracy across Roman and Bengali scripts, linguistic revisions and regional dialect variations exist. Users and native speakers are encouraged to suggest improvements via official governance channels.
                </p>
              </section>

              {/* Privacy & Data Local Storage */}
              <section>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-maroon)', marginBottom: '0.3rem' }}>
                  4. Privacy & Data Storage
                </h4>
                <p>
                  Lesson progress, streaks, bookmarks, and spaced-repetition data are stored locally in your browser session (`localStorage`) and optionally synced to cloud storage when signed in. No personal tracking or telemetry data is harvested.
                </p>
              </section>

            </div>

            <button 
              onClick={() => setIsTermsOpen(false)}
              className="btn-primary"
              style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}



