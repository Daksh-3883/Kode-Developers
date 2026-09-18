export function ScrollTop() {
  return (
    <button
      id="scroll-top"
      className="scroll-top"
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6 10 6-6 6 6M12 4v16" />
      </svg>
    </button>
  );
}
