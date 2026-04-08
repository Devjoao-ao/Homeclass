const steps = [
  {
    number: "01",
    title: "Preenche o formulário",
    description:
      "Diz-nos o que precisas: tipo de profissional, horário, localização. Leva menos de 3 minutos.",
  },
  {
    number: "02",
    title: "Analisamos o teu perfil",
    description:
      "A nossa equipa revê os teus requisitos e seleciona os candidatos mais adequados.",
  },
  {
    number: "03",
    title: "Escolhes o teu profissional",
    description:
      "Apresentamos os perfis disponíveis. Tu decides quem entra na tua casa.",
  },
  {
    number: "04",
    title: "Começa a trabalhar",
    description:
      "Assinamos o contrato na tua residência. Gerimos tudo mensalmente por ti.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="relative py-20 overflow-hidden"
      aria-labelledby="how-title"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home2.png')" }}
      >
        <div className="absolute inset-0 bg-white/95 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-3">
            Como funciona
          </p>
          <h2 id="how-title" className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simples do início ao fim
          </h2>
          <p className="mt-3 text-slate-500 text-base max-w-md">
            Sem burocracia, sem complicações. Em poucos passos tens o profissional certo.
          </p>
        </div>

        {/* Steps — layout horizontal no desktop, vertical no mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white p-8 flex flex-col gap-5"
            >
              {/* Number */}
              <span className="text-4xl font-extrabold text-secondary leading-none">
                {step.number}
              </span>

              {/* Content */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA inline */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="#formulario"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors duration-150"
          >
            Começar agora
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <p className="text-sm text-slate-400">Sem taxas de adesão. Sem compromisso inicial.</p>
        </div>
      </div>
    </section>
  );
}
