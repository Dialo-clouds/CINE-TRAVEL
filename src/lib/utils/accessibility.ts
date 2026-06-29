export const accessibilityStyles = {
  focusRing: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  srOnly: "sr-only",
  skipLink: "fixed top-0 left-0 z-[100] px-4 py-2 bg-white text-black -translate-y-full focus:translate-y-0 transition-transform",
};

export function getAriaLabel(page: string, action?: string): string {
  const labels: Record<string, string> = {
    book: "Book a flight",
    explore: "Explore destinations",
    login: "Sign in to your account",
    customer: "Customer dashboard",
    search: "Search flights",
    menu: "Open navigation menu",
  };
  return action ? `${action} - ${labels[page] || page}` : labels[page] || page;
}

export function announceToScreenReader(message: string) {
  if (typeof document === "undefined") return;
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 3000);
}