import React, { useState } from 'react';
import { Settings, Plus, Save, Download, Upload, Shield, Clock, FileText, Lock, Key, LogOut, AlertCircle } from 'lucide-react';
import { uiTranslations } from '../data/uiTranslations';
import { dictionaryData as initialDict } from '../data/dictionaryData';

export default function AdminCMS({ lang, customDictData, onSaveDictData, auditTrail = [], onAddAuditLog }) {
  const t = uiTranslations[lang] || uiTranslations.en;
  
  // Auth Gate State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });

  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // CMS Content State
  const [dictList, setDictList] = useState(customDictData || initialDict);
  const [newKokborok, setNewKokborok] = useState('');
  const [newEnglish, setNewEnglish] = useState('');
  const [newBengali, setNewBengali] = useState('');
  const [newCategory, setNewCategory] = useState('Vocabulary');
  const [activeTab, setActiveTab] = useState('words');

  // Handle Admin Passcode Login
  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Default Admin Passcode: 'admin123' or 'borok2026'
    if (passcode.trim() === 'admin123' || passcode.trim() === 'borok2026' || passcode.trim() === 'admin') {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setAuthError('');
      
      onAddAuditLog({
        action: 'ADMIN_LOGIN',
        details: 'Authorized staff logged into CMS Panel',
        timestamp: new Date().toLocaleString()
      });
    } else {
      setAuthError('Invalid Admin Security Key. Please contact system administrator.');
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setPasscode('');
  };

  const handleAddNewWord = () => {
    if (!newKokborok.trim() || !newEnglish.trim()) return;

    const newItem = {
      id: `custom-${Date.now()}`,
      kokborok: newKokborok.trim(),
      english: newEnglish.trim(),
      bengali: newBengali.trim() || '-',
      category: newCategory,
      scriptBn: newBengali.trim() || ''
    };

    const updatedList = [newItem, ...dictList];
    setDictList(updatedList);
    onSaveDictData(updatedList);

    onAddAuditLog({
      action: 'ADDED_WORD',
      details: `Added new word: "${newKokborok.trim()}" (${newEnglish.trim()})`,
      timestamp: new Date().toLocaleString()
    });

    setNewKokborok('');
    setNewEnglish('');
    setNewBengali('');
  };

  const handleDeleteWord = (id) => {
    const itemToDelete = dictList.find(d => d.id === id);
    const updatedList = dictList.filter(d => d.id !== id);
    setDictList(updatedList);
    onSaveDictData(updatedList);

    if (itemToDelete) {
      onAddAuditLog({
        action: 'DELETED_WORD',
        details: `Deleted word: "${itemToDelete.kokborok}"`,
        timestamp: new Date().toLocaleString()
      });
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dictList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kokborok_cms_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    onAddAuditLog({
      action: 'EXPORTED_JSON',
      details: `Exported ${dictList.length} dictionary entries to JSON`,
      timestamp: new Date().toLocaleString()
    });
  };

  // IF NOT AUTHENTICATED: Show Protected Admin Login Gate
  if (!isAuthenticated) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 1rem', maxWidth: '460px', margin: '0 auto' }}>
        <div className="card-base" style={{ borderTop: '6px solid var(--accent-maroon)', backgroundColor: 'var(--surface-card)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#F8E8E8',
              color: 'var(--accent-maroon)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem auto'
            }}>
              <Lock size={28} />
            </div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-deep-maroon)', marginBottom: '0.3rem' }}>
              Protected Admin Portal
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#665544' }}>
              Enter administrator security key to manage Kokborok linguistic database.
            </p>
          </div>

          <form onSubmit={handleAdminLogin}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="eyebrow" style={{ fontSize: '0.7rem', color: 'var(--accent-ochre)', marginBottom: '0.4rem', display: 'block' }}>
                Security Key / Passcode
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  placeholder="Enter security key..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 2.5rem',
                    borderRadius: '10px',
                    border: '1.5px solid var(--border-hairline)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-body)',
                    backgroundColor: 'var(--bg-warm-cream)'
                  }}
                  autoFocus
                />
                <Key size={16} color="var(--accent-maroon)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {authError && (
              <div style={{ padding: '0.75rem', backgroundColor: '#F8E8E8', color: 'var(--accent-maroon)', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}>
              Unlock CMS Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN PANEL
  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      
      {/* CMS Header Banner */}
      <div className="card-base" style={{ marginBottom: '2rem', backgroundColor: 'var(--surface-cream)', borderLeft: '6px solid var(--accent-deep-maroon)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={22} color="var(--accent-maroon)" />
              <span className="eyebrow">{t.adminTitle}</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', marginTop: '0.2rem', marginBottom: '0.5rem' }}>
              Official Content Management & Audit Trail
            </h2>
            <p style={{ color: '#5C4A3C', fontSize: '0.95rem', maxWidth: '800px', margin: 0 }}>
              Authorized staff panel for updating Kokborok vocabulary, phrase entries, and maintaining version history logs for government compliance.
            </p>
          </div>

          <button onClick={handleAdminLogout} className="btn-secondary" style={{ color: 'var(--accent-maroon)', borderColor: 'var(--accent-maroon)' }}>
            <LogOut size={16} /> Lock Admin Panel
          </button>
        </div>

        {/* Tab Toggle */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
          <button 
            onClick={() => setActiveTab('words')}
            className={`chip-pill ${activeTab === 'words' ? 'active' : ''}`}
          >
            Dictionary & Content Manager ({dictList.length} items)
          </button>
          <button 
            onClick={() => setActiveTab('audit')}
            className={`chip-pill ${activeTab === 'audit' ? 'active' : ''}`}
          >
            {t.auditTrail} ({auditTrail.length} logs)
          </button>
        </div>
      </div>

      {activeTab === 'words' && (
        <div className="animate-fade-in">
          
          {/* ADD WORD FORM */}
          <div className="card-base" style={{ marginBottom: '2rem', backgroundColor: 'var(--surface-card)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-deep-maroon)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Plus size={18} /> Add New Vocabulary / Phrase Entry
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label className="eyebrow" style={{ fontSize: '0.65rem', marginBottom: '0.3rem', display: 'block' }}>Kokborok (Roman)</label>
                <input 
                  type="text"
                  placeholder="e.g. Kokborok"
                  value={newKokborok}
                  onChange={(e) => setNewKokborok(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-hairline)' }}
                />
              </div>

              <div>
                <label className="eyebrow" style={{ fontSize: '0.65rem', marginBottom: '0.3rem', display: 'block' }}>English Meaning</label>
                <input 
                  type="text"
                  placeholder="e.g. Kokborok language"
                  value={newEnglish}
                  onChange={(e) => setNewEnglish(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-hairline)' }}
                />
              </div>

              <div>
                <label className="eyebrow" style={{ fontSize: '0.65rem', marginBottom: '0.3rem', display: 'block' }}>Bengali Translation</label>
                <input 
                  type="text"
                  placeholder="e.g. ককবরক ভাষা"
                  value={newBengali}
                  onChange={(e) => setNewBengali(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-hairline)' }}
                />
              </div>

              <div>
                <label className="eyebrow" style={{ fontSize: '0.65rem', marginBottom: '0.3rem', display: 'block' }}>Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-hairline)', backgroundColor: 'var(--surface-cream)' }}
                >
                  <option value="Vocabulary">Vocabulary</option>
                  <option value="Verbs">Verbs</option>
                  <option value="Pronouns">Pronouns</option>
                  <option value="Time">Time</option>
                  <option value="Body Parts">Body Parts</option>
                  <option value="Kinship">Kinship</option>
                  <option value="Greetings">Greetings</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={handleAddNewWord} className="btn-primary">
                <Save size={16} /> Save Word Entry
              </button>

              <button onClick={handleExportJSON} className="btn-secondary">
                <Download size={16} /> Export Updated CMS JSON
              </button>
            </div>
          </div>

          {/* WORD LIST TABLE */}
          <div className="card-base">
            <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-deep-maroon)', marginBottom: '1rem' }}>
              Current Content Entries ({dictList.length})
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-hairline)', backgroundColor: 'var(--surface-cream)' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Kokborok</th>
                    <th style={{ padding: '0.75rem 1rem' }}>English</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Bengali</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dictList.slice(0, 30).map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                      <td style={{ padding: '0.65rem 1rem', fontWeight: '700', color: 'var(--accent-maroon)' }}>{item.kokborok}</td>
                      <td style={{ padding: '0.65rem 1rem' }}>{item.english}</td>
                      <td style={{ padding: '0.65rem 1rem' }}>{item.bengali || '-'}</td>
                      <td style={{ padding: '0.65rem 1rem', fontSize: '0.8rem', color: 'var(--accent-ochre)', fontWeight: '600' }}>{item.category}</td>
                      <td style={{ padding: '0.65rem 1rem', textAlign: 'center' }}>
                        <button 
                          onClick={() => handleDeleteWord(item.id)}
                          style={{ background: 'none', border: 'none', color: 'var(--accent-maroon)', cursor: 'pointer', fontWeight: '600' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* AUDIT TRAIL LOGS */}
      {activeTab === 'audit' && (
        <div className="animate-fade-in card-base">
          <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-deep-maroon)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={18} /> Official Version Audit Trail
          </h3>

          {auditTrail.length === 0 ? (
            <p style={{ fontSize: '0.9rem', color: '#665544' }}>
              No content modifications recorded in current session. Any additions, updates, or JSON exports will log here automatically.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {auditTrail.map((log, idx) => (
                <div key={idx} style={{ padding: '0.85rem 1rem', backgroundColor: 'var(--surface-cream)', borderRadius: '8px', borderLeft: '4px solid var(--accent-forest-green)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <span className="eyebrow" style={{ fontSize: '0.7rem', color: 'var(--accent-forest-green)' }}>{log.action}</span>
                    <span style={{ fontSize: '0.75rem', color: '#776655' }}>{log.timestamp}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-ink)' }}>
                    {log.details}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
