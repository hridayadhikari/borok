import React, { useState } from 'react';
import { Search, Volume2, Bookmark, Filter, BookOpen } from 'lucide-react';
import { dictionaryData } from '../data/dictionaryData';
import { uiTranslations } from '../data/uiTranslations';

export default function DictionarySearch({ onSpeak, onBookmark, bookmarks = [], lang }) {
  const t = uiTranslations[lang] || uiTranslations.en;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Pronouns', 'Possessives', 'Questions', 'Verbs', 'Time', 'Nature', 'Body Parts', 'Kinship', 'Colors', 'Tastes', 'Greetings'];

  const filteredWords = dictionaryData.filter(item => {
    const matchesSearch = 
      item.kokborok.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bengali.includes(searchTerm) ||
      (item.scriptBn && item.scriptBn.includes(searchTerm));
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      
      {/* Banner */}
      <div className="card-base" style={{ marginBottom: '2rem', backgroundColor: 'var(--surface-cream)' }}>
        <span className="eyebrow">Tri-lingual Lexicon</span>
        <h2 style={{ fontSize: '1.8rem', marginTop: '0.2rem', marginBottom: '0.5rem' }}>
          Kokborok ⇄ English ⇄ Bengali Dictionary
        </h2>
        <p style={{ color: '#5C4A3C', fontSize: '0.95rem', maxWidth: '780px' }}>
          Search words, phrases, root verbs, and kinship terms in Kokborok Roman script, English translation, or Bengali script.
        </p>

        {/* Category Filter Chips */}
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-ink)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Filter size={14} /> Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`chip-pill ${selectedCategory === cat ? 'active' : ''}`}
              style={{ fontSize: '0.85rem' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="card-base" style={{ marginBottom: '1.5rem', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--surface-card)' }}>
        <Search size={20} color="var(--accent-maroon)" />
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '1.05rem',
            backgroundColor: 'transparent',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-ink)'
          }}
        />
      </div>

      {/* Word Count Indicator */}
      <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: '#665544', fontWeight: '600' }}>
        Showing {filteredWords.length} words in dictionary
      </div>

      {/* Dictionary Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {filteredWords.map((word) => {
          const isBookmarked = bookmarks.some(b => b.kokborok === word.kokborok);

          return (
            <div 
              key={word.id}
              className="card-base"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderLeft: '5px solid var(--accent-maroon)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span className="eyebrow" style={{ fontSize: '0.7rem' }}>{word.category}</span>
                  {word.scriptBn && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-ochre)', fontWeight: '600' }}>
                      বাংলা: {word.scriptBn}
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent-deep-maroon)', marginBottom: '0.2rem' }}>
                  {word.kokborok}
                </div>

                <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-ink)' }}>
                  {word.english}
                </div>

                <div style={{ fontSize: '0.85rem', color: '#665544', marginTop: '0.1rem' }}>
                  {word.bengali}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button 
                  onClick={() => onSpeak(word.kokborok)}
                  className="btn-secondary" 
                  style={{ padding: '0.3rem 0.65rem', fontSize: '0.8rem' }}
                >
                  <Volume2 size={14} /> Listen
                </button>

                <button 
                  onClick={() => onBookmark(word)}
                  className="btn-secondary"
                  style={{ padding: '0.3rem 0.65rem', fontSize: '0.8rem', color: isBookmarked ? 'var(--accent-ochre)' : '#776655' }}
                >
                  <Bookmark size={14} fill={isBookmarked ? 'var(--accent-ochre)' : 'none'} />
                  <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
