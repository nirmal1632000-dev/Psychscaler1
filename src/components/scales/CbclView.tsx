import React, { useState, useEffect } from 'react';
import { usePatient } from '../PatientContext';
import { RotateCcw, Save, Check, FileSpreadsheet, ArrowRight, ArrowLeft } from 'lucide-react';
import { scaleLearningDb } from '../../modules/learningContent';
import { TutorialContent } from '../TutorialContent';

interface CbclItem {
  id: number;
  label: string;
  syndrome: 'Anxious/Depressed' | 'Withdrawn/Depressed' | 'Somatic Complaints' | 'Rule-Breaking' | 'Aggressive' | 'Attention';
  broadScale: 'Internalizing' | 'Externalizing' | 'Other';
}

const cbclItems: CbclItem[] = [
  // Internalizing - Anxious/Depressed
  { id: 1, label: 'Cries a lot or feels unhappy/sad without reason.', syndrome: 'Anxious/Depressed', broadScale: 'Internalizing' },
  { id: 2, label: 'Fears certain animals, situations, or places (other than normal fears).', syndrome: 'Anxious/Depressed', broadScale: 'Internalizing' },
  { id: 3, label: 'Feels the need to be perfect; extremely self-critical.', syndrome: 'Anxious/Depressed', broadScale: 'Internalizing' },
  { id: 4, label: 'Feels unloved, worthless, or inferior to others.', syndrome: 'Anxious/Depressed', broadScale: 'Internalizing' },
  
  // Internalizing - Withdrawn/Depressed
  { id: 5, label: 'Would rather be alone than with others; lacks social interest.', syndrome: 'Withdrawn/Depressed', broadScale: 'Internalizing' },
  { id: 6, label: 'Refuses to talk or is extremely secretive/silent.', syndrome: 'Withdrawn/Depressed', broadScale: 'Internalizing' },
  { id: 7, label: 'Shy, timid, or easily embarrassed in social settings.', syndrome: 'Withdrawn/Depressed', broadScale: 'Internalizing' },
  
  // Internalizing - Somatic Complaints
  { id: 8, label: 'Complains of physical aches/pains (headaches, stomachaches) without medical cause.', syndrome: 'Somatic Complaints', broadScale: 'Internalizing' },
  { id: 9, label: 'Feels dizzy, nauseous, or lightheaded without clear sickness.', syndrome: 'Somatic Complaints', broadScale: 'Internalizing' },
  { id: 10, label: 'Tires easily or seems physically weak without exertion.', syndrome: 'Somatic Complaints', broadScale: 'Internalizing' },
  
  // Externalizing - Rule-Breaking Behavior
  { id: 11, label: 'Breaks rules at home, school, or elsewhere.', syndrome: 'Rule-Breaking', broadScale: 'Externalizing' },
  { id: 12, label: 'Lies, cheats, or exaggerates facts to get their way.', syndrome: 'Rule-Breaking', broadScale: 'Externalizing' },
  { id: 13, label: 'Steals things from home, school, or other places.', syndrome: 'Rule-Breaking', broadScale: 'Externalizing' },
  { id: 14, label: 'Associates with troublemakers or hangs out with older peers.', syndrome: 'Rule-Breaking', broadScale: 'Externalizing' },
  
  // Externalizing - Aggressive Behavior
  { id: 15, label: 'Argues a lot with parents, teachers, or peers.', syndrome: 'Aggressive', broadScale: 'Externalizing' },
  { id: 16, label: 'Cruel to others; bullies, teases, or threatens people.', syndrome: 'Aggressive', broadScale: 'Externalizing' },
  { id: 17, label: 'Destroys own things or items belonging to family or others.', syndrome: 'Aggressive', broadScale: 'Externalizing' },
  { id: 18, label: 'Hot temper; easily gets angry, explosive, and unpredictable.', syndrome: 'Aggressive', broadScale: 'Externalizing' },
  
  // Other - Attention Problems
  { id: 19, label: 'Cannot sit still; hyperactive, constantly fidgeting.', syndrome: 'Attention', broadScale: 'Other' },
  { id: 20, label: 'Inattentive; easily distracted, short attention span.', syndrome: 'Attention', broadScale: 'Other' }
];

export const CbclView: React.FC = () => {
  const { saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning'>('assessment');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Ratings (0 = Not True, 1 = Somewhat True, 2 = Very True)
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [activeItemIdx, setActiveItemIdx] = useState(0);

  // Load saved answers
  useEffect(() => {
    if (reports['cbcl'] && reports['cbcl'].answers) {
      setRatings(reports['cbcl'].answers);
    }
  }, [reports]);

  const activeItem = cbclItems[activeItemIdx];

  const handleSelectRating = (itemId: number, val: number) => {
    setRatings({ ...ratings, [itemId]: val });
    if (activeItemIdx < cbclItems.length - 1) {
      setTimeout(() => {
        setActiveItemIdx((prev) => prev + 1);
      }, 400);
    }
  };

  const handleReset = () => {
    setRatings({});
    setActiveItemIdx(0);
    setSavedSuccess(false);
  };

  // Calculations
  const answeredCount = Object.keys(ratings).length;

  let internalizingScore = 0;
  let externalizingScore = 0;
  let otherScore = 0;

  cbclItems.forEach(item => {
    const val = ratings[item.id] || 0;
    if (item.broadScale === 'Internalizing') internalizingScore += val;
    else if (item.broadScale === 'Externalizing') externalizingScore += val;
    else otherScore += val;
  });

  const totalScore = internalizingScore + externalizingScore + otherScore;

  // Broad Scale Classifications
  let intSeverity = 'Normal';
  let intColor = 'text-slate-400';
  if (internalizingScore >= 10) {
    intSeverity = 'Clinical Range';
    intColor = 'text-red-400 font-bold';
  } else if (internalizingScore >= 7) {
    intSeverity = 'Borderline Range';
    intColor = 'text-yellow-400 font-bold';
  }

  let extSeverity = 'Normal';
  let extColor = 'text-slate-400';
  if (externalizingScore >= 8) {
    extSeverity = 'Clinical Range';
    extColor = 'text-red-400 font-bold';
  } else if (externalizingScore >= 6) {
    extSeverity = 'Borderline Range';
    extColor = 'text-yellow-400 font-bold';
  }

  let totalSeverity = 'Normal Range';
  let totalColor = 'text-green-400 bg-green-950/40 border-green-500/30';
  if (totalScore >= 18) {
    totalSeverity = 'Clinically Significant Problems';
    totalColor = 'text-red-400 bg-red-950/40 border-red-500/30';
  } else if (totalScore >= 13) {
    totalSeverity = 'Borderline Problems';
    totalColor = 'text-yellow-400 bg-yellow-950/40 border-yellow-500/30';
  }

  const handleSave = () => {
    const reportData = {
      total: totalScore,
      severity: totalSeverity,
      subscores: {
        'Internalizing Problems': internalizingScore,
        'Externalizing Problems': externalizingScore,
        'Attention Problems': otherScore
      },
      answers: ratings,
      interpretation: `Child Behavior Checklist (CBCL 6-18) syndromic screening profile:
- Internalizing Problems: ${internalizingScore}/20 (${intSeverity})
- Externalizing Problems: ${externalizingScore}/16 (${extSeverity})
- Total Problem Score: ${totalScore}/40 (${totalSeverity})`
    };

    saveReport('cbcl', reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#151b2c] p-6 rounded-2xl border border-slate-800 shadow-xl gap-4">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 flex items-center gap-2">
            <FileSpreadsheet className="w-7 h-7 text-cyan-400" />
            CBCL Behavior Checklist (Parent-Report)
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Child Behavior Checklist (CBCL 6-18) syndromic screening tool. Evaluates child behavior problems.
          </p>
        </div>
        <div className="flex items-center gap-2 self-stretch md:self-auto">
          <button
            onClick={() => setActiveTab('assessment')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'assessment' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Assessment
          </button>
          <button
            onClick={() => setActiveTab('learning')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'learning' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Clinical Guide
          </button>
        </div>
      </div>

      {activeTab === 'assessment' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Panel (Left 3 Columns) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Step Progress indicators */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-xl p-3.5 flex justify-between items-center overflow-x-auto gap-2">
              {cbclItems.map((item, idx) => {
                const rated = ratings[item.id] !== undefined;
                const active = activeItemIdx === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItemIdx(idx)}
                    className={`flex-1 min-w-[50px] py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                      active
                        ? 'bg-cyan-500 text-black border-cyan-400'
                        : rated
                        ? 'bg-[#161d30]/60 text-cyan-400 border-slate-800/80'
                        : 'bg-[#161d30]/20 text-slate-500 border-transparent hover:text-slate-300'
                    }`}
                  >
                    Q{item.id}
                  </button>
                );
              })}
            </div>

            {/* Active Question workspace */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 space-y-6 text-left">
              
              {/* Question Header */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Question {activeItem.id} of 20 • {activeItem.broadScale} ({activeItem.syndrome})
                  </span>
                  {ratings[activeItem.id] !== undefined && (
                    <span className="text-xs text-green-400 bg-green-950/40 border border-green-500/20 px-2.5 py-0.5 rounded-full font-bold">
                      Rated: {ratings[activeItem.id] === 0 ? 'Not True' : ratings[activeItem.id] === 1 ? 'Somewhat True' : 'Very True'}
                    </span>
                  )}
                </div>
                <h3 className="text-md font-bold text-slate-200 leading-relaxed">{activeItem.label}</h3>
              </div>

              {/* 0, 1, 2 selector cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { val: 0, title: '0: Not True', desc: 'The behavior is not observed or not applicable to the child.' },
                  { val: 1, title: '1: Somewhat / Sometimes True', desc: 'The behavior is occasionally observed, or true in some settings.' },
                  { val: 2, title: '2: Very True / Often True', desc: 'The behavior is frequently observed, severe, or a regular pattern.' }
                ].map((option) => (
                  <div
                    key={option.val}
                    onClick={() => handleSelectRating(activeItem.id, option.val)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      ratings[activeItem.id] === option.val
                        ? 'bg-cyan-500/10 border-cyan-500 shadow-md'
                        : 'bg-[#161d30]/20 border-slate-850 hover:bg-[#161d30]/40'
                    }`}
                  >
                    <span className={`text-xs font-bold ${ratings[activeItem.id] === option.val ? 'text-cyan-400' : 'text-slate-300'}`}>
                      {option.title}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1.5 leading-normal">{option.desc}</p>
                  </div>
                ))}
              </div>

              {/* Back / Next buttons */}
              <div className="flex justify-between items-center pt-2 border-t border-slate-800/60">
                <button
                  disabled={activeItemIdx === 0}
                  onClick={() => setActiveItemIdx((p) => p - 1)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 disabled:opacity-30 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Previous Item
                </button>
                <button
                  disabled={activeItemIdx === cbclItems.length - 1}
                  onClick={() => setActiveItemIdx((p) => p + 1)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 disabled:opacity-30 transition-all"
                >
                  Next Item
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* Right Column Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 sticky top-6 space-y-5 text-left">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">CBCL Profile</h3>
                <p className="text-xs text-slate-500 mt-0.5">Symptom load scores</p>
              </div>

              {/* Total Score box */}
              <div className="flex flex-col items-center p-3.5 bg-[#161d30]/30 rounded-2xl border border-slate-850">
                <span className="text-4xl font-extrabold text-cyan-400">{totalScore}</span>
                <span className="text-[10px] text-slate-500 block uppercase font-bold mt-1">Total Problem Score</span>
                <div className={`mt-3 px-3 py-1.5 rounded-xl border text-[11px] font-bold text-center ${totalColor} w-full`}>
                  {totalSeverity}
                </div>
              </div>

              {/* Subscores checklist */}
              <div className="space-y-3.5 border-t border-slate-800/60 pt-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Internalizing (Max 20):</span>
                  <span className={`font-semibold ${intColor}`}>{internalizingScore} ({intSeverity})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Externalizing (Max 16):</span>
                  <span className={`font-semibold ${extColor}`}>{externalizingScore} ({extSeverity})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Attention Items (Max 4):</span>
                  <span className="font-semibold text-slate-200">{otherScore}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-2 pt-2 border-t border-slate-800/60">
                <button
                  disabled={answeredCount === 0}
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black font-semibold rounded-xl py-3 shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm animate-pulse-subtle"
                >
                  <Save className="w-4 h-4" />
                  Save CBCL Report
                </button>
                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 border border-slate-800 hover:bg-[#161d30]/40 text-slate-400 hover:text-slate-200 rounded-xl py-2 transition-all text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Scale
                </button>
              </div>

              {savedSuccess && (
                <div className="flex items-center gap-2 justify-center text-xs text-green-400 bg-green-950/30 border border-green-500/20 p-2.5 rounded-xl">
                  <Check className="w-4 h-4" />
                  CBCL report saved successfully!
                </div>
              )}

            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 shadow-xl text-left">
          {scaleLearningDb['cbcl'] ? (
            <TutorialContent text={scaleLearningDb['cbcl'].scoringTutorial} />
          ) : (
            <p className="text-slate-400">No clinical notes available for CBCL.</p>
          )}
        </div>
      )}
    </div>
  );
};
