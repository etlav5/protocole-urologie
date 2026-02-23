export type Cancer = "Prostate" | "Vessie" | "Rein";

export type Protocol = {
  id: string;
  cancer: Cancer;
  stage: string;

  title: string;
  phase?: string;
  randomized?: boolean;
  blinding?: "Open-label" | "Double-insu";

  // Contenu
  designShort: string; // carte
  designFull: string; // modal
  populationShort: string; // carte
  populationFull: string; // modal

  inclusion: string[];
  exclusion?: string[];
  endpoints?: { primary?: string[]; secondary?: string[] };

  // Carte
  cardHighlights?: string[];

  // Images
  schemaSrc?: string[];
};

export const timelineByCancer: Record<Cancer, string[]> = {
  Prostate: ["Localisé", "BCR", "M0CRPC", "mHSPC", "mCRPC"],
  Vessie: ["NMIBC", "NMIBC post-BCG", "MIBC", "Métastatique"],
  Rein: ["Localisé", "Métastatique"],
};

export const protocols: Protocol[] = [
  {
    id: "asertain",
    cancer: "Prostate",
    stage: "Localisé",
    title: "ASCERTAIN",
    phase: "Phase I",
    randomized: true,
    blinding: "Open-label",
    designShort: "Window-of-opportunity pré-prostatectomie",
    designFull:
      "Étude de phase I randomisée (window-of-opportunity) évaluant un traitement investigational administré avant prostatectomie radicale, afin d’évaluer la faisabilité, la sécurité et des signaux biologiques/activité tumorale sur tissu opératoire.",
    populationShort:
      "Ca prostate localisé (risque intermédiaire / haut risque), candidat chirurgie.",
    populationFull:
      "Participants atteints d’un cancer de la prostate localisé à risque intermédiaire ou élevé, candidats à une prostatectomie radicale. Étude centrée sur une période préopératoire (pré-prostatectomie) avec collecte de données/tissus.",
    inclusion: [
      "Cancer de la prostate localisé (intermédiaire ou haut risque)",
      "Candidat à prostatectomie radicale",
      "Consentement éclairé signé",
      "Capable de respecter le calendrier de visites / procédures",
      "Paramètres biologiques compatibles avec la participation (selon protocole)",
      "Absence de contre-indication majeure au traitement investigational (selon protocole)",
      "Absence de contre-indication majeure à la chirurgie (selon protocole)",
      "Autres critères spécifiques du protocole (à détailler si besoin)",
    ],
    exclusion: [
      "Contre-indication majeure à la prostatectomie (selon protocole)",
      "Traitement systémique récent incompatible (selon protocole)",
      "Autre condition médicale jugée incompatible par l’investigateur",
    ],
    cardHighlights: ["Randomisée", "Pré-op", "Biomarqueurs/tissus"],
    schemaSrc: ["/schemas/asertain_schema.png"],
  },

  {
    id: "psmadc",
    cancer: "Prostate",
    stage: "BCR",
    title: "PSMA-DC",
    phase: "Phase III",
    randomized: true,
    blinding: "Open-label",
    designShort: "SBRT + radioligand PSMA",
    designFull:
      "Étude de phase III randomisée évaluant une stratégie de traitement ciblé (PSMA) combinée à une radiothérapie stéréotaxique (SBRT) chez des patients avec récidive biochimique et maladie oligométastatique sur imagerie PSMA.",
    populationShort: "BCR oligométastatique PSMA+ (≤5 lésions).",
    populationFull:
      "Participants avec récidive biochimique (BCR) et maladie oligométastatique PSMA positive (ex. PET PSMA) avec un nombre limité de lésions. Le protocole précise les seuils PSA, les exigences d’imagerie et les traitements antérieurs autorisés.",
    inclusion: [
      "Récidive biochimique après traitement local (selon protocole)",
      "Imagerie PSMA démontrant maladie oligométastatique",
      "Nombre de lésions ≤5 (selon protocole)",
      "Éligible SBRT (sites accessibles)",
      "Fonction hématologique / rénale / hépatique adéquate (selon protocole)",
      "Autres critères spécifiques (PSA/ADT/traitements antérieurs) à détailler",
    ],
    cardHighlights: ["Randomisée", "≤5 lésions", "Imagerie PSMA"],
    schemaSrc: ["/schemas/psmadc_schema.png"],
  },

  {
    id: "sunrise3",
    cancer: "Vessie",
    stage: "NMIBC",
    title: "SunRISe-3",
    phase: "Phase III",
    randomized: true,
    blinding: "Open-label",
    designShort: "TAR-200 ± immunothérapie vs BCG",
    designFull:
      "Étude de phase III randomisée évaluant TAR-200 (± immunothérapie) versus BCG chez des patients avec NMIBC à haut risque (BCG-naïf selon version du protocole). Le protocole définit les catégories HR, le schéma d’administration et les évaluations (cystoscopie, cytologie, biopsies).",
    populationShort: "NMIBC haut risque (BCG-naïf).",
    populationFull:
      "Participants atteints de NMIBC à haut risque, avec critères histologiques et de stadification définis par le protocole. Exigences de cystoscopie, cytologie et confirmation pathologique selon calendrier d’étude.",
    inclusion: [
      "NMIBC haut risque confirmé histologiquement",
      "Stade compatible (selon protocole)",
      "BCG-naïf (si requis par version du protocole)",
      "Éligible à traitement intravésical / évaluations endoscopiques",
      "Fonction organique adéquate (selon protocole)",
      "Autres critères spécifiques (à détailler)",
    ],
    cardHighlights: ["Randomisée", "NMIBC HR", "Comparateur BCG"],
    schemaSrc: ["/schemas/sunrise3_schema1.png", "/schemas/sunrise3_schema2.png"],
  },

  {
    id: "volga",
    cancer: "Vessie",
    stage: "MIBC",
    title: "VOLGA",
    phase: "Phase III",
    randomized: true,
    blinding: "Open-label",
    designShort: "Néoadjuvant → chirurgie → adjuvant",
    designFull:
      "Étude de phase III évaluant une stratégie péri-opératoire chez des patients avec cancer de la vessie infiltrant le muscle (MIBC). Schéma: néoadjuvant (selon bras) → cystectomie → adjuvant/observations selon protocole.",
    populationShort:
      "MIBC II–IIIA, candidat cystectomie; inéligible/refus cisplatine.",
    populationFull:
      "Participants avec carcinome urothélial/TCC de la vessie, stade II à IIIA (AJCC 8e), sans thérapie systémique antérieure pour UC/TCC, aptes à la cystectomie et au traitement néoadjuvant, inéligibles ou refusant le cisplatine.",
    inclusion: [
      "Carcinome urothélial/TCC de la vessie confirmé",
      "Stade II à IIIA (selon protocole)",
      "Aucune thérapie systémique antérieure pour UC/TCC",
      "Candidat à cystectomie",
      "Apte au néoadjuvant",
      "Inéligible au cisplatine OU refuse cisplatine",
      "Fonction organique adéquate (selon protocole)",
      "Autres critères spécifiques (selon protocole)",
    ],
    exclusion: [
      "Métastases à distance (M1)",
      "Traitement systémique antérieur pour UC/TCC (selon protocole)",
      "Contre-indication majeure au traitement d’étude (selon protocole)",
    ],
    endpoints: {
      primary: ["(selon protocole)"],
      secondary: ["(selon protocole)"],
    },
    cardHighlights: ["Péri-op", "MIBC II–IIIA", "Cisplatine non"],
    schemaSrc: ["/schemas/volga_schema.png"],
  },

  {
    id: "v940004",
    cancer: "Rein",
    stage: "Localisé",
    title: "V940-004",
    phase: "Phase II",
    randomized: true,
    blinding: "Double-insu",
    designShort: "Adjuvant V940 + pembrolizumab",
    designFull:
      "Étude de phase II randomisée, en double-insu, évaluant le vaccin personnalisé mRNA-4157 (V940) combiné à pembrolizumab en adjuvant après néphrectomie pour RCC à risque de récidive (comparateur selon protocole).",
    populationShort: "RCC post-néphrectomie (adjuvant).",
    populationFull:
      "Participants ayant subi une néphrectomie pour RCC et présentant un risque de récidive selon critères du protocole. Randomisation post-op, traitement adjuvant sur période définie, suivi oncologique.",
    inclusion: [
      "RCC confirmé (histologies incluses selon protocole)",
      "Chirurgie (néphrectomie) complétée",
      "Risque de récidive admissible (selon protocole)",
      "Fonction organique adéquate (selon protocole)",
      "Absence de contre-indication à immunothérapie (selon protocole)",
      "Consentement éclairé",
      "Autres critères spécifiques (selon protocole)",
    ],
    exclusion: [
      "Maladie métastatique (selon protocole)",
      "Auto-immun actif nécessitant immunosuppression (selon protocole)",
      "Contre-indication majeure à pembro/vaccin (selon protocole)",
    ],
    cardHighlights: ["Double-insu", "Adjuvant", "V940 + pembro"],
    schemaSrc: ["/schemas/v940004_schema.png"],
  },

  {
    id: "socratic",
    cancer: "Rein",
    stage: "Localisé",
    title: "SOCRATIC",
    phase: "Observationnelle",
    randomized: false,
    designShort: "Cohorte prospective (Bosniak III–IV)",
    designFull:
      "Étude observationnelle prospective évaluant l’évolution, la prise en charge et les issues cliniques de kystes rénaux complexes (Bosniak III–IV). Suivi avec imagerie et événements cliniques selon pratique/protocole.",
    populationShort: "Kystes rénaux complexes Bosniak III–IV.",
    populationFull:
      "Participants avec kystes rénaux complexes classés Bosniak III ou IV, avec caractéristiques définies par protocole. Suivi prospectif avec imagerie, interventions et issues.",
    inclusion: [
      "Kyste rénal Bosniak III ou IV",
      "Critères de taille/caractéristiques (selon protocole)",
      "Capacité à assurer le suivi d’imagerie",
      "Consentement éclairé",
      "Autres critères spécifiques (selon protocole)",
    ],
    exclusion: [
      "Condition rendant le suivi impossible (selon protocole)",
      "Contre-indication majeure aux examens de suivi (selon protocole)",
    ],
    cardHighlights: ["Observationnelle", "Bosniak III–IV", "Suivi"],
  },
];

