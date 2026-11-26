import type { HTMLAttributes, ReactNode } from "react";
type Props = HTMLAttributes<HTMLDivElement> & { children: ReactNode };
export function GlassPanel({ children, className = "", ...props }: Props) { return <div className={`origin-glass ${className}`} {...props}><div className="glass-content">{children}</div></div>; }
