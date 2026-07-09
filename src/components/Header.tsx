import React from 'react';
import { Sun, Moon, Printer, User, AlertCircle, ChevronLeft, Home, LayoutDashboard, FileText, GraduationCap } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { usePatient } from './PatientContext';
import { SCALES_LIST } from './Sidebar';

interface HeaderProps {
  activePage: string;
  navigate: (page: string) => void;
  goBack: () => void;
  history: string[];
}

export const Header: React.FC<HeaderProps> = ({ activePage, navigate, goBack, history }) => {
  const { theme, toggleTheme } = useTheme();
  const { patient } = usePatient();

  const getPageTitle = () => {
    if (activePage === 'landing') return 'Home Gateway';
    if (activePage === 'dashboard') return 'Scales Directory';
    if (activePage === 'reports') return 'Report Center & Consolidated Summaries';
    if (activePage === 'patient-setup') return 'Patient Demographics Setup';
    if (activePage === 'academy') return 'Clinical Psychometrics Academy';
    
    const scale = SCALES_LIST.find(s => s.id === activePage);
    return scale ? scale.name : 'PsychScaler';
  };

  const handlePrint = () => {
    window.print();
  };

  const isPatientSetup = patient.name.trim() !== '';

  return (
    <header className="header no-print" style={{ gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {history.length > 1 && (
          <button 
            onClick={goBack} 
            className="btn btn-secondary" 
            style={{ padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}
          >
            <ChevronLeft size={16} />
            <span>Back</span>
          </button>
        )}
        <button 
          onClick={() => navigate('landing')} 
          className="btn btn-secondary" 
          style={{ 
            padding: '0.4rem 0.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.25rem', 
            fontSize: '0.8rem',
            backgroundColor: activePage === 'landing' ? 'var(--primary-light)' : 'transparent',
            color: activePage === 'landing' ? 'var(--primary)' : 'var(--text-secondary)',
            borderColor: activePage === 'landing' ? 'var(--primary)' : 'var(--border)'
          }}
        >
          <Home size={15} />
          <span>Home</span>
        </button>
        <button 
          onClick={() => navigate('dashboard')} 
          className="btn btn-secondary" 
          style={{ 
            padding: '0.4rem 0.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.25rem', 
            fontSize: '0.8rem',
            backgroundColor: activePage === 'dashboard' ? 'var(--primary-light)' : 'transparent',
            color: activePage === 'dashboard' ? 'var(--primary)' : 'var(--text-secondary)',
            borderColor: activePage === 'dashboard' ? 'var(--primary)' : 'var(--border)'
          }}
        >
          <LayoutDashboard size={15} />
          <span>Directory</span>
        </button>
        <button 
          onClick={() => navigate('reports')} 
          className="btn btn-secondary" 
          style={{ 
            padding: '0.4rem 0.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.25rem', 
            fontSize: '0.8rem',
            backgroundColor: activePage === 'reports' ? 'var(--primary-light)' : 'transparent',
            color: activePage === 'reports' ? 'var(--primary)' : 'var(--text-secondary)',
            borderColor: activePage === 'reports' ? 'var(--primary)' : 'var(--border)'
          }}
        >
          <FileText size={15} />
          <span>Dossier</span>
        </button>
        <button 
          onClick={() => navigate('academy')} 
          className="btn btn-secondary" 
          style={{ 
            padding: '0.4rem 0.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.25rem', 
            fontSize: '0.8rem',
            backgroundColor: activePage === 'academy' ? 'var(--primary-light)' : 'transparent',
            color: activePage === 'academy' ? 'var(--primary)' : 'var(--text-secondary)',
            borderColor: activePage === 'academy' ? 'var(--primary)' : 'var(--border)'
          }}
        >
          <GraduationCap size={15} />
          <span>Academy</span>
        </button>

        <span style={{ color: 'var(--border)', margin: '0 0.25rem' }}>|</span>

        <h2 style={{
          fontSize: '1.05rem',
          fontWeight: 600,
          margin: 0,
          fontFamily: 'var(--font-display)',
          color: 'var(--text-primary)'
        }}>
          {getPageTitle()}
        </h2>
      </div>

      {/* Patient Info & Utility Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Patient Status Indicator */}
        <div 
          onClick={() => navigate('patient-setup')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: isPatientSetup ? 'var(--primary-light)' : 'var(--warning-light)',
            color: isPatientSetup ? 'var(--primary)' : 'var(--warning)',
            fontSize: '0.8rem',
            fontWeight: 500,
            cursor: 'pointer',
            border: `1px solid ${isPatientSetup ? 'var(--primary)' : 'var(--warning)'}20`
          }}
        >
          {isPatientSetup ? (
            <>
              <User size={14} />
              <span>
                <strong>Patient:</strong> {patient.name} ({patient.age}y • {patient.gender || 'N/A'})
              </span>
            </>
          ) : (
            <>
              <AlertCircle size={14} />
              <span>No active patient details (Click to set)</span>
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-secondary"
          style={{ padding: '0.5rem', borderRadius: '50%', border: 'none' }}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="btn btn-primary"
          style={{ padding: '0.5rem 1rem' }}
          title="Print current page"
        >
          <Printer size={16} />
          <span>Print</span>
        </button>
      </div>
    </header>
  );
};
