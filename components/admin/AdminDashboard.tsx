"use client";

import { useState, useMemo } from "react";
import { MOCK_LEADS, type Lead, type LeadStatus } from "./mockData";
import LeadModal from "./LeadModal";
import clsx from "clsx";

interface AdminDashboardProps {
  onLogout: () => void;
}

const STATUS_BADGE: Record<LeadStatus, string> = {
  Novo:         "bg-primary/10 text-primary",
  "Em Análise": "bg-secondary/20 text-amber-700",
  Fechado:      "bg-green-100 text-green-700",
};

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "Todos">("Todos");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<"dataCriacao" | "nomeCompleto">("dataCriacao");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const handleStatusChange = (id: string, status: LeadStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  const handleSort = (field: typeof sortField) => {
    if (field === sortField) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const counts = useMemo(() => ({
    total: leads.length,
    Novo: leads.filter((l) => l.status === "Novo").length,
    "Em Análise": leads.filter((l) => l.status === "Em Análise").length,
    Fechado: leads.filter((l) => l.status === "Fechado").length,
  }), [leads]);

  const filtered = useMemo(() => {
    let list = [...leads];
    if (filterStatus !== "Todos") list = list.filter((l) => l.status === filterStatus);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (l) => l.nomeCompleto.toLowerCase().includes(q) ||
               l.localizacao.toLowerCase().includes(q) ||
               l.tipoProfissional.toLowerCase().includes(q) ||
               l.telefone.includes(q)
      );
    }
    list.sort((a, b) => {
      const va = a[sortField], vb = b[sortField];
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [leads, filterStatus, search, sortField, sortDir]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* ── Navbar ── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40" role="banner">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <span className="text-sm font-extrabold text-slate-900">
              Homeclaz <span className="text-slate-400 font-normal">/ Admin</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-slate-400 hover:text-primary transition-colors hidden sm:inline">
              Ver site
            </a>
            <button
              onClick={onLogout}
              className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
              aria-label="Terminar sessão"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-8">

        {/* Title */}
        <div className="mb-7">
          <h1 className="text-2xl font-extrabold text-slate-900">Leads</h1>
          <p className="text-sm text-slate-500 mt-1">
            Todas as solicitações recebidas pelo formulário do site.
          </p>
        </div>

        {/* Stats — inline row */}
        <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-slate-200">
          {[
            { label: "Total", value: counts.total, color: "text-slate-900" },
            { label: "Novos", value: counts.Novo, color: "text-primary" },
            { label: "Em Análise", value: counts["Em Análise"], color: "text-amber-600" },
            { label: "Fechados", value: counts.Fechado, color: "text-green-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className={clsx("text-2xl font-extrabold", color)}>{value}</span>
              <span className="text-sm text-slate-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="search" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar leads…"
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors min-h-[44px]"
              aria-label="Pesquisar leads"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {(["Todos", "Novo", "Em Análise", "Fechado"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={clsx(
                  "px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors min-h-[44px]",
                  filterStatus === s
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                )}
                aria-pressed={filterStatus === s}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm" aria-label="Tabela de leads">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 w-20">ID</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <button
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                      onClick={() => handleSort("dataCriacao")}
                      aria-sort={sortField === "dataCriacao" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                    >
                      Data
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={clsx(sortField === "dataCriacao" && sortDir === "asc" && "rotate-180")}>
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <button
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                      onClick={() => handleSort("nomeCompleto")}
                      aria-sort={sortField === "nomeCompleto" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                    >
                      Cliente
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={clsx(sortField === "nomeCompleto" && sortDir === "asc" && "rotate-180")}>
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 hidden sm:table-cell">Contacto</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 hidden md:table-cell">Profissional</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 hidden lg:table-cell">Localização</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-14 text-slate-400 text-sm">
                      Nenhum lead encontrado.
                    </td>
                  </tr>
                ) : filtered.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelected(lead)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(lead); } }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Ver detalhes de ${lead.nomeCompleto}`}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors duration-100"
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs text-slate-400">{lead.id}</span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs whitespace-nowrap">
                      {new Date(lead.dataCriacao).toLocaleDateString("pt-AO", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-slate-900">{lead.nomeCompleto}</td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs hidden sm:table-cell">{lead.telefone}</td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-md">
                        {lead.tipoProfissional}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs hidden lg:table-cell">{lead.localizacao}</td>
                    <td className="px-4 py-3.5">
                      <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-full", STATUS_BADGE[lead.status])}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>{filtered.length} de {leads.length} leads</span>
            <span className="hidden sm:inline">Clique para ver detalhes</span>
          </div>
        </div>
      </main>

      {selected && (
        <LeadModal lead={selected} onClose={() => setSelected(null)} onStatusChange={handleStatusChange} />
      )}
    </div>
  );
}
