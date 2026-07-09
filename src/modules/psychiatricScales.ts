export interface ScaleItem {
  id: number;
  label: string;
  options: { value: number; text: string }[];
}

export interface PsychiatricScaleData {
  id: string;
  name: string;
  items: ScaleItem[];
  calculateScore: (answers: Record<number, number>) => {
    total: number;
    subscores?: Record<string, number>;
    severity: string;
    interpretation: string;
  };
}

export const bdiScale: PsychiatricScaleData = {
  id: 'bdi',
  name: 'Beck Depression Inventory (BDI-II)',
  items: [
    {
      id: 1,
      label: 'Sadness',
      options: [
        { value: 0, text: 'I do not feel sad.' },
        { value: 1, text: 'I feel sad much of the time.' },
        { value: 2, text: 'I am sad all the time and I can\'t snap out of it.' },
        { value: 3, text: 'I am so sad or unhappy that I can\'t stand it.' }
      ]
    },
    {
      id: 2,
      label: 'Pessimism',
      options: [
        { value: 0, text: 'I am not discouraged about my future.' },
        { value: 1, text: 'I feel more discouraged about my future than I used to be.' },
        { value: 2, text: 'I do not expect things to work out for me.' },
        { value: 3, text: 'I feel my future is hopeless and will only get worse.' }
      ]
    },
    {
      id: 3,
      label: 'Past Failure',
      options: [
        { value: 0, text: 'I do not feel like a failure.' },
        { value: 1, text: 'I have failed more than I should have.' },
        { value: 2, text: 'As I look back, I see a lot of failures.' },
        { value: 3, text: 'I feel I am a total failure as a person.' }
      ]
    },
    {
      id: 4,
      label: 'Loss of Pleasure',
      options: [
        { value: 0, text: 'I get as much pleasure as I ever did from the things I enjoy.' },
        { value: 1, text: 'I don\'t enjoy things as much as I used to.' },
        { value: 2, text: 'I get very little pleasure from the things I used to enjoy.' },
        { value: 3, text: 'I can\'t get any pleasure from the things I used to enjoy.' }
      ]
    },
    {
      id: 5,
      label: 'Guilty Feelings',
      options: [
        { value: 0, text: 'I don\'t feel particularly guilty.' },
        { value: 1, text: 'I feel guilty over many things I have done or should have done.' },
        { value: 2, text: 'I feel quite guilty most of the time.' },
        { value: 3, text: 'I feel guilty all of the time.' }
      ]
    },
    {
      id: 6,
      label: 'Punishment Feelings',
      options: [
        { value: 0, text: 'I don\'t feel I am being punished.' },
        { value: 1, text: 'I feel I may be punished.' },
        { value: 2, text: 'I expect to be punished.' },
        { value: 3, text: 'I feel I am being punished.' }
      ]
    },
    {
      id: 7,
      label: 'Self-Dislike',
      options: [
        { value: 0, text: 'I feel the same about myself as ever.' },
        { value: 1, text: 'I have lost confidence in myself.' },
        { value: 2, text: 'I am disappointed in myself.' },
        { value: 3, text: 'I dislike myself.' }
      ]
    },
    {
      id: 8,
      label: 'Self-Criticalness',
      options: [
        { value: 0, text: 'I don\'t criticize or blame myself more than usual.' },
        { value: 1, text: 'I am more critical of myself than I used to be.' },
        { value: 2, text: 'I criticize myself for all of my faults.' },
        { value: 3, text: 'I blame myself for everything bad that happens.' }
      ]
    },
    {
      id: 9,
      label: 'Suicidal Thoughts or Wishes',
      options: [
        { value: 0, text: 'I don\'t have any thoughts of killing myself.' },
        { value: 1, text: 'I have thoughts of killing myself, but I would not carry them out.' },
        { value: 2, text: 'I would like to kill myself.' },
        { value: 3, text: 'I would kill myself if I had the chance.' }
      ]
    },
    {
      id: 10,
      label: 'Crying',
      options: [
        { value: 0, text: 'I don\'t cry any more than I used to.' },
        { value: 1, text: 'I cry more than I used to.' },
        { value: 2, text: 'I cry over every little thing.' },
        { value: 3, text: 'I feel like crying, but I can\'t.' }
      ]
    },
    {
      id: 11,
      label: 'Agitation',
      options: [
        { value: 0, text: 'I am no more restless or wound up than usual.' },
        { value: 1, text: 'I feel more restless or wound up than usual.' },
        { value: 2, text: 'I am so restless or agitated that it\'s hard to stay still.' },
        { value: 3, text: 'I am so restless or agitated that I have to keep moving or doing something.' }
      ]
    },
    {
      id: 12,
      label: 'Loss of Interest',
      options: [
        { value: 0, text: 'I have not lost interest in other people or activities.' },
        { value: 1, text: 'I am less interested in other people or things than I used to be.' },
        { value: 2, text: 'I have lost most of my interest in other people or things.' },
        { value: 3, text: 'It\'s hard to get interested in anything.' }
      ]
    },
    {
      id: 13,
      label: 'Indecisiveness',
      options: [
        { value: 0, text: 'I make decisions about as well as ever.' },
        { value: 1, text: 'I find it more difficult to make decisions than usual.' },
        { value: 2, text: 'I have much greater difficulty in making decisions than I used to.' },
        { value: 3, text: 'I have trouble making any decisions.' }
      ]
    },
    {
      id: 14,
      label: 'Worthlessness',
      options: [
        { value: 0, text: 'I do not feel I am worthless.' },
        { value: 1, text: 'I don\'t consider myself as useful or worthwhile as I used to.' },
        { value: 2, text: 'I feel more worthless as compared to other people.' },
        { value: 3, text: 'I feel utterly worthless.' }
      ]
    },
    {
      id: 15,
      label: 'Loss of Energy',
      options: [
        { value: 0, text: 'I have as much energy as ever.' },
        { value: 1, text: 'I have less energy than I used to have.' },
        { value: 2, text: 'I don\'t have enough energy to do very much.' },
        { value: 3, text: 'I don\'t have enough energy to do anything.' }
      ]
    },
    {
      id: 16,
      label: 'Changes in Sleeping Pattern',
      options: [
        { value: 0, text: 'I have not experienced any change in my sleeping pattern.' },
        { value: 1, text: 'I sleep somewhat more or less than usual.' },
        { value: 2, text: 'I sleep a lot more or less than usual.' },
        { value: 3, text: 'I sleep most of the day or wake up 1-2 hours early and can\'t get back to sleep.' }
      ]
    },
    {
      id: 17,
      label: 'Irritability',
      options: [
        { value: 0, text: 'I am no more irritable than usual.' },
        { value: 1, text: 'I am more irritable than usual.' },
        { value: 2, text: 'I am much more irritable than usual.' },
        { value: 3, text: 'I am irritable all the time.' }
      ]
    },
    {
      id: 18,
      label: 'Changes in Appetite',
      options: [
        { value: 0, text: 'I have not experienced any change in my appetite.' },
        { value: 1, text: 'My appetite is somewhat less or greater than usual.' },
        { value: 2, text: 'My appetite is much less or greater than usual.' },
        { value: 3, text: 'I have no appetite at all or crave food all the time.' }
      ]
    },
    {
      id: 19,
      label: 'Concentration Difficulty',
      options: [
        { value: 0, text: 'I can concentrate as well as ever.' },
        { value: 1, text: 'I can\'t concentrate as well as usual.' },
        { value: 2, text: 'It\'s hard to keep my mind on anything for very long.' },
        { value: 3, text: 'I find I can\'t concentrate on anything at all.' }
      ]
    },
    {
      id: 20,
      label: 'Tiredness or Fatigue',
      options: [
        { value: 0, text: 'I am no more tired or fatigued than usual.' },
        { value: 1, text: 'I get tired or fatigued more easily than usual.' },
        { value: 2, text: 'I am too tired or fatigued to do a lot of the things I used to do.' },
        { value: 3, text: 'I am too tired or fatigued to do most of the things I used to do.' }
      ]
    },
    {
      id: 21,
      label: 'Loss of Interest in Sex',
      options: [
        { value: 0, text: 'I have not noticed any recent change in my interest in sex.' },
        { value: 1, text: 'I am less interested in sex than I used to be.' },
        { value: 2, text: 'I am much less interested in sex now.' },
        { value: 3, text: 'I have lost interest in sex completely.' }
      ]
    }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 21; i++) {
      total += answers[i] || 0;
    }

    let severity = 'Minimal';
    let interpretation = '';

    if (total <= 13) {
      severity = 'Minimal';
      interpretation = 'The score indicates minimal depressive symptoms. This is within the normal, non-clinical range.';
    } else if (total <= 19) {
      severity = 'Mild';
      interpretation = 'The score indicates mild depressive symptoms. It suggests light dysphoria or sadness, which might warrant clinical monitoring or minor intervention.';
    } else if (total <= 28) {
      severity = 'Moderate';
      interpretation = 'The score indicates moderate depressive symptoms. This level typically indicates clinically significant distress and impairment, suggesting that therapeutic or psychiatric intervention is appropriate.';
    } else {
      severity = 'Severe';
      interpretation = 'The score indicates severe depressive symptoms. This represents a high level of distress and impairment. Urgent clinical attention is recommended, including detailed assessment of safety/suicidality.';
    }

    return { total, severity, interpretation };
  }
};

export const ymrsScale: PsychiatricScaleData = {
  id: 'ymrs',
  name: 'Young Mania Rating Scale (YMRS)',
  items: [
    {
      id: 1,
      label: '1. Elevated Mood',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mildly or possibly increased on questioning' },
        { value: 2, text: '2 - Definite subjective elevation; optimistic, self-confident; cheerful; appropriate to content' },
        { value: 3, text: '3 - Elevated, inappropriate to content; humorous' },
        { value: 4, text: '4 - Euphoric; inappropriate laughter; singing' }
      ]
    },
    {
      id: 2,
      label: '2. Increased Motor Activity-Energy',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Subjectively increased' },
        { value: 2, text: '2 - Animated; gestures increased' },
        { value: 3, text: '3 - Excessive activity; restless (can be moderated)' },
        { value: 4, text: '4 - Motor excitement; continuous hyperactivity (cannot be moderated)' }
      ]
    },
    {
      id: 3,
      label: '3. Sexual Interest',
      options: [
        { value: 0, text: '0 - Normal; not increased' },
        { value: 1, text: '1 - Mildly or possibly increased' },
        { value: 2, text: '2 - Definite subjective increase on questioning' },
        { value: 3, text: '3 - Spontaneous sexual content; elaborates on sexual matters; hypersexual themes' },
        { value: 4, text: '4 - Overt sexual behavior (towards patients, staff, or evaluator)' }
      ]
    },
    {
      id: 4,
      label: '4. Sleep',
      options: [
        { value: 0, text: '0 - Reports no decrease in sleep' },
        { value: 1, text: '1 - Sleeping less than normal amount by up to one hour' },
        { value: 2, text: '2 - Sleeping less than normal by more than one hour' },
        { value: 3, text: '3 - Reports decreased need for sleep' },
        { value: 4, text: '4 - Denies need for sleep' }
      ]
    },
    {
      id: 5,
      label: '5. Irritability (Double Weighted)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 2, text: '2 - Subjectively increased' },
        { value: 4, text: '4 - Irritable at times during interview; recent episodes of anger or annoyance at home/ward' },
        { value: 6, text: '6 - Frequently irritable during interview; short, curt responses' },
        { value: 8, text: '8 - Hostile, uncooperative; interview impossible' }
      ]
    },
    {
      id: 6,
      label: '6. Speech (Rate and Amount) (Double Weighted)',
      options: [
        { value: 0, text: '0 - No increase' },
        { value: 2, text: '2 - Feels talkative' },
        { value: 4, text: '4 - Increased rate or volume at times; occasional push of speech' },
        { value: 6, text: '6 - Push; consistently increased rate and volume; difficult to interrupt' },
        { value: 8, text: '8 - Pressured; uninterruptible, continuous speech' }
      ]
    },
    {
      id: 7,
      label: '7. Language-Thought Disorder',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Circumstantial; mild digression; speech occasionally distractible' },
        { value: 2, text: '2 - Distractible; loses goal of thought; frequent digressions; inconsistent associations' },
        { value: 3, text: '3 - Flight of ideas; tangentiality; speech incoherent at times' },
        { value: 4, text: '4 - Incoherent; communication impossible' }
      ]
    },
    {
      id: 8,
      label: '8. Content (Double Weighted)',
      options: [
        { value: 0, text: '0 - Normal' },
        { value: 2, text: '2 - Special projects; hyper-religious themes' },
        { value: 4, text: '4 - Grandiose ideas; grandiose projects; ideas of reference' },
        { value: 6, text: '6 - Delusions of grandeur or reference; somatic delusions' },
        { value: 8, text: '8 - Hallucinations; delusions incongruent with mood' }
      ]
    },
    {
      id: 9,
      label: '9. Disruptive-Aggressive Behavior (Double Weighted)',
      options: [
        { value: 0, text: '0 - Cooperative; social behavior normal' },
        { value: 2, text: '2 - Sarcastic; loud speech, guarded' },
        { value: 4, text: '4 - Demandant; intrusive at home/ward; argumentative' },
        { value: 6, text: '6 - Threatening; loud; cooperative with difficulty' },
        { value: 8, text: '8 - Assaultive; destructive; interview impossible' }
      ]
    },
    {
      id: 10,
      label: '10. Appearance',
      options: [
        { value: 0, text: '0 - Appropriate dress and grooming' },
        { value: 1, text: '1 - Mildly unkempt or eccentric' },
        { value: 2, text: '2 - Moderately disheveled; eccentric; poorly groomed; overdressed' },
        { value: 3, text: '3 - Disheveled; dress inappropriate; bizarre make-up/hair' },
        { value: 4, text: '4 - Completely disheveled; bizarre grooming; nude or semi-nude' }
      ]
    },
    {
      id: 11,
      label: '11. Insight',
      options: [
        { value: 0, text: '0 - Present; admits illness; agrees with treatment' },
        { value: 1, text: '1 - Admits possible illness or need for treatment' },
        { value: 2, text: '2 - Admits change in behavior, but denies illness' },
        { value: 3, text: '3 - Admits change in behavior, but blames others or circumstances' },
        { value: 4, text: '4 - Denies any behavior change or illness' }
      ]
    }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 11; i++) {
      total += answers[i] || 0;
    }

    let severity = 'Normal / Remission';
    let interpretation = '';

    if (total <= 12) {
      severity = 'Normal / Remission';
      interpretation = 'Scores below 12 suggest no significant manic symptoms, representing clinical remission or normal mood states.';
    } else if (total <= 19) {
      severity = 'Mild';
      interpretation = 'Scores from 13 to 19 indicate mild mania (hypomania). The individual shows noticeable mood elevations, hyperactivity, or irritability, but functioning may only be moderately impaired.';
    } else if (total <= 25) {
      severity = 'Moderate';
      interpretation = 'Scores from 20 to 25 indicate moderate manic symptoms. Clinical features are prominent, causing clear functional impairment and disruption. Treatment intervention is strongly indicated.';
    } else {
      severity = 'Severe';
      interpretation = 'Scores of 26 and above indicate severe manic episode. The clinical picture is intense, potentially featuring severe thought disorder, psychotic symptoms (grandiosity, hallucinations), aggression, or extreme motor excitement. Immediate psychiatric intervention and close monitoring are typically necessary.';
    }

    return { total, severity, interpretation };
  }
};

export const ybocsScale: PsychiatricScaleData = {
  id: 'ybocs',
  name: 'Yale-Brown Obsessive Compulsive Scale (Y-BOCS)',
  items: [
    {
      id: 1,
      label: '1. Time spent on Obsessions',
      options: [
        { value: 0, text: '0 - None' },
        { value: 1, text: '1 - Mild (less than 1 hr/day, or occasional)' },
        { value: 2, text: '2 - Moderate (1 to 3 hrs/day, or frequent)' },
        { value: 3, text: '3 - Severe (more than 3 and up to 8 hrs/day, or very frequent)' },
        { value: 4, text: '4 - Extreme (more than 8 hrs/day, or near constant)' }
      ]
    },
    {
      id: 2,
      label: '2. Interference from Obsessions',
      options: [
        { value: 0, text: '0 - None' },
        { value: 1, text: '1 - Mild (slight interference with social/occupational activities, but overall performance not impaired)' },
        { value: 2, text: '2 - Moderate (definite interference, but still manageable)' },
        { value: 3, text: '3 - Severe (causes substantial impairment in social or occupational performance)' },
        { value: 4, text: '4 - Extreme (incapacitating)' }
      ]
    },
    {
      id: 3,
      label: '3. Distress from Obsessions',
      options: [
        { value: 0, text: '0 - None' },
        { value: 1, text: '1 - Mild (infrequent, not too disturbing)' },
        { value: 2, text: '2 - Moderate (frequent, disturbing but still manageable)' },
        { value: 3, text: '3 - Severe (very frequent, highly disturbing)' },
        { value: 4, text: '4 - Extreme (near constant, disabling distress)' }
      ]
    },
    {
      id: 4,
      label: '4. Resistance against Obsessions',
      options: [
        { value: 0, text: '0 - Always make an effort to resist (or symptoms so minimal no need to resist)' },
        { value: 1, text: '1 - Try to resist most of the time' },
        { value: 2, text: '2 - Make some effort to resist' },
        { value: 3, text: '3 - Yield to all obsessions without attempt to control, but do so with reluctance' },
        { value: 4, text: '4 - Completely and willingly yield to all obsessions' }
      ]
    },
    {
      id: 5,
      label: '5. Control over Obsessions',
      options: [
        { value: 0, text: '0 - Complete control' },
        { value: 1, text: '1 - Much control (can stop or deflect obsessions with some effort)' },
        { value: 2, text: '2 - Moderate control (sometimes able to deflect obsessions)' },
        { value: 3, text: '3 - Little control (rarely successful in dismissing obsessions)' },
        { value: 4, text: '4 - No control (completely involuntary)' }
      ]
    },
    {
      id: 6,
      label: '6. Time spent on Compulsions',
      options: [
        { value: 0, text: '0 - None' },
        { value: 1, text: '1 - Mild (less than 1 hr/day, or occasional)' },
        { value: 2, text: '2 - Moderate (1 to 3 hrs/day, or frequent)' },
        { value: 3, text: '3 - Severe (more than 3 and up to 8 hrs/day, or very frequent)' },
        { value: 4, text: '4 - Extreme (more than 8 hrs/day, or near constant)' }
      ]
    },
    {
      id: 7,
      label: '7. Interference from Compulsions',
      options: [
        { value: 0, text: '0 - None' },
        { value: 1, text: '1 - Mild (slight interference, but overall performance not impaired)' },
        { value: 2, text: '2 - Moderate (definite interference, but still manageable)' },
        { value: 3, text: '3 - Severe (causes substantial impairment in social or occupational performance)' },
        { value: 4, text: '4 - Extreme (incapacitating)' }
      ]
    },
    {
      id: 8,
      label: '8. Distress from Compulsions',
      options: [
        { value: 0, text: '0 - None' },
        { value: 1, text: '1 - Mild (if compulsions blocked, only slightly anxious)' },
        { value: 2, text: '2 - Moderate (if blocked, anxiety is prominent but manageable)' },
        { value: 3, text: '3 - Severe (if blocked, highly distressing and intense anxiety)' },
        { value: 4, text: '4 - Extreme (if blocked, incapacitating/panic-level anxiety)' }
      ]
    },
    {
      id: 9,
      label: '9. Resistance against Compulsions',
      options: [
        { value: 0, text: '0 - Always make an effort to resist (or symptoms so minimal no need to resist)' },
        { value: 1, text: '1 - Try to resist most of the time' },
        { value: 2, text: '2 - Make some effort to resist' },
        { value: 3, text: '3 - Yield to all compulsions without attempt to control, but do so with reluctance' },
        { value: 4, text: '4 - Completely and willingly yield to all compulsions' }
      ]
    },
    {
      id: 10,
      label: '10. Control over Compulsions',
      options: [
        { value: 0, text: '0 - Complete control' },
        { value: 1, text: '1 - Much control (can stop or deflect compulsions with some effort)' },
        { value: 2, text: '2 - Moderate control (sometimes able to stop compulsions)' },
        { value: 3, text: '3 - Little control (rarely successful in stopping compulsions once started)' },
        { value: 4, text: '4 - No control (completely involuntary/incapable of resisting)' }
      ]
    }
  ],
  calculateScore: (answers) => {
    let obsessions = 0;
    let compulsions = 0;

    for (let i = 1; i <= 5; i++) obsessions += answers[i] || 0;
    for (let i = 6; i <= 10; i++) compulsions += answers[i] || 0;

    const total = obsessions + compulsions;

    let severity = 'Subclinical';
    let interpretation = '';

    if (total <= 7) {
      severity = 'Subclinical';
      interpretation = 'Symptoms are subclinical and do not meet the threshold for active diagnostic concern.';
    } else if (total <= 15) {
      severity = 'Mild';
      interpretation = 'Indicates mild OCD symptom severity. There are noticeable obsessions or compulsions causing minor interference, but functioning is preserved.';
    } else if (total <= 23) {
      severity = 'Moderate';
      interpretation = 'Indicates moderate OCD symptom severity. Obsessions/compulsions consume significant daily time and cause noticeable distress and interference in social or vocational life.';
    } else if (total <= 31) {
      severity = 'Severe';
      interpretation = 'Indicates severe OCD symptoms. Symptoms occupy several hours a day, causing substantial distress and significant functional impairment. Aggressive therapeutic/psychopharmacological treatment is indicated.';
    } else {
      severity = 'Extreme';
      interpretation = 'Indicates extreme OCD symptoms. Symptoms are near-constant and incapacitating, causing profound distress and preventing normal functioning. Intensive clinical care or hospitalization may be required.';
    }

    return {
      total,
      subscores: { obsessions, compulsions },
      severity,
      interpretation
    };
  }
};

export const hamaScale: PsychiatricScaleData = {
  id: 'hama',
  name: 'Hamilton Anxiety Rating Scale (HAM-A)',
  items: [
    {
      id: 1,
      label: '1. Anxious Mood (worries, anticipation of the worst, fearful anticipation, irritability)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Very Severe / Grossly Disabling' }
      ]
    },
    {
      id: 2,
      label: '2. Tension (feelings of tension, fatigability, startle response, moved to tears easily, trembling, feelings of restlessness, inability to relax)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Very Severe / Grossly Disabling' }
      ]
    },
    {
      id: 3,
      label: '3. Fears (of dark, strangers, being left alone, large animals, traffic, crowds)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Very Severe / Grossly Disabling' }
      ]
    },
    {
      id: 4,
      label: '4. Insomnia (difficulty in falling asleep, broken sleep, unsatisfying sleep and fatigue on waking, dreams, nightmares, night terrors)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Very Severe / Grossly Disabling' }
      ]
    },
    {
      id: 5,
      label: '5. Intellectual (Cognitive) (difficulty in concentration, poor memory)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Very Severe / Grossly Disabling' }
      ]
    },
    {
      id: 6,
      label: '6. Depressed Mood (loss of interest, lack of pleasure in hobbies, depression, early waking, diurnal swing)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Very Severe / Grossly Disabling' }
      ]
    },
    {
      id: 7,
      label: '7. Somatic (Muscular) (muscular pains and aches, muscular stiffness, muscular twitching, clonic jerks, grinding of teeth, unsteady voice)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Very Severe / Grossly Disabling' }
      ]
    },
    {
      id: 8,
      label: '8. Somatic (Sensory) (tinnitus, blurring of vision, hot and cold flushes, feelings of weakness, pricking sensations)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Very Severe / Grossly Disabling' }
      ]
    },
    {
      id: 9,
      label: '9. Cardiovascular Symptoms (tachycardia, palpitations, pain in chest, throbbing of vessels, fainting feelings, missing beat)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Very Severe / Grossly Disabling' }
      ]
    },
    {
      id: 10,
      label: '10. Respiratory Symptoms (pressure or constriction in chest, choking feelings, sighing, dyspnea)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Very Severe / Grossly Disabling' }
      ]
    },
    {
      id: 11,
      label: '11. Gastrointestinal Symptoms (difficulty in swallowing, wind, dyspepsia, pain before and after meals, burning sensations, fullness, waterbrash, nausea, vomiting, sinking feelings, "working" in the abdomen, borborygmi, looseness of bowels, loss of weight, constipation)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Very Severe / Grossly Disabling' }
      ]
    },
    {
      id: 12,
      label: '12. Genitourinary Symptoms (frequency of micturition, urgency of micturition, amenorrhea, menorrhagia, development of frigidity, premature ejaculation, loss of erection, impotence)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Very Severe / Grossly Disabling' }
      ]
    },
    {
      id: 13,
      label: '13. Autonomic Symptoms (dry mouth, flushing, pallor, tendency to sweat, giddiness, tension headache, raising of hair)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Very Severe / Grossly Disabling' }
      ]
    },
    {
      id: 14,
      label: '14. Behavior at Interview (physiological and behavioral signs during the clinical interview: fidgeting, restlessness, sighing, rapid breathing, facial grimacing, hand wringing, etc.)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Very Severe / Grossly Disabling' }
      ]
    }
  ],
  calculateScore: (answers) => {
    let total = 0;
    let psychic = 0;
    let somatic = 0;

    for (let i = 1; i <= 14; i++) {
      const val = answers[i] || 0;
      total += val;
      if ([1, 2, 3, 4, 5, 6, 14].includes(i)) {
        psychic += val;
      } else {
        somatic += val;
      }
    }

    let severity = 'Mild';
    let interpretation = '';

    if (total <= 17) {
      severity = 'Mild';
      interpretation = 'Indicates mild anxiety severity. Symptoms represent low-level daily distress and are generally manageable.';
    } else if (total <= 24) {
      severity = 'Mild to Moderate';
      interpretation = 'Indicates mild to moderate anxiety. The patient experiences noticeable anxiety symptoms that cause moderate distress and functional interference.';
    } else if (total <= 30) {
      severity = 'Moderate to Severe';
      interpretation = 'Indicates moderate to severe anxiety. Cognitive, behavioral, and somatic symptoms are prominent, causing significant daily impairment and emotional distress.';
    } else {
      severity = 'Severe';
      interpretation = 'Indicates severe or disabling anxiety. The patient is highly symptomatic, presenting severe autonomic, cognitive, or somatic distress that severely restricts functioning.';
    }

    return {
      total,
      subscores: { psychic, somatic },
      severity,
      interpretation
    };
  }
};

export const hamdScale: PsychiatricScaleData = {
  id: 'hamd',
  name: 'Hamilton Depression Rating Scale (HAMD-17)',
  items: [
    {
      id: 1,
      label: '1. Depressed Mood (sadness, hopeless, helpless, worthless)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild (indicated only on questioning)' },
        { value: 2, text: '2 - Moderate (spontaneously reported verbally)' },
        { value: 3, text: '3 - Severe (communicated non-verbally, e.g., facial expression, weeping)' },
        { value: 4, text: '4 - Very Severe (patient reports virtually only these feeling states)' }
      ]
    },
    {
      id: 2,
      label: '2. Feelings of Guilt (self-reproach, feels he has let people down)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Self-reproach, feels he has let people down' },
        { value: 2, text: '2 - Ideas of guilt or rumination over past errors' },
        { value: 3, text: '3 - Present illness is a punishment. Delusions of guilt' },
        { value: 4, text: '4 - Delusions of guilt accompanied by accusatory hallucinations' }
      ]
    },
    {
      id: 3,
      label: '3. Suicide (suicidal thoughts, gestures, or attempts)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Feels life is not worth living' },
        { value: 2, text: '2 - Wishes he were dead or thoughts of suicide' },
        { value: 3, text: '3 - Suicidal ideas, gestures, or plans' },
        { value: 4, text: '4 - Serious suicide attempts' }
      ]
    },
    {
      id: 4,
      label: '4. Insomnia Early (difficulty falling asleep)',
      options: [
        { value: 0, text: '0 - No difficulty falling asleep' },
        { value: 1, text: '1 - Complains of occasional difficulty (more than 30 mins)' },
        { value: 2, text: '2 - Complains of nightly difficulty falling asleep' }
      ]
    },
    {
      id: 5,
      label: '5. Insomnia Middle (waking during the night, restlessness)',
      options: [
        { value: 0, text: '0 - No difficulty' },
        { value: 1, text: '1 - Restless or disturbed sleep, waking up during night' },
        { value: 2, text: '2 - Waking during the night, getting out of bed' }
      ]
    },
    {
      id: 6,
      label: '6. Insomnia Late (waking in early hours of morning, unable to fall asleep again)',
      options: [
        { value: 0, text: '0 - No difficulty' },
        { value: 1, text: '1 - Waking in early hours of morning but goes back to sleep' },
        { value: 2, text: '2 - Unable to fall asleep again if gets out of bed' }
      ]
    },
    {
      id: 7,
      label: '7. Work and Activities (loss of interest, fatigue, decreased productivity)',
      options: [
        { value: 0, text: '0 - No difficulty' },
        { value: 1, text: '1 - Thoughts of incapacity, fatigue related to activities' },
        { value: 2, text: '2 - Loss of interest in activity, hobbies, or work' },
        { value: 3, text: '3 - Decrease in actual time spent in activities or productivity' },
        { value: 4, text: '4 - Stopped working because of present illness' }
      ]
    },
    {
      id: 8,
      label: '8. Retardation (slowness of thought and speech; impaired concentration; decreased motor activity)',
      options: [
        { value: 0, text: '0 - Normal speech and thought' },
        { value: 1, text: '1 - Slight retardation at interview' },
        { value: 2, text: '2 - Obvious retardation at interview' },
        { value: 3, text: '3 - Interview difficult' },
        { value: 4, text: '4 - Complete stupor' }
      ]
    },
    {
      id: 9,
      label: '9. Agitation (fidgetiness, wringing hands, moving about)',
      options: [
        { value: 0, text: '0 - None' },
        { value: 1, text: '1 - Fidgetiness' },
        { value: 2, text: '2 - Playing with hands, hair, etc.' },
        { value: 3, text: '3 - Moving about, can\'t sit still' },
        { value: 4, text: '4 - Hand wringing, nail biting, hair pulling, biting of lips' }
      ]
    },
    {
      id: 10,
      label: '10. Anxiety Psychological (subjective tension, irritability, worry)',
      options: [
        { value: 0, text: '0 - No difficulty' },
        { value: 1, text: '1 - Subjective tension and irritability' },
        { value: 2, text: '2 - Worrying about minor matters' },
        { value: 3, text: '3 - Apprehensive attitude apparent in face or speech' },
        { value: 4, text: '4 - Fears expressed without questioning' }
      ]
    },
    {
      id: 11,
      label: '11. Anxiety Somatic (physiological symptoms: butterflies, gastrointestinal, sweating, tremor, hyperventilation)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Moderate' },
        { value: 3, text: '3 - Severe' },
        { value: 4, text: '4 - Incapacitating' }
      ]
    },
    {
      id: 12,
      label: '12. Somatic Symptoms Gastrointestinal (loss of appetite, difficulty eating without urging)',
      options: [
        { value: 0, text: '0 - None' },
        { value: 1, text: '1 - Loss of appetite but eating without encouragement' },
        { value: 2, text: '2 - Difficulty eating without urging' }
      ]
    },
    {
      id: 13,
      label: '13. Somatic Symptoms General (heaviness in limbs, back, or head; backaches; loss of energy)',
      options: [
        { value: 0, text: '0 - None' },
        { value: 1, text: '1 - Heaviness in limbs, back, or head. Backaches, muscle aches, loss of energy' },
        { value: 2, text: '2 - Any clear-cut somatic symptom' }
      ]
    },
    {
      id: 14,
      label: '14. Genital Symptoms (symptoms such as loss of libido, menstrual disturbances)',
      options: [
        { value: 0, text: '0 - Absent' },
        { value: 1, text: '1 - Mild' },
        { value: 2, text: '2 - Severe' }
      ]
    },
    {
      id: 15,
      label: '15. Hypochondriasis (self-absorption bodily, preoccupation with health)',
      options: [
        { value: 0, text: '0 - Not present' },
        { value: 1, text: '1 - Self-absorption (bodily)' },
        { value: 2, text: '2 - Preoccupation with health' },
        { value: 3, text: '3 - Frequent complaints, requests for help' },
        { value: 4, text: '4 - Hypochondriacal delusions' }
      ]
    },
    {
      id: 16,
      label: '16. Loss of Weight (measured by weight loss)',
      options: [
        { value: 0, text: '0 - No weight loss' },
        { value: 1, text: '1 - Probable weight loss associated with present illness' },
        { value: 2, text: '2 - Definite (according to patient) weight loss' },
        { value: 3, text: '3 - Not assessed / Unknown' }
      ]
    },
    {
      id: 17,
      label: '17. Insight (acknowledges being depressed and ill)',
      options: [
        { value: 0, text: '0 - Acknowledges being depressed and ill' },
        { value: 1, text: '1 - Acknowledges illness but attributes cause to environment, climate, overwork, etc.' },
        { value: 2, text: '2 - Denies being ill at all' }
      ]
    }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 17; i++) {
      total += answers[i] || 0;
    }

    let severity = 'Normal / Remission';
    let interpretation = '';

    if (total <= 7) {
      severity = 'Normal / Remission';
      interpretation = 'Normal score. Represents clinical remission of depressive symptoms.';
    } else if (total <= 17) {
      severity = 'Mild Depression';
      interpretation = 'Mild depressive episode. The patient is experiencing mild mood, sleep, or somatic concerns but retains basic daily functioning.';
    } else if (total <= 24) {
      severity = 'Moderate Depression';
      interpretation = 'Moderate depressive episode. Symptoms are prominent and cause significant distress, fatigue, and occupational or social impairment.';
    } else {
      severity = 'Severe Depression';
      interpretation = 'Severe depressive episode. Significant clinical pathology, suicide risk, and severe somatic/neurovegetative impairment. Needs immediate intervention.';
    }

    return {
      total,
      severity,
      interpretation
    };
  }
};

export const asrsScale: PsychiatricScaleData = {
  id: 'asrs',
  name: 'Adult ADHD Self-Report Scale (ASRS-v1.1)',
  items: [
    {
      id: 1,
      label: '1. How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done? (Part A)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 2,
      label: '2. How often do you have difficulty getting things in order when you have to do a task that requires organization? (Part A)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 3,
      label: '3. How often do you have problems remembering appointments or obligations? (Part A)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 4,
      label: '4. When you have a task that requires a lot of thought, how often do you avoid or delay getting started? (Part A)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 5,
      label: '5. How often do you fidget or squirm with your hands or feet when you have to sit down for a long time? (Part A)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 6,
      label: '6. How often do you feel overly active and compelled to do things, like you were driven by a motor? (Part A)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 7,
      label: '7. How often do you make careless mistakes when you have to work on a boring or difficult project? (Part B)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 8,
      label: '8. How often do you have difficulty keeping your attention when you are doing boring or repetitive work? (Part B)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 9,
      label: '9. How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly? (Part B)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 10,
      label: '10. How often do you misplace or have difficulty finding things at home or at work? (Part B)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 11,
      label: '11. How often are you distracted by activity or noise around you? (Part B)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 12,
      label: '12. How often do you leave your seat in meetings or other situations in which you are expected to remain seated? (Part B)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 13,
      label: '13. How often do you feel restless or fidgety? (Part B)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 14,
      label: '14. How often do you have difficulty unwinding and relaxing when you have time to yourself? (Part B)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 15,
      label: '15. How often do you find yourself talking too much when you are in social situations? (Part B)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 16,
      label: '16. When you\'re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves? (Part B)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 17,
      label: '17. How often do you have difficulty waiting your turn in situations when turn taking is required? (Part B)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    },
    {
      id: 18,
      label: '18. How often do you interrupt others when they are busy? (Part B)',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Oen' },
        { value: 4, text: 'Very Oen' }
      ]
    }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 18; i++) {
      total += answers[i] || 0;
    }

    // Part A screener check (critical thresholds in shaded boxes)
    let partAScore = 0;
    for (let i = 1; i <= 3; i++) {
      if ((answers[i] || 0) >= 2) partAScore++; // Sometimes, Oen, Very Oen
    }
    for (let i = 4; i <= 6; i++) {
      if ((answers[i] || 0) >= 3) partAScore++; // Oen, Very Oen
    }

    const isPositiveScreen = partAScore >= 4;

    const severity = isPositiveScreen ? 'Positive Screen' : 'Negative Screen';
    const interpretation = isPositiveScreen
      ? `Positive Screen (Score: ${partAScore}/6 in Part A). Symptoms are highly consistent with Adult ADHD. A comprehensive clinical diagnostic evaluation is strongly recommended.`
      : `Negative Screen (Score: ${partAScore}/6 in Part A). Current symptom reports do not reach the threshold indicative of likely Adult ADHD.`;

    return {
      total,
      subscores: { partAScreenerScore: partAScore },
      severity,
      interpretation
    };
  }
};

export const aimsScale: PsychiatricScaleData = {
  id: 'aims',
  name: 'Abnormal Involuntary Movement Scale (AIMS)',
  items: [
    {
      id: 1,
      label: '1. Muscles of Facial Expression (e.g., movements of forehead, eyebrows, periorbital area, cheeks; include frowning, blinking, smiling, grimacing)',
      options: [
        { value: 0, text: '0 - None (normal)' },
        { value: 1, text: '1 - Minimal (may be extreme normal)' },
        { value: 2, text: '2 - Mild' },
        { value: 3, text: '3 - Moderate' },
        { value: 4, text: '4 - Severe' }
      ]
    },
    {
      id: 2,
      label: '2. Lips and Perioral Area (e.g., puckering, pouting, smacking)',
      options: [
        { value: 0, text: '0 - None (normal)' },
        { value: 1, text: '1 - Minimal' },
        { value: 2, text: '2 - Mild' },
        { value: 3, text: '3 - Moderate' },
        { value: 4, text: '4 - Severe' }
      ]
    },
    {
      id: 3,
      label: '3. Jaw (e.g., biting, clenching, chewing, mouth opening, lateral movement)',
      options: [
        { value: 0, text: '0 - None (normal)' },
        { value: 1, text: '1 - Minimal' },
        { value: 2, text: '2 - Mild' },
        { value: 3, text: '3 - Moderate' },
        { value: 4, text: '4 - Severe' }
      ]
    },
    {
      id: 4,
      label: '4. Tongue (rate only increases in movement both in and out of mouth, NOT inability to sustain movement)',
      options: [
        { value: 0, text: '0 - None (normal)' },
        { value: 1, text: '1 - Minimal' },
        { value: 2, text: '2 - Mild' },
        { value: 3, text: '3 - Moderate' },
        { value: 4, text: '4 - Severe' }
      ]
    },
    {
      id: 5,
      label: '5. Upper Extremities (arms, wrists, hands, fingers: include choreic movements - rapid, objectively purposeless; athetoid - slow, irregular, complex, writhing; tremor)',
      options: [
        { value: 0, text: '0 - None (normal)' },
        { value: 1, text: '1 - Minimal' },
        { value: 2, text: '2 - Mild' },
        { value: 3, text: '3 - Moderate' },
        { value: 4, text: '4 - Severe' }
      ]
    },
    {
      id: 6,
      label: '6. Lower Extremities (legs, knees, ankles, toes: e.g., lateral knee movement, foot tapping, heel dropping, foot squirming, inversion/eversion of foot)',
      options: [
        { value: 0, text: '0 - None (normal)' },
        { value: 1, text: '1 - Minimal' },
        { value: 2, text: '2 - Mild' },
        { value: 3, text: '3 - Moderate' },
        { value: 4, text: '4 - Severe' }
      ]
    },
    {
      id: 7,
      label: '7. Trunk Movements (neck, shoulders, hips: e.g., rocking, twisting, squirming, pelvic gyrations)',
      options: [
        { value: 0, text: '0 - None (normal)' },
        { value: 1, text: '1 - Minimal' },
        { value: 2, text: '2 - Mild' },
        { value: 3, text: '3 - Moderate' },
        { value: 4, text: '4 - Severe' }
      ]
    },
    {
      id: 8,
      label: '8. Global Severity of abnormal movements (overall clinician rating)',
      options: [
        { value: 0, text: '0 - None (normal)' },
        { value: 1, text: '1 - Minimal' },
        { value: 2, text: '2 - Mild' },
        { value: 3, text: '3 - Moderate' },
        { value: 4, text: '4 - Severe' }
      ]
    },
    {
      id: 9,
      label: '9. Incapacitation due to abnormal movements (overall impairment rating)',
      options: [
        { value: 0, text: '0 - None (normal)' },
        { value: 1, text: '1 - Minimal' },
        { value: 2, text: '2 - Mild' },
        { value: 3, text: '3 - Moderate' },
        { value: 4, text: '4 - Severe' }
      ]
    },
    {
      id: 10,
      label: '10. Patient\'s awareness of abnormal movements (awareness rating)',
      options: [
        { value: 0, text: '0 - No awareness' },
        { value: 1, text: '1 - Aware, no distress' },
        { value: 2, text: '2 - Aware, mild distress' },
        { value: 3, text: '3 - Aware, moderate distress' },
        { value: 4, text: '4 - Aware, severe distress' }
      ]
    },
    {
      id: 11,
      label: '11. Current problems with teeth and/or dentures?',
      options: [
        { value: 0, text: 'No' },
        { value: 1, text: 'Yes' }
      ]
    },
    {
      id: 12,
      label: '12. Does patient usually wear dentures?',
      options: [
        { value: 0, text: 'No' },
        { value: 1, text: 'Yes' }
      ]
    }
  ],
  calculateScore: (answers) => {
    // Total score is sum of items 1-10
    let total = 0;
    for (let i = 1; i <= 10; i++) {
      total += answers[i] || 0;
    }

    // Tardive Dyskinesia criteria check:
    // A POSITIVE AIMS examination is defined as:
    // - A score of 2 (Mild) in TWO or more areas (items 1-7), OR
    // - A score of 3 (Moderate) or 4 (Severe) in ONE or more areas (items 1-7).
    let mildCount = 0;
    let moderateCount = 0;

    for (let i = 1; i <= 7; i++) {
      const val = answers[i] || 0;
      if (val === 2) {
        mildCount++;
      } else if (val >= 3) {
        moderateCount++;
      }
    }

    const meetsTD = (mildCount >= 2) || (moderateCount >= 1);
    const severity = meetsTD ? 'Meets TD Threshold' : 'Below TD Threshold';
    const interpretation = meetsTD
      ? `Positive Screening for Tardive Dyskinesia (TD). Patient meets criteria (scored mild [2] in ${mildCount} areas and moderate/severe [3+] in ${moderateCount} areas on items 1-7). Close monitoring or adjustment of neuroleptic/antipsychotic medications is recommended.`
      : `Negative Screening for Tardive Dyskinesia (TD). Movements do not meet the diagnostic severity criteria. (Scored mild [2] in ${mildCount} areas and moderate/severe [3+] in ${moderateCount} areas on items 1-7).`;

    return {
      total,
      severity,
      interpretation
    };
  }
};

export const auditScale: PsychiatricScaleData = {
  id: 'audit',
  name: 'Alcohol Use Disorders Identification Test (AUDIT)',
  items: [
    {
      id: 1,
      label: '1. How often do you have a drink containing alcohol?',
      options: [
        { value: 0, text: '0 - Never' },
        { value: 1, text: '1 - Monthly or less' },
        { value: 2, text: '2 - 2 to 4 times a month' },
        { value: 3, text: '3 - 2 to 3 times a week' },
        { value: 4, text: '4 - 4 or more times a week' }
      ]
    },
    {
      id: 2,
      label: '2. How many drinks containing alcohol do you have on a typical day when you are drinking?',
      options: [
        { value: 0, text: '0 - 1 or 2' },
        { value: 1, text: '1 - 3 or 4' },
        { value: 2, text: '2 - 5 or 6' },
        { value: 3, text: '3 - 7, 8, or 9' },
        { value: 4, text: '4 - 10 or more' }
      ]
    },
    {
      id: 3,
      label: '3. How often do you have six or more drinks on one occasion?',
      options: [
        { value: 0, text: '0 - Never' },
        { value: 1, text: '1 - Less than monthly' },
        { value: 2, text: '2 - Monthly' },
        { value: 3, text: '3 - Weekly' },
        { value: 4, text: '4 - Daily or almost daily' }
      ]
    },
    {
      id: 4,
      label: '4. How often during the last year have you found that you were not able to stop drinking once you had started?',
      options: [
        { value: 0, text: '0 - Never' },
        { value: 1, text: '1 - Less than monthly' },
        { value: 2, text: '2 - Monthly' },
        { value: 3, text: '3 - Weekly' },
        { value: 4, text: '4 - Daily or almost daily' }
      ]
    },
    {
      id: 5,
      label: '5. How often during the last year have you failed to do what was normally expected from you because of drinking?',
      options: [
        { value: 0, text: '0 - Never' },
        { value: 1, text: '1 - Less than monthly' },
        { value: 2, text: '2 - Monthly' },
        { value: 3, text: '3 - Weekly' },
        { value: 4, text: '4 - Daily or almost daily' }
      ]
    },
    {
      id: 6,
      label: '6. How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?',
      options: [
        { value: 0, text: '0 - Never' },
        { value: 1, text: '1 - Less than monthly' },
        { value: 2, text: '2 - Monthly' },
        { value: 3, text: '3 - Weekly' },
        { value: 4, text: '4 - Daily or almost daily' }
      ]
    },
    {
      id: 7,
      label: '7. How often during the last year have you had a feeling of guilt or remorse after drinking?',
      options: [
        { value: 0, text: '0 - Never' },
        { value: 1, text: '1 - Less than monthly' },
        { value: 2, text: '2 - Monthly' },
        { value: 3, text: '3 - Weekly' },
        { value: 4, text: '4 - Daily or almost daily' }
      ]
    },
    {
      id: 8,
      label: '8. How often during the last year have you been unable to remember what happened the night before because you had been drinking?',
      options: [
        { value: 0, text: '0 - Never' },
        { value: 1, text: '1 - Less than monthly' },
        { value: 2, text: '2 - Monthly' },
        { value: 3, text: '3 - Weekly' },
        { value: 4, text: '4 - Daily or almost daily' }
      ]
    },
    {
      id: 9,
      label: '9. Have you or someone else been injured as a result of your drinking?',
      options: [
        { value: 0, text: '0 - No' },
        { value: 2, text: '2 - Yes, but not in the last year' },
        { value: 4, text: '4 - Yes, during the last year' }
      ]
    },
    {
      id: 10,
      label: '10. Has a relative or friend or a doctor or another health worker been concerned about your drinking or suggested you cut down?',
      options: [
        { value: 0, text: '0 - No' },
        { value: 2, text: '2 - Yes, but not in the last year' },
        { value: 4, text: '4 - Yes, during the last year' }
      ]
    }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 10; i++) {
      total += answers[i] || 0;
    }

    let severity = 'Low Risk';
    let interpretation = '';

    if (total <= 7) {
      severity = 'Low Risk';
      interpretation = 'Indicates low risk consumption patterns. Alcohol education is recommended.';
    } else if (total <= 15) {
      severity = 'Hazardous Alcohol Use';
      interpretation = 'Indicates hazardous alcohol use. Simple advice or brief intervention to reduce drinking is recommended.';
    } else if (total <= 19) {
      severity = 'Harmful Alcohol Use';
      interpretation = 'Indicates harmful alcohol use. Brief counseling and continued clinical monitoring are recommended.';
    } else {
      severity = 'Severe / Possible Dependence';
      interpretation = 'Indicates severe alcohol problems and possible alcohol dependence. Referral to a specialist for diagnostic evaluation and treatment is highly recommended.';
    }

    return {
      total,
      severity,
      interpretation
    };
  }
};


// Extra clinical scales added based on Bafter & Blais handbook
export const phq9Scale: PsychiatricScaleData = {
  id: 'phq9',
  name: 'Patient Health Questionnaire-9 (PHQ-9)',
  items: [
    { id: 1, label: 'Little interest or pleasure in doing things', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] },
    { id: 2, label: 'Feeling down, depressed, or hopeless', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] },
    { id: 3, label: 'Trouble falling or staying asleep, or sleeping too much', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] },
    { id: 4, label: 'Feeling tired or having little energy', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] },
    { id: 5, label: 'Poor appetite or overeating', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] },
    { id: 6, label: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] },
    { id: 7, label: 'Trouble concentrating on things, such as reading the newspaper or watching television', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] },
    { id: 8, label: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] },
    { id: 9, label: 'Thoughts that you would be better off dead or of hurting yourself in some way', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 9; i++) total += answers[i] || 0;
    let severity = 'None-Minimal';
    if (total >= 5 && total <= 9) severity = 'Mild';
    else if (total >= 10 && total <= 14) severity = 'Moderate';
    else if (total >= 15 && total <= 19) severity = 'Moderately Severe';
    else if (total >= 20) severity = 'Severe';
    return {
      total,
      severity,
      interpretation: 'PHQ-9 score is ' + total + '. Depressive severity is classified as ' + severity + '.'
    };
  }
};

export const gad7Scale: PsychiatricScaleData = {
  id: 'gad7',
  name: 'Generalized Anxiety Disorder 7-item (GAD-7)',
  items: [
    { id: 1, label: 'Feeling nervous, anxious or on edge', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] },
    { id: 2, label: 'Not being able to stop or control worrying', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] },
    { id: 3, label: 'Worrying too much about different things', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] },
    { id: 4, label: 'Trouble relaxing', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] },
    { id: 5, label: 'Being so restless that it is hard to sit still', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] },
    { id: 6, label: 'Becoming easily annoyed or irritable', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] },
    { id: 7, label: 'Feeling afraid as if something awful might happen', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Several days' }, { value: 2, text: '2 - More than half the days' }, { value: 3, text: '3 - Nearly every day' }] }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 7; i++) total += answers[i] || 0;
    let severity = 'Minimal';
    if (total >= 5 && total <= 9) severity = 'Mild';
    else if (total >= 10 && total <= 14) severity = 'Moderate';
    else if (total >= 15) severity = 'Severe';
    return {
      total,
      severity,
      interpretation: 'GAD-7 score is ' + total + '. Anxiety severity is classified as ' + severity + '.'
    };
  }
};

export const baiScale: PsychiatricScaleData = {
  id: 'bai',
  name: 'Beck Anxiety Inventory (BAI)',
  items: [
    { id: 1, label: 'Numbness or tingling', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Mildly' }, { value: 2, text: '2 - Moderately' }, { value: 3, text: '3 - Severely' }] },
    { id: 2, label: 'Feeling hot', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Mildly' }, { value: 2, text: '2 - Moderately' }, { value: 3, text: '3 - Severely' }] },
    { id: 3, label: 'Wobbliness in legs', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Mildly' }, { value: 2, text: '2 - Moderately' }, { value: 3, text: '3 - Severely' }] },
    { id: 4, label: 'Unable to relax', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Mildly' }, { value: 2, text: '2 - Moderately' }, { value: 3, text: '3 - Severely' }] },
    { id: 5, label: 'Fear of worst happening', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Mildly' }, { value: 2, text: '2 - Moderately' }, { value: 3, text: '3 - Severely' }] },
    { id: 6, label: 'Dizzy or lightheaded', options: [{ value: 0, text: '0 - Not at all' }, { value: 1, text: '1 - Mildly' }, { value: 2, text: '2 - Moderately' }, { value: 3, text: '3 - Severely' }] }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 6; i++) total += answers[i] || 0;
    let severity = 'Minimal';
    if (total >= 8 && total <= 15) severity = 'Mild';
    else if (total >= 16 && total <= 25) severity = 'Moderate';
    else if (total >= 26) severity = 'Severe';
    return {
      total,
      severity,
      interpretation: 'Beck Anxiety Inventory visual workspace preview. Raw score: ' + total + '.'
    };
  }
};

export const aq10Scale: PsychiatricScaleData = {
  id: 'aq10',
  name: 'Autism Spectrum Quotient-10 (AQ-10)',
  items: [
    { id: 1, label: 'I often notice small sounds when others do not.', options: [{ value: 1, text: 'Agree' }, { value: 0, text: 'Disagree' }] },
    { id: 2, label: 'I usually focus more on the whole picture, rather than the small details.', options: [{ value: 0, text: 'Agree' }, { value: 1, text: 'Disagree' }] },
    { id: 3, label: 'I find it easy to do more than one thing at once.', options: [{ value: 0, text: 'Agree' }, { value: 1, text: 'Disagree' }] },
    { id: 4, label: 'If there is an interruption, I can return to what I was doing very quickly.', options: [{ value: 0, text: 'Agree' }, { value: 1, text: 'Disagree' }] },
    { id: 5, label: 'I find it easy to "read between the lines" when someone is talking to me.', options: [{ value: 0, text: 'Agree' }, { value: 1, text: 'Disagree' }] }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 5; i++) total += answers[i] || 0;
    const severity = total >= 3 ? 'Referral Indicated' : 'No Referral Needed';
    return {
      total,
      severity,
      interpretation: 'AQ-10 Autism Screener score is ' + total + '. Referral threshold is 6+ on full scale (3+ on this subset).'
    };
  }
};

export const mdqScale: PsychiatricScaleData = {
  id: 'mdq',
  name: 'Mood Disorder Questionnaire (MDQ)',
  items: [
    { id: 1, label: 'Has there ever been a period of time when you were not your usual self and you felt so good or so hyper that other people thought you were not your usual self?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 2, label: 'Has there ever been a period of time when you were so irritable that you shouted at people or started fights or arguments?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 3, label: 'Has there ever been a period of time when you felt much more self-confident than usual?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 4, label: "Has there ever been a period of time when you got much less sleep than usual and found you didn't really miss it?", options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 5, label: 'Has there ever been a period of time when you were much more talkative or spoke much faster than usual?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 5; i++) total += answers[i] || 0;
    const severity = total >= 3 ? 'Positive Screen' : 'Negative Screen';
    return {
      total,
      severity,
      interpretation: 'MDQ Bipolar spectrum screen score is ' + total + '.'
    };
  }
};

export const des2Scale: PsychiatricScaleData = {
  id: 'des2',
  name: 'Dissociative Experiences Scale (DES-II)',
  items: [
    { id: 1, label: "Some people have the experience of driving or riding in a car or bus and suddenly realizing that they don't remember what has happened during all or part of the trip.", options: [{ value: 0, text: '0% of the time' }, { value: 1, text: '10%' }, { value: 2, text: '20%' }, { value: 5, text: '50%' }, { value: 10, text: '100%' }] },
    { id: 2, label: 'Some people find that sometimes they are listening to someone talk and they suddenly realize that they did not hear part or all of what was said.', options: [{ value: 0, text: '0% of the time' }, { value: 1, text: '10%' }, { value: 2, text: '20%' }, { value: 5, text: '50%' }, { value: 10, text: '100%' }] },
    { id: 3, label: 'Some people have the experience of finding themselves in a place and having no idea how they got there.', options: [{ value: 0, text: '0% of the time' }, { value: 1, text: '10%' }, { value: 2, text: '20%' }, { value: 5, text: '50%' }, { value: 10, text: '100%' }] }
  ],
  calculateScore: (answers) => {
    let sum = 0;
    let count = 3;
    for (let i = 1; i <= 3; i++) sum += (answers[i] || 0) * 10;
    const total = Math.round(sum / count);
    const severity = total >= 30 ? 'High Dissociation' : 'Normal';
    return {
      total,
      severity,
      interpretation: 'DES-II mean score is ' + total + '. Scores >= 30 indicate high levels of dissociation.'
    };
  }
};

export const phq15Scale: PsychiatricScaleData = {
  id: 'phq15',
  name: 'Patient Health Questionnaire-15 (PHQ-15)',
  items: [
    { id: 1, label: 'Stomach pain', options: [{ value: 0, text: '0 - Not bothered at all' }, { value: 1, text: '1 - Bothered a little' }, { value: 2, text: '2 - Bothered a lot' }] },
    { id: 2, label: 'Back pain', options: [{ value: 0, text: '0 - Not bothered at all' }, { value: 1, text: '1 - Bothered a little' }, { value: 2, text: '2 - Bothered a lot' }] },
    { id: 3, label: 'Pain in your arms, legs, or joints', options: [{ value: 0, text: '0 - Not bothered at all' }, { value: 1, text: '1 - Bothered a little' }, { value: 2, text: '2 - Bothered a lot' }] },
    { id: 4, label: 'Menstrual cramps or other problems with your periods (Women only)', options: [{ value: 0, text: '0 - Not bothered at all' }, { value: 1, text: '1 - Bothered a little' }, { value: 2, text: '2 - Bothered a lot' }] },
    { id: 5, label: 'Headaches', options: [{ value: 0, text: '0 - Not bothered at all' }, { value: 1, text: '1 - Bothered a little' }, { value: 2, text: '2 - Bothered a lot' }] }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 5; i++) total += answers[i] || 0;
    let severity = 'Minimal';
    if (total >= 3 && total <= 5) severity = 'Low';
    else if (total >= 6 && total <= 8) severity = 'Medium';
    else if (total >= 9) severity = 'High';
    return {
      total,
      severity,
      interpretation: 'Somatic symptom severity PHQ-15 index is ' + total + ' (classified as ' + severity + ').'
    };
  }
};

export const eat26Scale: PsychiatricScaleData = {
  id: 'eat26',
  name: 'Eating Attitudes Test (EAT-26)',
  items: [
    { id: 1, label: 'Am terrified about being overweight', options: [{ value: 3, text: 'Always' }, { value: 2, text: 'Usually' }, { value: 1, text: 'Oen' }, { value: 0, text: 'Sometimes/Rarely/Never' }] },
    { id: 2, label: 'Avoid eating when I am hungry', options: [{ value: 3, text: 'Always' }, { value: 2, text: 'Usually' }, { value: 1, text: 'Oen' }, { value: 0, text: 'Sometimes/Rarely/Never' }] },
    { id: 3, label: 'Find myself preoccupied with food', options: [{ value: 3, text: 'Always' }, { value: 2, text: 'Usually' }, { value: 1, text: 'Oen' }, { value: 0, text: 'Sometimes/Rarely/Never' }] },
    { id: 4, label: 'Have gone on eating binges where I feel that I may not be able to stop', options: [{ value: 3, text: 'Always' }, { value: 2, text: 'Usually' }, { value: 1, text: 'Oen' }, { value: 0, text: 'Sometimes/Rarely/Never' }] }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 4; i++) total += answers[i] || 0;
    const severity = total >= 3 ? 'High Risk' : 'Low Risk';
    return {
      total,
      severity,
      interpretation: 'EAT-26 eating disorder risk screen raw score: ' + total + '.'
    };
  }
};

export const scoffScale: PsychiatricScaleData = {
  id: 'scoff',
  name: 'SCOFF Eating Disorder Screener',
  items: [
    { id: 1, label: 'Do you make yourself Sick because you feel uncomfortably full?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 2, label: 'Do you worry you have lost Control over how much you eat?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 3, label: 'Have you recently lost more than One stone (14 pounds) in a 3-month period?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 4, label: 'Do you believe yourself to be Fat when others say you are too thin?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 5, label: 'Would you say that Food dominates your life?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 5; i++) total += answers[i] || 0;
    const severity = total >= 2 ? 'Positive Screen' : 'Negative Screen';
    return {
      total,
      severity,
      interpretation: 'SCOFF score is ' + total + '. Scores >= 2 indicate a positive screen for an eating disorder.'
    };
  }
};

export const cageScale: PsychiatricScaleData = {
  id: 'cage',
  name: 'CAGE Alcohol Screening Questionnaire',
  items: [
    { id: 1, label: 'Have you ever felt you should Cut down on your drinking?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 2, label: 'Have people Annoyed you by criticizing your drinking?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 3, label: 'Have you ever felt bad or Guilty about your drinking?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 4, label: 'Have you ever had a drink first thing in the morning (Eye-opener) to steady your nerves or get rid of a hangover?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 4; i++) total += answers[i] || 0;
    const severity = total >= 2 ? 'Positive Screen' : 'Negative Screen';
    return {
      total,
      severity,
      interpretation: 'CAGE alcohol screen score is ' + total + '. Scores >= 2 represent a clinically positive screen.'
    };
  }
};

export const dast10Scale: PsychiatricScaleData = {
  id: 'dast10',
  name: 'Drug Abuse Screening Test (DAST-10)',
  items: [
    { id: 1, label: 'Have you used drugs other than those required for medical reasons?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 2, label: 'Do you abuse more than one drug?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 3, label: 'Are you always able to stop using drugs when you want to?', options: [{ value: 0, text: 'Yes' }, { value: 1, text: 'No' }] },
    { id: 4, label: 'Have you had blackouts or flashbacks as a result of drug use?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 5, label: 'Do you ever feel bad or guilty about your drug abuse?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 5; i++) total += answers[i] || 0;
    let severity = 'None';
    if (total >= 1 && total <= 2) severity = 'Low';
    else if (total >= 3 && total <= 5) severity = 'Moderate';
    return {
      total,
      severity,
      interpretation: 'DAST-10 screen raw score: ' + total + '.'
    };
  }
};

export const gds30Scale: PsychiatricScaleData = {
  id: 'gds30',
  name: 'Geriatric Depression Scale (GDS-30)',
  items: [
    { id: 1, label: 'Are you basically satisfied with your life?', options: [{ value: 0, text: 'Yes' }, { value: 1, text: 'No' }] },
    { id: 2, label: 'Have you dropped many of your activities and interests?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 3, label: 'Do you feel that your life is empty?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 4, label: 'Do you often get bored?', options: [{ value: 1, text: 'Yes' }, { value: 0, text: 'No' }] },
    { id: 5, label: 'Are you in good spirits most of the time?', options: [{ value: 0, text: 'Yes' }, { value: 1, text: 'No' }] }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 5; i++) total += answers[i] || 0;
    const severity = total >= 3 ? 'Depressive symptoms likely' : 'Normal';
    return {
      total,
      severity,
      interpretation: 'Geriatric Depression Scale score: ' + total + '.'
    };
  }
};

export const essScale: PsychiatricScaleData = {
  id: 'ess',
  name: 'Epworth Sleepiness Scale (ESS)',
  items: [
    { id: 1, label: 'Sitting and reading', options: [{ value: 0, text: '0 - Would never doze' }, { value: 1, text: '1 - Slight chance of dozing' }, { value: 2, text: '2 - Moderate chance of dozing' }, { value: 3, text: '3 - High chance of dozing' }] },
    { id: 2, label: 'Watching TV', options: [{ value: 0, text: '0 - Would never doze' }, { value: 1, text: '1 - Slight chance of dozing' }, { value: 2, text: '2 - Moderate chance of dozing' }, { value: 3, text: '3 - High chance of dozing' }] },
    { id: 3, label: 'Sitting, inactive in a public place (e.g. a theater or a meeting)', options: [{ value: 0, text: '0 - Would never doze' }, { value: 1, text: '1 - Slight chance of dozing' }, { value: 2, text: '2 - Moderate chance of dozing' }, { value: 3, text: '3 - High chance of dozing' }] },
    { id: 4, label: 'As a passenger in a car for an hour without a break', options: [{ value: 0, text: '0 - Would never doze' }, { value: 1, text: '1 - Slight chance of dozing' }, { value: 2, text: '2 - Moderate chance of dozing' }, { value: 3, text: '3 - High chance of dozing' }] }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 4; i++) total += answers[i] || 0;
    let severity = 'Normal';
    if (total >= 7) severity = 'Sleepy';
    return {
      total,
      severity,
      interpretation: 'Epworth Sleepiness Scale score: ' + total + '.'
    };
  }
};

export const bis11Scale: PsychiatricScaleData = {
  id: 'bis11',
  name: 'Barratt Impulsiveness Scale (BIS-11)',
  items: [
    { id: 1, label: 'I plan tasks carefully.', options: [{ value: 1, text: 'Rarely/Never' }, { value: 2, text: 'Occasionally' }, { value: 3, text: 'Oen' }, { value: 4, text: 'Almost Always/Always' }] },
    { id: 2, label: 'I do things without thinking.', options: [{ value: 4, text: 'Rarely/Never' }, { value: 3, text: 'Occasionally' }, { value: 2, text: 'Oen' }, { value: 1, text: 'Almost Always/Always' }] },
    { id: 3, label: 'I make-up my mind quickly.', options: [{ value: 4, text: 'Rarely/Never' }, { value: 3, text: 'Occasionally' }, { value: 2, text: 'Oen' }, { value: 1, text: 'Almost Always/Always' }] }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 3; i++) total += answers[i] || 0;
    return {
      total,
      severity: 'Screening active',
      interpretation: 'Barratt Impulsiveness Scale score: ' + total + '.'
    };
  }
};

export const psyratsScale: PsychiatricScaleData = {
  id: 'psyrats',
  name: 'PSYRATS Auditory Hallucinations Scale',
  items: [
    {
      id: 1,
      label: 'Frequency of voices',
      options: [
        { value: 0, text: '0 - Voices not present or present less than once a week' },
        { value: 1, text: '1 - Voices occur at least once a week' },
        { value: 2, text: '2 - Voices occur at least once a day' },
        { value: 3, text: '3 - Voices occur at least once an hour' },
        { value: 4, text: '4 - Voices occur continuously or almost continuously' }
      ]
    },
    {
      id: 2,
      label: 'Duration of voices',
      options: [
        { value: 0, text: '0 - Voices not present' },
        { value: 1, text: '1 - Voices last for a few seconds, fleeting voices' },
        { value: 2, text: '2 - Voices last for several minutes' },
        { value: 3, text: '3 - Voices last for at least one hour' },
        { value: 4, text: '4 - Voices last for hours at a time' }
      ]
    },
    {
      id: 3,
      label: 'Location of voices',
      options: [
        { value: 0, text: '0 - No voices present' },
        { value: 1, text: '1 - Voices sound like they are inside head only' },
        { value: 2, text: '2 - Voices outside the head, but close to ears or head' },
        { value: 3, text: '3 - Voices sound like they are inside/close to ears and outside head away from ears' },
        { value: 4, text: '4 - Voices sound like they are from outside the head only' }
      ]
    },
    {
      id: 4,
      label: 'Loudness of voices',
      options: [
        { value: 0, text: '0 - Voices not present' },
        { value: 1, text: '1 - Quieter than own voice, whispers' },
        { value: 2, text: '2 - About same loudness as own voice' },
        { value: 3, text: '3 - Louder than own voice' },
        { value: 4, text: '4 - Extremely loud, shouting' }
      ]
    },
    {
      id: 5,
      label: 'Beliefs regarding origin of voices',
      options: [
        { value: 0, text: '0 - Voices not present' },
        { value: 1, text: '1 - Believes voices to be solely internally generated and related to self' },
        { value: 2, text: '2 - Holds < 50% conviction that voices originate from external causes' },
        { value: 3, text: '3 - Holds ≥ 50% conviction (but < 100%) that voices originate from external causes' },
        { value: 4, text: '4 - Believes voices are solely due to external causes (100% conviction)' }
      ]
    },
    {
      id: 6,
      label: 'Amount of negative content of voices',
      options: [
        { value: 0, text: '0 - No unpleasant content' },
        { value: 1, text: '1 - Occasional unpleasant content (<10%)' },
        { value: 2, text: '2 - Minority of voice content is unpleasant or negative (<50%)' },
        { value: 3, text: '3 - Majority of voice content is unpleasant or negative (≥ 50%)' },
        { value: 4, text: '4 - All of voice content is unpleasant or negative' }
      ]
    },
    {
      id: 7,
      label: 'Degree of negative content (personal significance)',
      options: [
        { value: 0, text: '0 - Not unpleasant or negative' },
        { value: 1, text: '1 - Some negative content, but not personal comments (e.g. swear words, general comments)' },
        { value: 2, text: '2 - Personal verbal abuse or comments on behavior (e.g. "shouldn\'t do that")' },
        { value: 3, text: '3 - Personal verbal abuse relating to self-concept (e.g. "you\'re lazy, ugly, mad")' },
        { value: 4, text: '4 - Personal threats (e.g. threats to harm the self or family)' }
      ]
    },
    {
      id: 8,
      label: 'Amount of distress caused by voices',
      options: [
        { value: 0, text: '0 - Voices not distressing at all' },
        { value: 1, text: '1 - Voices occasionally distressing, majority not distressing (<10%)' },
        { value: 2, text: '2 - Minority of voices distressing (<50%)' },
        { value: 3, text: '3 - Majority of voices distressing, minority not distressing (≥50%)' },
        { value: 4, text: '4 - Voices always distressing' }
      ]
    },
    {
      id: 9,
      label: 'Intensity of distress caused by voices',
      options: [
        { value: 0, text: '0 - Voices not distressing at all' },
        { value: 1, text: '1 - Voices are slightly distressing' },
        { value: 2, text: '2 - Voices are distressing to a moderate degree' },
        { value: 3, text: '3 - Voices are very distressing, although the subject could feel worse' },
        { value: 4, text: '4 - Voices are extremely distressing; the subject feels the worst they could possibly feel' }
      ]
    },
    {
      id: 10,
      label: 'Disruption to life caused by voices',
      options: [
        { value: 0, text: '0 - No disruption to life; able to maintain social and family relationships' },
        { value: 1, text: '1 - Voices cause minimal disruption (interferes with concentration but normal activities continue)' },
        { value: 2, text: '2 - Voices cause moderate disruption (some disturbance to daytime and social activities)' },
        { value: 3, text: '3 - Voices cause severe disruption to life (hospitalization is usually necessary)' },
        { value: 4, text: '4 - Voices cause complete disruption of daily life requiring hospitalization and self-care failure' }
      ]
    },
    {
      id: 11,
      label: 'Controllability (Degree of control over voices)',
      options: [
        { value: 0, text: '0 - Complete control; can bring them on or dismiss them at will' },
        { value: 1, text: '1 - A great deal of control; can usually dismiss them or bring them on' },
        { value: 2, text: '2 - Moderate control; can sometimes resist or influence the voices' },
        { value: 3, text: '3 - Little control; cannot bring them on and can only occasionally dismiss them' },
        { value: 4, text: '4 - No control; has no power to influence when the voices occur and cannot dismiss them at all' }
      ]
    }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 11; i++) {
      total += answers[i] || 0;
    }
    
    const physicalChars = (answers[1] || 0) + (answers[2] || 0) + (answers[4] || 0);
    const distressScore = (answers[8] || 0) + (answers[9] || 0);
    const negativeContent = (answers[6] || 0) + (answers[7] || 0);
    const cognitiveControl = (answers[3] || 0) + (answers[5] || 0) + (answers[11] || 0);
    
    let severity = 'Mild';
    if (total >= 30) severity = 'Severe';
    else if (total >= 15) severity = 'Moderate';
    else if (total === 0) severity = 'Absent';

    return {
      total,
      subscores: {
        'Physical Characteristics (Frequency/Duration/Loudness)': physicalChars,
        'Cognitive Control (Location/Beliefs/Control)': cognitiveControl,
        'Negative Content (Amount/Degree)': negativeContent,
        'Distress (Amount/Intensity)': distressScore,
        'Disruption to Life': answers[10] || 0
      },
      severity,
      interpretation: `PSYRATS Auditory Hallucinations Scale total score is ${total}/44. 
- Distress subscore: ${distressScore}/8 (higher scores indicate more intense and frequent emotional distress).
- Negative Content subscore: ${negativeContent}/8 (higher scores represent personal/threatening voices).
- Physical score: ${physicalChars}/12.
- Cognitive/Control score: ${cognitiveControl}/12.
- Life Disruption: ${answers[10]}/4.`
    };
  }
};

export const connersScale: PsychiatricScaleData = {
  id: 'conners',
  name: 'Conners Abbreviated Symptom Questionnaire (ASQ)',
  items: [
    {
      id: 1,
      label: 'Restless in the "squirmy" sense (cannot sit still).',
      options: [
        { value: 0, text: '0 - Not true at all (Never, Seldom)' },
        { value: 1, text: '1 - Just a little true (Occasionally)' },
        { value: 2, text: '2 - Pretty much true (Often, Quite a bit)' },
        { value: 3, text: '3 - Very much true (Very often, Very frequent)' }
      ]
    },
    {
      id: 2,
      label: 'Excitable, impulsive (acts without thinking).',
      options: [
        { value: 0, text: '0 - Not true at all (Never, Seldom)' },
        { value: 1, text: '1 - Just a little true (Occasionally)' },
        { value: 2, text: '2 - Pretty much true (Often, Quite a bit)' },
        { value: 3, text: '3 - Very much true (Very often, Very frequent)' }
      ]
    },
    {
      id: 3,
      label: 'Disturbs other children (interrupts play or conversations).',
      options: [
        { value: 0, text: '0 - Not true at all (Never, Seldom)' },
        { value: 1, text: '1 - Just a little true (Occasionally)' },
        { value: 2, text: '2 - Pretty much true (Often, Quite a bit)' },
        { value: 3, text: '3 - Very much true (Very often, Very frequent)' }
      ]
    },
    {
      id: 4,
      label: 'Fails to finish things started, short attention span.',
      options: [
        { value: 0, text: '0 - Not true at all (Never, Seldom)' },
        { value: 1, text: '1 - Just a little true (Occasionally)' },
        { value: 2, text: '2 - Pretty much true (Often, Quite a bit)' },
        { value: 3, text: '3 - Very much true (Very often, Very frequent)' }
      ]
    },
    {
      id: 5,
      label: 'Constantly fidgeting (hands, feet, or squirming in seat).',
      options: [
        { value: 0, text: '0 - Not true at all (Never, Seldom)' },
        { value: 1, text: '1 - Just a little true (Occasionally)' },
        { value: 2, text: '2 - Pretty much true (Often, Quite a bit)' },
        { value: 3, text: '3 - Very much true (Very often, Very frequent)' }
      ]
    },
    {
      id: 6,
      label: 'Inattentive, easily distracted.',
      options: [
        { value: 0, text: '0 - Not true at all (Never, Seldom)' },
        { value: 1, text: '1 - Just a little true (Occasionally)' },
        { value: 2, text: '2 - Pretty much true (Often, Quite a bit)' },
        { value: 3, text: '3 - Very much true (Very often, Very frequent)' }
      ]
    },
    {
      id: 7,
      label: 'Demands must be met immediately—easily frustrated.',
      options: [
        { value: 0, text: '0 - Not true at all (Never, Seldom)' },
        { value: 1, text: '1 - Just a little true (Occasionally)' },
        { value: 2, text: '2 - Pretty much true (Often, Quite a bit)' },
        { value: 3, text: '3 - Very much true (Very often, Very frequent)' }
      ]
    },
    {
      id: 8,
      label: 'Cries easily and often.',
      options: [
        { value: 0, text: '0 - Not true at all (Never, Seldom)' },
        { value: 1, text: '1 - Just a little true (Occasionally)' },
        { value: 2, text: '2 - Pretty much true (Often, Quite a bit)' },
        { value: 3, text: '3 - Very much true (Very often, Very frequent)' }
      ]
    },
    {
      id: 9,
      label: 'Mood changes quickly and drastically.',
      options: [
        { value: 0, text: '0 - Not true at all (Never, Seldom)' },
        { value: 1, text: '1 - Just a little true (Occasionally)' },
        { value: 2, text: '2 - Pretty much true (Often, Quite a bit)' },
        { value: 3, text: '3 - Very much true (Very often, Very frequent)' }
      ]
    },
    {
      id: 10,
      label: 'Temper outbursts, explosive and unpredictable behavior.',
      options: [
        { value: 0, text: '0 - Not true at all (Never, Seldom)' },
        { value: 1, text: '1 - Just a little true (Occasionally)' },
        { value: 2, text: '2 - Pretty much true (Often, Quite a bit)' },
        { value: 3, text: '3 - Very much true (Very often, Very frequent)' }
      ]
    }
  ],
  calculateScore: (answers) => {
    let total = 0;
    for (let i = 1; i <= 10; i++) {
      total += answers[i] || 0;
    }
    
    let severity = 'Normal / Subclinical';
    if (total >= 15) {
      severity = 'Clinically Significant (ADHD Risk)';
    } else if (total >= 10) {
      severity = 'Borderline';
    }

    return {
      total,
      severity,
      interpretation: `Conners Abbreviated Symptom Questionnaire (ASQ) parent total score is ${total}/30.
- Severity rating: ${severity}.
- Clinical Note: A score of 15 or higher is the traditional clinical cut-off for hyperactive/inattentive traits. A positive screen warrants further multi-informant assessment (school ratings, clinical interviews).`
    };
  }
};

