import React from 'react';
import { 
  Brain, 
  Cpu, 
  User, 
  Eye, 
  UserPlus, 
  FileText, 
  GraduationCap, 
  ShieldCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { usePatient } from './PatientContext';

interface LandingProps {
  setActivePage: (page: string) => void;
  setSelectedCategoryFilter?: (cat: any) => void;
}

export const Landing: React.FC<LandingProps> = ({ setActivePage, setSelectedCategoryFilter }) => {
  const { patient, reports } = usePatient();
  const reportsCount = Object.keys(reports).length;
  const isPatientSetup = patient.name.trim() !== '';

  const categories = [
    {
      id: 'psychiatric',
      title: 'Psychiatric Rating Scales',
      description: 'Symptom severity measures for depression (BDI/HAM-D), anxiety (HAM-A), mania (YMRS), ADHD (ASRS), and involuntary movements (AIMS).',
      icon: <Brain size={28} style={{ color: 'var(--teal)' }} />,
      badge: 'BDI-II • HAMD-17 • HAM-A • YMRS • Y-BOCS • ASRS • AIMS • AUDIT',
      target: 'bdi'
    },
    {
      id: 'intelligence',
      title: 'Cognitive & Intellectual',
      description: 'Comprehensive deviation IQ profilers for Wechsler scales (WAIS-IV/WISC-V) and Malin\'s adaptation (MISIC).',
      icon: <Cpu size={28} style={{ color: 'var(--primary)' }} />,
      badge: 'WAIS-IV • WISC-V • MISIC',
      target: 'wais'
    },
    {
      id: 'personality',
      title: 'Personality Inventories',
      description: 'Multiphasic objective profiles (MMPI-2), Millon base rate plotters (MCMI-III), and drawing indicators (DAP).',
      icon: <User size={28} style={{ color: 'var(--success)' }} />,
      badge: 'MMPI-2 • MCMI-III • DAP',
      target: 'mmpi'
    },
    {
      id: 'projective',
      title: 'Projective Assistants',
      description: 'Exner comprehensive Rorschach coding grids and Murray\'s apperception Needs-Press story workpads.',
      icon: <Eye size={28} style={{ color: 'var(--warning)' }} />,
      badge: 'Rorschach CS • TAT • CAT',
      target: 'rorschach'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Editorial Welcome Hero */}
      <div style={{
        textAlign: 'center',
        padding: '1.5rem 0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)',
          padding: '0.625rem 1.25rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          border: '1.5px solid var(--border)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          <GraduationCap size={16} />
          <span>Unified Clinical Assessment & Learning Hub</span>
        </div>
        
        <h1 style={{
          fontSize: '2.75rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          maxWidth: '850px',
          lineHeight: 1.2
        }}>
          PsychScaler
        </h1>
        
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          lineHeight: 1.6,
          fontFamily: 'var(--font-sans)'
        }}>
          A professional, privacy-first diagnostic gateway. Standardize your psychiatric scoring, plot personality profiles, tabulate projective indices, and master underlying psychometrics.
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--success)',
          fontSize: '0.8rem',
          fontWeight: 600,
          marginTop: '0.5rem'
        }}>
          <ShieldCheck size={16} />
          <span>HIPAA-Compliant: All patient data is computed locally. No servers, no data transfers.</span>
        </div>
      </div>

      {/* Main Operations Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2.5rem'
      }} className="grid-cols-2">
        
        {/* Le Side: Test categories list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-display)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            Diagnostics Suite
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {categories.map(cat => (
              <div 
                key={cat.id} 
                onClick={() => {
                  if (setSelectedCategoryFilter) {
                    setSelectedCategoryFilter(cat.id);
                  }
                  setActivePage('dashboard');
                }}
                className="glass-panel" 
                style={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: '1.25rem',
                  cursor: 'pointer',
                  padding: '1.25rem',
                  border: '1.5px solid var(--border)'
                }}
              >
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-app)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border)'
                }}>
                  {cat.icon}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {cat.title}
                    </h3>
                    <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                    {cat.description}
                  </p>
                  <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{cat.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Setup case and reports */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Active Case Workspace Setup */}
          <div className="glass-panel" style={{ border: '1.5px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              Active Case Setup
            </h2>
            
            {isPatientSetup ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.85rem' }}>
                  Patient Identifier: <strong style={{ color: 'var(--text-primary)' }}>{patient.name}</strong>
                </div>
                <div style={{ fontSize: '0.85rem' }}>
                  Age / Gender: <strong style={{ color: 'var(--text-primary)' }}>{patient.age}y / {patient.gender}</strong>
                </div>
                <div style={{ fontSize: '0.85rem' }}>
                  Case File No: <strong style={{ color: 'var(--text-primary)' }}>{patient.caseId || 'N/A'}</strong>
                </div>
                
                <button
                  onClick={() => setActivePage('patient-setup')}
                  className="btn btn-secondary"
                  style={{ marginTop: '0.5rem', width: '100%' }}
                >
                  <UserPlus size={16} />
                  <span>Update Case Configuration</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0.5rem 0' }}>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Configure patient demographics (age, sex, file number) at the start of your session to enable profile conversions and PDF reports.
                </p>
                <button
                  onClick={() => setActivePage('patient-setup')}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <UserPlus size={16} />
                  <span>Configure Active Case</span>
                </button>
              </div>
            )}
          </div>

          {/* Session Reports Dossier */}
          <div className="glass-panel" style={{ border: '1.5px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              Reports Dossier
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.25rem'
              }}>
                {reportsCount}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Active Session Logs</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Completed assessment reports in this profile.</div>
              </div>
            </div>

            <button
              onClick={() => setActivePage('reports')}
              className="btn btn-secondary"
              style={{ width: '100%' }}
              disabled={reportsCount === 0}
            >
              <FileText size={16} />
              <span>Compile Report Dossier</span>
            </button>
          </div>

          {/* Educational Statement */}
          <div className="glass-panel" style={{
            backgroundColor: 'var(--primary-light)',
            border: '1.5px solid var(--border)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <BookOpen size={16} />
              Educational & Tutorial Purpose
            </h3>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>
              PsychScaler includes comprehensive references and detailed tutorials explaining scoring calculations, standard deviations (SD), Base Rates, and Rorschach formulas. Click on the <strong>Scoring & Statistics</strong> tab inside any tool to explore the mathematical logic.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
