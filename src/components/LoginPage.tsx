import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "password";
  trailingLink?: {
    label: string;
    href: string;
  };
}

function BrandHeader(): React.JSX.Element {
  return (
    <header className="mb-12 text-center">
      <div className="mb-2 inline-flex items-center gap-3">
        <Terminal className="h-8 w-8 text-primary_container" strokeWidth={2.4} />
        <h1 className="font-display text-4xl font-bold tracking-tight text-on_surface">
          Kinetic <span className="text-primary_container">Vault</span>
        </h1>
      </div>
      <p className="font-sans text-sm tracking-wide text-on_surface_variant">
        PRECISION ASSET TERMINAL v4.2
      </p>
    </header>
  );
}

function InputField({
  id,
  label,
  placeholder,
  type = "text",
  trailingLink,
}: InputFieldProps): React.JSX.Element {
  return (
    <div className="space-y-1.5">
      <div className="flex items-end justify-between">
        <label
          className="block font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-on_surface_variant"
          htmlFor={id}
        >
          {label}
        </label>
        {trailingLink ? (
          <Link
            className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary_container transition hover:text-primary_fixed"
            href={trailingLink.href}
          >
            {trailingLink.label}
          </Link>
        ) : null}
      </div>

      <div className="group relative">
        <input
          className="w-full rounded-lg bg-surface_container_low px-4 py-3 text-sm text-on_surface placeholder:text-on_surface_variant/40 outline-none transition focus:bg-surface_container_highest"
          id={id}
          placeholder={placeholder}
          type={type}
        />
        <div className="pointer-events-none absolute inset-0 rounded-lg border border-[color:var(--outline-variant)]/10 group-focus-within:border-primary_container/20" />
      </div>
    </div>
  );
}

function OrDivider(): React.JSX.Element {
  return (
    <div className="relative flex items-center py-2">
      <div className="h-px flex-1 bg-[color:var(--outline-variant)]/10" />
      <span className="mx-4 font-sans text-[0.625rem] tracking-[0.2em] text-on_surface_variant/50">
        OR
      </span>
      <div className="h-px flex-1 bg-[color:var(--outline-variant)]/10" />
    </div>
  );
}

function GoogleDisabledButton(): React.JSX.Element {
  return (
    <button
      className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-lg border border-[color:var(--outline-variant)]/10 bg-surface_container py-3 text-sm text-on_surface_variant/40 opacity-60"
      disabled
      type="button"
    >
      <svg className="h-5 w-5 opacity-50 grayscale" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="currentColor"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="currentColor"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="currentColor"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="currentColor"
        />
      </svg>
      Sign in with Google
    </button>
  );
}

function LoginCard(): React.JSX.Element {
  return (
    <div className="rounded-xl border border-[color:var(--outline-variant)]/15 bg-[rgba(29,32,35,0.6)] p-8 shadow-ambient backdrop-blur-[20px]">
      <div className="mb-8">
        <h2 className="mb-1 font-display text-[1.6rem] font-bold text-on_surface">
          Welcome back, Trader
        </h2>
        <p className="text-sm text-on_surface_variant">
          Access your encrypted trading perimeter.
        </p>
      </div>

      <form className="space-y-6">
        <InputField
          id="email"
          label="Terminal Identity"
          placeholder="email@kinetic-vault.com"
          type="email"
        />

        <InputField
          id="password"
          label="Access Key"
          placeholder="••••••••••••"
          type="password"
          trailingLink={{ label: "Forgot?", href: "#" }}
        />

        <Button
          className="w-full py-3.5 font-display text-sm font-bold tracking-[0.04em]"
          type="submit"
          variant="primary"
        >
          <span>INITIALIZE SESSION</span>
          <ArrowRight className="h-4 w-4" />
        </Button>

        <OrDivider />

        <GoogleDisabledButton />
      </form>
    </div>
  );
}

function FooterLinks(): React.JSX.Element {
  return (
    <footer className="mt-8 space-y-4 text-center">
      <p className="text-sm text-on_surface_variant">
        Don&apos;t have an account?{" "}
        <Link
          className="font-semibold text-primary_container underline-offset-4 decoration-primary_container/30 hover:underline"
          href="#"
        >
          Sign Up
        </Link>
      </p>

      <div className="flex items-center justify-center gap-6 border-t border-[color:var(--outline-variant)]/5 pt-4">
        <Link className="text-[0.625rem] uppercase tracking-[0.14em] text-on_surface_variant/50 hover:text-on_surface" href="#">
          Privacy Protocol
        </Link>
        <Link className="text-[0.625rem] uppercase tracking-[0.14em] text-on_surface_variant/50 hover:text-on_surface" href="#">
          System Status
        </Link>
        <Link className="text-[0.625rem] uppercase tracking-[0.14em] text-on_surface_variant/50 hover:text-on_surface" href="#">
          Support
        </Link>
      </div>
    </footer>
  );
}

function BackgroundDecor(): React.JSX.Element {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1d2023_0%,#111417_60%)]" />
      <div className="absolute -right-[10%] -top-[20%] h-[500px] w-[500px] rounded-full bg-primary_container/5 blur-[120px]" />
      <div className="absolute -bottom-[20%] -left-[10%] h-[400px] w-[400px] rounded-full bg-secondary_container/5 blur-[100px]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#849587 1px, transparent 1px), linear-gradient(90deg, #849587 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

export function LoginPage(): React.JSX.Element {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-surface p-6 text-on_surface">
      <BackgroundDecor />

      <main className="w-full max-w-[420px]">
        <BrandHeader />
        <LoginCard />
        <FooterLinks />
      </main>
    </div>
  );
}

export default LoginPage;
