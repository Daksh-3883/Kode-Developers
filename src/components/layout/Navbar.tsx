import { useEffect, useState } from "react";
import { assetHref, navItems, routeHref, type PageKey } from "@/lib/routes";

export function Navbar({ page }: { page: PageKey }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = document.body.classList.contains("dark-theme") ? "light" : "dark";
    localStorage.setItem("theme", next);
    document.body.classList.toggle("dark-theme", next === "dark");
    document.body.classList.toggle("light-theme", next !== "dark");
  };

  const logo = assetHref("docs/Assets/Logo/Main-Mark.svg");
  const sun = assetHref("docs/Assets/icons/UI/sun.svg");
  const moon = assetHref("docs/Assets/icons/UI/moon.svg");

  return (
    <nav
      id="navbar"
      className={`site-nav${scrolled ? " is-scrolled" : ""}`}
      style={{ transform: hidden ? "translateX(-50%) translateY(-140%)" : undefined }}
    >
      <div className="site-nav__inner">
        <a href={routeHref("")} className="site-brand" aria-label="Kode Developers home">
          <img src={logo} alt="Kode Developers" className="site-brand__logo" />
        </a>
        <div className="site-nav__actions">
          <ul className="site-nav__links">
            {navItems.map(item => (
              <li key={item.key}>
                <a
                  href={routeHref(item.path)}
                  className={`site-nav__link nav-link${item.key === page ? " active" : ""}`}
                  data-page={item.key}
                  aria-current={item.key === page ? "page" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button id="theme-toggle" className="theme-toggle" type="button" aria-label="Toggle theme" onClick={toggleTheme}>
            <span className="theme-toggle__icon" aria-hidden="true">
              <img src={sun} alt="" className="theme-toggle__sun" />
              <img src={moon} alt="" className="theme-toggle__moon" />
            </span>
            <span className="theme-toggle__knob" aria-hidden="true" />
          </button>
          <button
            id="menu-btn"
            className="menu-button"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(value => !value)}
          >
            <span className={`bar${open ? " rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`bar${open ? " opacity-0" : ""}`} />
            <span className={`bar${open ? " -rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={`site-nav__mobile ${open ? "flex scale-y-100 opacity-100" : "hidden scale-y-0 opacity-0"}`}>
        {navItems.map(item => (
          <a
            key={item.key}
            href={routeHref(item.path)}
            className={`site-nav__mobile-link nav-link${item.key === page ? " active" : ""}`}
            data-page={item.key}
            aria-current={item.key === page ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
