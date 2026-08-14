import React, { useState } from 'react';
import { Grid, BookOpen, Volume2, ShieldCheck, HelpCircle } from 'lucide-react';
import { lessonsData } from '../data/lessonsData';

export default function GrammarExplorer({ onSpeak }) {
  const [activeTab, setActiveTab] = useState('sov');

  const tabs = [
    { id: 'sov', label: '1. Sentence Structure (SOV)' },
    { id: 'negatives', label: '2. Negative Forms (ya, yakhu, glak...)' },
    { id: 'honorifics', label: '3. Honorific Courtesy (Ja, Nohrok)' },
    { id: 'kinship', label: '4. Kinship 3-Person Rules' },
    { id: 'adjectives', label: '5. Adjective Position & Degrees' }
  ];

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      
      {/* Banner */}
      <div className="card-base" style={{ marginBottom: '2rem', backgroundColor: 'var(--surface-cream)' }}>
        <span className="eyebrow">Grammar & Syntax Rules</span>
        <h2 style={{ fontSize: '1.8rem', marginTop: '0.2rem', marginBottom: '0.5rem' }}>
          Kokborok Essential Grammar Rules
        </h2>
        <p style={{ color: '#5C4A3C', fontSize: '0.95rem', maxWidth: '780px' }}>
          Explore sentence patterns, polite honorific suffixes, negative markers, kinship variations, and adjective rules.
        </p>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`chip-pill ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. SOV STRUCTURE */}
      {activeTab === 'sov' && (
        <div className="animate-fade-in card-base">
          <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-maroon)', marginBottom: '0.5rem' }}>
            Subject + Object + Verb (SOV) Word Order
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#554433', marginBottom: '1.25rem' }}>
            Unlike English (Subject-Verb-Object), Kokborok places the verb at the very end of the sentence.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div className="card-base" style={{ backgroundColor: 'var(--surface-cream)' }}>
              <span className="eyebrow" style={{ fontSize: '0.7rem' }}>Pattern: Subject + Verb</span>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-deep-maroon)', marginTop: '0.25rem' }}>
                Ang chaho
              </div>
              <div style={{ fontSize: '0.9rem', color: '#554433' }}>
                I (Subject) + eat (Verb) = "I eat"
              </div>
            </div>

            <div className="card-base" style={{ backgroundColor: '#EBF4ED', border: '1px solid #B8DCBE' }}>
              <span className="eyebrow" style={{ fontSize: '0.7rem', color: 'var(--accent-forest-green)' }}>Pattern: Subject + Object + Verb</span>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-forest-green)', marginTop: '0.25rem' }}>
                Ang mai chahuo
              </div>
              <div style={{ fontSize: '0.9rem', color: '#554433' }}>
                Ang (I) + mai (rice) + chahuo (eat) = "I eat rice"
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. NEGATIVE FORMS */}
      {activeTab === 'negatives' && (
        <div className="animate-fade-in card-base">
          <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-maroon)', marginBottom: '0.5rem' }}>
            Negative Sense Forms (Lesson X)
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#554433', marginBottom: '1.25rem' }}>
            Kokborok has distinct negative markers for simple negation, incomplete past, future refusal, imperative prohibition, and absence.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {[
              { marker: "ya", use: "General present negation (do not)", example: "Ang mai chahya", meaning: "I do not eat rice" },
              { marker: "yakhu", use: "Past incomplete (did not yet)", example: "Bo phaiyakhu", meaning: "He did not come" },
              { marker: "glak", use: "Future refusal / uncertainty", example: "Bo thahnglak", meaning: "Perhaps he will not go" },
              { marker: "ta", use: "Imperative prohibition (Don't)", example: "Nwng tini tathahngdi", meaning: "Do not go today" },
              { marker: "kwrwi", use: "Absence / Non-existence (have no)", example: "Ani chahna kwrwi", meaning: "I have no food" }
            ].map((n, i) => (
              <div key={i} className="card-base" style={{ borderLeft: '4px solid var(--accent-maroon)' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-deep-maroon)' }}>
                  -{n.marker}
                </span>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-ochre)', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {n.use}
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-ink)' }}>
                  {n.example}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#665544' }}>
                  "{n.meaning}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. HONORIFICS */}
      {activeTab === 'honorifics' && (
        <div className="animate-fade-in card-base">
          <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-maroon)', marginBottom: '0.5rem' }}>
            Honorific Terms for Courtesy (Lesson XIV)
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#554433', marginBottom: '1.25rem' }}>
            Attach <strong>'-ja / -jadi'</strong> or use <strong>'Nohrok'</strong> when speaking politely to elders, guests, or in-laws.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {[
              { kokborok: "Achukjadi", english: "Please sit down", note: "Standard polite request (-jadi)" },
              { kokborok: "Nohrok achukjadi", english: "Please take seat (Elder/In-law)", note: "Nohrok used for single revered person" },
              { kokborok: "Kok tasajadi", english: "Please, do not speak", note: "Polite prohibition" },
              { kokborok: "Phaijadi", english: "Please come", note: "Polite invitation" }
            ].map((h, i) => (
              <div key={i} className="card-base" style={{ borderTop: '4px solid var(--accent-forest-green)' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-forest-green)' }}>
                  {h.kokborok}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-ink)' }}>
                  {h.english}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#665544', marginTop: '0.2rem' }}>
                  {h.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. KINSHIP RULES */}
      {activeTab === 'kinship' && (
        <div className="animate-fade-in card-base">
          <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-maroon)', marginBottom: '0.5rem' }}>
            Kinship Terms in 3 Grammatical Persons (Lesson XVI)
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#554433', marginBottom: '1.25rem' }}>
            In Kokborok, kinship words morph based on who owns the relationship!
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface-cream)', borderBottom: '2px solid var(--border-hairline)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Base Term</th>
                  <th style={{ padding: '0.75rem 1rem' }}>1st Person (My)</th>
                  <th style={{ padding: '0.75rem 1rem' }}>2nd Person (Your)</th>
                  <th style={{ padding: '0.75rem 1rem' }}>3rd Person (His/Her)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { base: "Pha (Father)", my: "Apha (My Father)", your: "Nwpha (Your Father)", his: "Bupha (His/Her Father)" },
                  { base: "Ma (Mother)", my: "Ama (My Mother)", your: "Nwma (Your Mother)", his: "Buma (His/Her Mother)" },
                  { base: "Sajla (Son)", my: "Angsajla (My Son)", your: "Nwsajla (Your Son)", his: "Bwsajla (His/Her Son)" },
                  { base: "Sai (Husband)", my: "Angsai (My Husband)", your: "Nwsai (Your Husband)", his: "Bwsai (His Husband)" },
                  { base: "Hik (Wife)", my: "Anghik (My Wife)", your: "Nihik (Your Wife)", his: "Bihik (His Wife)" }
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--accent-maroon)' }}>{row.base}</td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>{row.my}</td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>{row.your}</td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>{row.his}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. ADJECTIVE POSITION & DEGREES */}
      {activeTab === 'adjectives' && (
        <div className="animate-fade-in card-base">
          <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-maroon)', marginBottom: '0.5rem' }}>
            Adjectives Follow Nouns & Degrees of Comparison
          </h3>
          <div style={{ padding: '1rem', backgroundColor: '#FFF4E5', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid #F5D0A9' }}>
            <p style={{ margin: 0, fontWeight: '600', color: '#7A4A15' }}>
              Rule: Adjectives are placed AFTER the Noun in Kokborok.
              (e.g., "Aphurai kolok" = Aphurai [man] + kolok [tall] → "Tall man").
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {[
              { noun: "Aphurai (Man)", adj: "kolok (tall)", phrase: "Aphurai kolok", meaning: "Tall man" },
              { noun: "Hayung (Earth)", adj: "kiting (round)", phrase: "Hayung kiting", meaning: "Round Earth" },
              { noun: "Lama (Road)", adj: "bara (short)", phrase: "Lama bara", meaning: "Short road" },
              { noun: "Nok (House)", adj: "bwsate (small)", phrase: "Nok bwsate", meaning: "Small house" }
            ].map((item, i) => (
              <div key={i} className="card-base" style={{ borderLeft: '4px solid var(--accent-teal)' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--accent-deep-maroon)' }}>
                  {item.phrase}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#554433' }}>
                  Noun: {item.noun} + Adj: {item.adj}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-forest-green)', fontWeight: '600', marginTop: '0.2rem' }}>
                  Meaning: "{item.meaning}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
