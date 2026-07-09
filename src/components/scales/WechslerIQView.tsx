import React, { useState, useEffect } from 'react';
import { 
  waisSubtestsDefault, 
  calculateWechslerScores, 
  type WechslerSubtest 
} from '../../modules/intelligenceScales';
import { scaleLearningDb } from '../../modules/learningContent';
import { usePatient } from '../PatientContext';
import { TutorialContent } from '../TutorialContent';
import { 
  ClipboardCheck, 
  RotateCcw, 
  Save, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle, 
  Check 
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

export const WechslerIQView: React.FC = () => {
  const { patient, saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning' | 'statistics'>('assessment');
  const [subtests, setSubtests] = useState<WechslerSubtest[]>(() => {
    if (reports.wais && reports.wais.subtests) {
      return reports.wais.subtests;
    }
    return waisSubtestsDefault;
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (reports.wais && reports.wais.subtests) {
      setSubtests(reports.wais.subtests);
    }
  }, [reports.wais]);

  const handleScaledScoreChange = (id: string, val: string) => {
    const score = val === '' ? 10 : Math.max(1, Math.min(19, parseInt(val, 10)));
    setSubtests(prev => prev.map(s => s.id === id ? { ...s, scaledScore: score } : s));
    setSavedSuccess(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset all subtest scaled scores to the default (10)?')) {
      setSubtests(waisSubtestsDefault);
      setSavedSuccess(false);
    }
  };

  const results = calculateWechslerScores(subtests);

  const handleSaveReport = () => {
    const reportData = {
      scaleName: 'Wechsler Intelligence Scales (WAIS-IV / WISC-V)',
      subtests,
      results,
      patientName: patient.name || 'Anonymous'
    };
    saveReport('wais', reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Group subtests by Index for nice presentation
  const groupedSubtests = subtests.reduce((acc, sub) => {
    if (!acc[sub.index]) acc[sub.index] = [];
    acc[sub.index].push(sub);
    return acc;
  }, {} as Record<string, WechslerSubtest[]>);

  // SVG Chart Dimensions
  const chartWidth = 500;
  const chartHeight = 250;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const dataWidth = chartWidth - paddingLeft - paddingRight;
  const dataHeight = chartHeight - paddingTop - paddingBottom;

  // Chart data: VCI, VSI, FRI, WMI, PSI, FSIQ
  const chartData = [
    ...results.indices.map(ind => ({ label: ind.id, score: ind.score })),
    { label: 'FSIQ', score: results.fsiq }
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
          
          {/* Main Results Panel */}
          <div className="glass-panel" style={{
            backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            borderLeft: '5px solid var(--primary)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Composite IQ Metric
              </div>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', margin: '0.2rem 0' }}>
                FSIQ: {results.fsiq}
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge badge-primary">Percentile: {results.fsiqPercentile}%</span>
                <span className="badge badge-success">{results.fsiqClassification}</span>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                General Ability Index (GAI): {results.gai} ? Cognitive Proficiency (CPI): {results.cpi}
              </div>
            </div>

            {/* Quick SVG Line Profile Chart */}
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <svg width={chartWidth} height={chartHeight} style={{ overflow: 'visible' }}>
                {/* Gridlines */}
                {[50, 70, 90, 100, 110, 130, 150].map((gl) => {
                  const y = paddingTop + dataHeight - ((gl - 50) / 100) * dataHeight;
                  const isAverage = gl === 100;
                  return (
                    <g key={gl}>
                      <line 
                        x1={paddingLeft} 
                        y1={y} 
                        x2={chartWidth - paddingRight} 
                        y2={y} 
                        stroke={isAverage ? 'var(--primary)' : 'var(--border)'} 
                        strokeWidth={isAverage ? 1.5 : 1}
                        strokeDasharray={isAverage ? '0' : '3 3'}
                      />
                      <text x={paddingLeft - 8} y={y + 4} textAnchor="end" fontSize="10" fill="var(--text-muted)">
                        {gl}
                      </text>
                    </g>
                  );
                })}

                {/* Draw Profile Line */}
                {chartData.map((d, i) => {
                  if (i === chartData.length - 1) return null; // don't draw line to FSIQ which is composite
                  const nextD = chartData[i + 1];
                  if (nextD.label === 'FSIQ') return null; // break connection before FSIQ
                  
                  const x1 = paddingLeft + (i / 4) * dataWidth;
                  const y1 = paddingTop + dataHeight - ((d.score - 50) / 100) * dataHeight;
                  const x2 = paddingLeft + ((i + 1) / 4) * dataWidth;
                  const y2 = paddingTop + dataHeight - ((nextD.score - 50) / 100) * dataHeight;

                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--primary)" strokeWidth={2.5} />
                  );
                })}

                {/* Nodes & Labels */}
                {chartData.map((d, i) => {
                  const x = paddingLeft + (i === 5 ? dataWidth : (i / 4) * dataWidth); // FSIQ placed at far right
                  const y = paddingTop + dataHeight - ((d.score - 50) / 100) * dataHeight;
                  const isFsiq = d.label === 'FSIQ';
                  return (
                    <g key={d.label}>
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={isFsiq ? 6 : 4} 
                        fill={isFsiq ? 'var(--success)' : 'var(--primary)'} 
                        stroke="var(--bg-surface)" 
                        strokeWidth={1.5}
                      />
                      <text x={x} y={chartHeight - 12} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
                        {d.label}
                      </text>
                      <text x={x} y={y - 8} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-secondary)">
                        {d.score}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Warnings & Discrepancies */}
          {results.discrepancies.length > 0 && (
            <div className="glass-panel" style={{
              borderColor: 'var(--warning)',
              backgroundColor: 'var(--warning-light)',
              color: 'var(--text-primary)',
              padding: '1.25rem'
            }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--warning)' }}>
                <AlertTriangle size={16} />
                Clinical Discrepancy Alerts
              </h3>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', fontSize: '0.85rem' }}>
                {results.discrepancies.map((d, i) => (
                  <li key={i} style={{ marginBottom: '0.25rem' }}>{d}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Subtest inputs & Index Scores Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }} className="grid-cols-2">
            
            {/* Subtests Data Entry */}
            <div className="glass-panel">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                Subtest Scaled Scores
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {Object.keys(groupedSubtests).map(indexKey => (
                  <div key={indexKey} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      {indexKey} Subtests
                    </div>
                    {groupedSubtests[indexKey].map(sub => (
                      <div key={sub.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.875rem' }}>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)', marginRight: '0.4rem' }}>{sub.id}</span>
                          <span style={{ color: 'var(--text-secondary)' }}>{sub.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="range"
                            min="1"
                            max="19"
                            value={sub.scaledScore}
                            onChange={(e) => handleScaledScoreChange(sub.id, e.target.value)}
                            style={{ width: '100px', accentColor: 'var(--primary)' }}
                            className="no-print"
                          />
                          <input
                            type="number"
                            min="1"
                            max="19"
                            value={sub.scaledScore}
                            onChange={(e) => handleScaledScoreChange(sub.id, e.target.value)}
                            className="form-input"
                            style={{ width: '50px', padding: '0.25rem', textAlign: 'center' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Index breakdown table */}
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                  Composite Index Scores
                </h3>
                <div className="table-container">
                  <table className="scoring-table">
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th style={{ textAlign: 'center' }}>Score</th>
                        <th style={{ textAlign: 'center' }}>Percentile</th>
                        <th>Classification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.indices.map(ind => (
                        <tr key={ind.id}>
                          <td><strong>{ind.id}</strong></td>
                          <td style={{ textAlign: 'center', fontWeight: 600 }}>{ind.score}</td>
                          <td style={{ textAlign: 'center' }}>{ind.percentile}%</td>
                          <td style={{ fontSize: '0.75rem' }}>{ind.classification}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
              Wechsler Intelligence Scales Reference
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
                <strong>Clinical Target:</strong> {scaleSummaries['wais']?.target || 'Clinical evaluation'}
              </div>
              <div>
                <strong>Est. Time:</strong> {scaleSummaries['wais']?.time || 'Variable'}
              </div>
              <div>
                <strong>Administration:</strong> {scaleSummaries['wais']?.admin || 'Standard'}
              </div>
              <div>
                <strong>Key Cutoffs:</strong> <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{scaleSummaries['wais']?.cutoffs || 'Refer to manual'}</span>
              </div>
            </div>
            <div style={{ fontSize: '0.825rem', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
              <strong>Primary Clinical Action:</strong> {scaleSummaries['wais']?.action || 'Clinical baseline assessment'}
            </div>
          </div>


          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Background & History</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{scaleLearningDb.wais.history}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Clinical Indications</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{scaleLearningDb.wais.indications}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Administration Criteria</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{scaleLearningDb.wais.administration}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Index Structure & Scoring Ranges</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{scaleLearningDb.wais.scoringGuide}</p>
          </div>

          <div style={{
            backgroundColor: 'var(--warning-light)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '4px solid var(--warning)',
            marginTop: '1rem'
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <TrendingUp size={16} />
              Important Diagnostics Interpretation Rules
            </h3>
            <p style={{ fontSize: '0.825rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>{scaleLearningDb.wais.ethicalConsiderations}</p>
          </div>
        </div>
      )}

      {/* STATISTICS TAB */}
      {activeTab === 'statistics' && scaleLearningDb.wais && (
        <div className="glass-panel tutorial-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            <TrendingUp size={22} style={{ color: 'var(--primary)' }} />
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', margin: 0 }}>
              How to Score & Statistics Tutorial
            </h2>
          </div>
          <TutorialContent text={scaleLearningDb.wais.scoringTutorial} />
        </div>
      )}
    </div>
  );
};

