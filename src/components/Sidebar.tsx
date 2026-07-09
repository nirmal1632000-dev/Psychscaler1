import React from 'react';
import { 
  Brain, 
  Cpu, 
  User, 
  Eye, 
  LayoutDashboard, 
  FileText, 
  UserPlus,
  Home,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import type { ScaleCategory } from '../types';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  reportsCount: number;
}

export const SCALES_LIST = [
  { id: 'bdi', name: 'BDI-II (Depression)', category: 'psychiatric' },
  { id: 'ymrs', name: 'YMRS (Mania)', category: 'psychiatric' },
  { id: 'ybocs', name: 'Y-BOCS (OCD)', category: 'psychiatric' },
  { id: 'hama', name: 'HAM-A (Anxiety)', category: 'psychiatric' },
  { id: 'hamd', name: 'HAM-D (Depression)', category: 'psychiatric' },
  { id: 'asrs', name: 'ASRS (Adult ADHD)', category: 'psychiatric' },
  { id: 'aims', name: 'AIMS (Tardive Dyk.)', category: 'psychiatric' },
  { id: 'audit', name: 'AUDIT (Alcohol Screen)', category: 'psychiatric' },
  { id: 'wais', name: 'Wechsler IQ Profiler', category: 'intelligence' },
  { id: 'misic', name: 'MISIC (Indian WISC)', category: 'intelligence' },
  { id: 'mmpi', name: 'MMPI-2 Plotter', category: 'personality' },
  { id: 'mcmi', name: 'MCMI-III Plotter', category: 'personality' },
  { id: 'dap', name: 'Draw-a-Person Test', category: 'personality' },
  { id: 'rorschach', name: 'Rorschach CS Assistant', category: 'projective' },
  { id: 'tat', name: 'TAT / CAT Story Pad', category: 'projective' }
,
  { id: 'phq9', name: 'PHQ-9 (Depression)', category: 'psychiatric' },
  { id: 'gad7', name: 'GAD-7 (Anxiety)', category: 'psychiatric' },
  { id: 'bai', name: 'BAI (Beck Anxiety)', category: 'psychiatric' },
  { id: 'aq10', name: 'AQ-10 (Autism Screen)', category: 'psychiatric' },
  { id: 'mdq', name: 'MDQ (Bipolar Screen)', category: 'psychiatric' },
  { id: 'des2', name: 'DES-II (Dissociation)', category: 'psychiatric' },
  { id: 'phq15', name: 'PHQ-15 (Somatic)', category: 'psychiatric' },
  { id: 'eat26', name: 'EAT-26 (Eating Risk)', category: 'psychiatric' },
  { id: 'scoff', name: 'SCOFF (Eating Screen)', category: 'psychiatric' },
  { id: 'cage', name: 'CAGE (Alcohol Screen)', category: 'psychiatric' },
  { id: 'dast10', name: 'DAST-10 (Drug Screen)', category: 'psychiatric' },
  { id: 'gds30', name: 'GDS-30 (Geriatric Dep.)', category: 'psychiatric' },
  { id: 'ess', name: 'ESS (Sleepiness)', category: 'psychiatric' },
  { id: 'bis11', name: 'BIS-11 (Impulsivity)', category: 'psychiatric' }];

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, reportsCount }) => {
  const [expandedCats, setExpandedCats] = React.useState<Record<string, boolean>>({
    psychiatric: true,
    intelligence: false,
    personality: false,
    projective: false
  });

  const toggleCat = (catId: string) => {
    setExpandedCats(prev => ({ ...prev, [catId]: !prev[catId] }));
  };
  const getCategoryIcon = (category: ScaleCategory) => {
    switch (category) {
      case 'psychiatric': return <Brain size={16} />;
      case 'intelligence': return <Cpu size={16} />;
      case 'personality': return <User size={16} />;
      case 'projective': return <Eye size={16} />;
    }
  };

  const categories: { id: ScaleCategory; label: string }[] = [
    { id: 'psychiatric', label: 'Psychiatric Rating' },
    { id: 'intelligence', label: 'Cognitive & IQ' },
    { id: 'personality', label: 'Personality Scales' },
    { id: 'projective', label: 'Projective Tests' }
  ];

  return (
    <aside className="sidebar no-print">
      {/* Brand Header */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          backgroundColor: 'var(--primary)',
          color: 'white',
          padding: '0.5rem',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Brain size={24} />
        </div>
        <div>
          <h1 style={{
            fontSize: '1.25rem',
            margin: 0,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-display)'
          }}>PsychScaler</h1>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>v1.0 • Clinical Tool</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none' }}>
          <li>
            <button
              onClick={() => setActivePage('landing')}
              className={`btn ${activePage === 'landing' ? 'active' : ''}`}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                backgroundColor: activePage === 'landing' ? 'var(--primary-light)' : 'transparent',
                color: activePage === 'landing' ? 'var(--primary)' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '0.25rem'
              }}
            >
              <Home size={18} />
              <span>Home Gateway</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => setActivePage('dashboard')}
              className={`btn ${activePage === 'dashboard' ? 'active' : ''}`}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                backgroundColor: activePage === 'dashboard' ? 'var(--primary-light)' : 'transparent',
                color: activePage === 'dashboard' ? 'var(--primary)' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '0.5rem'
              }}
            >
              <LayoutDashboard size={18} />
              <span>Scales Directory</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActivePage('reports')}
              className={`btn ${activePage === 'reports' ? 'active' : ''}`}
              style={{
                width: '100%',
                backgroundColor: activePage === 'reports' ? 'var(--primary-light)' : 'transparent',
                color: activePage === 'reports' ? 'var(--primary)' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={18} />
                <span>Report Center</span>
              </div>
              {reportsCount > 0 && (
                <span className="badge badge-primary" style={{ padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                  {reportsCount}
                </span>
              )}
            </button>
          </li>

          {/* Test Categories */}
          {categories.map(cat => {
            const catScales = SCALES_LIST.filter(s => s.category === cat.id);
            const isExpanded = expandedCats[cat.id];
            return (
              <li key={cat.id} style={{ marginBottom: '0.75rem' }}>
                <div 
                  onClick={() => toggleCat(cat.id)}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    padding: '0.5rem 0.75rem',
                    marginBottom: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'all 0.15s ease'
                  }}
                  className="category-header"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {getCategoryIcon(cat.id)}
                    <span>{cat.label}</span>
                  </div>
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </div>
                {isExpanded && (
                  <ul style={{ listStyle: 'none', paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {catScales.map(scale => (
                      <li key={scale.id}>
                        <button
                          onClick={() => setActivePage(scale.id)}
                          className={'btn ' + (activePage === scale.id ? 'active' : '')}
                          style={{
                            width: '100%',
                            justifyContent: 'flex-start',
                            backgroundColor: activePage === scale.id ? 'var(--primary-light)' : 'transparent',
                            color: activePage === scale.id ? 'var(--primary)' : 'var(--text-secondary)',
                            border: 'none',
                            padding: '0.375rem 0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.8rem',
                            textAlign: 'left'
                          }}
                        >
                          <span style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: activePage === scale.id ? 'var(--primary)' : 'var(--border)',
                            marginRight: '0.5rem'
                          }}></span>
                          {scale.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}</ul>
      </nav>

      {/* Patient State Info shortcut */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg-app)'
      }}>
        <button
          onClick={() => setActivePage('patient-setup')}
          className="btn btn-secondary"
          style={{ width: '100%', fontSize: '0.8rem', justifyContent: 'center' }}
        >
          <UserPlus size={14} />
          <span>Patient Setup</span>
        </button>
      </div>
    </aside>
  );
};
