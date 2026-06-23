import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20",
  secondary:
    "border border-border bg-card text-foreground hover:bg-muted-bg",
  ghost: "text-accent hover:bg-accent-light",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-2xl px-6 py-3.5 text-base font-semibold transition-all duration-200 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
