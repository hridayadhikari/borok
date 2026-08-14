import React, { useState } from 'react';
import { Award, Search, Volume2, Calculator, Info } from 'lucide-react';
import { classifiersData } from '../data/classifiersData';
import { lessonsData } from '../data/lessonsData';

export default function CountingClassifierTool({ onSpeak }) {
  const [activeTab, setActiveTab] = useState('classifiers'); // 'classifiers' | 'numbers'
  const [searchTerm, setSearchTerm] = useState('');
  const [calcNum, setCalcNum] = useState(1);

  const countingLesson = lessonsData.find(l => l.id === 24);

  const filteredClassifiers = classifiersData.filter(c => 
    c.classifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.example.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      
      {/* Banner */}
      <div className="card-base" style={{ marginBottom: '2rem', backgroundColor: 'var(--surface-cream)' }}>
        <span className="eyebrow">Lesson XXIV & XXV Reference</span>
        <h2 style={{ fontSize: '1.8rem', marginTop: '0.2rem', marginBottom: '0.5rem' }}>
          Kokborok Numbers & Classifier System
        </h2>
        <p style={{ color: '#5C4A3C', fontSize: '0.95rem', maxWidth: '800px' }}>
          Counting in Kokborok requires attaching specific classifier suffixes to nouns based on shape, material, or category (e.g., <strong>khoroksa</strong> for human, <strong>barsa</strong> for flowers, <strong>toksa</strong> for long objects).
        </p>

        {/* Tab Toggle Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
          <button 
            onClick={() => setActiveTab('classifiers')}
            className={`chip-pill ${activeTab === 'classifiers' ? 'active' : ''}`}
          >
            79 Counting Classifiers (Classifiers)
          </button>
          <button 
            onClick={() => setActiveTab('numbers')}
            className={`chip-pill ${activeTab === 'numbers' ? 'active' : ''}`}
          >
            Numbers System (1 to 10,000,000)
          </button>
        </div>
      </div>

      {/* CLASSIFIERS SEARCH & LIST */}
      {activeTab === 'classifiers' && (
        <div className="animate-fade-in">
          {/* Search Input */}
          <div className="card-base" style={{ marginBottom: '1.5rem', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Search size={18} color="var(--accent-maroon)" />
            <input
              type="text"
              placeholder="Search classifiers by keyword (e.g. human, flower, bamboo, tree, basket)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '1rem',
                backgroundColor: 'transparent',
                fontFamily: 'var(--font-body)',
                color: 'var(--text-ink)'
              }}
            />
          </div>

          {/* Classifiers Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {filteredClassifiers.map((item) => (
              <div 
                key={item.id} 
                className="card-base"
                style={{ 
                  backgroundColor: 'var(--surface-card)',
                  borderLeft: '4px solid var(--accent-ochre)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span className="eyebrow" style={{ fontSize: '0.7rem' }}>#{item.id} Classifier</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-forest-green)', backgroundColor: '#EBF4ED', padding: '2px 8px', borderRadius: '4px' }}>
                      -{item.classifier}
                    </span>
                  </div>

                  <div style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent-deep-maroon)', marginBottom: '0.2rem' }}>
                    {item.example}
                  </div>

                  <div style={{ fontSize: '0.9rem', color: '#554433' }}>
                    Meaning: {item.meaning}
                  </div>
                </div>

                <div style={{ marginTop: '0.85rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-hairline)', display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={() => onSpeak(item.example)}
                    className="btn-secondary" 
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}
                  >
                    <Volume2 size={14} /> Listen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NUMBERS TABLE */}
      {activeTab === 'numbers' && countingLesson && (
        <div className="animate-fade-in card-base">
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--accent-deep-maroon)' }}>
            Kokborok Counting Reference (Lesson XXIV)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {countingLesson.numbersList.map((num, i) => (
              <div 
                key={i} 
                className="card-base" 
                style={{ backgroundColor: 'var(--surface-cream)', padding: '1rem', textAlign: 'center', borderTop: '4px solid var(--accent-maroon)' }}
              >
                <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-ochre)' }}>
                  {num.num}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-deep-maroon)', margin: '0.2rem 0' }}>
                  {num.kokborok}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#665544' }}>
                  {num.english}
                </div>
                <button 
                  onClick={() => onSpeak(num.kokborok)}
                  className="btn-secondary" 
                  style={{ marginTop: '0.5rem', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                >
                  <Volume2 size={13} /> Listen
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
