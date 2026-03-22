import Link from "next/link";
import {
  BookOpen,
  Bot,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  LogOut,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

interface SidebarItem {
  key: "dashboard" | "trade-journal" | "add-trade" | "analytics";
  label: string;
  href: string;
  icon: ReactNode;
}

interface AppSidebarProps {
  activeItem: SidebarItem["key"];
}

const NAV_ITEMS: SidebarItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: <LayoutDashboard size={16} />,
  },
  {
    key: "trade-journal",
    label: "Trade Journal",
    href: "/trade-journal",
    icon: <BookOpen size={16} />,
  },
  {
    key: "add-trade",
    label: "Add Trade",
    href: "#",
    icon: <Plus size={16} />,
  },
  {
    key: "analytics",
    label: "Analytics",
    href: "#",
    icon: <LineChart size={16} />,
  },
];

export function AppSidebar({ activeItem }: AppSidebarProps): React.JSX.Element {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 min-w-64 shrink-0 basis-64 flex-col overflow-hidden overscroll-none bg-surface_container_low px-4 py-5 md:flex">
      <div className="mb-10 px-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-[0.2rem] bg-primary_container text-on_primary_fixed">
            <Bot size={16} />
          </span>
          <div>
            <p className="font-display text-[1.4rem] font-semibold leading-none tracking-tight text-primary_container">
              Kinetic Vault
            </p>
            <p className="mt-1 font-sans text-[0.6875rem] uppercase tracking-[0.22em] text-on_surface_variant">
              Pro Trader Tier
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === activeItem;
          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-sans text-[0.8125rem] transition ${
                isActive
                  ? "bg-surface_container text-primary_container"
                  : "text-on_surface_variant hover:bg-surface_container hover:text-on_surface"
              }`}
            >
              <span className={`${isActive ? "opacity-100" : "opacity-80"}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-6 px-2 pt-6">
        <Button fullWidth variant="primary" size="sm">
          Deposit Funds
        </Button>

        <div className="space-y-3 pb-2">
          <button
            className="flex items-center gap-3 font-sans text-[0.8125rem] text-on_surface_variant transition hover:text-on_surface"
            type="button"
          >
            <HelpCircle size={16} />
            Support
          </button>
          <button
            className="flex items-center gap-3 font-sans text-[0.8125rem] text-on_surface_variant transition hover:text-on_surface"
            type="button"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
