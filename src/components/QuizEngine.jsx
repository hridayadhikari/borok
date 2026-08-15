import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Volume2, RotateCcw, ArrowRight, Award } from 'lucide-react';
import { dictionaryData } from '../data/dictionaryData';
import { lessonsData } from '../data/lessonsData';
import { uiTranslations } from '../data/uiTranslations';

export default function QuizEngine({ lesson, onSelectLesson, onCompleteQuiz, onSpeak, lang }) {
  const t = uiTranslations[lang] || uiTranslations.en;
  
  const [quizMode, setQuizMode] = useState('mcq'); // 'mcq' | 'fill'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Helper function to shuffle an array (Fisher-Yates shuffle)
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Generate quiz items pool from specific lesson items/sampleSentences or dictionaryData fallback
  const getQuestionsForLesson = (l) => {
    let pool = [];
    if (l) {
      if (l.items && l.items.length > 0) {
        pool = l.items.map(item => {
          const target = item.kokborok || item.root || item.present;
          const questionText = item.meaning 
            ? `What is the Kokborok word/root for "${item.meaning}"?`
            : `What is the Kokborok word for "${item.english}"?`;
          return {
            question: questionText,
            correctAnswer: target,
            english: item.english || item.meaning,
            bengali: item.bengali
          };
        });
      } else if (l.sampleSentences && l.sampleSentences.length > 0) {
        pool = l.sampleSentences.map(item => ({
          question: `How do you say "${item.english}" in Kokborok?`,
          correctAnswer: item.kokborok,
          english: item.english,
          bengali: item.bengali
        }));
      }
    } else {
      pool = dictionaryData.slice(0, 15).map(item => ({
        question: `What is the Kokborok word for "${item.english}"?`,
        correctAnswer: item.kokborok,
        english: item.english,
        bengali: item.bengali
      }));
    }

    return shuffleArray(pool);
  };

  const [questions, setQuestions] = useState(() => getQuestionsForLesson(lesson));

  // Reset and reload questions whenever lesson prop changes
  useEffect(() => {
    setQuestions(getQuestionsForLesson(lesson));
    setCurrentIndex(0);
    setScore(0);
    setIsAnswered(false);
    setIsFinished(false);
    setSelectedOption(null);
    setUserInput('');
  }, [lesson]);

  const currentQ = questions[currentIndex] || questions[0] || { question: '', correctAnswer: '' };
  const [currentOptions, setCurrentOptions] = useState([]);

  // Dynamically compute options whenever question index or current questions change
  useEffect(() => {
    if (!currentQ || !currentQ.correctAnswer) return;
    const targetAnswer = currentQ.correctAnswer;
    
    // Distractors pool: prioritize answers from current questions pool first, fallback to dictionaryData
    const currentLessonAnswers = questions
      .map(q => q.correctAnswer)
      .filter(w => w && w !== targetAnswer);
    
    const dictionaryAnswers = dictionaryData
      .map(d => d.kokborok)
      .filter(w => w && w !== targetAnswer && !currentLessonAnswers.includes(w));
    
    const combinedPool = Array.from(new Set([...currentLessonAnswers, ...dictionaryAnswers]));
    
    // Pick 3 random distractors
    const shuffled = [...combinedPool].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [targetAnswer, ...shuffled].sort(() => 0.5 - Math.random());
    setCurrentOptions(options);
  }, [currentIndex, questions]);

  const handleSelectOption = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (currentQ && option === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleCheckInput = () => {
    if (isAnswered || !userInput.trim()) return;
    setIsAnswered(true);
    const normalizedInput = userInput.trim().toLowerCase();
    const normalizedTarget = (currentQ?.correctAnswer || '').trim().toLowerCase();
    if (normalizedInput === normalizedTarget) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
      setUserInput('');
    } else {
      setIsFinished(true);
      if (onCompleteQuiz) {
        onCompleteQuiz(score, questions.length);
      }
    }
  };

  const handleRestart = () => {
    const newQuestions = getQuestionsForLesson(lesson);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setIsAnswered(false);
    setIsFinished(false);
    setSelectedOption(null);
    setUserInput('');
  };

  const renderChapterSelector = () => (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-maroon)', marginBottom: '0.4rem' }}>
        Select Chapter Quiz
      </div>
      <select
        value={lesson ? lesson.id : 'all'}
        onChange={(e) => {
          const selectedId = e.target.value;
          if (selectedId === 'all') {
            if (onSelectLesson) onSelectLesson(null);
          } else {
            const foundLesson = lessonsData.find(l => l.id === parseInt(selectedId, 10));
            if (onSelectLesson) onSelectLesson(foundLesson);
          }
        }}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          borderRadius: '10px',
          border: '2px solid var(--border-hairline)',
          backgroundColor: 'var(--surface-card)',
          color: 'var(--accent-deep-maroon)',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          fontFamily: 'inherit'
        }}
      >
        <option value="all">🌟 Comprehensive Mixed Quiz (All Chapters & Dictionary)</option>
        {lessonsData.map((l) => (
          <option key={l.id} value={l.id}>
            Chapter {l.number}: {l.title} ({l.items ? `${l.items.length} items` : `${l.sampleSentences ? l.sampleSentences.length : 0} sentences`})
          </option>
        ))}
      </select>
    </div>
  );

  if (!questions || questions.length === 0) {
    return (
      <div className="container animate-fade-in" style={{ padding: '2rem 1rem', maxWidth: '680px' }}>
        {renderChapterSelector()}
        <div className="card-base" style={{ backgroundColor: 'var(--surface-card)', textAlign: 'center', padding: '2.5rem 1rem' }}>
          <p style={{ fontSize: '1.1rem', color: '#554433', margin: 0 }}>No quiz questions available for this chapter yet.</p>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const totalCount = questions.length || 1;
    const percentage = Math.round((score / totalCount) * 100);
    return (
      <div className="container animate-fade-in" style={{ padding: '2rem 1rem', maxWidth: '680px' }}>
        {renderChapterSelector()}
        <div className="card-base" style={{ backgroundColor: 'var(--surface-card)', borderTop: '6px solid var(--accent-forest-green)', textAlign: 'center' }}>
          <Award size={64} color="var(--accent-forest-green)" style={{ margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: '1.8rem', color: 'var(--accent-deep-maroon)', marginBottom: '0.5rem' }}>
            Quiz Completed!
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#554433', marginBottom: '1.5rem' }}>
            You scored <strong>{score}</strong> out of <strong>{questions.length}</strong> ({percentage}%)
          </p>

          <div style={{ padding: '1rem', backgroundColor: 'var(--surface-cream)', borderRadius: '12px', marginBottom: '1.75rem' }}>
            <span style={{ fontWeight: '700', color: percentage >= 70 ? 'var(--accent-forest-green)' : 'var(--accent-maroon)' }}>
              {percentage >= 80 ? 'Excellent Mastery of Kokborok!' : percentage >= 50 ? 'Good Progress! Keep Practicing!' : 'Keep Learning! Review the lesson cards.'}
            </span>
          </div>

          <button onClick={handleRestart} className="btn-primary">
            <RotateCcw size={16} /> Try Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem', maxWidth: '680px' }}>
      
      {/* Chapter / Lesson Picker */}
      {renderChapterSelector()}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span className="eyebrow">
          {lesson ? `Chapter ${lesson.number} Quiz` : 'Practice Suite'} • Question {currentIndex + 1} / {questions.length}
        </span>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button 
            onClick={() => { setQuizMode('mcq'); handleRestart(); }}
            className={`chip-pill ${quizMode === 'mcq' ? 'active' : ''}`}
          >
            Multiple Choice
          </button>
          <button 
            onClick={() => { setQuizMode('fill'); handleRestart(); }}
            className={`chip-pill ${quizMode === 'fill' ? 'active' : ''}`}
          >
            Fill-in-the-Blank
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div style={{ height: '6px', backgroundColor: 'var(--surface-cream)', borderRadius: '3px', marginBottom: '1.5rem', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${((currentIndex + 1) / questions.length) * 100}%`,
          backgroundColor: 'var(--accent-maroon)',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Question Card */}
      <div className="card-base" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--surface-card)' }}>
        <div style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--accent-deep-maroon)', marginBottom: '0.5rem' }}>
          {currentQ.question}
        </div>
        {currentQ.bengali && (
          <div style={{ fontSize: '1rem', color: '#776655', marginBottom: '1rem' }}>
            (বাংলা: {currentQ.bengali})
          </div>
        )}

        {/* MULTIPLE CHOICE MODE */}
        {quizMode === 'mcq' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem' }}>
            {currentOptions.map((opt, i) => {
              let stateClass = '';
              if (isAnswered) {
                if (opt === currentQ.correctAnswer) stateClass = 'correct';
                else if (opt === selectedOption) stateClass = 'incorrect';
              }
              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`quiz-option ${stateClass}`}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{opt}</span>
                    {isAnswered && opt === currentQ.correctAnswer && <CheckCircle size={18} />}
                    {isAnswered && opt === selectedOption && opt !== currentQ.correctAnswer && <XCircle size={18} />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* FILL IN THE BLANK MODE */}
        {quizMode === 'fill' && (
          <div style={{ marginTop: '1.25rem' }}>
            <input
              type="text"
              placeholder="Type Kokborok word here..."
              value={userInput}
              disabled={isAnswered}
              onChange={(e) => setUserInput(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                border: '2px solid var(--border-hairline)',
                fontSize: '1.1rem',
                fontFamily: 'var(--font-body)',
                marginBottom: '1rem',
                backgroundColor: 'var(--bg-warm-cream)'
              }}
            />
            {!isAnswered && (
              <button 
                onClick={handleCheckInput}
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Submit Answer
              </button>
            )}
          </div>
        )}

        {/* Feedback Message */}
        {isAnswered && (
          <div style={{
            marginTop: '1.25rem',
            padding: '1rem',
            borderRadius: '12px',
            backgroundColor: (selectedOption === currentQ.correctAnswer || userInput.trim().toLowerCase() === currentQ.correctAnswer.toLowerCase()) ? '#E2ECE4' : '#F8E8E8',
            color: (selectedOption === currentQ.correctAnswer || userInput.trim().toLowerCase() === currentQ.correctAnswer.toLowerCase()) ? 'var(--accent-forest-green)' : 'var(--accent-maroon)',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              {(selectedOption === currentQ.correctAnswer || userInput.trim().toLowerCase() === currentQ.correctAnswer.toLowerCase())
                ? 'Correct! Outstanding!'
                : `Incorrect. Correct answer: "${currentQ.correctAnswer}"`}
            </div>
            <button 
              onClick={() => onSpeak(currentQ.correctAnswer)}
              className="btn-secondary" 
              style={{ padding: '0.25rem 0.5rem' }}
            >
              <Volume2 size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Next Question Button */}
      {isAnswered && (
        <button 
          onClick={handleNext}
          className="btn-primary animate-fade-in"
          style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.05rem' }}
        >
          <span>{currentIndex + 1 < questions.length ? t.nextQuestion : 'See Final Results'}</span>
          <ArrowRight size={18} />
        </button>
      )}

    </div>
  );
}
