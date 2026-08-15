import React from 'react';
import { Heart, Shield } from 'lucide-react';

export default function Footer({ setTab }) {
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

        {/* Copyright & Bottom Info Bar */}
        <div className="footer-bottom-bar">
          <div>© {new Date().getFullYear()} Kokborok Language Initiative</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap' }}>
            <span>Crafted with</span>
            <Heart size={14} fill="var(--accent-maroon)" color="var(--accent-maroon)" style={{ flexShrink: 0 }} />
            <span>for global learners</span>
          </div>
        </div>

        {/* Maker's Mark / Persistent Creator Credit Section (Stacked Centered Layout) */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px dashed var(--border-hairline)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem' }}>
            
            {/* Top: Profile Photo */}
            <img 
              src="https://res.cloudinary.com/naqb7hm2/image/upload/v1786730836/images_yscsro.jpg" 
              alt="Hriday Adhikari" 
              style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                border: '1.5px solid var(--border-hairline)',
                objectFit: 'cover'
              }} 
            />

            {/* Middle: Text Name */}
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#5A4E3F', fontWeight: '600' }}>
              Built by Hriday Adhikari
            </span>

            {/* Bottom: 3 Icon Links (1. Instagram, 2. GitHub, 3. Personal Website) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.2rem' }}>
              {/* 1. Instagram */}
              <a 
                href="https://www.instagram.com/hridayadhikari" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="creator-link-icon"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* 2. GitHub */}
              <a 
                href="https://github.com/hridayadhikari" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="creator-link-icon"
                aria-label="GitHub"
                title="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
              </a>

              {/* 3. Personal Website */}
              <a 
                href="https://hridayadhikari.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="creator-link-icon"
                aria-label="Personal Website"
                title="Personal Website"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
