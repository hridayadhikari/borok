import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AlphabetGuide from './components/AlphabetGuide';
import LessonPath from './components/LessonPath';
import LessonView from './components/LessonView';
import FlashcardDeck from './components/FlashcardDeck';
import QuizEngine from './components/QuizEngine';
import SpacedRepetitionView from './components/SpacedRepetitionView';
import CountingClassifierTool from './components/CountingClassifierTool';
import DictionarySearch from './components/DictionarySearch';
import GrammarExplorer from './components/GrammarExplorer';
import CultureNotes from './components/CultureNotes';
import ProgressDashboard from './components/ProgressDashboard';
import AdminCMS from './components/AdminCMS';
import AuthModal from './components/AuthModal';

import { lessonsData } from './data/lessonsData';
import { dictionaryData } from './data/dictionaryData';
import { 
  isSupabaseConfigured, 
  getSupabaseClient, 
  syncUserStreakToCloud, 
  syncUserProgressToCloud, 
  syncBookmarksToCloud 
} from './lib/supabase';

export default function App() {
  // Check URL pathname for /admin access
  const checkIsAdminRoute = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return path === '/admin' || path === '/admin/' || hash === '#admin' || search.includes('admin=true');
  };

  // Navigation, Language & Modal State
  const [currentTab, setCurrentTab] = useState(() => {
    return checkIsAdminRoute() ? 'admin' : 'learn';
  });

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeQuizLesson, setActiveQuizLesson] = useState(null);
  const [lang, setLang] = useState('en');
  const [userSession, setUserSession] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync URL popstate / hash change for /admin route
  useEffect(() => {
    const handleLocationChange = () => {
      if (checkIsAdminRoute()) {
        setCurrentTab('admin');
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Check Supabase Auth Session
  useEffect(() => {
    const client = getSupabaseClient();
    if (client) {
      client.auth.getSession().then(({ data: { session } }) => {
        setUserSession(session);
      });

      const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
        setUserSession(session);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  // Persistent User Progress State
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('kokborok_completed_lessons');
    return saved ? JSON.parse(saved) : [1]; // Lesson I unlocked by default
  });

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('kokborok_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [srsData, setSrsData] = useState(() => {
    const saved = localStorage.getItem('kokborok_srs_data');
    return saved ? JSON.parse(saved) : {};
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('kokborok_streak');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [customDictData, setCustomDictData] = useState(() => {
    const saved = localStorage.getItem('kokborok_custom_dict');
    return saved ? JSON.parse(saved) : dictionaryData;
  });

  const [auditTrail, setAuditTrail] = useState(() => {
    const saved = localStorage.getItem('kokborok_audit_trail');
    return saved ? JSON.parse(saved) : [
      { action: 'SYSTEM_INIT', details: 'Kokborok preservation portal initialized with 28 lessons', timestamp: new Date().toLocaleString() }
    ];
  });

  // Sync state changes to LocalStorage & Supabase Cloud
  useEffect(() => {
    localStorage.setItem('kokborok_completed_lessons', JSON.stringify(completedLessons));
    if (userSession?.user?.id) {
      syncUserProgressToCloud(userSession.user.id, completedLessons, srsData);
    }
  }, [completedLessons, srsData, userSession]);

  useEffect(() => {
    localStorage.setItem('kokborok_bookmarks', JSON.stringify(bookmarks));
    if (userSession?.user?.id) {
      syncBookmarksToCloud(userSession.user.id, bookmarks);
    }
  }, [bookmarks, userSession]);

  useEffect(() => {
    localStorage.setItem('kokborok_srs_data', JSON.stringify(srsData));
  }, [srsData]);

  useEffect(() => {
    localStorage.setItem('kokborok_streak', streak.toString());
    if (userSession?.user?.id) {
      syncUserStreakToCloud(userSession.user.id, streak);
    }
  }, [streak, userSession]);

  useEffect(() => {
    localStorage.setItem('kokborok_custom_dict', JSON.stringify(customDictData));
  }, [customDictData]);

  useEffect(() => {
    localStorage.setItem('kokborok_audit_trail', JSON.stringify(auditTrail));
  }, [auditTrail]);

  // Audio Speech Pronunciation Engine (Web Speech API)
  const handleSpeak = (text) => {
    if (!text) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.includes('bn') || v.lang.includes('hi') || v.lang.includes('en-IN'));
      if (preferredVoice) utterance.voice = preferredVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Toggle Lesson Completion
  const handleToggleCompleteLesson = (lessonId) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  // Bookmark Word Toggle
  const handleToggleBookmark = (item) => {
    const exists = bookmarks.some(b => b.kokborok === item.kokborok);
    if (exists) {
      setBookmarks(bookmarks.filter(b => b.kokborok !== item.kokborok));
    } else {
      setBookmarks([...bookmarks, item]);
    }
  };

  // Record SRS Score
  const handleRecordScore = (word, isCorrect) => {
    setSrsData(prev => {
      const current = prev[word] || { correct: 0, incorrect: 0, lastReviewed: Date.now() };
      return {
        ...prev,
        [word]: {
          correct: isCorrect ? current.correct + 1 : current.correct,
          incorrect: !isCorrect ? current.incorrect + 1 : current.incorrect,
          lastReviewed: Date.now()
        }
      };
    });
  };

  // Add Audit Log Entry
  const handleAddAuditLog = (logEntry) => {
    setAuditTrail(prev => [logEntry, ...prev]);
  };

  // Handle Export Progress JSON
  const handleExportProgressData = () => {
    const exportObject = {
      completedLessons,
      bookmarks,
      srsData,
      streak,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObject, null, 2));
    const anchor = document.createElement('a');
    anchor.setAttribute("href", dataStr);
    anchor.setAttribute("download", `kokborok_user_progress_${Date.now()}.json`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  // Handle Reset Progress
  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all lesson progress and bookmarks?")) {
      setCompletedLessons([1]);
      setBookmarks([]);
      setSrsData({});
      localStorage.removeItem('kokborok_completed_lessons');
      localStorage.removeItem('kokborok_bookmarks');
      localStorage.removeItem('kokborok_srs_data');
    }
  };

  const handleSignOut = async () => {
    const client = getSupabaseClient();
    if (client) {
      await client.auth.signOut();
      setUserSession(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Header Bar */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setSelectedLesson(null);
          setCurrentTab(tab);
        }}
        lang={lang}
        setLang={setLang}
        streak={streak}
        completedCount={completedLessons.length}
        totalLessons={lessonsData.length}
        bookmarkedCount={bookmarks.length}
        userSession={userSession}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentTab === 'learn' && selectedLesson ? (
          <LessonView
            lesson={selectedLesson}
            onBack={() => setSelectedLesson(null)}
            isCompleted={completedLessons.includes(selectedLesson.id)}
            onToggleComplete={handleToggleCompleteLesson}
            onSpeak={handleSpeak}
            onStartQuiz={(l) => {
              setActiveQuizLesson(l);
              setSelectedLesson(null);
              setCurrentTab('quiz');
            }}
            onBookmark={handleToggleBookmark}
            bookmarks={bookmarks}
            lang={lang}
          />
        ) : (
          <>
            {currentTab === 'learn' && (
              <LessonPath
                completedLessons={completedLessons}
                onSelectLesson={(lesson) => setSelectedLesson(lesson)}
                lang={lang}
              />
            )}

            {currentTab === 'practice' && (
              <FlashcardDeck
                onSpeak={handleSpeak}
                onBookmark={handleToggleBookmark}
                bookmarks={bookmarks}
                onRecordScore={handleRecordScore}
                lang={lang}
              />
            )}

            {currentTab === 'quiz' && (
              <QuizEngine
                lesson={activeQuizLesson}
                onSelectLesson={(lesson) => setActiveQuizLesson(lesson)}
                onCompleteQuiz={(score, total) => {
                  handleAddAuditLog({
                    action: 'QUIZ_COMPLETED',
                    details: `Completed quiz for ${activeQuizLesson ? `Chapter ${activeQuizLesson.number}` : 'All Chapters'} with score ${score}/${total}`,
                    timestamp: new Date().toLocaleString()
                  });
                }}
                onSpeak={handleSpeak}
                lang={lang}
              />
            )}

            {currentTab === 'srs' && (
              <SpacedRepetitionView
                srsData={srsData}
                onRecordScore={handleRecordScore}
                onSpeak={handleSpeak}
                lang={lang}
              />
            )}

            {currentTab === 'dictionary' && (
              <DictionarySearch
                onSpeak={handleSpeak}
                onBookmark={handleToggleBookmark}
                bookmarks={bookmarks}
                lang={lang}
              />
            )}

            {currentTab === 'grammar' && (
              <GrammarExplorer onSpeak={handleSpeak} />
            )}

            {currentTab === 'counting' && (
              <CountingClassifierTool onSpeak={handleSpeak} />
            )}

            {currentTab === 'script' && (
              <AlphabetGuide onSpeak={handleSpeak} />
            )}

            {currentTab === 'culture' && (
              <CultureNotes />
            )}

            {currentTab === 'progress' && (
              <ProgressDashboard
                completedLessons={completedLessons}
                totalLessons={lessonsData.length}
                streak={streak}
                bookmarks={bookmarks}
                onRemoveBookmark={(word) => setBookmarks(bookmarks.filter(b => b.kokborok !== word))}
                onResetProgress={handleResetProgress}
                onExportData={handleExportProgressData}
                onSpeak={handleSpeak}
                lang={lang}
                userSession={userSession}
              />
            )}

            {currentTab === 'admin' && (
              <AdminCMS
                lang={lang}
                customDictData={customDictData}
                onSaveDictData={(data) => setCustomDictData(data)}
                auditTrail={auditTrail}
                onAddAuditLog={handleAddAuditLog}
              />
            )}
          </>
        )}
      </main>

      {/* Supabase Auth & Local Test Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        userSession={userSession}
        onSignOut={handleSignOut}
      />

      {/* Footer Bar */}
      <Footer setTab={(tab) => { setSelectedLesson(null); setCurrentTab(tab); }} />

    </div>
  );
}
