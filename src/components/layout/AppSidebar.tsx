import Link from "next/link";
import {
  BookOpen,
  Bot,
  FileJson,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  LogOut,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

interface SidebarItem {
  key:
    | "dashboard"
    | "trade-journal"
    | "add-trade"
    | "analytics"
    | "import-trades";
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
    href: "/add-trade",
    icon: <Plus size={16} />,
  },
  {
    key: "analytics",
    label: "Analytics",
    href: "#",
    icon: <LineChart size={16} />,
  },
  {
    key: "import-trades",
    label: "Import Trades",
    href: "/import-trades",
    icon: <FileJson size={16} />,
  },
];

export function AppSidebar({ activeItem }: AppSidebarProps): React.JSX.Element {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 min-w-64 shrink-0 basis-64 flex-col overflow-hidden overscroll-none bg-surface_container_lowest py-8 md:flex">
      <div className="mb-10 px-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary_container text-on_primary_fixed">
            <Bot size={16} />
          </span>
          <div>
            <p className="font-display text-xl font-black leading-none text-primary_container">
              Kinetic Vault
            </p>
            <p className="mt-1 font-sans text-xs text-on_surface_variant">
              Pro Trader Tier
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === activeItem;
          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`mr-4 flex w-auto items-center gap-4 rounded-r-full px-6 py-3 text-left font-sans text-[0.875rem] transition-all duration-300 ${
                isActive
                  ? "bg-surface_container font-bold text-primary_container shadow-[inset_4px_0_0_0_#00F296]"
                  : "font-medium text-on_surface_variant/70 hover:bg-surface_container hover:text-on_surface"
              }`}
            >
              <span className={`${isActive ? "opacity-100" : "opacity-90"}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1 px-6">
        <Button
          className="mb-6 rounded-xl py-3 font-bold active:scale-95"
          fullWidth
          variant="primary"
          size="sm"
        >
          Deposit Funds
        </Button>

        <div className="pb-2">
          <button
            className="flex items-center gap-4 px-4 py-3 font-sans text-[0.875rem] font-medium text-on_surface_variant/70 transition hover:text-on_surface"
            type="button"
          >
            <HelpCircle size={16} />
            Support
          </button>
          <button
            className="flex items-center gap-4 px-4 py-3 font-sans text-[0.875rem] font-medium text-on_surface_variant/70 transition hover:text-on_surface"
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
