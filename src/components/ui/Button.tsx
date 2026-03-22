import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "surface" | "icon";
  size?: "sm" | "md" | "icon";
  fullWidth?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-sans font-semibold transition outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--primary-container)]/20 disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[linear-gradient(90deg,var(--primary-container),var(--primary-fixed-dim))] text-[color:var(--on-primary-fixed)] hover:brightness-105 active:scale-[0.99] shadow-ambient",
  secondary:
    "bg-secondary_container text-[color:var(--on-secondary-container)] hover:brightness-105 active:scale-[0.99]",
  tertiary:
    "bg-transparent text-[color:var(--surface-tint)] hover:text-[color:var(--primary-container)]",
  surface:
    "bg-surface_container text-[color:var(--on-surface)] hover:bg-surface_container_highest",
  icon: "bg-surface_container text-[color:var(--on-surface-variant)] hover:bg-surface_container_highest hover:text-[color:var(--on-surface)]",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "rounded-md px-3.5 py-2.5 text-sm",
  md: "rounded-md px-5 py-3 text-sm",
  icon: "h-9 w-9 rounded-md p-0",
};

export function Button({
  children,
  className = "",
  variant = "surface",
  size = "md",
  fullWidth = false,
  type = "button",
  ...props
}: ButtonProps): React.JSX.Element {
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${className}`.trim()}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
