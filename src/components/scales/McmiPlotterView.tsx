import React, { useState, useEffect } from 'react';
import { 
  mcmiScalesDefault, 
  type McmiScale 
} from '../../modules/personalityScales';
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

export const McmiPlotterView: React.FC = () => {
  const { patient, saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning' | 'statistics'>('assessment');
  const [scales, setScales] = useState<McmiScale[]>(() => {
    if (reports.mcmi && reports.mcmi.scales) {
      return reports.mcmi.scales;
    }
    return mcmiScalesDefault;
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (reports.mcmi && reports.mcmi.scales) {
      setScales(reports.mcmi.scales);
    }
  }, [reports.mcmi]);

  const handleBaseRateChange = (id: string, val: string) => {
    const br = val === '' ? 0 : Math.max(0, Math.min(115, parseInt(val, 10)));
    setScales(prev => prev.map(s => s.id === id ? { ...s, baseRate: br } : s));
    setSavedSuccess(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset all MCMI-III Base Rate scores?')) {
      setScales(mcmiScalesDefault);
      setSavedSuccess(false);
    }
  };

  const handleSaveReport = () => {
    const reportData = {
      scaleName: 'MCMI-III Personality Profile Plotter',
      scales,
      patientName: patient.name || 'Anonymous'
    };
    saveReport('mcmi', reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Group scales by category
  const groupedScales = scales.reduce((acc, scale) => {
    if (!acc[scale.category]) acc[scale.category] = [];
    acc[scale.category].push(scale);
    return acc;
  }, {} as Record<string, McmiScale[]>);

  // SVG dimensions
  const width = 650;
  const height = 280;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;
  const dataWidth = width - paddingLeft - paddingRight;
  const dataHeight = height - paddingTop - paddingBottom;

  const getX = (index: number, total: number) => {
    return paddingLeft + (index / (total - 1)) * dataWidth;
  };

  const getY = (br: number) => {
    const ratio = br / 115;
    return paddingTop + dataHeight - ratio * dataHeight;
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'modifying': return 'Modifying Indices';
      case 'personality': return 'Clinical Personality Patterns';
      case 'severe-personality': return 'Severe Personality Pathology';
      case 'syndromes': return 'Clinical Syndromes';
      case 'severe-syndromes': return 'Severe Clinical Syndromes';
      default: return cat;
    }
  };

  // Significant elevations: BR >= 75 (presence), BR >= 85 (prominence)
  const presenceScales = scales.filter(s => s.baseRate >= 75 && s.baseRate < 85 && s.category !== 'modifying');
  const prominenceScales = scales.filter(s => s.baseRate >= 85 && s.category !== 'modifying');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="tab-container no-print">
        <button
          onClick={() => setActiveTab('assessment')}
          className={`tab-btn ${activeTab === 'assessment' ? 'active' : ''}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <ClipboardCheck size={16} />
          <span>Profile Plotter</span>
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
          
          {/* Main Visualizer */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem', alignItems: 'start' }} className="grid-cols-2">
            
            {/* Chart SVG */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ alignSelf: 'stretch', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Base Rate (BR) Profile Graph
                </span>
              </div>

              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <svg width={width} height={height} style={{ overflow: 'visible' }}>
                  {/* Shade prominence zone (BR >= 85) */}
                  <rect 
                    x={paddingLeft} 
                    y={getY(115)} 
                    width={dataWidth} 
                    height={getY(85) - getY(115)} 
                    fill="var(--danger-light)" 
                    opacity="0.3"
                  />
                  {/* Shade presence zone (75 <= BR < 85) */}
                  <rect 
                    x={paddingLeft} 
                    y={getY(85)} 
                    width={dataWidth} 
                    height={getY(75) - getY(85)} 
                    fill="var(--warning-light)" 
                    opacity="0.3"
                  />

                  {/* Grid Lines */}
                  {[0, 35, 60, 75, 85, 100, 115].map(gl => {
                    const y = getY(gl);
                    const is75 = gl === 75;
                    const is85 = gl === 85;
                    return (
                      <g key={gl}>
                        <line
                          x1={paddingLeft}
                          y1={y}
                          x2={width - paddingRight}
                          y2={y}
                          stroke={is85 ? 'var(--danger)' : is75 ? 'var(--warning)' : 'var(--border)'}
                          strokeWidth={is75 || is85 ? 1.5 : 0.8}
                          strokeDasharray={is75 || is85 ? '0' : '2 2'}
                        />
                        <text x={paddingLeft - 8} y={y + 3} textAnchor="end" fontSize="9" fill={is85 ? 'var(--danger)' : is75 ? 'var(--warning)' : 'var(--text-muted)'} fontWeight={is75 || is85 ? 'bold' : 'normal'}>
                          {gl}
                        </text>
                      </g>
                    );
                  })}

                  {/* Connect Nodes by category loops */}
                  {Object.keys(groupedScales).map(cat => {
                    const catScales = groupedScales[cat];
                    return catScales.map((s, idx) => {
                      if (idx === catScales.length - 1) return null;
                      const globalIdx1 = scales.findIndex(allS => allS.id === s.id);
                      const globalIdx2 = scales.findIndex(allS => allS.id === catScales[idx + 1].id);
                      
                      const x1 = getX(globalIdx1, scales.length);
                      const y1 = getY(s.baseRate);
                      const x2 = getX(globalIdx2, scales.length);
                      const y2 = getY(catScales[idx + 1].baseRate);

                      let strokeColor = 'var(--text-muted)';
                      if (cat === 'personality') strokeColor = 'var(--primary)';
                      if (cat === 'severe-personality') strokeColor = 'var(--teal)';
                      if (cat === 'syndromes') strokeColor = 'var(--success)';
                      if (cat === 'severe-syndromes') strokeColor = 'var(--danger)';

                      return (
                        <line 
                          key={`line-${s.id}`} 
                          x1={x1} 
                          y1={y1} 
                          x2={x2} 
                          y2={y2} 
                          stroke={strokeColor} 
                          strokeWidth={1.8} 
                        />
                      );
                    });
                  })}

                  {/* Draw Nodes */}
                  {scales.map((s, idx) => {
                    const x = getX(idx, scales.length);
                    const y = getY(s.baseRate);
                    const isElevated = s.baseRate >= 85;
                    const isPresent = s.baseRate >= 75 && s.baseRate < 85;

                    return (
                      <g key={`node-${s.id}`}>
                        <circle
                          cx={x}
                          cy={y}
                          r={3.5}
                          fill={isElevated ? 'var(--danger)' : isPresent ? 'var(--warning)' : 'var(--primary)'}
                          stroke="var(--bg-surface)"
                          strokeWidth={1.0}
                        />
                        {/* Vertical text label on X axis */}
                        <text 
                          x={x} 
                          y={height - 12} 
                          textAnchor="middle" 
                          fontSize="8" 
                          fontWeight="700" 
                          fill="var(--text-primary)"
                        >
                          {s.id}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Elevated List */}
            <div className="glass-panel" style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>
                  Clinical Highlights
                </h3>

                {prominenceScales.length === 0 && presenceScales.length === 0 ? (
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    No significant elevations (BR &ge; 75) recorded.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                    {/* Prominence */}
                    {prominenceScales.map(s => (
                      <div key={s.id} style={{
                        padding: '0.5rem 0.75rem',
                        backgroundColor: 'var(--danger-light)',
                        borderLeft: '3px solid var(--danger)',
                        borderRadius: '4px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                          <span style={{ color: 'var(--text-primary)' }}>{s.name} ({s.id})</span>
                          <span style={{ color: 'var(--danger)' }}>BR = {s.baseRate} [Prominent]</span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Presence */}
                    {presenceScales.map(s => (
                      <div key={s.id} style={{
                        padding: '0.5rem 0.75rem',
                        backgroundColor: 'var(--warning-light)',
                        borderLeft: '3px solid var(--warning)',
                        borderRadius: '4px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                          <span style={{ color: 'var(--text-primary)' }}>{s.name} ({s.id})</span>
                          <span style={{ color: 'var(--warning)' }}>BR = {s.baseRate} [Present]</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }} className="no-print">
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

          {/* Inputs Grid by Category */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="glass-panel">
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)' }}>
              Base Rate Entry
            </h3>

            {Object.keys(groupedScales).map(catKey => (
              <div key={catKey} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  {getCategoryLabel(catKey)}
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                  gap: '0.75rem'
                }}>
                  {groupedScales[catKey].map(scale => {
                    const isElevated = scale.baseRate >= 85;
                    const isPresent = scale.baseRate >= 75 && scale.baseRate < 85;
                    
                    let bg = 'var(--bg-surface)';
                    let border = 'var(--border)';
                    if (isElevated) { bg = 'var(--danger-light)'; border = 'var(--danger)30'; }
                    else if (isPresent) { bg = 'var(--warning-light)'; border = 'var(--warning)30'; }

                    return (
                      <div key={scale.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.4rem 0.625rem',
                        borderRadius: 'var(--radius-sm)',
                        border: `1px solid ${border}`,
                        backgroundColor: bg,
                        gap: '0.5rem'
                      }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={scale.name}>
                          <strong>{scale.id}</strong>: {scale.name.split(' (')[0]}
                        </span>
                        <input
                          type="number"
                          min="0"
                          max="115"
                          value={scale.baseRate}
                          onChange={(e) => handleBaseRateChange(scale.id, e.target.value)}
                          className="form-input"
                          style={{ width: '55px', padding: '0.2rem', textAlign: 'center', fontSize: '0.8rem' }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {activeTab === 'learning' && (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>
              MCMI-III Profile Reference
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
                <strong>Clinical Target:</strong> {scaleSummaries['mcmi']?.target || 'Clinical evaluation'}
              </div>
              <div>
                <strong>Est. Time:</strong> {scaleSummaries['mcmi']?.time || 'Variable'}
              </div>
              <div>
                <strong>Administration:</strong> {scaleSummaries['mcmi']?.admin || 'Standard'}
              </div>
              <div>
                <strong>Key Cutoffs:</strong> <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{scaleSummaries['mcmi']?.cutoffs || 'Refer to manual'}</span>
              </div>
            </div>
            <div style={{ fontSize: '0.825rem', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
              <strong>Primary Clinical Action:</strong> {scaleSummaries['mcmi']?.action || 'Clinical baseline assessment'}
            </div>
          </div>


          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Conceptual Model & Theodore Millon</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{scaleLearningDb.mcmi.history}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Target Clinical Indications</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{scaleLearningDb.mcmi.indications}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Administration Rules</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{scaleLearningDb.mcmi.administration}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Base Rate (BR) Scoring & Interpretive Cut-offs</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{scaleLearningDb.mcmi.scoringGuide}</p>
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
              Ethical Boundaries & Clinical Misuses
            </h3>
            <p style={{ fontSize: '0.825rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>{scaleLearningDb.mcmi.ethicalConsiderations}</p>
          </div>
        </div>
      )}

      {/* STATISTICS TAB */}
      {activeTab === 'statistics' && scaleLearningDb.mcmi && (
        <div className="glass-panel tutorial-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            <TrendingUp size={22} style={{ color: 'var(--primary)' }} />
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', margin: 0 }}>
              How to Score & Statistics Tutorial
            </h2>
          </div>
          <TutorialContent text={scaleLearningDb.mcmi.scoringTutorial} />
        </div>
      )}
    </div>
  );
};

