"use client";

import { useState, useId } from "react";
import StepIndicator from "@/components/ui/StepIndicator";
import clsx from "clsx";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Phase1 {
  nomeCompleto: string;
  telefone: string;
  whatsapp: string;
  localizacao: string;
  tipoResidencia: "Apartamento" | "Casa" | "Condomínio" | "";
  profissao: string;
}

interface Phase2 {
  tipoProfissional: "Doméstica" | "Babá" | "Motorista" | "Outro" | "";
  quantidade: string;
  tipoTrabalho: "Interna" | "Externa" | "";
  diasTrabalho: string[];
  cargaHoraria: "Meio período" | "Integral" | "";
  faixaEtaria: string;
  experiencia: "Sim" | "Não" | "";
  observacoes: string;
}

type FormData = Phase1 & Phase2;

const STEP_LABELS = ["Sobre você", "Requisitos", "Confirmar"];

// ─── Field helpers ─────────────────────────────────────────────────────────────

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-150 min-h-[44px]";

function Field({
  label,
  required,
  error,
  children,
  id,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  );
}

function TextInput({
  id, value, onChange, placeholder, type = "text", error,
}: {
  id: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; error?: boolean;
}) {
  return (
    <input
      id={id} type={type} value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={clsx(inputClass, error && "border-red-400 focus:border-red-400 focus:ring-red-400")}
      aria-invalid={error ? "true" : undefined}
    />
  );
}

function RadioGroup<T extends string>({
  id, options, value, onChange, error,
}: {
  id: string; options: T[]; value: T | ""; onChange: (v: T) => void; error?: boolean;
}) {
  return (
    <div
      role="radiogroup"
      className={clsx("flex flex-wrap gap-2", error && "p-2 rounded-lg ring-1 ring-red-300")}
    >
      {options.map((opt) => (
        <label
          key={opt}
          className={clsx(
            "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-colors duration-150 min-h-[44px]",
            value === opt
              ? "border-primary bg-primary/5 text-primary"
              : "border-slate-200 text-slate-600 hover:border-slate-300"
          )}
        >
          <input
            type="radio" name={id} value={opt}
            checked={value === opt} onChange={() => onChange(opt)}
            className="sr-only" aria-label={opt}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

function CheckGroup({
  id, options, value, onChange,
}: {
  id: string; options: string[]; value: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) =>
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);

  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((opt) => {
        const checked = value.includes(opt);
        return (
          <label
            key={opt}
            className={clsx(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-colors duration-150 min-h-[44px]",
              checked
                ? "border-primary bg-primary/5 text-primary"
                : "border-slate-200 text-slate-600 hover:border-slate-300"
            )}
          >
            <input
              type="checkbox" name={id} value={opt}
              checked={checked} onChange={() => toggle(opt)}
              className="sr-only" aria-label={opt}
            />
            {opt}
          </label>
        );
      })}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const initial: FormData = {
  nomeCompleto: "", telefone: "", whatsapp: "", localizacao: "",
  tipoResidencia: "", profissao: "", tipoProfissional: "", quantidade: "1",
  tipoTrabalho: "", diasTrabalho: [], cargaHoraria: "",
  faixaEtaria: "", experiencia: "", observacoes: "",
};

export default function FormSection() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validatePhase1 = () => {
    const e: typeof errors = {};
    if (!data.nomeCompleto.trim()) e.nomeCompleto = "Campo obrigatório.";
    if (!data.telefone.trim()) e.telefone = "Campo obrigatório.";
    if (!data.localizacao.trim()) e.localizacao = "Campo obrigatório.";
    if (!data.tipoResidencia) e.tipoResidencia = "Selecione uma opção.";
    if (!data.profissao.trim()) e.profissao = "Campo obrigatório.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePhase2 = () => {
    const e: typeof errors = {};
    if (!data.tipoProfissional) e.tipoProfissional = "Selecione uma opção.";
    if (!data.tipoTrabalho) e.tipoTrabalho = "Selecione uma opção.";
    if (data.diasTrabalho.length === 0) e.diasTrabalho = "Selecione ao menos um dia.";
    if (!data.cargaHoraria) e.cargaHoraria = "Selecione uma opção.";
    if (!data.experiencia) e.experiencia = "Selecione uma opção.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNext = () => {
    if (step === 1 && !validatePhase1()) return;
    if (step === 2 && !validatePhase2()) return;
    setStep((s) => s + 1);
    scrollToForm();
  };

  const handleBack = () => { setStep((s) => s - 1); setErrors({}); };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        scrollToForm();
      } else {
        alert("Erro ao enviar. Por favor tente novamente.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Erro de conexão. Verifique sua internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="formulario"
      className="relative py-24 overflow-hidden"
      aria-labelledby="form-title"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home1.png')" }}
      >
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-0">

        {/* Header */}
        {!submitted && (
          <div className="mb-10 text-center sm:text-left">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-secondary mb-3">
              Solicitar profissional
            </p>
            <h2 id="form-title" className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
              Diga-nos o que precisa
            </h2>
            <p className="text-slate-200 text-base">
              Leva menos de 3 minutos. A nossa equipa entra em contacto em breve.
            </p>
          </div>
        )}

        {/* Form wrapper */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

          {!submitted && (
            <div className="px-6 sm:px-8 pt-7 pb-6 border-b border-slate-100">
              <StepIndicator currentStep={step} totalSteps={3} labels={STEP_LABELS} />
              <p className="text-xs text-slate-400 mt-4">
                {step === 1 && "Etapa 1 de 3 — As suas informações"}
                {step === 2 && "Etapa 2 de 3 — O profissional que procura"}
                {step === 3 && "Etapa 3 de 3 — Reveja e confirme"}
              </p>
            </div>
          )}

          <div className="px-6 sm:px-8 py-7">

            {/* ── SUCCESS ── */}
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10 animate-scale-in">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <svg viewBox="0 0 52 52" className="w-8 h-8" fill="none" role="img" aria-label="Sucesso">
                    <path
                      d="M14 27l8 8 16-16"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="check-path"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3">
                  Recebemos a sua solicitação!
                </h3>
                <p className="text-slate-500 text-base leading-relaxed max-w-sm">
                  A nossa equipa vai analisar as suas informações e entrar em contacto
                  em breve pelos meios indicados.
                </p>
                <p className="mt-5 text-sm text-slate-400">
                  Obrigado pela confiança na Homeclaz.
                </p>
              </div>
            ) : (
              <>
                {/* ── PHASE 1 ── */}
                {step === 1 && (
                  <div className="step-enter space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Nome completo" required id={id("nome")} error={errors.nomeCompleto}>
                        <TextInput id={id("nome")} value={data.nomeCompleto} onChange={(v) => set("nomeCompleto", v)}
                          placeholder="Ex: Maria Fernanda" error={!!errors.nomeCompleto} />
                      </Field>
                      <Field label="Profissão" required id={id("prof")} error={errors.profissao}>
                        <TextInput id={id("prof")} value={data.profissao} onChange={(v) => set("profissao", v)}
                          placeholder="Ex: Empresária, Funcionária…" error={!!errors.profissao} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Telefone" required id={id("tel")} error={errors.telefone}>
                        <TextInput id={id("tel")} type="tel" value={data.telefone} onChange={(v) => set("telefone", v)}
                          placeholder="+244 9XX XXX XXX" error={!!errors.telefone} />
                      </Field>
                      <Field label="WhatsApp (opcional)" id={id("wa")}>
                        <TextInput id={id("wa")} type="tel" value={data.whatsapp} onChange={(v) => set("whatsapp", v)}
                          placeholder="+244 9XX XXX XXX" />
                      </Field>
                    </div>
                    <Field label="Bairro / Município" required id={id("loc")} error={errors.localizacao}>
                      <TextInput id={id("loc")} value={data.localizacao} onChange={(v) => set("localizacao", v)}
                        placeholder="Ex: Talatona, Maianga, Kilamba…" error={!!errors.localizacao} />
                    </Field>
                    <Field label="Tipo de residência" required id={id("tres")} error={errors.tipoResidencia}>
                      <RadioGroup id={id("tres")} options={["Apartamento", "Casa", "Condomínio"]}
                        value={data.tipoResidencia} onChange={(v) => set("tipoResidencia", v)}
                        error={!!errors.tipoResidencia} />
                    </Field>
                  </div>
                )}

                {/* ── PHASE 2 ── */}
                {step === 2 && (
                  <div className="step-enter space-y-5">
                    <Field label="Que profissional precisa?" required id={id("tp")} error={errors.tipoProfissional}>
                      <RadioGroup id={id("tp")} options={["Doméstica", "Babá", "Motorista", "Outro"]}
                        value={data.tipoProfissional} onChange={(v) => set("tipoProfissional", v)}
                        error={!!errors.tipoProfissional} />
                    </Field>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Quantidade" id={id("qty")}>
                        <input id={id("qty")} type="number" min={1} max={10}
                          value={data.quantidade} onChange={(e) => set("quantidade", e.target.value)}
                          className={inputClass} />
                      </Field>
                      <Field label="Faixa etária desejada" id={id("faixa")}>
                        <select id={id("faixa")} value={data.faixaEtaria}
                          onChange={(e) => set("faixaEtaria", e.target.value)}
                          className={clsx(inputClass, "cursor-pointer")}>
                          <option value="">Indiferente</option>
                          <option value="18–25">18 – 25 anos</option>
                          <option value="25–35">25 – 35 anos</option>
                          <option value="35–45">35 – 45 anos</option>
                          <option value="45+">45+ anos</option>
                        </select>
                      </Field>
                    </div>
                    <Field label="Regime de trabalho" required id={id("tt")} error={errors.tipoTrabalho}>
                      <RadioGroup id={id("tt")} options={["Interna", "Externa"]}
                        value={data.tipoTrabalho} onChange={(v) => set("tipoTrabalho", v)}
                        error={!!errors.tipoTrabalho} />
                    </Field>
                    <Field label="Dias de trabalho" required id={id("dias")} error={errors.diasTrabalho}>
                      <CheckGroup id={id("dias")} options={["Segunda a Sexta", "Fins de semana", "Personalizado"]}
                        value={data.diasTrabalho} onChange={(v) => set("diasTrabalho", v)} />
                      {errors.diasTrabalho && <p className="text-xs text-red-500 mt-0.5">{errors.diasTrabalho}</p>}
                    </Field>
                    <Field label="Carga horária" required id={id("ch")} error={errors.cargaHoraria}>
                      <RadioGroup id={id("ch")} options={["Meio período", "Integral"]}
                        value={data.cargaHoraria} onChange={(v) => set("cargaHoraria", v)}
                        error={!!errors.cargaHoraria} />
                    </Field>
                    <Field label="Exige experiência mínima?" required id={id("exp")} error={errors.experiencia}>
                      <RadioGroup id={id("exp")} options={["Sim", "Não"]}
                        value={data.experiencia} onChange={(v) => set("experiencia", v)}
                        error={!!errors.experiencia} />
                    </Field>
                    <Field label="Observações (opcional)" id={id("obs")}>
                      <textarea id={id("obs")} value={data.observacoes}
                        onChange={(e) => set("observacoes", e.target.value)}
                        rows={3} placeholder="Requisitos especiais ou informação adicional…"
                        className={clsx(inputClass, "resize-none min-h-[80px]")} />
                    </Field>
                  </div>
                )}

                {/* ── REVIEW ── */}
                {step === 3 && (
                  <div className="step-enter space-y-6">
                    <ReviewBlock title="Sobre si">
                      <Row label="Nome" value={data.nomeCompleto} />
                      <Row label="Telefone" value={data.telefone} />
                      <Row label="WhatsApp" value={data.whatsapp || "—"} />
                      <Row label="Localização" value={data.localizacao} />
                      <Row label="Residência" value={data.tipoResidencia} />
                      <Row label="Profissão" value={data.profissao} />
                    </ReviewBlock>
                    <ReviewBlock title="Profissional pretendido">
                      <Row label="Tipo" value={data.tipoProfissional} />
                      <Row label="Quantidade" value={data.quantidade} />
                      <Row label="Regime" value={data.tipoTrabalho} />
                      <Row label="Dias" value={data.diasTrabalho.join(", ")} />
                      <Row label="Carga horária" value={data.cargaHoraria} />
                      <Row label="Faixa etária" value={data.faixaEtaria || "Indiferente"} />
                      <Row label="Experiência" value={data.experiencia} />
                      {data.observacoes && <Row label="Observações" value={data.observacoes} full />}
                    </ReviewBlock>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Ao enviar, autoriza a Homeclaz a contactá-lo pelos meios indicados para apresentar
                      os profissionais disponíveis.
                    </p>
                  </div>
                )}

                {/* Navigation */}
                <div className={clsx("flex gap-3 mt-8", step > 1 ? "justify-between" : "justify-end")}>
                  {step > 1 && (
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors py-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                      </svg>
                      Voltar
                    </button>
                  )}

                  {step < 3 ? (
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-7 py-3 rounded-xl hover:bg-primary-600 transition-colors duration-150 ml-auto"
                    >
                      Continuar
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      aria-busy={loading}
                      className="inline-flex items-center gap-2 bg-secondary text-slate-900 font-bold text-sm px-7 py-3 rounded-xl hover:bg-secondary-500 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          A enviar…
                        </>
                      ) : (
                        <>
                          Enviar Solicitação
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                          </svg>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Review helpers ───────────────────────────────────────────────────────────

function ReviewBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">{children}</div>
    </div>
  );
}

function Row({ label, value, full }: { label: string; value: string | number; full?: boolean }) {
  return (
    <div className={clsx("border-b border-slate-100 pb-2", full && "sm:col-span-2")}>
      <dt className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</dt>
      <dd className="text-sm font-medium text-slate-800 mt-0.5">{value || "—"}</dd>
    </div>
  );
}
