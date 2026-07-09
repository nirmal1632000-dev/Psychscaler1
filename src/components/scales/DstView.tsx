import React, { useState, useEffect } from 'react';
import { usePatient } from '../PatientContext';
import { RotateCcw, Save, Check, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { scaleLearningDb } from '../../modules/learningContent';
import { TutorialContent } from '../TutorialContent';

interface DstItem {
  id: number;
  text: string;
  domain: 'Motor' | 'Language' | 'Social' | 'Adaptive' | 'Visual-Motor' | 'Conceptual';
  creditMonths: number;
}

interface DstAgeGroup {
  label: string;
  rangeMonths: string;
  items: DstItem[];
}

const dstAgeGroups: DstAgeGroup[] = [
  {
    label: '0 to 1 Month',
    rangeMonths: '0 - 1m',
    items: [
      { id: 1, text: 'Responds to sudden sounds (startles, blinks)', domain: 'Adaptive', creditMonths: 0.33 },
      { id: 2, text: 'Lifts head slightly when lying on stomach', domain: 'Motor', creditMonths: 0.33 },
      { id: 3, text: 'Sucking reflex is strong and coordinates feeding', domain: 'Adaptive', creditMonths: 0.33 }
    ]
  },
  {
    label: '1 to 3 Months',
    rangeMonths: '1 - 3m',
    items: [
      { id: 4, text: 'Social smile: Smiles back when smiled at', domain: 'Social', creditMonths: 0.4 },
      { id: 5, text: 'Follows moving objects with eyes', domain: 'Adaptive', creditMonths: 0.4 },
      { id: 6, text: 'Cooing: Makes soft gurgling vowel sounds', domain: 'Language', creditMonths: 0.4 },
      { id: 7, text: 'Holds head steadily when held upright', domain: 'Motor', creditMonths: 0.4 },
      { id: 8, text: 'Brings hands to mouth', domain: 'Motor', creditMonths: 0.4 }
    ]
  },
  {
    label: '3 to 6 Months',
    rangeMonths: '3 - 6m',
    items: [
      { id: 9, text: 'Reaches out and grasps toys/objects', domain: 'Motor', creditMonths: 0.5 },
      { id: 10, text: 'Rolls over (tummy to back or back to tummy)', domain: 'Motor', creditMonths: 0.5 },
      { id: 11, text: 'Laughs aloud and squeals with joy', domain: 'Social', creditMonths: 0.5 },
      { id: 12, text: 'Vocalizes back when someone talks to them', domain: 'Language', creditMonths: 0.5 },
      { id: 13, text: 'Supports own weight on legs when held standing', domain: 'Motor', creditMonths: 0.5 },
      { id: 14, text: 'Babbling begins (repeating single consonant sounds)', domain: 'Language', creditMonths: 0.5 }
    ]
  },
  {
    label: '6 to 9 Months',
    rangeMonths: '6 - 9m',
    items: [
      { id: 15, text: 'Sits stably without back support', domain: 'Motor', creditMonths: 0.5 },
      { id: 16, text: 'Transfers objects from one hand to another', domain: 'Motor', creditMonths: 0.5 },
      { id: 17, text: 'Responds to hearing own name (turns head)', domain: 'Social', creditMonths: 0.5 },
      { id: 18, text: 'Mimics simple gestures like waving or clapping', domain: 'Social', creditMonths: 0.5 },
      { id: 19, text: 'Babbles double syllables (e.g. ma-ma, da-da)', domain: 'Language', creditMonths: 0.5 },
      { id: 20, text: 'Feeds self simple finger foods (biscuits)', domain: 'Adaptive', creditMonths: 0.5 }
    ]
  },
  {
    label: '9 to 12 Months',
    rangeMonths: '9 - 12m',
    items: [
      { id: 21, text: 'Stands with support or crawls actively', domain: 'Motor', creditMonths: 0.5 },
      { id: 22, text: 'Waves goodbye or plays peek-a-boo', domain: 'Social', creditMonths: 0.5 },
      { id: 23, text: 'Understands simple commands (e.g. "give it to me")', domain: 'Language', creditMonths: 0.5 },
      { id: 24, text: 'Pincer grasp: Picks up tiny objects with thumb and finger', domain: 'Motor', creditMonths: 0.5 },
      { id: 25, text: 'Speaks one word with meaning (e.g. mama, papa)', domain: 'Language', creditMonths: 0.5 },
      { id: 26, text: 'Cooperates during dressing (extends arms/legs)', domain: 'Social', creditMonths: 0.5 }
    ]
  },
  {
    label: '12 to 15 Months',
    rangeMonths: '12 - 15m',
    items: [
      { id: 27, text: 'Walks alone steadily (may stumble occasionally)', domain: 'Motor', creditMonths: 0.5 },
      { id: 28, text: 'Speaks 2 to 3 single words clearly', domain: 'Language', creditMonths: 0.5 },
      { id: 29, text: 'Indicates wants by pointing or vocalizing', domain: 'Social', creditMonths: 0.5 },
      { id: 30, text: 'Builds a tower of two wooden blocks', domain: 'Adaptive', creditMonths: 0.5 },
      { id: 31, text: 'Uses spoon with some spilling', domain: 'Adaptive', creditMonths: 0.5 },
      { id: 32, text: 'Shows affection (hugs parents, kisses)', domain: 'Social', creditMonths: 0.5 }
    ]
  },
  {
    label: '15 to 18 Months',
    rangeMonths: '15 - 18m',
    items: [
      { id: 33, text: 'Runs without falling frequently', domain: 'Motor', creditMonths: 0.5 },
      { id: 34, text: 'Speaks 4 to 6 words with meaning', domain: 'Language', creditMonths: 0.5 },
      { id: 35, text: 'Points to at least two body parts when named', domain: 'Language', creditMonths: 0.5 },
      { id: 36, text: 'Scribbles spontaneously on paper', domain: 'Visual-Motor', creditMonths: 0.5 },
      { id: 37, text: 'Climbs onto chairs or low tables', domain: 'Motor', creditMonths: 0.5 },
      { id: 38, text: 'Drinks from a cup without much spilling', domain: 'Adaptive', creditMonths: 0.5 }
    ]
  },
  {
    label: '18 to 24 Months',
    rangeMonths: '18 - 24m',
    items: [
      { id: 39, text: 'Walks up stairs with hand held', domain: 'Motor', creditMonths: 1.0 },
      { id: 40, text: 'Speaks simple 2-word phrases (e.g. "want milk")', domain: 'Language', creditMonths: 1.0 },
      { id: 41, text: 'Mimics simple household chores (sweeping, wiping)', domain: 'Social', creditMonths: 1.0 },
      { id: 42, text: 'Builds tower of 4 to 6 blocks', domain: 'Adaptive', creditMonths: 1.0 },
      { id: 43, text: 'Asks for food or toilet by words/gestures', domain: 'Social', creditMonths: 1.0 },
      { id: 44, text: 'Follows a 2-step instruction (e.g. "pick up toy and put on table")', domain: 'Language', creditMonths: 1.0 }
    ]
  },
  {
    label: '2 to 3 Years',
    rangeMonths: '2 - 3y',
    items: [
      { id: 45, text: 'Jumps off a low step with both feet together', domain: 'Motor', creditMonths: 1.2 },
      { id: 46, text: 'Identifies objects in pictures by name', domain: 'Language', creditMonths: 1.2 },
      { id: 47, text: 'Knows own gender and full name', domain: 'Social', creditMonths: 1.2 },
      { id: 48, text: 'Speaks in sentences of 3 to 4 words', domain: 'Language', creditMonths: 1.2 },
      { id: 49, text: 'Is fully daytime toilet trained (bowel & bladder)', domain: 'Adaptive', creditMonths: 1.2 },
      { id: 50, text: 'Unbuttons large buttons or unzips coat', domain: 'Adaptive', creditMonths: 1.2 },
      { id: 51, text: 'Plays alongside other children (parallel play)', domain: 'Social', creditMonths: 1.2 },
      { id: 52, text: 'Draws a vertical or horizontal line in imitation', domain: 'Motor', creditMonths: 1.2 },
      { id: 53, text: 'Walks backwards a few steps', domain: 'Motor', creditMonths: 1.2 },
      { id: 54, text: 'Counts two objects in imitation', domain: 'Adaptive', creditMonths: 1.2 }
    ]
  },
  {
    label: '3 to 4 Years',
    rangeMonths: '3 - 4y',
    items: [
      { id: 55, text: 'Stands on one foot for 2 to 5 seconds', domain: 'Motor', creditMonths: 2.0 },
      { id: 56, text: 'Counts 3 objects with pointing', domain: 'Adaptive', creditMonths: 2.0 },
      { id: 57, text: 'Names at least three colors', domain: 'Conceptual', creditMonths: 2.0 },
      { id: 58, text: 'Copies a circle with pencil', domain: 'Visual-Motor', creditMonths: 2.0 },
      { id: 59, text: 'Dresses self with minimal assistance (except laces)', domain: 'Adaptive', creditMonths: 2.0 },
      { id: 60, text: 'Speaks clearly; strangers understand most words', domain: 'Language', creditMonths: 2.0 }
    ]
  },
  {
    label: '4 to 5 Years',
    rangeMonths: '4 - 5y',
    items: [
      { id: 61, text: 'Hops on one foot 4 to 6 times', domain: 'Motor', creditMonths: 2.0 },
      { id: 62, text: 'Defines simple words (e.g. what is a ball/chair?)', domain: 'Language', creditMonths: 2.0 },
      { id: 63, text: 'Copies a cross (+)', domain: 'Visual-Motor', creditMonths: 2.0 },
      { id: 64, text: 'Goes to toilet independently without help', domain: 'Adaptive', creditMonths: 2.0 },
      { id: 65, text: 'Knows differences (e.g. fly is small, elephant is big)', domain: 'Conceptual', creditMonths: 2.0 },
      { id: 66, text: 'Participates in group cooperative games', domain: 'Social', creditMonths: 2.0 }
    ]
  },
  {
    label: '5 to 6 Years',
    rangeMonths: '5 - 6y',
    items: [
      { id: 67, text: 'Skips or marches in rhythm', domain: 'Motor', creditMonths: 2.0 },
      { id: 68, text: 'Counts 10 objects correctly', domain: 'Adaptive', creditMonths: 2.0 },
      { id: 69, text: 'Copies a triangle', domain: 'Visual-Motor', creditMonths: 2.0 },
      { id: 70, text: 'Knows age and birthdate', domain: 'Conceptual', creditMonths: 2.0 },
      { id: 71, text: 'Ties shoe laces or knots', domain: 'Adaptive', creditMonths: 2.0 },
      { id: 72, text: 'Tells simple stories or describes events in sequence', domain: 'Language', creditMonths: 2.0 }
    ]
  },
  {
    label: '6 to 7 Years',
    rangeMonths: '6 - 7y',
    items: [
      { id: 73, text: 'Prints first name clearly on paper', domain: 'Visual-Motor', creditMonths: 3.0 },
      { id: 74, text: 'Counts up to 20 objects', domain: 'Adaptive', creditMonths: 3.0 },
      { id: 75, text: 'Knows days of the week in order', domain: 'Conceptual', creditMonths: 3.0 },
      { id: 76, text: 'Can copy a diamond shape', domain: 'Visual-Motor', creditMonths: 3.0 }
    ]
  },
  {
    label: '7 to 8 Years',
    rangeMonths: '7 - 8y',
    items: [
      { id: 77, text: 'Reads simple 3-4 letter words', domain: 'Language', creditMonths: 3.0 },
      { id: 78, text: 'Makes simple monetary calculations (change)', domain: 'Adaptive', creditMonths: 3.0 },
      { id: 79, text: 'Knows left and right on another person', domain: 'Conceptual', creditMonths: 3.0 },
      { id: 80, text: 'Rides a bicycle or performs complex motor tasks', domain: 'Motor', creditMonths: 3.0 }
    ]
  },
  {
    label: '8 to 10 Years',
    rangeMonths: '8 - 10y',
    items: [
      { id: 81, text: 'Writes simple sentences on paper', domain: 'Language', creditMonths: 6.0 },
      { id: 82, text: 'Tells time to the minute on a clock dial', domain: 'Conceptual', creditMonths: 6.0 },
      { id: 83, text: 'Knows similarities and differences of objects', domain: 'Conceptual', creditMonths: 6.0 },
      { id: 84, text: 'Runs errands independently in neighborhood', domain: 'Social', creditMonths: 6.0 }
    ]
  },
  {
    label: '10 to 12 Years',
    rangeMonths: '10 - 12y',
    items: [
      { id: 85, text: 'Performs division and multiplication problems', domain: 'Adaptive', creditMonths: 6.0 },
      { id: 86, text: 'Defines abstract nouns (e.g. justice, revenge)', domain: 'Language', creditMonths: 6.0 },
      { id: 87, text: 'Writes letters or emails to friends', domain: 'Social', creditMonths: 6.0 },
      { id: 88, text: 'Coordinates plans with friends independently', domain: 'Social', creditMonths: 6.0 }
    ]
  }
];

export const DstView: React.FC = () => {
  const { saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning'>('assessment');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Chronological Age (CA)
  const [caYears, setCaYears] = useState(4);
  const [caMonths, setCaMonths] = useState(0);

  // Checked Milestones
  const [passedItems, setPassedItems] = useState<Record<number, boolean>>({});
  const [activeGroupIdx, setActiveGroupIdx] = useState(9); // Start at 3-4y

  // Load saved state
  useEffect(() => {
    if (reports['dst'] && reports['dst'].answers) {
      const data = reports['dst'].answers;
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
    if (window.confirm('Reset all DST milestones checklist data?')) {
      setPassedItems({});
      setCaYears(4);
      setCaMonths(0);
      setSavedSuccess(false);
    }
  };

  // Calculations
  const caTotalMonths = caYears * 12 + caMonths;

  // Calculate Developmental Age (DA)
  // We sum up the credit value of each passed milestone to calculate DA.
  let developmentalAgeMonths = 0;
  dstAgeGroups.forEach(grp => {
    grp.items.forEach(item => {
      if (passedItems[item.id]) {
        developmentalAgeMonths += item.creditMonths;
      }
    });
  });

  const daYears = Math.floor(developmentalAgeMonths / 12);
  const daRemainingMonths = Math.round((developmentalAgeMonths % 12) * 10) / 10;

  // Developmental Quotient (DQ)
  const dq = caTotalMonths > 0 ? (developmentalAgeMonths / caTotalMonths) * 100 : 0;
  const roundedDq = Math.round(dq);

  // Classifications
  let dqClassification = 'Normal Development';
  let dqClassColor = 'text-green-400 bg-green-950/40 border-green-500/30';

  if (roundedDq >= 85) {
    dqClassification = 'Normal Development';
    dqClassColor = 'text-green-400 bg-green-950/40 border-green-500/30';
  } else if (roundedDq >= 70) {
    dqClassification = 'Borderline / Mild Delay';
    dqClassColor = 'text-yellow-400 bg-yellow-950/40 border-yellow-500/30';
  } else if (roundedDq >= 50) {
    dqClassification = 'Moderate Developmental Delay';
    dqClassColor = 'text-orange-400 bg-orange-950/40 border-orange-500/30';
  } else if (roundedDq >= 35) {
    dqClassification = 'Severe Developmental Delay';
    dqClassColor = 'text-red-400 bg-red-950/40 border-red-500/30';
  } else if (roundedDq > 0) {
    dqClassification = 'Profound Developmental Delay';
    dqClassColor = 'text-red-400 bg-red-950/40 border-red-500/30';
  }

  const handleSave = () => {
    const reportData = {
      total: roundedDq,
      caYears,
      caMonths,
      developmentalAgeMonths,
      dq: roundedDq,
      passedItems,
      classification: dqClassification,
      interpretation: `Developmental Screening Test (DST) Profile:
- Chronological Age: ${caYears} yrs ${caMonths} mos (${caTotalMonths} months)
- Developmental Age (DA): ${daYears} yrs ${daRemainingMonths} mos (${developmentalAgeMonths.toFixed(2)} months)
- Developmental Quotient (DQ): ${roundedDq} (${dqClassification})`
    };

    saveReport('dst', reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const activeGroup = dstAgeGroups[activeGroupIdx];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#151b2c] p-6 rounded-2xl border border-slate-800 shadow-xl gap-4">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 flex items-center gap-2">
            <Award className="w-7 h-7 text-cyan-400" />
            Developmental Screening Test (DST)
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Dr. J. Bharat Raj\'s Developmental Screening Test (0-15 Years). Screens mental development and computes Developmental Quotient (DQ).
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
          {/* Main Checklist Workspace */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Age Config Panel */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 text-left space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">1. Child Chronological Age (CA)</h3>
              <div className="flex gap-4">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] text-slate-500 uppercase font-semibold">CA Years</label>
                  <input
                    type="number"
                    value={caYears}
                    onChange={(e) => setCaYears(Math.max(0, parseInt(e.target.value, 10) || 0))}
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

            {/* Age Groups Scroller */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-xl p-3 flex justify-between items-center overflow-x-auto gap-2">
              {dstAgeGroups.map((grp, idx) => {
                const active = activeGroupIdx === idx;
                const passedCount = grp.items.filter(item => passedItems[item.id]).length;
                let badgeClass = 'text-slate-500 border-transparent bg-[#161d30]/20';
                if (passedCount === grp.items.length) badgeClass = 'text-green-400 border-green-500/20 bg-green-950/20';
                else if (passedCount > 0) badgeClass = 'text-yellow-400 border-yellow-500/20 bg-yellow-950/20';
                
                return (
                  <button
                    key={grp.label}
                    onClick={() => setActiveGroupIdx(idx)}
                    className={`flex-1 min-w-[90px] py-2 rounded-lg text-xs font-bold transition-all border ${
                      active
                        ? 'bg-cyan-500 text-black border-cyan-400'
                        : `border ${badgeClass} hover:text-slate-300`
                    }`}
                  >
                    {grp.rangeMonths} ({passedCount}/{grp.items.length})
                  </button>
                );
              })}
            </div>

            {/* Active Group Items */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 text-left space-y-4">
              <div className="flex justify-between items-center border-b border-slate-850 pb-2.5">
                <div>
                  <h3 className="text-md font-bold text-slate-200">{activeGroup.label} Milestones</h3>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">
                    Mark developmental milestones achieved by the child.
                  </span>
                </div>
                <button
                  onClick={() => {
                    const allPassed = activeGroup.items.every(i => passedItems[i.id]);
                    const update: Record<number, boolean> = { ...passedItems };
                    activeGroup.items.forEach(i => {
                      update[i.id] = !allPassed;
                    });
                    setPassedItems(update);
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Toggle All
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 pt-2">
                {activeGroup.items.map((item) => (
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
                  disabled={activeGroupIdx === 0}
                  onClick={() => setActiveGroupIdx((p) => p - 1)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 disabled:opacity-30 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Previous Range
                </button>
                <button
                  disabled={activeGroupIdx === dstAgeGroups.length - 1}
                  onClick={() => setActiveGroupIdx((p) => p + 1)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 disabled:opacity-30 transition-all"
                >
                  Next Range
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* Right Summary Column */}
          <div className="space-y-6">
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 sticky top-6 space-y-5 text-left">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">DST DQ Result</h3>
                <p className="text-xs text-slate-500 mt-0.5">Developmental age & quotient</p>
              </div>

              {/* DQ score circle */}
              <div className="flex flex-col items-center p-3.5 bg-[#161d30]/30 rounded-2xl border border-slate-850">
                <span className="text-4xl font-extrabold text-cyan-400">{roundedDq || 0}</span>
                <span className="text-[10px] text-slate-500 block uppercase font-bold mt-1">Developmental Quotient (DQ)</span>
                <div className={`mt-3 px-3 py-1.5 rounded-xl border text-xs font-bold text-center ${dqClassColor} w-full`}>
                  {dqClassification}
                </div>
              </div>

              {/* Age metrics */}
              <div className="space-y-3.5 border-t border-slate-800/60 pt-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Chronological Age (CA):</span>
                  <span className="font-semibold text-slate-200">{caYears}y {caMonths}m ({caTotalMonths}m)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Developmental Age (DA):</span>
                  <span className="font-semibold text-cyan-400">{daYears}y {daRemainingMonths}m ({developmentalAgeMonths.toFixed(1)}m)</span>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-2 pt-2 border-t border-slate-800/60">
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black font-semibold rounded-xl py-3 shadow-lg active:scale-95 transition-all text-sm animate-pulse-subtle"
                >
                  <Save className="w-4 h-4" />
                  Save DST Report
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
                  DST Report saved successfully!
                </div>
              )}

            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 shadow-xl text-left">
          {scaleLearningDb['dst'] ? (
            <TutorialContent text={scaleLearningDb['dst'].scoringTutorial} />
          ) : (
            <p className="text-slate-400">No clinical notes available for DST.</p>
          )}
        </div>
      )}
    </div>
  );
};
