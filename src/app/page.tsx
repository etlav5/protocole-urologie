"use client";
import React, { useMemo, useState } from "react";
import {
  protocols,
  timelineByCancer,
  type Cancer,
  type Protocol,
} from "../data/protocols";

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
  const [activeStage, setActiveStage] = useState(
    timelineByCancer["Prostate"][0]
  );
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
        <h1 className="text-3xl font-bold">
          Protocoles de recherche en urologie
        </h1>
        <p className="mt-2 text-gray-800 dark:text-gray-200">
          Outil interne de visualisation des études cliniques
        </p>
      </div>

      {/* ONGLETS */}
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

      {/* TIMELINE */}
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
              <div className="text-xs mt-2 text-gray-900 dark:text-gray-100">
                {s}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARTES */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-xl transition text-left border border-gray-200 dark:border-gray-700"
          >
            {/* WATERMARK SUSPENDU */}
            {(p as any).suspended && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-red-700/35 dark:text-red-300/25 rotate-[-20deg] select-none">
                  Suspendu
                </div>
              </div>
            )}

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
              {"populationShort" in p ? (p as any).populationShort : ""}
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

            {/* Infirmière responsable */}
            <div className="mt-3 text-xs text-gray-700 dark:text-gray-300">
              <div className="font-semibold">Infirmière responsable</div>
              <div>
                {(p as any).nurse?.name ? (p as any).nurse.name : "À déterminer"}
              </div>
              <div>{(p as any).nurse?.phone ? (p as any).nurse.phone : ""}</div>
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
              {(p as any).cardHighlights?.map((h: string) => (
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

      {/* MODAL PROTOCOLE */}
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
                {(selected as any).suspended && (
                  <span className="bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-100 text-xs px-2 py-1 rounded">
                    Recrutement suspendu
                  </span>
                )}
              </div>
            </div>

            {/* Coordination */}
            <div className="space-y-1">
              <div className="text-lg font-semibold">Coordination</div>
              <div className="text-gray-900 dark:text-gray-100">
                {(selected as any).nurse?.name
                  ? (selected as any).nurse.name
                  : "À déterminer"}
              </div>
              {(selected as any).nurse?.phone && (
                <div className="text-gray-800 dark:text-gray-200">
                  Téléphone : {(selected as any).nurse.phone}
                </div>
              )}
            </div>

            {/* Lien protocole complet */}
            {(selected as any).protocolUrl && (
              <div>
                <a
                  href={(selected as any).protocolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                >
                  Télécharger le protocole complet (PDF)
                </a>
              </div>
            )}

            {/* Schémas */}
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

            {/* Devis */}
            <div className="space-y-2">
              <div className="text-lg font-semibold">Devis (détails)</div>
              <p className="text-gray-900 dark:text-gray-100 whitespace-pre-line">
                {(selected as any).designFull ?? ""}
              </p>
            </div>

            {/* Population */}
            <div className="space-y-2">
              <div className="text-lg font-semibold">Population (détails)</div>
              <p className="text-gray-900 dark:text-gray-100 whitespace-pre-line">
                {(selected as any).populationFull ?? ""}
              </p>
            </div>

            {/* Inclusion */}
            <div className="space-y-2">
              <div className="text-lg font-semibold">Critères d’inclusion</div>
              <ul className="list-disc pl-6 text-gray-900 dark:text-gray-100 space-y-1">
                {selected.inclusion.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>

            {/* Exclusion */}
            {(selected as any).exclusion?.length ? (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Exclusions majeures</div>
                <ul className="list-disc pl-6 text-gray-900 dark:text-gray-100 space-y-1">
                  {(selected as any).exclusion.map((e: string) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Endpoints */}
            {(selected as any).endpoints?.primary?.length ||
            (selected as any).endpoints?.secondary?.length ? (
              <div className="space-y-4">
                <div className="text-lg font-semibold">Endpoints</div>

                {(selected as any).endpoints?.primary?.length ? (
                  <div>
                    <div className="font-semibold">Primary</div>
                    <ul className="list-disc pl-6 space-y-1">
                      {(selected as any).endpoints.primary.map((x: string) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {(selected as any).endpoints?.secondary?.length ? (
                  <div>
                    <div className="font-semibold">Secondary</div>
                    <ul className="list-disc pl-6 space-y-1">
                      {(selected as any).endpoints.secondary.map(
                        (x: string) => (
                          <li key={x}>{x}</li>
                        )
                      )}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        )}
      </Modal>

      {/* MODAL ZOOM */}
      <Modal open={!!zoom} onClose={() => setZoom(null)}>
        {zoom && <img src={zoom} alt="Schéma (zoom)" className="rounded-xl" />}
      </Modal>
    </div>
  );
}

