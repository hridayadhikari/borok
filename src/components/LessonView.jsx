import React from 'react';
import { ArrowLeft, Volume2, CheckCircle, Sparkles, BookOpen, Bookmark } from 'lucide-react';
import { uiTranslations } from '../data/uiTranslations';

export default function LessonView({ 
  lesson, 
  onBack, 
  isCompleted, 
  onToggleComplete, 
  onSpeak, 
  onStartQuiz,
  onBookmark,
  bookmarks = [],
  lang
}) {
  const t = uiTranslations[lang] || uiTranslations.en;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      
      {/* Top Action Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button onClick={onBack} className="btn-secondary">
          <ArrowLeft size={16} /> Back to Curriculum
        </button>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => onStartQuiz(lesson)}
            className="btn-primary"
            style={{ backgroundColor: 'var(--accent-forest-green)' }}
          >
            <Sparkles size={16} /> Practice Lesson Quiz
          </button>

          <button 
            onClick={() => onToggleComplete(lesson.id)}
            className="btn-secondary"
            style={{
              borderColor: isCompleted ? 'var(--accent-forest-green)' : 'var(--border-hairline)',
              backgroundColor: isCompleted ? '#EBF4ED' : 'var(--surface-cream)',
              color: isCompleted ? 'var(--accent-forest-green)' : 'var(--text-ink)'
            }}
          >
            <CheckCircle size={16} />
            {isCompleted ? t.completed : t.completeLesson}
          </button>
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="card-base" style={{ marginBottom: '2rem', backgroundColor: 'var(--surface-card)', borderLeft: '6px solid var(--accent-maroon)' }}>
        <span className="eyebrow">LESSON {lesson.number} • {lesson.category}</span>
        <h2 style={{ fontSize: '1.8rem', marginTop: '0.2rem', marginBottom: '0.5rem', color: 'var(--accent-deep-maroon)' }}>
          {lesson.title}
        </h2>
        <p style={{ color: '#554433', fontSize: '1rem', lineHeight: 1.5 }}>
          {lesson.description}
        </p>

        {/* Grammar Rule Highlight Box */}
        {lesson.grammarRule && (
          <div style={{
            marginTop: '1.25rem',
            padding: '1rem 1.25rem',
            backgroundColor: '#FFF8EC',
            borderRadius: '12px',
            border: '1px solid #EED8B0',
            borderLeft: '4px solid var(--accent-ochre)'
          }}>
            <div className="eyebrow" style={{ fontSize: '0.7rem', color: 'var(--accent-ochre)', marginBottom: '0.2rem' }}>
              💡 Key Grammar Rule
            </div>
            <p style={{ margin: 0, fontWeight: '600', color: '#6A4518', fontSize: '0.95rem' }}>
              {lesson.grammarRule}
            </p>
          </div>
        )}
      </div>

      {/* ITEMS TABLE / VOCABULARY */}
      {lesson.items && lesson.items.length > 0 && (
        <div className="card-base" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-deep-maroon)' }}>
            Vocabulary & Words
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-hairline)', backgroundColor: 'var(--surface-cream)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Kokborok</th>
                  <th style={{ padding: '0.75rem 1rem' }}>English</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Bengali</th>
                  {lesson.items[0].type && <th style={{ padding: '0.75rem 1rem' }}>Type</th>}
                  {lesson.items[0].my && <th style={{ padding: '0.75rem 1rem' }}>1st Person (My)</th>}
                  {lesson.items[0].your && <th style={{ padding: '0.75rem 1rem' }}>2nd Person (Your)</th>}
                  {lesson.items[0].hisHer && <th style={{ padding: '0.75rem 1rem' }}>3rd Person (His/Her)</th>}
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Listen & Save</th>
                </tr>
              </thead>
              <tbody>
                {lesson.items.map((item, idx) => {
                  const isBookmarked = bookmarks.some(b => b.kokborok === item.kokborok);
                  return (
                    <tr 
                      key={idx} 
                      style={{ 
                        borderBottom: '1px solid var(--border-hairline)',
                        backgroundColor: idx % 2 === 0 ? 'var(--surface-card)' : '#FAF5EC'
                      }}
                    >
                      <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: 'var(--accent-maroon)', fontSize: '1.05rem' }}>
                        {item.kokborok || item.root}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-ink)' }}>
                        {item.english || item.meaning}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: '#554433' }}>
                        {item.bengali || '-'}
                      </td>
                      {item.type && (
                        <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: 'var(--accent-ochre)', fontWeight: '600' }}>
                          {item.type}
                        </td>
                      )}
                      {item.my && <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>{item.my}</td>}
                      {item.your && <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>{item.your}</td>}
                      {item.hisHer && <td style={{ padding: '0.85rem 1rem', fontWeight: '600' }}>{item.hisHer}</td>}
                      <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
                          <button 
                            onClick={() => onSpeak(item.kokborok || item.root)}
                            className="btn-secondary" 
                            style={{ padding: '0.3rem 0.6rem' }}
                            title="Listen"
                          >
                            <Volume2 size={15} />
                          </button>
                          <button 
                            onClick={() => onBookmark({ kokborok: item.kokborok || item.root, english: item.english || item.meaning, bengali: item.bengali })}
                            className="btn-secondary" 
                            style={{ padding: '0.3rem 0.6rem', color: isBookmarked ? 'var(--accent-ochre)' : '#887766' }}
                            title="Bookmark"
                          >
                            <Bookmark size={15} fill={isBookmarked ? 'var(--accent-ochre)' : 'none'} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SAMPLE SENTENCES / EXERCISES */}
      {lesson.sampleSentences && (
        <div className="card-base" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-deep-maroon)' }}>
            Sample Sentences & Usage
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {lesson.sampleSentences.map((s, idx) => (
              <div 
                key={idx} 
                className="card-base" 
                style={{ 
                  backgroundColor: 'var(--surface-cream)', 
                  borderLeft: '4px solid var(--accent-forest-green)' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--accent-deep-maroon)', marginBottom: '0.2rem' }}>
                      {s.kokborok}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--text-ink)', fontWeight: '500' }}>
                      {s.english}
                    </div>
                    {s.bengali && (
                      <div style={{ fontSize: '0.85rem', color: '#665544', marginTop: '0.1rem' }}>
                        {s.bengali}
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => onSpeak(s.kokborok)}
                    className="btn-secondary"
                    style={{ padding: '0.3rem 0.6rem' }}
                  >
                    <Volume2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONVERSATION SCRIPT */}
      {lesson.conversations && (
        <div className="card-base" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-deep-maroon)' }}>
            Dialogue Script
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {lesson.conversations.map((c, idx) => (
              <div 
                key={idx} 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  backgroundColor: idx % 2 === 0 ? 'var(--surface-card)' : '#FAF2E4',
                  border: '1px solid var(--border-hairline)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-maroon)' }}>
                    {c.kokborok}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-ink)' }}>
                    {c.english} • <span style={{ color: '#665544' }}>{c.bengali}</span>
                  </div>
                </div>
                <button 
                  onClick={() => onSpeak(c.kokborok)}
                  className="btn-secondary" 
                  style={{ padding: '0.3rem 0.6rem' }}
                >
                  <Volume2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NUMBERS LIST */}
      {lesson.numbersList && (
        <div className="card-base" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-deep-maroon)' }}>
            Numbers Reference Table
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
            {lesson.numbersList.map((n, idx) => (
              <div key={idx} className="card-base" style={{ padding: '0.85rem', textAlign: 'center', backgroundColor: 'var(--surface-cream)' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-ochre)' }}>{n.num}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent-deep-maroon)' }}>{n.kokborok}</div>
                <div style={{ fontSize: '0.8rem', color: '#665544' }}>{n.english}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
