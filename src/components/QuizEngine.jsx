import React, { useState } from 'react';
import { CheckCircle, XCircle, Volume2, RotateCcw, ArrowRight, Award, Sparkles } from 'lucide-react';
import { dictionaryData } from '../data/dictionaryData';
import { uiTranslations } from '../data/uiTranslations';

export default function QuizEngine({ lesson, onCompleteQuiz, onSpeak, lang }) {
  const t = uiTranslations[lang] || uiTranslations.en;
  
  const [quizMode, setQuizMode] = useState('mcq'); // 'mcq' | 'fill' | 'matching'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Generate quiz items pool from dictionaryData or specific lesson items
  const questions = lesson && lesson.items ? lesson.items.map(item => ({
    question: `What is the Kokborok word for "${item.english || item.meaning}"?`,
    correctAnswer: item.kokborok || item.root,
    english: item.english || item.meaning,
    bengali: item.bengali
  })) : dictionaryData.slice(0, 10).map(item => ({
    question: `What is the Kokborok word for "${item.english}"?`,
    correctAnswer: item.kokborok,
    english: item.english,
    bengali: item.bengali
  }));

  const currentQ = questions[currentIndex];

  // Generate 4 multiple-choice options for current question
  const getOptions = () => {
    if (!currentQ) return [];
    const distractorPool = dictionaryData
      .map(d => d.kokborok)
      .filter(w => w !== currentQ.correctAnswer);
    
    // Pick 3 random distractors
    const shuffled = [...distractorPool].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [currentQ.correctAnswer, ...shuffled];
    return options.sort(() => 0.5 - Math.random());
  };

  const [currentOptions, setCurrentOptions] = useState(getOptions());

  const handleSelectOption = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleCheckInput = () => {
    if (isAnswered || !userInput.trim()) return;
    setIsAnswered(true);
    const normalizedInput = userInput.trim().toLowerCase();
    const normalizedTarget = currentQ.correctAnswer.trim().toLowerCase();
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
      setCurrentOptions(getOptions());
    } else {
      setIsFinished(true);
      if (onCompleteQuiz) {
        onCompleteQuiz(score + (selectedOption === currentQ?.correctAnswer ? 1 : 0), questions.length);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsAnswered(false);
    setIsFinished(false);
    setSelectedOption(null);
    setUserInput('');
    setCurrentOptions(getOptions());
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="container animate-fade-in" style={{ padding: '3rem 1rem', maxWidth: '600px', textAlign: 'center' }}>
        <div className="card-base" style={{ backgroundColor: 'var(--surface-card)', borderTop: '6px solid var(--accent-forest-green)' }}>
          <Award size={64} color="var(--accent-forest-green)" style={{ margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: '1.8rem', color: 'var(--accent-deep-maroon)', marginBottom: '0.5rem' }}>
            Quiz Completed!
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#554433', marginBottom: '1.5rem' }}>
            You scored **{score}** out of **{questions.length}** ({percentage}%)
          </p>

          <div style={{ padding: '1rem', backgroundColor: 'var(--surface-cream)', borderRadius: '12px', marginBottom: '1.75rem' }}>
            <span style={{ fontWeight: '700', color: percentage >= 70 ? 'var(--accent-forest-green)' : 'var(--accent-maroon)' }}>
              {percentage >= 80 ? '🎉 Excellent Mastery of Kokborok!' : percentage >= 50 ? '👍 Good Progress! Keep Practicing!' : '💪 Keep Learning! Review the lesson cards.'}
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
      
      {/* Header & Mode Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span className="eyebrow">
          Practice Suite • Question {currentIndex + 1} / {questions.length}
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
                ? '✨ Correct! Outstanding!'
                : `❌ Incorrect. Correct answer: "${currentQ.correctAnswer}"`}
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
