import React, { useState } from 'react';
import { BookOpen, CheckCircle, Circle, ArrowRight, Filter, Award, Sparkles } from 'lucide-react';
import { lessonsData } from '../data/lessonsData';
import { uiTranslations } from '../data/uiTranslations';

export default function LessonPath({ completedLessons, onSelectLesson, lang }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const t = uiTranslations[lang] || uiTranslations.en;

  const categories = ['All', 'Vocabulary', 'Grammar', 'Phrases', 'Sentences', 'Numbers', 'Conversation'];

  const filteredLessons = selectedCategory === 'All'
    ? lessonsData
    : lessonsData.filter(l => l.category === selectedCategory);

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      
      {/* Hero Welcome Banner */}
      <div className="card-base" style={{ marginBottom: '2rem', backgroundColor: 'var(--surface-cream)', position: 'relative', overflow: 'hidden' }}>
        <div className="risa-stripe" style={{ position: 'absolute', top: 0, left: 0 }} />
        
        <div style={{ paddingTop: '0.75rem' }}>
          <span className="eyebrow">Structured Curriculum</span>
          <h2 style={{ fontSize: '1.8rem', marginTop: '0.2rem', marginBottom: '0.5rem' }}>
            Kokborok Self-Paced Learning Path
          </h2>
          <p style={{ color: '#5A4839', fontSize: '0.95rem', maxWidth: '780px' }}>
            Follow our 28 progressive lessons based directly on official linguistic reference materials. Study vocabulary, master tense rules, and practice dialogues.
          </p>

          {/* Category Filter Chips */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-ink)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Filter size={14} /> Filter:
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
      </div>

      {/* Lesson Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredLessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson)}
              className="card-base"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: `5px solid ${isCompleted ? 'var(--accent-forest-green)' : 'var(--accent-maroon)'}`,
                backgroundColor: 'var(--surface-card)'
              }}
            >
              <div>
                {/* Eyebrow & Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="eyebrow" style={{ fontSize: '0.7rem' }}>
                    Lesson {lesson.number} • {lesson.category}
                  </span>
                  {isCompleted ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--accent-forest-green)', fontSize: '0.8rem', fontWeight: '700' }}>
                      <CheckCircle size={14} /> {t.completed}
                    </span>
                  ) : (
                    <span style={{ color: '#887766', fontSize: '0.8rem' }}>Start</span>
                  )}
                </div>

                {/* Lesson Title */}
                <h3 style={{ fontSize: '1.15rem', color: 'var(--accent-deep-maroon)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                  {lesson.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.85rem', color: '#554433', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {lesson.description}
                </p>
              </div>

              {/* Action Footer */}
              <div style={{
                marginTop: '1.25rem',
                paddingTop: '0.75rem',
                borderTop: '1px dashed var(--border-hairline)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--accent-ochre)' }}>
                  {lesson.items ? `${lesson.items.length} items` : lesson.sampleSentences ? `${lesson.sampleSentences.length} sentences` : 'Grammar Module'}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-maroon)', fontWeight: '700', fontSize: '0.85rem' }}>
                  <span>Study</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
