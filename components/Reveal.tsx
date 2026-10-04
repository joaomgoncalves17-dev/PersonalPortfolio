import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  // "view": aparece ao entrar no ecrã. "load": aparece ao carregar a página (hero).
  on?: "view" | "load";
};

// Animação só em CSS (ver globals.css): o conteúdo fica visível sem JavaScript,
// em browsers sem scroll-driven animations e com prefers-reduced-motion.
export function Reveal({ children, className = "", delay = 0, on = "view" }: Props) {
  const style = { "--reveal-delay": `${delay}s` } as CSSProperties;
  return (
    <div className={`${on === "load" ? "reveal-load" : "reveal-view"} ${className}`} style={style}>
      {children}
    </div>
  );
}
