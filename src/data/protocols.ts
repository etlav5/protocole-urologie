export type Cancer = "Prostate" | "Vessie" | "Rein";

export type NurseInfo = {
  name?: string;
  phone?: string;
};

export type Protocol = {
  id: string;
  cancer: Cancer;
  stage: string;

  title: string;
  phase?: string;
  randomized?: boolean;
  blinding?: "Open-label" | "Double-insu";

  suspended?: boolean;

  designShort: string;
  designFull: string;

  populationShort: string;
  populationFull: string;

  inclusion: string[];
  exclusion?: string[];

  endpoints?: {
    primary?: string[];
    secondary?: string[];
  };

  cardHighlights?: string[];

  schemaSrc?: string[];
  protocolPdf?: string;

  nurse?: NurseInfo;
};

export const timelineByCancer: Record<Cancer, string[]> = {
  Prostate: ["Localisé", "BCR", "M0CRPC", "mHSPC", "mCRPC"],
  Vessie: ["NMIBC", "NMIBC post-BCG", "MIBC", "Métastatique"],
  Rein: ["Localisé", "Métastatique"],
};

export const protocols: Protocol[] = [

  // =========================
  // 4TMPO
  // =========================
  {
    id: "4tmpo",
    cancer: "Prostate",
    stage: "mCRPC",
    title: "4TMPO",
    phase: "Observationnelle",
    randomized: false,
    blinding: "Open-label",
    suspended: false,

    designShort:
      "Imagerie PET multi-traceurs à 4 temps pour caractériser l’hétérogénéité métastatique",

    designFull:
      "Étude multicentrique observationnelle prospective visant à caractériser l’hétérogénéité inter-métastatique chez des patients mCRPC à l’aide d’imagerie PET multi-traceurs avec plusieurs temps de mesure.",

    populationShort:
      "mCRPC avec ≥3 métastases après ARPI, candidats taxane ou PSMA-RLT",

    populationFull:
      "Patients atteints d’un cancer de la prostate résistant à la castration métastatique (mCRPC), présentant au moins trois métastases documentées à l’imagerie, après traitement par ARPI, et candidats à une chimiothérapie par taxane ou à une thérapie PSMA-radioligand.",

    inclusion: [
      "≥18 ans",
      "Adénocarcinome prostatique confirmé",
      "≥3 métastases actives documentées",
      "CRPC sous castration continue",
      "Post-ARPI",
      "Éligible taxane ou PSMA-RLT",
      "Consentement signé"
    ],

    endpoints: {
      primary: [
        "Caractérisation de l’hétérogénéité inter-métastatique par imagerie PET multi-traceurs",
        "Corrélation des profils d’imagerie avec phénotypes biologiques"
      ]
    },

    cardHighlights: [
      "Imagerie PET multi-traceurs",
      "Observationnelle",
      "mCRPC"
    ],

    schemaSrc: ["/schemas/4tmpo_schema.png"],
    protocolPdf: "/protocols/4tmpo_protocol.pdf",

    nurse: {
      name: "Marie-Christine Dubé, PhD",
      phone: "418-525-4444 poste 67708"
    }
  },

  // =========================
  // MK-3120
  // =========================
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

    populationShort:
      "HR NMIBC avec CIS ± papillaire, BCG-naïf ou BCG-exposé",

    populationFull:
      "Participants avec NMIBC à haut risque avec CIS (avec ou sans tumeur papillaire), BCG-naïfs ou BCG-exposés selon critères définis, traités par MK-3120 intravésical.",

    inclusion: [
      "CIS ± papillaire HR NMIBC confirmé histologiquement",
      "TURBT récente avec résection complète des lésions papillaires",
      "ECOG 0–2",
      "Fonction d’organes adéquate",
      "Consentement signé"
    ],

    endpoints: {
      primary: [
        "Dose-limiting toxicities (DLT)",
        "Incidence des événements indésirables (AEs)",
        "Arrêt du traitement lié aux AEs"
      ]
    },

    cardHighlights: [
      "HR NMIBC",
      "Phase 1/2",
      "Intravésical"
    ],

    schemaSrc: ["/schemas/mk3120_schema.png"],
    protocolPdf: "/protocols/mk3120_protocol.pdf",

    nurse: {
      name: "",
      phone: ""
    }
  },

  // =========================
  // SOCRATIQUE
  // =========================
  {
    id: "socratique",
    cancer: "Rein",
    stage: "Localisé",
    title: "SOCRATIQUE",
    phase: "Observationnelle",
    randomized: false,
    blinding: "Open-label",
    suspended: false,

    designShort:
      "Cohorte prospective sur kystes rénaux Bosniak III–IV",

    designFull:
      "Étude observationnelle prospective multicentrique évaluant l’évolution clinique et les décisions thérapeutiques chez des patients présentant des kystes rénaux complexes Bosniak III ou IV.",

    populationShort:
      "Kystes rénaux Bosniak III–IV",

    populationFull:
      "Participants avec kystes rénaux complexes classifiés Bosniak III ou IV, suivis prospectivement pour évaluer les stratégies de prise en charge et les outcomes cliniques.",

    inclusion: [
      "Kyste rénal Bosniak III ou IV confirmé",
      "Imagerie compatible avec classification Bosniak III–IV",
      "Capacité à assurer le suivi clinique et radiologique",
      "Consentement signé"
    ],

    endpoints: {
      primary: [
        "Évolution vers malignité confirmée histologiquement",
        "Décision thérapeutique (surveillance vs intervention)",
        "Taux de progression radiologique"
      ]
    },

    cardHighlights: [
      "Bosniak III–IV",
      "Observationnelle",
      "Rein"
    ],

    schemaSrc: ["/schemas/socratique_schema.png"],
    protocolPdf: "/protocols/socratique_protocol.pdf",

    nurse: {
      name: "",
      phone: ""
    }
  }

];
