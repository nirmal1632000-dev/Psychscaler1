export interface MmpiScale {
  id: string;
  name: string;
  number?: string;
  rawScore: number;
  tScore: number;
  description: string;
}

export interface McmiScale {
  id: string;
  name: string;
  category: 'modifying' | 'personality' | 'severe-personality' | 'syndromes' | 'severe-syndromes';
  baseRate: number;
  description: string;
}

export interface DapIndicator {
  id: string;
  category: string;
  label: string;
  psychInterpretation: string;
}

export const mmpiScalesDefault: MmpiScale[] = [
  // Validity
  { id: 'L', name: 'Lie (L)', rawScore: 4, tScore: 50, description: 'Measures deliberate attempts to present oneself in an unrealistic, overly positive moral light.' },
  { id: 'F', name: 'Infrequency (F)', rawScore: 3, tScore: 50, description: 'Measures atypical or deviant ways of responding, reflecting severe distress, confusion, or fake-bad tendencies.' },
  { id: 'K', name: 'Correction (K)', rawScore: 12, tScore: 50, description: 'Measures defensiveness or clinical guardness; used as a correction factor for several clinical scales.' },
  // Clinical
  { id: 'Hs', name: 'Hypochondriasis (Hs)', number: 'Scale 1', rawScore: 14, tScore: 50, description: 'Preoccupation with bodily functions, somatic complaints, and fears of illness.' },
  { id: 'D', name: 'Depression (D)', number: 'Scale 2', rawScore: 22, tScore: 50, description: 'Symptomatic depression, dysphoria, hopelessness, and general dissatisfaction.' },
  { id: 'Hy', name: 'Hysteria (Hy)', number: 'Scale 3', rawScore: 20, tScore: 50, description: 'Somatic symptoms as reactions to stress, denial of psychiatric problems, and social facility.' },
  { id: 'Pd', name: 'Psychopathic Deviate (Pd)', number: 'Scale 4', rawScore: 18, tScore: 50, description: 'Social alienation, rebellion against authority, impulsivity, and family conflict.' },
  { id: 'Mf', name: 'Masculinity/Femininity (Mf)', number: 'Scale 5', rawScore: 28, tScore: 50, description: 'Interest patterns, aesthetic preferences, and adherence to traditional gender roles.' },
  { id: 'Pa', name: 'Paranoia (Pa)', number: 'Scale 6', rawScore: 10, tScore: 50, description: 'Interpersonal sensitivity, suspiciousness, feelings of persecution, and rigid thinking.' },
  { id: 'Pt', name: 'Psychasthenia (Pt)', number: 'Scale 7', rawScore: 24, tScore: 50, description: 'Anxiety, obsession, compulsion, self-doubt, and excessive worry.' },
  { id: 'Sc', name: 'Schizophrenia (Sc)', number: 'Scale 8', rawScore: 26, tScore: 50, description: 'Bizarre sensory experiences, alienation, poor social adjustment, and disorganization.' },
  { id: 'Ma', name: 'Hypomania (Ma)', number: 'Scale 9', rawScore: 16, tScore: 50, description: 'Elevated energy, irritability, flight of ideas, grandiosity, and impulsivity.' },
  { id: 'Si', name: 'Social Introversion (Si)', number: 'Scale 10', rawScore: 25, tScore: 50, description: 'Social withdrawal, shyness, preference for solitary activities, and lack of social assertiveness.' }
];

export function calculateMmpiTScores(scales: MmpiScale[], gender: string): MmpiScale[] {
  // Approximate standard MMPI-2 linear T-scores based on gender-specific norms.
  // Note: True MMPI-2 uses K-corrections for Scales 1, 4, 7, 8, 9.
  // Let's implement an elegant linear approximation model for validity and clinical scales.
  const isFemale = gender === 'Female';

  return scales.map(scale => {
    let tScore = 50;
    const raw = scale.rawScore;

    switch (scale.id) {
      case 'L': tScore = isFemale ? Math.round((raw - 4.5) / 2.1 * 10 + 50) : Math.round((raw - 4.2) / 2.0 * 10 + 50); break;
      case 'F': tScore = isFemale ? Math.round((raw - 5.0) / 4.2 * 10 + 50) : Math.round((raw - 5.8) / 4.8 * 10 + 50); break;
      case 'K': tScore = isFemale ? Math.round((raw - 13.5) / 4.5 * 10 + 50) : Math.round((raw - 14.8) / 4.9 * 10 + 50); break;
      // Hs (corrected scale approximation)
      case 'Hs': tScore = isFemale ? Math.round((raw - 11.2) / 5.2 * 10 + 50) : Math.round((raw - 12.5) / 5.5 * 10 + 50); break;
      case 'D': tScore = isFemale ? Math.round((raw - 21.0) / 5.8 * 10 + 50) : Math.round((raw - 19.5) / 5.4 * 10 + 50); break;
      case 'Hy': tScore = isFemale ? Math.round((raw - 20.8) / 5.5 * 10 + 50) : Math.round((raw - 19.8) / 5.2 * 10 + 50); break;
      case 'Pd': tScore = isFemale ? Math.round((raw - 16.5) / 4.8 * 10 + 50) : Math.round((raw - 17.2) / 4.9 * 10 + 50); break;
      case 'Mf':
        // Mf is opposite for male/female in classical T-scoring direction
        if (isFemale) {
          tScore = Math.round((42 - raw) / 5.5 * 10 + 50);
        } else {
          tScore = Math.round((raw - 26) / 5.8 * 10 + 50);
        }
        break;
      case 'Pa': tScore = isFemale ? Math.round((raw - 10.2) / 3.4 * 10 + 50) : Math.round((raw - 9.8) / 3.2 * 10 + 50); break;
      case 'Pt': tScore = isFemale ? Math.round((raw - 22.1) / 6.2 * 10 + 50) : Math.round((raw - 23.5) / 6.5 * 10 + 50); break;
      case 'Sc': tScore = isFemale ? Math.round((raw - 24.5) / 7.2 * 10 + 50) : Math.round((raw - 25.8) / 7.5 * 10 + 50); break;
      case 'Ma': tScore = isFemale ? Math.round((raw - 15.5) / 4.4 * 10 + 50) : Math.round((raw - 16.8) / 4.6 * 10 + 50); break;
      case 'Si': tScore = isFemale ? Math.round((raw - 24.8) / 6.5 * 10 + 50) : Math.round((raw - 23.2) / 6.2 * 10 + 50); break;
    }

    // bound T-scores reasonably
    tScore = Math.max(30, Math.min(120, tScore));

    return { ...scale, tScore };
  });
}

export const mcmiScalesDefault: McmiScale[] = [
  // Modifying Indices
  { id: 'X', name: 'Disclosure (X)', category: 'modifying', baseRate: 60, description: 'Measures patient willingness to be open and frank about clinical symptoms and behaviors.' },
  { id: 'Y', name: 'Desirability (Y)', category: 'modifying', baseRate: 45, description: 'Measures the degree to which the patient attempts to present themselves in a favorable or highly moral light.' },
  { id: 'Z', name: 'Debasement (Z)', category: 'modifying', baseRate: 50, description: 'Measures patient tendencies to exaggerate severity of symptoms or emotional difficulties.' },
  // Clinical Personality Patterns
  { id: '1', name: 'Schizoid (1)', category: 'personality', baseRate: 40, description: 'Socially detached, emotionally restricted, passive, indifferent to relationships.' },
  { id: '2A', name: 'Avoidant (2A)', category: 'personality', baseRate: 50, description: 'Hypersensitive to rejection, actively withdraws socially despite desiring relationships.' },
  { id: '2B', name: 'Depressive (2B)', category: 'personality', baseRate: 55, description: 'Pessimistic, gloomy, self-critical, feels chronically inadequate.' },
  { id: '3', name: 'Dependent (3)', category: 'personality', baseRate: 50, description: 'Submissive, self-sacrificing, requires excessive reassurance, fears abandonment.' },
  { id: '4', name: 'Histrionic (4)', category: 'personality', baseRate: 60, description: 'Attention-seeking, dramatic, emotionally labile, seductively manipulative.' },
  { id: '5', name: 'Narcissistic (5)', category: 'personality', baseRate: 65, description: 'Egotistical, grandiose, self-assured, lacks empathy, feels entitled.' },
  { id: '6A', name: 'Antisocial (6A)', category: 'personality', baseRate: 45, description: 'Deceitful, impulsive, aggressive, violates social norms, lacks remorse.' },
  { id: '6B', name: 'Sadistic (6B)', category: 'personality', baseRate: 35, description: 'Cruel, combative, domineering, derives pleasure from controlling or hurting others.' },
  { id: '7', name: 'Compulsive (7)', category: 'personality', baseRate: 60, description: 'Conforming, rigid, organized, perfectionistic, emotionally controlled.' },
  { id: '8A', name: 'Negativistic (8A)', category: 'personality', baseRate: 45, description: 'Passive-aggressive, irritable, complains, holds deep resentments.' },
  { id: '8B', name: 'Masochistic (8B)', category: 'personality', baseRate: 40, description: 'Self-defeating, acts as a martyr, invites exploitation, self-sabotaging.' },
  // Severe Personality Pathology
  { id: 'S', name: 'Schizotypal (S)', category: 'severe-personality', baseRate: 30, description: 'Cognitive slips, eccentric behavior, socially isolated, suspicious.' },
  { id: 'C', name: 'Borderline (C)', category: 'severe-personality', baseRate: 35, description: 'Unstable self-image, intense/turbulent relationships, chronic emptiness, self-harm.' },
  { id: 'P', name: 'Paranoid (P)', category: 'severe-personality', baseRate: 25, description: 'Hyper-vigilant, deeply suspicious, defensive, projecting hostility onto others.' },
  // Clinical Syndromes
  { id: 'A', name: 'Anxiety (A)', category: 'syndromes', baseRate: 50, description: 'Vague apprehension, muscle tension, autonomic hyperarousal.' },
  { id: 'H', name: 'Somatoform (H)', category: 'syndromes', baseRate: 40, description: 'Stress channeled into physical complaints, hypochondriacal preoccupations.' },
  { id: 'N', name: 'Bipolar: Manic (N)', category: 'syndromes', baseRate: 30, description: 'Hypomanic symptoms, flight of ideas, inflated self-esteem.' },
  { id: 'D', name: 'Dysthymia (D)', category: 'syndromes', baseRate: 55, description: 'Chronically low mood, fatigue, feelings of inadequacy, sleeping difficulties.' },
  { id: 'B', name: 'Alcohol Dependence (B)', category: 'syndromes', baseRate: 40, description: 'History of alcohol abuse, functional impairment due to drinking.' },
  { id: 'T', name: 'Drug Dependence (T)', category: 'syndromes', baseRate: 30, description: 'History of drug abuse, distress/impairment from substance consumption.' },
  { id: 'R', name: 'PTSD (R)', category: 'syndromes', baseRate: 35, description: 'Intrusive memories, avoidance, hyper-arousal, trauma-related dysphoria.' },
  // Severe Clinical Syndromes
  { id: 'SS', name: 'Thought Disorder (SS)', category: 'severe-syndromes', baseRate: 20, description: 'Incoherence, delusions, hallunications, regressive behaviors.' },
  { id: 'CC', name: 'Major Depression (CC)', category: 'severe-syndromes', baseRate: 25, description: 'Profound vegetative depressive symptoms, severe hopelessness, suicidal ideation.' },
  { id: 'PP', name: 'Delusional Disorder (PP)', category: 'severe-syndromes', baseRate: 15, description: 'Persistent non-bizarre delusions, persecutory or grandiose beliefs.' }
];

export const dapIndicators: DapIndicator[] = [
  // Size & Integration
  { id: 'size_huge', category: 'Size & Integration', label: 'Extremely Large Figure (> 8 inches)', psychInterpretation: 'May suggest grandiosity, hyperactivity, environmental hostility, or lack of inner controls.' },
  { id: 'size_tiny', category: 'Size & Integration', label: 'Extremely Small Figure (< 3 inches)', psychInterpretation: 'Associated with feelings of inadequacy, low self-esteem, anxiety, depression, or withdrawal.' },
  { id: 'asymmetry', category: 'Size & Integration', label: 'Severe Asymmetry of Limbs/Trunk', psychInterpretation: 'Can indicate motor instability, confusion in body image, or coordination concerns.' },
  { id: 'poor_integration', category: 'Size & Integration', label: 'Poor body part integration (floating parts)', psychInterpretation: 'Frequently seen in cases of emotional disorganization, developmental delays, or severe cognitive disruption.' },
  // Shading & Line Quality
  { id: 'shading_body', category: 'Shading & Line Quality', label: 'Heavy Shading of Body/Trunk', psychInterpretation: 'Strongly associated with somatic anxiety, concern about body integrity, or chest-related anxiety.' },
  { id: 'shading_limbs', category: 'Shading & Line Quality', label: 'Heavy Shading of Hands/Limbs', psychInterpretation: 'Suggests anxiety related to motor activity, aggression, or performance capabilities.' },
  { id: 'line_heavy', category: 'Shading & Line Quality', label: 'Thick, Heavy, Pressed Lines', psychInterpretation: 'Suggests high tension, aggression, organic brain damage, or hyper-vigilance.' },
  { id: 'line_faint', category: 'Shading & Line Quality', label: 'Faint, Broken, or Sketchy Lines', psychInterpretation: 'Suggests insecurity, hesitancy, low energy, depression, or fear of self-assertion.' },
  // Face & Head
  { id: 'head_large', category: 'Face & Head', label: 'Disproportionately Large Head', psychInterpretation: 'Reflects cognitive preoccupation, regression, somatic concerns (headaches), or intellectual striving.' },
  { id: 'head_small', category: 'Face & Head', label: 'Disproportionately Small Head', psychInterpretation: 'May represent obsessive-compulsive efforts to control intellectualizing, or feelings of intellectual weakness.' },
  { id: 'face_blank', category: 'Face & Head', label: 'Blank/Omitted Facial Features', psychInterpretation: 'Suggests evasion of interpersonal relations, superficial contact, or depersonalization.' },
  { id: 'eyes_bizarre', category: 'Face & Head', label: 'Staring, Piercing, or Empty Eyes', psychInterpretation: 'Can indicate paranoid tendencies, suspiciousness, or sensory hypersensitivity.' },
  // Limbs & Extremities
  { id: 'hands_omitted', category: 'Limbs & Extremities', label: 'Omission of Hands or Fingers', psychInterpretation: 'Suggests feelings of helplessness, guilt over manipulative behavior, or lack of environmental control.' },
  { id: 'arms_pressed', category: 'Limbs & Extremities', label: 'Arms Pressed Tight Against Body', psychInterpretation: 'Indicates rigid control, defensiveness, social withdrawal, or fear of reaching out.' },
  { id: 'feet_omitted', category: 'Limbs & Extremities', label: 'Omission of Feet/Legs', psychInterpretation: 'Suggests a lack of stability, insecurity, or a feeling of being ungrounded/dependent.' },
  // Miscellaneous
  { id: 'genitals_shown', category: 'Miscellaneous', label: 'Overt Genitals or Internal Organs Shown', psychInterpretation: 'In non-medical contexts, highly correlated with severe regression, psychiatric disturbance, or sexual trauma.' },
  { id: 'transparency', category: 'Miscellaneous', label: 'Transparency (organs/clothing shown through body)', psychInterpretation: 'Reflects concrete thinking, developmental delay, or somatic preoccupation.' }
];
