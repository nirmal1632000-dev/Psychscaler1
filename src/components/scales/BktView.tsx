import React, { useState, useEffect } from 'react';
import { usePatient } from '../PatientContext';
import { RotateCcw, Save, Check, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { scaleLearningDb } from '../../modules/learningContent';
import { TutorialContent } from '../TutorialContent';

interface BktAgeLevel {
  age: number;
  monthsCredit: number; // Credit per item passed
  items: { id: number; text: string; domain: string }[];
}

const bktAgeLevels: BktAgeLevel[] = [
  {
    age: 3,
    monthsCredit: 2,
    items: [
      { id: 31, text: 'Pointing to parts of the body (nose, eyes, mouth)', domain: 'Language / Motor' },
      { id: 32, text: 'Naming familiar objects in pictures (key, cup, shoe)', domain: 'Language' },
      { id: 33, text: 'Repeating two digits (e.g. 3 - 7)', domain: 'Memory' },
      { id: 34, text: 'Enumeration of objects in a picture', domain: 'Language / Reasoning' },
      { id: 35, text: 'Repeating 6–7 syllables (simple sentence)', domain: 'Memory' },
      { id: 36, text: 'Comparison of lines (which is longer?)', domain: 'Visual-Motor / Reasoning' }
    ]
  },
  {
    age: 4,
    monthsCredit: 2,
    items: [
      { id: 41, text: 'Repeating three digits (e.g. 5 - 2 - 8)', domain: 'Memory' },
      { id: 42, text: 'Discrimination of geometric forms', domain: 'Visual-Motor' },
      { id: 43, text: 'Comprehension of first degree (e.g. what to do when hungry/sleepy)', domain: 'Social Intelligence' },
      { id: 44, text: 'Repeating 12–30 syllables (longer sentence)', domain: 'Memory' },
      { id: 45, text: 'Counting four coins (paise)', domain: 'Reasoning / Numerical' },
      { id: 46, text: 'Copying a square', domain: 'Visual-Motor' }
    ]
  },
  {
    age: 5,
    monthsCredit: 2,
    items: [
      { id: 51, text: 'Comparison of weights (3g vs 15g)', domain: 'Visual-Motor / Reasoning' },
      { id: 52, text: 'Naming colors (Red, Yellow, Blue, Green)', domain: 'Language / Conceptual' },
      { id: 53, text: 'Aesthetic comparison (Which face is prettier?)', domain: 'Reasoning' },
      { id: 54, text: 'Definitions of simple nouns (e.g. chair, horse, fork)', domain: 'Language' },
      { id: 55, text: 'Copying a triangle', domain: 'Visual-Motor' },
      { id: 56, text: 'Repeating four digits (e.g. 7 - 2 - 9 - 4)', domain: 'Memory' }
    ]
  },
  {
    age: 6,
    monthsCredit: 2,
    items: [
      { id: 61, text: 'Distinguishing right and left (ear, eye, hand)', domain: 'Social Intelligence / Motor' },
      { id: 62, text: 'Finding omissions in pictures', domain: 'Reasoning' },
      { id: 63, text: 'Counting 13 coins (paise)', domain: 'Reasoning / Numerical' },
      { id: 64, text: 'Comprehension of second degree (e.g. what to do if house is on fire)', domain: 'Social Intelligence' },
      { id: 65, text: 'Coins identification (rupee, anna, paise)', domain: 'Conceptual / Social' },
      { id: 66, text: 'Repeating 16–18 syllables (complex sentence)', domain: 'Memory' }
    ]
  },
  {
    age: 7,
    monthsCredit: 2,
    items: [
      { id: 71, text: 'Picture description and interpretation', domain: 'Language / Reasoning' },
      { id: 72, text: 'Copying a diamond (rhombus)', domain: 'Visual-Motor' },
      { id: 73, text: 'Repeating five digits (e.g. 3 - 1 - 8 - 4 - 6)', domain: 'Memory' },
      { id: 74, text: 'Naming days of the week in order', domain: 'Conceptual / Memory' },
      { id: 75, text: 'Repeating three digits backwards (e.g. 5-2-9 -> 9-2-5)', domain: 'Memory' },
      { id: 76, text: 'Differences between simple things (e.g. fly and butterfly)', domain: 'Conceptual / Reasoning' }
    ]
  },
  {
    age: 8,
    monthsCredit: 2,
    items: [
      { id: 81, text: 'Ball and field (finding a lost ball in a circular field)', domain: 'Reasoning / Visual-Motor' },
      { id: 82, text: 'Counting backwards from 20 to 1', domain: 'Reasoning / Numerical' },
      { id: 83, text: 'Comprehension of third degree (e.g. what to do when starting a task)', domain: 'Social Intelligence' },
      { id: 84, text: 'Similarities between things (e.g. wood and coal)', domain: 'Conceptual / Reasoning' },
      { id: 85, text: 'Definitions superior to use (e.g. defining balloon as a toy filled with air)', domain: 'Language' },
      { id: 86, text: 'Vocabulary list (definitions of simple nouns)', domain: 'Language' }
    ]
  },
  {
    age: 9,
    monthsCredit: 2,
    items: [
      { id: 91, text: 'Giving today\'s complete date (day, month, year)', domain: 'Conceptual / Memory' },
      { id: 92, text: 'Arranging 5 weights in order (3g, 6g, 9g, 12g, 15g)', domain: 'Reasoning / Visual-Motor' },
      { id: 93, text: 'Making change (subtraction with coins)', domain: 'Reasoning / Numerical' },
      { id: 94, text: 'Repeating four digits backwards', domain: 'Memory' },
      { id: 95, text: 'Three words in a sentence (creating a sentence with 3 given words)', domain: 'Language' },
      { id: 96, text: 'Rhymes (generating rhyming words)', domain: 'Language / Conceptual' }
    ]
  },
  {
    age: 10,
    monthsCredit: 2,
    items: [
      { id: 101, text: 'Vocabulary list (definitions)', domain: 'Language' },
      { id: 102, text: 'Detecting absurdities in statements (e.g. a road running downhill both ways)', domain: 'Reasoning' },
      { id: 103, text: 'Drawing designs from memory after 10 sec exposure', domain: 'Memory / Visual-Motor' },
      { id: 104, text: 'Reading and report (recalling facts from a short passage)', domain: 'Language / Memory' },
      { id: 105, text: 'Comprehension of fourth degree (social dilemmas)', domain: 'Social Intelligence' },
      { id: 106, text: 'Word association (naming 60 words in 3 minutes)', domain: 'Language / Conceptual' }
    ]
  },
  {
    age: 12,
    monthsCredit: 4,
    items: [
      { id: 121, text: 'Vocabulary list (superior definitions)', domain: 'Language' },
      { id: 122, text: 'Defining abstract words (e.g. pity, revenge, charity)', domain: 'Language / Conceptual' },
      { id: 123, text: 'Repeating five digits backwards', domain: 'Memory' },
      { id: 124, text: 'Dissected sentences (arranging jumbled words into a sentence)', domain: 'Language / Reasoning' },
      { id: 125, text: 'Similarity of three things (e.g. snake, cow, sparrow)', domain: 'Conceptual / Reasoning' },
      { id: 126, text: 'Interpretation of pictures (identifying abstract meanings)', domain: 'Language / Reasoning' }
    ]
  },
  {
    age: 14,
    monthsCredit: 4,
    items: [
      { id: 141, text: 'Vocabulary list (advanced)', domain: 'Language' },
      { id: 142, text: 'Induction (finding rules in paper folding/cutting)', domain: 'Reasoning / Visual-Motor' },
      { id: 143, text: 'Authority differences (e.g. president vs king)', domain: 'Social Intelligence / Conceptual' },
      { id: 144, text: 'Arithmetical reasoning word problems', domain: 'Reasoning / Numerical' },
      { id: 145, text: 'Reversing hands of a clock in imagination', domain: 'Visual-Motor / Reasoning' },
      { id: 146, text: 'Repeating six digits backwards', domain: 'Memory' }
    ]
  },
  {
    age: 16,
    monthsCredit: 4,
    items: [
      { id: 161, text: 'Vocabulary list (adult level)', domain: 'Language' },
      { id: 162, text: 'Differences between abstract words (e.g. laziness and idleness)', domain: 'Conceptual / Language' },
      { id: 163, text: 'Code writing (writing in simple code after studying code key)', domain: 'Reasoning / Visual-Motor' },
      { id: 164, text: 'Repeating six digits', domain: 'Memory' },
      { id: 165, text: 'Paper cutting test (tracing fold cuts)', domain: 'Visual-Motor' },
      { id: 166, text: 'Repeating 28 syllables (long complex sentence)', domain: 'Memory' }
    ]
  },
  {
    age: 19,
    monthsCredit: 6,
    items: [
      { id: 191, text: 'Vocabulary list (superior adult level)', domain: 'Language' },
      { id: 192, text: 'Ingenuity test (water jar math puzzles)', domain: 'Reasoning / Numerical' },
      { id: 193, text: 'Repeating seven digits', domain: 'Memory' },
      { id: 194, text: 'Repeating 30 syllables', domain: 'Memory' },
      { id: 195, text: 'Differences between abstract concepts', domain: 'Conceptual' },
      { id: 196, text: 'Clock hands reversal II (complex times)', domain: 'Reasoning' }
    ]
  },
  {
    age: 22,
    monthsCredit: 6,
    items: [
      { id: 221, text: 'Vocabulary list (highest adult level)', domain: 'Language' },
      { id: 222, text: 'Repeating eight digits', domain: 'Memory' },
      { id: 223, text: 'Repeating 32 syllables', domain: 'Memory' },
      { id: 224, text: 'Advanced reasoning word problems', domain: 'Reasoning' },
      { id: 225, text: 'Complex paper folding and cutting', domain: 'Visual-Motor' },
      { id: 226, text: 'Logical deduction puzzles', domain: 'Reasoning' }
    ]
  }
];

export const BktView: React.FC = () => {
  const { saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning'>('assessment');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Patient chronological age
  const [caYears, setCaYears] = useState(8);
  const [caMonths, setCaMonths] = useState(0);

  // Checkboxes of items passed (Record<itemId, boolean>)
  const [passedItems, setPassedItems] = useState<Record<number, boolean>>({});
  const [activeLevelIdx, setActiveLevelIdx] = useState(5); // Start at level 8

  // Load saved state
  useEffect(() => {
    if (reports['bkt'] && reports['bkt'].answers) {
      const data = reports['bkt'].answers;
      if (data.caYears !== undefined) setCaYears(data.caYears);
      if (data.caMonths !== undefined) setCaMonths(data.caMonths);
      if (data.passedItems) setPassedItems(data.passedItems);
    }
  }, [reports]);

  const handleToggleItem = (itemId: number) => {
    setPassedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
    setSavedSuccess(false);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all BKT data?')) {
      setPassedItems({});
      setCaYears(8);
      setCaMonths(0);
      setSavedSuccess(false);
    }
  };

  // Calculations
  const caTotalMonths = caYears * 12 + caMonths;

  // 1. Establish Basal Age: highest age level where all 6 items are passed.
  // If no age level has all 6 items passed, the basal age is considered 0 or the level below 3 (which would be 2).
  // Clinically, we search from age 3 upwards.
  let basalAgeYears = 2; // Default to 2 if none passed
  let basalIndex = -1;

  for (let i = 0; i < bktAgeLevels.length; i++) {
    const lvl = bktAgeLevels[i];
    const allPassed = lvl.items.every(item => passedItems[item.id]);
    if (allPassed) {
      basalAgeYears = lvl.age;
      basalIndex = i;
    } else {
      // Once we hit a level where not all items are passed, we don't necessarily stop, 
      // but Basal Age is the HIGHEST level where ALL items are passed.
    }
  }

  const basalAgeMonths = basalAgeYears * 12;

  // 2. Credits: Count items passed at age levels ABOVE the Basal Age level.
  let creditMonths = 0;
  bktAgeLevels.forEach((lvl, idx) => {
    if (idx > basalIndex) {
      lvl.items.forEach(item => {
        if (passedItems[item.id]) {
          creditMonths += lvl.monthsCredit;
        }
      });
    }
  });

  const mentalAgeMonths = basalAgeMonths + creditMonths;
  const mentalAgeYears = Math.floor(mentalAgeMonths / 12);
  const mentalAgeRemainingMonths = mentalAgeMonths % 12;

  // 3. Ratio IQ
  const ratioIq = caTotalMonths > 0 ? (mentalAgeMonths / caTotalMonths) * 100 : 0;

  // 4. Prorated SD 15 IQ
  // Formula: Prorated IQ = 100 + (15 / 18.7) * (Ratio IQ - 100)
  const proratedIq = 100 + (15 / 18.7) * (ratioIq - 100);

  // Severity Classifications
  let iqClassification = 'Average';
  let classColor = 'text-green-400 bg-green-950/40 border-green-500/30';
  const finalIq = Math.round(proratedIq);

  if (finalIq >= 130) {
    iqClassification = 'Very Superior';
    classColor = 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30';
  } else if (finalIq >= 120) {
    iqClassification = 'Superior';
    classColor = 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30';
  } else if (finalIq >= 110) {
    iqClassification = 'High Average';
    classColor = 'text-green-400 bg-green-950/40 border-green-500/30';
  } else if (finalIq >= 90) {
    iqClassification = 'Average';
    classColor = 'text-slate-300 bg-slate-900/60 border-slate-800';
  } else if (finalIq >= 80) {
    iqClassification = 'Low Average';
    classColor = 'text-yellow-400 bg-yellow-950/40 border-yellow-500/30';
  } else if (finalIq >= 70) {
    iqClassification = 'Borderline Cognitive Function';
    classColor = 'text-yellow-400 bg-yellow-950/40 border-yellow-500/30';
  } else if (finalIq >= 50) {
    iqClassification = 'Mild Intellectual Disability';
    classColor = 'text-orange-400 bg-orange-950/40 border-orange-500/30';
  } else if (finalIq >= 35) {
    iqClassification = 'Moderate Intellectual Disability';
    classColor = 'text-red-400 bg-red-950/40 border-red-500/30';
  } else if (finalIq >= 20) {
    iqClassification = 'Severe Intellectual Disability';
    classColor = 'text-red-400 bg-red-950/40 border-red-500/30';
  } else if (finalIq > 0) {
    iqClassification = 'Profound Intellectual Disability';
    classColor = 'text-red-400 bg-red-950/40 border-red-500/30';
  }

  const handleSave = () => {
    const reportData = {
      total: finalIq,
      caYears,
      caMonths,
      basalAgeYears,
      creditMonths,
      mentalAgeMonths,
      ratioIq,
      proratedIq,
      passedItems,
      classification: iqClassification,
      interpretation: `Binet-Kamat Test of Intelligence (BKT) Profile:
- Chronological Age: ${caYears} yrs ${caMonths} mos (${caTotalMonths} months)
- Basal Age: ${basalAgeYears} years (${basalAgeMonths} months)
- Credits Earned: ${creditMonths} months
- Mental Age: ${mentalAgeYears} yrs ${mentalAgeRemainingMonths} mos (${mentalAgeMonths} months)
- Traditional Ratio IQ: ${Math.round(ratioIq)}
- Prorated Standardized IQ (SD 15): ${finalIq} (${iqClassification})`
    };

    saveReport('bkt', reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const activeLevel = bktAgeLevels[activeLevelIdx];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#151b2c] p-6 rounded-2xl border border-slate-800 shadow-xl gap-4">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 flex items-center gap-2">
            <Shield className="w-7 h-7 text-cyan-400" />
            Binet-Kamat Test (BKT) Coder
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Binet-Kamat Test of Intelligence (Indian Adaptation). Calculates Basal Age, Mental Age, and Normalized IQ.
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
          {/* Main Question Panel */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Age Config Panel */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 text-left space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">1. Client Chronological Age (CA)</h3>
              <div className="flex gap-4">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase font-semibold">CA Years</label>
                  <input
                    type="number"
                    value={caYears}
                    onChange={(e) => setCaYears(Math.max(1, parseInt(e.target.value, 10) || 0))}
                    className="w-full bg-[#161d30] border border-slate-800 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase font-semibold">CA Months</label>
                  <input
                    type="number"
                    value={caMonths}
                    onChange={(e) => setCaMonths(Math.max(0, Math.min(11, parseInt(e.target.value, 10) || 0)))}
                    className="w-full bg-[#161d30] border border-slate-800 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Age Levels Indicators */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-xl p-3 flex justify-between items-center overflow-x-auto gap-2">
              {bktAgeLevels.map((lvl, idx) => {
                const active = activeLevelIdx === idx;
                const passedCount = lvl.items.filter(item => passedItems[item.id]).length;
                let badgeClass = 'text-slate-500 border-transparent bg-[#161d30]/20';
                if (passedCount === 6) badgeClass = 'text-green-400 border-green-500/20 bg-green-950/20';
                else if (passedCount > 0) badgeClass = 'text-yellow-400 border-yellow-500/20 bg-yellow-950/20';
                
                return (
                  <button
                    key={lvl.age}
                    onClick={() => setActiveLevelIdx(idx)}
                    className={`flex-1 min-w-[70px] py-2 rounded-lg text-xs font-bold transition-all border ${
                      active
                        ? 'bg-cyan-500 text-black border-cyan-400'
                        : `border ${badgeClass} hover:text-slate-300`
                    }`}
                  >
                    Lvl {lvl.age} ({passedCount})
                  </button>
                );
              })}
            </div>

            {/* Active Level Checklist */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 text-left space-y-4">
              <div className="flex justify-between items-center border-b border-slate-850 pb-2.5">
                <div>
                  <h3 className="text-md font-bold text-slate-200">Age Level {activeLevel.age} Years</h3>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">
                    Each passed item awards {activeLevel.monthsCredit} months mental age credit.
                  </span>
                </div>
                <button
                  onClick={() => {
                    const allPassed = activeLevel.items.every(i => passedItems[i.id]);
                    const update: Record<number, boolean> = { ...passedItems };
                    activeLevel.items.forEach(i => {
                      update[i.id] = !allPassed;
                    });
                    setPassedItems(update);
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Toggle Level
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 pt-2">
                {activeLevel.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                      passedItems[item.id]
                        ? 'bg-[#1e293b]/70 border-cyan-500/60 shadow-lg'
                        : 'bg-[#161d30]/10 border-slate-850 hover:bg-[#161d30]/40'
                    }`}
                  >
                    <div className="space-y-1 max-w-[85%]">
                      <p className="text-xs text-slate-300 font-semibold">{item.text}</p>
                      <span className="text-[9px] text-slate-500 uppercase tracking-widest block">{item.domain}</span>
                    </div>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                      passedItems[item.id] ? 'bg-cyan-500 border-cyan-400 text-black' : 'border-slate-800'
                    }`}>
                      {passedItems[item.id] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  disabled={activeLevelIdx === 0}
                  onClick={() => setActiveLevelIdx((p) => p - 1)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 disabled:opacity-30 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Previous Level
                </button>
                <button
                  disabled={activeLevelIdx === bktAgeLevels.length - 1}
                  onClick={() => setActiveLevelIdx((p) => p + 1)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 disabled:opacity-30 transition-all"
                >
                  Next Level
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* Right Summary column */}
          <div className="space-y-6">
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 sticky top-6 space-y-5 text-left">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">BKT IQ Result</h3>
                <p className="text-xs text-slate-500 mt-0.5">Calculated IQ details</p>
              </div>

              {/* Big IQ score indicator */}
              <div className="flex flex-col items-center p-3.5 bg-[#161d30]/30 rounded-2xl border border-slate-850">
                <span className="text-4xl font-extrabold text-cyan-400">{finalIq || 0}</span>
                <span className="text-[10px] text-slate-500 block uppercase font-bold mt-1">Prorated IQ (SD 15)</span>
                <div className={`mt-3 px-3 py-1.5 rounded-xl border text-xs font-bold text-center ${classColor} w-full`}>
                  {iqClassification}
                </div>
              </div>

              {/* Age metrics */}
              <div className="space-y-3.5 border-t border-slate-800/60 pt-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Chronological Age (CA):</span>
                  <span className="font-semibold text-slate-200">{caYears}y {caMonths}m ({caTotalMonths}m)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Basal Age (BA):</span>
                  <span className="font-semibold text-slate-250">{basalAgeYears}y ({basalAgeMonths}m)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Credits Earned:</span>
                  <span className="font-semibold text-slate-200">+{creditMonths} months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Mental Age (MA):</span>
                  <span className="font-semibold text-slate-200">{mentalAgeYears}y {mentalAgeRemainingMonths}m ({mentalAgeMonths}m)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Ratio IQ (SD 18.7):</span>
                  <span className="font-semibold text-slate-200">{Math.round(ratioIq)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-2 pt-2 border-t border-slate-800/60">
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black font-semibold rounded-xl py-3 shadow-lg active:scale-95 transition-all text-sm animate-pulse-subtle"
                >
                  <Save className="w-4 h-4" />
                  Save BKT Report
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
                  BKT Report saved successfully!
                </div>
              )}

            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 shadow-xl text-left">
          {scaleLearningDb['bkt'] ? (
            <TutorialContent text={scaleLearningDb['bkt'].scoringTutorial} />
          ) : (
            <p className="text-slate-400">No clinical notes available for BKT.</p>
          )}
        </div>
      )}
    </div>
  );
};
