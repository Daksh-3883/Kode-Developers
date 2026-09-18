import { useEffect } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { ScrollTop } from "./ScrollTop";
import type { PageKey } from "@/lib/routes";

export function SiteShell({ page, children }: { page: PageKey; children: React.ReactNode }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.toggle("dark-theme", savedTheme === "dark");
    document.body.classList.toggle("light-theme", savedTheme !== "dark");
  }, []);

  return (
    <>
      <Navbar page={page} />
      {children}
      <Footer />
      <ScrollTop />
    </>
  );
}
