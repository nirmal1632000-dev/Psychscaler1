import React, { useState, useEffect } from 'react';
import { usePatient } from '../PatientContext';
import { RotateCcw, Save, Check, Users, ShieldAlert } from 'lucide-react';
import { scaleLearningDb } from '../../modules/learningContent';
import { TutorialContent } from '../TutorialContent';

// WAI Item Definition
interface WaiItem {
  id: number;
  label: string;
  subscale: 'task' | 'bond' | 'goal';
  isReverse: boolean;
}

const clientItems: WaiItem[] = [
  { id: 1, label: 'I felt uncomfortable with my therapist.', subscale: 'bond', isReverse: true },
  { id: 2, label: 'My therapist and I agreed about the things I will need to do in therapy to help improve my situation.', subscale: 'task', isReverse: false },
  { id: 3, label: 'I was worried about the outcome of the sessions.', subscale: 'goal', isReverse: true },
  { id: 4, label: 'What I was doing in therapy gave me new ways of looking at my problem.', subscale: 'task', isReverse: false },
  { id: 5, label: 'My therapist and I understood each other.', subscale: 'bond', isReverse: false },
  { id: 6, label: 'My therapist perceived accurately what my goals were.', subscale: 'goal', isReverse: false },
  { id: 7, label: 'I find what I was doing in therapy confusing.', subscale: 'task', isReverse: true },
  { id: 8, label: 'I believe my therapist liked me.', subscale: 'bond', isReverse: false },
  { id: 9, label: 'I wish my therapist and I could have clarified the purpose of our sessions.', subscale: 'goal', isReverse: true },
  { id: 10, label: 'I disagreed with my therapist about what I ought to get out of therapy.', subscale: 'goal', isReverse: true },
  { id: 11, label: 'I believe the time my therapist and I were spending together was not spent efficiently.', subscale: 'task', isReverse: true },
  { id: 12, label: 'My therapist did not understand what I was trying to accomplish in therapy.', subscale: 'goal', isReverse: true },
  { id: 13, label: 'I was clear on what my responsibilities were in therapy.', subscale: 'task', isReverse: false },
  { id: 14, label: 'The goals of the sessions were important for me.', subscale: 'goal', isReverse: false },
  { id: 15, label: 'I find what my therapist and I were doing in therapy was unrelated to my concerns.', subscale: 'task', isReverse: true },
  { id: 16, label: 'I feel that the things I did in therapy helped me to accomplish the changes that I wanted.', subscale: 'task', isReverse: false },
  { id: 17, label: 'I believe my therapist was genuinely concerned for my welfare.', subscale: 'bond', isReverse: false },
  { id: 18, label: 'I was clear as to what my therapist wanted me to do in those sessions.', subscale: 'task', isReverse: false },
  { id: 19, label: 'My therapist and I respected each other.', subscale: 'bond', isReverse: false },
  { id: 20, label: 'I feel that my therapist was not totally honest about his/her feelings toward me.', subscale: 'bond', isReverse: true },
  { id: 21, label: 'I was confident in my therapist\'s ability to help me.', subscale: 'bond', isReverse: false },
  { id: 22, label: 'My therapist and I were working towards mutually agreed upon goals.', subscale: 'goal', isReverse: false },
  { id: 23, label: 'I feel that my therapist appreciated me.', subscale: 'bond', isReverse: false },
  { id: 24, label: 'We agreed on what was important for me to work on.', subscale: 'task', isReverse: false },
  { id: 25, label: 'As a result of the therapy I became clearer as to how I might be able to change.', subscale: 'goal', isReverse: false },
  { id: 26, label: 'My therapist and I trusted one another.', subscale: 'bond', isReverse: false },
  { id: 27, label: 'My therapist and I had different ideas on what my problems were.', subscale: 'goal', isReverse: true },
  { id: 28, label: 'My relationship with my therapist was very important to me.', subscale: 'bond', isReverse: false },
  { id: 29, label: 'I had the feeling that if I said or did the wrong things, my therapist would stop working with me.', subscale: 'bond', isReverse: true },
  { id: 30, label: 'My therapist and I collaborated on setting goals for my therapy.', subscale: 'goal', isReverse: false },
  { id: 31, label: 'I was frustrated by the things I was doing in therapy.', subscale: 'task', isReverse: true },
  { id: 32, label: 'We had a good understanding of the kind of changes that would be good for me.', subscale: 'goal', isReverse: false },
  { id: 33, label: 'The things that my therapist was asking me to do did not make sense.', subscale: 'task', isReverse: true },
  { id: 34, label: 'I did not know what to expect as the result of my therapy.', subscale: 'goal', isReverse: true },
  { id: 35, label: 'I believe the way we were working with my problem was correct.', subscale: 'task', isReverse: false },
  { id: 36, label: 'I feel my therapist cared about me even when I did things that he/she did not approve of.', subscale: 'bond', isReverse: false }
];

const therapistItems: WaiItem[] = [
  { id: 1, label: 'I feel uncomfortable with my client.', subscale: 'bond', isReverse: true },
  { id: 2, label: 'My client and I agree about the steps to be taken to improve his/her situation.', subscale: 'task', isReverse: false },
  { id: 3, label: 'I have some concerns about the outcome of these sessions.', subscale: 'goal', isReverse: true },
  { id: 4, label: 'My client and I both feel confident about the usefulness of our current activity in therapy.', subscale: 'task', isReverse: false },
  { id: 5, label: 'I feel I really understand my client.', subscale: 'bond', isReverse: false },
  { id: 6, label: 'My client and I have a common perception of her/his goals.', subscale: 'goal', isReverse: false },
  { id: 7, label: 'My client finds what we are doing in therapy confusing.', subscale: 'task', isReverse: true },
  { id: 8, label: 'I believe my client likes me.', subscale: 'bond', isReverse: false },
  { id: 9, label: 'I sense a need to clarify the purpose of our session(s) for my client.', subscale: 'goal', isReverse: true },
  { id: 10, label: 'I disagree with my client about what she/he ought to get out of therapy.', subscale: 'goal', isReverse: true },
  { id: 11, label: 'I believe the time my client and I spend together is not spent efficiently.', subscale: 'task', isReverse: true },
  { id: 12, label: 'I have doubts about what we are trying to accomplish in therapy.', subscale: 'goal', isReverse: true },
  { id: 13, label: 'I am clear and explicit about what my client\'s responsibilities are in therapy.', subscale: 'task', isReverse: false },
  { id: 14, label: 'The current goals of these sessions are important for my client.', subscale: 'goal', isReverse: false },
  { id: 15, label: 'I find what my client and I are doing in therapy is unrelated to her/his current concerns.', subscale: 'task', isReverse: true },
  { id: 16, label: 'I feel confident that the things we do in therapy will help my client to accomplish the changes that he/she desires.', subscale: 'task', isReverse: false },
  { id: 17, label: 'I am genuinely concerned for my client\'s welfare.', subscale: 'bond', isReverse: false },
  { id: 18, label: 'I am clear as to what I expect my client to do in these sessions.', subscale: 'task', isReverse: false },
  { id: 19, label: 'My client and I respect each other.', subscale: 'bond', isReverse: false },
  { id: 20, label: 'I feel that I am not totally honest about my feelings toward my client.', subscale: 'bond', isReverse: true },
  { id: 21, label: 'I am confident in my ability to help my client.', subscale: 'bond', isReverse: false },
  { id: 22, label: 'We are working towards mutually agreed upon goals.', subscale: 'goal', isReverse: false },
  { id: 23, label: 'I appreciate my client as a person.', subscale: 'bond', isReverse: false },
  { id: 24, label: 'We agree on what is important for my client to work on.', subscale: 'task', isReverse: false },
  { id: 25, label: 'As a result of these sessions my client is clearer as to how she/he might be able to change.', subscale: 'goal', isReverse: false },
  { id: 26, label: 'My client and I have built a mutual trust.', subscale: 'bond', isReverse: false },
  { id: 27, label: 'My client and I have different ideas on what his/her real problems are.', subscale: 'goal', isReverse: true },
  { id: 28, label: 'Our relationship is important to my client.', subscale: 'bond', isReverse: false },
  { id: 29, label: 'My client has some fears that if she/he says or does the wrong things, I will stop working with him/her.', subscale: 'bond', isReverse: true },
  { id: 30, label: 'My client and I have collaborated in setting goals for these session(s).', subscale: 'goal', isReverse: false },
  { id: 31, label: 'My client is frustrated by what I am asking her/him to do in therapy.', subscale: 'task', isReverse: true },
  { id: 32, label: 'We have established a good understanding between us of the kind of changes that would be good for my client.', subscale: 'goal', isReverse: false },
  { id: 33, label: 'The things that we are doing in therapy don\'t make much sense to my client.', subscale: 'task', isReverse: true },
  { id: 34, label: 'My client doesn\'t know what to expect as the result of therapy.', subscale: 'goal', isReverse: true },
  { id: 35, label: 'My client believes the way we are working with her/his problem is correct.', subscale: 'task', isReverse: false },
  { id: 36, label: 'I respect my client even when he/she does things that I do not approve of.', subscale: 'bond', isReverse: false }
];

export const WaiView: React.FC = () => {
  const { saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning'>('assessment');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Switch between client and therapist form view
  const [formMode, setFormMode] = useState<'client' | 'therapist' | 'comparison'>('client');

  // Answers collections
  const [clientAnswers, setClientAnswers] = useState<Record<number, number>>({});
  const [therapistAnswers, setTherapistAnswers] = useState<Record<number, number>>({});

  // Load saved state
  useEffect(() => {
    if (reports['wai'] && reports['wai'].answers) {
      const data = reports['wai'].answers;
      if (data.clientAnswers) setClientAnswers(data.clientAnswers);
      if (data.therapistAnswers) setTherapistAnswers(data.therapistAnswers);
    }
  }, [reports]);

  // Scoring function
  const calculateFormScores = (answers: Record<number, number>, items: WaiItem[]) => {
    let task = 0;
    let bond = 0;
    let goal = 0;
    let answeredCount = 0;

    items.forEach((item) => {
      const ans = answers[item.id];
      if (ans !== undefined) {
        answeredCount++;
        // Apply reverse keying if item is reverse
        const score = item.isReverse ? (8 - ans) : ans;
        if (item.subscale === 'task') task += score;
        if (item.subscale === 'bond') bond += score;
        if (item.subscale === 'goal') goal += score;
      }
    });

    const total = task + bond + goal;
    return { task, bond, goal, total, answeredCount };
  };

  const clientScores = calculateFormScores(clientAnswers, clientItems);
  const therapistScores = calculateFormScores(therapistAnswers, therapistItems);

  const handleSelectOption = (form: 'client' | 'therapist', itemId: number, val: number) => {
    if (form === 'client') {
      setClientAnswers({ ...clientAnswers, [itemId]: val });
    } else {
      setTherapistAnswers({ ...therapistAnswers, [itemId]: val });
    }
  };

  const handleReset = () => {
    setClientAnswers({});
    setTherapistAnswers({});
    setSavedSuccess(false);
  };

  const handleSave = () => {
    const reportData = {
      total: clientScores.total || therapistScores.total,
      subscores: {
        'Client Task': clientScores.task,
        'Client Bond': clientScores.bond,
        'Client Goal': clientScores.goal,
        'Client Total': clientScores.total,
        'Therapist Task': therapistScores.task,
        'Therapist Bond': therapistScores.bond,
        'Therapist Goal': therapistScores.goal,
        'Therapist Total': therapistScores.total,
      },
      answers: {
        clientAnswers,
        therapistAnswers
      },
      interpretation: `Working Alliance Inventory (WAI) Dual Assessment:
- Client Perceived Alliance: Total ${clientScores.total}/252 (Goal: ${clientScores.goal}/84, Task: ${clientScores.task}/84, Bond: ${clientScores.bond}/84)
- Therapist Perceived Alliance: Total ${therapistScores.total}/252 (Goal: ${therapistScores.goal}/84, Task: ${therapistScores.task}/84, Bond: ${therapistScores.bond}/84)
- Discrepancy Gaps (Therapist - Client): Goal: ${therapistScores.goal - clientScores.goal}, Task: ${therapistScores.task - clientScores.task}, Bond: ${therapistScores.bond - clientScores.bond}.`
    };

    saveReport('wai', reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Check if forms are completely filled
  const clientPct = Math.round((clientScores.answeredCount / 36) * 100);
  const therapistPct = Math.round((therapistScores.answeredCount / 36) * 100);

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#151b2c] p-6 rounded-2xl border border-slate-800 shadow-xl gap-4">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 flex items-center gap-2">
            <Users className="w-7 h-7 text-cyan-400" />
            Working Alliance Inventory (WAI)
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Measures the quality of the therapeutic alliance across Task, Bond, and Goal alignment.
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
          {/* Main Workspace: Left Column */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* View Mode Switcher */}
            <div className="flex bg-[#0f1322] p-1.5 rounded-xl border border-slate-900 shadow">
              <button
                onClick={() => setFormMode('client')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  formMode === 'client' ? 'bg-[#1e293b] text-cyan-400 border border-slate-800' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Client Form (WAI-C) {clientPct > 0 && `(${clientPct}%)`}
              </button>
              <button
                onClick={() => setFormMode('therapist')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  formMode === 'therapist' ? 'bg-[#1e293b] text-[#818cf8] border border-slate-800' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Therapist Form (WAI-T) {therapistPct > 0 && `(${therapistPct}%)`}
              </button>
              <button
                onClick={() => setFormMode('comparison')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  formMode === 'comparison' ? 'bg-[#1e293b] text-green-400 border border-slate-800' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Alliance Comparison
              </button>
            </div>

            {/* Assessment Question list */}
            {formMode !== 'comparison' ? (
              <div className="space-y-4">
                <div className="bg-[#0f1322] p-4 rounded-xl border border-slate-900/60 text-slate-400 text-xs italic flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>
                    Instruct the {formMode === 'client' ? 'client' : 'therapist'} to rate each statement according to their experience of the therapeutic relationship.
                  </span>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {(formMode === 'client' ? clientItems : therapistItems).map((item) => (
                    <div key={item.id} className="bg-[#0f1322] border border-slate-900 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-slate-800 transition-all">
                      <div className="space-y-1 md:max-w-[55%]">
                        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Item {item.id}</span>
                        <p className="text-slate-200 text-sm font-medium leading-relaxed">{item.label}</p>
                      </div>
                      
                      {/* 1 to 7 Likert selectors */}
                      <div className="flex items-center gap-1.5 w-full md:w-auto">
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                          const active = (formMode === 'client' ? clientAnswers : therapistAnswers)[item.id] === num;
                          return (
                            <button
                              key={num}
                              onClick={() => handleSelectOption(formMode as 'client' | 'therapist', item.id, num)}
                              className={`flex-1 md:flex-initial w-8 h-8 rounded-lg text-xs font-bold transition-all border ${
                                active
                                  ? formMode === 'client'
                                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/10'
                                    : 'bg-indigo-500 text-white border-indigo-400 shadow-md shadow-indigo-500/10'
                                  : 'bg-[#161d30]/40 text-slate-400 border-slate-800/80 hover:bg-[#161d30]/80'
                              }`}
                              title={`${num} - ${['Never', 'Rarely', 'Occasionally', 'Sometimes', 'Often', 'Very Often', 'Always'][num - 1]}`}
                            >
                              {num}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Comparison view with dynamic SVG charts */
              <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="text-md font-bold text-slate-300">Alliance Subscale Profile</h3>
                  <p className="text-slate-500 text-xs mt-0.5">Comparing Client vs. Therapist perceptions side-by-side</p>
                </div>

                <div className="space-y-6">
                  {/* Goal Subscale */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-300">Goal Alignment (Agreement on goals)</span>
                      <span className="text-slate-400">
                        Client: <strong className="text-cyan-400 font-mono">{clientScores.goal}</strong> | Therapist: <strong className="text-indigo-400 font-mono">{therapistScores.goal}</strong>
                      </span>
                    </div>
                    {/* SVG Progress Bars */}
                    <div className="h-6 bg-[#161d30]/60 rounded-lg overflow-hidden flex flex-col justify-center px-1 border border-slate-850">
                      <div className="h-2 flex gap-1 items-center">
                        <div className="h-full bg-cyan-500 rounded-full transition-all duration-500" style={{ width: `${(clientScores.goal / 84) * 100}%` }}></div>
                      </div>
                      <div className="h-2 flex gap-1 items-center mt-1">
                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${(therapistScores.goal / 84) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Task Subscale */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-300">Task Agreement (Agreement on therapeutic tasks)</span>
                      <span className="text-slate-400">
                        Client: <strong className="text-cyan-400 font-mono">{clientScores.task}</strong> | Therapist: <strong className="text-indigo-400 font-mono">{therapistScores.task}</strong>
                      </span>
                    </div>
                    <div className="h-6 bg-[#161d30]/60 rounded-lg overflow-hidden flex flex-col justify-center px-1 border border-slate-850">
                      <div className="h-2 flex gap-1 items-center">
                        <div className="h-full bg-cyan-500 rounded-full transition-all duration-500" style={{ width: `${(clientScores.task / 84) * 100}%` }}></div>
                      </div>
                      <div className="h-2 flex gap-1 items-center mt-1">
                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${(therapistScores.task / 84) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Bond Subscale */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-300">Bond Strength (Affective relationship quality)</span>
                      <span className="text-slate-400">
                        Client: <strong className="text-cyan-400 font-mono">{clientScores.bond}</strong> | Therapist: <strong className="text-indigo-400 font-mono">{therapistScores.bond}</strong>
                      </span>
                    </div>
                    <div className="h-6 bg-[#161d30]/60 rounded-lg overflow-hidden flex flex-col justify-center px-1 border border-slate-850">
                      <div className="h-2 flex gap-1 items-center">
                        <div className="h-full bg-cyan-500 rounded-full transition-all duration-500" style={{ width: `${(clientScores.bond / 84) * 100}%` }}></div>
                      </div>
                      <div className="h-2 flex gap-1 items-center mt-1">
                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${(therapistScores.bond / 84) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Discrepancy Diagnostics */}
                  <div className="bg-[#161d30]/30 rounded-xl p-4 border border-slate-800/40 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Alliance Discrepancy Check</span>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-2.5 bg-[#090d16] rounded-xl">
                        <span className="text-[10px] text-slate-500 block uppercase">Goal Gap</span>
                        <span className={`text-sm font-extrabold ${Math.abs(therapistScores.goal - clientScores.goal) > 10 ? 'text-red-400' : 'text-slate-300'}`}>
                          {therapistScores.goal - clientScores.goal > 0 ? '+' : ''}{therapistScores.goal - clientScores.goal}
                        </span>
                      </div>
                      <div className="p-2.5 bg-[#090d16] rounded-xl">
                        <span className="text-[10px] text-slate-500 block uppercase">Task Gap</span>
                        <span className={`text-sm font-extrabold ${Math.abs(therapistScores.task - clientScores.task) > 10 ? 'text-red-400' : 'text-slate-300'}`}>
                          {therapistScores.task - clientScores.task > 0 ? '+' : ''}{therapistScores.task - clientScores.task}
                        </span>
                      </div>
                      <div className="p-2.5 bg-[#090d16] rounded-xl">
                        <span className="text-[10px] text-slate-500 block uppercase">Bond Gap</span>
                        <span className={`text-sm font-extrabold ${Math.abs(therapistScores.bond - clientScores.bond) > 10 ? 'text-red-400' : 'text-slate-300'}`}>
                          {therapistScores.bond - clientScores.bond > 0 ? '+' : ''}{therapistScores.bond - clientScores.bond}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 italic mt-2">
                      Note: Gaps larger than ±10 indicates significant mismatch between clinician and patient perceptions, which should be directly discussed in supervision/therapy.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Scoring Summary */}
          <div className="space-y-6">
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 sticky top-6 space-y-5">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Alliance Summary</h3>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">36 items (Likert 1–7)</p>
              </div>

              {/* Client metrics */}
              <div className="p-4 bg-[#161d30]/30 rounded-xl border border-slate-800/60 space-y-2">
                <span className="text-xs font-semibold text-cyan-400 block">Client (WAI-C) Score</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-extrabold text-white">{clientScores.total}</span>
                  <span className="text-xs text-slate-500">/ 252 points</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${(clientScores.total / 252) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                  <span>Goal: {clientScores.goal}</span>
                  <span>Task: {clientScores.task}</span>
                  <span>Bond: {clientScores.bond}</span>
                </div>
              </div>

              {/* Therapist metrics */}
              <div className="p-4 bg-[#161d30]/30 rounded-xl border border-slate-800/60 space-y-2">
                <span className="text-xs font-semibold text-indigo-400 block">Therapist (WAI-T) Score</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-extrabold text-white">{therapistScores.total}</span>
                  <span className="text-xs text-slate-500">/ 252 points</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${(therapistScores.total / 252) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                  <span>Goal: {therapistScores.goal}</span>
                  <span>Task: {therapistScores.task}</span>
                  <span>Bond: {therapistScores.bond}</span>
                </div>
              </div>

              {/* Save & Reset controls */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black font-semibold rounded-xl py-3 shadow-lg active:scale-95 transition-all text-sm"
                >
                  <Save className="w-4 h-4" />
                  Save Alliance Report
                </button>
                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 border border-slate-800 hover:bg-[#161d30]/40 text-slate-400 hover:text-slate-200 rounded-xl py-2 transition-all text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear Both Forms
                </button>
              </div>

              {savedSuccess && (
                <div className="flex items-center gap-2 justify-center text-xs text-green-400 bg-green-950/30 border border-green-500/20 p-2.5 rounded-xl">
                  <Check className="w-4 h-4" />
                  Alliance report saved successfully!
                </div>
              )}

            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 shadow-xl text-left">
          {scaleLearningDb['wai'] ? (
            <TutorialContent text={scaleLearningDb['wai'].scoringTutorial} />
          ) : (
            <p className="text-slate-400">No clinical notes available for WAI.</p>
          )}
        </div>
      )}
    </div>
  );
};
