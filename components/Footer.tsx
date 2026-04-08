export default function Footer() {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-100" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <img 
                src="/logo.png" 
                alt="Homeclaz Logo" 
                className="h-14 w-auto object-contain" 
              />
            </div>
            <p className="text-sm leading-relaxed text-slate-500 mb-6">
              Agência de recrutamento e gestão de profissionais domésticos em Angola.
              Segurança, confiança e qualidade para a sua casa.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="https://facebook.com/homeclaz" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary/10 hover:text-primary transition-all shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com/homeclaz" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary/10 hover:text-primary transition-all shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <span className="text-xs font-bold text-slate-400">@homeclaz</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">
              Navegação
            </h3>
            <ul className="space-y-3" role="list">
              {[
                { href: "#como-funciona", label: "Como funciona" },
                { href: "#servicos", label: "Nossos serviços" },
                { href: "#formulario", label: "Solicitar profissional" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-sm font-medium hover:text-primary transition-colors duration-150">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">
              Contacto
            </h3>
            <ul className="space-y-4" role="list">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <span className="text-base font-bold text-slate-800">(+244) 951 513 709</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary shadow-sm border border-slate-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                <span className="text-base font-medium text-slate-700">geral@homeclaz.ao</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-primary shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <span className="text-sm font-medium text-slate-500">Luanda, Angola — Atendimento presencial sob agendamento.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Homeclaz. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
