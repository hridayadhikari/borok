import React, { useState } from 'react';
import { Layers, Volume2, RotateCcw, CheckCircle, Flame, Sparkles } from 'lucide-react';
import { dictionaryData } from '../data/dictionaryData';
import { uiTranslations } from '../data/uiTranslations';

export default function SpacedRepetitionView({ srsData, onRecordScore, onSpeak, lang }) {
  const t = uiTranslations[lang] || uiTranslations.en;
  
  // Filter words that have low mastery or were answered incorrectly
  const reviewQueue = dictionaryData.filter(item => {
    const record = srsData[item.kokborok];
    return !record || record.correct < 2 || record.incorrect > 0;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = reviewQueue[currentIndex] || reviewQueue[0];

  const handleAssessment = (isCorrect) => {
    if (!currentCard) return;
    onRecordScore(currentCard.kokborok, isCorrect);
    setIsFlipped(false);
    if (currentIndex + 1 < reviewQueue.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  if (!reviewQueue || reviewQueue.length === 0 || !currentCard) {
    return (
      <div className="container animate-fade-in" style={{ padding: '3rem 1rem', maxWidth: '600px', textAlign: 'center' }}>
        <div className="card-base" style={{ borderTop: '6px solid var(--accent-forest-green)' }}>
          <CheckCircle size={56} color="var(--accent-forest-green)" style={{ margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: '1.6rem', color: 'var(--accent-deep-maroon)', marginBottom: '0.5rem' }}>
            {t.spacedRepetitionTitle}
          </h2>
          <p style={{ color: '#554433', fontSize: '1rem', marginBottom: '1.5rem' }}>
            {t.noCardsToReview}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem', maxWidth: '680px' }}>
      
      {/* Banner */}
      <div className="card-base" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--surface-cream)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={20} color="var(--accent-maroon)" />
          <span className="eyebrow">{t.spacedRepetitionTitle}</span>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#554433', marginTop: '0.3rem', margin: 0 }}>
          {t.spacedRepetitionDesc} (Queue: **{reviewQueue.length} words**)
        </p>
      </div>

      {/* Card Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#665544', marginBottom: '0.5rem', fontWeight: '600' }}>
        <span>Item {currentIndex + 1} of {reviewQueue.length}</span>
        <span>Word Category: {currentCard.category}</span>
      </div>

      {/* 3D Flip Card */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)} 
        className={`flip-card-container ${isFlipped ? 'flipped' : ''}`}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <span className="eyebrow" style={{ color: 'var(--accent-ochre)', marginBottom: '1rem' }}>ENGLISH PROMPT</span>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--text-ink)' }}>
              {currentCard.english}
            </div>
            <div style={{ fontSize: '1.2rem', color: '#665544', marginTop: '0.4rem' }}>
              {currentCard.bengali}
            </div>
            <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#998877' }}>
              Click card to reveal Kokborok translation
            </div>
          </div>

          <div className="flip-card-back">
            <span className="eyebrow" style={{ color: 'var(--accent-forest-green)', marginBottom: '0.75rem' }}>KOKBOROK WORD</span>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent-deep-maroon)' }}>
              {currentCard.kokborok}
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onSpeak(currentCard.kokborok); }}
              className="btn-primary" 
              style={{ marginTop: '1rem', backgroundColor: 'var(--accent-forest-green)' }}
            >
              <Volume2 size={16} /> Listen Pronunciation
            </button>
          </div>
        </div>
      </div>

      {/* Assessment Controls */}
      <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <button 
          onClick={() => handleAssessment(false)}
          className="btn-secondary" 
          style={{ justifyContent: 'center', padding: '1rem', color: 'var(--accent-maroon)', backgroundColor: '#F8E8E8', borderColor: 'var(--accent-maroon)' }}
        >
          ❌ Hard / Still Learning
        </button>

        <button 
          onClick={() => handleAssessment(true)}
          className="btn-primary" 
          style={{ justifyContent: 'center', padding: '1rem', backgroundColor: 'var(--accent-forest-green)' }}
        >
          ✅ Easy / Remembered
        </button>
      </div>

    </div>
  );
}
