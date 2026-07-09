import React, { useState } from 'react';
import { usePatient } from './PatientContext';
import { Save, Trash2, CheckCircle } from 'lucide-react';

interface PatientSetupProps {
  setActivePage: (page: string) => void;
}

export const PatientSetup: React.FC<PatientSetupProps> = ({ setActivePage }) => {
  const { patient, updatePatient, clearPatient, clearAllReports } = usePatient();
  const [formData, setFormData] = useState({
    name: patient.name,
    age: patient.age === 0 ? '' : patient.age.toString(),
    gender: patient.gender,
    dob: patient.dob,
    assessmentDate: patient.assessmentDate,
    caseId: patient.caseId,
    clinicianName: patient.clinicianName
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePatient({
      name: formData.name,
      age: formData.age === '' ? 0 : parseInt(formData.age, 10),
      gender: formData.gender as any,
      dob: formData.dob,
      assessmentDate: formData.assessmentDate,
      caseId: formData.caseId,
      clinicianName: formData.clinicianName
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setActivePage('dashboard');
    }, 1500);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear patient details and all active test reports? This action cannot be undone.')) {
      clearPatient();
      clearAllReports();
      setFormData({
        name: '',
        age: '',
        gender: '',
        dob: '',
        assessmentDate: new Date().toISOString().split('T')[0],
        caseId: '',
        clinicianName: ''
      });
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
          Demographics & Session Config
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          Configure the active patient demographics. This data is stored locally in your browser memory for report generation and is never sent to any server.
        </p>

        {success && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem',
            backgroundColor: 'var(--success-light)',
            color: 'var(--success)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            border: '1px solid var(--success)20'
          }}>
            <CheckCircle size={18} />
            <span>Patient details updated successfully. Redirecting to dashboard...</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid-cols-2">
            <div className="form-group">
              <label className="form-label">Full Name / Patient ID</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g. Jane Doe or P-4820"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Case File / Registration No.</label>
              <input
                type="text"
                name="caseId"
                value={formData.caseId}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g. CR-2026/894"
              />
            </div>
          </div>

          <div className="grid-cols-3">
            <div className="form-group">
              <label className="form-label">Age (Years)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g. 35"
                min="0"
                max="125"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-input form-select"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="grid-cols-2" style={{ marginTop: '0.5rem' }}>
            <div className="form-group">
              <label className="form-label">Assessment Date</label>
              <input
                type="date"
                name="assessmentDate"
                value={formData.assessmentDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Clinician Name</label>
              <input
                type="text"
                name="clinicianName"
                value={formData.clinicianName}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g. Dr. A. Sen, Clinical Psychologist"
              />
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border)'
          }}>
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-danger"
              style={{ padding: '0.625rem 1.25rem' }}
            >
              <Trash2 size={16} />
              <span>Clear Session Data</span>
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0.625rem 1.75rem' }}
            >
              <Save size={16} />
              <span>Save & Continue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
