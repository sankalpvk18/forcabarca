import Link from "next/link";

const footerLinks = {
  explore: {
    title: "Explore",
    links: [
      { label: "News & Analysis", href: "/news" },
      { label: "Fixtures & Results", href: "/fixtures" },
      { label: "La Liga Standings", href: "/standings" },
      { label: "Live Scores", href: "/live" },
    ],
  },
  club: {
    title: "Club",
    links: [
      { label: "First Team Squad", href: "/squad" },
      { label: "Club History", href: "/history" },
      { label: "Camp Nou", href: "/history" },
      { label: "Honours", href: "/history" },
    ],
  },
  barcaTeams: {
    title: "Barça Teams",
    items: [
      "First Team Men",
      "First Team Women",
      "Barça B",
      "Youth Academy",
    ],
  },
  experience: {
    title: "Experience",
    items: [
      "Museum & Tour",
      "Camp Nou Experience",
      "Barça Store",
      "Barça Academy",
    ],
  },
  support: {
    title: "Support",
    items: ["Contact Us", "FAQ", "Accessibility", "Terms of Use"],
  },
  competitions: {
    title: "Competitions",
    items: [
      "La Liga",
      "UEFA Champions League",
      "Copa del Rey",
      "Supercopa de España",
    ],
  },
  legal: {
    title: "Legal",
    items: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "Disclaimer",
    ],
  },
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-16 pb-8 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main grid: brand column + 4 link columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/50 rounded-lg flex items-center justify-center opacity-50 grayscale">
                <span className="text-white font-display font-bold text-sm">
                  FCB
                </span>
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white/50">
                FC Barcelona
              </span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed font-body mb-6">
              Més que un club. Founded in 1899, FC Barcelona stands as a symbol
              of Catalan identity and one of football&apos;s most decorated
              institutions.
            </p>

            {/* Follow Us */}
            <div className="mt-6">
              <h4 className="text-[0.65rem] font-body font-semibold uppercase tracking-[0.15em] text-white/20 mb-3">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {[
                  { icon: "facebook", label: "Facebook" },
                  { icon: "language", label: "Website" },
                  { icon: "play_circle", label: "YouTube" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <span className="material-icons text-lg">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Barça Teams column */}
          <div>
            <h4 className="text-[0.65rem] font-body font-semibold uppercase tracking-[0.15em] text-white/20 mb-4">
              {footerLinks.barcaTeams.title}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.barcaTeams.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-white/40 hover:text-white/60 transition-colors duration-300 cursor-default font-body"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Experience column */}
          <div>
            <h4 className="text-[0.65rem] font-body font-semibold uppercase tracking-[0.15em] text-white/20 mb-4">
              {footerLinks.experience.title}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.experience.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-white/40 hover:text-white/60 transition-colors duration-300 cursor-default font-body"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h4 className="text-[0.65rem] font-body font-semibold uppercase tracking-[0.15em] text-white/20 mb-4">
              {footerLinks.support.title}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-white/40 hover:text-white/60 transition-colors duration-300 cursor-default font-body"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Explore + Club combined column */}
          <div className="space-y-8">
            {/* Explore */}
            <div>
              <h4 className="text-[0.65rem] font-body font-semibold uppercase tracking-[0.15em] text-white/20 mb-4">
                {footerLinks.explore.title}
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.explore.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-300 font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Club */}
            <div>
              <h4 className="text-[0.65rem] font-body font-semibold uppercase tracking-[0.15em] text-white/20 mb-4">
                {footerLinks.club.title}
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.club.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-300 font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Competitions + Legal row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Competitions */}
          <div>
            <h4 className="text-[0.65rem] font-body font-semibold uppercase tracking-[0.15em] text-white/20 mb-4">
              {footerLinks.competitions.title}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.competitions.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-white/40 font-body"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[0.65rem] font-body font-semibold uppercase tracking-[0.15em] text-white/20 mb-4">
              {footerLinks.legal.title}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-white/40 font-body"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-white/5 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-600">
              &copy; {new Date().getFullYear()} FC Barcelona Fan Website. All
              rights reserved.
            </p>
            <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-600">
              Built with
              <span className="text-slate-500">Next.js</span>
              <span className="text-slate-700">/</span>
              <span className="text-slate-500">Tailwind</span>
              <span className="text-slate-700">/</span>
              <span className="text-slate-500">Framer Motion</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
