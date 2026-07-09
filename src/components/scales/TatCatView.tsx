import React, { useState, useEffect } from 'react';
import { tatCards, catCards } from '../../modules/projectiveScales';
import { scaleLearningDb } from '../../modules/learningContent';
import { usePatient } from '../PatientContext';
import { TutorialContent } from '../TutorialContent';
import { 
  ClipboardCheck, 
  RotateCcw, 
  Save, 
  BookOpen, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  BookOpenCheck,
  TrendingUp
} from 'lucide-react';

interface CardStoryState {
  storyText: string;
  hero: string;
  press: string;
  needs: string;
  conflicts: string;
  defenses: string;
  outcome: string;
}


const scaleSummaries: Record<string, { target: string; time: string; admin: string; cutoffs: string; action: string }> = {
  bdi: { target: 'Depression Severity', time: '5-10 mins', admin: 'Patient Self-Report', cutoffs: '>=29 (Severe Depression), >=20 (Moderate)', action: 'Safety screening, treatment response tracking' },
  ymrs: { target: 'Manic Symptom Severity', time: '15-30 mins', admin: 'Clinician Interview', cutoffs: '>=25 (Severe Mania), >=20 (Moderate)', action: 'Monitoring manic phases and pharmacological adjustments' },
  ybocs: { target: 'OCD Severity & Focus', time: '15-25 mins', admin: 'Clinician Interview', cutoffs: '>=16 (Clinically Significant), >=32 (Extreme)', action: 'Measuring severity of obsessions and compulsions' },
  hama: { target: 'Anxiety Severity', time: '15-30 mins', admin: 'Clinician Interview', cutoffs: '>=25 (Severe), >=18 (Moderate)', action: 'Distinguishing psychic vs somatic anxiety loads' },
  hamd: { target: 'Depressive Severity (Gold Standard)', time: '15-20 mins', admin: 'Clinician Interview', cutoffs: '>=23 (Severe), <=7 (Remission)', action: 'Monitoring clinical trial response and remission' },
  asrs: { target: 'Adult ADHD Screening', time: '5-10 mins', admin: 'Patient Self-Report', cutoffs: 'Part A >=4 shaded items (Positive Screen)', action: 'Indicating need for full diagnostic intake' },
  aims: { target: 'Tardive Dyskinesia Monitoring', time: '10 mins', admin: 'Clinician Observation', cutoffs: '>=2 (Mild) in 2+ areas, or >=3 (Mod) in 1+ area (Positive)', action: 'Monitoring involuntary movements during neuroleptic treatment' },
  audit: { target: 'Alcohol Consumption & Abuse', time: '2-5 mins', admin: 'Patient Self-Report', cutoffs: '>=8 (Hazardous), >=20 (Possible Dependence)', action: 'Screening for dependency risk and brief clinical intervention' },
  phq9: { target: 'Depression Symptoms & Suicide Risk', time: '3 mins', admin: 'Patient Self-Report', cutoffs: '>=10 (Moderate), >=20 (Severe), Item 9 >0 (Critical)', action: 'Rapid DSM-5 depression tracking and safety check' },
  gad7: { target: 'Generalized Anxiety Severity', time: '2 mins', admin: 'Patient Self-Report', cutoffs: '>=10 (Moderate), >=15 (Severe)', action: 'Screening GAD, panic, and social phobia severity' },
  bai: { target: 'Somatic/Panic Anxiety Symptoms', time: '5 mins', admin: 'Patient Self-Report', cutoffs: '>=16 (Moderate), >=26 (Severe)', action: 'Measuring somatic physiological anxiety symptoms' },
  aq10: { target: 'Autism Traits Screener', time: '2 mins', admin: 'Patient Self-Report', cutoffs: '>=6 (Positive Screen)', action: 'Determining if a comprehensive specialist diagnostic referral is needed' },
  mdq: { target: 'Bipolar Spectrum Screener', time: '5 mins', admin: 'Patient Self-Report', cutoffs: '>=7 symptoms co-occurring + moderate impairment (Positive)', action: 'Screening for manic/hypomanic history' },
  des2: { target: 'Dissociation Screener', time: '10 mins', admin: 'Patient Self-Report', cutoffs: 'Mean score >=30 (High dissociation probability)', action: 'Identifying dissociative disorders or complex trauma' },
  phq15: { target: 'Somatic Symptom Severity', time: '5 mins', admin: 'Patient Self-Report', cutoffs: '>=10 (Medium), >=15 (High somatic load)', action: 'Tracking somatization and unexplained somatic symptoms' },
  eat26: { target: 'Eating Disorder Risk Screening', time: '5 mins', admin: 'Patient Self-Report', cutoffs: '>=20, or positive behavioral questions (High Risk)', action: 'Identifying early signs of anorexia, bulimia, or binge eating' },
  scoff: { target: 'Eating Disorder Brief Screen', time: '1 min', admin: 'Patient Self-Report', cutoffs: '>=2 (Positive Screen)', action: 'Rapid primary care screening for eating concerns' },
  cage: { target: 'Alcoholism Brief Screen', time: '1 min', admin: 'Patient Self-Report', cutoffs: '>=2 (Positive Screen)', action: 'Lifetime alcohol abuse screening' },
  dast10: { target: 'Drug Abuse Screener', time: '2 mins', admin: 'Patient Self-Report', cutoffs: '>=3 (Moderate), >=6 (Substantial problem)', action: 'Screening for illicit drug use consequences' },
  gds30: { target: 'Geriatric Depression Rating', time: '10 mins', admin: 'Patient Self-Report', cutoffs: '>=10 (Mild), >=20 (Severe)', action: 'Elderly depression screening without somatic bias' },
  ess: { target: 'Daytime Sleepiness & Narcolepsy', time: '2 mins', admin: 'Patient Self-Report', cutoffs: '>=11 (Excessive sleepiness)', action: 'Measuring sleep debt and daytime sleepiness probability' },
  bis11: { target: 'Impulsivity Dimensions', time: '5 mins', admin: 'Patient Self-Report', cutoffs: 'Subscores for Attentional, Motor, Non-planning traits', action: 'Tracking impulse control and risk-taking traits' },
  wais: { target: 'Composite Intelligence Indexing', time: '60-90 mins', admin: 'Clinician Administered', cutoffs: 'Mean = 100, SD = 15', action: 'Full-scale IQ composite mapping (VCI, VSI, FRI, WMI, PSI)' },
  misic: { target: 'Indian WISC adaptation IQ', time: '60-90 mins', admin: 'Clinician Administered', cutoffs: 'Mean = 100, SD = 15 (based on Indian child norms)', action: 'Verbal IQ, Performance IQ, and Full Scale Test Quotients' },
  mmpi: { target: 'Clinical Personality Profile', time: '10 mins (plot)', admin: 'Clinician Plotted (from inventory)', cutoffs: 'T-score >=65 (Clinically Significant elevation)', action: 'Multiphasic validity and clinical scale mapping' },
  mcmi: { target: 'Millon Personality & Syndrome Profile', time: '5 mins (plot)', admin: 'Clinician Plotted (from inventory)', cutoffs: 'BR >=75 (Presence), BR >=85 (Prominence)', action: 'Diagnostic Base Rate profile mapping' },
  rorschach: { target: 'Projective Structural Summary', time: '30-45 mins', admin: 'Clinician Administered', cutoffs: 'Ratios: EB, EA, es, Lambda, Afr', action: 'Qualitative personality structure analysis' },
  tat: { target: 'Narrative Story Needs-Press', time: '30-60 mins', admin: 'Clinician Administered', cutoffs: 'Qualitative Needs, Press, and Hero dynamics', action: 'Projective thematic story analysis' },
  dap: { target: 'Expressive Drawing Checklist', time: '10-15 mins', admin: 'Clinician Observed', cutoffs: 'Machover structural indicator signs checklist', action: 'Projective body-image and emotional signs check' }
};

export const TatCatView: React.FC = () => {
  const { patient, saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning' | 'statistics'>('assessment');
  const [mode, setMode] = useState<'TAT' | 'CAT'>('TAT');
  const activeCards = mode === 'TAT' ? tatCards : catCards;

  // Selected card state
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);
  const activeCard = activeCards[selectedCardIdx];

  // Stories database state
  const [stories, setStories] = useState<Record<string, CardStoryState>>(() => {
    if (reports.tat && reports.tat.stories) {
      return reports.tat.stories;
    }
    return {};
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (reports.tat && reports.tat.stories) {
      setStories(reports.tat.stories);
      if (reports.tat.mode) setMode(reports.tat.mode);
    }
  }, [reports.tat]);

  const handleFieldChange = (field: keyof CardStoryState, val: string) => {
    const cardId = activeCard.id;
    setStories(prev => ({
      ...prev,
      [cardId]: {
        ...(prev[cardId] || {
          storyText: '',
          hero: '',
          press: '',
          needs: '',
          conflicts: '',
          defenses: '',
          outcome: ''
        }),
        [field]: val
      }
    }));
    setSavedSuccess(false);
  };

  const handleResetCard = () => {
    if (window.confirm(`Reset story and analysis for ${mode} Card ${activeCard.id}?`)) {
      setStories(prev => {
        const next = { ...prev };
        delete next[activeCard.id];
        return next;
      });
      setSavedSuccess(false);
    }
  };

  const handleSaveReport = () => {
    // Compile completed cards
    const completedCards = Object.keys(stories).filter(key => {
      const cardState = stories[key];
      return cardState.storyText.trim() !== '';
    });

    const reportData = {
      scaleName: mode === 'TAT' ? 'Thematic Apperception Test (TAT) Workpad' : 'Children\'s Apperception Test (CAT) Workpad',
      mode,
      stories,
      completedCardIds: completedCards,
      patientName: patient.name || 'Anonymous'
    };
    saveReport('tat', reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Get current story details
  const currentCardState = stories[activeCard.id] || {
    storyText: '',
    hero: '',
    press: '',
    needs: '',
    conflicts: '',
    defenses: '',
    outcome: ''
  };

  const totalCompleted = Object.keys(stories).filter(k => stories[k].storyText.trim() !== '').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="tab-container no-print">
        <button
          onClick={() => setActiveTab('assessment')}
          className={`tab-btn ${activeTab === 'assessment' ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <ClipboardCheck size={16} />
          <span>Interactive Story Pad</span>
        </button>
        <button
          onClick={() => setActiveTab('learning')}
          className={`tab-btn ${activeTab === 'learning' ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <BookOpen size={16} />
          <span>Understanding the Scale</span>
        </button>
        <button
          onClick={() => setActiveTab('statistics')}
          className={`tab-btn ${activeTab === 'statistics' ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <TrendingUp size={16} />
          <span>Scoring & Statistics</span>
        </button>
      </div>

      {activeTab === 'assessment' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Controls Bar */}
          <div className="glass-panel no-print" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Assessment Type:</span>
              <button 
                onClick={() => { setMode('TAT'); setStories({}); setSelectedCardIdx(0); }} 
                className={`btn ${mode === 'TAT' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
              >
                Adult TAT
              </button>
              <button 
                onClick={() => { setMode('CAT'); setStories({}); setSelectedCardIdx(0); }} 
                className={`btn ${mode === 'CAT' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
              >
                Child CAT
              </button>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Completed Cards: <strong>{totalCompleted}</strong> / {activeCards.length}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleSaveReport}
                className="btn btn-primary"
                disabled={!patient.name || totalCompleted === 0}
                style={{ backgroundColor: savedSuccess ? 'var(--success)' : 'var(--primary)' }}
              >
                {savedSuccess ? <Check size={16} /> : <Save size={16} />}
                <span>{savedSuccess ? 'Saved successfully' : 'Save Full Pad'}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '1.5rem' }} className="grid-cols-2">
            
            {/* Card selector and Story verbatims */}
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)' }}>
                  Card {activeCard.label} (ID: {activeCard.id})
                </h3>
                
                <div style={{ display: 'flex', gap: '0.25rem' }} className="no-print">
                  <button
                    onClick={() => setSelectedCardIdx(p => Math.max(0, p - 1))}
                    disabled={selectedCardIdx === 0}
                    className="btn btn-secondary"
                    style={{ padding: '0.3rem 0.5rem' }}
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <button
                    onClick={() => setSelectedCardIdx(p => Math.min(activeCards.length - 1, p + 1))}
                    disabled={selectedCardIdx === activeCards.length - 1}
                    className="btn btn-secondary"
                    style={{ padding: '0.3rem 0.5rem' }}
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Card Description */}
              <div style={{
                backgroundColor: 'var(--bg-app)',
                padding: '0.75rem',
                borderRadius: '4px',
                borderLeft: '3px solid var(--primary)',
                fontSize: '0.8rem',
                lineHeight: 1.4,
                color: 'var(--text-secondary)'
              }}>
                <strong>Stimulus Scene:</strong> {activeCard.description}
              </div>

              {/* Verbatim Text Area */}
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '0.5rem' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Patient Narrative Transcript (Verbatim)</label>
                <textarea
                  value={currentCardState.storyText}
                  onChange={e => handleFieldChange('storyText', e.target.value)}
                  placeholder="Record the patient's spoken narrative here word-for-word, including pauses, emotions, and prompt answers..."
                  className="form-input"
                  rows={10}
                  style={{ resize: 'vertical', flex: 1, fontSize: '0.825rem', lineHeight: 1.45 }}
                />
              </div>
            </div>

            {/* Thematic Analysis Checklist */}
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <BookOpenCheck size={18} style={{ color: 'var(--primary)' }} />
                  Morgan-Murray Thematic Coding
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 600 }}>1. The Hero</label>
                    <input
                      type="text"
                      value={currentCardState.hero}
                      onChange={e => handleFieldChange('hero', e.target.value)}
                      placeholder="Who is the primary character? What are their motives/feelings?"
                      className="form-input"
                      style={{ padding: '0.45rem 0.625rem', fontSize: '0.8rem' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 600 }}>2. Environmental Press</label>
                    <input
                      type="text"
                      value={currentCardState.press}
                      onChange={e => handleFieldChange('press', e.target.value)}
                      placeholder="What environmental forces, pressures, or people impact the hero?"
                      className="form-input"
                      style={{ padding: '0.45rem 0.625rem', fontSize: '0.8rem' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 600 }}>3. Needs of the Hero</label>
                    <input
                      type="text"
                      value={currentCardState.needs}
                      onChange={e => handleFieldChange('needs', e.target.value)}
                      placeholder="Needs for Achievement (nAch), Affiliation (nAff), Aggression, etc."
                      className="form-input"
                      style={{ padding: '0.45rem 0.625rem', fontSize: '0.8rem' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 600 }}>4. Central Conflict</label>
                    <input
                      type="text"
                      value={currentCardState.conflicts}
                      onChange={e => handleFieldChange('conflicts', e.target.value)}
                      placeholder="What internal struggles, moral dilemmas, or relational crises occur?"
                      className="form-input"
                      style={{ padding: '0.45rem 0.625rem', fontSize: '0.8rem' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 600 }}>5. Defense Mechanisms</label>
                    <input
                      type="text"
                      value={currentCardState.defenses}
                      onChange={e => handleFieldChange('defenses', e.target.value)}
                      placeholder="Projection, Denial, Rationalization, Regression, Splitting, etc."
                      className="form-input"
                      style={{ padding: '0.45rem 0.625rem', fontSize: '0.8rem' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 600 }}>6. Story Resolution / Outcome</label>
                    <input
                      type="text"
                      value={currentCardState.outcome}
                      onChange={e => handleFieldChange('outcome', e.target.value)}
                      placeholder="How does the story end? Realistic, evasive, optimistic, or fatalistic?"
                      className="form-input"
                      style={{ padding: '0.45rem 0.625rem', fontSize: '0.8rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1.5rem',
                borderTop: '1px solid var(--border)',
                paddingTop: '1rem'
              }} className="no-print">
                <button onClick={handleResetCard} className="btn btn-secondary">
                  <RotateCcw size={14} />
                  <span>Clear Card</span>
                </button>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={handleSaveReport}
                    className="btn btn-primary"
                    disabled={!patient.name || totalCompleted === 0}
                    style={{ backgroundColor: savedSuccess ? 'var(--success)' : 'var(--primary)' }}
                  >
                    {savedSuccess ? <Check size={14} /> : <Save size={14} />}
                    <span>{savedSuccess ? 'Saved' : 'Save Full Pad'}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {activeTab === 'learning' && (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>
              {mode === 'TAT' ? 'Thematic Apperception Test (TAT)' : 'Children\'s Apperception Test (CAT)'} Manual
            </h2>
            <span className="badge badge-teal">Clinical Reference Manual</span>
          </div>
          {/* Quick Reference */}
          <div style={{
            backgroundColor: 'var(--primary-light)',
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.25rem',
            margin: '1rem 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Quick Reference</span>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.825rem' }} className="grid-cols-2">
              <div>
                <strong>Clinical Target:</strong> {scaleSummaries['tat']?.target || 'Clinical evaluation'}
              </div>
              <div>
                <strong>Est. Time:</strong> {scaleSummaries['tat']?.time || 'Variable'}
              </div>
              <div>
                <strong>Administration:</strong> {scaleSummaries['tat']?.admin || 'Standard'}
              </div>
              <div>
                <strong>Key Cutoffs:</strong> <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{scaleSummaries['tat']?.cutoffs || 'Refer to manual'}</span>
              </div>
            </div>
            <div style={{ fontSize: '0.825rem', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
              <strong>Primary Clinical Action:</strong> {scaleSummaries['tat']?.action || 'Clinical baseline assessment'}
            </div>
          </div>


          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Background & Morgan-Murray Projection Theory</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{scaleLearningDb.tat.history}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Clinical Indications</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{scaleLearningDb.tat.indications}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Administration Instructions</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{scaleLearningDb.tat.administration}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Scoring Principles & Needs-Press Rationale</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{scaleLearningDb.tat.scoringGuide}</p>
          </div>

          <div style={{
            backgroundColor: 'var(--danger-light)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '4px solid var(--danger)',
            marginTop: '1rem'
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <BookOpen size={16} />
              Ethical usage & Projective interpretation limitations
            </h3>
            <p style={{ fontSize: '0.825rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>{scaleLearningDb.tat.ethicalConsiderations}</p>
          </div>
        </div>
      )}

      {/* STATISTICS TAB */}
      {activeTab === 'statistics' && scaleLearningDb.tat && (
        <div className="glass-panel tutorial-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            <TrendingUp size={22} style={{ color: 'var(--primary)' }} />
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', margin: 0 }}>
              How to Score & Statistics Tutorial
            </h2>
          </div>
          <TutorialContent text={scaleLearningDb.tat.scoringTutorial} />
        </div>
      )}
    </div>
  );
};

