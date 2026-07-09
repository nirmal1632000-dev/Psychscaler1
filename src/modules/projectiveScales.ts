export interface RorschachResponse {
  id: number;
  card: string;
  responseNum: number;
  location: 'W' | 'D' | 'Dd';
  space: boolean;
  dq: '+' | 'o' | 'v/+' | 'v';
  determinants: string[]; // F, M, FM, m, FC, CF, C, Cn, FC', CF', C', FT, TF, T, FV, VF, V, FY, YF, Y, FD, Fr, rF, 2
  fq: '+' | 'o' | 'u' | '-' | 'none';
  content: string[]; // H, (H), Hd, (Hd), A, (A), Ad, (Ad), An, Art, Ay, Bl, Bt, Cg, Cl, Ex, Fi, Fd, Ge, Hh, Ls, Na, Sc, Sx, Xy
  popular: boolean;
  specialScores: string[]; // DV1, DV2, DR1, DR2, INC1, INC2, FAB1, FAB2, ALOG, CONTAG, CP, PSV, CONFAB, AB, AG, COP, MOR, PER, GHR, PHR
  patientWording?: string; // Describe patient wording / raw response
}

export interface RorschachSummary {
  totalResponses: number;
  locationCounts: { W: number; D: number; Dd: number; S: number };
  dqCounts: { '+': number; 'o': number; 'v/+': number; 'v': number };
  fqCounts: { '+': number; 'o': number; 'u': number; '-': number; none: number };
  popularCount: number;
  determinantCounts: Record<string, number>;
  ratios: {
    eb: string; // M : WsumC
    ea: number; // M + WsumC
    ebBase: string; // (FM+m) : (Achromatic+Shading)
    es: number; // (FM+m) + Achromatic + Shading
    lambda: number; // Pure F / (R - Pure F)
    afr: number; // Affect Ratio (VIII+IX+X) / (I..VII)
  };
}

export interface TatCard {
  id: string;
  label: string;
  description: string;
}

export const tatCards: TatCard[] = [
  { id: '1', label: 'Card 1', description: 'A young boy contemplating a violin which rests on a table in front of him.' },
  { id: '2', label: 'Card 2', description: 'Country scene: A young woman with books in her hand; in the background is a man working in the fields and an older woman looking on.' },
  { id: '3BM', label: 'Card 3BM', description: 'On the floor against a couch is the huddled form of a boy with his head bowed on his right arm. Beside him on the floor is an object resembling a gun.' },
  { id: '4', label: 'Card 4', description: 'A woman clutching the shoulders of a man whose face and body are turned away as if he were trying to pull away from her.' },
  { id: '5', label: 'Card 5', description: 'A middle-aged woman looking into a room from the threshold of a half-open door.' },
  { id: '6BM', label: 'Card 6BM', description: 'A short elderly woman stands with her back turned to a tall young man. He has his hat in his hand and is looking down with a perplexed expression.' },
  { id: '7BM', label: 'Card 7BM', description: 'A gray-haired man looks at a younger man who is staring sullenly into space.' },
  { id: '8BM', label: 'Card 8BM', description: 'An adolescent boy looks straight out of the picture. At one side is the barrel of a rifle, and in the background is the dim outline of a surgical operation.' },
  { id: '9GF', label: 'Card 9GF', description: 'A young woman standing behind a tree looks down at another young woman who is running along a beach below.' },
  { id: '10', label: 'Card 10', description: 'A young woman\'s head resting against a man\'s shoulder, both with closed eyes.' },
  { id: '13MF', label: 'Card 13MF', description: 'A young man standing with his head buried in his arm. In the background is the figure of a woman lying in bed.' }
];

export const catCards: TatCard[] = [
  { id: '1', label: 'Card 1', description: 'Chicks sitting around a table with a large bowl of food. A mother hen is dimly visible in the background.' },
  { id: '2', label: 'Card 2', description: 'One bear pulling a rope in one direction, while two other bears pull in the opposite direction (tug of war).' },
  { id: '3', label: 'Card 3', description: 'A lion with a pipe and cane, sitting in an armchair. In the corner, a small mouse is visible in its hole.' },
  { id: '4', label: 'Card 4', description: 'A mother kangaroo with a hat and a basket, carrying a baby kangaroo in her pouch; another baby kangaroo rides a bicycle.' },
  { id: '5', label: 'Card 5', description: 'Two baby bears sleeping in a small bed in a darkened room.' },
  { id: '6', label: 'Card 6', description: 'A cave with two large bears sleeping in the background and a baby bear lying near them.' },
  { id: '7', label: 'Card 7', description: 'A tiger leaping at a monkey who is trying to climb a tree.' },
  { id: '8', label: 'Card 8', description: 'Two adult monkeys sitting on a sofa drinking from cups, while an adult monkey talks to a baby monkey.' },
  { id: '9', label: 'Card 9', description: 'A rabbit sitting in a crib looking through an open door into a dark room.' },
  { id: '10', label: 'Card 10', description: 'A baby dog being held over a toilet or spanked by an adult dog in a bathroom.' }
];

export function calculateRorschachSummary(responses: RorschachResponse[]): RorschachSummary {
  const total = responses.length;

  const loc = { W: 0, D: 0, Dd: 0, S: 0 };
  const dq = { '+': 0, 'o': 0, 'v/+': 0, 'v': 0 };
  const fq = { '+': 0, 'o': 0, 'u': 0, '-': 0, none: 0 };
  let popular = 0;

  const detCounts: Record<string, number> = {};

  let pureF = 0;
  let mCount = 0; // Human Movement
  let fmCount = 0; // Animal Movement
  let inanimateM = 0; // Inanimate Movement (m)
  
  let fcVal = 0;
  let cfVal = 0;
  let cVal = 0;
  
  let achromaticVal = 0; // C'
  let shadingVal = 0; // T, V, Y

  let card8910Count = 0;
  let card1234567Count = 0;

  responses.forEach(r => {
    // Location
    loc[r.location]++;
    if (r.space) loc.S++;

    // DQ
    dq[r.dq]++;

    // FQ
    fq[r.fq]++;

    // Popular
    if (r.popular) popular++;

    // Affect ratio cards
    const cardNum = r.card;
    if (cardNum === 'VIII' || cardNum === 'IX' || cardNum === 'X') {
      card8910Count++;
    } else {
      card1234567Count++;
    }

    // Determinants
    const det = r.determinants;
    
    // Pure F check
    if (det.length === 1 && det[0] === 'F') {
      pureF++;
    }

    det.forEach(d => {
      detCounts[d] = (detCounts[d] || 0) + 1;

      if (d === 'M') mCount++;
      if (d === 'FM') fmCount++;
      if (d === 'm' || d === 'ma' || d === 'mp') inanimateM++;

      if (d === 'FC') fcVal++;
      if (d === 'CF') cfVal++;
      if (d === 'C') cVal++;

      if (d.includes('\'')) {
        achromaticVal++; // FC', CF', C'
      }
      if (d.startsWith('T') || d.startsWith('FT') || d.startsWith('V') || d.startsWith('FV') || d.startsWith('Y') || d.startsWith('FY')) {
        shadingVal++;
      }
    });
  });

  const wSumC = 0.5 * fcVal + 1.0 * cfVal + 1.5 * cVal;
  const ea = mCount + wSumC;
  const es = (fmCount + inanimateM) + achromaticVal + shadingVal;

  const ebStr = `${mCount} : ${wSumC.toFixed(1)}`;
  const ebBaseStr = `${fmCount + inanimateM} : ${achromaticVal + shadingVal}`;
  
  const lambda = total - pureF > 0 ? Math.round((pureF / (total - pureF)) * 100) / 100 : 0;
  const afr = card1234567Count > 0 ? Math.round((card8910Count / card1234567Count) * 100) / 100 : 0;

  return {
    totalResponses: total,
    locationCounts: loc,
    dqCounts: dq,
    fqCounts: fq,
    popularCount: popular,
    determinantCounts: detCounts,
    ratios: {
      eb: ebStr,
      ea: Math.round(ea * 10) / 10,
      ebBase: ebBaseStr,
      es: Math.round(es * 10) / 10,
      lambda,
      afr
    }
  };
}
