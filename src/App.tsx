import { useState } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { PatientProvider } from './components/PatientContext';

import { Header } from './components/Header';
import { usePatient } from './components/PatientContext';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { PatientSetup } from './components/PatientSetup';
import { ReportCenter } from './components/ReportCenter';
import { PsychiatricScaleView } from './components/scales/PsychiatricScaleView';
import { WechslerIQView } from './components/scales/WechslerIQView';
import { MisicView } from './components/scales/MisicView';
import { MmpiPlotterView } from './components/scales/MmpiPlotterView';
import { McmiPlotterView } from './components/scales/McmiPlotterView';
import { DapChecklistView } from './components/scales/DapChecklistView';
import { RorschachView } from './components/scales/RorschachView';
import { TatCatView } from './components/scales/TatCatView';
import { Academy } from './components/Academy';
import { MmseView } from './components/scales/MmseView';
import { WaiView } from './components/scales/WaiView';
import { OscarsView } from './components/scales/OscarsView';
import { MacCatView } from './components/scales/MacCatView';
import { BktView } from './components/scales/BktView';
import { DstView } from './components/scales/DstView';
import { CbclView } from './components/scales/CbclView';

function AppContent() {
  const [history, setHistory] = useState<string[]>(['landing']);
  const activePage = history[history.length - 1] || 'landing';
  
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const { patient } = usePatient();
 
  const navigate = (page: string) => {
    setHistory(prev => [...prev, page]);
  };

  const goBack = () => {
    setHistory(prev => prev.length > 1 ? prev.slice(0, -1) : ['landing']);
  };
const renderActivePage = () => {
    switch (activePage) {
      case 'landing':
        return <Landing setActivePage={navigate} setSelectedCategoryFilter={setSelectedCategoryFilter} />;
      case 'dashboard':
        return <Dashboard setActivePage={navigate} selectedCategoryFilter={selectedCategoryFilter} setSelectedCategoryFilter={setSelectedCategoryFilter} />;
      case 'patient-setup':
        return <PatientSetup setActivePage={navigate} />;
      case 'reports':
        return <ReportCenter />;
      case 'bdi':
        return <PsychiatricScaleView scaleId="bdi" />;
      case 'ymrs':
        return <PsychiatricScaleView scaleId="ymrs" />;
      case 'ybocs':
        return <PsychiatricScaleView scaleId="ybocs" />;
      case 'hama':
        return <PsychiatricScaleView scaleId="hama" />;
      case 'hamd':
        return <PsychiatricScaleView scaleId="hamd" />;
      case 'asrs':
        return <PsychiatricScaleView scaleId="asrs" />;
      case 'aims':
        return <PsychiatricScaleView scaleId="aims" />;
      case 'audit':
        return <PsychiatricScaleView scaleId="audit" />;
      case 'phq9':
        return <PsychiatricScaleView scaleId="phq9" />;
      case 'gad7':
        return <PsychiatricScaleView scaleId="gad7" />;
      case 'bai':
        return <PsychiatricScaleView scaleId="bai" />;
      case 'aq10':
        return <PsychiatricScaleView scaleId="aq10" />;
      case 'mdq':
        return <PsychiatricScaleView scaleId="mdq" />;
      case 'des2':
        return <PsychiatricScaleView scaleId="des2" />;
      case 'phq15':
        return <PsychiatricScaleView scaleId="phq15" />;
      case 'eat26':
        return <PsychiatricScaleView scaleId="eat26" />;
      case 'scoff':
        return <PsychiatricScaleView scaleId="scoff" />;
      case 'cage':
        return <PsychiatricScaleView scaleId="cage" />;
      case 'dast10':
        return <PsychiatricScaleView scaleId="dast10" />;
      case 'gds30':
        return <PsychiatricScaleView scaleId="gds30" />;
      case 'ess':
        return <PsychiatricScaleView scaleId="ess" />;
      case 'bis11':
        return <PsychiatricScaleView scaleId="bis11" />;
      case 'psyrats':
        return <PsychiatricScaleView scaleId="psyrats" />;
      case 'conners':
        return <PsychiatricScaleView scaleId="conners" />;
      case 'mmse':
        return <MmseView />;
      case 'wai':
        return <WaiView />;
      case 'oscars':
        return <OscarsView />;
      case 'maccat':
        return <MacCatView />;
      case 'bkt':
        return <BktView />;
      case 'dst':
        return <DstView />;
      case 'cbcl':
        return <CbclView />;
      case 'wais':
        return <WechslerIQView />;
      case 'misic':
        return <MisicView />;
      case 'mmpi':
        return <MmpiPlotterView />;
      case 'mcmi':
        return <McmiPlotterView />;
      case 'dap':
        return <DapChecklistView />;
      case 'rorschach':
        return <RorschachView />;
      case 'tat':
        return <TatCatView />;
      case 'academy':
        return <Academy />;
      default:
        return <Landing setActivePage={navigate} />;
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' }}>
      <div className="main-content" style={{ margin: 0, width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header 
          activePage={activePage} 
          navigate={navigate} 
          goBack={goBack} 
          history={history} 
        />
        {/* Simple Patient Bar - easy to tap, least restrictive */}
        <div style={{
          background: "var(--bg-surface)",
          borderBottom: "1px solid var(--border)",
          padding: "0.4rem 0.75rem",
          fontSize: "0.85rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap"
        }} className="no-print">
          <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Patient:</span>
          <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
            {patient.name || "Not set"}
          </span>
          <button 
            onClick={() => navigate("patient-setup")}
            style={{
              marginLeft: "auto",
              fontSize: "0.75rem",
              padding: "0.2rem 0.6rem",
              borderRadius: "999px",
              border: "1px solid var(--border)",
              background: "transparent",
              cursor: "pointer"
            }}
          >
            {patient.name ? "Edit" : "Set Patient"}
          </button>
        </div>

        <main className="workspace-body" style={{ flex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0.75rem' }}>
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PatientProvider>
        <AppContent />
      </PatientProvider>
    </ThemeProvider>
  );
}

export default App;
