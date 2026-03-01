"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

import {
  protocols,
  timelineByCancer,
  type Cancer,
  type Protocol,
} from "@/data/protocols";

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
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-3">
          ✕
        </button>

        {/* IMPORTANT: scroll interne */}
        <div className="max-h-[75vh] overflow-y-auto pr-2">{children}</div>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeCancer, setActiveCancer] = useState<Cancer>("Prostate");
  const [activeStage, setActiveStage] = useState<string>(
    timelineByCancer["Prostate"][0]
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
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* TITRE */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Protocoles de recherche en urologie
        </h1>
        <p className="text-gray-700 mt-2">
          Outil interne de visualisation des études cliniques
        </p>
      </div>

      {/* ONGLET CANCER */}
      <div className="flex gap-3 mb-6">
        {(["Prostate", "Vessie", "Rein"] as Cancer[]).map((c) => (
          <button
            key={c}
            onClick={() => {
              setActiveCancer(c);
              setActiveStage(timelineByCancer[c][0]);
            }}
            className={`px-4 py-2 rounded-xl ${
              c === activeCancer ? "bg-black text-white" : "bg-white shadow"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* TIMELINE */}
      <div className="mb-10">
        <div className="relative flex justify-between items-center">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-300" />
          {stages.map((s) => (
            <div key={s} className="flex flex-col items-center z-10">
              <button
                onClick={() => setActiveStage(s)}
                className={`w-6 h-6 rounded-full border-4 ${
                  s === activeStage
                    ? "bg-black border-black"
                    : "bg-white border-gray-400"
                }`}
              />
              <div className="text-xs mt-2 text-gray-900">{s}</div>
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
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-left border relative overflow-hidden"
          >
            {/* Watermark SUSPENDU */}
            {p.suspended && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-4xl md:text-5xl font-black text-gray-300/70 rotate-[-20deg] select-none">
                  SUSPENDU
                </div>
              </div>
            )}

            <div className="flex justify-between mb-2 relative">
              <div className="text-lg font-semibold text-gray-900">
                {p.title}
              </div>
              {p.randomized && (
                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                  Randomisée
                </span>
              )}
            </div>

            <div className="text-sm text-gray-800 mb-2 relative">
              {p.designShort}
            </div>

            <div className="flex gap-2 flex-wrap relative">
              {p.phase && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {p.phase}
                </span>
              )}

              {p.blinding && (
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                  {p.blinding}
                </span>
              )}

              {p.primaryEndpoint && (
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">
                  Endpoint primaire
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* MODAL DETAILS */}
      <Modal open={selected !== null} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">
              {selected.title}
            </h2>

            {/* Schémas (zoom au clic) */}
            {selected.schemaSrc?.map((src) => (
              <button
                key={src}
                type="button"
                className="block w-full"
                onClick={() => setZoom(src)}
                title="Cliquer pour agrandir"
              >
                <div className="rounded-xl border overflow-hidden">
                  <Image
                    src={src}
                    alt={`Schéma ${selected.title}`}
                    width={1600}
                    height={900}
                    className="w-full h-auto cursor-zoom-in"
                  />
                </div>
              </button>
            ))}

            {/* Lien protocole complet */}
            {selected.protocolUrl && (
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="font-semibold text-gray-900 mb-2">
                  Protocole complet
                </div>
                <a
                  href={selected.protocolUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black text-white"
                >
                  Ouvrir le PDF
                </a>
                <div className="text-xs text-gray-700 mt-2">
                  (S’ouvre dans un nouvel onglet)
                </div>
              </div>
            )}

            {/* Contact infirmière */}
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="font-semibold text-gray-900 mb-1">
                Infirmière responsable
              </div>
              <div className="text-gray-900">
                {selected.nurse?.name ? selected.nurse.name : "—"}
              </div>
              <div className="text-gray-900">
                {selected.nurse?.phone ? selected.nurse.phone : "—"}
              </div>
            </div>

            <div>
              <b className="text-gray-900">Devis</b>
              <p className="text-gray-900">{selected.designFull}</p>
            </div>

            <div>
              <b className="text-gray-900">Population</b>
              <p className="text-gray-900">{selected.population}</p>
            </div>

            {selected.primaryEndpoint && (
              <div>
                <b className="text-gray-900">Endpoint primaire</b>
                <p className="text-gray-900">{selected.primaryEndpoint}</p>
              </div>
            )}

            <div>
              <b className="text-gray-900">Critères d’inclusion</b>
              <ul className="list-disc pl-6 text-gray-900">
                {selected.inclusion.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL ZOOM IMAGE */}
      <Modal open={zoom !== null} onClose={() => setZoom(null)}>
        {zoom && (
          <div className="rounded-xl border overflow-hidden">
            <Image
              src={zoom}
              alt="Schéma (zoom)"
              width={2000}
              height={1200}
              className="w-full h-auto"
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
