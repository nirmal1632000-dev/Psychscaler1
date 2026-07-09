import React from 'react';
import { usePatient } from './PatientContext';
import { 
  FileText, 
  Printer, 
  Trash2
} from 'lucide-react';

export const ReportCenter: React.FC = () => {
  const { patient, reports, clearAllReports } = usePatient();
  const reportKeys = Object.keys(reports);

  const handlePrint = () => {
    window.print();
  };

  const handleClearReports = () => {
    if (window.confirm('Are you sure you want to clear all active test reports from this session?')) {
      clearAllReports();
    }
  };

  // === Export functionality for hospital staff ===
  const downloadJSON = (data: any, filename: string) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadFullSession = () => {
    const sessionData = {
      exportedAt: new Date().toISOString(),
      patient,
      reports,
      version: 'PsychScaler-0.1'
    };
    const safeName = (patient.name || 'patient').replace(/[^a-z0-9]/gi, '_');
    downloadJSON(sessionData, `PsychScaler_${safeName}_${new Date().toISOString().slice(0,10)}.json`);
  };

  const handleDownloadReportsOnly = () => {
    const reportsData = {
      exportedAt: new Date().toISOString(),
      patient: {
        name: patient.name,
        caseId: patient.caseId,
        assessmentDate: patient.assessmentDate,
        clinicianName: patient.clinicianName
      },
      reports
    };
    const safeName = (patient.name || 'patient').replace(/[^a-z0-9]/gi, '_');
    downloadJSON(reportsData, `PsychScaler_Reports_${safeName}_${new Date().toISOString().slice(0,10)}.json`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Action Header bar */}
      <div className="glass-panel no-print" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', margin: 0 }}>Report Management</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Compile and review active reports. Use the buttons below to export JSON backups or print/save as PDF.
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={handleClearReports} 
            className="btn btn-danger"
            disabled={reportKeys.length === 0}
            style={{ padding: '0.5rem 1rem' }}
          >
            <Trash2 size={16} />
            <span>Clear All Reports</span>
          </button>
          
          <button 
            onClick={handlePrint} 
            className="btn btn-primary"
            disabled={reportKeys.length === 0}
            style={{ padding: '0.5rem 1.25rem' }}
          >
            <Printer size={16} />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {reportKeys.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            backgroundColor: 'var(--bg-hover)',
            padding: '1rem',
            borderRadius: '50%',
            marginBottom: '1rem',
            color: 'var(--text-muted)'
          }}>
            <FileText size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
            No Assessment Reports Available
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '450px', margin: '0 auto' }}>
            When you complete any psychological or psychiatric scales and click "Save Report", the summaries will compile here to form a unified clinical dossier.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Printable Report Header */}
          <div className="glass-panel print-header" style={{
            borderLeft: '5px solid var(--primary)',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', margin: 0 }}>CLINICAL ASSESSMENT DOSSIER</h1>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>PsychScaler Standardized Reporting System</span>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <div><strong>Ref Case:</strong> {patient.caseId || 'N/A'}</div>
                <div><strong>Date:</strong> {patient.assessmentDate || 'N/A'}</div>
              </div>
            </div>

            {/* Demographics grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.25rem',
              fontSize: '0.875rem'
            }} className="grid-cols-4">
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Patient Name</span>
                <strong style={{ color: 'var(--text-primary)' }}>{patient.name || 'Anonymous'}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Age / Gender</span>
                <strong style={{ color: 'var(--text-primary)' }}>{patient.age} years / {patient.gender || 'Not specified'}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Date of Birth</span>
                <strong style={{ color: 'var(--text-primary)' }}>{patient.dob || 'Not recorded'}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Assessing Clinician</span>
                <strong style={{ color: 'var(--text-primary)' }}>{patient.clinicianName || 'Not recorded'}</strong>
              </div>
            </div>
          </div>

          {/* Compiled Reports Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* 1. Psychiatric Scale Summaries */}
            {['bdi', 'ymrs', 'ybocs', 'psyrats', 'conners', 'cbcl'].some(k => reportKeys.includes(k)) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="page-break">
                <h3 style={{
                  fontSize: '1.2rem',
                  borderBottom: '2px solid var(--teal)',
                  paddingBottom: '0.4rem',
                  color: 'var(--teal)',
                  fontFamily: 'var(--font-display)'
                }}>
                  Psychiatric Symptoms & Rating Scales
                </h3>

                {['bdi', 'ymrs', 'ybocs', 'psyrats', 'conners'].map(k => {
                  const rep = reports[k];
                  if (!rep) return null;
                  return (
                    <div key={k} className="glass-panel" style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{rep.scaleName || rep.interpretation?.split(':')[0] || k.toUpperCase()}</h4>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <span className="badge badge-primary">Total Score: {rep.totalScore ?? rep.total}</span>
                          {rep.severity && <span className="badge badge-danger">Severity: {rep.severity}</span>}
                          {rep.classification && <span className="badge badge-danger">Class: {rep.classification}</span>}
                        </div>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45, whiteSpace: 'pre-wrap' }}>
                        <strong>Clinical Assessment Summary:</strong> {rep.interpretation || `Assessment compiled successfully for scale ${k}.`}
                      </p>
                    </div>
                  );
                })}

                {/* Child Behavior Checklist (CBCL 6-18) Custom Table Layout */}
                {reports.cbcl && (
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Child Behavior Checklist (CBCL 6-18)</h4>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <span className="badge badge-primary">Total Problems: {reports.cbcl.total}</span>
                        <span className="badge badge-danger">{reports.cbcl.severity}</span>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="grid-cols-2">
                      <div className="table-container">
                        <table className="scoring-table" style={{ fontSize: '0.8rem' }}>
                          <thead>
                            <tr>
                              <th>Broad Band Syndrome Scale</th>
                              <th style={{ textAlign: 'center' }}>Raw Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reports.cbcl.subscores && Object.keys(reports.cbcl.subscores).map((subKey) => (
                              <tr key={subKey}>
                                <td>{subKey}</td>
                                <td style={{ textAlign: 'center', fontWeight: 700 }}>{reports.cbcl.subscores[subKey]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <strong>Interpretation Details:</strong>
                        <p style={{ marginTop: '0.5rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                          {reports.cbcl.interpretation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. Cognitive, Developmental & IQ Summaries */}
            {['wais', 'misic', 'bkt', 'dst', 'mmse'].some(k => reportKeys.includes(k)) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="page-break">
                <h3 style={{
                  fontSize: '1.2rem',
                  borderBottom: '2px solid var(--primary)',
                  paddingBottom: '0.4rem',
                  color: 'var(--primary)',
                  fontFamily: 'var(--font-display)'
                }}>
                  Cognitive, Intellectual & Developmental Profiles
                </h3>

                {/* Binet-Kamat Test of Intelligence (BKT) Custom Report Layout */}
                {reports.bkt && (
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Binet-Kamat Test of Intelligence (BKT)</h4>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <span className="badge badge-primary">Prorated IQ: {reports.bkt.total}</span>
                        <span className="badge badge-success">{reports.bkt.classification}</span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '0.5rem' }} className="grid-cols-2">
                      <div className="table-container">
                        <table className="scoring-table" style={{ fontSize: '0.8rem' }}>
                          <thead>
                            <tr>
                              <th>BKT Metric</th>
                              <th style={{ textAlign: 'center' }}>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Chronological Age (CA)</td>
                              <td style={{ textAlign: 'center', fontWeight: 700 }}>{reports.bkt.caYears}y {reports.bkt.caMonths}m</td>
                            </tr>
                            <tr>
                              <td>Basal Age (BA)</td>
                              <td style={{ textAlign: 'center', fontWeight: 700 }}>{reports.bkt.basalAgeYears} years</td>
                            </tr>
                            <tr>
                              <td>Mental Age (MA)</td>
                              <td style={{ textAlign: 'center', fontWeight: 700 }}>
                                {Math.floor(reports.bkt.mentalAgeMonths / 12)}y {reports.bkt.mentalAgeMonths % 12}m
                              </td>
                            </tr>
                            <tr>
                              <td>Traditional Ratio IQ (SD 18.7)</td>
                              <td style={{ textAlign: 'center', fontWeight: 700 }}>{Math.round(reports.bkt.ratioIq)}</td>
                            </tr>
                            <tr>
                              <td>Prorated Standardized IQ (SD 15)</td>
                              <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--primary)' }}>{reports.bkt.total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <strong>BKT Clinical Interpretation:</strong>
                        <p style={{ marginTop: '0.5rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                          {reports.bkt.interpretation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Developmental Screening Test (DST) Custom Report Layout */}
                {reports.dst && (
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Developmental Screening Test (DST)</h4>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <span className="badge badge-primary">Developmental Quotient (DQ): {reports.dst.total}</span>
                        <span className="badge badge-success">{reports.dst.classification}</span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '0.5rem' }} className="grid-cols-2">
                      <div className="table-container">
                        <table className="scoring-table" style={{ fontSize: '0.8rem' }}>
                          <thead>
                            <tr>
                              <th>DST Screening Metric</th>
                              <th style={{ textAlign: 'center' }}>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Chronological Age (CA)</td>
                              <td style={{ textAlign: 'center', fontWeight: 700 }}>{reports.dst.caYears}y {reports.dst.caMonths}m</td>
                            </tr>
                            <tr>
                              <td>Developmental Age (DA)</td>
                              <td style={{ textAlign: 'center', fontWeight: 700 }}>
                                {Math.floor(reports.dst.developmentalAgeMonths / 12)}y {Math.round((reports.dst.developmentalAgeMonths % 12) * 10) / 10}m
                              </td>
                            </tr>
                            <tr>
                              <td>Developmental Quotient (DQ)</td>
                              <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--primary)' }}>{reports.dst.total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <strong>DST Clinical Interpretation:</strong>
                        <p style={{ marginTop: '0.5rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                          {reports.dst.interpretation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* MMSE Report Custom Layout */}
                {reports.mmse && (
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Mini-Mental State Examination (MMSE)</h4>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <span className="badge badge-primary">Total Score: {reports.mmse.total}/30</span>
                        <span className="badge badge-danger">{reports.mmse.severity}</span>
                        <span className="badge badge-teal">LOC: {reports.mmse.levelOfConsciousness}</span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '0.5rem' }} className="grid-cols-2">
                      <div className="table-container">
                        <table className="scoring-table" style={{ fontSize: '0.8rem' }}>
                          <thead>
                            <tr>
                              <th>Cognitive Domain</th>
                              <th style={{ textAlign: 'center' }}>Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reports.mmse.subscores && Object.keys(reports.mmse.subscores).map((domainName) => (
                              <tr key={domainName}>
                                <td>{domainName}</td>
                                <td style={{ textAlign: 'center', fontWeight: 700 }}>{reports.mmse.subscores[domainName]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <strong>Cognitive Interpretation Details:</strong>
                        <p style={{ marginTop: '0.5rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                          {reports.mmse.interpretation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* WAIS Report */}
                {reports.wais && (
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{reports.wais.scaleName}</h4>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <span className="badge badge-primary">FSIQ: {reports.wais.results.fsiq}</span>
                        <span className="badge badge-success">{reports.wais.results.fsiqClassification}</span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }} className="grid-cols-2">
                      <div className="table-container">
                        <table className="scoring-table" style={{ fontSize: '0.8rem' }}>
                          <thead>
                            <tr>
                              <th>Cognitive Index</th>
                              <th style={{ textAlign: 'center' }}>Score</th>
                              <th style={{ textAlign: 'center' }}>Percentile</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reports.wais.results.indices.map((ind: any) => (
                              <tr key={ind.id}>
                                <td>{ind.name}</td>
                                <td style={{ textAlign: 'center', fontWeight: 700 }}>{ind.score}</td>
                                <td style={{ textAlign: 'center' }}>{ind.percentile}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                          Subtest Scores Record
                        </div>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '0.5rem',
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)'
                        }} className="grid-cols-3">
                          {reports.wais.subtests.map((sub: any) => (
                            <div key={sub.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.2rem' }}>
                              <strong>{sub.id}</strong>: {sub.scaledScore}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {reports.wais.results.discrepancies.length > 0 && (
                      <div style={{
                        marginTop: '0.75rem',
                        padding: '0.75rem',
                        backgroundColor: 'var(--warning-light)',
                        borderLeft: '3px solid var(--warning)',
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                      }}>
                        <strong>Clinical Discrepancy Warnings:</strong>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', marginTop: '0.25rem' }}>
                          {reports.wais.results.discrepancies.map((d: string, idx: number) => (
                            <li key={idx}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* MISIC Report */}
                {reports.misic && (
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{reports.misic.scaleName}</h4>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <span className="badge badge-primary">FSIQ: {reports.misic.results.fsiq}</span>
                        <span className="badge badge-success">{reports.misic.results.fsiqClassification}</span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }} className="grid-cols-2">
                      <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <div>Verbal IQ (VIQ): <strong>{reports.misic.results.viq}</strong> ({reports.misic.results.viqClassification})</div>
                        <div>Performance IQ (PIQ): <strong>{reports.misic.results.piq}</strong> ({reports.misic.results.piqClassification})</div>
                        <div>Verbal Sum of Scaled: <strong>{reports.misic.results.verbalSum}</strong> • Performance Sum: <strong>{reports.misic.results.performanceSum}</strong></div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                          Subtest Scores Record
                        </div>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '0.4rem',
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)'
                        }} className="grid-cols-2">
                          {reports.misic.subtests.map((sub: any) => (
                            <div key={sub.name} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.2rem' }}>
                              <strong>{sub.name}</strong> ({sub.type.substring(0,1)}): {sub.scaledScore}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Personality Inventories */}
            {['mmpi', 'mcmi', 'dap'].some(k => reportKeys.includes(k)) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="page-break">
                <h3 style={{
                  fontSize: '1.2rem',
                  borderBottom: '2px solid var(--success)',
                  paddingBottom: '0.4rem',
                  color: 'var(--success)',
                  fontFamily: 'var(--font-display)'
                }}>
                  Objective & Graphic Personality Profiles
                </h3>

                {/* MMPI Report */}
                {reports.mmpi && (
                  <div className="glass-panel" style={{ padding: '1.25rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>{reports.mmpi.scaleName}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                      Profile generated based on <strong>{reports.mmpi.genderUsed}</strong> MMPI-2 norms.
                    </p>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                      gap: '0.5rem',
                      fontSize: '0.75rem'
                    }}>
                      {reports.mmpi.scales.map((s: any) => (
                        <div key={s.id} style={{
                          padding: '0.35rem',
                          border: '1px solid var(--border)',
                          backgroundColor: s.tScore >= 65 ? 'var(--danger-light)' : 'var(--bg-input)',
                          borderRadius: '4px',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <strong>{s.id}:</strong>
                          <span style={{ fontWeight: 700, color: s.tScore >= 65 ? 'var(--danger)' : 'inherit' }}>
                            T = {s.tScore}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MCMI Report */}
                {reports.mcmi && (
                  <div className="glass-panel" style={{ padding: '1.25rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>{reports.mcmi.scaleName}</h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                      gap: '0.5rem',
                      fontSize: '0.75rem'
                    }}>
                      {reports.mcmi.scales.map((s: any) => {
                        const isElev = s.baseRate >= 85;
                        const isPres = s.baseRate >= 75 && s.baseRate < 85;
                        let bg = 'var(--bg-input)';
                        let color = 'inherit';
                        if (isElev) { bg = 'var(--danger-light)'; color = 'var(--danger)'; }
                        else if (isPres) { bg = 'var(--warning-light)'; color = 'var(--warning)'; }

                        return (
                          <div key={s.id} style={{
                            padding: '0.35rem',
                            border: '1px solid var(--border)',
                            backgroundColor: bg,
                            borderRadius: '4px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            color
                          }}>
                            <strong>{s.id}:</strong>
                            <span style={{ fontWeight: 700 }}>
                              BR = {s.baseRate}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* DAP Report */}
                {reports.dap && (
                  <div className="glass-panel" style={{ padding: '1.25rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{reports.dap.scaleName}</h4>
                    {reports.dap.checkedDetails.length > 0 ? (
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                          Checked drawing signs & Interpretations
                        </div>
                        <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {reports.dap.checkedDetails.map((det: any) => (
                            <li key={det.id} style={{ marginBottom: '0.25rem' }}>
                              <strong>{det.label}:</strong> {det.psychInterpretation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1rem' }}>No clinical drawing indicators selected.</p>
                    )}
                    {reports.dap.notes && (
                      <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '0.75rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                          Clinician Notes & Summary Synthesis
                        </div>
                        <p style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>{reports.dap.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 4. Projective Test Assistants */}
            {['rorschach', 'tat'].some(k => reportKeys.includes(k)) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="page-break">
                <h3 style={{
                  fontSize: '1.2rem',
                  borderBottom: '2px solid var(--warning)',
                  paddingBottom: '0.4rem',
                  color: 'var(--warning)',
                  fontFamily: 'var(--font-display)'
                }}>
                  Projective Assessments & Narratives
                </h3>

                {/* Rorschach Report */}
                {reports.rorschach && (
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{reports.rorschach.scaleName}</h4>
                      <span className="badge badge-primary">Total coded (R): {reports.rorschach.responses.length}</span>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '1.25rem',
                      fontSize: '0.8rem'
                    }} className="grid-cols-3">
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Core Ratios</div>
                        <div>EB (Experience Balance): <strong>{reports.rorschach.summary.ratios.eb}</strong></div>
                        <div>EA (Experience Actual): <strong>{reports.rorschach.summary.ratios.ea}</strong></div>
                        <div>eb (Experience Base): <strong>{reports.rorschach.summary.ratios.ebBase}</strong></div>
                        <div>es (Stimulation): <strong>{reports.rorschach.summary.ratios.es}</strong></div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Loc & DQ Summary</div>
                        <div>W / D / Dd: <strong>{reports.rorschach.summary.locationCounts.W} / {reports.rorschach.summary.locationCounts.D} / {reports.rorschach.summary.locationCounts.Dd}</strong></div>
                        <div>Space (S) responses: <strong>{reports.rorschach.summary.locationCounts.S}</strong></div>
                        <div>DQ (+ / o / v): <strong>{reports.rorschach.summary.dqCounts['+']} / {reports.rorschach.summary.dqCounts.o} / {reports.rorschach.summary.dqCounts.v}</strong></div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Other Indices</div>
                        <div>Lambda (F% Ratio): <strong>{reports.rorschach.summary.ratios.lambda}</strong></div>
                        <div>Affect Ratio (Afr): <strong>{reports.rorschach.summary.ratios.afr}</strong></div>
                        <div>Popular responses (P): <strong>{reports.rorschach.summary.popularCount}</strong></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAT Report */}
                {reports.tat && (
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                      {reports.tat.scaleName}
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {Object.keys(reports.tat.stories).map(cardId => {
                        const state = reports.tat.stories[cardId];
                        return (
                          <div key={cardId} style={{ borderBottom: '1px dashed var(--border)', paddingBottom: '1rem' }}>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                              {reports.tat.mode} Card {cardId} Narrative Summary
                            </div>
                            <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '0.5rem', whiteSpace: 'pre-wrap' }}>
                              &ldquo;{state.storyText}&rdquo;
                            </p>
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(3, 1fr)',
                              gap: '0.75rem',
                              fontSize: '0.75rem',
                              backgroundColor: 'var(--bg-input)',
                              padding: '0.5rem',
                              borderRadius: '4px'
                            }} className="grid-cols-3">
                              <div><strong>Hero:</strong> {state.hero || 'N/A'}</div>
                              <div><strong>Press:</strong> {state.press || 'N/A'}</div>
                              <div><strong>Needs:</strong> {state.needs || 'N/A'}</div>
                              <div><strong>Conflicts:</strong> {state.conflicts || 'N/A'}</div>
                              <div><strong>Defenses:</strong> {state.defenses || 'N/A'}</div>
                              <div><strong>Outcome:</strong> {state.outcome || 'N/A'}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. Therapeutic Alliance, Capacity & Competence Assessments */}
            {['wai', 'maccat', 'oscars'].some(k => reportKeys.includes(k)) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="page-break">
                <h3 style={{
                  fontSize: '1.2rem',
                  borderBottom: '2px solid var(--primary)',
                  paddingBottom: '0.4rem',
                  color: 'var(--primary)',
                  fontFamily: 'var(--font-display)'
                }}>
                  Therapeutic Alliance, Competence & Capacity Profiles
                </h3>

                {/* Working Alliance Inventory (WAI) Custom Report Layout */}
                {reports.wai && (
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Working Alliance Inventory (WAI-C & WAI-T)</h4>
                      <span className="badge badge-primary">Alliance Gap: {reports.wai.total} pts</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '0.5rem' }} className="grid-cols-2">
                      <div className="table-container">
                        <table className="scoring-table" style={{ fontSize: '0.8rem' }}>
                          <thead>
                            <tr>
                              <th>Alliance Evaluator</th>
                              <th style={{ textAlign: 'center' }}>Total Score</th>
                              <th style={{ textAlign: 'center' }}>Average Rating</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>WAI-Client (WAI-C)</td>
                              <td style={{ textAlign: 'center', fontWeight: 700 }}>{reports.wai.clientTotal}/252</td>
                              <td style={{ textAlign: 'center' }}>{reports.wai.clientAvg}</td>
                            </tr>
                            <tr>
                              <td>WAI-Therapist (WAI-T)</td>
                              <td style={{ textAlign: 'center', fontWeight: 700 }}>{reports.wai.therapistTotal}/252</td>
                              <td style={{ textAlign: 'center' }}>{reports.wai.therapistAvg}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <strong>WAI Alliance Assessment:</strong>
                        <p style={{ marginTop: '0.5rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                          {reports.wai.interpretation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* MacCAT-T Competence/Capacity Report Layout */}
                {reports.maccat && (
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>MacArthur Competence Assessment Tool-Treatment (MacCAT-T)</h4>
                      <span className="badge badge-primary">Decisional Capacity Profile</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '0.5rem' }} className="grid-cols-2">
                      <div className="table-container">
                        <table className="scoring-table" style={{ fontSize: '0.8rem' }}>
                          <thead>
                            <tr>
                              <th>Capacity Domain</th>
                              <th style={{ textAlign: 'center' }}>Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reports.maccat.subscores && Object.keys(reports.maccat.subscores).map((domainName) => (
                              <tr key={domainName}>
                                <td>{domainName}</td>
                                <td style={{ textAlign: 'center', fontWeight: 700 }}>{reports.maccat.subscores[domainName]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <strong>MacCAT-T Competence Summary:</strong>
                        <p style={{ marginTop: '0.5rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                          {reports.maccat.interpretation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* OSCARS Social Cognition Report Layout */}
                {reports.oscars && (
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Observable Social Cognition: A Rating Scale (OSCARS)</h4>
                      <span className="badge badge-primary">OSCARS Rating: {reports.oscars.total}/32</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45, whiteSpace: 'pre-wrap' }}>
                      <strong>OSCARS Clinical Summary:</strong> {reports.oscars.interpretation}
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Printable Clinician Signature Box */}
          <div className="print-only" style={{ marginTop: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ textAlign: 'center', width: '250px', borderTop: '1px solid black', paddingTop: '0.5rem' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{patient.clinicianName || 'Assessing Clinician'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Authorized Signature & Seal</div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
