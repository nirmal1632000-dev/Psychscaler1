import React, { useState, useEffect } from 'react';
import { usePatient } from '../PatientContext';
import { RotateCcw, Save, Check, FileText, HeartHandshake } from 'lucide-react';
import { scaleLearningDb } from '../../modules/learningContent';
import { TutorialContent } from '../TutorialContent';

export const MacCatView: React.FC = () => {
  const { saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning'>('assessment');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Disclosure fields (clinician inputs what was explained to the patient)
  const [disclosure, setDisclosure] = useState({
    condition: 'e.g. Paranoid schizophrenia with active persecutory delusions.',
    treatment: 'e.g. Initiation of oral atypical antipsychotic (Risperidone 2mg daily).',
    benefits: 'e.g. Reduction in anxiety, fear, and paranoia; improvement in sleep.',
    risks: 'e.g. Extrapyramidal side effects, weight gain, sedation.',
    alternatives: 'e.g. Alternative antipsychotic, supportive therapy, or refusal of treatment.'
  });

  // Ratings (each rated 0, 1, or 2)
  const [ratings, setRatings] = useState<Record<string, number>>({
    underDisorder: 2,
    underTreatment: 2,
    underBenefits: 2,
    apprecDisorder: 2,
    apprecTreatment: 2,
    reasonConsequence: 2,
    reasonCompare: 2,
    reasonGenerate: 2,
    reasonLogical: 2,
    choiceExpression: 2
  });

  // Load saved state if available
  useEffect(() => {
    if (reports['maccat'] && reports['maccat'].answers) {
      const data = reports['maccat'].answers;
      if (data.disclosure) setDisclosure(data.disclosure);
      if (data.ratings) setRatings(data.ratings);
    }
  }, [reports]);

  // Scoring
  const understandingScore = (ratings.underDisorder || 0) + (ratings.underTreatment || 0) + (ratings.underBenefits || 0); // Max 6
  const appreciationScore = (ratings.apprecDisorder || 0) + (ratings.apprecTreatment || 0); // Max 4
  const reasoningScore = (ratings.reasonConsequence || 0) + (ratings.reasonCompare || 0) + (ratings.reasonGenerate || 0) + (ratings.reasonLogical || 0); // Max 8
  const choiceScore = ratings.choiceExpression || 0; // Max 2

  const handleSelectRating = (key: string, val: number) => {
    setRatings({ ...ratings, [key]: val });
  };

  const handleReset = () => {
    setDisclosure({
      condition: '',
      treatment: '',
      benefits: '',
      risks: '',
      alternatives: ''
    });
    setRatings({
      underDisorder: 0,
      underTreatment: 0,
      underBenefits: 0,
      apprecDisorder: 0,
      apprecTreatment: 0,
      reasonConsequence: 0,
      reasonCompare: 0,
      reasonGenerate: 0,
      reasonLogical: 0,
      choiceExpression: 0
    });
    setSavedSuccess(false);
  };

  const handleSave = () => {
    const reportData = {
      total: understandingScore + appreciationScore + reasoningScore + choiceScore,
      subscores: {
        'Understanding': understandingScore,
        'Appreciation': appreciationScore,
        'Reasoning': reasoningScore,
        'Expressing a Choice': choiceScore
      },
      answers: {
        disclosure,
        ratings
      },
      interpretation: `MacArthur Competence Assessment Tool-Treatment (MacCAT-T) Capacity Profile:
- Understanding Subscale: ${understandingScore}/6 (patient's grasp of condition & treatment details)
- Appreciation Subscale: ${appreciationScore}/4 (patient's personal acknowledgment of illness & treatment benefits)
- Reasoning Subscale: ${reasoningScore}/8 (patient's rational manipulation of options)
- Expressing a Choice: ${choiceScore}/2 (patient's ability to communicate a stable choice)
Clinical interpretation depends on the specific patterns. Low scores in Appreciation (e.g. <3) often signal lack of insight/delusional denial, while low scores in Understanding suggest cognitive or language deficits.`
    };

    saveReport('maccat', reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#151b2c] p-6 rounded-2xl border border-slate-800 shadow-xl gap-4">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 flex items-center gap-2">
            <HeartHandshake className="w-7 h-7 text-cyan-400" />
            MacCAT-T Competence capacity Tool
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            MacArthur Competence Assessment Tool for Treatment. Rates patient capacity to consent to treatment.
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
          {/* Main Assessment Panel */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Clinical Disclosure log */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 space-y-4 text-left">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <FileText className="w-4.5 h-4.5" />
                1. Clinical Disclosure Record
              </h3>
              <p className="text-slate-500 text-xs">
                Record the specific treatment details disclosed to the patient prior to capacity testing.
              </p>

              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">A. Disclosed Condition & Symptoms</label>
                  <textarea
                    value={disclosure.condition}
                    onChange={(e) => setDisclosure({ ...disclosure, condition: e.target.value })}
                    className="w-full bg-[#161d30] border border-slate-800 rounded-xl p-3 text-slate-200 text-xs focus:outline-none focus:border-cyan-500/50 min-h-[60px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">B. Recommended Treatment Details</label>
                  <textarea
                    value={disclosure.treatment}
                    onChange={(e) => setDisclosure({ ...disclosure, treatment: e.target.value })}
                    className="w-full bg-[#161d30] border border-slate-800 rounded-xl p-3 text-slate-200 text-xs focus:outline-none focus:border-cyan-500/50 min-h-[60px]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-semibold">C. Expected Benefits</label>
                    <textarea
                      value={disclosure.benefits}
                      onChange={(e) => setDisclosure({ ...disclosure, benefits: e.target.value })}
                      className="w-full bg-[#161d30] border border-slate-800 rounded-xl p-3 text-slate-200 text-xs focus:outline-none focus:border-cyan-500/50 min-h-[60px]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-semibold">D. Risks & Side-Effects</label>
                    <textarea
                      value={disclosure.risks}
                      onChange={(e) => setDisclosure({ ...disclosure, risks: e.target.value })}
                      className="w-full bg-[#161d30] border border-slate-800 rounded-xl p-3 text-slate-200 text-xs focus:outline-none focus:border-cyan-500/50 min-h-[60px]"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">E. Available Alternatives</label>
                  <textarea
                    value={disclosure.alternatives}
                    onChange={(e) => setDisclosure({ ...disclosure, alternatives: e.target.value })}
                    className="w-full bg-[#161d30] border border-slate-800 rounded-xl p-3 text-slate-200 text-xs focus:outline-none focus:border-cyan-500/50 min-h-[60px]"
                  />
                </div>
              </div>
            </div>

            {/* Capacity Ratings */}
            <div className="space-y-4 text-left">
              
              {/* Understanding subscale */}
              <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-850 pb-2">
                  2. Understanding Subscale (Max: 6)
                </h3>
                <p className="text-slate-500 text-xs italic">
                  Ask the patient to paraphrase the details explained in the disclosure.
                </p>

                <div className="space-y-4 pt-1">
                  {[
                    { key: 'underDisorder', label: 'A. Understanding of Disorder', desc: 'Ability to explain symptoms, clinical diagnosis, and course of disorder.' },
                    { key: 'underTreatment', label: 'B. Understanding of Treatment', desc: 'Ability to explain the nature, dosing, and mechanics of proposed treatment.' },
                    { key: 'underBenefits', label: 'C. Understanding of Benefits & Risks', desc: 'Ability to recount treatment advantages, potential side effects, and options.' }
                  ].map((item) => (
                    <div key={item.key} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 bg-[#161d30]/20 rounded-xl border border-slate-850">
                      <div className="space-y-0.5 max-w-[65%]">
                        <span className="text-xs text-slate-300 font-bold block">{item.label}</span>
                        <span className="text-[10px] text-slate-500 leading-normal block">{item.desc}</span>
                      </div>
                      <div className="flex gap-1 w-full sm:w-auto">
                        {[0, 1, 2].map((val) => (
                          <button
                            key={val}
                            onClick={() => handleSelectRating(item.key, val)}
                            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                              ratings[item.key] === val
                                ? 'bg-cyan-500 text-black border-cyan-400'
                                : 'bg-[#161d30]/60 text-slate-400 border-slate-800/80 hover:bg-[#161d30]/80'
                            }`}
                          >
                            {val === 0 ? '0: Fail' : val === 1 ? '1: Partial' : '2: Full'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appreciation subscale */}
              <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-850 pb-2">
                  3. Appreciation Subscale (Max: 4)
                </h3>
                <p className="text-slate-500 text-xs italic">
                  Explore if patient recognizes the reality and personal relevance of the condition and treatment options.
                </p>

                <div className="space-y-4 pt-1">
                  {[
                    { key: 'apprecDisorder', label: 'A. Appreciation of Disorder', desc: 'Does the patient acknowledge that they have these clinical symptoms? (0 = delusional denial, 2 = full insight)' },
                    { key: 'apprecTreatment', label: 'B. Appreciation of Treatment Benefit', desc: 'Does the patient accept that proposed treatment could have benefits, or do they believe it is for malevolent/punitive reasons?' }
                  ].map((item) => (
                    <div key={item.key} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 bg-[#161d30]/20 rounded-xl border border-slate-850">
                      <div className="space-y-0.5 max-w-[65%]">
                        <span className="text-xs text-slate-300 font-bold block">{item.label}</span>
                        <span className="text-[10px] text-slate-500 leading-normal block">{item.desc}</span>
                      </div>
                      <div className="flex gap-1 w-full sm:w-auto">
                        {[0, 1, 2].map((val) => (
                          <button
                            key={val}
                            onClick={() => handleSelectRating(item.key, val)}
                            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                              ratings[item.key] === val
                                ? 'bg-cyan-500 text-black border-cyan-400'
                                : 'bg-[#161d30]/60 text-slate-400 border-slate-800/80 hover:bg-[#161d30]/80'
                            }`}
                          >
                            {val === 0 ? '0: Delusion/No' : val === 1 ? '1: Hesitant' : '2: Acknowledged'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reasoning subscale */}
              <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-850 pb-2">
                  4. Reasoning Subscale (Max: 8)
                </h3>
                <p className="text-slate-500 text-xs italic">
                  Evaluate patient's rational manipulation of options and consequences.
                </p>

                <div className="space-y-4 pt-1">
                  {[
                    { key: 'reasonConsequence', label: 'A. Consequential Thinking', desc: 'Ability to explain consequences of accepting/refusing proposed treatment.' },
                    { key: 'reasonCompare', label: 'B. Comparative Thinking', desc: 'Ability to compare alternative options side-by-side.' },
                    { key: 'reasonGenerate', label: 'C. Generating Consequences', desc: 'Ability to identify additional consequence dynamics beyond standard disclosure.' },
                    { key: 'reasonLogical', label: 'D. Logical Consistency', desc: 'Does the patient\'s final choice follow logically from their stated values and reasons?' }
                  ].map((item) => (
                    <div key={item.key} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 bg-[#161d30]/20 rounded-xl border border-slate-850">
                      <div className="space-y-0.5 max-w-[65%]">
                        <span className="text-xs text-slate-300 font-bold block">{item.label}</span>
                        <span className="text-[10px] text-slate-500 leading-normal block">{item.desc}</span>
                      </div>
                      <div className="flex gap-1 w-full sm:w-auto">
                        {[0, 1, 2].map((val) => (
                          <button
                            key={val}
                            onClick={() => handleSelectRating(item.key, val)}
                            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                              ratings[item.key] === val
                                ? 'bg-cyan-500 text-black border-cyan-400'
                                : 'bg-[#161d30]/60 text-slate-400 border-slate-800/80 hover:bg-[#161d30]/80'
                            }`}
                          >
                            {val === 0 ? '0: Absent' : val === 1 ? '1: Partial' : '2: Logical/Full'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expressing a Choice */}
              <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-850 pb-2">
                  5. Expressing a Choice (Max: 2)
                </h3>
                <p className="text-slate-500 text-xs italic">
                  Evaluate patient's ability to arrive at and state a clear preference.
                </p>

                <div className="pt-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 bg-[#161d30]/20 rounded-xl border border-slate-850">
                    <div className="space-y-0.5 max-w-[65%]">
                      <span className="text-xs text-slate-300 font-bold block">A. Expression of Choice</span>
                      <span className="text-[10px] text-slate-500 leading-normal block">Ability to state a clear, stable preference (0 = mute/no choice, 1 = severe ambivalence, 2 = clear choice).</span>
                    </div>
                    <div className="flex gap-1 w-full sm:w-auto">
                      {[0, 1, 2].map((val) => (
                        <button
                          key={val}
                          onClick={() => handleSelectRating('choiceExpression', val)}
                          className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                            ratings.choiceExpression === val
                              ? 'bg-cyan-500 text-black border-cyan-400'
                              : 'bg-[#161d30]/60 text-slate-400 border-slate-800/80 hover:bg-[#161d30]/80'
                          }`}
                        >
                          {val === 0 ? '0: No Choice' : val === 1 ? '1: Ambivalent' : '2: Stable Choice'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Sidebar scoring panel */}
          <div className="space-y-6">
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 sticky top-6 space-y-5">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Competence Summary</h3>
                <p className="text-xs text-slate-500 mt-0.5">Capacity profile scoring</p>
              </div>

              {/* Subscores details list */}
              <div className="space-y-4">
                {/* Understanding */}
                <div className="p-3 bg-[#161d30]/30 rounded-xl border border-slate-800/60 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-300">Understanding</span>
                    <span className="font-semibold text-cyan-400 font-mono">{understandingScore}/6</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${(understandingScore / 6) * 100}%` }}></div>
                  </div>
                </div>

                {/* Appreciation */}
                <div className="p-3 bg-[#161d30]/30 rounded-xl border border-slate-800/60 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-300">Appreciation</span>
                    <span className="font-semibold text-cyan-400 font-mono">{appreciationScore}/4</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${(appreciationScore / 4) * 100}%` }}></div>
                  </div>
                </div>

                {/* Reasoning */}
                <div className="p-3 bg-[#161d30]/30 rounded-xl border border-slate-800/60 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-300">Reasoning</span>
                    <span className="font-semibold text-cyan-400 font-mono">{reasoningScore}/8</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${(reasoningScore / 8) * 100}%` }}></div>
                  </div>
                </div>

                {/* Choice */}
                <div className="p-3 bg-[#161d30]/30 rounded-xl border border-slate-800/60 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-300">Expressing Choice</span>
                    <span className="font-semibold text-cyan-400 font-mono">{choiceScore}/2</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${(choiceScore / 2) * 100}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-[#161d30]/20 rounded-xl p-3 border border-slate-850 text-[10px] text-slate-500 leading-relaxed text-left">
                <strong>Interpretation note:</strong> Competence is a legal determination. These subscores grade individual capacity dimensions to help inform the clinician's diagnostic assessment. No cutoffs exist.
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black font-semibold rounded-xl py-3 shadow-lg active:scale-95 transition-all text-sm animate-pulse-subtle"
                >
                  <Save className="w-4 h-4" />
                  Save Capacity Profile
                </button>
                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 border border-slate-800 hover:bg-[#161d30]/40 text-slate-400 hover:text-slate-200 rounded-xl py-2 transition-all text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Assessment
                </button>
              </div>

              {savedSuccess && (
                <div className="flex items-center gap-2 justify-center text-xs text-green-400 bg-green-950/30 border border-green-500/20 p-2.5 rounded-xl">
                  <Check className="w-4 h-4" />
                  Competence report saved successfully!
                </div>
              )}

            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 shadow-xl text-left">
          {scaleLearningDb['maccat'] ? (
            <TutorialContent text={scaleLearningDb['maccat'].scoringTutorial} />
          ) : (
            <p className="text-slate-400">No clinical notes available for MacCAT-T.</p>
          )}
        </div>
      )}
    </div>
  );
};
