export interface ScaleLearningDetails {
  id: string;
  name: string;
  history: string;
  indications: string;
  administration: string;
  scoringGuide: string;
  ethicalConsiderations: string;
  scoringTutorial: string;
}

export const scaleLearningDb: Record<string, ScaleLearningDetails> = {
  bdi: {
    id: 'bdi',
    name: 'Beck Depression Inventory (BDI-II)',
    history: 'Created by Dr. Aaron T. Beck in 1961, and updated in 1996 (BDI-II) to align with DSM-IV criteria. It remains one of the most widely used psychometric instruments for measuring the severity of depressive symptoms globally, reflecting Beck\'s cognitive theory of depression.',
    indications: 'Used for individuals aged 13 to 80. Indicated for screening depressive symptoms, tracking treatment progress in therapy/psychiatry, and in clinical research contexts.',
    administration: 'A 21-item self-report inventory. The patient selects the statement for each item that best describes how they have been feeling over the past two weeks. Takes approximately 5-10 minutes. If the patient has reading difficulties, it can be read aloud by the administrator.',
    scoringGuide: 'Items are scored from 0 to 3. Total score ranges from 0 to 63.\n- 0–13: Minimal Depression\n- 14–19: Mild Depression\n- 20–28: Moderate Depression\n- 29–63: Severe Depression\nNote: Item 9 (Suicidal Thoughts) must be reviewed immediately by the clinician regardless of the total score.',
    ethicalConsiderations: 'Should not be used as a standalone diagnostic tool. Diagnosis of Major Depressive Disorder requires a clinical interview. Clinicians must immediately follow up on any score > 0 on Item 9 (Suicidality) with a formal safety assessment.',
    scoringTutorial: `### 1. Likert Summation Method
The BDI-II is a Likert-style self-report scale. It consists of 21 items, each containing four statements ranked in severity from 0 to 3. The clinician or scoring engine simply sums the numerical values chosen for all 21 items.

### 2. Basic Math & Raw Score Range
The raw score is calculated with a simple summation:
$$text{Total Score} = sum_{i=1}^{21} text{Item Score}_i$$
The total raw score has a mathematical range of **0 to 63**. 

### 3. Normal Distribution & Cutoff Statistics
The clinical ranges for the BDI-II are standardized based on clinical sample distributions:
* **Minimal (0–13)**: Represents normal mood fluctuations in the general population (standard deviation limits).
* **Mild (14–19)**: Scores indicating mild dysphoria, falling roughly 1.0 to 1.5 standard deviations (SD) above the community mean.
* **Moderate (20–28)**: Indicates clinically significant depressive distress, typically 1.5 to 2.0 SD above the mean.
* **Severe (29–63)**: Represents extreme distress, falling more than 2.0 SD above the mean (placing the patient in the top 2% of severity).

### 4. Special Critical Item Rule
In psychometrics, certain items carry critical clinical weight regardless of the cumulative statistical score. Item 9 measures **Suicidal Thoughts or Wishes**. A score of 1, 2, or 3 on Item 9 must immediately trigger a clinical safety protocol, even if the total BDI-II score is in the "Minimal" range.`
  },
  ymrs: {
    id: 'ymrs',
    name: 'Young Mania Rating Scale (YMRS)',
    history: 'Developed by Young et al. in 1978. It was designed to assess the severity of manic symptoms in patients diagnosed with bipolar disorder, providing a reliable and sensitive instrument to track symptoms over time and during clinical trials.',
    indications: 'Clinician-administered rating scale for adults diagnosed with or suspected of having bipolar mania. It is widely used in inpatient wards, psychiatric clinics, and research settings.',
    administration: 'Administered by a trained clinician during a semi-structured clinical interview (typically 15-30 minutes). The clinician rates the patient\'s behavior and speech during the interview, combined with reports of behavior over the preceding 48 hours.',
    scoringGuide: 'Contains 11 items. 7 items are scored on a 0-4 scale. 4 items (Irritability, Speech, Thought Content, Disruptive/Aggressive Behavior) are double-weighted and scored 0-8 to reflect their clinical significance.\n- <= 12: Normal / Remission\n- 13–19: Mild Mania\n- 20–25: Moderate Mania\n- >= 26: Severe Mania',
    ethicalConsiderations: 'Requires clinical training and experience to administer objectively, especially for rating speech pressure, thought disorder, and irritability. Clinicians must maintain objectivity and avoid rating bias based on patient history.',
    scoringTutorial: `### 1. Weighted Item Scoring Mechanics
Unlike simple additive scales, the YMRS incorporates **weighted item scales** to reflect clinical hierarchy. The scale consists of 11 items:
* **Standard Items (7 items)**: Items 1, 2, 3, 4, 7, 10, and 11 are scored on a standard **0 to 4** scale.
* **Double-Weighted Items (4 items)**: Items 5 (Irritability), 6 (Speech Rate/Volume), 8 (Thought Content), and 9 (Disruptive-Aggressive Behavior) are scored on a **0 to 8** scale (using even numbers only: 0, 2, 4, 6, 8).

### 2. Rationale for Double-Weighting
These four specific items are double-weighted because they represent the core clinical markers that differentiate mild hypomania from severe mania. Irritability, pressured speech, delusional grandiosity, and overt hostility are statistically the strongest indicators of severe impairment and risk.

### 3. Score Calculation
The scoring engine sums the standard and double-weighted items:
$$text{Total Score} = sum text{Standard Scores} + 2 cdot sum text{Double-Weighted Indices}$$
The total score ranges from **0 to 60**.

### 4. Severity Bands Statistics
* **Score >=≤ 12**: Suggests symptom remission or normal baseline mood.
* **Score 13–19**: Mild severity (often hypomania).
* **Score 20–25**: Moderate mania, causing prominent functional impairment.
* **Score >=≥ 26**: Severe mania, indicating acute manic crisis that typically requires hospitalization or intensive pharmacological intervention.`
  },
  ybocs: {
    id: 'ybocs',
    name: 'Yale-Brown Obsessive Compulsive Scale (Y-BOCS)',
    history: 'Developed by Wayne Goodman and colleagues in 1989. It was created to overcome limitations in existing scales by separating the measurement of obsessive-compulsive symptom *severity* from the *content* of the symptoms.',
    indications: 'Indicated for patients presenting with obsessive and/or compulsive symptoms. Used for baseline severity assessment, differential diagnosis, and monitoring treatment efficacy (e.g. ERP therapy or SSRIs).',
    administration: 'A 10-item clinician-administered interview. The first 5 items measure Obsessions, and the second 5 items measure Compulsions. Clinicians rate: Time spent, Interference, Distress, Resistance, and Control on a 0 to 4 scale. Typically takes 15-20 minutes.',
    scoringGuide: 'Obsessions Subscore (0-20), Compulsions Subscore (0-20), Total Y-BOCS Score (0-40).\n- 0–7: Subclinical\n- 8–15: Mild OCD\n- 16–23: Moderate OCD\n- 24–31: Severe OCD\n- 32–40: Extreme OCD',
    ethicalConsiderations: 'Clinicians should distinguish between patient resistance (making an effort to fight thoughts) and control (ability to stop them). Cultural factors regarding what constitutes an "obsession" or "taboo thought" should be handled with sensitivity.',
    scoringTutorial: `### 1. Subscale Division & Calculation
The Y-BOCS splits OCD symptoms into two distinct subscales to allow for targeted clinical tracking:
* **Obsessions Subscore (Items 1-5)**: Rates time, interference, distress, resistance, and control over obsessive thoughts. Range: **0 to 20**.
$$text{Obsessions Subscore} = sum_{i=1}^{5} text{Item Score}_i$$
* **Compulsions Subscore (Items 6-10)**: Rates time, interference, distress, resistance, and control over compulsive behaviors. Range: **0 to 20**.
$$text{Compulsions Subscore} = sum_{i=6}^{10} text{Item Score}_i$$

### 2. Cumulative Severity Index
The total Y-BOCS score is the direct sum of both subscores:
$$text{Total Y-BOCS} = text{Obsessions Subscore} + text{Compulsions Subscore}$$
The total score ranges from **0 to 40**.

### 3. Severity Ranges & Diagnostic Norms
* **0–7 (Subclinical)**: Symptoms do not meet clinical thresholds for active OCD diagnosis.
* **8–15 (Mild)**: Noticeable symptoms causing minor daily disruption.
* **16–23 (Moderate)**: Significant distress; obsessions/compulsions consume 1–3 hours daily.
* **24–31 (Severe)**: High impairment; symptoms consume 3–8 hours daily.
* **32–40 (Extreme)**: Near-constant symptoms, incapacitating daily functioning.

### 4. Treatment Efficacy Statistics
In clinical trials and cognitive behavioral therapy (such as Exposure and Response Prevention - ERP), a **25% to 35% reduction** in the total Y-BOCS score is the standard psychometric threshold used to define a "clinically significant response" to treatment.`
  },
  wais: {
    id: 'wais',
    name: 'Wechsler Intelligence Scales (WAIS-IV / WISC-V)',
    history: 'Developed by David Wechsler in 1939 (Wechsler-Bellevue), now updated to WAIS-IV (Adults, 16-90) and WISC-V (Children, 6-16). These scales revolutionized IQ testing by using deviation IQ scores and dividing intelligence into verbal and performance/cognitive indices.',
    indications: 'Indicated for comprehensive assessment of cognitive functioning, diagnosing intellectual disabilities, identifying giftedness, assessing learning difficulties, and neuropsychological evaluations.',
    administration: 'Individual administration by a qualified psychologist. Consists of 10 core subtests and several supplemental subtests. Requires standardized materials (stimulus books, blocks, stopwatches). Takes 60 to 90 minutes.',
    scoringGuide: 'Subtest raw scores are converted to Scaled Scores (Mean=10, SD=3) based on age norms. Sums of scaled scores are converted to Composite Index Scores (Mean=100, SD=15):\n- Verbal Comprehension Index (VCI)\n- Visual Spatial Index (VSI)\n- Fluid Reasoning Index (FRI)\n- Working Memory Index (WMI)\n- Processing Speed Index (PSI)\n- Full Scale IQ (FSIQ) represents overall cognitive ability.',
    ethicalConsiderations: 'Restricted to licensed psychologists with specific training. High stakes: scores can affect school placements, medical diagnoses, and legal proceedings. Cultural, linguistic, and sensory biases must be considered when interpreting profiles.',
    scoringTutorial: `### 1. Deviation IQ vs. Ratio IQ
Older intelligence tests calculated IQ as a ratio of Mental Age to Chronological Age ($IQ = frac{MA}{CA} cdot 100$). The Wechsler scales introduced the **Deviation IQ**, which compares a person\'s performance to a standardized normative sample of their own age group using standard deviations on a normal bell curve.

### 2. Subtest Scaled Scores
First, raw subtest scores (e.g. number of correct block designs) are mapped to **Scaled Scores**:
* Scaled scores have a standardized **Mean of 10** and a **Standard Deviation (SD) of 3**.
* Range: **1 to 19**.
* Scores from 8 to 12 represent the average range. A score of 16 is 2 SDs above the mean (approx. 98th percentile).

### 3. Composite Index Scores ($Mean=100, SD=15$)
Sums of subtest scaled scores are converted to **Index Scores** (VCI, VSI, FRI, WMI, PSI) and the **Full-Scale IQ (FSIQ)**:
* Index Scores have a **Mean of 100** and a **Standard Deviation (SD) of 15**.
* Formula approximation:
$$text{Index Score} = >=≤( frac{sum text{Subtests} - text{Expected Mean}}{text{SD of Sum}} right) cdot 15 + 100$$

### 4. The Normal Curve Distribution
Standard IQ scores map directly to population percentiles:
* **130+ (Very Superior)**: Top 2.2% of the population ($> +2 text{ SD}$).
* **110–129 (Above Average / Superior)**: Next 22.8% ($+0.67 text{ to } +2 text{ SD}$).
* **90–109 (Average)**: Middle 50% ($-0.67 text{ to } +0.67 text{ SD}$).
* **70–89 (Below Average / Borderline)**: Next 22.8% ($-2 text{ to } -0.67 text{ SD}$).
* **< 70 (Extremely Low)**: Bottom 2.2% of the population ($< -2 text{ SD}$).

### 5. Discrepancy & Scatter Analysis
A key clinical statistics task is checking for "scatter" or discrepancies. A difference of **15+ points** (1.0 SD) between any of the Index scores (such as VCI vs. VSI) is statistically significant (occurring in $<10%$ of the population) and suggests uneven cognitive profiles rather than a single unified intelligence factor.`
  },
  misic: {
    id: 'misic',
    name: 'Malin\'s Intelligence Scale for Indian Children (MISIC)',
    history: 'Adapted by Dr. Arthur J. Malin in 1969 from the Wechsler Intelligence Scale for Children (WISC). It remains the most widely accepted and historically normalized child intelligence test in India, adapted to fit the Indian socio-cultural context.',
    indications: 'Indicated for Indian children aged 6 to 15 years. Used for clinical evaluations, intellectual disability licensing, educational planning, and diagnosing developmental delays.',
    administration: 'Individual administration by a trained psychologist. Consists of 11 subtests (6 Verbal: Information, Comprehension, Arithmetic, Analogies, Vocabulary, Digit Span; 5 Performance: Picture Completion, Block Design, Object Assembly, Coding, Picture Arrangement). Takes 60-90 minutes.',
    scoringGuide: 'Raw scores are converted to scaled scores based on Indian norms. Verbal IQ (VIQ), Performance IQ (PIQ), and Full-Scale IQ (FSIQ) are derived. Mean is 100, SD is 15. Classifications match standard Wechsler bands (Average 90-109, Borderline 70-79, Deficient < 70).',
    ethicalConsiderations: 'Indian norm tables date back to Malin\'s original adaptation; clinicians must interpret borderline scores cautiously due to the Flynn Effect (cognitive scores rising over generations) and rapid modernization of urban Indian children.',
    scoringTutorial: `### 1. Indian Adaptation Statistics
Malin\'s adaptation of the WISC (the MISIC) replaced culturally loaded Western items (e.g. questions about snow, foreign historical figures) with Indian equivalents. The statistical norms were standardized on Indian school children in the late 1960s.

### 2. Dual Scale Design
The MISIC divides raw scores into two major dimensions:
* **Verbal Sum of Scaled Scores**: Sum of the 5 core verbal subtests (Information, Comprehension, Arithmetic, Analogies, Vocabulary). Mean = 50, SD = 15.
* **Performance Sum of Scaled Scores**: Sum of the 5 performance subtests (Picture Completion, Block Design, Object Assembly, Coding, Picture Arrangement). Mean = 50, SD = 15.

### 3. IQ Calculation Formulas
The sums of scaled scores are converted to deviation IQ values:
* **Verbal IQ (VIQ)**: Derived from the Verbal Sum.
* **Performance IQ (PIQ)**: Derived from the Performance Sum.
* **Full-Scale IQ (FSIQ)**: Derived from the cumulative total sum (10 subtests).
All three IQs are standard scores with **Mean = 100, SD = 15**.

### 4. VIQ-PIQ Discrepancy Analysis
In clinical neuropsychology, a gap of **15+ points** between VIQ and PIQ is a vital statistic. It suggests a significant difference in verbal verbal reasoning versus visual-spatial processing. In India, a high VIQ with low PIQ is common in children with language-heavy academic training, whereas a low VIQ with high PIQ may suggest language deprivation, bilingual confusion, or reading difficulties.`
  },
  mmpi: {
    id: 'mmpi',
    name: 'Minnesota Multiphasic Personality Inventory (MMPI-2)',
    history: 'First published in 1943 by Hathaway and McKinley, and revised in 1989 (MMPI-2). It is the most researched and widely validated objective personality inventory in clinical history, employing empirical criterion keying.',
    indications: 'For adults (18+). Indicated for clinical diagnostics, forensic evaluations, high-risk employment screening (e.g. police), and inpatient treatment planning.',
    administration: 'A 567-item True/False questionnaire. Requires a 6th-grade reading level. Takes 60 to 90 minutes. Clinicians score the responses to generate Validity and Clinical scales.',
    scoringGuide: 'Scores are reported as T-scores (Mean=50, SD=10). Validity scales (L, F, K) determine response validity (defensiveness, exaggeration). 10 Clinical Scales (Hs, D, Hy, Pd, Mf, Pa, Pt, Sc, Ma, Si) measure psychopathology. T-scores >= 65 are clinically elevated and indicate significant pathology or traits.',
    ethicalConsiderations: 'Test security is highly protected; item questions cannot be published freely. Interpretation requires advanced training in psychopathology. Results are highly sensitive and must be kept strictly confidential.',
    scoringTutorial: `### 1. What is a T-Score?
The MMPI-2 converts raw responses into standardized **T-Scores** to allow comparison across different scale lengths. A T-score is a standard score where:
* The **Mean is 50**
* The **Standard Deviation (SD) is 10**

### 2. Linear T-Score Formula
The formula to convert raw scores to linear T-scores is:
$$T = 50 + 10 cdot >=≤( frac{text{Raw} - text{Norm Mean}}{text{Norm SD}} right)$$
* A T-score of 50 indicates the patient scored exactly at the average of the normative reference sample.
* A T-score of 60 is 1.0 standard deviation above the mean.

### 3. The Clinical Elevation Threshold ($T >=≥ 65$)
In objective personality testing, a T-score of **65 or higher** is the standard cutoff for statistical and clinical significance (representing $+1.5 text{ SD}$). A score of 65 places the patient in the **top 7%** of the population. Scores above 65 suggest that the personality trait or clinical symptom is highly prominent and likely causing impairment.

### 4. Defensiveness (K) Correction
Some clinical scales are corrected to account for patient defensiveness. The K-scale raw score is multiplied by a fraction (e.g. 0.5K, 0.4K) and added to the raw scores of five clinical scales before T-score conversion:
* **Scale 1 (Hs)**: Add $0.5 cdot K$
* **Scale 4 (Pd)**: Add $0.4 cdot K$
* **Scale 7 (Pt)**: Add $1.0 cdot K$
* **Scale 8 (Sc)**: Add $1.0 cdot K$
* **Scale 9 (Ma)**: Add $0.2 cdot K$
This statistical correction adjusts for subtle "faking good" (underreporting symptoms).`
  },
  mcmi: {
    id: 'mcmi',
    name: 'Millon Clinical Multiaxial Inventory (MCMI-III)',
    history: 'Developed by Theodore Millon in 1977, updated to MCMI-III in 1994. It is built directly on Millon\'s evolutionary theory of personality and designed to assess DSM personality disorders and clinical syndromes.',
    indications: 'Restricted to adults (18+) experiencing psychiatric symptoms or undergoing clinical evaluation. Unlike the MMPI, it is specifically designed for *clinical* populations, not normal personalities.',
    administration: 'A 175-item True/False self-report questionnaire. Takes 25-30 minutes. Clinicians process responses to generate Base Rate (BR) scores.',
    scoringGuide: 'Utilizes Base Rate (BR) scores (0 to 115) instead of T-scores, normalized to match prevalence rates of personality disorders. BR >= 75 indicates the presence of a personality trait/pattern; BR >= 85 indicates the prominent presence of a personality disorder or clinical syndrome.',
    ethicalConsiderations: 'Should not be administered to "normal" (non-clinical) populations, as it will over-pathologize. Requires deep understanding of Millon\'s theory of personality coping styles to interpret correctly.',
    scoringTutorial: `### 1. Base Rate (BR) Scores vs. T-Scores
Standard personality tests use T-scores, which assume traits are normally distributed (bell-shaped curve) in the population. Theodore Millon argued that **personality disorders are not normally distributed** (most people do not have them). To correct this, the MCMI uses **Base Rate (BR) Scores**:
* BR scores are anchored to the actual prevalence (base rates) of the specific disorder in clinical psychiatric populations.

### 2. Base Rate Anchor Points
BR scores are mathematically scaled from **0 to 115** with fixed diagnostic anchors:
* **BR = 0**: Represents a raw score of zero.
* **BR = 60**: Represents the median score of psychiatric patients.
* **BR = 75**: The diagnostic cutoff representing the presence of clinically significant personality traits.
* **BR = 85**: The diagnostic cutoff representing the prominence of the personality disorder or clinical syndrome.

### 3. Statistical Adjustments
Raw scores on the MCMI are not directly converted to BR scores. They undergo four statistical adjustments:
* **Disclosure Adjustment (Scale X)**: Adjusts scores up if the patient was overly guarded, or down if they exaggerated.
* **Desirability (Scale Y) & Debasement (Scale Z) Adjustments**: Adjusts clinical scales based on faking-good or faking-bad indices.
* **Inpatient vs. Outpatient Adjustment**: Corrects scores based on whether the patient is in acute inpatient hospitalization (which inflates symptom scales).`
  },
  dap: {
    id: 'dap',
    name: 'Draw-a-Person (DAP) Test',
    history: 'Developed by Florence Goodenough in 1926 as an intelligence measure, later adapted by Karen Machover in 1949 as a projective personality test. It is based on the theory that a person\'s drawing of a figure reflects their self-image, body concerns, and psychological defenses.',
    indications: 'Used primarily with children and adolescents, but also with adults who have verbal barriers. Helpful as an icebreaker, cognitive screener, and projective indicator of self-concept and anxiety.',
    administration: 'The client is given a blank sheet of paper and a pencil, and instructed: "Draw a person." Once finished, they are often asked to draw a person of the opposite sex, and a brief interview is conducted about the figures drawn.',
    scoringGuide: 'Goodenough-Harris scoring provides a quantitative estimate of intellectual development. Machover scoring is qualitative, analyzing "Emotional Indicators" (e.g. tiny size = anxiety/insecurity; omitted hands = helplessness; shading = somatic anxiety).',
    ethicalConsiderations: 'Qualitative projective interpretations have lower psychometric reliability/validity. Indicators must only be used as hypotheses to be verified with standardized tests and clinical interviews, never as direct proof of pathology.',
    scoringTutorial: `### 1. Goodenough-Harris Quantitative Scoring
When used as a cognitive screening test, scoring is objective:
* The psychologist awards 1 point for every present body part or detail (e.g., presence of head, neck, clothing, correct number of fingers, proportion accuracy).
* Maximum points: **73**.
* The raw score is converted to a standard score ($Mean = 100, SD = 15$) using age-normative tables.

### 2. Machover Qualitative Indicators (Projective)
When used as a personality measure, scoring focuses on structural signs:
* **Size of Figure**:
  * Normal range is **5 to 7 inches** tall.
  * Figures **< 3 inches** are statistically correlated with clinical anxiety, insecurity, and depressive constriction.
  * Figures **> 9 inches** suggest grandiosity, hyperactivity, or aggressive behaviors.
* **Shading**: Shading of body parts represents anxiety directed at that specific area (e.g. shading the chest suggests somatic anxiety or respiratory concerns; shading hands suggests performance anxiety).
* **Line Quality**: Faint, sketchy lines correspond to low ego strength and insecurity; heavy, dark lines indicate high tension or aggression.`
  },
  rorschach: {
    id: 'rorschach',
    name: 'Rorschach Inkblot Test (Exner Comprehensive System)',
    history: 'Developed by Swiss psychiatrist Hermann Rorschach in 1921. John Exner developed the Comprehensive System (CS) in 1974, standardizing the administration, coding, and scoring to establish empirical validity and reliability for the test.',
    indications: 'Indicated for comprehensive personality assessment, evaluating thought disorders, processing styles, emotional regulation, and stress tolerance. Widely used in forensics and complex diagnostics.',
    administration: 'Individual administration using 10 standardized inkblot cards. The test consists of the Association Phase (patient says what the card looks like) and the Inquiry Phase (clinician asks where and what made it look like that). Detailed seating and prompting guidelines must be followed.',
    scoringGuide: 'Every response is coded on Location, Developmental Quality, Determinants (Form, Movement, Color, Shading, Pairs), Form Quality (how well response fits the blot shape), Content, Popularity, and Special Scores. Codes are aggregated into the **Structural Summary Table** containing ratios like EB, EA, es, Lambda, and Zd.',
    ethicalConsiderations: 'Highly complex and requires intensive training. Exner coding standards must be adhered to strictly. Sharing or showing the inkblot cards publicly undermines test validity and is restricted under psychological ethics.',
    scoringTutorial: `### 1. Rorschach Coding Categories
Every verbal response is coded across seven dimensions in the Exner System:
1. **Location**: *W* (Whole blot), *D* (Common detail), *Dd* (Unusual detail), *S* (White space).
2. **Developmental Quality (DQ)**: Rates structural complexity ($+, o, v/+, v$).
3. **Determinants**: What caused the percept? (Form $F$, Movement $M/FM/m$, Chromatic Color $FC/CF/C$, Achromatic Color $C'$, Shading-Texture $T$, Shading-Dimension $V$, Shading-Diffuse $Y$, Form Dimension $FD$, Reflections $Fr/rF$).
4. **Form Quality (FQ)**: How well does it fit the shape? ($+, o, u, -$).
5. **Content**: What was seen? ($H$ human, $A$ animal, $Bl$ blood, $An$ anatomy, etc.).
6. **Populars (P)**: Was it a common response?
7. **Special Scores**: Cognitive slips or verbal oddities ($DV, DR, FAB, INCON, ALOG$).

### 2. Core Ratios Formulas
The scoring engine sums the codes to generate structural ratios:
* **EB (Experience Balance - Coping Style)**:
  $$EB = M : text{WsumC}$$
  Where $M$ is the count of human movement. $text{WsumC} = 0.5 cdot FC + 1.0 cdot CF + 1.5 cdot C$.
  * If $M > text{WsumC} + 1.5$: **Introversive** (relies on inner thoughts, deliberate).
  * If $text{WsumC} > M + 1.5$: **Extratensive** (relies on feelings, trial-and-error).
  * If they are equal/close: **Ambitent** (unstable coping, easily overwhelmed).

* **EA (Experience Actual - Coping Resources)**:
  $$EA = M + text{WsumC}$$
  Normal range for adults is 6.0 to 10.0. Higher scores indicate greater psychological resources.

* **es (Experienced Stimulation - Situational Stress)**:
  $$es = (FM + m) + text{Achromatic Sum} + text{Shading Sum}$$
  Measures internal demands and stress.

* **Lambda (Cognitive Simplification Index)**:
  $$text{Lambda} = frac{text{Pure F Responses}}{text{Total Responses} - text{Pure F}}$$
  * Normal range: **0.30 to 0.99**.
  * Lambda **> 1.00** suggests a style that ignores details and simplifies complex environments.

* **Affect Ratio (Afr - Interest in Affective Stimuli)**:
  $$text{Afr} = frac{text{Responses to Cards VIII + IX + X}}{text{Responses to Cards I to VII}}$$
  Normal range is **0.50 to 0.85**. Lower suggests avoidance of emotional situations.`
  },
  tat: {
    id: 'tat',
    name: 'Thematic Apperception Test / Children\'s Apperception Test',
    history: 'Developed by Henry Murray and Christiana Morgan in 1935 (TAT). Leopold Bellak developed the Children\'s Adaptation (CAT) in 1949 using animal figures. It is based on the projection hypothesis: in structured narrative, clients reveal their own needs, presses, conflicts, and defenses.',
    indications: 'Indicated for exploring interpersonal dynamics, personality structure, defense mechanisms, and social-emotional conflicts in adults (TAT) or children (CAT).',
    administration: 'The clinician presents a selection of picture cards (typically 10-12 out of 31 cards) one by one and instructs the client to: "Tell a story. What led up to this, what is happening now, what are the characters thinking/feeling, and what is the outcome?" Story is recorded verbatim.',
    scoringGuide: 'Scored using Murray\'s Needs-Press analysis or Bellak\'s scoring. Clinicians evaluate: The Hero (identification), Needs of the Hero, Environmental Press (forces acting on hero), Conflicts, Anxieties, Defenses, and Integration/Resolution of the story.',
    ethicalConsiderations: 'Interpretation is subjective; clinician bias must be carefully managed. Ratios or scores should be integrated into a multi-method assessment battery rather than acting as a standalone diagnosis.',
    scoringTutorial: `### 1. Morgan-Murray Needs-Press Theory
The scoring of apperception narratives is based on Henry Murray's system, which views personality as a dynamic interaction between:
* **Needs (n)**: Internal drives, motivations, and desires of the primary character (the "Hero"). Examples include:
  * **nAchievement**: Need to overcome obstacles and succeed.
  * **nAffiliation**: Need to form relationships and be liked.
  * **nAggression**: Need to fight, argue, or hurt.
* **Press (p)**: External environmental forces, situations, or other characters that act upon the Hero. Examples include:
  * **pRejection**: Being ignored or abandoned.
  * **pDominance**: Being controlled or forced.
  * **pAffiliation**: Receiving support or friendship.

### 2. Narrative Coding Protocol
When analyzing a story transcript, the clinician:
1. **Identifies the Hero**: The character with whom the patient projects/identifies.
2. **Codes Needs (1-5 scale)**: Rate the intensity, duration, and frequency of the Hero\'s motives.
3. **Codes Press (1-5 scale)**: Rate the strength of environmental pressures.
4. **Evaluates the Resolution**: Compare the strength of the Needs vs. Press. Does the Hero succeed (Needs overcome Press), or do they fail (Press overwhelms Needs)?

### 3. Clinical Synthesis
The final step is aggregating themes across 10–12 cards. Psychometrics here are qualitative: the therapist looks for **repetition of specific Needs/Press combinations** (e.g., a patient whose heroes consistently struggle for achievement but are always crushed by hostile parental press, reflecting internal conflicts or perceived family expectations).`
  },
  hama: {
    id: 'hama',
    name: 'Hamilton Anxiety Rating Scale (HAM-A)',
    history: 'Developed by Max Hamilton in 1959. It was one of the first rating scales designed to measure the severity of anxiety symptoms and remains a standard clinician-rated outcome measure in psychopharmacological and psychotherapy clinical trials.',
    indications: 'Indicated for rating the severity of anxiety in patients already diagnosed with anxiety disorders. It is not a diagnostic tool but serves to establish a clinical baseline and track treatment outcomes.',
    administration: 'Clinician-administered semi-structured interview. The clinician rates each of the 14 items based on the patient\'s reports and clinical observations during the interview. Takes 15-30 minutes.',
    scoringGuide: 'Contains 14 items scored 0 to 4. Total score range is 0 to 56.\n- <= 17: Mild Anxiety\n- 18–24: Mild to Moderate Anxiety\n- 25–30: Moderate to Severe Anxiety\n- >= 30: Severe Anxiety\nSubscores:\n- Psychic Anxiety (items 1-6, 14)\n- Somatic Anxiety (items 7-13)',
    ethicalConsiderations: 'Requires skilled clinical interviewing to differentiate situational anxiety from trait symptoms. Clinicians must avoid double-counting overlapping symptoms of depressive disorders.',
    scoringTutorial: `### 1. Psychic vs. Somatic Anxiety Subscales
The HAM-A divides anxiety symptoms into two distinct psychometric factors:
* **Psychic Anxiety (Items 1-6, 14)**: Measures psychological distress, including anxious mood, tension, cognitive fears, insomnia, concentration issues, and behavior during interview.
* **Somatic Anxiety (Items 7-13)**: Measures physiological hyperarousal, including muscular pain, sensory disturbances, cardiovascular, respiratory, gastrointestinal, genitourinary, and autonomic symptoms.

### 2. Clinical Summation
The scoring engine sums all 14 items:
$$text{Total HAM-A Score} = sum_{i=1}^{14} text{Item Score}_i$$
The total raw score has a mathematical range of **0 to 56**.

### 3. Severity Ranges
* **0–17**: Mild anxiety. Indicates manageable distress with minimal autonomic impairment.
* **18–24**: Mild to moderate anxiety. Noticeable functional impairment.
* **25–30**: Moderate to severe anxiety. Significant cognitive and physical impairment.
* **31–56**: Severe or disabling anxiety. Autonomic hyperarousal and cognitive paralysis.`
  },
  hamd: {
    id: 'hamd',
    name: 'Hamilton Depression Rating Scale (HAMD-17)',
    history: 'Developed by Max Hamilton in 1960. The 17-item version (HAMD-17) is the historical "gold standard" for rating depressive symptoms in clinical trials and psychiatric research, serving as the benchmark for testing antidepressant efficacy.',
    indications: 'Clinician-administered rating of depressive symptom severity in patients already diagnosed with depressive disorders. Used to track changes in severity over time and monitor treatment response.',
    administration: 'Clinician-administered semi-structured interview (typically 15-20 minutes). Raters evaluate the patient\'s symptom levels over the preceding week based on verbal reports and clinical observations.',
    scoringGuide: 'Contains 17 items. Some items are scored on a 0-4 scale, while others are scored 0-2 (where a 3 or 4 score is clinically rare or hard to define). Total score ranges from 0 to 54.\n- <= 7: Remission / Normal\n- 8–13: Mild Depression\n- 14–18: Moderate Depression\n- 19–22: Severe Depression\n- >= 23: Very Severe Depression',
    ethicalConsiderations: 'Clinicians must receive standardized training to achieve high inter-rater reliability. Care must be taken not to over-score sleep or somatic items in patients with co-occurring medical conditions.',
    scoringTutorial: `### 1. Uneven Item Weighting
The HAMD-17 uses an uneven scoring structure to reflect clinical severity limits:
* **0-4 Scales (10 items)**: Items 1 (mood), 2 (guilt), 3 (suicide), 7 (activities), 8 (retardation), 9 (agitation), 10 (psychological anxiety), 11 (somatic anxiety), 15 (hypochondriasis), 16 (weight loss).
* **0-2 Scales (7 items)**: Items 4, 5, 6 (insomnias), 12 (GI somatic), 13 (general somatic), 14 (libido/genital), 17 (insight).

### 2. Clinical Change Statistics
* **Remission (Score >=≤ 7)**: A post-treatment score of 7 or less is the widely accepted standard indicator of full clinical remission.
* **Clinical Response (>=≥ 50% reduction)**: In psychiatric clinical trials, a decrease of 50% or more from the baseline score represents a clinically significant treatment response.

### 3. Somatic Symptom Biases
Because 3 out of 17 items concern sleep (early, middle, late insomnia), sleep symptoms account for up to 11.5% of the total score. Raters must be aware that sedating medications can artificially lower the score by improving sleep, which may not represent a true reduction in core depressive affect.`
  },
  asrs: {
    id: 'asrs',
    name: 'Adult ADHD Self-Report Scale (ASRS-v1.1)',
    history: 'Developed by the World Health Organization (WHO) and the Workgroup on Adult ADHD (including Adler, Kessler, and Spencer) in 2005 to address the need for a brief, validated screening instrument for adult ADHD in general clinical settings.',
    indications: 'Indicated as a screening tool for adults (18+) presenting with attention difficulties, disorganization, or restlessness. Used to identify patients who warrant a comprehensive diagnostic evaluation.',
    administration: 'A 18-item self-report questionnaire. Takes 5-10 minutes. Patients rate the frequency of symptoms over the past 6 months from "Never" (0) to "Very Oen" (4).',
    scoringGuide: 'Part A (Items 1-6) serves as the primary screener. A score of 4 or more threshold-exceeding answers in Part A indicates a positive screen. Part B (Items 7-18) provides a detailed symptom checklist.',
    ethicalConsiderations: 'A positive screen is not a diagnosis. Adult ADHD diagnostics require a full developmental history, verification of childhood onset, and ruling out comorbid mood or anxiety disorders.',
    scoringTutorial: `### 1. The Part A Screener Thresholds
The primary psychometric function of the ASRS-v1.1 relies on the **Part A Screener**. Part A contains six items shown to be the strongest predictors of adult ADHD. The scoring is binary based on clinical thresholds:
* **Items 1, 2, 3**: Scored as positive if rated **Sometimes (2)**, **Oen (3)**, or **Very Oen (4)**.
* **Items 4, 5, 6**: Scored as positive if rated **Oen (3)** or **Very Oen (4)**.

### 2. Diagnostic Prediction Statistics
* **Part A Score >=≥ 4**: If a patient endorses 4 or more items above the thresholds in Part A, the screen is **Positive**. This threshold yields high sensitivity, although about 35% of adults who meet full diagnostic criteria may still fall below it.
* **Total Score (0–72)**: Summing all 18 items provides a continuous measure of symptom frequency, which is useful for tracking treatment progress over time.`
  },
  aims: {
    id: 'aims',
    name: 'Abnormal Involuntary Movement Scale (AIMS)',
    history: 'Developed in the early 1970s by the National Institute of Mental Health (NIMH) to detect and monitor the severity of tardive dyskinesia (TD), a potentially irreversible involuntary movement disorder associated with long-term neuroleptic/antipsychotic use.',
    indications: 'Indicated for patients receiving antipsychotic medications. Recommended at baseline before prescribing, and then every 3-6 months depending on risk factors (typical vs. atypical agents, patient age).',
    administration: 'Clinician-administered observation. The clinician instructs the patient to perform specific physical tasks (e.g. opening mouth, protruding tongue, tapping fingers, walking) and rates movements across 10 items. Takes 10 minutes.',
    scoringGuide: 'Items 1-10 are scored 0 (None) to 4 (Severe). Items 11-12 document dental status. A total score is calculated, but diagnostic interpretation depends on severity clusters: positive for TD if >= 2 in two or more areas, OR >= 3 in one area.',
    ethicalConsiderations: 'Regular AIMS monitoring is a medical-legal and ethical requirement for prescribing clinicians. Early detection of TD is critical, as dosage reduction or drug discontinuation can arrest or reverse the condition.',
    scoringTutorial: `### 1. Diagnostic Thresholds for Tardive Dyskinesia (TD)
The AIMS does not rely on a simple total score cutoff for diagnosis. Instead, it uses **movement severity thresholds** on items 1-7 (facial, oral, extremity, and trunk muscle groups):
* **Positive for TD**:
  1. The patient scores **2 (Mild)** in **two or more** body regions, OR
  2. The patient scores **3 (Moderate)** or **4 (Severe)** in **at least one** body region.

### 2. Global Impairment Ratings
* **Item 8 (Global Severity)**: Rates the overall clinician impression of all movements.
* **Item 9 (Incapacitation)**: Rates the functional impact on patient\'s daily life.
* **Item 10 (Awareness)**: Documents the patient\'s subjective distress and awareness of movements.`
  },
  audit: {
    id: 'audit',
    name: 'Alcohol Use Disorders Identification Test (AUDIT)',
    history: 'Developed by the World Health Organization (WHO) in 1989 as a simple screening tool to detect hazardous and harmful alcohol consumption in primary care settings, health clinics, and psychiatric intakes.',
    indications: 'Indicated for screening patients at intake to detect alcohol problems, guide intervention decisions, and monitor changes in drinking patterns.',
    administration: 'A 10-item self-report questionnaire or interview. Takes 2-5 minutes. Items 1-8 are rated 0-4. Items 9-10 are rated 0, 2, or 4.',
    scoringGuide: 'Total score ranges from 0 to 40.\n- <= 7: Low Risk\n- 8–15: Hazardous Use (counseling/education suggested)\n- 16–19: Harmful Use (brief therapy suggested)\n- >= 20: Possible Dependence (specialist referral indicated)',
    ethicalConsiderations: 'Patients may underreport alcohol consumption due to social desirability or shame. Clinicians should establish a non-judgmental atmosphere before administration.',
    scoringTutorial: `### 1. Three-Dimensional Screening
The 10 items of the AUDIT are mathematically grouped into three clinical dimensions:
* **Hazardous Use (Items 1-3)**: Measures frequency, typical quantity, and heavy episodic drinking.
* **Dependence Symptoms (Items 4-6)**: Measures loss of control, morning drinking, and behavioral salience.
* **Harmful Use (Items 7-10)**: Measures guilt after drinking, blackouts, injuries, and concern from others.

### 2. Scoring & Intervention Math
* **Score 8–15 (Hazardous)**: Suggests drinking above safe limits. Simple advice and feedback are indicated.
* **Score 16–19 (Harmful)**: Indicates drinking is causing physical or mental harm. Brief counseling is indicated.
* **Score >=≥ 20 (Severe)**: High probability of alcohol dependence. Diagnostic referral for detoxification or intensive treatment is indicated.`
  },
  phq9: {
    id: 'phq9',
    name: 'Patient Health Questionnaire-9 (PHQ-9)',
    history: 'Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, and Kurt Kroftenke in 1999 as part of the Patient Health Questionnaire. It maps the 9 diagnostic criteria for depression from the DSM-IV/5 into a brief self-report format.',
    indications: 'Screening, diagnosing, and monitoring the severity of depression in primary care, clinical psychiatry, and research settings.',
    administration: '9-item self-report questionnaire. Patients rate how often they were bothered by symptoms over the past 2 weeks from "Not at all" (0) to "Nearly every day" (3). Takes 3 minutes.',
    scoringGuide: 'Scores range from 0 to 27.\n- 0-4: Minimal Depression\n- 5-9: Mild Depression\n- 10-14: Moderate Depression\n- 15-19: Moderately Severe Depression\n- 20-27: Severe Depression\nNote: Item 9 (Suicidal Ideation) requires immediate clinical review.',
    ethicalConsiderations: 'Should not replace a diagnostic clinical interview. A score above 0 on Item 9 requires a comprehensive risk assessment for self-harm.',
    scoringTutorial: '### 1. Diagnostic Algorithm\nIn addition to the total score, a diagnosis of major depressive syndrome is suggested if 5 or more of the 9 items are rated as "More than half the days" (score 2) or "Nearly every day" (score 3), and one of those is Item 1 or Item 2.'
  },
  gad7: {
    id: 'gad7',
    name: 'Generalized Anxiety Disorder 7-item (GAD-7)',
    history: 'Developed by Kroftenke, Spitzer, and colleagues in 2006 to provide a brief, self-report utility to detect and track Generalized Anxiety Disorder in clinical trials and primary care.',
    indications: 'Screening and monitoring anxiety severity across DSM anxiety disorders, particularly GAD, Panic Disorder, and Social Phobia.',
    administration: '7-item self-report questionnaire. Patients rate symptom frequency over the past 2 weeks from "Not at all" (0) to "Nearly every day" (3). Takes 2 minutes.',
    scoringGuide: 'Scores range from 0 to 21.\n- 0-4: Minimal Anxiety\n- 5-9: Mild Anxiety\n- 10-14: Moderate Anxiety\n- 15-21: Severe Anxiety',
    ethicalConsiderations: 'Scores must be interpreted in context with clinical interviews. Autonomic medical disorders must be ruled out.',
    scoringTutorial: '### 1. Psychometric Cutoffs\nStandard clinical thresholds indicate that a score of 10 or greater is the optimal point for identifying Generalized Anxiety Disorder (Sensitivity 89%, Specificity 82%).'
  },
  bai: {
    id: 'bai',
    name: 'Beck Anxiety Inventory (BAI)',
    history: 'Developed by Aaron T. Beck and colleagues in 1988 to measure the severity of anxiety in clinical populations, specifically focusing on somatic symptoms that are relatively independent of depressive features.',
    indications: 'Rating anxiety severity in adolescents and adults. Used for clinical baseline screening and tracking treatment-induced changes.',
    administration: '21-item self-report questionnaire. Patients rate how much they have been bothered by symptoms (e.g. numbness, wobbliness, hot flushes) in the past week on a 0-3 scale. Takes 5 minutes.',
    scoringGuide: 'Scores range from 0 to 63.\n- 0-7: Minimal Anxiety\n- 8-15: Mild Anxiety\n- 16-25: Moderate Anxiety\n- 26-63: Severe Anxiety',
    ethicalConsiderations: 'Provides valuable data on physical anxiety signs, but raters must distinguish side-effects of medications (e.g. tremors, dry mouth) from psychogenic anxiety.',
    scoringTutorial: '### 1. Focus on Somatic Hyperarousal\nThe BAI is unique because it deliberately under-weights cognitive anxiety features (such as worry, which overlaps with depression) and prioritizes somatic and panic-related sensations (tremor, heart racing, lightheadedness).'
  },
  aq10: {
    id: 'aq10',
    name: 'Autism Spectrum Quotient-10 (AQ-10)',
    history: 'Developed by Allison, Auyeung, and Baron-Cohen in 2012 as a brief, 10-item screening tool derived from the longer 50-item Autism Spectrum Quotient (AQ).',
    indications: 'Screening for adults with suspected autism spectrum conditions who do not have a diagnosed intellectual disability.',
    administration: '10-item self-report questionnaire. Patients choose between Agree or Disagree. Takes 2 minutes.',
    scoringGuide: 'Each item scoring positive awards 1 point. Total score ranges from 0 to 10. A score of 6 or higher indicates a positive screen.',
    ethicalConsiderations: 'Not a diagnostic tool. A positive screen only indicates the need for a comprehensive specialist assessment.',
    scoringTutorial: '### 1. Scoring Mechanics\nItems are scored 1 if the patient endorses autistic traits (either Agree or Disagree depending on the direction of the item). A threshold of 6+ is the standard referral indicator.'
  },
  mdq: {
    id: 'mdq',
    name: 'Mood Disorder Questionnaire (MDQ)',
    history: 'Developed by Robert Hirschfeld and colleagues in 2000 to improve the detection of bipolar spectrum disorders (particularly Bipolar I) in clinical settings.',
    indications: 'Screening for Bipolar I, II, or NOS symptoms in adult psychiatric outpatients.',
    administration: 'A 15-item self-report screener checking yes/no symptoms, co-occurrence, and functional impairment. Takes 5 minutes.',
    scoringGuide: 'A positive screen requires: (1) Yes to 7 or more of the 13 symptoms, (2) Several of the symptoms co-occurring, and (3) Moderate or Serious functional impairment.',
    ethicalConsiderations: 'Highly sensitive for Bipolar I but less sensitive for Bipolar II. False positives can occur in patients with ADHD or Borderline Personality Disorder.',
    scoringTutorial: '### 1. Multi-Stage Screening Criteria\nA positive screen is not just a sum score. The patient must satisfy three criteria simultaneously: 7+ symptom endorsements, symptoms occurring at the same time, and at least moderate impairment.'
  },
  des2: {
    id: 'des2',
    name: 'Dissociative Experiences Scale (DES-II)',
    history: 'Developed by Bernstein and Putnam in 1986, and updated to the DES-II (simplifying scoring to percentage blocks) in 1993. It is the most widely validated screening tool for dissociative pathology.',
    indications: 'Screening for Dissociative Identity Disorder (DID) and Dissociative Disorder NOS (DDNOS) in psychiatric outpatients.',
    administration: '28-item self-report questionnaire. Patients mark the percentage of time (0% to 100%) they experience specific dissociative symptoms. Takes 10 minutes.',
    scoringGuide: 'The overall score is the mean of all items (range 0 to 100).\n- < 30: Low probability of dissociative pathology\n- >= 30: High probability of dissociative disorder (DID/DDNOS)',
    ethicalConsiderations: 'High scores can be triggered by acute PTSD or severe Borderline Personality Disorder. Requires clinical validation.',
    scoringTutorial: '### 1. Mean Percentage Scoring\nScores are calculated by taking the sum of the percentage values selected (0, 10, 20... 100) and dividing by the total number of items. A mean score of 30+ is a strong clinical indicator.'
  },
  phq15: {
    id: 'phq15',
    name: 'Patient Health Questionnaire-15 (PHQ-15)',
    history: 'Developed by Kroftenke, Spitzer, and Williams in 2002. It serves as a brief self-report tracker for somatic symptoms and screens for Somatoform/Somatic Symptom Disorders.',
    indications: 'Screening and monitoring somatic symptom severity in clinical settings.',
    administration: '15-item self-report. Patients rate how much they were bothered by somatic issues in the past 4 weeks (0-2 scale). Takes 5 minutes.',
    scoringGuide: 'Scores range from 0 to 30.\n- 0-4: Minimal Somatic Severity\n- 5-9: Low Somatic Severity\n- 10-14: Medium Somatic Severity\n- 15-30: High Somatic Severity',
    ethicalConsiderations: 'Raters must evaluate if somatic complaints are fully explained by diagnosed organic medical conditions (e.g. diabetes, arthritis).',
    scoringTutorial: '### 1. Somatization Indexing\nThe PHQ-15 measures the burden of physical symptoms. High scores indicate somatization tendencies, which correlates with high healthcare utilization.'
  },
  eat26: {
    id: 'eat26',
    name: 'Eating Attitudes Test (EAT-26)',
    history: 'Adapted by David Garner in 1982 from the original 40-item Eating Attitudes Test (EAT-40) developed in 1979. It is the most widely referenced screening instrument for eating disorder risk.',
    indications: 'Screening high school, college, or clinical populations for eating disorder risk, anorexia, and bulimia.',
    administration: '26-item self-report questionnaire. Questions are rated on a 6-point scale. Takes 5 minutes.',
    scoringGuide: 'A total score of 20 or higher indicates a positive screen. Positive answers to behavioral questions (vomiting, laxative use) also trigger clinical concern.',
    ethicalConsiderations: 'A positive screen is not a diagnosis. Raters must handle responses with extreme clinical sensitivity to avoid triggering client defensiveness.',
    scoringTutorial: '### 1. Likert Scoring Adjustments\nItems 1-25 are scored: Always (3), Usually (2), Oen (1), Sometimes (0), Rarely (0), Never (0) (with reverse scoring on Item 26). A score of 20+ represents the diagnostic referral threshold.'
  },
  scoff: {
    id: 'scoff',
    name: 'SCOFF Eating Disorder Screener',
    history: 'Developed by Morgan, Reid, and Lacey in 1999 as a quick, memorable 5-item verbal screening tool for eating disorders in general practice settings.',
    indications: 'Rapid screening for eating disorders (Anorexia and Bulimia) in primary care or psychiatric intakes.',
    administration: '5-item yes/no questionnaire. Takes 1 minute.',
    scoringGuide: 'Each "Yes" response scores 1 point. A total score of 2 or higher indicates a positive screen.',
    ethicalConsiderations: 'Highly sensitive but less specific than longer diagnostic batteries. False positives can occur in normal populations.',
    scoringTutorial: '### 1. Binary Screener Threshold\nEndorsement of 2 or more of the 5 key letters/questions (Sick, Control, One stone weight loss, Fat belief, Food dominance) constitutes a positive screen.'
  },
  cage: {
    id: 'cage',
    name: 'CAGE Alcohol Screening Questionnaire',
    history: 'Developed by John A. Ewing in 1984 as a quick 4-item questionnaire to screen for lifetime alcohol abuse and dependence.',
    indications: 'Rapid screening for alcohol problems during intake interviews.',
    administration: '4-item yes/no questionnaire. Takes 1 minute.',
    scoringGuide: 'Each "Yes" scores 1 point. A score of 2 or higher is clinically positive.',
    ethicalConsiderations: 'Focuses on lifetime behavior rather than current active patterns. Requires follow-up regarding active alcohol intake.',
    scoringTutorial: '### 1. Acronym Mechanics\nThe acronym CAGE represents Cut down, Annoyed, Guilty, and Eye-opener. Endorsement of 2 or more items suggests alcohol abuse.'
  },
  dast10: {
    id: 'dast10',
    name: 'Drug Abuse Screening Test (DAST-10)',
    history: 'Developed by Harvey A. Skinner in 1982, derived from the longer 28-item DAST. It is a brief tool to screen for drug abuse and consequences.',
    indications: 'Screening for non-medical drug use and identifying potential substance abuse disorders.',
    administration: '10-item yes/no questionnaire. Takes 2 minutes.',
    scoringGuide: 'Scores range from 0 to 10.\n- 0: No problems\n- 1-2: Low severity\n- 3-5: Moderate severity\n- 6-8: Substantial severity\n- 9-10: Severe',
    ethicalConsiderations: 'Does not identify specific substances. Positive screens require clinical follow-up regarding substance types and quantities.',
    scoringTutorial: '### 1. Scoring Guidelines\nItems are scored yes (1) or no (0), with Item 3 reverse scored. A score of 3+ indicates moderate drug-related problems.'
  },
  gds30: {
    id: 'gds30',
    name: 'Geriatric Depression Scale (GDS-30)',
    history: 'Developed by Jerome Yesavage and colleagues in 1982 to provide a depression screening tool specifically designed for elderly populations, avoiding somatic symptom biases.',
    indications: 'Screening and rating depression severity in older adults (65+).',
    administration: '30-item yes/no questionnaire. Takes 10 minutes.',
    scoringGuide: 'Scores range from 0 to 30.\n- 0-9: Normal\n- 10-19: Mild Depression\n- 20-30: Severe Depression',
    ethicalConsiderations: 'Elderly patients may underreport feelings of sadness due to stigma. Somatic illnesses do not confound GDS results.',
    scoringTutorial: '### 1. Somatic Avoidance\nUnlike BDI-II, the GDS avoids items about sleep, fatigue, and appetite, which are often distorted by normal physical aging or organic medical conditions.'
  },
  ess: {
    id: 'ess',
    name: 'Epworth Sleepiness Scale (ESS)',
    history: 'Developed by Dr. Murray Johns in 1991 to measure daytime sleepiness in sleep disorder clinical settings.',
    indications: 'Assessing sleep health, narcolepsy risk, and obstructive sleep apnea severity.',
    administration: '8-item self-report. Patients rate their chance of dozing off in 8 situations (0-3 scale). Takes 2 minutes.',
    scoringGuide: 'Scores range from 0 to 24.\n- 0-5: Lower Normal Daytime Sleepiness\n- 6-10: Higher Normal Daytime Sleepiness\n- 11-12: Mild Excessive Sleepiness\n- 13-15: Moderate Excessive Sleepiness\n- 16-24: Severe Excessive Sleepiness',
    ethicalConsiderations: ' Daytime sleepiness must be evaluated alongside sleep apnea indicators or neurological disorders.',
    scoringTutorial: '### 1. Probability of Dozing\nESS asks the patient to rate their likelihood of dozing off in specific situations (e.g. watching TV, sitting in traffic), which tracks sleep debt.'
  },
  bis11: {
    id: 'bis11',
    name: 'Barratt Impulsiveness Scale (BIS-11)',
    history: 'Developed by Ernest Barratt in 1959, updated to BIS-11 in 1995. It is the gold standard self-report measure of personality impulsivity.',
    indications: 'Assessing impulsiveness in personality disorders, impulse-control disorders, and forensic psychiatry.',
    administration: '30-item questionnaire. Questions are rated on a 4-point scale. Takes 5 minutes.',
    scoringGuide: 'Total scores and three subscores are calculated: Attentional, Motor, and Non-planning Impulsiveness.',
    ethicalConsiderations: 'Impulsivity is a trait; scores should be evaluated alongside clinical history of risk-taking and self-harm.',
    scoringTutorial: '### 1. Tri-Dimensional Impulsivity\nBIS-11 divides impulsivity into: Attentional (inability to focus), Motor (acting on spur of moment), and Non-planning (lack of future orientation).'
  },
  mmse: {
    id: 'mmse',
    name: 'Mini-Mental State Examination (MMSE)',
    history: 'Developed by Marshal Folstein and colleagues in 1975. Designed as a brief, practical clinician-administered test to grade cognitive impairment in patients.',
    indications: 'Cognitive screening for dementia, delirium, and neurological conditions in older adults and clinical settings.',
    administration: '11 questions testing orientation, registration, attention/calculation, recall, and language. Takes 5-10 minutes.',
    scoringGuide: 'Total score is 30.\n- 24-30: Normal Cognitive Function\n- 19-23: Mild Cognitive Impairment\n- 10-18: Moderate Cognitive Impairment\n- 0-9: Severe Cognitive Impairment',
    ethicalConsiderations: 'Heavily dependent on language, reading, and motor skills. Patients with low literacy, visual/hearing deficits, or English as a second language may score poorly despite intact cognition.',
    scoringTutorial: '### 1. Multi-Domain Cognitive Grading\nMMSE is graded across 5 primary cognitive domains: Orientation (10 pts), Registration (3 pts), Attention & Calculation (5 pts), Recall (3 pts), and Language/Drawing (9 pts).\n\n### 2. Spelling vs Serial 7s Rule\nAttention is tested via Serial 7s subtraction or spelling "WORLD" backwards. Clinically, only the *higher* of the two scores is traditionally used (though both are often recorded to assess different cognitive strategies). This digital workpad automatically computes spelling order correctness.'
  },
  wai: {
    id: 'wai',
    name: 'Working Alliance Inventory (WAI)',
    history: 'Developed by Adam Horvath in 1981, based on Bordin\'s tri-partite model of the therapeutic alliance. It has become the most widely validated and utilized tool for tracking the quality of alliance in psychotherapy.',
    indications: 'Tracking therapeutic relationship strength, predicting therapeutic outcome, and supervising training clinicians.',
    administration: '36-item self-report scale (1 to 7 Likert). Administered separately to client (WAI-C) and therapist (WAI-T).',
    scoringGuide: 'Subscale scores (Goal, Task, Bond) each range from 12 to 84. Total score ranges from 36 to 252. Negative items are reverse-scored (8 - rating).',
    ethicalConsiderations: 'Client ratings must be confidential to ensure honest responses. Reluctant clients may score high due to social desirability.',
    scoringTutorial: '### 1. Tri-Partite Alliance Dimensions\n* **Task Agreement (12 items)**: Clinician and client consensus on active therapy interventions.\n* **Bond Strength (12 items)**: Mutual trust, empathy, and liking.\n* **Goal Alignment (12 items)**: Shared commitment to the objectives of the therapy.\n\n### 2. Discrepancy Analysis\nSupervisors analyze the "Therapist-Client Gap". A gap > 10 points indicates high relational mismatch, which often predicts premature therapy termination (ruptures).'
  },
  psyrats: {
    id: 'psyrats',
    name: 'PSYRATS Auditory Hallucinations Scale',
    history: 'Developed by Gillian Haddock and colleagues in 1999 to resolve the lack of detailed measurement of specific dimensions of hallucinations and delusions in psychiatric patients (overcoming the simple present/absent scoring of PANSS/SAPS).',
    indications: 'Detailed clinical tracking of auditory hallucinations (voices) and delusional systems in psychosis or schizophrenia spectrum cases.',
    administration: '11-item clinician-administered semi-structured interview. Rates frequency, duration, location, loudness, beliefs, negativity, and distress on a 0-4 scale.',
    scoringGuide: 'Sum of all 11 items (range 0 to 44). Subscales include Physical, Cognitive/Control, Negative Content, and Distress.',
    ethicalConsiderations: 'Raters must build strong rapport before asking about voice contents, which can be highly distressing or persecutory.',
    scoringTutorial: '### 1. Multi-Dimensional Hallucination Indexing\nPSYRATS measures 11 dimensions on a 5-point ordinal scale (0 to 4). Distress is divided into: Amount of Distress (Item 8) and Intensity of Distress (Item 9).\n\n### 2. Clinical Subscores\n* **Physical score (0-12)**: Sum of frequency, duration, loudness.\n* **Cognitive/Control score (0-12)**: Sum of location, beliefs, controllability.\n* **Negative Content (0-8)**: Sum of amount/degree of negative verbalizations.'
  },
  oscars: {
    id: 'oscars',
    name: 'Observable Social Cognition: A Rating Scale (OSCARS)',
    history: 'Developed by Kristin Healey, David Penn, and colleagues in 2015 as a brief, observer-rated diagnostic companion to measure real-world social cognitive deficits in schizophrenia spectrum outpatients.',
    indications: 'Informant-based tracking of social-cognitive performance (ToM, emotion perception, attribution) in outpatient psychosis settings.',
    administration: '8-item interview-based rating scale. Informant rates behavior over the past 7 days on a 1-7 Likert scale.',
    scoringGuide: 'Total score is the sum of the 8 items (range 8 to 56).\n- 8-16: Low Social Cognitive Deficit\n- 17-32: Moderate Social Cognitive Deficits\n- 33-48: Severe Social Cognitive Deficits\n- 49-56: Profound Social Cognitive Deficits',
    ethicalConsiderations: 'Relies on informant reporting. Raters should choose informants who have regular, daily contact with the patient.',
    scoringTutorial: '### 1. Social Cognitive Domains Rated\nOSCARS covers 5 core social cognitive areas: Emotion recognition, Malevolent attribution bias, Jumping to conclusions, Social/cognitive flexibility, and Theory of mind.\n\n### 2. Scoring Rationale\nItems are scored from 1 (None) to 7 (Extremely Severe). A higher score represents greater functional impairment in community social situations, which can guide social cognitive training interventions.'
  },
  maccat: {
    id: 'maccat',
    name: 'MacArthur Competence Assessment Tool-Treatment (MacCAT-T)',
    history: 'Developed by Thomas Grisso, Paul Appelbaum, and colleagues in 1997 as a clinical translation of the MacArthur Treatment Competence Research Instruments. It provides a structured, semi-structured clinical interview format to assess treatment decisional capacity.',
    indications: 'Assessment of patient competence/decisional capacity to consent to or refuse proposed medical or psychiatric treatments, especially when cognitive, psychotic, or neurological impairment is suspected.',
    administration: 'The clinician first discloses key details (disorder, proposed treatment, benefits, risks, alternatives) and records them. The clinician then asks specific capacity questions, grading answers on a 0 to 2 point scale across four dimensions. Takes 15-20 minutes.',
    scoringGuide: 'Focuses on four separate subscale scores. No overall sum score is traditionally computed as competence is not a single threshold value; instead, a capacity profile is mapped:\n- Understanding: 0 to 6 points (factual comprehension)\n- Appreciation: 0 to 4 points (insight/denial)\n- Reasoning: 0 to 8 points (rational comparison)\n- Expressing a Choice: 0 to 2 points (stable preference)',
    ethicalConsiderations: 'Clinical capacity is decision-specific (a patient may have the capacity to accept a low-risk pill but lack capacity for high-risk surgery). Raters must distinguish delusional denial from a reasonable difference of medical opinion.',
    scoringTutorial: '### 1. Decision-Specific Capacity Profiling\nThe MacCAT-T does not offer a single clinical cutoff score. Instead, it generates a dimensional profile across four key cognitive/evaluative domains. A low score in one area (e.g., Appreciation) can invalidate consent even if the other domains are intact.\n\n### 2. Rating Criteria (0, 1, 2)\n* **0 (Fails)**: Patient is unable to recount details, expresses delusional beliefs about the treatment (e.g., "The pills are poison to control my mind"), or cannot state a choice.\n* **1 (Partial)**: Recalls some facts, holds ambivalent or unstable beliefs, or reasons inconsistently.\n* **2 (Full)**: Logically consistent explanations, clear insight into condition, and stable expression of choice.'
  },
  conners: {
    id: 'conners',
    name: 'Conners Abbreviated Symptom Questionnaire (ASQ)',
    history: 'Developed by C. Keith Conners in 1969. It was designed to measure child behavioral problems, hyperactive behaviors, and conduct problems, serving as a primary standardized instrument for parents and teachers. The Abbreviated Symptom Questionnaire (ASQ) is a quick 10-item subset tracking core hyperactivity indicators.',
    indications: 'Screening and tracking treatment progress for children (ages 3 to 17) suspected of having Attention-Deficit/Hyperactivity Disorder (ADHD) or externalizing conduct concerns.',
    administration: 'Parent or teacher rated. For each of the 10 behavioral items, the informant selects the description that best fits the child\'s typical behavior over the past month. Takes 5 minutes.',
    scoringGuide: 'Items are rated 0 (Not at all) to 3 (Very much). Total score ranges from 0 to 30.\n- <=9: Normal range\n- 10-14: Borderline / Mild elevation\n- >=15: Clinically Significant (ADHD Risk), suggesting a need for a comprehensive neuropsychological evaluation.',
    ethicalConsiderations: 'Parent ratings are subjective and can be influenced by parental stress or depression. Raters must collect teacher reports to assess behavior across settings.',
    scoringTutorial: '### 1. The Hyperactivity Index\nThe Conners ASQ (10-item) is also known as the Hyperactivity Index. The total score is the sum of all 10 items:\n$$\\text{Total Score} = \\sum_{i=1}^{10} \\text{Item Score}_i$$\nThe score range is **0 to 30**.\n\n### 2. Clinical Cut-off Statistics\n* **Normal (0–9)**: Scores within 1 standard deviation of age-matched general population norms.\n* **Borderline (10–14)**: Mildly elevated traits.\n* **Clinically Significant (>=15)**: Typically falls 1.5 to 2.0 standard deviations above the community mean. In clinical validation studies, a cut-off of 15 yields high sensitivity and specificity for differentiating children diagnosed with ADHD from neurotypical controls.\n\n### 3. Setting Pervasiveness\nBecause ADHD is a pervasive developmental concern, symptoms must be present in **two or more settings** (e.g., home and school) according to DSM-5 criteria. A high score on a parent-rated Conners ASQ must be compared side-by-side with a teacher-rated Conners ASQ to rule out setting-specific behavior problems.'
  },
  bkt: {
    id: 'bkt',
    name: 'Binet-Kamat Test of Intelligence (BKT)',
    history: 'Developed by V.V. Kamat in 1934 as an adaptation of the Stanford-Binet Intelligence Scale for the Indian population. It was standardized on Marathi and Kannada speaking cohorts and remains a classic, highly valued clinical intelligence scale in India.',
    indications: 'Assessment of intellectual functioning, diagnosing intellectual developmental disorders (IDD), identifying cognitive strengths/deficits, and clinical profiling of children and adolescents (ages 3 to 22).',
    administration: 'Individually administered. The examiner determines a Basal Age where all items are passed and continues testing upwards through successive age levels until the client fails all items at a level (Terminal Age).',
    scoringGuide: 'Mental Age (MA) is calculated as: Basal Age + credits earned. IQ is computed using the ratio formula: (MA / CA) * 100. Modern clinicians prorate the IQ to an SD of 15 using the normalization factor to align with standard DSM-5 classifications.',
    ethicalConsiderations: 'The scale was standardized several decades ago, so scores may reflect some Flynn effect. Practitioners must use the prorated/normalized score to avoid overestimating intellectual disability.',
    scoringTutorial: '### 1. Basal & Terminal Age Rules\n* **Basal Age (BA)**: The highest age level at which a client successfully passes **all 6 test items**.\n* **Terminal Age (TA)**: The lowest age level at which a client **fails all 6 test items**.\n\n### 2. Credit Months Allotment\nCredits for passed items above the Basal Age level are awarded as follows:\n* **Ages 3 to 10**: **2 months** credit per passed item.\n* **Ages 12, 14, 16**: **4 months** credit per passed item (due to 2-year jumps).\n* **Ages 19, 22**: **6 months** credit per passed item (due to 3-year jumps).\n\n### 3. Ratio IQ vs Prorated Standard Deviation 15 IQ\nThe classic BKT has an SD of 18.7. To compare with Wechsler or WHO standards, the ratio IQ should be normalized to an SD of 15:\n$$\\text{Prorated IQ} = 100 + \\frac{15}{18.7} \\times (\\text{Ratio IQ} - 100)$$'
  },
  dst: {
    id: 'dst',
    name: 'Developmental Screening Test (DST)',
    history: 'Developed by Dr. J. Bharat Raj to provide a brief, culturally relevant screening instrument for child mental development in India, based on Vineland and Gesell milestones.',
    indications: 'Developmental screening of infants and children (birth to 15 years) to identify developmental delay risk across motor, language, adaptive, and social domains.',
    administration: 'Caregiver semi-structured interview combined with direct observation of the child. Raters check items achieved by the child.',
    scoringGuide: 'Developmental Age (DA) is calculated by summing the credit months of all passed items. Developmental Quotient (DQ) is computed as (DA / CA) * 100.',
    ethicalConsiderations: 'Screening tools are not diagnostic. Children scoring below a DQ of 70 should be referred immediately for a detailed multidisciplinary developmental assessment.',
    scoringTutorial: '### 1. Milestone Weighting\nEach of the 88 items in the DST corresponds to a specific fraction of monthly development, ensuring the sum of all items matches the maximum age of 180 months (15 years).\n\n### 2. Developmental Quotient (DQ)\nThe DQ is a ratio comparing the child\'s functioning age to their actual age:\n$$\\text{DQ} = \\left( \\frac{\\text{Developmental Age (DA)}}{\\text{Chronological Age (CA)}} \\right) \\times 100$$\n\n### 3. Clinical Interpretation\n* **DQ >= 85**: Normal age-appropriate development.\n* **DQ 70–84**: Borderline developmental functioning.\n* **DQ < 70**: Clinical delay; warrants comprehensive child development and pediatric neurology referral.'
  },
  cbcl: {
    id: 'cbcl',
    name: 'Child Behavior Checklist (CBCL 6-18)',
    history: 'Developed by Thomas Achenbach in 1991 as part of the Achenbach System of Empirically Based Assessment (ASEBA). It is one of the most widely used standardized measures for child behavioral and emotional problems globally.',
    indications: 'Parent-rated screening of behavioral problems in children aged 6 to 18 years, tracking clinical syndrome loads.',
    administration: 'Parent or guardian rates behavior problem items on a 3-point scale based on the preceding 6 months. Takes 15-20 minutes.',
    scoringGuide: 'Focuses on Internalizing Problems (Anxious/Depressed, Withdrawn, Somatic), Externalizing Problems (Rule-Breaking, Aggressive), and Total Problem Score.',
    ethicalConsiderations: 'High scores do not equate to a psychiatric diagnosis but signal clinically significant behavioral syndromes that warrant diagnostic follow-up.',
    scoringTutorial: '### 1. Broad Band Syndromes\n* **Internalizing Score**: Sum of items measuring anxiety, depression, withdrawal, and somatic complaints.\n* **Externalizing Score**: Sum of items measuring rule-breaking, aggression, and oppositional behavior.\n* **Total Problems**: Cumulative sum of all items.\n\n### 2. Clinical Cut-off Scores\nBroadband syndromic ranges correspond to standardized T-scores:\n* **Normal**: T-score < 65\n* **Borderline Clinical**: T-score 65 to 69\n* **Clinical Range**: T-score >= 70 (representing the top 2% of the normative sample, showing active behavioral distress).'
  }
};

