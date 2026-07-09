import React, { useState } from 'react';
import { GraduationCap, Clipboard, Award, ShieldAlert, Sparkles, BookMarked, HelpCircle, ChevronRight } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  short: string;
  icon: React.ReactNode;
  summary: string[];
  notes: React.ReactNode;
  examPrep: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
}

export const Academy: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState('mod1');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const handleSelectOption = (questionKey: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionKey]: optionIndex }));
  };

  const toggleExplanation = (questionKey: string) => {
    setShowExplanation(prev => ({ ...prev, [questionKey]: !prev[questionKey] }));
  };

  const modules: Module[] = [
    {
      id: 'mod1',
      title: '1. Fundamentals of Measurement',
      short: 'Stevens Scales of Measurement',
      icon: <BookMarked size={18} />,
      summary: [
        'Measurement is the assignment of numerals to objects according to rules (Stevens, 1946).',
        'Nominal scales classify only (mutually exclusive categories; e.g., ICD-10 diagnosis codes).',
        'Ordinal scales rank-order items, but lack equal intervals between ranks (e.g., severity rankings).',
        'Interval scales have equal intervals but lack a true zero point (e.g., Celsius temperature, IQ scores).',
        'Ratio scales have equal intervals and an absolute true zero, representing absence of the property (e.g., age, response time).'
      ],
      notes: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
          <p>
            In psychology, measurement is often indirect. We cannot directly observe depression or intelligence; instead, we measure latent constructs through behavioral indicators (items on a test). 
          </p>
          <div className="tutorial-block">
            <strong>Stevens\' Four Scales of Measurement (1946):</strong>
          </div>
          <table className="scoring-table">
            <thead>
              <tr>
                <th>Scale Level</th>
                <th>Core Property</th>
                <th>Permissible Math</th>
                <th>Clinical Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Nominal</strong></td>
                <td>Classification / Labeling</td>
                <td>Mode, Chi-square</td>
                <td>DSM-5 diagnoses, Gender labels, Patient IDs</td>
              </tr>
              <tr>
                <td><strong>Ordinal</strong></td>
                <td>Order / Ranking</td>
                <td>Median, Spearman Correlation</td>
                <td>Symptom severity (mild/mod/severe), Likert items</td>
              </tr>
              <tr>
                <td><strong>Interval</strong></td>
                <td>Equal Units (No True Zero)</td>
                <td>Mean, Standard Deviation, Pearson r</td>
                <td>FSIQ scores, T-scores, Celsius scale</td>
              </tr>
              <tr>
                <td><strong>Ratio</strong></td>
                <td>Absolute Zero (True Absence)</td>
                <td>All mathematical ratios</td>
                <td>Reaction time, Age, Heart rate, Dosage volume</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: '0.5rem' }}>
            <em>Exam Tip:</em> Standard IQ scores are <strong>Interval</strong> measures, not ratio measures. An IQ of 140 is not "twice as smart" as an IQ of 70, because an IQ of 0 does not represent a complete absence of cognitive capacity.
          </p>
        </div>
      ),
      examPrep: [
        {
          question: 'A clinician classifies patients based on their DSM-5 diagnostic category (e.g., Major Depressive Disorder, Generalized Anxiety Disorder, Schizophrenia). What level of measurement is being used?',
          options: ['Nominal', 'Ordinal', 'Interval', 'Ratio'],
          answerIndex: 0,
          explanation: 'Diagnostic categories serve solely as labels for classification. There is no mathematical ordering or magnitude implied between depression and schizophrenia, which fits the definition of a nominal scale.'
        },
        {
          question: 'Why are standard intelligence test scores (like FSIQ) considered interval scales rather than ratio scales?',
          options: [
            'Because they do not have equal units of measurement.',
            'Because they lack an absolute true zero point.',
            'Because they can only rank-order test takers.',
            'Because they represent absolute cognitive capacity.'
          ],
          answerIndex: 1,
          explanation: 'IQ scores possess equal interval spacing (the difference between 90 and 100 is theoretically identical to 100 and 110), but an IQ of 0 is arbitrary and does not represent an absolute true zero (i.e., a complete absence of all intellectual capability).'
        }
      ]
    },
    {
      id: 'mod2',
      title: '2. Classical Test Theory (CTT)',
      short: 'True Score Theory & Metrics',
      icon: <Clipboard size={18} />,
      summary: [
        'Classical Test Theory (CTT) states that every observed score contains True ability and Random Error: X = T + E.',
        'Reliability is the ratio of true score variance to observed score variance.',
        'Standard Error of Measurement (SEM) represents the standard deviation of error scores.',
        'Validity is whether the test measures what it claims to measure; a test can be reliable but invalid.'
      ],
      notes: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
          <p>
            <strong>The True Score Model:</strong>
          </p>
          <div className="formula-box">
            X = T + E
          </div>
          <p>
            Where <strong>X</strong> is the Observed Score, <strong>T</strong> is the True Score (the average score a person would get if tested infinite times), and <strong>E</strong> is unsystematic Random Measurement Error (e.g., distraction, room temperature, mood variance).
          </p>
          <p>
            <strong>Reliability (rxx):</strong> The degree to which test scores are free from measurement errors. Range is 0.0 to 1.0. Major types include:
          </p>
          <ul>
            <li><strong>Test-Retest:</strong> Consistency across time. Measures temporal stability.</li>
            <li><strong>Alternate Forms:</strong> Consistency across different test booklets.</li>
            <li><strong>Internal Consistency:</strong> Consistency across items within the same test. Measured via <strong>Cronbach\'s Alpha (α)</strong> or Split-Half coefficient. High alpha (≥0.80) indicates items correlate closely.</li>
            <li><strong>Inter-Rater Reliability:</strong> Consistency across different examiners (e.g., Cohen\'s Kappa for categorical diagnostics).</li>
          </ul>
          <p>
            <strong>Standard Error of Measurement (SEM):</strong>
          </p>
          <p>
            Calculated as: <code>SEM = SD * sqrt(1 - rxx)</code>, where SD is the standard deviation of the test, and rxx is the reliability coefficient. SEM is critical because it allows clinicians to construct <strong>Confidence Intervals (CI)</strong> around an observed score.
          </p>
          <p>
            <strong>Validity:</strong>
          </p>
          <ul>
            <li><strong>Content Validity:</strong> Do items adequately sample the target content domain? (e.g., does a depression scale cover all diagnostic features?).</li>
            <li><strong>Criterion Validity:</strong> Does the test correlate with an external criterion? (Predictive: predicts future GPA; Concurrent: correlates with current clinical diagnosis).</li>
            <li><strong>Construct Validity:</strong> Does the test measure the underlying theoretical construct? (Convergent: correlates with other anxiety tests; Discriminant: does not correlate with unrelated constructs like visual acuity).</li>
          </ul>
        </div>
      ),
      examPrep: [
        {
          question: 'If a psychological test has a reliability coefficient of 0.84 and a standard deviation of 15, what is the Standard Error of Measurement (SEM)?',
          options: ['6.0', '4.2', '3.0', '15.0'],
          answerIndex: 0,
          explanation: 'Using the formula SEM = SD * sqrt(1 - rxx): SEM = 15 * sqrt(1 - 0.84) = 15 * sqrt(0.16) = 15 * 0.40 = 6.0.'
        },
        {
          question: 'A researcher demonstrates that a new scale designed to measure social anxiety correlates highly with existing measures of shyness (convergent validity) but does not correlate with tests of intelligence (discriminant validity). This is evidence of which psychometric property?',
          options: ['Internal consistency', 'Construct validity', 'Test-retest stability', 'Criterion-related validity'],
          answerIndex: 1,
          explanation: 'Construct validity involves demonstrating that a test relates to other measures in a way that is consistent with theoretical expectations (convergent) and distinct from unrelated concepts (discriminant).'
        }
      ]
    },
    {
      id: 'mod3',
      title: '3. Standardization & Standard Scores',
      short: 'Z, T, Wechsler, and Base Rates',
      icon: <Award size={18} />,
      summary: [
        'Standard scores convert raw ordinal sums into standard deviation units to compare different tests.',
        'Z-score: Mean = 0, SD = 1. Basis for all transformations.',
        'T-score: Mean = 50, SD = 10. Used in MMPI-2 clinical scales.',
        'Wechsler Scaled Score: Mean = 10, SD = 3. Used in WAIS-IV subtests.',
        'Wechsler IQ (FSIQ): Mean = 100, SD = 15.',
        'MCMI Base Rate (BR): Converts raw scores based on diagnostic prevalence rates, not simple normal curves.'
      ],
      notes: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
          <p>
            Raw scores (e.g., adding up correct items to get 24) are uninterpretable by themselves. We must convert them to <strong>Standard Scores</strong> using norms compiled from a representative standardization sample.
          </p>
          <div className="tutorial-block">
            <strong>Major Standard Score Transformations:</strong>
          </div>
          <ul>
            <li><strong>Z-Score:</strong> <code>Z = (Raw - Mean) / SD</code>. Has a mean of 0 and SD of 1. Negative scores mean below average; positive scores mean above average.</li>
            <li><strong>T-Score:</strong> <code>T = Z * 10 + 50</code>. Mean of 50, SD of 10. Clinically significant elevations are generally defined as 1.5 SD above the mean (T ≥ 65).</li>
            <li><strong>Wechsler Subtest Scaled Score:</strong> <code>Scaled = Z * 3 + 10</code>. Range is 1 to 19, mean is 10, SD is 3.</li>
            <li><strong>Standard IQ (FSIQ/VIQ/PIQ):</strong> <code>IQ = Z * 15 + 100</code>. Mean of 100, SD of 15. An IQ of 115 is 1 SD above the mean (84th percentile).</li>
            <li><strong>Test Quotients (TQ):</strong> Adaptation used in Malin\'s Adaptation (MISIC) and other developmental tests, mapped to a mean of 100 and SD of 15.</li>
          </ul>
          <p>
            <strong>The Concept of Base Rates (BR):</strong>
          </p>
          <p>
            Used in Millon scales (MCMI-III). Standard scores assume a normal bell curve. However, psychiatric traits are highly skewed in the population. Base Rates standardize scores relative to clinical prevalence rates. A BR score of 75 indicates the *presence* of a trait, and 85 indicates the *prominence* of a trait, corresponding to cutting scores optimized to maximize diagnostic sensitivity and specificity.
          </p>
        </div>
      ),
      examPrep: [
        {
          question: 'A patient obtains a T-score of 65 on the MMPI-2 Depression scale. What is the equivalent Z-score, and how many standard deviations above the mean is this score?',
          options: [
            'Z = 1.0, 1.0 standard deviations above the mean.',
            'Z = 1.5, 1.5 standard deviations above the mean.',
            'Z = 2.0, 2.0 standard deviations above the mean.',
            'Z = 0.5, 0.5 standard deviations above the mean.'
          ],
          answerIndex: 1,
          explanation: 'Using the formula T = Z * 10 + 50: 65 = Z * 10 + 50 => Z * 10 = 15 => Z = 1.5. A Z-score of 1.5 represents a score 1.5 standard deviations above the mean.'
        },
        {
          question: 'What is the primary difference between normal-curve standard scores (like T-scores) and Base Rate (BR) scores used in the MCMI-III?',
          options: [
            'BR scores represent raw totals while T-scores represent percentages.',
            'BR scores are based on the prevalence of psychiatric conditions in clinical populations rather than assuming a normal distribution.',
            'T-scores require a clinician to calculate, while BR scores are calculated automatically by the client.',
            'BR scores have a mean of 50, whereas T-scores have a mean of 100.'
          ],
          answerIndex: 1,
          explanation: 'Base Rate scores anchor cutting scores to the actual diagnostic base rates of the traits in clinical groups, maximizing diagnostic accuracy by accounting for the fact that clinical traits are not normally distributed.'
        }
      ]
    },
    {
      id: 'mod4',
      title: '4. Clinical Assessment Taxonomy',
      short: 'Objective, Projective, & Symptom Scales',
      icon: <GraduationCap size={18} />,
      summary: [
        'Objective Personality tests use structured self-report inventories with fixed options (e.g., MMPI-2, MCMI-III).',
        'Projective tests present ambiguous stimuli to access unconscious psychological processes (e.g., Rorschach, TAT).',
        'Symptom Rating Scales track acute severity, typically with high sensitivity (e.g., BDI-II, PHQ-9).',
        'Intelligence Scales map structural cognitive domains (e.g., Wechsler scales, MISIC).'
      ],
      notes: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
          <p>
            Assessments serve different diagnostic functions, classified broadly into:
          </p>
          <div className="tutorial-block">
            <strong>1. Objective Personality Inventories:</strong>
          </div>
          <p>
            Rely on structured questionnaire booklets. MMPI-2 uses 567 True/False items to measure psychopathology across 10 clinical scales and incorporates validity scales to detect response bias (e.g., "fake good" vs. "fake bad"). MCMI-III targets DSM personality disorders and clinical syndromes.
          </p>
          <div className="tutorial-block">
            <strong>2. Projective Techniques:</strong>
          </div>
          <p>
            Based on the projective hypothesis: when presented with ambiguous stimuli, patients project their unique dynamics, conflicts, and defense mechanisms.
          </p>
          <ul>
            <li><strong>Rorschach Inkblot Test:</strong> 10 symmetrical inkblots. Scored using the Exner Comprehensive System (CS), measuring locations (W, D, Dd), determinants (movement, color, form), and special contents.</li>
            <li><strong>Thematic Apperception Test (TAT):</strong> Uses narrative cards to trigger storytelling, analyzed via Murray\'s Needs (internal desires) and Press (environmental forces) framework.</li>
            <li><strong>Draw-a-Person (DAP):</strong> A drawing task evaluated for emotional indicators, limb integration, and body size proportions.</li>
          </ul>
          <div className="tutorial-block">
            <strong>3. Symptom-Specific Rating Scales:</strong>
          </div>
          <p>
            Brief measures (e.g., BDI-II, HAM-D for depression; GAD-7, HAM-A for anxiety) designed to establish a rapid baseline and track treatment response over time.
          </p>
        </div>
      ),
      examPrep: [
        {
          question: 'Which of the following is considered an objective personality inventory?',
          options: ['Thematic Apperception Test (TAT)', 'Rorschach Inkblot Test', 'Millon Clinical Multiaxial Inventory (MCMI-III)', 'Draw-a-Person (DAP)'],
          answerIndex: 2,
          explanation: 'MCMI-III is a highly structured, self-report objective inventory. TAT, Rorschach, and DAP are projective assessment techniques.'
        },
        {
          question: 'What is the theoretical assumption underlying projective tests like the Rorschach?',
          options: [
            'That patients answer items honestly to present a clinical profile.',
            'That ambiguous stimuli encourage the projection of unconscious thoughts, conflicts, and personality structure.',
            'That cognitive traits can be measured by counting vocabulary words.',
            'That response times reflect hemispheric brain dominance.'
          ],
          answerIndex: 1,
          explanation: 'The projective hypothesis states that patients project their internal dynamics, subconscious conflicts, and cognitive organization styles onto ambiguous, unstructured stimuli.'
        }
      ]
    },
    {
      id: 'mod5',
      title: '5. Response Biases & Ethics',
      short: 'Validity Scales & Testing Guidelines',
      icon: <ShieldAlert size={18} />,
      summary: [
        'Response biases are systematic tendencies to respond to items on grounds other than their actual content.',
        'Social Desirability (faking good) involves portraying oneself in an unrealistic positive moral light.',
        'Malingering (faking bad) involves fabricating or exaggerating psychiatric symptoms.',
        'Acquiescence (yea-saying) is the tendency to agree with all items regardless of content.',
        'Ethical clinical assessment requires informed consent, confidentiality, and local norm validation.'
      ],
      notes: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
          <p>
            <strong>Validity Scales & Response Styles:</strong>
          </p>
          <p>
            When completing self-report tests, clinical patients may intentionally or unintentionally distort their profiles. Objective inventories implement specific validity check scales:
          </p>
          <ul>
            <li><strong>Lie (L) / Desirability (Y):</strong> Detects naive, deliberate attempts to deny minor human flaws and portray oneself as exceptionally moral.</li>
            <li><strong>Infrequency (F) / Debasement (Z) / Infrequency Psychopathology (Fp):</strong> Detects "faking bad," severe distress, confusion, random marking, or symptom exaggeration (malingering).</li>
            <li><strong>Correction (K) / Defensiveness:</strong> Measures guardness and clinical defensiveness. In the MMPI, K-fractions are added to several clinical scales to correct for this guardness.</li>
            <li><strong>VRIN / TRIN:</strong> Variable and True Response Inconsistency scales, designed to catch random responding or systematic "yea-saying" (acquiescence) and "nay-saying."</li>
          </ul>
          <p>
            <strong>Ethical & Professional Standards:</strong>
          </p>
          <p>
            Clinical psychologists must adhere to APA/ICD assessment codes:
          </p>
          <ol>
            <li><strong>Informed Consent:</strong> Explaining the purpose, methods, and reporting paths prior to testing.</li>
            <li><strong>Test Security:</strong> Keeping diagnostic items and manuals secure to maintain test validity.</li>
            <li><strong>Cultural Sensitivity:</strong> Validating that test norms fit the local patient demographics (e.g., using Malin\'s Adaptation for children in India instead of Western Wechsler tables when appropriate).</li>
            <li><strong>Feedback:</strong> Providing the patient with a clear explanation of findings in accessible, constructive language.</li>
          </ol>
        </div>
      ),
      examPrep: [
        {
          question: 'A patient answers "True" to almost all items on an inventory, regardless of what the question asks. What response bias is being demonstrated?',
          options: ['Malingering', 'Acquiescence', 'Social desirability', 'Defensiveness'],
          answerIndex: 1,
          explanation: 'Acquiescence (or "yea-saying") is the systematic tendency to agree with items or answer "True" regardless of item content. Most tests randomize item keying to detect this.'
        },
        {
          question: 'In the MMPI-2, what is the clinical function of adding the Correction (K) scale fraction to raw scores of scales like Hs, Pd, Pt, Sc, and Ma?',
          options: [
            'To inflate scores for patients who are malingering.',
            'To compensate for defensiveness, bringing scores up to their realistic level for guarded individuals.',
            'To detect random visual responding styles.',
            'To adjust for standard aging factors in geriatric patient files.'
          ],
          answerIndex: 1,
          explanation: 'The K-correction is designed to adjust clinical scales upwards for individuals who are defensive (high K score) to ensure their profiles accurately reflect pathology that they may be under-reporting.'
        }
      ]
    }
  ];

  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Academy Title Hero */}
      <div style={{
        textAlign: 'center',
        padding: '2.5rem 1rem',
        borderBottom: '2px double var(--border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          border: '1.5px solid var(--border)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <GraduationCap size={18} />
          <span>Clinical Psychometrics Academy</span>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Psychometric Scales & Assessment Theory
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '750px', lineHeight: 1.5 }}>
          Study key concepts in test development, measurement levels, classical test theory, standard score conversions, taxonomy of scales, and clinical testing ethics. Perfect for clinical practice preparation and exams.
        </p>
      </div>

      {/* Main Workspace Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        gap: '2rem',
        alignItems: 'start'
      }} className="grid-cols-2">
        
        {/* Le Side: Navigation Sidebar Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.25rem', paddingLeft: '0.5rem' }}>
            Course Modules
          </h3>
          
          {modules.map(mod => {
            const isActive = mod.id === activeModuleId;
            return (
              <div
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className="glass-panel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  padding: '1rem',
                  border: `1.5px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                  backgroundColor: isActive ? 'var(--primary-light)' : 'var(--bg-surface)',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {mod.icon}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    fontWeight: 700, 
                    fontSize: '0.85rem', 
                    color: isActive ? 'var(--primary)' : 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {mod.title.split('. ')[1]}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {mod.short}
                  </div>
                </div>
                <ChevronRight size={14} style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }} />
              </div>
            );
          })}
        </div>

        {/* Right Side: Active Module Lesson & Exam Review */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Main Lesson Content */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>Active Module</span>
              <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)', margin: 0 }}>
                {activeModule.title}
              </h2>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0 }}>
                {activeModule.short}
              </p>
            </div>

            {/* Quick Reference */}
            <div style={{
              backgroundColor: 'var(--primary-light)',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <h4 style={{ 
                fontSize: '0.85rem', 
                fontWeight: 700, 
                color: 'var(--primary)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em', 
                margin: 0, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <Sparkles size={16} />
                <span>Key Takeaways</span>
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {activeModule.summary.map((sumItem, sIdx) => (
                  <li key={sIdx} style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    {sumItem}
                  </li>
                ))}
              </ul>
            </div>

            {/* Textbook Notes */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>
                Detailed Course Notes
              </h3>
              {activeModule.notes}
            </div>
          </div>

          {/* Exam Prep & Review Questions */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              <HelpCircle size={20} style={{ color: 'var(--primary)' }} />
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontFamily: 'var(--font-display)' }}>
                Exam Review & Practice Questions
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {activeModule.examPrep.map((item, qIdx) => {
                const questionKey = `${activeModule.id}-q${qIdx}`;
                const selectedOpt = selectedAnswers[questionKey];
                const showExpl = showExplanation[questionKey];

                return (
                  <div key={qIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      Question {qIdx + 1}: {item.question}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {item.options.map((opt, oIdx) => {
                        const isSelected = selectedOpt === oIdx;
                        const isCorrect = oIdx === item.answerIndex;
                        let borderStyle = '1px solid var(--border)';
                        let bgStyle = 'var(--bg-input)';
                        let colorStyle = 'var(--text-secondary)';

                        if (isSelected) {
                          if (isCorrect) {
                            borderStyle = '1.5px solid var(--success)';
                            bgStyle = 'var(--success-light)';
                            colorStyle = 'var(--success)';
                          } else {
                            borderStyle = '1.5px solid var(--danger)';
                            bgStyle = 'var(--danger-light)';
                            colorStyle = 'var(--danger)';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectOption(questionKey, oIdx)}
                            className="btn"
                            style={{
                              textAlign: 'left',
                              padding: '0.625rem 0.875rem',
                              border: borderStyle,
                              backgroundColor: bgStyle,
                              color: colorStyle,
                              fontWeight: isSelected ? 600 : 400,
                              fontSize: '0.85rem',
                              justifyContent: 'flex-start',
                              width: '100%',
                              borderRadius: 'var(--radius-sm)'
                            }}
                          >
                            <span style={{ 
                              marginRight: '0.5rem', 
                              fontWeight: 700, 
                              opacity: 0.8,
                              textTransform: 'uppercase'
                            }}>
                              {String.fromCharCode(65 + oIdx)}.
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {selectedOpt !== undefined && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: selectedOpt === item.answerIndex ? 'var(--success)' : 'var(--danger)'
                          }}>
                            {selectedOpt === item.answerIndex ? '✓ Correct Answer!' : '✗ Incorrect Answer. Try again!'}
                          </span>
                          <button
                            onClick={() => toggleExplanation(questionKey)}
                            className="btn btn-secondary"
                            style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                          >
                            {showExpl ? 'Hide Explanation' : 'Show Explanation'}
                          </button>
                        </div>

                        {showExpl && (
                          <div style={{
                            backgroundColor: 'var(--primary-light)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.75rem',
                            fontSize: '0.8rem',
                            color: 'var(--text-primary)',
                            lineHeight: 1.4
                          }}>
                            <strong>Explanation:</strong> {item.explanation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
