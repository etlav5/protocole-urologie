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
  designShort: string;
  designFull: string;
  population: string;
  inclusion: string[];
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
      "Étude de phase I randomisée évaluant un traitement préopératoire avant prostatectomie radicale.",
    population: "Cancer prostate localisé à risque intermédiaire et à haut risque.",
    inclusion: ["Cancer localisé", "Candidat chirurgie"],
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
    designFull: "Étude de phase III randomisée SBRT + thérapie PSMA.",
    population: "BCR oligométastatique PET PSMA positif.",
    inclusion: ["≤5 lésions"],
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
    designShort: "TAR-200 ± immunothérapie",
    designFull: "Phase III comparant TAR-200 ± IO vs BCG.",
    population: "NMIBC à haut risque.",
    inclusion: ["HR-NMIBC"],
    schemaSrc: [
      "/schemas/sunrise3_schema1.png",
      "/schemas/sunrise3_schema2.png",
    ],
  },

  {
    id: "volga",
    cancer: "Vessie",
    stage: "MIBC",
    title: "VOLGA",
    phase: "Phase III",
    randomized: true,
    blinding: "Open-label",
    designShort: "Néoadjuvant IO + EV",
    designFull: "Phase III néoadjuvante avant cystectomie.",
    population: "MIBC stade II-III.",
    inclusion: ["Candidat cystectomie"],
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
    designShort: "Adjuvant mRNA-4157",
    designFull: "Phase II adjuvante vaccin + pembrolizumab.",
    population: "RCC post-néphrectomie.",
    inclusion: ["RCC"],
    schemaSrc: ["/schemas/v940004_schema.png"],
  },

  {
    id: "socratic",
    cancer: "Rein",
    stage: "Localisé",
    title: "SOCRATIC",
    phase: "Observationnelle",
    randomized: false,
    designShort: "Cohorte prospective kystes Bosniak",
    designFull: "Cohorte prospective multicentrique Bosniak III-IV.",
    population: "Kystes rénaux complexes.",
    inclusion: ["Bosniak III-IV"],
  },
];

function Modal({ open, onClose, children }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}/>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-3">✕</button>
        <div className="max-h-[75vh] overflow-y-auto pr-2">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeCancer,setActiveCancer]=useState<Cancer>("Prostate");
  const [activeStage,setActiveStage]=useState("Localisé");
  const [selected,setSelected]=useState<any>(null);
  const [zoom,setZoom]=useState<string|null>(null);

  const stages=timelineByCancer[activeCancer];

  const filtered=useMemo(()=>{
    return protocols.filter(
      p=>p.cancer===activeCancer && p.stage===activeStage
    );
  },[activeCancer,activeStage]);

  return(
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* TITRE */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Protocoles de recherche en urologie
        </h1>
        <p className="text-gray-500 mt-2">
          Outil interne de visualisation des études cliniques
        </p>
      </div>

      {/* onglets */}
      <div className="flex gap-3 mb-6">
        {(["Prostate","Vessie","Rein"] as Cancer[]).map(c=>(
          <button
            key={c}
            onClick={()=>{setActiveCancer(c);setActiveStage(timelineByCancer[c][0])}}
            className={`px-4 py-2 rounded-xl ${
              c===activeCancer?"bg-black text-white":"bg-white shadow"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* timeline */}
      <div className="mb-10">
        <div className="relative flex justify-between items-center">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-300"/>
          {stages.map((s)=>(
            <div key={s} className="flex flex-col items-center z-10">
              <button
                onClick={()=>setActiveStage(s)}
                className={`w-6 h-6 rounded-full border-4 ${
                  s===activeStage
                    ? "bg-black border-black"
                    : "bg-white border-gray-400"
                }`}
              />
              <div className="text-xs mt-2">{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* cartes */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map(p=>(
          <button
            key={p.id}
            onClick={()=>setSelected(p)}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-left border"
          >
            <div className="flex justify-between mb-2">
              <div className="text-lg font-semibold">{p.title}</div>
              {p.randomized && (
                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                  Randomisée
                </span>
              )}
            </div>

            <div className="text-sm text-gray-700 mb-2">
              {p.designShort}
            </div>

            <div className="flex gap-2 flex-wrap">
              {p.phase && (
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                  {p.phase}
                </span>
              )}

              {p.blinding && (
                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                  {p.blinding}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* modal */}
      <Modal open={!!selected} onClose={()=>setSelected(null)}>
        {selected && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">{selected.title}</h2>

            {selected.schemaSrc?.map((src:string)=>(
              <img
                key={src}
                src={src}
                className="rounded-xl border cursor-zoom-in"
                onClick={()=>setZoom(src)}
              />
            ))}

            <div>
              <b>Devis</b>
              <p>{selected.designFull}</p>
            </div>

            <div>
              <b>Population</b>
              <p>{selected.population}</p>
            </div>

            <div>
              <b>Critères d’inclusion</b>
              <ul className="list-disc pl-6">
                {selected.inclusion.map((i:string)=>(
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!zoom} onClose={()=>setZoom(null)}>
        {zoom && <img src={zoom} className="rounded-xl"/>}
      </Modal>

    </div>
  )
}
