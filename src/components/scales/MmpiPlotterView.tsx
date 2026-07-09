import React, { useState, useEffect } from 'react';
import { 
  mmpiScalesDefault, 
  calculateMmpiTScores, 
  type MmpiScale 
} from '../../modules/personalityScales';
import { scaleLearningDb } from '../../modules/learningContent';
import { usePatient } from '../PatientContext';
import { TutorialContent } from '../TutorialContent';
import { 
  ClipboardCheck, 
  RotateCcw, 
  Save, 
  BookOpen, 
  AlertTriangle, 
  Check,
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

export const MmpiPlotterView: React.FC = () => {
  const { patient, saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning' | 'statistics'>('assessment');
  
  // Local gender selection override if no patient is set
  const [genderOverride, setGenderOverride] = useState<'Male' | 'Female'>('Male');
  const activeGender = patient.gender === 'Male' || patient.gender === 'Female' ? patient.gender : genderOverride;

  const [scales, setScales] = useState<MmpiScale[]>(() => {
    if (reports.mmpi && reports.mmpi.scales) {
      return reports.mmpi.scales;
    }
    return mmpiScalesDefault;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (reports.mmpi && reports.mmpi.scales) {
      setScales(reports.mmpi.scales);
    }
  }, [reports.mmpi]);

  const handleRawScoreChange = (id: string, val: string) => {
    const raw = val === '' ? 0 : Math.max(0, Math.min(100, parseInt(val, 10)));
    setScales(prev => prev.map(s => s.id === id ? { ...s, rawScore: raw } : s));
    setSavedSuccess(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset all MMPI-2 raw scores to default?')) {
      setScales(mmpiScalesDefault);
      setSavedSuccess(false);
    }
  };

  // Convert raw scores to T-scores
  const processedScales = calculateMmpiTScores(scales, activeGender);

  const handleSaveReport = () => {
    const reportData = {
      scaleName: 'MMPI-2 Clinical Profile Plotter',
      genderUsed: activeGender,
      scales: processedScales,
      patientName: patient.name || 'Anonymous'
    };
    saveReport('mmpi', reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Validity scales (L, F, K) and Clinical scales (Hs to Si)
  const validityScales = processedScales.filter(s => ['L', 'F', 'K'].includes(s.id));
  const clinicalScales = processedScales.filter(s => !['L', 'F', 'K'].includes(s.id));

  // SVG dimensions
  const chartWidth = 550;
  const chartHeight = 280;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const dataWidth = chartWidth - paddingLeft - paddingRight;
  const dataHeight = chartHeight - paddingTop - paddingBottom;

  const getX = (index: number, total: number) => {
    return paddingLeft + (index / (total - 1)) * dataWidth;
  };

  const getY = (tScore: number) => {
    // scale from 30 to 120
    const ratio = (tScore - 30) / 90; // 90 points range
    return paddingTop + dataHeight - ratio * dataHeight;
  };

  // Get elevated scales list
  const elevatedScales = clinicalScales.filter(s => s.tScore >= 65);

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
          
          {/* Main Visualizer Panel */}
          <div className="glass-panel grid-cols-2" style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '1.5rem',
            alignItems: 'start'
          }}>
            
            {/* Chart Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <div style={{ alignSelf: 'stretch', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Multiphasic Profile (T-Scores)
                </span>
                
                {/* Gender Toggle override */}
                {!patient.gender && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="no-print">
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Norms Gender:</span>
                    <select
                      value={genderOverride}
                      onChange={(e) => setGenderOverride(e.target.value as any)}
                      className="form-input"
                      style={{ padding: '0.2rem 0.5rem', width: '90px', fontSize: '0.75rem' }}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                )}
              </div>

              {/* SVG MMPI Profile Grid */}
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <svg width={chartWidth} height={chartHeight} style={{ overflow: 'visible' }}>
                  {/* Highlight Clinical Elevation zone (T >= 65) */}
                  <rect 
                    x={paddingLeft} 
                    y={getY(120)} 
                    width={dataWidth} 
                    height={getY(65) - getY(120)} 
                    fill="var(--danger-light)" 
                    opacity="0.3"
                  />

                  {/* Grid Lines */}
                  {[30, 40, 50, 60, 65, 70, 80, 90, 100, 110, 120].map(gl => {
                    const y = getY(gl);
                    const isMean = gl === 50;
                    const isCutoff = gl === 65;
                    return (
                      <g key={gl}>
                        <line
                          x1={paddingLeft}
                          y1={y}
                          x2={chartWidth - paddingRight}
                          y2={y}
                          stroke={isMean ? 'var(--primary)' : isCutoff ? 'var(--danger)' : 'var(--border)'}
                          strokeWidth={isMean || isCutoff ? 1.5 : 0.8}
                          strokeDasharray={isMean || isCutoff ? '0' : '2 2'}
                        />
                        <text x={paddingLeft - 8} y={y + 3} textAnchor="end" fontSize="9" fill={isCutoff ? 'var(--danger)' : 'var(--text-muted)'} fontWeight={isCutoff ? 'bold' : 'normal'}>
                          {gl === 65 ? '65 (Elevated)' : gl}
                        </text>
                      </g>
                    );
                  })}

                  {/* Split line between Validity and Clinical */}
                  <line 
                    x1={paddingLeft + (2.5 / 12) * dataWidth} 
                    y1={getY(30)} 
                    x2={paddingLeft + (2.5 / 12) * dataWidth} 
                    y2={getY(120)} 
                    stroke="var(--text-muted)" 
                    strokeWidth={1.5}
                  />
                  
                  {/* Connect Validity Nodes */}
                  {validityScales.map((s, i) => {
                    if (i === validityScales.length - 1) return null;
                    const x1 = getX(i, 13);
                    const y1 = getY(s.tScore);
                    const x2 = getX(i + 1, 13);
                    const y2 = getY(validityScales[i + 1].tScore);
                    return <line key={`v-line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--text-secondary)" strokeWidth={2} />;
                  })}

                  {/* Connect Clinical Nodes */}
                  {clinicalScales.map((s, i) => {
                    if (i === clinicalScales.length - 1) return null;
                    const x1 = getX(i + 3, 13); // clinical start after index 3
                    const y1 = getY(s.tScore);
                    const x2 = getX(i + 4, 13);
                    const y2 = getY(clinicalScales[i + 1].tScore);
                    return <line key={`c-line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--primary)" strokeWidth={2} />;
                  })}

                  {/* All Nodes and Labels */}
                  {processedScales.map((s, i) => {
                    const x = getX(i, 13);
                    const y = getY(s.tScore);
                    const isVal = i < 3;
                    const isElevated = s.tScore >= 65;

                    return (
                      <g key={s.id}>
                        <circle
                          cx={x}
                          cy={y}
                          r={4}
                          fill={isElevated ? 'var(--danger)' : isVal ? 'var(--text-secondary)' : 'var(--primary)'}
                          stroke="var(--bg-surface)"
                          strokeWidth={1.2}
                        />
                        {/* Text Score label */}
                        <text x={x} y={y - 8} textAnchor="middle" fontSize="9" fontWeight="700" fill={isElevated ? 'var(--danger)' : 'var(--text-primary)'}>
                          {s.tScore}
                        </text>
                        {/* X-axis Code Label */}
                        <text x={x} y={chartHeight - 12} textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">
                          {s.id}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Interpretation Column */}
            <div className="glass-panel" style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>
                  Elevated Scales (T &ge; 65)
                </h3>
                {elevatedScales.length === 0 ? (
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    No clinical scale elevations detected (all clinical T-scores are within the normal range &lt; 65).
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {elevatedScales.map(scale => (
                      <div key={scale.id} style={{
                        padding: '0.75rem',
                        backgroundColor: 'var(--danger-light)',
                        borderLeft: '3px solid var(--danger)',
                        borderRadius: '4px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {scale.name} ({scale.number})
                          </span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--danger)' }}>
                            T = {scale.tScore}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                          {scale.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

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

          {/* Raw Score Inputs Grid */}
          <div className="glass-panel">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>
              Raw Score Entry
            </h3>

            {/* Validity Scales */}
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Validity Indicators (L, F, K)
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {validityScales.map(scale => (
                  <div key={scale.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', minWidth: '40px' }}>
                      {scale.id}:
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={scale.rawScore}
                      onChange={(e) => handleRawScoreChange(scale.id, e.target.value)}
                      className="form-input"
                      style={{ width: '60px', padding: '0.25rem', textAlign: 'center' }}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>T = {scale.tScore}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Scales */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Clinical Scales (Scale 1 to 10)
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '1rem'
              }}>
                {clinicalScales.map(scale => (
                  <div key={scale.id} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-input)',
                    gap: '0.25rem'
                  }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {scale.name}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <input
                        type="number"
                        min="0"
                        max="80"
                        value={scale.rawScore}
                        onChange={(e) => handleRawScoreChange(scale.id, e.target.value)}
                        className="form-input"
                        style={{ width: '60px', padding: '0.2rem 0.4rem', textAlign: 'center' }}
                      />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: scale.tScore >= 65 ? 'var(--danger)' : 'var(--primary)' }}>
                        T = {scale.tScore}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {activeTab === 'learning' && (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>
              MMPI-2 Clinical Scale Reference
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
                <strong>Clinical Target:</strong> {scaleSummaries['mmpi']?.target || 'Clinical evaluation'}
              </div>
              <div>
                <strong>Est. Time:</strong> {scaleSummaries['mmpi']?.time || 'Variable'}
              </div>
              <div>
                <strong>Administration:</strong> {scaleSummaries['mmpi']?.admin || 'Standard'}
              </div>
              <div>
                <strong>Key Cutoffs:</strong> <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{scaleSummaries['mmpi']?.cutoffs || 'Refer to manual'}</span>
              </div>
            </div>
            <div style={{ fontSize: '0.825rem', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
              <strong>Primary Clinical Action:</strong> {scaleSummaries['mmpi']?.action || 'Clinical baseline assessment'}
            </div>
          </div>


          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>History & Conceptual Framework</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{scaleLearningDb.mmpi.history}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Indications & Scope</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{scaleLearningDb.mmpi.indications}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Administration Prerequisites</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{scaleLearningDb.mmpi.administration}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Scoring Principles & T-Scores Explanation</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{scaleLearningDb.mmpi.scoringGuide}</p>
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
              Ethical Usage & Protection of Test Integrity
            </h3>
            <p style={{ fontSize: '0.825rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>{scaleLearningDb.mmpi.ethicalConsiderations}</p>
          </div>
        </div>
      )}

      {/* STATISTICS TAB */}
      {activeTab === 'statistics' && scaleLearningDb.mmpi && (
        <div className="glass-panel tutorial-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            <TrendingUp size={22} style={{ color: 'var(--primary)' }} />
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', margin: 0 }}>
              How to Score & Statistics Tutorial
            </h2>
          </div>
          <TutorialContent text={scaleLearningDb.mmpi.scoringTutorial} />
        </div>
      )}
    </div>
  );
};

