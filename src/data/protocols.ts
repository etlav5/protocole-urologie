// src/data/protocole.ts

export type Cancer = "Prostate" | "Vessie" | "Rein";

export type Blinding = "Open-label" | "Single-blind" | "Double-insu";

export type NurseContact = {
  name?: string;
  phone?: string;
};

export type Protocol = {
  id: string;
  cancer: Cancer;

  /**
   * IMPORTANT: stage doit correspondre aux valeurs que ta timeline utilise
   * (ex: "mCRPC", "mCRPC 2L", etc.)
   */
  stage: string;

  title: string;

  phase?: string;
  randomized?: boolean;
  blinding?: Blinding;

  suspended?: boolean; // watermark "SUSPENDU" sur la carte

  designShort: string; // texte sur la carte
  designFull: string;  // texte dans la modal

  population: string;
  inclusion: string[]; // 5-8 critères dominants
  primaryEndpoint?: string; // outcome primaire / objectif primaire

  schemaSrc?: string[];   // ex: ["/schemas/volga_schema.png"]
  protocolUrl?: string;   // ex: "/protocols/volga_protocol.pdf"

  nurse?: NurseContact;   // infirmière responsable (optionnel)
};

export const timelineByCancer: Record<Cancer, string[]> = {
  Prostate: ["Localisé", "BCR", "M0CRPC", "mHSPC", "mCRPC", "mCRPC 2L"],
  Vessie: ["NMIBC", "NMIBC post-BCG", "MIBC", "Métastatique"],
  Rein: ["Localisé", "Métastatique"],
};

export const protocols: Protocol[] = [
  // -------------------------
  // PROSTATE
  // -------------------------

{
  id: "pr25",
  cancer: "Prostate",
  stage: "mCRPC",
  title: "PR.25",
  phase: "Phase III",
  randomized: true,
  blinding: "Open-label",

  designShort:
    "Essai randomisé évaluant une nouvelle stratégie systémique chez des patients mCRPC.",

  designFull:
    "Essai clinique multicentrique randomisé de phase III chez des patients atteints de cancer de la prostate résistant à la castration métastatique (mCRPC), visant à comparer une nouvelle stratégie thérapeutique à la norme actuelle, avec évaluation des résultats de survie et de progression.",

  population:
    "Hommes adultes avec cancer de la prostate métastatique résistant à la castration (mCRPC), en progression biologique ou radiologique sous traitement standard.",

  inclusion: [
    "Homme ≥ 18 ans",
    "Adénocarcinome prostatique confirmé histologiquement",
    "Maladie métastatique documentée",
    "Testostérone castrée (< 50 ng/dL)",
    "Progression PSA ou radiologique selon critères PCWG3",
    "ECOG 0–2",
    "Fonction hématologique et organique adéquate"
  ],

  primaryEndpoint:
    "Survie globale (Overall Survival, OS).",



  schemaSrc: ["/schemas/pr25_schema.png"],

  protocolUrl: "/protocols/pr25_protocol.pdf",

  nurse: {
    name: "Audrey Larouche",
    phone: "#67707",
  },
},

{
  id: "pr26",
  cancer: "Prostate",
  stage: "mHSPC",
  title: "PR.26 (TRIPLE-SWITCH)",
  phase: "Phase III",
  randomized: true,
  blinding: "Open-label",

  designShort:
    "Docetaxel + ADT + ARPI vs ADT + ARPI seul chez mCSPC avec réponse PSA sous-optimale.",

  designFull:
    "Essai international multicentrique randomisé de phase III comparant l’ajout de docétaxel (6 cycles) au traitement standard ADT + inhibiteur du récepteur des androgènes (ARPI) versus ADT + ARPI seul chez des patients atteints de cancer de la prostate métastatique sensible à la castration (mCSPC) présentant une réponse PSA sous-optimale après 6 à 12 mois de traitement hormonal.",

  population:
    "Patients avec mCSPC recevant ADT depuis 6–12 mois et ARPI ≥ 4 mois, avec PSA ≥ 0.2 ng/mL (réponse sous-optimale).",

  inclusion: [
    "Homme ≥ 18 ans",
    "Adénocarcinome prostatique confirmé",
    "Maladie métastatique documentée (imagerie conventionnelle)",
    "ADT 6–12 mois + ARPI ≥ 4 mois",
    "PSA ≥ 0.2 ng/mL à l’inclusion",
    "Testostérone < 50 ng/dL",
    "ECOG 0–2",
    "Candidat au docétaxel",
    "Fonction hématologique et organique adéquate"
  ],

  primaryEndpoint:
    "Survie globale (Overall Survival, OS).",

  

  schemaSrc: ["/schemas/pr26_schema.png"],

  protocolUrl: "/protocols/pr26_protocol.pdf",

  nurse: {
    name: "Joanie Deroy-Lambert",
    phone: "#67706",
  },
},

{
  id: "mk5684_004",
  cancer: "Prostate",
  stage: "mCRPC", // (si tu veux plutôt "mCRPC 2L+", dis-le et je le change)
  title: "MK-5684-004",
  phase: "Phase III",
  randomized: true,
  blinding: "Open-label",

  designShort: "CPI-1205 + enzalutamide vs placebo + enzalutamide (post-NHA, docetaxel inéligible/refusé)",
  designFull:
    "Étude de phase III randomisée évaluant l’inhibiteur d’EZH2 (CPI-1205) en combinaison avec l’enzalutamide versus placebo + enzalutamide chez des patients atteints de mCRPC ayant progressé sous un NHA (darolutamide/apalutamide/enzalutamide/abiratérone) et inéligibles ou refusant le docetaxel.",

  primaryEndpoint: "rPFS (survie sans progression radiographique)",

  population:
    "Patients avec cancer de la prostate métastatique résistant à la castration (mCRPC) avec progression sous castration continue, après exposition à un NHA, et candidats à enzalutamide + CPI-1205.",

  inclusion: [
    "mCRPC avec castration en cours (chirurgicale ou médicale)",
    "Progression après ≥1 NHA (pour mHSPC ou nmCRPC)",
    "Inéligible au docetaxel ou refus du docetaxel",
    "Métastases radiologiquement documentées",
    "Statut de performance ECOG adéquat (selon protocole)",
    "Fonctions hématologique/hépatique/rénale adéquates (selon protocole)",
  ],

  schemaSrc: ["/schemas/mk5684_004_schema.png"],
  protocolUrl: "/protocols/mk5684_004_protocol.pdf",

  nurse: { name: "Anne-Marie Maranda et Julie Michaud", phone: "#67705 et #67713" },
  // suspended: false,
},

  {
    id: "4tmpo",
    cancer: "Prostate",
    stage: "mCRPC",
    title: "4TMPO",
    phase: "Observationnelle",
    randomized: false,
    blinding: "Open-label",

    designShort:
      "Imagerie PET multi-traceurs à 4 temps (hétérogénéité inter-métastatique)",
    designFull:
      "Étude multicentrique observationnelle prospective (STROBE) visant à caractériser l’hétérogénéité inter-métastatique chez des patients mCRPC à l’aide d’imagerie PET multi-traceurs avec plusieurs temps de mesure.",

    population:
      "mCRPC avec ≥3 métastases sur imagerie de référence, après ARPI, candidats à taxane ou thérapie PSMA-radioligand (avant l’imagerie).",

    inclusion: [
      "Assigné homme à la naissance, ≥18 ans",
      "Adénocarcinome de la prostate confirmé histologiquement/cytologiquement",
      "Maladie métastatique avec ≥3 lésions actives (scintigraphie osseuse et/ou CT)",
      "CRPC sous castration continue (testostérone ≤50 ng/dL [1,73 nM]) + progression",
      "Progression après ≥1 ARPI (abiratérone/enzalutamide/apalutamide/darolutamide)",
      "Éligible à taxane OU à thérapie PSMA-radioligand (avant imagerie)",
      "Consentement signé et capacité de suivre le protocole",
    ],

    primaryEndpoint:
      "Caractérisation de l’hétérogénéité inter-métastatique par imagerie PET multi-traceurs (selon protocole).",

    schemaSrc: ["/schemas/4tmpo_schema.png"],
    protocolUrl: "/protocols/4tmpo_protocol.pdf",

    nurse: {
      name: "Marie-Christine Dubé, PhD",
      phone: "418-525-4444 poste 67708",
    },
  },

  {
    id: "jnj-pasritamig-klk2-compas",
    cancer: "Prostate",
    stage: "mCRPC 2L",
    title: "KLK2-comPAS (pasritamig / JNJ-78278343)",
    phase: "Phase III",
    randomized: true,
    blinding: "Double-insu",

    designShort:
      "Pasritamig + BSC vs placebo + BSC (mCRPC très prétraité)",
    designFull:
      "Essai randomisé (2:1) comparant pasritamig + best supportive care (BSC) versus placebo + BSC chez des patients mCRPC; analyse principale sur la survie globale.",

    population:
      "mCRPC métastatique (os et/ou ganglions) sans métastases viscérales au dépistage, PSA ≥2 ng/mL, maladie prétraitée (ARPI requis; taxanes en général ≥2 lignes; radioligand PSMA et PARPi selon disponibilité/indication).",

    inclusion: [
      "≥18 ans",
      "Adénocarcinome de la prostate confirmé (histologie; petites cellules exclues)",
      "mCRPC métastatique os/ganglions (sans métastases viscérales au screening)",
      "PSA ≥2 ng/mL au screening",
      "Progression après ≥1 ARPI; peu probable de bénéficier d’un autre ARPI",
      "Taxanes: généralement ≥2 régimes (ou 1 si cabazitaxel indisponible / non candidat)",
      "Radioligand PSMA: ≥1 dose (ou indisponible/non indiqué/non candidat)",
      "Castration chirurgicale ou ADT continue (à maintenir pendant l’étude)",
    ],

    primaryEndpoint: "Survie globale (OS) : temps randomisation → décès toute cause.",

    // À toi de mettre l'image si tu veux (sinon laisse vide)
     schemaSrc: ["/schemas/klk2_compas_schema.png"],
    protocolUrl: "/protocols/klk2_compas_protocol.pdf",

    nurse: {
      name: "Audrey Larouche et Julie Michaud", 
      phone: "#67707 et #67713",
    },
  },

  {
    id: "mevpro3",
    cancer: "Prostate",
    stage: "mHSPC",
    title: "MEVPRO-3 (C2321008)",
    phase: "Phase III",
    randomized: true,
    blinding: "Double-insu",

    designShort:
      "Mevrometostat + enzalutamide vs placebo + enzalutamide (mCSPC)",
    designFull:
      "Essai randomisé comparant mevrometostat + enzalutamide versus placebo + enzalutamide chez des patients avec cancer de la prostate métastatique sensible à la castration (mCSPC/mHSPC).",

    population:
      "Cancer de la prostate métastatique documenté (os et/ou tissus mous/viscéral) mCSPC; ADT initiée avant randomisation et poursuivie; pas de chimiothérapie cytotoxique ni ARPI antérieur pour mCSPC.",

    inclusion: [
      "Homme ≥18 ans",
      "Adénocarcinome de la prostate confirmé (petites cellules exclues)",
      "Maladie métastatique documentée (scintigraphie osseuse et/ou CT/MRI)",
      "ADT initiée avant randomisation et à poursuivre pendant l’étude (≤3 mois permis)",
      "Aucun ARPI antérieur pour mCSPC (enzalutamide/apalutamide/abiratérone/darolutamide)",
      "Aucune chimiothérapie cytotoxique antérieure pour mCSPC",
      "ECOG 0–1",
      "Résolution toxicités antérieures à grade ≤1 (sauf exceptions)",
    ],

    primaryEndpoint:
      "rPFS (BICR) : temps randomisation → progression radiographique (RECIST 1.1/PCWG3) ou décès.",

    schemaSrc: ["/schemas/mevpro3_schema.png"],
    protocolUrl: "/protocols/mevpro3_protocol.pdf",

    nurse: {
      name: "Joanie Deroy-Lambert et Julie Michaud",
      phone: "#67706 et #67713",
    },
  },

  // Placeholder MK-3120 (à compléter dès que tu veux; ou je l’extrais du PDF si tu me le confirmes)

{
    id: "mk3120",
    cancer: "Vessie",
    stage: "NMIBC",
    title: "MK-3120",
    phase: "Phase 1/2",
    randomized: false,
    blinding: "Open-label",
    suspended: false,

    designShort:
      "MK-3120 intravésical en monothérapie (HR NMIBC avec CIS ± papillaire)",

    designFull:
      "Étude interventionnelle de phase 1/2, multi-sites, à un seul bras, en ouvert, évaluant MK-3120 administré par voie intravésicale en induction hebdomadaire suivie d’une phase de maintenance mensuelle.",

   

    population:
      "Participants avec NMIBC à haut risque avec CIS (avec ou sans tumeur papillaire), BCG-naïfs ou BCG-exposés selon critères définis, traités par MK-3120 intravésical.",

    inclusion: [
      "CIS ± papillaire HR NMIBC confirmé histologiquement",
      "TURBT récente avec résection complète des lésions papillaires",
      "ECOG 0–2",
      "Fonction d’organes adéquate",
      "Consentement signé"
    ],

    
      primaryEndpoint: [
        "Dose-limiting toxicities (DLT)",
        "Incidence des événements indésirables (AEs)",
        "Arrêt du traitement lié aux AEs"
      ],
    

    cardHighlights: [
      "HR NMIBC",
      "Phase 1/2",
      "Intravésical"
    ],

    schemaSrc: ["/schemas/mk3120_schema.png"],
    protocolUrl: "/protocols/mk3120_protocol.pdf",

    nurse: {
      name: "Julie Deroy-Lambert et Julie Michaud",
      phone: "#67706 et #67713"
    }
  },


  // -------------------------
  // REIN
  // -------------------------

  {
    id: "socratic",
    cancer: "Rein",
    stage: "Localisé",
    title: "SOCRATIC",
    phase: "Observationnelle",
    randomized: false,
    blinding: "Open-label",

    designShort:
      "Cohorte prospective kystes rénaux complexes (Bosniak III–IV)",
    designFull:
      "Étude observationnelle prospective multicentrique portant sur les kystes rénaux complexes (classification Bosniak III–IV), avec suivi et collecte standardisée.",

    population: "Patients avec kystes rénaux complexes (Bosniak III–IV).",

    inclusion: [
      "Kyste rénal complexe Bosniak III ou IV",
      "Évaluation clinique/imagerie selon le protocole",
      "Consentement et suivi possible",
    ],

    primaryEndpoint:
      "À préciser selon ton synopsis SOCRATIC (ex: proportion de malignité / évolution / performance diagnostique).",

    // schemaSrc: ["/schemas/socratic_schema.png"],
    protocolUrl: "/protocols/socratic_protocol.pdf",

    nurse: {
      name: "Carole Plante",
      phone: "67712",
    },
  },

  // -------------------------
  // VESSIE
  // -------------------------

  {
    id: "ctdna-fgfr",
    cancer: "Vessie",
    stage: "Métastatique",
    title: "ctDNA-FGFR",
    phase: "Biomarqueur",
    randomized: false,
    blinding: "Open-label",

    designShort:
      "Biomarqueur: ctDNA FGFR comme test prédictif vs tissu (UC métastatique)",
    designFull:
      "Projet visant à évaluer si le ctDNA plasmatique reflète mieux le génotype métastatique predominant que le tissu primaire archivé, et à comparer le test ctDNA au test tissulaire FGFR (gold standard).",

    population:
      "Patients avec carcinome urothélial métastatique devant subir un test tissulaire FGFR et ayant un échantillon sanguin de base (maladie progressive, avant début de thérapie systémique).",

    inclusion: [
      "UC métastatique",
      "Test tissulaire FGFR prévu",
      "Échantillon sanguin baseline disponible (avant traitement systémique)",
      "Patients sur biobanque GU ou projets REB approuvés (avec ententes de transfert)",
    ],

    primaryEndpoint:
      "Objectif primaire: valeur diagnostique du ctDNA comparée au test tissulaire FGFR (gold standard).",

    // schemaSrc: ["/schemas/ctdna_fgfr_schema.png"],
    protocolUrl: "/protocols/ctdna_fgfr_protocol.pdf",

    nurse: {
      name: "Carol Plante",
      phone: "67712",
    },
  },

// ========== MK 5684_003 ==========


{
  id: "mk5684_003",
  cancer: "Prostate",
  stage: "mCRPC 2L",
  title: "MK-5684-003 (OMAHA-003)",
  phase: "Phase III",
  randomized: true,
  blinding: "Open-label",

  designShort: "Phase III randomisée : MK-5684 vs abiratérone ou enzalutamide (post-NHA + taxane)",
  designFull:
    "Étude de phase 3 randomisée, ouverte, comparant MK-5684 à un NHA alternatif (abiratérone acétate ou enzalutamide) chez des participants atteints de mCRPC déjà traités par 1 NHA et 1 à 2 chimiothérapies par taxane.",

  primaryEndpoint:
    "Survie globale (OS) : temps entre la randomisation et le décès (toutes causes).",

  population:
    "Participants ≥18 ans avec mCRPC (maladie métastatique M1) en progression sous ADT/castration, pré-traités par 1 NHA et 1 à 2 taxanes (mCRPC).",

  inclusion: [
    "Adénocarcinome de la prostate confirmé (sans histologie small cell)",
    "mCRPC en progression sous ADT/castration (progression PSA et/ou radiographique)",
    "Métastases à distance (M1) documentées (os et/ou tissus mous CT/MRI)",
    "Progression sous/ après 1 NHA (abiratérone, enzalutamide, apalutamide, darolutamide) avec durée minimale requise",
    "1 à 2 lignes de chimiothérapie par taxane pour mCRPC (progression pendant/après)",
    "Castration maintenue : testostérone < 50 ng/dL (<1.7 nM)",
    "Éligibilité/consentement selon exigences locales",
  ],

  // schéma (à fournir si tu en ajoutes un)
  schemaSrc: ["/schemas/mk5684_003_schema.png"],

  // PDF protocole complet (à mettre dans public/protocols)
  protocolUrl: "/protocols/mk5684_003_protocol.pdf",

  // contact (placeholder si inconnu)
  nurse: {
    name: "Audrey Larouche et Julie Michaud",
    phone: "#67707 et #67713",
  },

  // suspended: false, // si tu utilises le watermark “Suspendu”
},

// ===== MK 5684- 01A ==========

{
  id: "mk5684_01a",
  cancer: "Prostate",
  stage: "mCRPC 2L",
  title: "MK-5684-01A (OMAHA-01A)",
  phase: "Phase I/II",
  randomized: false, // (souvent “umbrella” avec bras; mets true seulement si randomisation explicite dans ton synopsis/site)
  blinding: "Open-label",

  designShort: "Umbrella Phase 1/2 : combinaisons à base de MK-5684 ou MK-5684 seul (mCRPC)",
  designFull:
    "Sous-étude umbrella de phase 1/2 (OMAHA-01A) évaluant la sécurité/tolérance et l’efficacité de traitements à base de MK-5684 (combinaisons ou monothérapie) chez des participants mCRPC, de la 1re à des lignes plus avancées, après 1 à 2 NHA et ≤1 taxane en mCRPC.",

  primaryEndpoint:
    "Phase d’efficacité : réponse PSA (baisse ≥50% vs baseline, confirmée ≥3 semaines plus tard, critères PCWG). (Safety lead-in : DLT, AEs, arrêt pour AE; établissement RP2D si applicable).",

  population:
    "Participants mCRPC (métastatique) en progression sous ADT/castration, pré-traités par 1 à 2 NHA (nmHSPC/mHSPC/nmCRPC/mCRPC) et ≤1 chimiothérapie par taxane en mCRPC.",

  inclusion: [
    "Adénocarcinome de la prostate confirmé (sans small cell)",
    "mCRPC en progression sous ADT/castration (PSA et/ou progression radiographique)",
    "Maladie métastatique documentée (os et/ou tissus mous CT/MRI)",
    "Traitement antérieur par 1 à 2 NHA (durée minimale requise) avec progression pendant/après le NHA le plus récent",
    "≤1 chimiothérapie par taxane pour mCRPC (progression pendant/après si reçu; certains patients peuvent être éligibles sans taxane mCRPC selon le protocole)",
    "Castration maintenue : testostérone < 50 ng/dL (<1.7 nM)",
    "Éligibilité/consentement selon exigences locales",
  ],

  schemaSrc: ["/schemas/mk5684_01a_schema.png"],

  protocolUrl: "/protocols/mk5684_01a_protocol.pdf",

  nurse: {
    name: "Ariane Bolduc-Labrie et Julie Michaud",
    phone: "#67699 et #67713",
  },

  // suspended: false,
},

{
  id: "prodigy2",
  cancer: "Prostate",
  stage: "mCRPC",
  title: "PRODIGY-2",
  phase: "Pilote (dosimétrie) / Phase I-II",
  randomized: true,
  blinding: "Open-label",

  designShort:
    "177Lu-PSMA-617 : dosimétrie rénale personnalisée vs activité fixe (2 bras)",
  designFull:
    "Étude pilote randomisée, ouverte, comparant un schéma de 177Lu-PSMA-617 basé sur une dose rénale standardisée (dosimétrie) versus un schéma empirique à activité fixe chez des patients atteints de mCRPC.",

  population:
    "Adultes avec adénocarcinome de la prostate métastatique résistant à la castration (mCRPC) avec PSMA-PET positif, progression (PCWG3), et traitement antérieur par ≥1 ARPI.",

  inclusion: [
    "Âge ≥ 18 ans, adénocarcinome prostatique métastatique documenté",
    "mCRPC (progression malgré castration; testostérone ≤ 1.7 nmol/L)",
    "Progression PSA (PCWG3) + PSA ≥ 5 ng/mL",
    "Traitement antérieur par ≥ 1 ARPI",
    "PSMA-PET positif (SUV d’au moins 1 lésion > SUV moyen du foie) ≤ 45 jours",
    "ECOG 0–2",
    "eGFR (CKD-EPI) ≥ 45 mL/min/1.73m²",
    "Plaquettes ≥ 100×10⁹/L, ANC ≥ 1.5×10⁹/L, Hb ≥ 90 g/L",
  ],

  primaryEndpoint:
    "1) Comparaison de l’activité cumulée administrée (objectif atteint si ≥20/30 en bras dosimétrie reçoivent une activité cumulée ou par cycle supérieure à la moyenne du bras activité fixe). 2) Sécurité: taux d’AESI subaigus (≤6/30 par bras; thrombopénie G3-4 >12 sem ou neutropénie G3-4 >12 sem, liées au traitement).",

  schemaSrc: ["/schemas/prodigy2_schema.png"],
  protocolUrl: "/protocols/prodigy2_protocol.pdf",

  nurse: {
    name: "Marie-Christine Dubé", // à compléter
    phone: "#67708", // à compléter
  },

  // suspended: false,
},

{
  id: "pcr3003",
  cancer: "Prostate",
  stage: "mCRPC",
  title: "Pasritamig + Docetaxel (PCR3003)",
  phase: "Phase III",
  randomized: true,
  blinding: "Open-label",

  designShort:
    "Pasritamig (JNJ-78278343, anti-hK2) + docetaxel vs docetaxel",
  designFull:
    "Étude de phase III, randomisée 1:1, ouverte, comparant pasritamig (agent redirigeant les cellules T ciblant hK2) + docetaxel versus docetaxel seul chez des participants avec mCRPC ayant progressé sous ≥1 ARPI.",

  population:
    "Adultes avec adénocarcinome prostatique mCRPC métastatique, progression documentée, sous ADT (ou orchiectomie), ayant progressé après ≥1 ARPI (≤2 ARPI au total).",

  inclusion: [
    "Âge ≥ 18 ans",
    "Adénocarcinome prostatique confirmé (exclut phénotypes NE/sarcome)",
    "Maladie métastatique au screening",
    "Progression: PSA (≥2 ng/mL avec hausses successives) et/ou progression radio/bone scan (RECIST/PCWG3)",
    "ADT en cours ou orchiectomie + testostérone ≤ 50 ng/dL (≤1.73 nmol/L)",
    "Progression après ≥1 ARPI (max 2 ARPI) et ARPI cessé avant randomisation",
    "ECOG 0–1",
    "eGFR > 30 mL/min (CKD-EPI)",
  ],

  primaryEndpoint:
    "rPFS (survie sans progression radiographique) évaluée par revue centrale indépendante (BICR) : temps entre randomisation et progression radiographique (CT/MRI ou bone scan selon PCWG3/RECIST v1.1) ou décès, selon le premier évènement.",

  schemaSrc: ["/schemas/pcr3003_schema.png"],
  protocolUrl: "/protocols/pcr3003_protocol.pdf",

  nurse: {
    name: "Audrey Larouche et Julie Michaud", // à compléter
    phone: "#67707 et #67713", // à compléter
  },

  // suspended: false,
},

{
  id: "bicabca",
  cancer: "Vessie",
  stage: "NMIBC",
  title: "BicaBCa",
  phase: "Phase II",
  randomized: true,
  blinding: "Double-insu", // (cohorte B placebo); si tu préfères: "Open-label" à cause de la cohorte A SOC vs bicalutamide

  designShort:
    "Bicalutamide 150 mg + BCG vs BCG (± placebo selon cohorte)",
  designFull:
    "Essai de phase II randomisé chez des patients recevant une induction de BCG pour NMIBC. Après screening, randomisation vers: (A) BCG SOC vs bicalutamide 150 mg 90 jours + BCG SOC, et/ou (B) bicalutamide 90 jours + BCG SOC vs placebo 90 jours + BCG SOC.",

  population:
    "Hommes adultes avec carcinome urothélial vésical non infiltrant le muscle (NMIBC), pour lesquels une induction de BCG intravésical est recommandée.",

  inclusion: [
    "Homme ≥ 18 ans, consentement éclairé",
    "NMIBC urothélial confirmé histologiquement",
    "Recommandé pour une induction BCG intravésicale par l’urologue",
    "Instillation postop immédiate (gemcitabine/épirubicine/mitomycine C) permise",
    "Si partenaire en âge de procréer: contraception (2 méthodes) pendant et 130 jours après",
  ],

  primaryEndpoint:
    "Temps jusqu’à la récidive de cancer de vessie (récidive = carcinome urothélial confirmé pathologiquement par biopsie ou résection; datée à la cystoscopie ayant mené à la biopsie/chirurgie).",

  schemaSrc: ["/schemas/bicabca_schema.png"],
  protocolUrl: "/protocols/bicabca_protocol.pdf",

  nurse: {
    name: "Catherine Gérard", // à remplacer par infirmière/coordo si tu veux
    phone: "#67704", // à compléter
  },

  // suspended: false,
},

{
  id: "ascertain",
  cancer: "Prostate",
  stage: "Localisé",
  title: "ASCERTAIN",
  phase: "Phase I",
  randomized: true,
  blinding: "Open-label",

  designShort:
    "Saruparib (AZD5305) ± darolutamide avant prostatectomie (window-of-opportunity)",
  designFull:
    "Étude randomisée, ouverte, de type window-of-opportunity chez des participants avec cancer de la prostate localisé (risque défavorable/intermédiaire à très haut risque) candidats à prostatectomie radicale, évaluant l’effet pharmacodynamique de saruparib ± darolutamide (avec bras sans traitement possible selon critères).",

  population:
    "Hommes ≥18 ans avec cancer de la prostate localisé à risque défavorable/intermédiaire, haut risque ou très haut risque (NCCN), jugés candidats à prostatectomie radicale.",

  inclusion: [
    "Homme ≥ 18 ans",
    "Candidat à prostatectomie radicale selon investigateur",
    "Cancer de la prostate localisé (UIR/haut/très haut risque selon NCCN)",
    "Fonction hématologique/hépatique/rénale adéquate (ex: CrCl ≥45 mL/min)",
    "Consentement éclairé signé",
    "Échantillon tumoral FFPE disponible (ou biopsie fraîche pré-traitement)",
  ],

  primaryEndpoint:
    "Variation (fold change) du pourcentage de cellules tumorales γH2AX-positives entre la biopsie de base et l’échantillon de prostatectomie radicale.",

  schemaSrc: ["/schemas/ascertain_schema.png"],
  protocolUrl: "/protocols/ascertain_protocol.pdf",

  nurse: {
    name: "Joanie Deroy-Lambert", // à compléter
    phone: "#67706", // à compléter
  },

  // suspended: false,
},

{
  id: "xalute",
  cancer: "Prostate",
  stage: "mCRPC 2L",
  title: "XALute (Xaluritamig AMG 509)",
  phase: "Phase III",
  randomized: true,
  blinding: "Open-label",

  // endpoint primaire (tu voulais l’ajouter)
  primaryEndpoint: "Overall survival (OS)",

  designShort: "Phase 3 randomisée : xaluritamig vs cabazitaxel ou 2e ARDT (post-taxane)",
  designFull:
    "Étude de phase III, multicentrique, randomisée, en ouvert, comparant xaluritamig (AMG 509) à un traitement au choix de l’investigateur (cabazitaxel ou 2e thérapie dirigée contre le récepteur des androgènes [abiratérone/enzalutamide]) chez des patients avec mCRPC progressive précédemment traités par chimiothérapie.",

  population:
    "Adultes (≥18 ans) avec adénocarcinome de la prostate mCRPC progressive, maladie métastatique documentée (≥1 lésion métastatique confirmée sur CT/MRI ou scintigraphie osseuse dans les 28 jours), sous castration (orchidectomie et/ou ADT continue avec testostérone <50 ng/dL), progression après ≥1 ARDT, et ayant reçu 1 seule ligne de taxane dans le contexte mCRPC.",

  inclusion: [
    "≥18 ans + consentement éclairé",
    "Adénocarcinome de la prostate confirmé (histologie/pathologie/cytologie) — pas d’histologie mixte neuroendocrine",
    "mCRPC avec ≥1 lésion métastatique confirmée à l’imagerie de baseline (CT/MRI ou scintigraphie osseuse) dans les 28 jours",
    "Maladie progressive selon ≥1 critère PCWG3 (PSA, tissus mous, ou os [2+2])",
    "Orchidectomie et/ou ADT continue avec testostérone <50 ng/dL (<1.7 nmol/L)",
    "Progression antérieure sous ≥1 ARDT (enzalutamide, abiratérone, apalutamide, darolutamide)",
    "Traitement antérieur par 1 seule chimiothérapie taxane dans le contexte mCRPC (docétaxel en mHSPC permis en plus)",
    "ECOG 0–1 (et fonction d’organe adéquate / espérance de vie ≥12 semaines)",
  ],

  // schéma (tu ajoutes l'image toi-même dans public/schemas)
  schemaSrc: ["/schemas/xalute_schema.png"],

  // protocole complet (tu mets le PDF toi-même dans public/protocols)
  protocolUrl: "/protocols/xalute_protocol.pdf",

  // contact (placeholder)
  nurse: {
    name: "Ariane Bolduc-Labrie",
    phone: "#67699",
  },

  // suspended: false, // optionnel
}

];
