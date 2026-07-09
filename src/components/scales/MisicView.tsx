import React, { useState, useEffect } from 'react';
import { 
  misicSubtestsDefault, 
  calculateMisicScores, 
  type MisicSubtest 
} from '../../modules/intelligenceScales';
import { scaleLearningDb } from '../../modules/learningContent';
import { usePatient } from '../PatientContext';
import { TutorialContent } from '../TutorialContent';
import { 
  ClipboardCheck, 
  RotateCcw, 
  Save, 
  BookOpen, 
  Check, 
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

export const MisicView: React.FC = () => {
  const { patient, saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning' | 'statistics'>('assessment');
  const [subtests, setSubtests] = useState<MisicSubtest[]>(() => {
    if (reports.misic && reports.misic.subtests) {
      return reports.misic.subtests;
    }
    return misicSubtestsDefault;
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (reports.misic && reports.misic.subtests) {
      setSubtests(reports.misic.subtests);
    }
  }, [reports.misic]);

  const handleTqChange = (name: string, val: string) => {
    const score = val === '' ? 100 : Math.max(50, Math.min(150, parseInt(val, 10)));
    setSubtests(prev => prev.map(s => s.name === name ? { ...s, tq: score } : s));
    setSavedSuccess(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset all subtest Test Quotients (TQs) to standard average (100)?')) {
      setSubtests(misicSubtestsDefault);
      setSavedSuccess(false);
    }
  };

  const results = calculateMisicScores(subtests);

  const handleSaveReport = () => {
    const reportData = {
      scaleName: 'Malin\'s Intelligence Scale for Indian Children (MISIC)',
      subtests,
      results,
      patientName: patient.name || 'Anonymous'
    };
    saveReport('misic', reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Group by type
  const verbalSubtests = subtests.filter(s => s.type === 'Verbal');
  const performanceSubtests = subtests.filter(s => s.type === 'Performance');

  // Chart dimensions
  const width = 500;
  const height = 220;
  const paddingLeft = 40;
  const paddingBottom = 30;
  const dataWidth = width - paddingLeft - 20;
  const dataHeight = height - 20 - paddingBottom;

  const barData = [
    { label: 'VIQ', score: results.viq, fill: 'var(--primary)' },
    { label: 'PIQ', score: results.piq, fill: 'var(--teal)' },
    { label: 'FSIQ', score: results.fsiq, fill: 'var(--success)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="tab-container no-print">
        <button
          onClick={() => setActiveTab('assessment')}
          className={`tab-btn ${activeTab === 'assessment' ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <ClipboardCheck size={16} />
          <span>Interactive Calculator</span>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Summary Panel */}
          <div className="glass-panel" style={{
            backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            borderLeft: '5px solid var(--teal)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                MISIC Indian Adaptations IQ
              </div>
              <h2 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-display)', margin: '0.2rem 0' }}>
                Full-Scale IQ: {results.fsiq}
              </h2>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                <span className="badge badge-primary">VIQ (Verbal): {results.viq}</span>
                <span className="badge badge-teal">PIQ (Performance): {results.piq}</span>
                <span className="badge badge-success">{results.fsiqClassification}</span>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Verbal Sum: {results.verbalSum} ? Performance Sum: {results.performanceSum} (Total Sum: {results.totalSum})
              </div>
            </div>

            {/* Quick SVG Bar Chart */}
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <svg width={width} height={height} style={{ overflow: 'visible' }}>
                {/* Horizontal gridlines */}
                {[50, 70, 90, 100, 110, 130, 150].map(gl => {
                  const y = 20 + dataHeight - ((gl - 50) / 100) * dataHeight;
                  const isAverage = gl === 100;
                  return (
                    <g key={gl}>
                      <line 
                        x1={paddingLeft} 
                        y1={y} 
                        x2={width - 20} 
                        y2={y} 
                        stroke={isAverage ? 'var(--text-muted)' : 'var(--border)'} 
                        strokeWidth={0.8}
                        strokeDasharray={isAverage ? '0' : '2 2'}
                      />
                      <text x={paddingLeft - 8} y={y + 3} textAnchor="end" fontSize="10" fill="var(--text-muted)">
                        {gl}
                      </text>
                    </g>
                  );
                })}

                {/* Bars */}
                {barData.map((b, i) => {
                  const barWidth = 60;
                  const spacing = (dataWidth - barWidth * 3) / 4;
                  const x = paddingLeft + spacing + i * (barWidth + spacing);
                  const barHeight = ((b.score - 50) / 100) * dataHeight;
                  const y = 20 + dataHeight - barHeight;

                  return (
                    <g key={b.label}>
                      {/* Bar shadow */}
                      <rect 
                        x={x} 
                        y={y} 
                        width={barWidth} 
                        height={barHeight} 
                        fill={b.fill} 
                        rx="4"
                      />
                      {/* Label on top of bar */}
                      <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">
                        {b.score}
                      </text>
                      {/* X axis Label */}
                      <text x={x + barWidth / 2} y={height - 8} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-secondary)">
                        {b.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Discrepancies alert */}
          {results.discrepancies.length > 0 && (
            <div className="glass-panel" style={{
              borderColor: 'var(--warning)',
              backgroundColor: 'var(--warning-light)',
              color: 'var(--text-primary)',
              padding: '1.25rem'
            }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--warning)' }}>
                <AlertTriangle size={16} />
                Verbal-Performance Discrepancy Found
              </h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
                {results.discrepancies[0]}
              </p>
            </div>
          )}

          {/* Subtest Lists Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="grid-cols-2">
            
            {/* Verbal Subtests */}
            <div className="glass-panel">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>
                Verbal Scale Subtests
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {verbalSubtests.map(sub => (
                  <div key={sub.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{sub.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={sub.tq}
                        onChange={(e) => handleTqChange(sub.name, e.target.value)}
                        style={{ width: '80px', accentColor: 'var(--primary)' }}
                        className="no-print"
                      />
                      <input
                        type="number"
                        min="50"
                        max="150"
                        value={sub.tq}
                        onChange={(e) => handleTqChange(sub.name, e.target.value)}
                        className="form-input"
                        style={{ width: '60px', padding: '0.2rem', textAlign: 'center' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Subtests */}
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--teal)', fontFamily: 'var(--font-display)' }}>
                  Performance Scale Subtests
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {performanceSubtests.map(sub => (
                    <div key={sub.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{sub.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          value={sub.tq}
                          onChange={(e) => handleTqChange(sub.name, e.target.value)}
                          style={{ width: '80px', accentColor: 'var(--teal)' }}
                          className="no-print"
                        />
                        <input
                          type="number"
                          min="50"
                          max="150"
                          value={sub.tq}
                          onChange={(e) => handleTqChange(sub.name, e.target.value)}
                          className="form-input"
                          style={{ width: '60px', padding: '0.2rem', textAlign: 'center' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Utility actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }} className="no-print">
                <button onClick={handleReset} className="btn btn-secondary">
                  <RotateCcw size={16} />
                  <span>Reset Scores</span>
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

          </div>

        </div>
      )}

      {activeTab === 'learning' && (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>
              Malin\'s Intelligence Scale (MISIC) Reference
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
                <strong>Clinical Target:</strong> {scaleSummaries['misic']?.target || 'Clinical evaluation'}
              </div>
              <div>
                <strong>Est. Time:</strong> {scaleSummaries['misic']?.time || 'Variable'}
              </div>
              <div>
                <strong>Administration:</strong> {scaleSummaries['misic']?.admin || 'Standard'}
              </div>
              <div>
                <strong>Key Cutoffs:</strong> <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{scaleSummaries['misic']?.cutoffs || 'Refer to manual'}</span>
              </div>
            </div>
            <div style={{ fontSize: '0.825rem', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
              <strong>Primary Clinical Action:</strong> {scaleSummaries['misic']?.action || 'Clinical baseline assessment'}
            </div>
          </div>


          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Background & History</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{scaleLearningDb.misic.history}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Clinical Indications</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{scaleLearningDb.misic.indications}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Administration Details</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{scaleLearningDb.misic.administration}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Scoring Guidelines</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{scaleLearningDb.misic.scoringGuide}</p>
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
              Ethical & Cultural Adaptation Guidelines
            </h3>
            <p style={{ fontSize: '0.825rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>{scaleLearningDb.misic.ethicalConsiderations}</p>
          </div>
        </div>
      )}

      {/* STATISTICS TAB */}
      {activeTab === 'statistics' && scaleLearningDb.misic && (
        <div className="glass-panel tutorial-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            <TrendingUp size={22} style={{ color: 'var(--primary)' }} />
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', margin: 0 }}>
              How to Score & Statistics Tutorial
            </h2>
          </div>
          <TutorialContent text={scaleLearningDb.misic.scoringTutorial} />
        </div>
      )}
    </div>
  );
};

