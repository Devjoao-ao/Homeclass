"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface Lead {
  id: string;
  nomeCompleto: string;
  telefone: string;
  whatsapp?: string;
  localizacao: string;
  tipoResidencia: string;
  profissao: string;
  tipoProfissional: string;
  quantidade: string;
  tipoTrabalho: string;
  diasTrabalho: string[];
  cargaHoraria: string;
  faixaEtaria: string;
  experiencia: string;
  observacoes: string;
  createdAt: string;
  status: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(data.sort((a: Lead, b: Lead) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Tem certeza que deseja apagar este registo?")) return;
    try {
      await fetch("/api/leads", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      fetchLeads();
      setSelectedLead(null);
    } catch (error) {
      alert("Erro ao apagar");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Painel de Gestão</h1>
            <p className="text-slate-500 mt-1">Gerencie as solicitações de profissionais recebidas.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total: </span>
            <span className="text-lg font-black text-primary">{leads.length}</span>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Data</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Cliente</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Profissional</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Localização</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Acções</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-6 py-5 text-sm text-slate-500 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString("pt-AO", { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-900">{lead.nomeCompleto}</div>
                        <div className="text-xs text-slate-400">{lead.telefone}</div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-600">
                        {lead.tipoProfissional}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-500">
                        {lead.localizacao}
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteLead(lead.id); }}
                          className="text-red-400 hover:text-red-600 transition-colors p-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center text-slate-400 italic">
                        Nenhuma solicitação encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal Detalhes */}
      {selectedLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black">Detalhes da Solicitação</h2>
                <p className="text-slate-400 text-xs mt-1">ID: {selectedLead.id}</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            
            <div className="p-8 max-h-[70vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Informações do Cliente</h3>
                <div className="space-y-4">
                   <DataRow label="Nome" value={selectedLead.nomeCompleto} />
                   <DataRow label="Telefone" value={selectedLead.telefone} />
                   <DataRow label="WhatsApp" value={selectedLead.whatsapp || "-"} />
                   <DataRow label="Profissão" value={selectedLead.profissao} />
                   <DataRow label="Localização" value={selectedLead.localizacao} />
                   <DataRow label="Residência" value={selectedLead.tipoResidencia} />
                </div>
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Requisitos do Profissional</h3>
                <div className="space-y-4">
                   <DataRow label="Profissional" value={selectedLead.tipoProfissional} />
                   <DataRow label="Quantidade" value={selectedLead.quantidade} />
                   <DataRow label="Regime" value={selectedLead.tipoTrabalho} />
                   <DataRow label="Carga Horária" value={selectedLead.cargaHoraria} />
                   <DataRow label="Experiência" value={selectedLead.experiencia} />
                   <DataRow label="Faixa Etária" value={selectedLead.faixaEtaria || "Indiferente"} />
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                 <DataRow label="Dias de Trabalho" value={selectedLead.diasTrabalho.join(", ")} />
                 <DataRow label="Observações" value={selectedLead.observacoes || "Nenhuma observação."} full />
              </div>
            </div>

            <div className="px-8 py-6 border-t border-slate-100 flex justify-end gap-4 bg-slate-50">
                <button 
                  onClick={() => deleteLead(selectedLead.id)}
                  className="bg-red-50 text-red-600 px-6 py-3 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors"
                >
                  Apagar Registo
                </button>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
                >
                  Fechar
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DataRow({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
      <div className="text-sm font-semibold text-slate-900 mt-0.5">{value}</div>
    </div>
  );
}
