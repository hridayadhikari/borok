import React from 'react';
import { BookOpen, Shield, Globe, Award, Sparkles } from 'lucide-react';
import { cultureData } from '../data/cultureData';

export default function CultureNotes() {
  const { overview, tree, clans } = cultureData;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      
      {/* Header Banner */}
      <div className="card-base" style={{ marginBottom: '2rem', backgroundColor: 'var(--surface-cream)' }}>
        <span className="eyebrow">Language & Heritage</span>
        <h2 style={{ fontSize: '1.8rem', marginTop: '0.2rem', marginBottom: '0.5rem' }}>
          Borok Culture, Dialects & Sino-Tibetan Origins
        </h2>
        <p style={{ color: '#5C4A3C', fontSize: '0.95rem', maxWidth: '820px', lineHeight: 1.6 }}>
          {overview.content}
        </p>
      </div>

      {/* Official Status Timeline Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="card-base" style={{ borderLeft: '5px solid var(--accent-maroon)', backgroundColor: 'var(--surface-card)' }}>
          <span className="eyebrow" style={{ fontSize: '0.7rem' }}>State Official Language</span>
          <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent-deep-maroon)', margin: '0.3rem 0' }}>
            January 19, 1979
          </div>
          <p style={{ fontSize: '0.85rem', color: '#554433', margin: 0 }}>
            Officially notified as one of the state languages of Tripura.
          </p>
        </div>

        <div className="card-base" style={{ borderLeft: '5px solid var(--accent-forest-green)', backgroundColor: 'var(--surface-card)' }}>
          <span className="eyebrow" style={{ fontSize: '0.7rem', color: 'var(--accent-forest-green)' }}>TTAADC Official Language</span>
          <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent-forest-green)', margin: '0.3rem 0' }}>
            April 20, 1999
          </div>
          <p style={{ fontSize: '0.85rem', color: '#554433', margin: 0 }}>
            Declared official language of Tripura Tribal Areas Autonomous District Council.
          </p>
        </div>

        <div className="card-base" style={{ borderLeft: '5px solid var(--accent-ochre)', backgroundColor: 'var(--surface-card)' }}>
          <span className="eyebrow" style={{ fontSize: '0.7rem', color: 'var(--accent-ochre)' }}>Linguistic Classification</span>
          <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-ochre)', margin: '0.3rem 0' }}>
            {overview.linguisticClassification}
          </div>
          <p style={{ fontSize: '0.85rem', color: '#554433', margin: 0 }}>
            Branch of Boro people belonging to Tibeto-Burmese Sino-Tibetan group.
          </p>
        </div>
      </div>

      {/* Sino-Tibetan Family Tree Visualizer */}
      <div className="card-base" style={{ marginBottom: '2rem', backgroundColor: 'var(--surface-card)' }}>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-deep-maroon)', marginBottom: '1rem' }}>
          Sino-Tibetan Linguistic Family Tree
        </h3>

        <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface-cream)', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', backgroundColor: 'var(--accent-maroon)', color: '#FFFDF8', borderRadius: 'var(--radius-pill)', fontWeight: '800', fontSize: '1.1rem' }}>
            {tree.root}
          </div>

          <div style={{ height: '24px', width: '2px', backgroundColor: 'var(--border-hairline)', margin: '0 auto' }} />

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {tree.branches.map((b, i) => (
              <div key={i} style={{ padding: '0.4rem 1rem', backgroundColor: 'var(--surface-card)', border: '1px solid var(--border-hairline)', borderRadius: '8px', fontWeight: '700', fontSize: '0.9rem' }}>
                {b}
              </div>
            ))}
          </div>

          <div style={{ height: '20px', width: '2px', backgroundColor: 'var(--border-hairline)', margin: '0 auto' }} />

          <div style={{ display: 'inline-block', padding: '0.4rem 1.25rem', backgroundColor: 'var(--accent-ochre)', color: '#FFFDF8', borderRadius: 'var(--radius-pill)', fontWeight: '700', fontSize: '0.95rem' }}>
            Boro Language Family
          </div>

          {/* Languages Row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
            {tree.boroLanguages.map((lang, i) => (
              <span 
                key={i} 
                style={{ 
                  padding: '0.35rem 0.85rem', 
                  borderRadius: '6px', 
                  fontSize: '0.85rem', 
                  fontWeight: lang === 'Kokborok' ? '800' : '600',
                  backgroundColor: lang === 'Kokborok' ? 'var(--accent-forest-green)' : 'var(--surface-card)',
                  color: lang === 'Kokborok' ? '#FFFDF8' : 'var(--text-ink)',
                  border: '1px solid var(--border-hairline)'
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 9 Dialect Groups & 85 Sub-Clans */}
      <div className="card-base">
        <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-deep-maroon)', marginBottom: '0.5rem' }}>
          9 Main Dialect Groups & 85 Sub-Clans
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#554433', marginBottom: '1.25rem' }}>
          Kokborok comprises 9 primary dialect communities across Tripura, each with distinct clan identities based on heritage, weaving skillfulness, or traditional speech tones.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {clans.map((clan, i) => (
            <div key={i} className="card-base" style={{ borderLeft: '4px solid var(--accent-teal)', backgroundColor: 'var(--surface-cream)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-deep-maroon)' }}>
                  {clan.name}
                </span>
                {clan.subDialects > 0 && (
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', backgroundColor: 'var(--accent-teal)', color: '#FFFDF8', padding: '2px 8px', borderRadius: 'var(--radius-pill)' }}>
                    {clan.subDialects} Clans
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#554433', marginTop: '0.4rem', margin: 0 }}>
                {clan.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
