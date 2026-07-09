import React, { useState, useEffect } from 'react';
import { dapIndicators, type DapIndicator } from '../../modules/personalityScales';
import { scaleLearningDb } from '../../modules/learningContent';
import { usePatient } from '../PatientContext';
import { TutorialContent } from '../TutorialContent';
import { 
  ClipboardCheck, 
  RotateCcw, 
  Save, 
  BookOpen, 
  Check, 
  Sparkles, 
  AlertTriangle,
  TrendingUp
} from 'lucide-react';


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

export const DapChecklistView: React.FC = () => {
  const { patient, saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning' | 'statistics'>('assessment');
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (reports.dap && reports.dap.selectedIds) {
      return reports.dap.selectedIds;
    }
    return [];
  });
  const [notes, setNotes] = useState(() => {
    if (reports.dap && reports.dap.notes) {
      return reports.dap.notes;
    }
    return '';
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (reports.dap) {
      setSelectedIds(reports.dap.selectedIds || []);
      setNotes(reports.dap.notes || '');
    }
  }, [reports.dap]);

  const handleToggleIndicator = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    setSavedSuccess(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset checklist and notes?')) {
      setSelectedIds([]);
      setNotes('');
      setSavedSuccess(false);
    }
  };

  const handleSaveReport = () => {
    const checkedDetails = dapIndicators.filter(i => selectedIds.includes(i.id));
    const reportData = {
      scaleName: 'Draw-a-Person (DAP) Indicator Checklist',
      selectedIds,
      checkedDetails,
      notes,
      patientName: patient.name || 'Anonymous'
    };
    saveReport('dap', reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Group indicators by category
  const groupedIndicators = dapIndicators.reduce((acc, ind) => {
    if (!acc[ind.category]) acc[ind.category] = [];
    acc[ind.category].push(ind);
    return acc;
  }, {} as Record<string, DapIndicator[]>);

  // Filter selected indicators for display in report preview
  const activeSelectedDetails = dapIndicators.filter(i => selectedIds.includes(i.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="tab-container no-print">
        <button
          onClick={() => setActiveTab('assessment')}
          className={`tab-btn ${activeTab === 'assessment' ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <ClipboardCheck size={16} />
          <span>Interactive Checklist</span>
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
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem' }} className="grid-cols-2">
            
            {/* Checklist */}
            <div className="glass-panel">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                DAP Structural Indicators Checklist
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {Object.keys(groupedIndicators).map(cat => (
                  <div key={cat} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      {cat}
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {groupedIndicators[cat].map(ind => {
                        const isChecked = selectedIds.includes(ind.id);
                        return (
                          <label key={ind.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.4rem 0.625rem',
                            borderRadius: '4px',
                            border: `1px solid ${isChecked ? 'var(--primary)40' : 'var(--border)'}`,
                            backgroundColor: isChecked ? 'var(--primary-light)' : 'var(--bg-surface)',
                            cursor: 'pointer',
                            fontSize: '0.825rem',
                            color: 'var(--text-primary)'
                          }}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleIndicator(ind.id)}
                              style={{ accentColor: 'var(--primary)' }}
                              className="no-print"
                            />
                            <span>{ind.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Interpretation Pane */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-panel" style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)' }}>
                  <Sparkles size={16} style={{ color: 'var(--primary)' }} />
                  Dynamic Interpretive Hypotheses
                </h3>
                
                {activeSelectedDetails.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.4 }}>
                    Check indicators on the left. The tool will instantly populate traditional Machover psychodynamic hypotheses for clinical review.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '350px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                    {activeSelectedDetails.map(ind => (
                      <div key={ind.id} style={{
                        padding: '0.625rem 0.875rem',
                        backgroundColor: 'var(--bg-app)',
                        borderRadius: '4px',
                        borderLeft: '3px solid var(--primary)'
                      }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                          {ind.label}
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                          {ind.psychInterpretation}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Text Notes box */}
              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Clinical Synthesis & Observation Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => { setNotes(e.target.value); setSavedSuccess(false); }}
                  placeholder="Record drawings traits, clinical demeanor, answers to post-drawing interview questions, or overall qualitative interpretations..."
                  className="form-input"
                  rows={4}
                  style={{ resize: 'vertical', fontSize: '0.825rem' }}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }} className="no-print">
                  <button onClick={handleReset} className="btn btn-secondary">
                    <RotateCcw size={14} />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={handleSaveReport}
                    className="btn btn-primary"
                    disabled={!patient.name}
                    style={{ backgroundColor: savedSuccess ? 'var(--success)' : 'var(--primary)' }}
                  >
                    {savedSuccess ? <Check size={14} /> : <Save size={14} />}
                    <span>{savedSuccess ? 'Saved' : 'Save Report'}</span>
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
              Draw-a-Person (DAP) Reference Manual
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
                <strong>Clinical Target:</strong> {scaleSummaries['dap']?.target || 'Clinical evaluation'}
              </div>
              <div>
                <strong>Est. Time:</strong> {scaleSummaries['dap']?.time || 'Variable'}
              </div>
              <div>
                <strong>Administration:</strong> {scaleSummaries['dap']?.admin || 'Standard'}
              </div>
              <div>
                <strong>Key Cutoffs:</strong> <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{scaleSummaries['dap']?.cutoffs || 'Refer to manual'}</span>
              </div>
            </div>
            <div style={{ fontSize: '0.825rem', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
              <strong>Primary Clinical Action:</strong> {scaleSummaries['dap']?.action || 'Clinical baseline assessment'}
            </div>
          </div>


          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Background & Core Theory</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{scaleLearningDb.dap.history}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Indications & Suitability</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{scaleLearningDb.dap.indications}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Standard Administration Procedure</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{scaleLearningDb.dap.administration}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Scoring Principles & Qualitative Indicators</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{scaleLearningDb.dap.scoringGuide}</p>
          </div>

          <div style={{
            backgroundColor: 'var(--danger-light)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '4px solid var(--danger)',
            marginTop: '1rem'
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <AlertTriangle size={16} />
              Ethical boundaries & Scientific Validity Warnings
            </h3>
            <p style={{ fontSize: '0.825rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>{scaleLearningDb.dap.ethicalConsiderations}</p>
          </div>
        </div>
      )}

      {/* STATISTICS TAB */}
      {activeTab === 'statistics' && scaleLearningDb.dap && (
        <div className="glass-panel tutorial-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            <TrendingUp size={22} style={{ color: 'var(--primary)' }} />
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', margin: 0 }}>
              How to Score & Statistics Tutorial
            </h2>
          </div>
          <TutorialContent text={scaleLearningDb.dap.scoringTutorial} />
        </div>
      )}
    </div>
  );
};

