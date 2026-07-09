import React, { useState, useEffect } from 'react';
import { 
  bdiScale, 
  ymrsScale, 
  ybocsScale, 
  hamaScale, 
  hamdScale, 
  asrsScale, 
  aimsScale, 
  auditScale,
  phq9Scale,
  gad7Scale,
  baiScale,
  aq10Scale,
  mdqScale,
  des2Scale,
  phq15Scale,
  eat26Scale,
  scoffScale,
  cageScale,
  dast10Scale,
  gds30Scale,
  essScale,
  bis11Scale,
  psyratsScale,
  connersScale
} from '../../modules/psychiatricScales';
import { scaleLearningDb } from '../../modules/learningContent';
import { usePatient } from '../PatientContext';
import { TutorialContent } from '../TutorialContent';
import { 
  ClipboardCheck, 
  RotateCcw, 
  Save, 
  BookOpen, 
  BrainCircuit, 
  Check, 
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

interface PsychiatricScaleViewProps {
  scaleId: 'bdi' | 'ymrs' | 'ybocs' | 'hama' | 'hamd' | 'asrs' | 'aims' | 'audit' | 'phq9' | 'gad7' | 'bai' | 'aq10' | 'mdq' | 'des2' | 'phq15' | 'eat26' | 'scoff' | 'cage' | 'dast10' | 'gds30' | 'ess' | 'bis11' | 'psyrats' | 'conners';
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
  psyrats: { target: 'Auditory Hallucinations Scale', time: '15-20 mins', admin: 'Clinician Interview', cutoffs: 'Sum of 11 items (0-44). Higher scores = higher severity', action: 'Multi-dimensional clinical assessment of voice-hearing symptoms' },
  conners: { target: 'ADHD & Hyperactivity Severity', time: '5 mins', admin: 'Parent Rating', cutoffs: '>=15 (Clinically Significant ADHD Risk)', action: 'Screening childhood hyperactive, impulsive, and inattentive behaviors' },
  wais: { target: 'Composite Intelligence Indexing', time: '60-90 mins', admin: 'Clinician Administered', cutoffs: 'Mean = 100, SD = 15', action: 'Full-scale IQ composite mapping (VCI, VSI, FRI, WMI, PSI)' },
  misic: { target: 'Indian WISC adaptation IQ', time: '60-90 mins', admin: 'Clinician Administered', cutoffs: 'Mean = 100, SD = 15 (based on Indian child norms)', action: 'Verbal IQ, Performance IQ, and Full Scale Test Quotients' },
  mmpi: { target: 'Clinical Personality Profile', time: '10 mins (plot)', admin: 'Clinician Plotted (from inventory)', cutoffs: 'T-score >=65 (Clinically Significant elevation)', action: 'Multiphasic validity and clinical scale mapping' },
  mcmi: { target: 'Millon Personality & Syndrome Profile', time: '5 mins (plot)', admin: 'Clinician Plotted (from inventory)', cutoffs: 'BR >=75 (Presence), BR >=85 (Prominence)', action: 'Diagnostic Base Rate profile mapping' },
  rorschach: { target: 'Projective Structural Summary', time: '30-45 mins', admin: 'Clinician Administered', cutoffs: 'Ratios: EB, EA, es, Lambda, Afr', action: 'Qualitative personality structure analysis' },
  tat: { target: 'Narrative Story Needs-Press', time: '30-60 mins', admin: 'Clinician Administered', cutoffs: 'Qualitative Needs, Press, and Hero dynamics', action: 'Projective thematic story analysis' },
  dap: { target: 'Expressive Drawing Checklist', time: '10-15 mins', admin: 'Clinician Observed', cutoffs: 'Machover structural indicator signs checklist', action: 'Projective body-image and emotional signs check' }
};

export const PsychiatricScaleView: React.FC<PsychiatricScaleViewProps> = ({ scaleId }) => {
  const { patient, saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning' | 'statistics'>('assessment');
  
  // Select scale configuration
  const scaleConfig = {
    bdi: bdiScale,
    ymrs: ymrsScale,
    ybocs: ybocsScale,
    hama: hamaScale,
    hamd: hamdScale,
    asrs: asrsScale,
    aims: aimsScale,
    audit: auditScale,
    phq9: phq9Scale,
    gad7: gad7Scale,
    bai: baiScale,
    aq10: aq10Scale,
    mdq: mdqScale,
    des2: des2Scale,
    phq15: phq15Scale,
    eat26: eat26Scale,
    scoff: scoffScale,
    cage: cageScale,
    dast10: dast10Scale,
    gds30: gds30Scale,
    ess: essScale,
    bis11: bis11Scale,
    psyrats: psyratsScale,
    conners: connersScale
  }[scaleId];

  const learningData = scaleLearningDb[scaleId];

  // Load saved answers if any, otherwise initialize empty
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    if (reports[scaleId] && reports[scaleId].answers) {
      return reports[scaleId].answers;
    }
    return {};
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Reset state if scaleId changes
  useEffect(() => {
    if (reports[scaleId] && reports[scaleId].answers) {
      setAnswers(reports[scaleId].answers);
    } else {
      setAnswers({});
    }
    setActiveTab('assessment');
    setSavedSuccess(false);
  }, [scaleId, reports]);

  const handleSelectOption = (itemId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [itemId]: value }));
    setSavedSuccess(false);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all answers for this scale?')) {
      setAnswers({});
      setSavedSuccess(false);
    }
  };

  // Compute live scores
  const scoreResult = scaleConfig.calculateScore(answers);

  const handleSaveReport = () => {
    const reportData = {
      scaleName: scaleConfig.name,
      answers,
      totalScore: scoreResult.total,
      subscores: scoreResult.subscores,
      severity: scoreResult.severity,
      interpretation: scoreResult.interpretation,
      patientName: patient.name || 'Anonymous'
    };
    saveReport(scaleId, reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Severity color indicator
  const getSeverityColor = (severity: string) => {
    const s = severity.toLowerCase();
    if (s.includes('severe') || s.includes('extreme') || s.includes('mania')) return 'var(--danger)';
    if (s.includes('moderate')) return 'var(--warning)';
    if (s.includes('mild')) return 'var(--teal)';
    return 'var(--success)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Tab Switcher */}
      <div className="tab-container no-print">
        <button
          onClick={() => setActiveTab('assessment')}
          className={`tab-btn ${activeTab === 'assessment' ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <ClipboardCheck size={16} />
          <span>Interactive Assessment</span>
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

      {/* ASSESSMENT TAB */}
      {activeTab === 'assessment' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Live Score Banner */}
          <div className="glass-panel" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            borderLeft: `5px solid ${getSeverityColor(scoreResult.severity)}`
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Live Scoring Engine
              </div>
              <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', margin: '0.25rem 0 0.5rem 0' }}>
                Score: {scoreResult.total}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge" style={{
                  backgroundColor: `${getSeverityColor(scoreResult.severity)}15`,
                  color: getSeverityColor(scoreResult.severity),
                  fontWeight: 600
                }}>
                  Severity: {scoreResult.severity}
                </span>
                {scaleId === 'ybocs' && scoreResult.subscores && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    (Obsessions: {scoreResult.subscores.obsessions} ? Compulsions: {scoreResult.subscores.compulsions})
                  </span>
                )}
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '280px', maxWidth: '500px' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                <strong>Clinical Interpretation:</strong> {scoreResult.interpretation}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }} className="no-print">
              <button onClick={handleReset} className="btn btn-secondary" title="Reset all responses">
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>
              
              <button
                onClick={handleSaveReport}
                className="btn btn-primary"
                style={{
                  backgroundColor: savedSuccess ? 'var(--success)' : 'var(--primary)'
                }}
                disabled={!patient.name}
                title={!patient.name ? 'Set patient details in Patient Setup to save report' : 'Save completed assessment'}
              >
                {savedSuccess ? <Check size={16} /> : <Save size={16} />}
                <span>{savedSuccess ? 'Saved!' : 'Save Report'}</span>
              </button>
            </div>
          </div>

          {!patient.name && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--warning-light)',
              color: 'var(--warning)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              border: '1px solid var(--warning)20'
            }} className="no-print">
              <AlertTriangle size={16} />
              <span><strong>Note:</strong> You can fill out the questionnaire, but you must configure an active patient in "Patient Setup" before you can save this report.</span>
            </div>
          )}

          {/* Questionnaire list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {scaleConfig.items.map((item, idx) => {
              const selectedValue = answers[item.id];
              return (
                <div 
                  key={item.id} 
                  className="glass-panel" 
                  style={{
                    padding: '1.25rem',
                    border: selectedValue !== undefined ? '1px solid var(--border-focus)' : '1px solid var(--border)',
                    boxShadow: selectedValue !== undefined ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                    backgroundColor: selectedValue !== undefined ? 'var(--bg-surface)' : 'var(--bg-surface)',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.85rem', color: 'var(--text-primary)' }}>
                    {scaleId === 'bdi' ? `${idx + 1}. ${item.label}` : item.label}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.options.map(opt => {
                      const isSelected = selectedValue === opt.value;
                      return (
                        <label 
                          key={opt.value}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            padding: '0.625rem 0.875rem',
                            borderRadius: 'var(--radius-sm)',
                            border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                            backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-input)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            fontSize: '0.875rem',
                            color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)'
                          }}
                        >
                          <input
                            type="radio"
                            name={`item-${item.id}`}
                            checked={isSelected}
                            onChange={() => handleSelectOption(item.id, opt.value)}
                            style={{ marginTop: '0.2rem', accentColor: 'var(--primary)' }}
                            className="no-print"
                          />
                          <span>{opt.text}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action bar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }} className="no-print">
            <button onClick={handleReset} className="btn btn-secondary">
              <RotateCcw size={16} />
              <span>Clear Form</span>
            </button>
            <button
              onClick={handleSaveReport}
              className="btn btn-primary"
              disabled={!patient.name}
              style={{ backgroundColor: savedSuccess ? 'var(--success)' : 'var(--primary)' }}
            >
              {savedSuccess ? <Check size={16} /> : <Save size={16} />}
              <span>{savedSuccess ? 'Saved successfully' : 'Save Report'}</span>
            </button>
          </div>
        </div>
      )}

      {/* LEARNING TAB */}
      {activeTab === 'learning' && learningData && (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>
              {learningData.name}
            </h2>
            <span className="badge badge-teal" style={{ textTransform: 'uppercase' }}>Clinical Reference Manual</span>
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
                <strong>Clinical Target:</strong> {scaleSummaries[scaleId]?.target || 'Clinical evaluation'}
              </div>
              <div>
                <strong>Est. Time:</strong> {scaleSummaries[scaleId]?.time || 'Variable'}
              </div>
              <div>
                <strong>Administration:</strong> {scaleSummaries[scaleId]?.admin || 'Standard'}
              </div>
              <div>
                <strong>Key Cutoffs:</strong> <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{scaleSummaries[scaleId]?.cutoffs || 'Refer to manual'}</span>
              </div>
            </div>
            <div style={{ fontSize: '0.825rem', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
              <strong>Primary Clinical Action:</strong> {scaleSummaries[scaleId]?.action || 'Clinical baseline assessment'}
            </div>
          </div>


          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Background & History</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{learningData.history}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Clinical Indications</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{learningData.indications}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Standard Administration Procedure</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{learningData.administration}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Scoring Guidelines & Interpretation Cut-offs</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{learningData.scoringGuide}</p>
          </div>

          <div style={{
            backgroundColor: 'var(--danger-light)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '4px solid var(--danger)',
            marginTop: '1rem'
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <BrainCircuit size={16} />
              Ethical & Safety Considerations
            </h3>
            <p style={{ fontSize: '0.825rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>{learningData.ethicalConsiderations}</p>
          </div>
        </div>
      )}

      {/* STATISTICS TAB */}
      {activeTab === 'statistics' && learningData && (
        <div className="glass-panel tutorial-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            <TrendingUp size={22} style={{ color: 'var(--primary)' }} />
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', margin: 0 }}>
              How to Score & Statistics Tutorial
            </h2>
          </div>
          <TutorialContent text={learningData.scoringTutorial} />
        </div>
      )}
    </div>
  );
};

