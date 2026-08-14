import React, { useState } from 'react';
import { Volume2, Info, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import { cultureData } from '../data/cultureData';

export default function AlphabetGuide({ onSpeak }) {
  const [activeTab, setActiveTab] = useState('vowels');
  const [scriptMode, setScriptMode] = useState('both'); // 'roman' | 'bengali' | 'both'
  const { vowels, conjointLetters, soundChangeRules, toneRules } = cultureData.scriptNotes;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      
      {/* Header Banner */}
      <div className="card-base" style={{ marginBottom: '2rem', backgroundColor: 'var(--surface-cream)' }}>
        <span className="eyebrow">Alphabet & Orthography</span>
        <h2 style={{ fontSize: '1.8rem', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
          Spelling & Pronunciation Method in Roman & Bengali Script
        </h2>
        <p style={{ color: '#5C4A3C', fontSize: '0.95rem', maxWidth: '800px' }}>
          Kokborok is written in both **Roman script** (widely used in modern education) and **Bengali script** (historically and in official publications). This guide details the 6 distinct vowels, conjoint letter combinations, and high-tone accents.
        </p>

        {/* Script Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-ink)' }}>Display Script:</span>
          {['both', 'roman', 'bengali'].map((mode) => (
            <button
              key={mode}
              onClick={() => setScriptMode(mode)}
              className={`chip-pill ${scriptMode === mode ? 'active' : ''}`}
            >
              {mode === 'both' ? 'Both Scripts' : mode === 'roman' ? 'Roman Script Only' : 'Bengali Script Only'}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'vowels', label: '1. Vowels & Consonants' },
          { id: 'conjoint', label: '2. Conjoint Letters (Ch, Kh, Ng...)' },
          { id: 'soundchange', label: '3. Sound Rules (K & P → G & B)' },
          { id: 'hightone', label: '4. High Tone vs Normal Tone (h)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`chip-pill ${activeTab === tab.id ? 'active' : ''}`}
            style={{ fontSize: '0.9rem' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: VOWELS */}
      {activeTab === 'vowels' && (
        <div className="animate-fade-in">
          <div className="card-base" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--accent-maroon)' }}>
              1. Pronunciation of Vowels
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#554433', marginBottom: '1rem' }}>
              Note: The letter **'W'** in Kokborok is a unique high unrounded vowel sound (like 'U' in Wake, or ৱ/উ).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {vowels.map((v, i) => (
                <div 
                  key={i} 
                  className="card-base" 
                  style={{ 
                    borderLeft: '4px solid var(--accent-maroon)',
                    backgroundColor: 'var(--surface-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent-deep-maroon)' }}>
                        {v.letter}
                      </span>
                      <button 
                        onClick={() => onSpeak(v.example)}
                        className="btn-secondary" 
                        style={{ padding: '0.3rem 0.6rem' }}
                        title="Listen Pronunciation"
                      >
                        <Volume2 size={15} />
                      </button>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--accent-ochre)', fontWeight: '600', margin: '0.25rem 0' }}>
                      Sound: {v.sound}
                    </div>
                  </div>

                  <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-hairline)' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent-forest-green)' }}>
                      {v.example}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#665544' }}>
                      Meaning: {v.meaning}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: CONJOINT LETTERS */}
      {activeTab === 'conjoint' && (
        <div className="animate-fade-in">
          <div className="card-base" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--accent-maroon)' }}>
              2. Uses of Conjoint Letters (Ch, Kh, N', Ng, Ph, Th, Ua, Uo)
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#554433', marginBottom: '1rem' }}>
              These special multi-letter combinations represent distinct single phonemes in Kokborok.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {conjointLetters.map((c, i) => (
                <div key={i} className="card-base" style={{ borderTop: '4px solid var(--accent-ochre)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent-maroon)' }}>
                      {c.letter}
                    </span>
                    <button 
                      onClick={() => onSpeak(c.example)}
                      className="btn-secondary" 
                      style={{ padding: '0.25rem 0.5rem' }}
                    >
                      <Volume2 size={14} />
                    </button>
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-ink)' }}>
                    {c.example}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#665544' }}>
                    Meaning: {c.meaning}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: SOUND CHANGE RULES */}
      {activeTab === 'soundchange' && (
        <div className="animate-fade-in">
          <div className="card-base" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--accent-maroon)' }}>
              3. Morphophonemic Rule: Final K & P Become G & B
            </h3>
            <div style={{ padding: '1rem', backgroundColor: '#FFF4E5', borderRadius: '12px', border: '1px solid #F5D0A9', marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.95rem', color: '#7A4A15', fontWeight: '600', margin: 0 }}>
                💡 Key Rule: When a word ending in **'K'** or **'P'** receives a vowel suffix (such as '-o'), the final consonant softens: **K → G** and **P → B**.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {soundChangeRules[0].examples.map((ex, i) => (
                <div key={i} className="card-base" style={{ borderLeft: '4px solid var(--accent-teal)' }}>
                  <div style={{ fontSize: '0.85rem', color: '#776655', textTransform: 'uppercase', fontWeight: '700' }}>
                    Root: {ex.original}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-deep-maroon)', margin: '0.4rem 0' }}>
                    {ex.original} {ex.suffix} → <span style={{ color: 'var(--accent-forest-green)' }}>{ex.result}</span>
                  </div>
                  <button 
                    onClick={() => onSpeak(ex.result)}
                    className="btn-secondary" 
                    style={{ fontSize: '0.8rem', padding: '0.25rem 0.6rem' }}
                  >
                    <Volume2 size={14} /> Listen Pronunciation
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: HIGH TONE VS NORMAL TONE */}
      {activeTab === 'hightone' && (
        <div className="animate-fade-in">
          <div className="card-base">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--accent-maroon)' }}>
              4. Pitch Accent: Normal Tone vs High Tone (h)
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#554433', marginBottom: '1.25rem' }}>
              Kokborok is a tonal language. Inserting an **'h'** inside or at the end of a vowel indicates a **High Tone** (slightly higher pitch with breathy release), completely changing the word's meaning.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {toneRules.map((tr, i) => (
                <div key={i} className="card-base" style={{ borderTop: '4px solid var(--accent-forest-green)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {/* Normal Tone */}
                    <div style={{ padding: '0.5rem', backgroundColor: '#F9F6F0', borderRadius: '8px' }}>
                      <span className="eyebrow" style={{ fontSize: '0.65rem' }}>Normal Tone</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-ink)' }}>{tr.normal}</div>
                      <button 
                        onClick={() => onSpeak(tr.normal.split(' – ')[0])} 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-maroon)', marginTop: '0.2rem' }}
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>

                    {/* High Tone */}
                    <div style={{ padding: '0.5rem', backgroundColor: '#EBF4ED', borderRadius: '8px', border: '1px solid #B8DCBE' }}>
                      <span className="eyebrow" style={{ fontSize: '0.65rem', color: 'var(--accent-forest-green)' }}>High Tone ('h')</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-forest-green)' }}>{tr.high}</div>
                      <button 
                        onClick={() => onSpeak(tr.high.split(' – ')[0])} 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-forest-green)', marginTop: '0.2rem' }}
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
