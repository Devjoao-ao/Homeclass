import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-[calc(100vh-80px)] mt-20 flex items-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105 bg-[url('/mobile.png')] lg:bg-[url('/home.png')]"
      >
        <div className="absolute inset-0 bg-slate-900/50" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-white leading-[1.2] tracking-tight mb-4 drop-shadow-xl">
            Encontre o profissional ideal <br className="sm:hidden" /> para sua casa, <span className="text-secondary">sem sair dela.</span>
          </h1>

          <p className="text-slate-100 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-lg drop-shadow-md font-medium">
            Babás, empregadas domésticas, motoristas e mais — verificados, prontos e geridos pela nossa equipa com total segurança.
          </p>

          {/* Trust items */}
          <ul className="flex flex-col gap-3 mb-10" role="list">
            {[
              "Profissionais verificados e com referências",
              "Contrato assinado na sua residência",
              "Acompanhamento e gestão mensal incluídos",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm sm:text-base font-bold text-white drop-shadow-sm">
                <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center shrink-0 shadow-lg" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href="#formulario"
              className="w-auto inline-flex items-center justify-center gap-3 bg-secondary text-slate-900 font-bold text-sm px-7 py-3 rounded-xl hover:bg-secondary-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-secondary/20"
              aria-label="Solicitar profissional agora"
            >
              Solicitar Profissional
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <a
              href="#como-funciona"
              className="w-auto inline-flex items-center justify-center bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold text-sm px-7 py-3 rounded-xl hover:bg-white/20 transition-all"
              aria-label="Ver como funciona"
            >
              Como funciona?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
