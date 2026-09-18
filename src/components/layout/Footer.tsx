import { assetHref, navItems, routeHref } from "@/lib/routes";

export function Footer() {
  const logo = assetHref("docs/Assets/Logo/Main-Mark.svg");
  const mail = assetHref("docs/Assets/icons/Actions/mail.svg");
  const arrow = assetHref("docs/Assets/icons/UI/arrow-right.svg");

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img src={logo} alt="Kode Developers" className="site-footer__logo" />
          <p>Focused on building modern software, AI-powered tools, and impactful digital experiences.</p>
          <div className="site-footer__socials" aria-label="Social links">
            <a href="#" className="social-icon" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.1c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm6.25 0h3.83V11h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14v5.41h-4v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54v4.88h-4V9.5Z" />
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.9 2.25h3.28l-7.17 8.2 8.44 11.16h-6.61l-5.18-6.77-5.92 6.77H2.45l7.67-8.77L2.03 2.25h6.78l4.68 6.19 5.41-6.19Zm-1.15 17.4h1.82L7.82 4.1H5.87l11.88 15.55Z" />
              </svg>
            </a>
            <a href="mailto:ceo@kodedevelopers.org" className="social-icon" aria-label="Email">
              <img src={mail} alt="" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="site-footer__column">
          <h2>Quick Links</h2>
          <ul>
            {navItems.map(item => (
              <li key={item.key}>
                <a href={routeHref(item.path)}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__column">
          <h2>Products</h2>
          <ul>
            <li><a href={routeHref("chatkode")}>ChatKode</a></li>
            <li><span>Kode Toolbox</span></li>
            <li><span>Kode Insights</span></li>
            <li><a href={routeHref("products")}>All Products</a></li>
          </ul>
        </div>
        <div className="site-footer__column site-footer__updates">
          <h2>Stay Updated</h2>
          <p>Get the latest updates about our products and projects.</p>
          <form className="site-footer__form" action="#" onSubmit={event => event.preventDefault()}>
            <label className="sr-only" htmlFor="footer-email">Email address</label>
            <input id="footer-email" type="email" placeholder="Enter your email" autoComplete="email" />
            <button type="submit" aria-label="Submit email"><img src={arrow} alt="" aria-hidden="true" /></button>
          </form>
        </div>
      </div>
      <p className="site-footer__bottom">&copy; 2026 Kode Developers. All rights reserved.</p>
    </footer>
  );
}
