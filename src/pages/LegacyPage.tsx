import { useEffect, useMemo } from "react";
import { extractBody, rewriteLegacyHtml, type PageKey } from "@/lib/routes";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useKodeEffects } from "@/hooks/useKodeEffects";
import { assetHref } from "@/lib/routes";

type LegacyPageProps = {
  page: PageKey;
  html: string;
  title: string;
  description?: string;
  enableRating?: boolean;
  enableContactEffects?: boolean;
  enableProjectEffects?: boolean;
};

export function LegacyPage({
  page,
  html,
  title,
  description,
  enableRating = false,
  enableContactEffects = false,
  enableProjectEffects = false,
}: LegacyPageProps) {
  useDocumentMeta(title, description);
  useKodeEffects(page);

  const content = useMemo(() => rewriteLegacyHtml(extractBody(html)), [html]);

  useEffect(() => {
    if (!enableRating) return;
    const ratingMsg = document.getElementById("ratingMsg");
    const ratingStars = Array.from(document.querySelectorAll<HTMLButtonElement>("#rating button"));

    async function loadAverageRating() {
      if (!ratingMsg) return;
      try {
        const res = await fetch("/.netlify/functions/addRating?mode=average");
        const data = await res.json();
        if (data.avg !== undefined) {
          let average = document.getElementById("avgRating");
          if (!average) {
            average = document.createElement("p");
            average.id = "avgRating";
            average.className = "rating-message";
            ratingMsg.parentNode?.insertBefore(average, ratingMsg);
          }
          average.textContent = `Average rating: ${data.avg} / 5 (${data.count} reviews)`;
        }
      } catch (error) {
        console.error("Error loading average rating:", error);
      }
    }

    async function setRating(stars: number) {
      ratingStars.forEach((star, index) => {
        star.classList.toggle("text-yellow-400", index < stars);
        star.classList.toggle("text-gray-500", index >= stars);
        star.classList.add("animate-bounce");
        window.setTimeout(() => star.classList.remove("animate-bounce"), 500);
      });

      if (ratingMsg) {
        ratingMsg.classList.remove("hidden");
        ratingMsg.textContent = `Thanks! You rated us ${stars} out of 5.`;
      }

      try {
        const res = await fetch("/.netlify/functions/addRating", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stars }),
        });
        const data = await res.json();
        if (data.success) loadAverageRating();
      } catch (error) {
        console.error("Error saving rating:", error);
      }
    }

    window.setRating = setRating;
    loadAverageRating();
    return () => {
      delete window.setRating;
    };
  }, [enableRating]);

  useEffect(() => {
    if (!enableContactEffects) return;
    const contactTitle = document.querySelector<HTMLElement>("#contact h2");
    const onMove = (event: MouseEvent) => {
      const moveX = (event.clientX - window.innerWidth / 2) * 0.015;
      const moveY = (event.clientY - window.innerHeight / 2) * 0.015;
      if (contactTitle) contactTitle.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const links = Array.from(document.querySelectorAll<HTMLElement>("a"));
    links.forEach(link => {
      link.style.transition = "all .25s ease";
    });
    const enter = (event: Event) => {
      (event.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
    };
    const leave = (event: Event) => {
      (event.currentTarget as HTMLElement).style.transform = "translateY(0)";
    };
    links.forEach(link => {
      link.addEventListener("mouseenter", enter);
      link.addEventListener("mouseleave", leave);
    });

    document.querySelectorAll<HTMLElement>("#contact .glass-card").forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
    });

    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      links.forEach(link => {
        link.removeEventListener("mouseenter", enter);
        link.removeEventListener("mouseleave", leave);
      });
    };
  }, [enableContactEffects]);

  useEffect(() => {
    if (!enableProjectEffects) return;
    const modal = document.getElementById("game-modal") as HTMLDialogElement | null;
    const frame = document.getElementById("game-frame") as HTMLIFrameElement | null;
    const title = document.getElementById("game-modal-title");
    const closeButton = document.querySelector<HTMLButtonElement>(".game-modal__close");
    if (!modal || !frame || !title || !closeButton) return;

    const close = () => {
      modal.close();
      frame.src = "";
    };

    const openHandlers: Array<[HTMLButtonElement, () => void]> = [];
    document.querySelectorAll<HTMLButtonElement>(".game-play").forEach(button => {
      const handler = () => {
        title.textContent = button.dataset.title || "Mini Game";
        frame.src = assetHref(`docs/Assets/MiniGames/${button.dataset.game}/index.html`);
        modal.showModal();
        closeButton.blur();
        frame.tabIndex = 0;
        frame.focus();
      };
      button.addEventListener("click", handler);
      openHandlers.push([button, handler]);
    });

    const modalClick = (event: MouseEvent) => {
      if (event.target === modal) close();
    };

    closeButton.addEventListener("click", close);
    modal.addEventListener("click", modalClick);
    return () => {
      openHandlers.forEach(([button, handler]) => button.removeEventListener("click", handler));
      closeButton.removeEventListener("click", close);
      modal.removeEventListener("click", modalClick);
    };
  }, [enableProjectEffects]);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

declare global {
  interface Window {
    setRating?: (stars: number) => Promise<void>;
  }
}
