import React, { useState } from 'react';
import { Volume2, Bookmark, RotateCw, Check, X, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { dictionaryData } from '../data/dictionaryData';
import { uiTranslations } from '../data/uiTranslations';

export default function FlashcardDeck({ onSpeak, onBookmark, bookmarks = [], onRecordScore, lang }) {
  const t = uiTranslations[lang] || uiTranslations.en;
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const categories = ['All', 'Pronouns', 'Verbs', 'Time', 'Nature', 'Body Parts', 'Kinship', 'Colors', 'Greetings'];

  const deck = selectedCategory === 'All'
    ? dictionaryData
    : dictionaryData.filter(item => item.category === selectedCategory);

  const currentCard = deck[currentIndex] || deck[0];
  const isBookmarked = currentCard ? bookmarks.some(b => b.kokborok === currentCard.kokborok) : false;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const handleAssess = (isCorrect) => {
    onRecordScore(currentCard.kokborok, isCorrect);
    handleNext();
  };

  if (!currentCard) return null;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem', maxWidth: '700px' }}>
      
      {/* Category Selection Chips */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`chip-pill ${selectedCategory === cat ? 'active' : ''}`}
            style={{ fontSize: '0.85rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Progress Counter & Card Indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.9rem', color: '#665544', fontWeight: '600' }}>
        <span>Category: {currentCard.category}</span>
        <span>Card {currentIndex + 1} of {deck.length}</span>
      </div>

      {/* 5-Stripe Progress Bar */}
      <div style={{ height: '6px', backgroundColor: 'var(--surface-cream)', borderRadius: '3px', marginBottom: '1.5rem', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${((currentIndex + 1) / deck.length) * 100}%`,
          backgroundColor: 'var(--accent-maroon)',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* 3D Flip Card */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)} 
        className={`flip-card-container ${isFlipped ? 'flipped' : ''}`}
      >
        <div className="flip-card-inner">
          
          {/* FRONT: English & Bengali Prompt */}
          <div className="flip-card-front">
            <span className="eyebrow" style={{ marginBottom: '1rem', color: 'var(--accent-ochre)' }}>
              ENGLISH / BENGALI
            </span>
            <div style={{ fontSize: '2.2rem', fontWeight: '700', fontFamily: 'var(--font-heading)', color: 'var(--text-ink)', marginBottom: '0.5rem' }}>
              {currentCard.english}
            </div>
            <div style={{ fontSize: '1.25rem', color: '#776655', fontWeight: '500' }}>
              {currentCard.bengali}
            </div>
            <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#998877', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <RotateCw size={14} /> {t.flipCardHint}
            </div>
          </div>

          {/* BACK: Kokborok Answer + Audio */}
          <div className="flip-card-back">
            <span className="eyebrow" style={{ marginBottom: '0.75rem', color: 'var(--accent-forest-green)' }}>
              KOKBOROK
            </span>
            <div style={{ fontSize: '2.6rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent-deep-maroon)', marginBottom: '0.2rem' }}>
              {currentCard.kokborok}
            </div>
            {currentCard.scriptBn && (
              <div style={{ fontSize: '1.1rem', color: 'var(--accent-ochre)', fontWeight: '600', marginBottom: '1.25rem' }}>
                (বাংলা হরফ: {currentCard.scriptBn})
              </div>
            )}

            {/* Audio Button */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onSpeak(currentCard.kokborok, currentCard.audioUrl);
                }}
                className="btn-primary"
                style={{ backgroundColor: 'var(--accent-forest-green)' }}
              >
                <Volume2 size={16} /> {t.listenAudio}
              </button>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmark(currentCard);
                }}
                className="btn-secondary"
                style={{ color: isBookmarked ? 'var(--accent-ochre)' : 'var(--text-ink)' }}
              >
                <Bookmark size={16} fill={isBookmarked ? 'var(--accent-ochre)' : 'none'} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Assessment Controls */}
      <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <button onClick={handlePrev} className="btn-secondary" style={{ padding: '0.75rem' }}>
          <ArrowLeft size={18} />
        </button>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={() => handleAssess(false)}
            className="btn-secondary" 
            style={{ color: 'var(--accent-maroon)', borderColor: 'var(--accent-maroon)', backgroundColor: '#F8E8E8' }}
          >
            <X size={16} /> Need Review
          </button>

          <button 
            onClick={() => handleAssess(true)}
            className="btn-primary" 
            style={{ backgroundColor: 'var(--accent-forest-green)' }}
          >
            <Check size={16} /> Mastered
          </button>
        </div>

        <button onClick={handleNext} className="btn-secondary" style={{ padding: '0.75rem' }}>
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}
