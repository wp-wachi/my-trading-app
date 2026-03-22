import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "surface" | "icon";
  size?: "sm" | "md" | "icon";
  fullWidth?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-semibold transition outline-none focus-visible:ring-1 focus-visible:ring-primary_container/20 disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-primary_container to-primary_fixed_dim text-on_primary_fixed hover:brightness-105 active:scale-[0.99] shadow-ambient",
  secondary:
    "bg-secondary_container text-on_secondary_container hover:brightness-105 active:scale-[0.99]",
  tertiary: "bg-transparent text-surface_tint hover:text-primary_container",
  surface:
    "bg-surface_container text-on_surface hover:bg-surface_container_highest",
  icon: "bg-surface_container text-on_surface_variant hover:bg-surface_container_highest hover:text-on_surface",
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
