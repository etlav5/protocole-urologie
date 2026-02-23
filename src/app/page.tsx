"use client";
import React, { useMemo, useState } from "react";

type Cancer = "Prostate" | "Vessie" | "Rein";

type Protocol = {
  id: string;
  cancer: Cancer;
  stage: string;

  title: string;
  phase?: string;
  randomized?: boolean;
  blinding?: "Open-label" | "Double-insu";

  // Contenu
  designShort: string; // carte
  designFull: string;  // modal (plus détaillé)
  populationShort: string; // carte
  populationFull: string;  // modal (plus détaillé)

  inclusion: string[]; // 8–12 idéalement
  exclusion?: string[]; // 3–6
  endpoints?: { primary?: string[]; secondary?: string[] };

  // Carte
  cardHighlights?: string[]; // 2–4 bullets

  // Images
  schemaSrc?: string[];
};

const timelineByCancer: Record<Cancer, string[]> = {
  Prostate: ["Localisé", "BCR", "M0CRPC", "mHSPC", "mCRPC"],
  Vessie: ["NMIBC", "NMIBC post-BCG", "MIBC", "Métastatique"],
  Rein: ["Localisé", "Métastatique"],
};

const protocols: Protocol[] = [
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
    cardHighlights: [
      "Randomisée",
      "Pré-op (window-of-opportunity)",
      "Tissus opératoires / biomarqueurs",
    ],
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
    populationShort:
      "BCR oligométastatique PSMA+ (≤5 lésions).",
    populationFull:
      "Participants avec récidive biochimique (BCR) et maladie oligométastatique PSMA positive (ex. PET PSMA) avec un nombre limité de lésions. Le protocole précise les seuils PSA, les exigences d’imagerie et les traitements antérieurs autorisés.",
    inclusion: [
      "Récidive biochimique après traitement local (selon définitions protocole)",
      "Imagerie PSMA démontrant maladie oligométastatique",
      "Nombre de lésions ≤5 (selon protocole)",
      "Éligible SBRT (sites accessibles)",
      "Fonction hématologique / rénale / hépatique adéquate (selon protocole)",
      "Autres critères spécifiques (PSA/ADT/traitements antérieurs) à détailler",
    ],
    cardHighlights: ["Randomisée", "≤5 lésions", "Imagerie PSMA requise"],
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
      "Étude de phase III randomisée évaluant TAR-200 (± immunothérapie) versus BCG chez des patients avec NMIBC à haut risque (BCG-naïf selon version du protocole). Le protocole définit précisément les catégories HR, le schéma d’administration et les évaluations (cystoscopie, cytologie, biopsies).",
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
    designShort: "Néoadjuvant IO + EV → chirurgie → adjuvant",
    designFull:
      "Étude de phase III évaluant une stratégie péri-opératoire chez des patients avec cancer de la vessie infiltrant le muscle (MIBC). Le schéma inclut un traitement néoadjuvant (immunothérapie ± enfortumab vedotin selon bras), suivi d’une cystectomie, puis un traitement adjuvant selon protocole.",
    populationShort:
      "MIBC stade II–IIIA, candidat cystectomie; inéligible/refus cisplatine.",
    populationFull:
      "Participants avec carcinome urothélial / TCC de la vessie, stade II à IIIA (AJCC 8e), sans thérapie systémique antérieure pour TCC/UC, médicalement aptes à la cystectomie, aptes à recevoir un traitement néoadjuvant, et inéligibles ou refusant le cisplatine.",
    inclusion: [
      "Carcinome urothélial/TCC de la vessie documenté histologiquement/cytologiquement",
      "Stade II à IIIA (ex. T2–T4a N0/1 M0 selon protocole)",
      "Aucune thérapie systémique antérieure pour UC/TCC",
      "Candidat à cystectomie (fitness chirurgical)",
      "Apte à recevoir un traitement néoadjuvant",
      "Inéligible au cisplatine OU refuse le cisplatine",
      "Critères de fonction organique adéquats (selon protocole)",
      "Autres critères spécifiques (ECOG, labs, etc. selon protocole)",
    ],
    exclusion: [
      "Métastases à distance (M1)",
      "Traitement systémique antérieur pour UC/TCC (selon protocole)",
      "Contre-indication majeure à chirurgie ou traitement d’étude (selon protocole)",
    ],
    endpoints: {
      primary: ["(selon protocole) ex. événement de survie sans progression / pathCR, etc."],
      secondary: ["(selon protocole) ex. OS, DSS, sécurité, QoL, etc."],
    },
    cardHighlights: ["Péri-op (néo→chir→adj)", "MIBC II–IIIA", "Cisplatine inéligible/refus"],
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
    designShort: "Adjuvant mRNA-4157 + pembrolizumab",
    designFull:
      "Étude de phase II randomisée, en double-insu, évaluant un vaccin personnalisé mRNA-4157 (V940) combiné à pembrolizumab en adjuvant versus contrôle (selon protocole) après néphrectomie pour RCC à risque de récidive.",
    populationShort: "RCC post-néphrectomie (adjuvant).",
    populationFull:
      "Participants ayant subi une chirurgie (néphrectomie) pour RCC et présentant un risque de récidive selon critères du protocole. Randomisation en post-op, traitement adjuvant sur une période définie, suivi oncologique.",
    inclusion: [
      "RCC confirmé (selon histologie incluse)",
      "Chirurgie (néphrectomie) complétée",
      "Statut de risque de récidive admissible (selon protocole)",
      "Fonction organique adéquate (selon protocole)",
      "Absence de contre-indication à immunothérapie (selon protocole)",
      "Consentement éclairé signé",
      "Autres critères spécifiques du protocole",
    ],
    exclusion: [
      "Maladie métastatique (selon protocole)",
      "Auto-immun actif nécessitant immunosuppression (selon protocole)",
      "Autre contre-indication majeure à pembrolizumab / vaccin (selon protocole)",
    ],
    cardHighlights: ["Double-insu", "Adjuvant post-néphrectomie", "V940 + pembro"],
    schemaSrc: ["/schemas/v940004_schema.png"],
  },

  {
    id: "socratic",
    cancer: "Rein",
    stage: "Localisé",
    title: "SOCRATIC",
    phase: "Observationnelle",
    randomized: false,
    designShort: "Cohorte prospective (kystes Bosniak III–IV)",
    designFull:
      "Étude observationnelle prospective évaluant l’évolution, les stratégies de prise en charge et les issues cliniques de kystes rénaux complexes (Bosniak III–IV) selon protocoles de suivi et décisions thérapeutiques.",
    populationShort: "Kystes rénaux complexes Bosniak III–IV.",
    populationFull:
      "Participants avec kystes rénaux complexes classés Bosniak III ou IV, avec caractéristiques et tailles selon protocole. Suivi prospectif avec imagerie, événements cliniques et interventions selon pratique.",
    inclusion: [
      "Kyste rénal Bosniak III ou IV",
      "Taille/critères selon protocole (ex. ≤7 cm si applicable)",
      "Capacité à assurer le suivi d’imagerie",
      "Consentement éclairé",
      "Autres critères spécifiques du protocole",
    ],
    exclusion: [
      "Contre-indication majeure aux examens de suivi (selon protocole)",
      "Autre condition rendant le suivi impossible",
    ],
    cardHighlights: ["Observationnelle", "Bosniak III–IV", "Suivi prospectif"],
  },
];

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-3xl p-6 relative border border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-gray-700 dark:text-gray-200"
          aria-label="Fermer"
        >
          ✕
        </button>
        <div className="max-h-[75vh] overflow-y-auto pr-2 text-gray-900 dark:text-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeCancer, setActiveCancer] = useState<Cancer>("Prostate");
  const [activeStage, setActiveStage] = useState(timelineByCancer["Prostate"][0]);
  const [selected, setSelected] = useState<Protocol | null>(null);
  const [zoom, setZoom] = useState<string | null>(null);

  const stages = timelineByCancer[activeCancer];

  const filtered = useMemo(() => {
    return protocols
      .filter((p) => p.cancer === activeCancer && p.stage === activeStage)
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [activeCancer, activeStage]);

  const cardInclusionPreview = (p: Protocol) => p.inclusion.slice(0, 2);

  return (
    <div className="p-8 min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* TITRE */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Protocoles de recherche en urologie</h1>
        <p className="mt-2 text-gray-800 dark:text-gray-200">
          Outil interne de visualisation des études cliniques
        </p>
      </div>

      {/* onglets */}
      <div className="flex gap-3 mb-6">
        {(["Prostate", "Vessie", "Rein"] as Cancer[]).map((c) => (
          <button
            key={c}
            onClick={() => {
              setActiveCancer(c);
              setActiveStage(timelineByCancer[c][0]);
            }}
            className={`px-4 py-2 rounded-xl border ${
              c === activeCancer
                ? "bg-black text-white border-black"
                : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* timeline */}
      <div className="mb-10">
        <div className="relative flex justify-between items-center">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-700" />
          {stages.map((s) => (
            <div key={s} className="flex flex-col items-center z-10">
              <button
                onClick={() => setActiveStage(s)}
                className={`w-6 h-6 rounded-full border-4 ${
                  s === activeStage
                    ? "bg-black border-black"
                    : "bg-white dark:bg-gray-950 border-gray-500 dark:border-gray-400"
                }`}
                aria-label={`Choisir stade ${s}`}
              />
              <div className="text-xs mt-2 text-gray-900 dark:text-gray-100">{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* cartes */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-xl transition text-left border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between mb-2">
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {p.title}
              </div>
              {p.randomized && (
                <span className="bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-100 text-xs px-2 py-1 rounded">
                  Randomisée
                </span>
              )}
            </div>

            <div className="text-sm text-gray-900 dark:text-gray-100 mb-2">
              {p.designShort}
            </div>

            <div className="text-sm text-gray-800 dark:text-gray-200 mb-3">
              {p.populationShort}
            </div>

            {/* mini-aperçu inclusion */}
            <div className="text-xs text-gray-900 dark:text-gray-100">
              <div className="font-semibold mb-1">Critères clés</div>
              <ul className="list-disc pl-5">
                {cardInclusionPreview(p).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>

            {/* badges */}
            <div className="flex gap-2 flex-wrap mt-4">
              {p.phase && (
                <span className="bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-100 text-xs px-2 py-1 rounded">
                  {p.phase}
                </span>
              )}
              {p.blinding && (
                <span className="bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-100 text-xs px-2 py-1 rounded">
                  {p.blinding}
                </span>
              )}
              {p.cardHighlights?.map((h) => (
                <span
                  key={h}
                  className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 text-xs px-2 py-1 rounded"
                >
                  {h}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{selected.title}</h2>
              <div className="flex gap-2 flex-wrap">
                {selected.phase && (
                  <span className="bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-100 text-xs px-2 py-1 rounded">
                    {selected.phase}
                  </span>
                )}
                {selected.randomized && (
                  <span className="bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-100 text-xs px-2 py-1 rounded">
                    Randomisée
                  </span>
                )}
                {selected.blinding && (
                  <span className="bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-100 text-xs px-2 py-1 rounded">
                    {selected.blinding}
                  </span>
                )}
              </div>
            </div>

            {selected.schemaSrc?.length ? (
              <div className="space-y-3">
                <div className="font-semibold">Schéma(s) de l’étude</div>
                {selected.schemaSrc.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Schéma - ${selected.title}`}
                    className="rounded-xl border border-gray-200 dark:border-gray-700 cursor-zoom-in"
                    onClick={() => setZoom(src)}
                  />
                ))}
                <div className="text-xs text-gray-800 dark:text-gray-200">
                  Astuce : clique sur une image pour zoomer.
                </div>
              </div>
            ) : null}

            <div className="space-y-2">
              <div className="text-lg font-semibold">Devis (détails)</div>
              <p className="text-gray-900 dark:text-gray-100 whitespace-pre-line">
                {selected.designFull}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-lg font-semibold">Population (détails)</div>
              <p className="text-gray-900 dark:text-gray-100 whitespace-pre-line">
                {selected.populationFull}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-lg font-semibold">Critères d’inclusion</div>
              <ul className="list-disc pl-6 text-gray-900 dark:text-gray-100 space-y-1">
                {selected.inclusion.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>

            {selected.exclusion?.length ? (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Exclusions majeures</div>
                <ul className="list-disc pl-6 text-gray-900 dark:text-gray-100 space-y-1">
                  {selected.exclusion.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {selected.endpoints?.primary?.length || selected.endpoints?.secondary?.length ? (
              <div className="space-y-4">
                <div className="text-lg font-semibold">Endpoints</div>
                {selected.endpoints?.primary?.length ? (
                  <div>
                    <div className="font-semibold">Primary</div>
                    <ul className="list-disc pl-6 space-y-1">
                      {selected.endpoints.primary.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {selected.endpoints?.secondary?.length ? (
                  <div>
                    <div className="font-semibold">Secondary</div>
                    <ul className="list-disc pl-6 space-y-1">
                      {selected.endpoints.secondary.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        )}
      </Modal>

      <Modal open={!!zoom} onClose={() => setZoom(null)}>
        {zoom && <img src={zoom} alt="Schéma (zoom)" className="rounded-xl" />}
      </Modal>
    </div>
  );
}

