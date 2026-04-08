"use client";

import { useEffect } from "react";
import type { Lead, LeadStatus } from "./mockData";
import clsx from "clsx";

interface LeadModalProps {
  lead: Lead;
  onClose: () => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
}

const STATUS_OPTIONS: LeadStatus[] = ["Novo", "Em Análise", "Fechado"];

const STATUS_BADGE: Record<LeadStatus, string> = {
  Novo:         "bg-primary/10 text-primary border border-primary/20",
  "Em Análise": "bg-secondary/20 text-amber-700 border border-secondary/40",
  Fechado:      "bg-green-100 text-green-700 border border-green-200",
};

function DetailRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border-b border-slate-100 py-2.5 last:border-0">
      <dt className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</dt>
      <dd className="text-sm font-medium text-slate-800 mt-0.5">{value || "—"}</dd>
    </div>
  );
}

export default function LeadModal({ lead, onClose, onStatusChange }: LeadModalProps) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div role="dialog" aria-modal="true" aria-label={`Detalhes ${lead.id}`} className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">

      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <div className="relative w-full sm:max-w-lg max-h-[90dvh] sm:max-h-[82dvh] flex flex-col bg-white sm:rounded-2xl rounded-t-2xl overflow-hidden animate-slide-up">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-mono text-xs text-slate-400">{lead.id}</span>
              <span className={clsx("text-xs font-semibold px-2 py-0.5 rounded-full", STATUS_BADGE[lead.status])}>
                {lead.status}
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900">{lead.nomeCompleto}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 transition-colors p-1"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5 space-y-6">

          {/* Status */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Alterar status</p>
            <div className="flex gap-2">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(lead.id, s)}
                  aria-pressed={lead.status === s}
                  className={clsx(
                    "px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors",
                    lead.status === s
                      ? STATUS_BADGE[s]
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Client */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Dados do cliente</p>
            <dl>
              <DetailRow label="Nome" value={lead.nomeCompleto} />
              <DetailRow label="Telefone" value={lead.telefone} />
              <DetailRow label="WhatsApp" value={lead.whatsapp || "Não informado"} />
              <DetailRow label="Localização" value={lead.localizacao} />
              <DetailRow label="Residência" value={lead.tipoResidencia} />
              <DetailRow label="Profissão" value={lead.profissao} />
            </dl>
          </div>

          {/* Professional */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Requisitos</p>
            <dl>
              <DetailRow label="Tipo" value={lead.tipoProfissional} />
              <DetailRow label="Quantidade" value={lead.quantidade} />
              <DetailRow label="Regime" value={lead.tipoTrabalho} />
              <DetailRow label="Dias" value={lead.diasTrabalho.join(", ")} />
              <DetailRow label="Carga horária" value={lead.cargaHoraria} />
              <DetailRow label="Faixa etária" value={lead.faixaEtaria || "Indiferente"} />
              <DetailRow label="Exige experiência" value={lead.experiencia} />
              {lead.observacoes && <DetailRow label="Observações" value={lead.observacoes} />}
            </dl>
          </div>

          <p className="text-xs text-slate-400">
            Submetido em {new Date(lead.dataCriacao).toLocaleString("pt-AO", { dateStyle: "long", timeStyle: "short" })}
          </p>
        </div>
      </div>
    </div>
  );
}
