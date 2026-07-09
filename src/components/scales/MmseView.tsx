import React, { useState, useEffect } from 'react';
import { usePatient } from '../PatientContext';
import { RotateCcw, Save, Check, BrainCircuit } from 'lucide-react';
import { scaleLearningDb } from '../../modules/learningContent';
import { TutorialContent } from '../TutorialContent';

export const MmseView: React.FC = () => {
  const { saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning'>('assessment');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // States for MMSE Items
  const [orientationTime, setOrientationTime] = useState({
    year: false,
    season: false,
    date: false,
    day: false,
    month: false,
  });

  const [orientationPlace, setOrientationPlace] = useState({
    state: false,
    country: false,
    town: false,
    hospital: false,
    floor: false,
  });

  const [registration, setRegistration] = useState({
    apple: false,
    penny: false,
    table: false,
  });

  // Attention & Calculation choice: 'serial7s' or 'spelling'
  const [attentionType, setAttentionType] = useState<'serial7s' | 'spelling'>('serial7s');
  
  // Serial 7s inputs
  const [serial7sInputs, setSerial7sInputs] = useState({
    val1: '93',
    val2: '86',
    val3: '79',
    val4: '72',
    val5: '65'
  });
  
  // Automatic checks for serial 7s
  const [serial7sScores, setSerial7sScores] = useState({
    t1: true,
    t2: true,
    t3: true,
    t4: true,
    t5: true
  });

  // Spell WORLD backwards input
  const [backwardSpelling, setBackwardSpelling] = useState('DLROW');
  const [spellingScore, setSpellingScore] = useState(5);

  const [recall, setRecall] = useState({
    apple: false,
    penny: false,
    table: false,
  });

  const [language, setLanguage] = useState({
    namePencil: false,
    nameWatch: false,
    repeatPhrase: false, // "No ifs, ands, or buts"
    cmdTakePaper: false,
    cmdFoldPaper: false,
    cmdFloorPaper: false,
    readCloseEyes: false,
    writeSentence: false,
    copyDesign: false,
  });

  const [levelOfConsciousness, setLevelOfConsciousness] = useState<'Alert' | 'Drowsy' | 'Stupor' | 'Coma'>('Alert');

  // Compute Serial 7s score:
  // Each subtraction is scored 1 point if it is exactly 7 less than the previous response.
  // Starting number is 100.
  useEffect(() => {
    const v1 = parseInt(serial7sInputs.val1);
    const v2 = parseInt(serial7sInputs.val2);
    const v3 = parseInt(serial7sInputs.val3);
    const v4 = parseInt(serial7sInputs.val4);
    const v5 = parseInt(serial7sInputs.val5);

    const t1 = v1 === 93;
    const t2 = !isNaN(v1) && (v1 - v2 === 7);
    const t3 = !isNaN(v2) && (v2 - v3 === 7);
    const t4 = !isNaN(v3) && (v3 - v4 === 7);
    const t5 = !isNaN(v4) && (v4 - v5 === 7);

    setSerial7sScores({ t1, t2, t3, t4, t5 });
  }, [serial7sInputs]);

  // Compute spelling score using LCS (Longest Common Subsequence) with "DLROW"
  useEffect(() => {
    const target = "DLROW";
    const input = backwardSpelling.toUpperCase().replace(/[^A-Z]/g, '');
    
    // LCS dynamic programming algorithm
    const m = target.length;
    const n = input.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (target[i - 1] === input[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
    const score = Math.min(5, dp[m][n]);
    setSpellingScore(score);
  }, [backwardSpelling]);

  // Load saved state if available
  useEffect(() => {
    if (reports['mmse'] && reports['mmse'].answers) {
      const data = reports['mmse'].answers;
      if (data.orientationTime) setOrientationTime(data.orientationTime);
      if (data.orientationPlace) setOrientationPlace(data.orientationPlace);
      if (data.registration) setRegistration(data.registration);
      if (data.attentionType) setAttentionType(data.attentionType);
      if (data.serial7sInputs) setSerial7sInputs(data.serial7sInputs);
      if (data.backwardSpelling) setBackwardSpelling(data.backwardSpelling);
      if (data.recall) setRecall(data.recall);
      if (data.language) setLanguage(data.language);
      if (data.levelOfConsciousness) setLevelOfConsciousness(data.levelOfConsciousness);
    }
  }, [reports]);

  // Calculations
  const timeScore = Object.values(orientationTime).filter(Boolean).length;
  const placeScore = Object.values(orientationPlace).filter(Boolean).length;
  const regScore = Object.values(registration).filter(Boolean).length;
  
  let attentionScore = 0;
  if (attentionType === 'serial7s') {
    attentionScore = Object.values(serial7sScores).filter(Boolean).length;
  } else {
    attentionScore = spellingScore;
  }

  const recallScore = Object.values(recall).filter(Boolean).length;
  const langScore = Object.values(language).filter(Boolean).length;

  const totalScore = timeScore + placeScore + regScore + attentionScore + recallScore + langScore;

  let severity = 'Normal Cognitive Function';
  let severityClass = 'text-green-400 bg-green-950/40 border-green-500/30';
  if (totalScore <= 9) {
    severity = 'Severe Cognitive Impairment';
    severityClass = 'text-red-400 bg-red-950/40 border-red-500/30';
  } else if (totalScore <= 18) {
    severity = 'Moderate Cognitive Impairment';
    severityClass = 'text-orange-400 bg-orange-950/40 border-orange-500/30';
  } else if (totalScore <= 23) {
    severity = 'Mild Cognitive Impairment';
    severityClass = 'text-yellow-400 bg-yellow-950/40 border-yellow-500/30';
  }

  const handleReset = () => {
    setOrientationTime({ year: false, season: false, date: false, day: false, month: false });
    setOrientationPlace({ state: false, country: false, town: false, hospital: false, floor: false });
    setRegistration({ apple: false, penny: false, table: false });
    setSerial7sInputs({ val1: '93', val2: '86', val3: '79', val4: '72', val5: '65' });
    setBackwardSpelling('DLROW');
    setRecall({ apple: false, penny: false, table: false });
    setLanguage({
      namePencil: false, nameWatch: false, repeatPhrase: false,
      cmdTakePaper: false, cmdFoldPaper: false, cmdFloorPaper: false,
      readCloseEyes: false, writeSentence: false, copyDesign: false
    });
    setLevelOfConsciousness('Alert');
    setSavedSuccess(false);
  };

  const handleSave = () => {
    const reportData = {
      total: totalScore,
      severity,
      levelOfConsciousness,
      subscores: {
        'Orientation (Time)': timeScore,
        'Orientation (Place)': placeScore,
        'Registration': regScore,
        'Attention & Calculation': attentionScore,
        'Recall': recallScore,
        'Language & Copying': langScore
      },
      answers: {
        orientationTime,
        orientationPlace,
        registration,
        attentionType,
        serial7sInputs,
        backwardSpelling,
        recall,
        language,
        levelOfConsciousness
      },
      interpretation: `Mini-Mental State Examination total score: ${totalScore}/30 (${severity}). Level of consciousness: ${levelOfConsciousness}. 
- Orientation to Time: ${timeScore}/5
- Orientation to Place: ${placeScore}/5
- Registration: ${regScore}/3
- Attention & Calculation: ${attentionScore}/5 (${attentionType === 'serial7s' ? 'Serial 7s' : 'Spelling "WORLD" backwards'})
- Recall: ${recallScore}/3
- Language & Design Copying: ${langScore}/9`
    };

    saveReport('mmse', reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#151b2c] p-6 rounded-2xl border border-slate-800 shadow-xl gap-4">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 flex items-center gap-2">
            <BrainCircuit className="w-7 h-7 text-cyan-400" />
            Mini-Mental State Examination (MMSE)
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Gold-standard 30-point cognitive screener. Rates orientation, registration, attention, recall, and language.
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Scoring Panels */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Orientation */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 space-y-4">
              <h3 className="text-md font-semibold text-cyan-400 border-b border-slate-800/60 pb-2">1. Orientation (Max: 10 points)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Time */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Orientation to Time (5 points)</span>
                  <p className="text-slate-400 text-xs italic">Ask: "What is the (year) (season) (date) (day) (month)?"</p>
                  <div className="space-y-2 pt-1">
                    {Object.keys(orientationTime).map((key) => (
                      <label key={key} className="flex items-center gap-3 p-2 bg-[#161d30]/30 rounded-xl hover:bg-[#161d30]/60 cursor-pointer transition-all border border-transparent hover:border-slate-800/40">
                        <input
                          type="checkbox"
                          checked={orientationTime[key as keyof typeof orientationTime]}
                          onChange={(e) => setOrientationTime({ ...orientationTime, [key]: e.target.checked })}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/40"
                        />
                        <span className="capitalize text-slate-300 text-sm">{key}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Place */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Orientation to Place (5 points)</span>
                  <p className="text-slate-400 text-xs italic">Ask: "Where are we (state) (country) (town) (hospital) (floor)?"</p>
                  <div className="space-y-2 pt-1">
                    {Object.keys(orientationPlace).map((key) => (
                      <label key={key} className="flex items-center gap-3 p-2 bg-[#161d30]/30 rounded-xl hover:bg-[#161d30]/60 cursor-pointer transition-all border border-transparent hover:border-slate-800/40">
                        <input
                          type="checkbox"
                          checked={orientationPlace[key as keyof typeof orientationPlace]}
                          onChange={(e) => setOrientationPlace({ ...orientationPlace, [key]: e.target.checked })}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/40"
                        />
                        <span className="capitalize text-slate-300 text-sm">{key === 'town' ? 'Town/City' : key}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Registration */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 space-y-4">
              <h3 className="text-md font-semibold text-cyan-400 border-b border-slate-800/60 pb-2">2. Registration (Max: 3 points)</h3>
              <p className="text-slate-400 text-xs italic">
                Say: "Name 3 objects: Apple, Penny, Table (1 second each). Then ask the patient to repeat all 3."
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {Object.keys(registration).map((key) => (
                  <label key={key} className="flex items-center gap-3 p-3 bg-[#161d30]/30 rounded-xl hover:bg-[#161d30]/60 cursor-pointer transition-all border border-slate-800/20">
                    <input
                      type="checkbox"
                      checked={registration[key as keyof typeof registration]}
                      onChange={(e) => setRegistration({ ...registration, [key]: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/40"
                    />
                    <span className="capitalize text-slate-300 text-sm font-medium">{key}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Attention & Calculation */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <h3 className="text-md font-semibold text-cyan-400">3. Attention & Calculation (Max: 5 points)</h3>
                <div className="flex bg-[#161d30] p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setAttentionType('serial7s')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      attentionType === 'serial7s' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Serial 7s
                  </button>
                  <button
                    onClick={() => setAttentionType('spelling')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      attentionType === 'spelling' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    WORLD Backwards
                  </button>
                </div>
              </div>

              {attentionType === 'serial7s' ? (
                <div className="space-y-4">
                  <p className="text-slate-400 text-xs italic">
                    Say: "Begin with 100 and count backward by 7. Stop after 5 subtractions." (Correct: 93, 86, 79, 72, 65)
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.keys(serial7sInputs).map((key, idx) => (
                      <div key={key} className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase tracking-wider block">Trial {idx + 1}</label>
                        <input
                          type="text"
                          value={serial7sInputs[key as keyof typeof serial7sInputs]}
                          onChange={(e) => setSerial7sInputs({ ...serial7sInputs, [key]: e.target.value })}
                          className={`w-full bg-[#161d30] border rounded-xl py-2 px-3 text-center text-sm font-semibold transition-all focus:outline-none ${
                            serial7sScores[`t${idx + 1}` as keyof typeof serial7sScores]
                              ? 'border-green-500/30 text-green-400 focus:ring-green-500/20'
                              : 'border-slate-800 text-slate-300 focus:ring-cyan-500/20'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-[#161d30]/30 rounded-xl border border-slate-800/40 flex justify-between items-center">
                    <span className="text-xs text-slate-400">Validated Subscore:</span>
                    <span className="text-sm font-semibold text-green-400">
                      {Object.values(serial7sScores).filter(Boolean).length} / 5 points
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-slate-400 text-xs italic">
                    Say: "Spell the word 'WORLD' backwards." (Correct relative letters score dynamically calculated via LCS)
                  </p>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 uppercase tracking-wider block">Patient Spelling Response</label>
                    <input
                      type="text"
                      value={backwardSpelling}
                      onChange={(e) => setBackwardSpelling(e.target.value.toUpperCase())}
                      placeholder="e.g. DLROW"
                      className="w-full bg-[#161d30] border border-slate-800 rounded-xl py-2.5 px-4 text-slate-200 text-sm font-semibold tracking-widest uppercase focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                  <div className="p-3 bg-[#161d30]/30 rounded-xl border border-slate-800/40 flex justify-between items-center">
                    <div className="text-xs text-slate-400">
                      LCS Evaluated score for <span className="font-mono text-cyan-400">"{backwardSpelling}"</span>:
                    </div>
                    <span className="text-sm font-semibold text-green-400">
                      {spellingScore} / 5 points
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Recall */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 space-y-4">
              <h3 className="text-md font-semibold text-cyan-400 border-b border-slate-800/60 pb-2">4. Recall (Max: 3 points)</h3>
              <p className="text-slate-400 text-xs italic">
                Ask: "What were the three objects I asked you to remember?" (Apple, Penny, Table)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {Object.keys(recall).map((key) => (
                  <label key={key} className="flex items-center gap-3 p-3 bg-[#161d30]/30 rounded-xl hover:bg-[#161d30]/60 cursor-pointer transition-all border border-slate-800/20">
                    <input
                      type="checkbox"
                      checked={recall[key as keyof typeof recall]}
                      onChange={(e) => setRecall({ ...recall, [key]: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/40"
                    />
                    <span className="capitalize text-slate-300 text-sm font-medium">{key}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 5. Language & Design Copying */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 space-y-4">
              <h3 className="text-md font-semibold text-cyan-400 border-b border-slate-800/60 pb-2">5. Language & Design Copying (Max: 9 points)</h3>
              
              <div className="space-y-3">
                {/* Pencil/Watch */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="flex-1 flex items-center gap-3 p-3 bg-[#161d30]/30 rounded-xl hover:bg-[#161d30]/60 cursor-pointer transition-all border border-slate-800/20">
                    <input
                      type="checkbox"
                      checked={language.namePencil}
                      onChange={(e) => setLanguage({ ...language, namePencil: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500"
                    />
                    <div className="text-left">
                      <span className="text-slate-300 text-sm font-medium block">Name Pencil</span>
                      <span className="text-[10px] text-slate-500">Show a pencil and ask to name (1 pt)</span>
                    </div>
                  </label>
                  <label className="flex-1 flex items-center gap-3 p-3 bg-[#161d30]/30 rounded-xl hover:bg-[#161d30]/60 cursor-pointer transition-all border border-slate-800/20">
                    <input
                      type="checkbox"
                      checked={language.nameWatch}
                      onChange={(e) => setLanguage({ ...language, nameWatch: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500"
                    />
                    <div className="text-left">
                      <span className="text-slate-300 text-sm font-medium block">Name Watch</span>
                      <span className="text-[10px] text-slate-500">Show a watch and ask to name (1 pt)</span>
                    </div>
                  </label>
                </div>

                {/* Repeat phrase */}
                <label className="flex items-center gap-3 p-3 bg-[#161d30]/30 rounded-xl hover:bg-[#161d30]/60 cursor-pointer transition-all border border-slate-800/20">
                  <input
                    type="checkbox"
                    checked={language.repeatPhrase}
                    onChange={(e) => setLanguage({ ...language, repeatPhrase: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500"
                  />
                  <div className="text-left">
                    <span className="text-slate-300 text-sm font-medium block">Repeat: "No ifs, ands, or buts"</span>
                    <span className="text-[10px] text-slate-500">Repeat the exact phrase. Allow only 1 trial (1 pt)</span>
                  </div>
                </label>

                {/* 3-stage command */}
                <div className="p-4 bg-[#161d30]/20 rounded-xl border border-slate-800/40 space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">3-Stage Command (3 points)</span>
                  <p className="text-slate-400 text-xs italic">Say: "Take this paper in your hand, fold it in half, and put it on the floor."</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    <label className="flex items-center gap-2 p-2 bg-[#161d30]/40 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={language.cmdTakePaper}
                        onChange={(e) => setLanguage({ ...language, cmdTakePaper: e.target.checked })}
                        className="w-4 h-4 rounded text-cyan-500 bg-slate-800"
                      />
                      <span className="text-slate-300 text-xs">Takes in hand</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-[#161d30]/40 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={language.cmdFoldPaper}
                        onChange={(e) => setLanguage({ ...language, cmdFoldPaper: e.target.checked })}
                        className="w-4 h-4 rounded text-cyan-500 bg-slate-800"
                      />
                      <span className="text-slate-300 text-xs">Folds in half</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-[#161d30]/40 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={language.cmdFloorPaper}
                        onChange={(e) => setLanguage({ ...language, cmdFloorPaper: e.target.checked })}
                        className="w-4 h-4 rounded text-cyan-500 bg-slate-800"
                      />
                      <span className="text-slate-300 text-xs">Puts on floor</span>
                    </label>
                  </div>
                </div>

                {/* Read & Obey, Write sentence */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="flex-1 flex items-center gap-3 p-3 bg-[#161d30]/30 rounded-xl hover:bg-[#161d30]/60 cursor-pointer transition-all border border-slate-800/20">
                    <input
                      type="checkbox"
                      checked={language.readCloseEyes}
                      onChange={(e) => setLanguage({ ...language, readCloseEyes: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500"
                    />
                    <div className="text-left">
                      <span className="text-slate-300 text-sm font-medium block">Read & Obey</span>
                      <span className="text-[10px] text-slate-500">Read and obey: "CLOSE YOUR EYES" (1 pt)</span>
                    </div>
                  </label>
                  <label className="flex-1 flex items-center gap-3 p-3 bg-[#161d30]/30 rounded-xl hover:bg-[#161d30]/60 cursor-pointer transition-all border border-slate-800/20">
                    <input
                      type="checkbox"
                      checked={language.writeSentence}
                      onChange={(e) => setLanguage({ ...language, writeSentence: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500"
                    />
                    <div className="text-left">
                      <span className="text-slate-300 text-sm font-medium block">Write Sentence</span>
                      <span className="text-[10px] text-slate-500">Must write a spontaneous, logical sentence (1 pt)</span>
                    </div>
                  </label>
                </div>

                {/* Design Copy */}
                <div className="flex flex-col sm:flex-row gap-4 p-4 bg-[#161d30]/10 rounded-xl border border-slate-800/30">
                  <label className="flex-1 flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={language.copyDesign}
                      onChange={(e) => setLanguage({ ...language, copyDesign: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-cyan-500"
                    />
                    <div className="text-left">
                      <span className="text-slate-300 text-sm font-medium block">Copy Design</span>
                      <span className="text-[10px] text-slate-500 block">Copy two intersecting pentagons. All 10 angles must be present, and the intersection must form a quadrilateral (1 pt).</span>
                    </div>
                  </label>
                  <div className="flex justify-center items-center p-2 bg-[#090d16] rounded-xl border border-slate-800">
                    {/* Intersecting Pentagons SVG */}
                    <svg width="120" height="70" viewBox="0 0 120 70" className="opacity-70">
                      {/* Pentagon 1 */}
                      <polygon points="25,5 55,20 45,55 10,55 5,20" fill="none" stroke="#22d3ee" strokeWidth="2" />
                      {/* Pentagon 2 */}
                      <polygon points="50,15 80,5 95,35 70,60 40,40" fill="none" stroke="#818cf8" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>

            {/* Level of Consciousness */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-300">Level of Consciousness</h3>
                <p className="text-slate-500 text-xs mt-0.5">Assess patient's current level of awareness along a clinical continuum.</p>
              </div>
              <div className="flex gap-2 bg-[#161d30] p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
                {(['Alert', 'Drowsy', 'Stupor', 'Coma'] as const).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLevelOfConsciousness(loc)}
                    className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      levelOfConsciousness === loc ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Scoring Summary */}
          <div className="space-y-6">
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 sticky top-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Scoring Summary</h3>
                <p className="text-xs text-slate-500 mt-0.5">Real-time composite indexing</p>
              </div>

              {/* Huge score circle */}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="relative flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="#06b6d4"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={364.4}
                      strokeDashoffset={364.4 - (364.4 * totalScore) / 30}
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-4xl font-extrabold text-white">{totalScore}</span>
                    <span className="text-xs text-slate-500 block">/ 30 points</span>
                  </div>
                </div>
                
                <div className={`mt-4 px-3 py-1.5 rounded-xl border text-xs font-bold text-center ${severityClass} transition-all`}>
                  {severity}
                </div>
              </div>

              {/* Subscores list */}
              <div className="space-y-2 border-t border-slate-800/60 pt-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Orientation (Time)</span>
                  <span className="font-semibold text-slate-200">{timeScore}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Orientation (Place)</span>
                  <span className="font-semibold text-slate-200">{placeScore}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Registration</span>
                  <span className="font-semibold text-slate-200">{regScore}/3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Attention & Calculation</span>
                  <span className="font-semibold text-slate-200">{attentionScore}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Recall</span>
                  <span className="font-semibold text-slate-200">{recallScore}/3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Language & Copying</span>
                  <span className="font-semibold text-slate-200">{langScore}/9</span>
                </div>
                <div className="flex justify-between border-t border-slate-800/40 pt-2 text-slate-300 font-medium">
                  <span>Consciousness Level</span>
                  <span className="text-cyan-400 font-semibold">{levelOfConsciousness}</span>
                </div>
              </div>

              {/* Save & Reset */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black font-semibold rounded-xl py-3 shadow-lg shadow-cyan-950/20 active:scale-95 transition-all text-sm"
                >
                  <Save className="w-4 h-4" />
                  Save Assessment Report
                </button>
                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 border border-slate-800 hover:bg-[#161d30]/40 text-slate-400 hover:text-slate-200 rounded-xl py-2 transition-all text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear Form Data
                </button>
              </div>

              {savedSuccess && (
                <div className="flex items-center gap-2 justify-center text-xs text-green-400 bg-green-950/30 border border-green-500/20 p-2.5 rounded-xl animate-fade-in">
                  <Check className="w-4 h-4" />
                  Report saved successfully to Patient Profile!
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 shadow-xl text-left">
          {scaleLearningDb['mmse'] ? (
            <TutorialContent text={scaleLearningDb['mmse'].scoringTutorial} />
          ) : (
            <p className="text-slate-400">No clinical notes available for MMSE.</p>
          )}
        </div>
      )}
    </div>
  );
};
