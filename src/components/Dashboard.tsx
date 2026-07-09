import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  UserCheck, 
  Brain, 
  Cpu, 
  User, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { usePatient } from './PatientContext';
import type { ScaleCategory } from '../types';

export const SCALES = [
  { 
    id: 'bdi', 
    name: 'BDI-II', 
    fullName: 'Beck Depression Inventory (BDI-II)', 
    category: 'psychiatric', 
    shortDesc: '21-item standardized questionnaire assessing cognitive, emotional, and physical indicators of clinical depression.', 
    timeEstimate: '5-10 mins', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'ymrs', 
    name: 'YMRS', 
    fullName: 'Young Mania Rating Scale (YMRS)', 
    category: 'psychiatric', 
    shortDesc: '11-item clinician-administered rating scale measuring the presence and severity of manic symptoms.', 
    timeEstimate: '15-30 mins', 
    administeredBy: 'Clinician' 
  },
  { 
    id: 'ybocs', 
    name: 'Y-BOCS', 
    fullName: 'Yale-Brown Obsessive Compulsive Scale (Y-BOCS)', 
    category: 'psychiatric', 
    shortDesc: '10-item interview measuring the severity and characteristics of obsessions and compulsions.', 
    timeEstimate: '15-25 mins', 
    administeredBy: 'Clinician' 
  },
  { 
    id: 'hama', 
    name: 'HAM-A', 
    fullName: 'Hamilton Anxiety Rating Scale (HAM-A)', 
    category: 'psychiatric', 
    shortDesc: '14-item clinician-administered rating scale measuring the severity of psychic and somatic anxiety symptoms.', 
    timeEstimate: '15-30 mins', 
    administeredBy: 'Clinician' 
  },
  { 
    id: 'hamd', 
    name: 'HAMD-17', 
    fullName: 'Hamilton Depression Rating Scale (HAMD-17)', 
    category: 'psychiatric', 
    shortDesc: '17-item clinician-administered historical gold standard scale for rating depressive symptom severity.', 
    timeEstimate: '15-20 mins', 
    administeredBy: 'Clinician' 
  },
  { 
    id: 'asrs', 
    name: 'ASRS', 
    fullName: 'Adult ADHD Self-Report Scale (ASRS-v1.1)', 
    category: 'psychiatric', 
    shortDesc: '18-item self-report screening tool designed by the WHO to check adult ADHD symptoms.', 
    timeEstimate: '5-10 mins', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'aims', 
    name: 'AIMS', 
    fullName: 'Abnormal Involuntary Movement Scale (AIMS)', 
    category: 'psychiatric', 
    shortDesc: '12-item clinician-administered observation scale to monitor and detect tardive dyskinesia.', 
    timeEstimate: '10 mins', 
    administeredBy: 'Clinician' 
  },
  { 
    id: 'audit', 
    name: 'AUDIT', 
    fullName: 'Alcohol Use Disorders Identification Test (AUDIT)', 
    category: 'psychiatric', 
    shortDesc: '10-item WHO questionnaire screening for hazardous, harmful, or dependent alcohol consumption.', 
    timeEstimate: '2-5 mins', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'wais', 
    name: 'Wechsler IQ', 
    fullName: 'Wechsler Intelligence Scales (WAIS-IV / WISC-V)', 
    category: 'intelligence', 
    shortDesc: 'Cognitive profile and composite index generator. Computes VCI, VSI, FRI, WMI, PSI, GAI, and FSIQ.', 
    timeEstimate: '60-90 mins', 
    administeredBy: 'Clinician' 
  },
  { 
    id: 'misic', 
    name: 'MISIC', 
    fullName: 'Malin\'s Intelligence Scale for Indian Children', 
    category: 'intelligence', 
    shortDesc: 'Indian adaptation of WISC; calculates Verbal, Performance, and Full Scale IQ with profile charting.', 
    timeEstimate: '60-90 mins', 
    administeredBy: 'Clinician' 
  },
  { 
    id: 'mmpi', 
    name: 'MMPI-2', 
    fullName: 'MMPI-2 Clinical Profile Plotter', 
    category: 'personality', 
    shortDesc: 'Generates classic multiphasic profiles. Converts raw scores to validity and clinical T-scores with elevations.', 
    timeEstimate: '10 mins', 
    administeredBy: 'Clinician' 
  },
  { 
    id: 'mcmi', 
    name: 'MCMI-III', 
    fullName: 'MCMI-III Personality Profile Plotter', 
    category: 'personality', 
    shortDesc: 'Plots diagnostic Base Rate (BR) scores for Millon personality patterns and clinical syndromes.', 
    timeEstimate: '5 mins', 
    administeredBy: 'Clinician' 
  },
  { 
    id: 'dap', 
    name: 'Draw-a-Person', 
    fullName: 'Draw-a-Person (DAP) Checklist', 
    category: 'personality', 
    shortDesc: 'Qualitative observation workpad for structural indicators (emotional signs, motor quality, integration).', 
    timeEstimate: '10-15 mins', 
    administeredBy: 'Clinician' 
  },
  { 
    id: 'rorschach', 
    name: 'Rorschach CS', 
    fullName: 'Rorschach Structural Summary Assistant', 
    category: 'projective', 
    shortDesc: 'Response coder and structural calculator. Automates EB, EA, eb, es, Lambda, Zd, and Afr ratios.', 
    timeEstimate: '30-45 mins', 
    administeredBy: 'Clinician' 
  },
  { 
    id: 'tat', 
    name: 'TAT / CAT', 
    fullName: 'Thematic Apperception Test Story Workpad', 
    category: 'projective', 
    shortDesc: 'Narrative workpad applying Morgan-Murray\'s Needs-Press analysis across standard apperception cards.', 
    timeEstimate: '30-60 mins', 
    administeredBy: 'Clinician' 
  }
,
  { 
    id: 'phq9', 
    name: 'PHQ-9', 
    fullName: 'Patient Health Questionnaire-9 (PHQ-9)', 
    category: 'psychiatric', 
    shortDesc: '9-item self-report depression scale mapping DSM-5 diagnostic criteria for severity tracking.', 
    timeEstimate: '3 mins', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'gad7', 
    name: 'GAD-7', 
    fullName: 'Generalized Anxiety Disorder 7-item (GAD-7)', 
    category: 'psychiatric', 
    shortDesc: '7-item self-report anxiety tracker commonly used to measure GAD severity in clinical settings.', 
    timeEstimate: '2 mins', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'bai', 
    name: 'BAI', 
    fullName: 'Beck Anxiety Inventory (BAI)', 
    category: 'psychiatric', 
    shortDesc: '21-item self-report focusing on physiological/somatic hyperarousal anxiety symptoms.', 
    timeEstimate: '5 mins', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'aq10', 
    name: 'AQ-10', 
    fullName: 'Autism Spectrum Quotient-10 (AQ-10)', 
    category: 'psychiatric', 
    shortDesc: '10-item brief screening tool for adults with suspected autism spectrum conditions.', 
    timeEstimate: '2 mins', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'mdq', 
    name: 'MDQ', 
    fullName: 'Mood Disorder Questionnaire (MDQ)', 
    category: 'psychiatric', 
    shortDesc: '15-item self-report screener for bipolar spectrum traits, co-occurrence, and impairment.', 
    timeEstimate: '5 mins', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'des2', 
    name: 'DES-II', 
    fullName: 'Dissociative Experiences Scale (DES-II)', 
    category: 'psychiatric', 
    shortDesc: '28-item self-report screening tool for dissociative disorders and trauma pathology.', 
    timeEstimate: '10 mins', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'phq15', 
    name: 'PHQ-15', 
    fullName: 'Patient Health Questionnaire-15 (PHQ-15)', 
    category: 'psychiatric', 
    shortDesc: '15-item self-report screening tool for somatic symptom severity and somatization.', 
    timeEstimate: '5 mins', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'eat26', 
    name: 'EAT-26', 
    fullName: 'Eating Attitudes Test (EAT-26)', 
    category: 'psychiatric', 
    shortDesc: '26-item questionnaire screening eating disorder risk, anorexia, and bulimia indicators.', 
    timeEstimate: '5 mins', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'scoff', 
    name: 'SCOFF', 
    fullName: 'SCOFF Eating Disorder Screener', 
    category: 'psychiatric', 
    shortDesc: '5-item brief verbal screening tool for rapid anorexia/bulimia risk identification.', 
    timeEstimate: '1 min', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'cage', 
    name: 'CAGE', 
    fullName: 'CAGE Alcohol Screening Questionnaire', 
    category: 'psychiatric', 
    shortDesc: '4-item brief verbal screening tool for alcohol abuse and dependence indicators.', 
    timeEstimate: '1 min', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'dast10', 
    name: 'DAST-10', 
    fullName: 'Drug Abuse Screening Test (DAST-10)', 
    category: 'psychiatric', 
    shortDesc: '10-item self-report screening tool for drug abuse, consequences, and severity.', 
    timeEstimate: '2 mins', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'gds30', 
    name: 'GDS-30', 
    fullName: 'Geriatric Depression Scale (GDS-30)', 
    category: 'psychiatric', 
    shortDesc: '30-item yes/no screener for geriatric depression avoiding somatic aging biases.', 
    timeEstimate: '10 mins', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'ess', 
    name: 'ESS', 
    fullName: 'Epworth Sleepiness Scale (ESS)', 
    category: 'psychiatric', 
    shortDesc: '8-item self-report measuring daytime sleepiness probability in common situations.', 
    timeEstimate: '2 mins', 
    administeredBy: 'Patient' 
  },
  { 
    id: 'bis11', 
    name: 'BIS-11', 
    fullName: 'Barratt Impulsiveness Scale (BIS-11)', 
    category: 'psychiatric', 
    shortDesc: '30-item self-report gold standard questionnaire measuring cognitive and motor impulsivity.', 
    timeEstimate: '5-10 mins', 
    administeredBy: 'Patient' 
  },
  {
    id: 'mmse',
    name: 'MMSE',
    fullName: 'Mini-Mental State Examination (MMSE)',
    category: 'intelligence',
    shortDesc: '11-question cognitive screener assessing orientation, registration, attention, recall, and language.',
    timeEstimate: '5-10 mins',
    administeredBy: 'Clinician'
  },
  {
    id: 'wai',
    name: 'WAI',
    fullName: 'Working Alliance Inventory (WAI)',
    category: 'psychiatric',
    shortDesc: '36-item client/therapist instrument evaluating therapeutic bond, task agreement, and goal alignment.',
    timeEstimate: '15-20 mins',
    administeredBy: 'Clinician'
  },
  {
    id: 'psyrats',
    name: 'PSYRATS-AHS',
    fullName: 'PSYRATS Auditory Hallucinations Scale',
    category: 'psychiatric',
    shortDesc: '11-item clinician interview rating frequency, duration, loudness, distress, and control of voices.',
    timeEstimate: '15-20 mins',
    administeredBy: 'Clinician'
  },
  {
    id: 'oscars',
    name: 'OSCARS',
    fullName: 'Observable Social Cognition: A Rating Scale (OSCARS)',
    category: 'psychiatric',
    shortDesc: '8-item informant-rated scale measuring real-world social cognitive deficits in schizophrenia spectrum cases.',
    timeEstimate: '15-20 mins',
    administeredBy: 'Clinician'
  },
  {
    id: 'maccat',
    name: 'MacCAT-T',
    fullName: 'MacArthur Competence Assessment Tool-Treatment (MacCAT-T)',
    category: 'intelligence',
    shortDesc: 'Clinician-administered capacity evaluation tool assessing patient understanding, appreciation, reasoning, and choice expression.',
    timeEstimate: '15-20 mins',
    administeredBy: 'Clinician'
  },
  {
    id: 'conners',
    name: 'Conners ASQ',
    fullName: 'Conners Abbreviated Symptom Questionnaire (ASQ)',
    category: 'psychiatric',
    shortDesc: '10-item parent/informant rating scale screening childhood hyperactivity, impulsivity, and inattention traits.',
    timeEstimate: '5 mins',
    administeredBy: 'Patient'
  },
  {
    id: 'bkt',
    name: 'BKT IQ Coder',
    fullName: 'Binet-Kamat Test of Intelligence (BKT)',
    category: 'intelligence',
    shortDesc: 'Indian Stanford-Binet adaptation for ages 3-22. Standardized mental age scoring with Ratio and Prorated SD 15 IQ calculation.',
    timeEstimate: '30-45 mins',
    administeredBy: 'Clinician'
  },
  {
    id: 'dst',
    name: 'DST DQ Coder',
    fullName: 'Developmental Screening Test (DST)',
    category: 'intelligence',
    shortDesc: 'Dr. Bharat Raj\'s child development screener (0-15 Years). Milestone checklists calculating Developmental Age & Quotient.',
    timeEstimate: '10-15 mins',
    administeredBy: 'Clinician'
  },
  {
    id: 'cbcl',
    name: 'CBCL 6-18',
    fullName: 'Child Behavior Checklist (CBCL 6-18)',
    category: 'psychiatric',
    shortDesc: 'Parent-report screening tool tracking child internalizing, externalizing, and total behavioral syndrome problem scales.',
    timeEstimate: '15-20 mins',
    administeredBy: 'Patient'
  }];

interface DashboardProps {
  setActivePage: (page: string) => void;
  selectedCategoryFilter: any;
  setSelectedCategoryFilter: (cat: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActivePage, selectedCategoryFilter, setSelectedCategoryFilter }) => {
  const { patient, reports } = usePatient();
  const [search, setSearch] = useState('');
  const selectedCat = selectedCategoryFilter;
  const setSelectedCat = setSelectedCategoryFilter;

  const filteredScales = SCALES.filter(scale => {
    const matchesSearch = scale.name.toLowerCase().includes(search.toLowerCase()) || 
                          scale.fullName.toLowerCase().includes(search.toLowerCase()) ||
                          scale.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'all' || scale.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const getCategoryIcon = (category: ScaleCategory) => {
    const style = { color: 'var(--primary)' };
    switch (category) {
      case 'psychiatric': return <Brain size={18} style={style} />;
      case 'intelligence': return <Cpu size={18} style={style} />;
      case 'personality': return <User size={18} style={style} />;
      case 'projective': return <Eye size={18} style={style} />;
    }
  };

  const getCategoryColorClass = (category: ScaleCategory) => {
    switch (category) {
      case 'psychiatric': return 'badge-primary';
      case 'intelligence': return 'badge-teal';
      case 'personality': return 'badge-success';
      case 'projective': return 'badge-warning';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Intro Panel */}
      <div className="glass-panel" style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
            Welcome to PsychScaler
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '650px', marginBottom: '1rem' }}>
            A comprehensive, client-side toolkit designed for clinical psychologists and psychiatrists. Administer ratings, plot MMPI/MCMI grids, compute Wechsler indexes, and compile professional clinical reports instantly.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--success)', fontSize: '0.8rem', fontWeight: 600 }}>
            <ShieldCheck size={16} />
            <span>Privacy-First: All calculations run client-side. No patient data ever leaves your device.</span>
          </div>
        </div>
        
        {/* Quick Patient Setup Trigger */}
        <div className="glass-panel" style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          minWidth: '280px',
          border: '1px solid var(--border)'
        }}>
          {patient.name ? (
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Active Case Details
              </div>
              <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>{patient.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.25rem 0' }}>
                Age: {patient.age} • Gender: {patient.gender}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Case ID: {patient.caseId || 'None'}
              </div>
              <button 
                onClick={() => setActivePage('reports')}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.75rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              >
                <span>View Patient Reports</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '0.25rem 0' }}>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Set patient details to start generating clinical records and reports.
              </p>
              <button
                onClick={() => setActivePage('patient-setup')}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
              >
                <span>Configure Patient</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filters & Search controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
          <Search size={16} style={{
            position: 'absolute',
            left: '0.875rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input
            type="text"
            placeholder="Search scales, acronyms, details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          <button
            onClick={() => setSelectedCat('all')}
            className={`btn ${selectedCat === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
          >
            All Scales
          </button>
          <button
            onClick={() => setSelectedCat('psychiatric')}
            className={`btn ${selectedCat === 'psychiatric' ? 'btn-teal' : 'btn-secondary'}`}
            style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
          >
            Psychiatric
          </button>
          <button
            onClick={() => setSelectedCat('intelligence')}
            className={`btn ${selectedCat === 'intelligence' ? 'btn-teal' : 'btn-secondary'}`}
            style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
          >
            Cognitive / IQ
          </button>
          <button
            onClick={() => setSelectedCat('personality')}
            className={`btn ${selectedCat === 'personality' ? 'btn-teal' : 'btn-secondary'}`}
            style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
          >
            Personality
          </button>
          <button
            onClick={() => setSelectedCat('projective')}
            className={`btn ${selectedCat === 'projective' ? 'btn-teal' : 'btn-secondary'}`}
            style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
          >
            Projective
          </button>
        </div>
      </div>

      {/* Scales Cards Grid */}
      <div className="grid-cols-2">
        {filteredScales.map(scale => {
          const isCompleted = !!reports[scale.id];
          return (
            <div key={scale.id} className="glass-panel" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {isCompleted && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: 'var(--success)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: 'var(--success-light)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px'
                }}>
                  <CheckCircle2 size={14} />
                  <span>Report Saved</span>
                </div>
              )}
              
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {getCategoryIcon(scale.category as ScaleCategory)}
                  <span className={`badge ${getCategoryColorClass(scale.category as ScaleCategory)}`}>
                    {scale.category.toUpperCase()}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.35rem', fontFamily: 'var(--font-display)' }}>
                  {scale.fullName}
                </h3>
                
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                  {scale.shortDesc}
                </p>
              </div>

              {/* Big easy action for clinicians */}
              <button
                onClick={() => setActivePage(scale.id)}
                className="btn btn-primary"
                style={{ 
                  width: "100%", 
                  marginTop: "0.5rem",
                  padding: "0.7rem 1rem",
                  fontSize: "0.95rem",
                  minHeight: "48px"
                }}
              >
                Start {scale.name} →
              </button>
            </div>
          );
        })}
      </div>

      {filteredScales.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ color: 'var(--text-muted)' }}>No scales found matching your filters/search term.</p>
        </div>
      )}
    </div>
  );
};
