import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-32">
      {/* Top gradient divider */}
      <div className="section-divider" />

      <div className="bg-barca-navy-light/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
          {/* Top row: Brand + Newsletter-like statement */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-16">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-barca-blue to-barca-red rounded-xl flex items-center justify-center">
                  <span className="text-white font-display font-bold text-xs">
                    FCB
                  </span>
                </div>
                <span className="font-display text-lg font-bold tracking-tight">
                  FC Barcelona
                </span>
              </div>
              <p className="text-white/30 text-sm leading-relaxed font-body">
                Més que un club. Founded in 1899, FC Barcelona stands as a symbol
                of Catalan identity and one of football&apos;s most decorated
                institutions.
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm font-body">
              <span className="text-white/20 tracking-widest uppercase text-[0.65rem]">
                Follow
              </span>
              <div className="flex gap-3">
                {[
                  {
                    label: "X",
                    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                  },
                  {
                    label: "Instagram",
                    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
                  },
                  {
                    label: "YouTube",
                    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-barca-blue/20 hover:border-barca-blue/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              {
                title: "Explore",
                links: [
                  { label: "News & Analysis", href: "/news" },
                  { label: "Fixtures & Results", href: "/fixtures" },
                  { label: "La Liga Standings", href: "/standings" },
                  { label: "Live Scores", href: "/live" },
                ],
              },
              {
                title: "Club",
                links: [
                  { label: "First Team Squad", href: "/squad" },
                  { label: "Club History", href: "/history" },
                  { label: "Camp Nou", href: "/history" },
                  { label: "Honours", href: "/history" },
                ],
              },
              {
                title: "Competitions",
                items: [
                  "La Liga",
                  "UEFA Champions League",
                  "Copa del Rey",
                  "Supercopa de España",
                ],
              },
              {
                title: "Legal",
                items: [
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Disclaimer",
                ],
              },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-[0.65rem] font-body font-semibold uppercase tracking-[0.15em] text-white/20 mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {"links" in section && section.links
                    ? section.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-sm text-white/40 hover:text-white transition-colors duration-300 font-body"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))
                    : section.items?.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-white/40 font-body"
                        >
                          {item}
                        </li>
                      ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="section-divider mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.7rem] text-white/20 font-body">
            <p>
              &copy; {new Date().getFullYear()} FC Barcelona Fan Website. All
              rights reserved.
            </p>
            <p className="flex items-center gap-1.5">
              Built with
              <span className="text-white/30">Next.js</span>
              <span className="text-white/10">/</span>
              <span className="text-white/30">Tailwind</span>
              <span className="text-white/10">/</span>
              <span className="text-white/30">Framer Motion</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
