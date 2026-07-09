import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PatientDetails } from '../types';

interface PatientContextType {
  patient: PatientDetails;
  updatePatient: (details: Partial<PatientDetails>) => void;
  clearPatient: () => void;
  reports: Record<string, any>;
  saveReport: (scaleId: string, report: any) => void;
  deleteReport: (scaleId: string) => void;
  clearAllReports: () => void;
  // New for hospital backup/restore
  restoreFullSession: (data: any) => void;
  restoreReportsOnly: (data: any) => void;
}

const defaultPatient: PatientDetails = {
  name: '',
  age: 0,
  gender: '',
  dob: '',
  assessmentDate: new Date().toISOString().split('T')[0],
  caseId: '',
  clinicianName: ''
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patient, setPatient] = useState<PatientDetails>(() => {
    const saved = localStorage.getItem('psychscaler-patient');
    return saved ? JSON.parse(saved) : defaultPatient;
  });

  const [reports, setReports] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem('psychscaler-reports');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('psychscaler-patient', JSON.stringify(patient));
  }, [patient]);

  useEffect(() => {
    localStorage.setItem('psychscaler-reports', JSON.stringify(reports));
  }, [reports]);

  const updatePatient = (details: Partial<PatientDetails>) => {
    setPatient(prev => ({ ...prev, ...details }));
  };

  const clearPatient = () => {
    setPatient(defaultPatient);
  };

  const saveReport = (scaleId: string, report: any) => {
    setReports(prev => ({
      ...prev,
      [scaleId]: {
        ...report,
        savedAt: new Date().toISOString()
      }
    }));
  };

  const deleteReport = (scaleId: string) => {
    setReports(prev => {
      const next = { ...prev };
      delete next[scaleId];
      return next;
    });
  };

  const clearAllReports = () => {
    setReports({});
  };

  // === Restore functions for hospital staff ===
  const restoreFullSession = (data: any) => {
    if (data.patient) {
      setPatient({ ...defaultPatient, ...data.patient });
    }
    if (data.reports) {
      setReports(data.reports);
    }
  };

  const restoreReportsOnly = (data: any) => {
    if (data.reports) {
      setReports(data.reports);
    }
    if (data.patient) {
      setPatient(prev => ({
        ...prev,
        name: data.patient.name || prev.name,
        caseId: data.patient.caseId || prev.caseId,
        assessmentDate: data.patient.assessmentDate || prev.assessmentDate,
        clinicianName: data.patient.clinicianName || prev.clinicianName,
      }));
    }
  };

  return (
    <PatientContext.Provider value={{
      patient,
      updatePatient,
      clearPatient,
      reports,
      saveReport,
      deleteReport,
      clearAllReports,
      restoreFullSession,
      restoreReportsOnly
    }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};
