"use client";

import React, { useMemo, useState } from "react";
import type { Cancer, Protocol } from "@/data/protocols";
import { protocols, timelineByCancer } from "@/data/protocols";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 rounded-lg px-2 py-1 text-gray-700 hover:bg-gray-100"
          aria-label="Fermer"
        >
          ✕
        </button>

        {/* IMPORTANT: scroll dans la modal */}
        <div className="max-h-[75vh] overflow-y-auto pr-2">{children}</div>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeCancer, setActiveCancer] = useState<Cancer>("Prostate");
  const [activeStage, setActiveStage] = useState<string>(
    timelineByCancer["Prostate"][0] ?? "Localisé"
  );

  const [selected, setSelected] = useState<Protocol | null>(null);
  const [zoom, setZoom] = useState<string | null>(null);

  const stages = timelineByCancer[activeCancer];

  const filtered = useMemo(() => {
    return protocols.filter(
      (p) => p.cancer === activeCancer && p.stage === activeStage
    );
  }, [activeCancer, activeStage]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-900">
      {/* TITRE */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Protocoles de recherche en urologie
        </h1>
        <p className="mt-2 text-gray-700">
          Outil interne de visualisation des études cliniques
        </p>
      </div>

      {/* ONGLET CANCER */}
      <div className="mb-6 flex gap-3">
        {(["Prostate", "Vessie", "Rein"] as Cancer[]).map((c) => (
          <button
            key={c}
            onClick={() => {
              setActiveCancer(c);
              setActiveStage(timelineByCancer[c][0]);
            }}
            className={`rounded-xl px-4 py-2 ${
              c === activeCancer
                ? "bg-black text-white"
                : "bg-white text-gray-900 shadow hover:bg-gray-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* TIMELINE */}
      <div className="mb-10">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 right-0 top-4 h-1 bg-gray-300" />
          {stages.map((s) => (
            <div key={s} className="z-10 flex flex-col items-center">
              <button
                onClick={() => setActiveStage(s)}
                className={`h-6 w-6 rounded-full border-4 ${
                  s === activeStage
                    ? "border-black bg-black"
                    : "border-gray-500 bg-white"
                }`}
                aria-label={`Stage ${s}`}
              />
              <div className="mt-2 text-xs text-gray-800">{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CARTES */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="relative rounded-2xl border bg-white p-6 text-left shadow-md transition hover:shadow-xl"
          >
            {/* Watermark SUSPENDU */}
            {p.suspended && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl">
                <div className="rotate-[-20deg] text-4xl font-extrabold tracking-widest text-red-600/25">
                  SUSPENDU
                </div>
              </div>
            )}

            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="text-lg font-semibold text-gray-900">
                {p.title}
              </div>

              {p.randomized && (
                <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-800">
                  Randomisée
                </span>
              )}
            </div>

            <div className="mb-2 text-sm text-gray-800">{p.designShort}</div>

            <div className="flex flex-wrap gap-2">
              {p.phase && (
                <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                  {p.phase}
                </span>
              )}
              {p.blinding && (
                <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800">
                  {p.blinding}
                </span>
              )}
            </div>

            {/* Petit aperçu de population */}
            {p.population && (
              <div className="mt-3 text-xs text-gray-700 line-clamp-2">
                <span className="font-semibold">Population:</span> {p.population}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* MODAL DÉTAIL */}
      <Modal open={selected !== null} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {selected.title}
              </h2>

              <div className="mt-2 flex flex-wrap gap-2">
                {selected.phase && (
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                    {selected.phase}
                  </span>
                )}
                {selected.randomized && (
                  <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-800">
                    Randomisée
                  </span>
                )}
                {selected.blinding && (
                  <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800">
                    {selected.blinding}
                  </span>
                )}
                {selected.suspended && (
                  <span className="rounded bg-orange-100 px-2 py-1 text-xs text-orange-800">
                    Recrutement suspendu
                  </span>
                )}
              </div>
            </div>

            {/* Lien protocole PDF */}
            {selected.protocolUrl && (
              <div>
                <a
                  href={selected.protocolUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900"
                >
                  Ouvrir le protocole (PDF)
                </a>
                <div className="mt-1 text-xs text-gray-700">
                  (S’ouvre dans un nouvel onglet)
                </div>
              </div>
            )}

            {/* Contact infirmière */}
            {(selected.nurse?.name || selected.nurse?.phone) && (
              <div className="rounded-xl border bg-gray-50 p-4">
                <div className="text-sm font-semibold text-gray-900">
                  Infirmière responsable
                </div>
                <div className="mt-1 text-sm text-gray-800">
                  {selected.nurse?.name ?? ""}
                  {selected.nurse?.name && selected.nurse?.phone ? " — " : ""}
                  {selected.nurse?.phone ?? ""}
                </div>
              </div>
            )}

            {/* Schémas */}
            {selected.schemaSrc && selected.schemaSrc.length > 0 && (
              <div className="space-y-3">
                <div className="text-sm font-semibold text-gray-900">
                  Schéma(s) de l’étude
                </div>
                {selected.schemaSrc.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="Schéma de l’étude"
                    className="cursor-zoom-in rounded-xl border"
                    onClick={() => setZoom(src)}
                  />
                ))}
                <div className="text-xs text-gray-700">
                  Clique sur une image pour agrandir.
                </div>
              </div>
            )}

            <div>
              <div className="text-sm font-semibold text-gray-900">Devis</div>
              <p className="mt-1 text-sm text-gray-800">{selected.designFull}</p>
            </div>

            <div>
              <div className="text-sm font-semibold text-gray-900">Population</div>
              <p className="mt-1 text-sm text-gray-800">{selected.population}</p>
            </div>

            {selected.primaryEndpoint && (
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  Outcome primaire
                </div>
                <p className="mt-1 text-sm text-gray-800">
                  {selected.primaryEndpoint}
                </p>
              </div>
            )}

            <div>
              <div className="text-sm font-semibold text-gray-900">
                Critères d’inclusion (principaux)
              </div>
              <ul className="mt-1 list-disc pl-6 text-sm text-gray-800">
                {selected.inclusion.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL ZOOM */}
      <Modal open={zoom !== null} onClose={() => setZoom(null)}>
        {zoom && (
          <img
            src={zoom}
            alt="Schéma agrandi"
            className="rounded-xl border"
          />
        )}
      </Modal>
    </div>
  );
}
