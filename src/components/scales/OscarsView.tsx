import React, { useState, useEffect } from 'react';
import { usePatient } from '../PatientContext';
import { RotateCcw, Save, Check, UserCheck, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { scaleLearningDb } from '../../modules/learningContent';
import { TutorialContent } from '../TutorialContent';

interface OscarsItem {
  id: number;
  title: string;
  question: string;
  example: string;
  anchors: {
    1: string;
    3: string;
    5: string;
    7: string;
  };
}

const oscarsItems: OscarsItem[] = [
  {
    id: 1,
    title: 'Emotion Recognition',
    question: 'Recognising other people’s emotions, particularly negative emotions (sadness, fear and anger) based on facial expression, body language and/or vocal tone and rate?',
    example: 'When talking to someone, the individual cannot tell that the other person is upset or angry. They seem "clueless" about how other people are feeling.',
    anchors: {
      1: 'Can recognise strong, moderate and subtle expressions of emotions. She/he can be thought of as "socially perceptive".',
      3: 'Easily recognises strong and explicit expressions of emotion, such as crying, angry shouting or elated laughing. May not recognise moderately expressed emotions. However, she/he does not recognise subtle expressions, such as disappointment expressed only with a sigh or slight mouth movement.',
      5: 'Recognises most strong and explicit expressions. Does not recognise moderate or subtle emotional expressions.',
      7: 'Never or does not recognise strong, moderate and subtle emotional expressions. The person must be told what emotion is being expressed ("I am very angry.")'
    }
  },
  {
    id: 2,
    title: 'Hostility / Malevolent Attribution Bias',
    question: 'Interpreting social interactions in a malevolent, hostile manner?',
    example: 'The individual sees others as intending them harm, especially in ambiguous (unclear) situations. For example, she/he walks past a few people who are laughing and thinks that they are laughing at her/him. Or, the individual can\'t find a personal item and thinks that someone else took it.',
    anchors: {
      1: 'Individual does not immediately blame others or think that they have ill intentions towards them. She/he will consider the possibility that other factors, such as situational factors, may have caused the outcome (e.g., that others are laughing at a joke, not them).',
      3: 'Sometimes feels that others intend them harm that may be transient or short-lived.',
      5: 'Frequently interprets others behaviour as ill intentioned. May sometimes accuse close acquaintances of ill will.',
      7: 'Widespread beliefs of ill will, which includes both close acquaintances and strangers. These beliefs are generally unfounded.'
    }
  },
  {
    id: 3,
    title: 'Jumping to Conclusions (JTC)',
    question: 'Making decisions quickly (i.e., jumps to conclusions) without examining other evidence?',
    example: 'The individual attempts to call you and you do not answer. They immediately believe that you did not pick up because you are mad at them.',
    anchors: {
      1: 'Does not rush to decisions; is thoughtful and deliberate. The person seeks out other information and takes time to carefully weigh the pros and cons before making a decision.',
      3: 'Sometimes uses only immediate information to make decisions. The person makes decisions using additional information some of the time and can weigh the pros and cons if motivated.',
      5: 'Often uses only immediate information to make decisions. The person must be prompted or told to examine other sources of evidence and take their time in making decisions.',
      7: 'Frequently uses only the most immediate information to make decisions. The person does not seek out additional information and seems to rush to judgement almost without thinking. Seems irrational.'
    }
  },
  {
    id: 4,
    title: 'Social / Cognitive Flexibility',
    question: 'Being flexible in interpreting social situations?',
    example: 'The individual is waiting for someone at a restaurant and they are 20 minutes late. They conclude that the person does not want meet them when in reality they may be stuck in traffic or have had a flat tire. They do not consider other alternatives for why the person is late and stick to one opinion.',
    anchors: {
      1: 'When considering someone else’s behaviour, she/he is able to come up with multiple reasons for why she/he acted the way they did.',
      3: 'Has some trouble coming up with guesses, but can do so if motivated.',
      5: 'Has difficulty even thinking up multiple possible explanations for others’ social behaviour; Has to be prompted or asked to come up with different guesses about another person’s behaviour.',
      7: 'Does not understand that more than one interpretation of an event is possible and is unable to generate any alternative guesses.'
    }
  },
  {
    id: 5,
    title: 'Belief Correction / Flexibility',
    question: 'Can change or correct their interpretation of social interactions when wrong?',
    example: 'The individual sees two people whispering and they believe they are talking about them. This belief is maintained even when told that one of the people was sharing something personal about themselves.',
    anchors: {
      1: 'Is able to seek out, and weigh, evidence for and against a given belief about someone else.',
      3: 'The individual will consider evidence that contradicts misinterpretations she or he has made, although they might maintain the false belief anyway.',
      5: 'The individual often avoids listening to facts that contradicts his/her views, or may argue strongly against them, and usually maintains the false belief.',
      7: 'The individual refuses to consider contradictory evidence. It feels impossible to talk the individual out of a belief even when the belief is clearly wrong.'
    }
  },
  {
    id: 6,
    title: 'Understanding Sarcasm, Jokes & Insults',
    question: 'Understanding subtle jokes, sarcasm and insults in conversation?',
    example: 'Someone states during a meal that "this is best food I have ever had" in a sarcastic tone and the individual does not realise that this is an insult and/or sarcasm.',
    anchors: {
      1: 'The individual understands subtle jokes, insults or sarcasm.',
      3: 'The individual sometimes doesn’t get subtle jokes or insults made by others (e.g., "Oh yes, I love working 15 hours a day!"). Seems to take longer to get the meaning of jokes and sarcasm.',
      5: 'The individual often does not understand subtle jokes, sarcasm, or insults and must be told what they mean.',
      7: 'The individual does not understand subtleties at all. Statements must be concrete and direct in order to be understood (e.g., slapstick humour).'
    }
  },
  {
    id: 7,
    title: 'Theory of Mind / Perspective Taking',
    question: 'Seeing things from the perspective of others (i.e., putting themselves in other people’s shoes)?',
    example: 'The individual cannot understand why someone feels upset or angry in a particular situation. Or, when watching a sad film, does not feel moved by it.',
    anchors: {
      1: 'Individual can be described as empathic. When watching a sad or happy film (or reading a sad or happy book), can be moved by it.',
      3: 'Seldom inquires or makes guesses about others mental states or feelings (e.g., "Do you like that?" or "Are you confused?"), but understands when people make these statements.',
      5: 'Only reacts empathically when others express strong emotion. Does not ask about or respond to others\' opinions or experiences. When asked, may have difficulty imagining what others might be thinking.',
      7: 'Unable to accurately judge what others might be thinking or feeling, except in the most extreme circumstances (such as feeling sadness after the death of a loved one.)'
    }
  },
  {
    id: 8,
    title: 'Social Cues & Indirect Pragmatics',
    question: 'Understanding subtle social cues, hints and indirect requests?',
    example: 'You are trying to read a book or watch TV and the individual keeps talking to you, even though you are giving off subtle hints/signals that you are not interested in talking to them at that moment (e.g., keeping your answers short; not making eye contact).',
    anchors: {
      1: 'The individual readily picks up social cues and/or indirect requests. For example, if you are busy and they start talking to you, they readily perceive that you can\'t speak with them at that moment.',
      3: 'The individual does not pick up on subtle social cues at first, but does so after a minute or two. Takes longer to process subtle cues and hints.',
      5: 'The individual does not pick up on social cues and it takes a number of overt cues (turning away when talking to him/her) for them to get the message.',
      7: 'The individual does not pick up on social cues and must be told directly. Or, the individual does not get subtle hints or indirect requests.'
    }
  }
];

export const OscarsView: React.FC = () => {
  const { saveReport, reports } = usePatient();
  const [activeTab, setActiveTab] = useState<'assessment' | 'learning'>('assessment');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // States
  const [activeItemIdx, setActiveItemIdx] = useState(0);
  const [ratings, setRatings] = useState<Record<number, number>>({});

  // Load saved answers
  useEffect(() => {
    if (reports['oscars'] && reports['oscars'].answers) {
      setRatings(reports['oscars'].answers);
    }
  }, [reports]);

  const activeItem = oscarsItems[activeItemIdx];

  const handleSelectRating = (itemId: number, val: number) => {
    setRatings({ ...ratings, [itemId]: val });
    // Auto advance to next item after 400ms if not at end
    if (activeItemIdx < oscarsItems.length - 1) {
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
  const totalScore = Object.values(ratings).reduce((a, b) => a + b, 0);

  let severity = 'Minimal Impairment';
  let severityClass = 'text-green-400 bg-green-950/40 border-green-500/30';
  if (answeredCount > 0) {
    const avg = totalScore / answeredCount;
    if (avg >= 5.5) {
      severity = 'Profound Social Cognitive Deficits';
      severityClass = 'text-red-400 bg-red-950/40 border-red-500/30';
    } else if (avg >= 4.0) {
      severity = 'Severe Social Cognitive Deficits';
      severityClass = 'text-orange-400 bg-orange-950/40 border-orange-500/30';
    } else if (avg >= 2.5) {
      severity = 'Moderate Social Cognitive Deficits';
      severityClass = 'text-yellow-400 bg-yellow-950/40 border-yellow-500/30';
    }
  }

  const handleSave = () => {
    const reportData = {
      total: totalScore,
      severity,
      subscores: {
        'Emotion Recognition': ratings[1] || 0,
        'Hostile Attribution': ratings[2] || 0,
        'Jumping to Conclusions': ratings[3] || 0,
        'Cognitive Flexibility': ratings[4] || 0,
        'Belief Correction': ratings[5] || 0,
        'Sarcasm & Humor': ratings[6] || 0,
        'Perspective Taking': ratings[7] || 0,
        'Social Cue Pragmatics': ratings[8] || 0
      },
      answers: ratings,
      interpretation: `Observable Social Cognition: A Rating Scale (OSCARS) composite rating is ${totalScore}/56 (${severity}).
- Emotion Recognition: ${ratings[1] || 0}/7
- Hostile Attribution: ${ratings[2] || 0}/7
- Jumping to Conclusions: ${ratings[3] || 0}/7
- Cognitive Flexibility: ${ratings[4] || 0}/7
- Belief Correction: ${ratings[5] || 0}/7
- Sarcasm & Humor: ${ratings[6] || 0}/7
- Perspective Taking: ${ratings[7] || 0}/7
- Social Cue Pragmatics: ${ratings[8] || 0}/7`
    };

    saveReport('oscars', reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#151b2c] p-6 rounded-2xl border border-slate-800 shadow-xl gap-4">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 flex items-center gap-2">
            <UserCheck className="w-7 h-7 text-cyan-400" />
            OSCARS Social Cognition Scale
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Observable Social Cognition: A Rating Scale. Clinician or informant rated social cognitive performance screener.
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
              {oscarsItems.map((item, idx) => {
                const rated = ratings[item.id] !== undefined;
                const active = activeItemIdx === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItemIdx(idx)}
                    className={`flex-1 min-w-[70px] py-2 rounded-lg text-xs font-bold transition-all border ${
                      active
                        ? 'bg-cyan-500 text-black border-cyan-400'
                        : rated
                        ? 'bg-[#161d30]/60 text-cyan-400 border-slate-800/80'
                        : 'bg-[#161d30]/20 text-slate-500 border-transparent hover:text-slate-300'
                    }`}
                  >
                    Area {item.id}
                  </button>
                );
              })}
            </div>

            {/* Active Question workspace */}
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 space-y-6 text-left">
              
              {/* Question Header */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Area {activeItem.id} of 8: {activeItem.title}</span>
                  {ratings[activeItem.id] !== undefined && (
                    <span className="text-xs text-green-400 bg-green-950/40 border border-green-500/20 px-2.5 py-0.5 rounded-full font-bold">
                      Rated: {ratings[activeItem.id]}/7
                    </span>
                  )}
                </div>
                <h3 className="text-md font-bold text-slate-200 leading-relaxed">{activeItem.question}</h3>
              </div>

              {/* Case Example Box */}
              <div className="p-4 bg-[#161d30]/30 rounded-xl border border-slate-800/60 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
                  Observable Example Case Behavior
                </span>
                <p className="text-slate-300 text-xs leading-relaxed italic">
                  "{activeItem.example}"
                </p>
              </div>

              {/* Anchor Descriptions */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block">Behavioral Anchor Guides</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[1, 3, 5, 7].map((num) => (
                    <div
                      key={num}
                      onClick={() => handleSelectRating(activeItem.id, num)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        ratings[activeItem.id] === num
                          ? 'bg-[#1e293b]/70 border-cyan-500/60 shadow-lg'
                          : 'bg-[#161d30]/10 border-slate-850 hover:bg-[#161d30]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          ratings[activeItem.id] === num ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {num}
                        </span>
                        <span className="text-xs font-bold text-slate-300">
                          {num === 1 ? 'None (Healthy)' : num === 3 ? 'Mild Deficit' : num === 5 ? 'Moderately Severe' : 'Extremely Severe'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">{activeItem.anchors[num as 1|3|5|7]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1 to 7 selector bar */}
              <div className="space-y-2 border-t border-slate-800/60 pt-4 flex flex-col items-center">
                <span className="text-xs text-slate-400 font-semibold mb-2">Select Observed Severity Rating (1 to 7):</span>
                <div className="flex gap-2 w-full max-w-md">
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleSelectRating(activeItem.id, num)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border ${
                        ratings[activeItem.id] === num
                          ? 'bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/20'
                          : 'bg-[#161d30] text-slate-300 border-slate-800 hover:bg-[#161d30]/80'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Back / Next buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  disabled={activeItemIdx === 0}
                  onClick={() => setActiveItemIdx((p) => p - 1)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 disabled:opacity-30 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Previous Area
                </button>
                <button
                  disabled={activeItemIdx === oscarsItems.length - 1}
                  onClick={() => setActiveItemIdx((p) => p + 1)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 disabled:opacity-30 transition-all"
                >
                  Next Area
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* Right Column Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 sticky top-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">OSCARS Profile</h3>
                <p className="text-xs text-slate-500 mt-0.5">Observable social cognitive status</p>
              </div>

              {/* Score circle */}
              <div className="flex flex-col items-center justify-center p-2">
                <div className="relative flex items-center justify-center">
                  <svg className="w-28 h-28 transform -rotate-90">
                    <circle cx="56" cy="56" r="50" stroke="#1e293b" strokeWidth="5" fill="transparent" />
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="#06b6d4"
                      strokeWidth="7"
                      fill="transparent"
                      strokeDasharray={314}
                      strokeDashoffset={314 - (314 * totalScore) / 56}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-extrabold text-white">{totalScore}</span>
                    <span className="text-[10px] text-slate-500 block">/ 56 points</span>
                  </div>
                </div>
                
                {answeredCount > 0 && (
                  <div className={`mt-4 px-3 py-1.5 rounded-xl border text-xs font-bold text-center ${severityClass} transition-all`}>
                    {severity}
                  </div>
                )}
              </div>

              {/* Answered indicator checklist */}
              <div className="space-y-2.5 border-t border-slate-800/60 pt-4 text-xs">
                {oscarsItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-slate-400 truncate max-w-[70%]">{item.id}. {item.title}</span>
                    <span className={`font-mono text-xs font-bold ${ratings[item.id] !== undefined ? 'text-cyan-400' : 'text-slate-600'}`}>
                      {ratings[item.id] !== undefined ? `${ratings[item.id]}/7` : '---'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="space-y-2 pt-2">
                <button
                  disabled={answeredCount === 0}
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black font-semibold rounded-xl py-3 shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm animate-pulse-subtle"
                >
                  <Save className="w-4 h-4" />
                  Save OSCARS Report
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
                  OSCARS report saved successfully!
                </div>
              )}

            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0f1322] border border-slate-900 rounded-2xl p-6 shadow-xl text-left">
          {scaleLearningDb['oscars'] ? (
            <TutorialContent text={scaleLearningDb['oscars'].scoringTutorial} />
          ) : (
            <p className="text-slate-400">No clinical notes available for OSCARS.</p>
          )}
        </div>
      )}
    </div>
  );
};
