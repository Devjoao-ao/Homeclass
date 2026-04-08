export type LeadStatus = "Novo" | "Em Análise" | "Fechado";

export interface Lead {
  id: string;
  dataCriacao: string;
  nomeCompleto: string;
  telefone: string;
  whatsapp: string;
  localizacao: string;
  tipoResidencia: string;
  profissao: string;
  tipoProfissional: string;
  quantidade: number;
  tipoTrabalho: string;
  diasTrabalho: string[];
  cargaHoraria: string;
  faixaEtaria: string;
  experiencia: string;
  observacoes: string;
  status: LeadStatus;
}

export const MOCK_LEADS: Lead[] = [
  {
    id: "HC-001",
    dataCriacao: "2025-04-08T09:15:00",
    nomeCompleto: "Maria João Ferreira",
    telefone: "+244 922 345 678",
    whatsapp: "+244 922 345 678",
    localizacao: "Talatona, Luanda Sul",
    tipoResidencia: "Condomínio",
    profissao: "Empresária",
    tipoProfissional: "Doméstica",
    quantidade: 1,
    tipoTrabalho: "Interna",
    diasTrabalho: ["Segunda a Sexta"],
    cargaHoraria: "Integral",
    faixaEtaria: "25–35",
    experiencia: "Sim",
    observacoes: "Prefiro alguém que fale inglês básico.",
    status: "Em Análise",
  },
  {
    id: "HC-002",
    dataCriacao: "2025-04-08T11:32:00",
    nomeCompleto: "António Carlos Mendes",
    telefone: "+244 923 456 789",
    whatsapp: "+244 923 456 789",
    localizacao: "Maianga, Luanda",
    tipoResidencia: "Apartamento",
    profissao: "Funcionário Público",
    tipoProfissional: "Babá",
    quantidade: 1,
    tipoTrabalho: "Externa",
    diasTrabalho: ["Segunda a Sexta", "Fins de semana"],
    cargaHoraria: "Integral",
    faixaEtaria: "25–35",
    experiencia: "Sim",
    observacoes: "Tenho gémeos de 2 anos.",
    status: "Novo",
  },
  {
    id: "HC-003",
    dataCriacao: "2025-04-07T14:05:00",
    nomeCompleto: "Luísa Pinto Cardoso",
    telefone: "+244 924 567 890",
    whatsapp: "",
    localizacao: "Kilamba, Luanda",
    tipoResidencia: "Casa",
    profissao: "Médica",
    tipoProfissional: "Doméstica",
    quantidade: 2,
    tipoTrabalho: "Interna",
    diasTrabalho: ["Segunda a Sexta"],
    cargaHoraria: "Integral",
    faixaEtaria: "35–45",
    experiencia: "Não",
    observacoes: "",
    status: "Fechado",
  },
  {
    id: "HC-004",
    dataCriacao: "2025-04-07T16:45:00",
    nomeCompleto: "Pedro Sousa Lemos",
    telefone: "+244 925 678 901",
    whatsapp: "+244 925 678 901",
    localizacao: "Benfica, Luanda",
    tipoResidencia: "Casa",
    profissao: "Advogado",
    tipoProfissional: "Motorista",
    quantidade: 1,
    tipoTrabalho: "Externa",
    diasTrabalho: ["Segunda a Sexta"],
    cargaHoraria: "Integral",
    faixaEtaria: "25–35",
    experiencia: "Sim",
    observacoes: "Deve ter carta de condução válida categoria B e E.",
    status: "Novo",
  },
  {
    id: "HC-005",
    dataCriacao: "2025-04-06T10:00:00",
    nomeCompleto: "Ana Beatriz Rodrigues",
    telefone: "+244 926 789 012",
    whatsapp: "+244 926 789 012",
    localizacao: "Viana, Luanda",
    tipoResidencia: "Condomínio",
    profissao: "Empresária",
    tipoProfissional: "Babá",
    quantidade: 1,
    tipoTrabalho: "Interna",
    diasTrabalho: ["Segunda a Sexta", "Fins de semana"],
    cargaHoraria: "Integral",
    faixaEtaria: "20–30",
    experiencia: "Sim",
    observacoes: "Bebé de 8 meses. Necessário paciência e dedicação.",
    status: "Em Análise",
  },
  {
    id: "HC-006",
    dataCriacao: "2025-04-05T09:30:00",
    nomeCompleto: "Francisco Neto Alves",
    telefone: "+244 927 890 123",
    whatsapp: "",
    localizacao: "Cacuaco, Luanda",
    tipoResidencia: "Casa",
    profissao: "Comerciante",
    tipoProfissional: "Doméstica",
    quantidade: 1,
    tipoTrabalho: "Externa",
    diasTrabalho: ["Segunda a Sexta"],
    cargaHoraria: "Meio período",
    faixaEtaria: "Indiferente",
    experiencia: "Não",
    observacoes: "",
    status: "Fechado",
  },
];
