export interface WechslerSubtest {
  id: string;
  name: string;
  index: 'VCI' | 'VSI' | 'FRI' | 'WMI' | 'PSI';
  rawScore: number;
  scaledScore: number;
}

export interface WechslerIndexData {
  id: 'VCI' | 'VSI' | 'FRI' | 'WMI' | 'PSI';
  name: string;
  subtests: string[];
  score: number;
  percentile: number;
  classification: string;
}

export function getIQClassification(iq: number): string {
  if (iq >= 130) return 'Very Superior (Extremely High)';
  if (iq >= 120) return 'Superior (High)';
  if (iq >= 110) return 'High Average (Above Average)';
  if (iq >= 90) return 'Average';
  if (iq >= 80) return 'Low Average (Below Average)';
  if (iq >= 70) return 'Borderline';
  return 'Extremely Low (Intellectually Deficient)';
}

export function getPercentile(standardScore: number): number {
  // Simple approximation of cumulative normal distribution
  // Mean = 100, SD = 15
  const z = (standardScore - 100) / 15;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (z > 0) p = 1 - p;
  return Math.round(p * 1000) / 10;
}

export const waisSubtestsDefault: WechslerSubtest[] = [
  // VCI
  { id: 'SI', name: 'Similarities', index: 'VCI', rawScore: 0, scaledScore: 10 },
  { id: 'VC', name: 'Vocabulary', index: 'VCI', rawScore: 0, scaledScore: 10 },
  { id: 'IN', name: 'Information', index: 'VCI', rawScore: 0, scaledScore: 10 },
  // VSI
  { id: 'BD', name: 'Block Design', index: 'VSI', rawScore: 0, scaledScore: 10 },
  { id: 'VP', name: 'Visual Puzzles', index: 'VSI', rawScore: 0, scaledScore: 10 },
  // FRI
  { id: 'MR', name: 'Matrix Reasoning', index: 'FRI', rawScore: 0, scaledScore: 10 },
  { id: 'FW', name: 'Figure Weights', index: 'FRI', rawScore: 0, scaledScore: 10 },
  // WMI
  { id: 'DS', name: 'Digit Span', index: 'WMI', rawScore: 0, scaledScore: 10 },
  { id: 'AR', name: 'Arithmetic', index: 'WMI', rawScore: 0, scaledScore: 10 },
  // PSI
  { id: 'CD', name: 'Coding', index: 'PSI', rawScore: 0, scaledScore: 10 },
  { id: 'SS', name: 'Symbol Search', index: 'PSI', rawScore: 0, scaledScore: 10 }
];

export function calculateWechslerScores(subtests: WechslerSubtest[]) {
  // Sum scaled scores for each index
  const indexSums = {
    VCI: 0,
    VSI: 0,
    FRI: 0,
    WMI: 0,
    PSI: 0
  };
  const counts = { VCI: 0, VSI: 0, FRI: 0, WMI: 0, PSI: 0 };

  subtests.forEach(sub => {
    indexSums[sub.index] += sub.scaledScore;
    counts[sub.index]++;
  });

  // Calculate composite Index scores (Mean = 100, SD = 15)
  // Standardized scaling maps sum of scaled scores to Index.
  // Generally: Index = (Sum - (10 * numSubtests)) * (15 / (3 * sqrt(numSubtests * (1 + correlation)))) + 100
  // With 2 subtests: expected sum = 20, SD sum ~ 4.2. Index = (Sum - 20) * 3.5 + 100
  // With 3 subtests: expected sum = 30, SD sum ~ 6.0. Index = (Sum - 30) * 2.5 + 100
  
  const calculateIndexScore = (sum: number, count: number): number => {
    if (count === 0) return 100;
    const expectedMean = count * 10;
    // SD of standard score sum is approx 3 * sqrt(count) * 0.8 (due to subtest correlations)
    const sd = 3 * Math.sqrt(count) * 0.85;
    const standardScore = Math.round(((sum - expectedMean) / sd) * 15 + 100);
    return Math.max(50, Math.min(150, standardScore));
  };

  const vciScore = calculateIndexScore(indexSums.VCI, counts.VCI);
  const vsiScore = calculateIndexScore(indexSums.VSI, counts.VSI);
  const friScore = calculateIndexScore(indexSums.FRI, counts.FRI);
  const wmiScore = calculateIndexScore(indexSums.WMI, counts.WMI);
  const psiScore = calculateIndexScore(indexSums.PSI, counts.PSI);

  // FSIQ sum (standard core 10 subtests, e.g. first 2 of VCI, VSI, FRI, WMI, PSI)
  // Let's take all subtests
  const totalSum = subtests.reduce((acc, sub) => acc + sub.scaledScore, 0);
  const totalCount = subtests.length;
  const fsiqScore = calculateIndexScore(totalSum, totalCount * 0.95); // correlation factor adjustments

  const indices: WechslerIndexData[] = [
    {
      id: 'VCI',
      name: 'Verbal Comprehension (VCI)',
      subtests: subtests.filter(s => s.index === 'VCI').map(s => s.name),
      score: vciScore,
      percentile: getPercentile(vciScore),
      classification: getIQClassification(vciScore)
    },
    {
      id: 'VSI',
      name: 'Visual Spatial (VSI)',
      subtests: subtests.filter(s => s.index === 'VSI').map(s => s.name),
      score: vsiScore,
      percentile: getPercentile(vsiScore),
      classification: getIQClassification(vsiScore)
    },
    {
      id: 'FRI',
      name: 'Fluid Reasoning (FRI)',
      subtests: subtests.filter(s => s.index === 'FRI').map(s => s.name),
      score: friScore,
      percentile: getPercentile(friScore),
      classification: getIQClassification(friScore)
    },
    {
      id: 'WMI',
      name: 'Working Memory (WMI)',
      subtests: subtests.filter(s => s.index === 'WMI').map(s => s.name),
      score: wmiScore,
      percentile: getPercentile(wmiScore),
      classification: getIQClassification(wmiScore)
    },
    {
      id: 'PSI',
      name: 'Processing Speed (PSI)',
      subtests: subtests.filter(s => s.index === 'PSI').map(s => s.name),
      score: psiScore,
      percentile: getPercentile(psiScore),
      classification: getIQClassification(psiScore)
    }
  ];

  // Discrepancy analysis
  const discrepancies: string[] = [];
  const cognitiveProficiency = Math.round((wmiScore + psiScore) / 2);
  const generalAbility = Math.round((vciScore + vsiScore + friScore) / 3);
  
  if (Math.abs(vciScore - vsiScore) >= 15) {
    discrepancies.push(`Significant Verbal-Performance difference (${Math.abs(vciScore - vsiScore)} points). May indicate verbal/non-verbal learning differences or specific neurocognitive patterns.`);
  }
  if (Math.abs(generalAbility - cognitiveProficiency) >= 15) {
    discrepancies.push(`Significant GAI-CPI discrepancy (${Math.abs(generalAbility - cognitiveProficiency)} points). General ability differs notably from cognitive processing efficiency.`);
  }

  return {
    indices,
    fsiq: fsiqScore,
    fsiqPercentile: getPercentile(fsiqScore),
    fsiqClassification: getIQClassification(fsiqScore),
    discrepancies,
    gai: generalAbility,
    cpi: cognitiveProficiency
  };
}

// MISIC Adaptation
export interface MisicSubtest {
  name: string;
  type: 'Verbal' | 'Performance';
  tq: number; // Test Quotient (Mean = 100, SD = 15)
}

export const misicSubtestsDefault: MisicSubtest[] = [
  // Verbal Scale (6 subtests, 5 core + 1 supplementary)
  { name: 'Information', type: 'Verbal', tq: 100 },
  { name: 'General Comprehension', type: 'Verbal', tq: 100 },
  { name: 'Arithmetic', type: 'Verbal', tq: 100 },
  { name: 'Analogies & Similarities', type: 'Verbal', tq: 100 },
  { name: 'Vocabulary', type: 'Verbal', tq: 100 },
  { name: 'Digit Span (Supplementary)', type: 'Verbal', tq: 100 },
  // Performance Scale (5 subtests)
  { name: 'Picture Completion', type: 'Performance', tq: 100 },
  { name: 'Block Design', type: 'Performance', tq: 100 },
  { name: 'Object Assembly', type: 'Performance', tq: 100 },
  { name: 'Coding', type: 'Performance', tq: 100 },
  { name: 'Mazes', type: 'Performance', tq: 100 }
];

export function calculateMisicScores(subtests: MisicSubtest[]) {
  // Verbal core is the first 5 subtests (excludes Digit Span unless it's substituted)
  const verbalCore = subtests.filter(s => s.type === 'Verbal' && s.name !== 'Digit Span (Supplementary)');
  const perfCore = subtests.filter(s => s.type === 'Performance');

  const verbalSum = verbalCore.reduce((a, b) => a + b.tq, 0);
  const perfSum = perfCore.reduce((a, b) => a + b.tq, 0);

  // In MISIC, Verbal IQ (VIQ) and Performance IQ (PIQ) are calculated by averaging the TQs of the 5 subtests
  const viq = Math.round(verbalSum / 5);
  const piq = Math.round(perfSum / 5);
  
  // Full Scale IQ is the average of the 10 core subtests
  const fsiq = Math.round((verbalSum + perfSum) / 10);

  const discrepancies: string[] = [];
  if (Math.abs(viq - piq) >= 15) {
    discrepancies.push(`Significant Verbal IQ - Performance IQ difference (${Math.abs(viq - piq)} points). In Indian contexts, a gap of 15+ is clinically significant and suggests localized cognitive strengths or deficits (e.g. language barrier, visuo-spatial dysfunction).`);
  }

  return {
    verbalSum,
    performanceSum: perfSum,
    totalSum: verbalSum + perfSum,
    viq,
    piq,
    fsiq,
    viqClassification: getIQClassification(viq),
    piqClassification: getIQClassification(piq),
    fsiqClassification: getIQClassification(fsiq),
    viqPercentile: getPercentile(viq),
    piqPercentile: getPercentile(piq),
    fsiqPercentile: getPercentile(fsiq),
    discrepancies
  };
}
