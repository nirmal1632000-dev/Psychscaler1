import React, { useState, useEffect } from 'react';
import { 
  type RorschachResponse, 
  calculateRorschachSummary 
} from '../../modules/projectiveScales';
import { scaleLearningDb } from '../../modules/learningContent';
import { usePatient } from '../PatientContext';
import { TutorialContent } from '../TutorialContent';
import { 
  ClipboardCheck, 
  RotateCcw, 
  Save, 
  BookOpen, 
  Check, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  Table, 
  ListPlus,
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

export const RorschachView: React.FC = () => {
  const { patient, saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning' | 'statistics'>('assessment');
  const [responses, setResponses] = useState<RorschachResponse[]>(() => {
    if (reports.rorschach && reports.rorschach.responses) {
      return reports.rorschach.responses;
    }
    return [];
  });
  
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form state for adding a response
  const [card, setCard] = useState<'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X'>('I');
  const [loc, setLoc] = useState<'W' | 'D' | 'Dd'>('W');
  const [space, setSpace] = useState(false);
  const [dq, setDq] = useState<'+' | 'o' | 'v/+' | 'v'>('o');
  const [fq, setFq] = useState<'+' | 'o' | 'u' | '-' | 'none'>('o');
  const [popular, setPopular] = useState(false);
  
  // Determinants select
  const [selectedDets, setSelectedDets] = useState<string[]>(['F']);
  const [contentInput, setContentInput] = useState('A');
  const [specialScoresInput, setSpecialScoresInput] = useState('');
  const [patientWording, setPatientWording] = useState('');

  useEffect(() => {
    if (reports.rorschach && reports.rorschach.responses) {
      setResponses(reports.rorschach.responses);
    }
  }, [reports.rorschach]);

  const handleAddResponse = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse contents and special scores
    const contents = contentInput.split(',').map(c => c.trim().toUpperCase()).filter(c => c !== '');
    const specialScores = specialScoresInput.split(',').map(s => s.trim().toUpperCase()).filter(s => s !== '');

    const newResponse: RorschachResponse = {
      id: Date.now(),
      card,
      responseNum: responses.length + 1,
      location: loc,
      space,
      dq,
      determinants: selectedDets,
      fq,
      content: contents,
      popular,
      specialScores,
      patientWording
    };

    setResponses(prev => [...prev, newResponse]);
    setSavedSuccess(false);

    // Reset entry fields partially
    setSpace(false);
    setPopular(false);
    setSelectedDets(['F']);
    setContentInput('A');
    setSpecialScoresInput('');
    setPatientWording('');
  };

  const handleDeleteResponse = (id: number) => {
    setResponses(prev => prev.filter(r => r.id !== id).map((r, i) => ({ ...r, responseNum: i + 1 })));
    setSavedSuccess(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset all Rorschach responses entered?')) {
      setResponses([]);
      setSavedSuccess(false);
    }
  };

  const summary = calculateRorschachSummary(responses);

  const handleSaveReport = () => {
    const reportData = {
      scaleName: 'Rorschach Comprehensive System Structural Assistant',
      responses,
      summary,
      patientName: patient.name || 'Anonymous'
    };
    saveReport('rorschach', reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const toggleDet = (det: string) => {
    setSelectedDets(prev => 
      prev.includes(det) ? prev.filter(x => x !== det) : [...prev, det]
    );
  };

  const determinantList = [
    'F', 'M', 'FM', 'm', 'FC', 'CF', 'C', 'Cn', 
    'FC\'', 'CF\'', 'C\'', 'FT', 'TF', 'T', 'FV', 
    'VF', 'V', 'FY', 'YF', 'Y', 'FD', 'Fr', 'rF', '2'
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
          <span>Interactive Sequence Coder</span>
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
          
          {/* Quick Stats Summary Banner */}
          <div className="glass-panel" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            background: 'var(--bg-surface)',
            borderLeft: '5px solid var(--primary)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Rorschach Exner Structural Summary
              </div>
              <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', margin: '0.2rem 0' }}>
                Responses coded: {summary.totalResponses} (R)
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                <span className="badge badge-primary">EB: {summary.ratios.eb}</span>
                <span className="badge badge-teal">EA: {summary.ratios.ea}</span>
                <span className="badge badge-success">es: {summary.ratios.es}</span>
                <span className="badge badge-warning">Lambda: {summary.ratios.lambda}</span>
                <span className="badge badge-danger">Afr: {summary.ratios.afr}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }} className="no-print">
              <button onClick={handleReset} className="btn btn-secondary">
                <RotateCcw size={16} />
                <span>Reset Sequence</span>
              </button>
              <button
                onClick={handleSaveReport}
                className="btn btn-primary"
                disabled={!patient.name || responses.length === 0}
                style={{ backgroundColor: savedSuccess ? 'var(--success)' : 'var(--primary)' }}
              >
                {savedSuccess ? <Check size={16} /> : <Save size={16} />}
                <span>{savedSuccess ? 'Saved' : 'Save Summary'}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }} className="grid-cols-2">
            
            {/* Input Form & Response List Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Form */}
              <div className="glass-panel no-print">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)' }}>
                  <ListPlus size={16} style={{ color: 'var(--primary)' }} />
                  Add Response Code
                </h3>
                
                <form onSubmit={handleAddResponse}>
                  <div className="grid-cols-4" style={{ gap: '0.75rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Card</label>
                      <select value={card} onChange={e => setCard(e.target.value as any)} className="form-input" style={{ padding: '0.4rem' }}>
                        {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Location</label>
                      <select value={loc} onChange={e => setLoc(e.target.value as any)} className="form-input" style={{ padding: '0.4rem' }}>
                        <option value="W">W</option>
                        <option value="D">D</option>
                        <option value="Dd">Dd</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>DQ</label>
                      <select value={dq} onChange={e => setDq(e.target.value as any)} className="form-input" style={{ padding: '0.4rem' }}>
                        <option value="+">+</option>
                        <option value="o">o</option>
                        <option value="v/+">v/+</option>
                        <option value="v">v</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>FQ</label>
                      <select value={fq} onChange={e => setFq(e.target.value as any)} className="form-input" style={{ padding: '0.4rem' }}>
                        <option value="+">+</option>
                        <option value="o">o</option>
                        <option value="u">u</option>
                        <option value="-">-</option>
                        <option value="none">none</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Patient Verbalization / Wording</label>
                    <textarea
                      value={patientWording}
                      onChange={e => setPatientWording(e.target.value)}
                      placeholder="e.g. 'A giant bat with red wings flying over a hill...'"
                      className="form-input"
                      rows={2}
                      style={{ padding: '0.4rem', fontSize: '0.8rem', resize: 'vertical' }}
                    />
                  </div>

                  {/* Determinants Checklist */}
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Determinants</label>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.25rem',
                      maxHeight: '80px',
                      overflowY: 'auto',
                      border: '1px solid var(--border)',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-input)'
                    }}>
                      {determinantList.map(det => {
                        const isSel = selectedDets.includes(det);
                        return (
                          <button
                            type="button"
                            key={det}
                            onClick={() => toggleDet(det)}
                            style={{
                              padding: '0.15rem 0.4rem',
                              fontSize: '0.75rem',
                              borderRadius: '3px',
                              border: `1px solid ${isSel ? 'var(--primary)' : 'var(--border)'}`,
                              backgroundColor: isSel ? 'var(--primary-light)' : 'var(--bg-surface)',
                              color: isSel ? 'var(--primary)' : 'var(--text-secondary)',
                              cursor: 'pointer'
                            }}
                          >
                            {det}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid-cols-2" style={{ gap: '0.75rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Content (comma-separated)</label>
                      <input
                        type="text"
                        value={contentInput}
                        onChange={e => setContentInput(e.target.value)}
                        placeholder="e.g. H, Cg"
                        className="form-input"
                        style={{ padding: '0.4rem' }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Special Scores (comma-sep)</label>
                      <input
                        type="text"
                        value={specialScoresInput}
                        onChange={e => setSpecialScoresInput(e.target.value)}
                        placeholder="e.g. AG, COP"
                        className="form-input"
                        style={{ padding: '0.4rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={space} onChange={e => setSpace(e.target.checked)} style={{ accentColor: 'var(--primary)' }} />
                        <span>Space (S)</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={popular} onChange={e => setPopular(e.target.checked)} style={{ accentColor: 'var(--primary)' }} />
                        <span>Popular (P)</span>
                      </label>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                      <Plus size={14} />
                      <span>Add Code</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Response List Table */}
              <div className="glass-panel">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                  Sequence of Scores Coded
                </h3>
                {responses.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    No responses coded yet. Use the entry builder above to record sequence codes.
                  </p>
                ) : (
                  <div className="table-container" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    <table className="scoring-table" style={{ fontSize: '0.8rem' }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'center' }}>No.</th>
                          <th>Card</th>
                          <th>Patient Wording</th>
                          <th>Loc</th>
                          <th>DQ</th>
                          <th>Determinants</th>
                          <th>FQ</th>
                          <th>Content</th>
                          <th>P</th>
                          <th>Special</th>
                          <th className="no-print" style={{ width: '40px' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {responses.map(r => (
                          <tr key={r.id}>
                            <td style={{ textAlign: 'center' }}>{r.responseNum}</td>
                            <td>Card {r.card}</td>
                            <td style={{ fontSize: '0.75rem', fontStyle: 'italic', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.patientWording}>
                              {r.patientWording || '-'}
                            </td>
                            <td>{r.location}{r.space ? 'S' : ''}</td>
                            <td>{r.dq}</td>
                            <td style={{ fontWeight: 600 }}>{r.determinants.join('.')}</td>
                            <td>{r.fq}</td>
                            <td>{r.content.join(',')}</td>
                            <td>{r.popular ? 'P' : ''}</td>
                            <td style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{r.specialScores.join(', ')}</td>
                            <td className="no-print">
                              <button 
                                onClick={() => handleDeleteResponse(r.id)} 
                                style={{ border: 'none', background: 'none', color: 'var(--danger)', cursor: 'pointer' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>

            {/* Structural Summary Column */}
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)' }}>
                <Table size={18} style={{ color: 'var(--primary)' }} />
                Rorschach CS Structural Summary Table
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1rem' }} className="grid-cols-2">
                {/* Le col: Counts */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      Locations (Loc)
                    </div>
                    <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>W (Whole):</span> <strong>{summary.locationCounts.W}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>D (Common):</span> <strong>{summary.locationCounts.D}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Dd (Unusual):</span> <strong>{summary.locationCounts.Dd}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>S (Space):</span> <strong>{summary.locationCounts.S}</strong></div>
                    </div>
                  </div>

                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      Developmental Quality (DQ)
                    </div>
                    <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>+ (Synthesized):</span> <strong>{summary.dqCounts['+']}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>o (Ordinary):</span> <strong>{summary.dqCounts.o}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>v/+ (Vague-Synth):</span> <strong>{summary.dqCounts['v/+']}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>v (Vague):</span> <strong>{summary.dqCounts.v}</strong></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      Form Quality (FQ)
                    </div>
                    <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>+ (Superior):</span> <strong>{summary.fqCounts['+']}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>o (Ordinary):</span> <strong>{summary.fqCounts.o}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>u (Unusual):</span> <strong>{summary.fqCounts.u}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>- (Minus):</span> <strong>{summary.fqCounts['-']}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>none (No FQ):</span> <strong>{summary.fqCounts.none}</strong></div>
                    </div>
                  </div>
                </div>

                {/* Right col: Core Ratios & Indices */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{
                    backgroundColor: 'var(--bg-app)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      Calculated Core Ratios
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border)', paddingBottom: '0.15rem' }}>
                        <span>EB (Experience Balance):</span> 
                        <strong style={{ color: 'var(--primary)' }}>{summary.ratios.eb}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border)', paddingBottom: '0.15rem' }}>
                        <span>EA (Experience Actual):</span> 
                        <strong style={{ color: 'var(--success)' }}>{summary.ratios.ea}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border)', paddingBottom: '0.15rem' }}>
                        <span>eb (Experience Base):</span> 
                        <strong>{summary.ratios.ebBase}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border)', paddingBottom: '0.15rem' }}>
                        <span>es (Stimulation):</span> 
                        <strong>{summary.ratios.es}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border)', paddingBottom: '0.15rem' }}>
                        <span>Lambda (Pure F Ratio):</span> 
                        <strong style={{ color: 'var(--warning)' }}>{summary.ratios.lambda}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Afr (Affect Ratio):</span> 
                        <strong style={{ color: 'var(--danger)' }}>{summary.ratios.afr}</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>Key Interpretations:</div>
                    ? <strong>EB</strong> reflects basic coping style (Introversive vs. Extratensive).<br />
                    ? <strong>Lambda</strong> measures cognitive economy; &gt;0.99 suggest simplified processing.
                  </div>
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
              Rorschach CS (Exner Comprehensive System) Reference
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
                <strong>Clinical Target:</strong> {scaleSummaries['rorschach']?.target || 'Clinical evaluation'}
              </div>
              <div>
                <strong>Est. Time:</strong> {scaleSummaries['rorschach']?.time || 'Variable'}
              </div>
              <div>
                <strong>Administration:</strong> {scaleSummaries['rorschach']?.admin || 'Standard'}
              </div>
              <div>
                <strong>Key Cutoffs:</strong> <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{scaleSummaries['rorschach']?.cutoffs || 'Refer to manual'}</span>
              </div>
            </div>
            <div style={{ fontSize: '0.825rem', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
              <strong>Primary Clinical Action:</strong> {scaleSummaries['rorschach']?.action || 'Clinical baseline assessment'}
            </div>
          </div>


          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Background & Exner System</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{scaleLearningDb.rorschach.history}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Clinical Indications</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{scaleLearningDb.rorschach.indications}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Administration Rules</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{scaleLearningDb.rorschach.administration}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Structural Summary Variables Rationale</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{scaleLearningDb.rorschach.scoringGuide}</p>
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
              Ethical Usage & Protection of Stimulus Security
            </h3>
            <p style={{ fontSize: '0.825rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>{scaleLearningDb.rorschach.ethicalConsiderations}</p>
          </div>
        </div>
      )}

      {/* STATISTICS TAB */}
      {activeTab === 'statistics' && scaleLearningDb.rorschach && (
        <div className="glass-panel tutorial-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
            <TrendingUp size={22} style={{ color: 'var(--primary)' }} />
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', margin: 0 }}>
              How to Score & Statistics Tutorial
            </h2>
          </div>
          <TutorialContent text={scaleLearningDb.rorschach.scoringTutorial} />
        </div>
      )}
    </div>
  );
};

