import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const services = [
  {
    title: "Assistência a Idosos",
    image: "/assistencia a idosos.png",
    description:
      "Cuidadores compassivos para garantir bem-estar, segurança e qualidade de vida no dia a dia.",
  },
  {
    title: "Domésticas e Governantas",
    image: "/domestica.png",
    description:
      "Da limpeza à organização completa da residência. Confiança, discrição e profissionalismo.",
  },
  {
    title: "Babysitter e Babás",
    image: "/babas babysitter.png",
    description:
      "Profissionais dedicadas e experientes para o cuidado e desenvolvimento dos seus filhos.",
  },
  {
    title: "Engomadeiras e Lavadeiras",
    image: "/engomadeira-e-lavadeira.png",
    description:
      "Serviço de lavagem e passagem de roupas com cuidado e atenção aos detalhes.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="servicos"
      className="py-20 bg-white"
      aria-labelledby="services-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-3">
            Serviços
          </p>
          <h2 id="services-title" className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            O profissional certo para cada necessidade
          </h2>
          <p className="mt-3 text-slate-500 text-base max-w-xl">
            Todos passam por rigorosa verificação de antecedentes antes de serem apresentados.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <article 
              key={service.title} 
              className="flex flex-col group p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 bg-white"
            >

              {/* Image Container */}
              <div className="relative mb-5 overflow-hidden rounded-xl">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-auto" 
                />
              </div>

              {/* Content */}
              <div className="flex-grow flex flex-col justify-center text-center sm:text-left">
                <h3 className="text-base font-bold text-slate-900 mb-2 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Inline bottom note */}
        <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            Não encontrou o que procura? Temos mais opções disponíveis.
          </p>
          <a
            href="#formulario"
            className="text-sm font-semibold text-primary hover:underline underline-offset-4 transition-all flex items-center gap-1.5 shrink-0"
          >
            Solicitar outro perfil
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
