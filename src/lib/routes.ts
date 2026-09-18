export const basePath = import.meta.env.BASE_URL || "/";

export type PageKey =
  | "home"
  | "products"
  | "projects"
  | "ai"
  | "chatkode"
  | "about"
  | "updates"
  | "contact"
  | "webprojects"
  | "pipeline"
  | "not-found";

export const navItems = [
  { key: "home", label: "Home", path: "" },
  { key: "products", label: "Products", path: "products" },
  { key: "projects", label: "Projects", path: "projects" },
  { key: "ai", label: "AI & Research", path: "ai" },
  { key: "chatkode", label: "ChatKode", path: "chatkode" },
  { key: "about", label: "About", path: "about" },
  { key: "updates", label: "Updates", path: "updates" },
  { key: "contact", label: "Contact", path: "contact" },
] as const;

const legacyRouteMap: Record<string, PageKey> = {
  "": "home",
  "/": "home",
  "index.html": "home",
  "products": "products",
  "products.html": "products",
  "root/products.html": "products",
  "projects": "projects",
  "projects.html": "projects",
  "root/projects.html": "projects",
  "ai": "ai",
  "ai.html": "ai",
  "root/ai.html": "ai",
  "chatkode": "chatkode",
  "chatkode.html": "chatkode",
  "root/chatkode.html": "chatkode",
  "about": "about",
  "about.html": "about",
  "root/about.html": "about",
  "updates": "updates",
  "updates.html": "updates",
  "root/updates.html": "updates",
  "contact": "contact",
  "contact.html": "contact",
  "root/contact.html": "contact",
  "webprojects": "webprojects",
  "webprojects.html": "webprojects",
  "root/webprojects.html": "webprojects",
  "pipeline": "pipeline",
  "pipeline.html": "pipeline",
  "root/pipeline.html": "pipeline",
  "404": "not-found",
  "404.html": "not-found",
  "root/404.html": "not-found",
};

export function routeHref(path = "") {
  return `${basePath}${path}`.replace(/\/{2,}/g, "/");
}

export function assetHref(path: string) {
  return `${basePath}${path.replace(/^\/+/, "")}`;
}

export function pageFromLocation(location: Location = window.location): PageKey {
  const base = basePath.replace(/(^\/|\/$)/g, "");
  const path = location.pathname
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/?`), "")
    .replace(/^\/+/, "")
    .replace(/\/$/, "");

  return legacyRouteMap[path] || "not-found";
}

export function rewriteLegacyHtml(html: string) {
  let output = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<nav\s+id=["']navbar["']><\/nav>/gi, "")
    .replace(/<footer\s+data-shared-footer><\/footer>/gi, "")
    .replace(/<div\s+id=["']loader["'][\s\S]*?<\/div>\s*/gi, "");

  output = output
    .replace(/(src|href)=["'](?:\.\.\/)?docs\//g, `$1="${assetHref("docs/")}`)
    .replace(/(src|href)=["'](?:\.\.\/)?root\//g, `$1="${assetHref("root/")}`);

  const pagePaths: Record<string, string> = {
    "index.html": "",
    "products.html": "products",
    "projects.html": "projects",
    "ai.html": "ai",
    "chatkode.html": "chatkode",
    "about.html": "about",
    "updates.html": "updates",
    "contact.html": "contact",
    "webprojects.html": "webprojects",
    "pipeline.html": "pipeline",
  };

  for (const [from, to] of Object.entries(pagePaths)) {
    output = output
      .replace(new RegExp(`href=["']\\.\\./${from}(#[^"']*)?["']`, "g"), (_match, hash = "") => {
        return `href="${routeHref(to)}${hash}"`;
      })
      .replace(new RegExp(`href=["']root/${from}(#[^"']*)?["']`, "g"), (_match, hash = "") => {
        return `href="${routeHref(to)}${hash}"`;
      })
      .replace(new RegExp(`href=["']${from}(\\?[^"']*)?(#[^"']*)?["']`, "g"), (_match, query = "", hash = "") => {
        return `href="${routeHref(to)}${query}${hash}"`;
      });
  }

  output = output.replace(/href=["']\.\.\/index\.html#([^"']*)["']/g, `href="${routeHref("")}#$1"`);

  return output;
}

export function extractBody(html: string) {
  return html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
}
