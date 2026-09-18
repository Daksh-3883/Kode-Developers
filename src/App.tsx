import { SiteShell } from "@/components/layout/SiteShell";
import { pageFromLocation, type PageKey } from "@/lib/routes";
import { ChatKodePage } from "@/pages/ChatKodePage";
import { LegacyPage } from "@/pages/LegacyPage";
import { legacySources } from "@/pages/legacySources";
import { PipelinePage } from "@/pages/PipelinePage";
import { WebProjectPage } from "@/pages/WebProjectPage";

const meta: Record<string, { title: string; description?: string }> = {
  home: {
    title: "Kode Developers - Professional App Development & AI Solutions",
    description:
      "Kode Developers specializes in AI-powered applications, game development, and modern web solutions.",
  },
  products: { title: "Products | Kode Developers" },
  projects: { title: "Projects | Kode Developers" },
  ai: { title: "AI & Research | Kode Developers" },
  about: { title: "About Us | Kode Developers" },
  updates: { title: "Updates | Kode Developers" },
  contact: { title: "Contact Us | Kode Developers" },
  notFound: { title: "Page Not Found | Kode Developers" },
};

export function App() {
  const page = pageFromLocation();

  return (
    <SiteShell page={page}>
      <Page page={page} />
    </SiteShell>
  );
}

function Page({ page }: { page: PageKey }) {
  switch (page) {
    case "home":
      return (
        <LegacyPage
          page={page}
          html={legacySources.home}
          title={meta.home.title}
          description={meta.home.description}
          enableRating
        />
      );
    case "products":
      return <LegacyPage page={page} html={legacySources.products} title={meta.products.title} />;
    case "projects":
      return (
        <LegacyPage
          page={page}
          html={legacySources.projects}
          title={meta.projects.title}
          enableProjectEffects
        />
      );
    case "ai":
      return <LegacyPage page={page} html={legacySources.ai} title={meta.ai.title} />;
    case "about":
      return <LegacyPage page={page} html={legacySources.about} title={meta.about.title} />;
    case "updates":
      return <LegacyPage page={page} html={legacySources.updates} title={meta.updates.title} />;
    case "contact":
      return (
        <LegacyPage
          page={page}
          html={legacySources.contact}
          title={meta.contact.title}
          enableContactEffects
        />
      );
    case "chatkode":
      return <ChatKodePage />;
    case "webprojects":
      return <WebProjectPage />;
    case "pipeline":
      return <PipelinePage />;
    case "not-found":
    default:
      return <LegacyPage page="not-found" html={legacySources.notFound} title={meta.notFound.title} />;
  }
}
