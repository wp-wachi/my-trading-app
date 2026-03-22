import Link from "next/link";
import {
  Bell,
  BookOpen,
  Bot,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LineChart,
  LogOut,
  MoreVertical,
  Plus,
  Search,
  Settings,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  accent?: "green" | "red" | "neutral";
  children?: React.ReactNode;
}

interface TradeRow {
  date: string;
  time: string;
  asset: string;
  side: "BUY" | "SELL";
  entryPrice: string;
  exitPrice: string;
  pnl: string;
  status: "OPEN" | "CLOSED";
  badgeColor: string;
  symbol: string;
}

const trades: TradeRow[] = [
  {
    date: "Oct 24, 2023",
    time: "14:20",
    asset: "BTC / USD",
    side: "BUY",
    entryPrice: "$34,210.50",
    exitPrice: "$35,120.00",
    pnl: "+$909.50",
    status: "CLOSED",
    badgeColor: "bg-amber-500/20 text-amber-300",
    symbol: "B",
  },
  {
    date: "Oct 24, 2023",
    time: "11:05",
    asset: "ETH / USD",
    side: "SELL",
    entryPrice: "$1,850.25",
    exitPrice: "$1,865.10",
    pnl: "-$14.85",
    status: "CLOSED",
    badgeColor: "bg-indigo-500/20 text-indigo-300",
    symbol: "E",
  },
  {
    date: "Oct 23, 2023",
    time: "23:45",
    asset: "AAPL",
    side: "BUY",
    entryPrice: "$173.44",
    exitPrice: "--",
    pnl: "+$2.12",
    status: "OPEN",
    badgeColor: "bg-slate-400/20 text-slate-200",
    symbol: "I",
  },
  {
    date: "Oct 23, 2023",
    time: "09:12",
    asset: "BTC / USD",
    side: "SELL",
    entryPrice: "$33,850.00",
    exitPrice: "$33,200.00",
    pnl: "+$650.00",
    status: "CLOSED",
    badgeColor: "bg-amber-500/20 text-amber-300",
    symbol: "B",
  },
  {
    date: "Oct 22, 2023",
    time: "18:30",
    asset: "SOL / USD",
    side: "BUY",
    entryPrice: "$28.15",
    exitPrice: "$32.50",
    pnl: "+$4.35",
    status: "CLOSED",
    badgeColor: "bg-emerald-500/20 text-emerald-300",
    symbol: "S",
  },
];

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}): React.JSX.Element {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
        active
          ? "bg-surface_container text-primary_container"
          : "text-[#6f7680] hover:bg-surface_container hover:text-on_surface"
      }`}
      type="button"
    >
      <span className="opacity-90">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function Sidebar(): React.JSX.Element {
  return (
    <aside className="hidden min-h-screen w-64 flex-col bg-surface_container_lowest px-4 py-6 md:flex">
      <div className="mb-8 px-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-[0.2rem] bg-primary_container text-on_primary_fixed">
            <Bot size={16} />
          </span>
          <div>
            <p className="font-display text-[1.75rem] font-semibold leading-none tracking-tight text-primary_container">
              Kinetic Vault
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#728090]">
              Pro Trader Tier
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <SidebarItem icon={<LayoutDashboard size={16} />} label="Dashboard" />
        <SidebarItem
          icon={<BookOpen size={16} />}
          label="Trade Journal"
          active
        />
        <SidebarItem icon={<Plus size={16} />} label="Add Trade" />
        <SidebarItem icon={<LineChart size={16} />} label="Analytics" />
      </div>

      <div className="mt-auto space-y-6 px-2">
        <button
          className="w-full rounded-md bg-primary_container px-4 py-2.5 text-sm font-semibold text-on_primary_fixed transition hover:bg-primary_fixed_dim"
          type="button"
        >
          Deposit Funds
        </button>

        <div className="space-y-3 pb-2">
          <button
            className="flex items-center gap-3 text-sm text-[#6f7680] transition hover:text-on_surface"
            type="button"
          >
            <BookOpen size={16} />
            Support
          </button>
          <button
            className="flex items-center gap-3 text-sm text-[#6f7680] transition hover:text-on_surface"
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

function TopNavigation(): React.JSX.Element {
  return (
    <header className="flex items-center justify-between py-7">
      <h1 className="font-display text-[2rem] font-semibold tracking-tight text-on_surface">
        Trade Journal
      </h1>

      <div className="flex items-center gap-8">
        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            className="text-sm text-[#a3a9b2] transition hover:text-on_surface"
            href="#"
          >
            Market
          </Link>
          <Link
            className="text-sm text-[#a3a9b2] transition hover:text-on_surface"
            href="#"
          >
            Portfolio
          </Link>
          <Link
            className="text-sm text-[#a3a9b2] transition hover:text-on_surface"
            href="#"
          >
            Academy
          </Link>
        </nav>

        <div className="flex items-center gap-4 text-[#9ea6af]">
          <button type="button">
            <Bell size={16} />
          </button>
          <button type="button">
            <Settings size={16} />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-[0.55rem] bg-[#f1cda4] text-[#7a4f2a]"
            type="button"
          >
            <FileText size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  accent = "neutral",
  children,
}: MetricCardProps): React.JSX.Element {
  const accentColor =
    accent === "green"
      ? "text-primary_container"
      : accent === "red"
        ? "text-[#ff9da7]"
        : "text-on_surface";

  return (
    <section className="rounded-lg bg-surface_container px-5 py-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[#7d8792]">
        {title}
      </p>
      <p
        className={`mt-2 font-display text-[2.6rem] font-bold leading-none ${accentColor}`}
      >
        {value}
      </p>
      {subtitle ? (
        <p className="mt-2 text-xs text-[#7d8792]">{subtitle}</p>
      ) : null}
      {children}
    </section>
  );
}

function Metrics(): React.JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.2fr_1.2fr_0.8fr_1.6fr]">
      <MetricCard
        title="Total P/L"
        value="+$12,482.00"
        subtitle="↗ 14.2% Monthly"
        accent="green"
      />

      <MetricCard title="Win Rate" value="68.4%">
        <div className="mt-3 h-[3px] w-full rounded-full bg-[#2c3238]">
          <div className="h-[3px] w-[68%] rounded-full bg-primary_container" />
        </div>
      </MetricCard>

      <MetricCard title="Trades" value="142" subtitle="Last 30 days" />

      <MetricCard title="Current Drawdown" value="-2.1%" accent="red">
        <svg
          className="mt-3 h-10 w-28"
          viewBox="0 0 120 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 28 C 18 8, 28 35, 44 17 S 72 4, 84 30 S 105 20, 116 8"
            fill="none"
            stroke="#f4a1aa"
            strokeWidth="2"
          />
          <path
            d="M108 7 L112 0 L114 12"
            fill="none"
            stroke="#f4a1aa"
            strokeWidth="2"
          />
        </svg>
      </MetricCard>
    </div>
  );
}

function Filters(): React.JSX.Element {
  return (
    <section className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative w-full lg:max-w-[240px]">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6f7680]"
          size={14}
        />
        <input
          className="w-full rounded-md bg-surface_container px-9 py-2.5 text-sm text-on_surface placeholder:text-[#6f7680] outline-none"
          placeholder="Search assets..."
          type="text"
        />
      </div>

      <button
        className="inline-flex items-center gap-2 rounded-md bg-surface_container px-3.5 py-2.5 text-sm text-on_surface"
        type="button"
      >
        <CalendarDays size={14} />
        Last 30 Days
      </button>

      <button
        className="inline-flex items-center gap-2 rounded-md bg-surface_container px-3.5 py-2.5 text-sm text-on_surface"
        type="button"
      >
        <LineChart size={14} />
        All Assets
      </button>

      <button
        className="inline-flex items-center justify-center rounded-md bg-surface_container p-2.5 text-[#97a1ac]"
        type="button"
      >
        <MoreVertical size={16} />
      </button>

      <button
        className="ml-0 inline-flex items-center justify-center gap-2 rounded-md bg-primary_container px-5 py-2.5 text-sm font-semibold text-on_primary_fixed transition hover:bg-primary_fixed_dim lg:ml-auto"
        type="button"
      >
        <Plus size={14} />
        Log New Trade
      </button>
    </section>
  );
}

function TradeTableHeader(): React.JSX.Element {
  const columns = [
    "Date",
    "Asset",
    "Side",
    "Entry Price",
    "Exit Price",
    "P&L",
    "Status",
    "Notes",
  ];
  return (
    <div className="grid grid-cols-[1.2fr_1fr_0.65fr_1fr_1fr_0.9fr_0.85fr_0.55fr] items-center px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-[#78818c]">
      {columns.map((column) => (
        <p key={column}>{column}</p>
      ))}
    </div>
  );
}

function TradeTableRow({ row }: { row: TradeRow }): React.JSX.Element {
  const sideClass =
    row.side === "BUY"
      ? "text-primary_container bg-primary_container/15"
      : "text-[#ff8f99] bg-[#ff8f99]/15";
  const pnlClass = row.pnl.startsWith("-")
    ? "text-[#ff9aa4]"
    : "text-primary_container";
  const statusClass =
    row.status === "OPEN"
      ? "bg-primary_container/15 text-primary_container"
      : "bg-surface_container_high text-[#9da6af]";

  return (
    <div className="grid grid-cols-[1.2fr_1fr_0.65fr_1fr_1fr_0.9fr_0.85fr_0.55fr] items-center px-4 py-5 text-sm text-on_surface hover:bg-surface_container_highest/30">
      <div>
        <p className="text-[1rem] text-[#b7bfc7]">{row.date}</p>
        <p className="text-[1rem] text-[#b7bfc7]">{row.time}</p>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold ${row.badgeColor}`}
        >
          {row.symbol}
        </span>
        <p className="font-semibold text-on_surface">{row.asset}</p>
      </div>

      <div>
        <span
          className={`rounded-sm px-1.5 py-0.5 text-[10px] font-semibold ${sideClass}`}
        >
          {row.side}
        </span>
      </div>

      <p className="text-[#d6dbe0]">{row.entryPrice}</p>
      <p className="text-[#d6dbe0]">{row.exitPrice}</p>
      <p className={`font-semibold ${pnlClass}`}>{row.pnl}</p>

      <div>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide ${statusClass}`}
        >
          {row.status}
        </span>
      </div>

      <button
        className="text-[#8d97a3] transition hover:text-on_surface"
        type="button"
      >
        <FileText size={14} />
      </button>
    </div>
  );
}

function TradeTable(): React.JSX.Element {
  return (
    <section className="mt-6 overflow-hidden rounded-lg bg-surface_container_lowest/55">
      <TradeTableHeader />
      <div className="divide-y divide-[#1a2028]">
        {trades.map((row) => (
          <TradeTableRow
            key={`${row.date}-${row.time}-${row.asset}`}
            row={row}
          />
        ))}
      </div>
    </section>
  );
}

function Pagination(): React.JSX.Element {
  return (
    <section className="mt-4 flex items-center justify-between">
      <p className="text-xs text-[#73808c]">Showing 1 to 5 of 142 trades</p>
      <div className="flex items-center gap-1">
        <button
          className="inline-flex h-7 w-7 items-center justify-center rounded bg-surface_container text-[#8b94a0]"
          type="button"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          className="inline-flex h-7 w-7 items-center justify-center rounded bg-primary_container text-on_primary_fixed"
          type="button"
        >
          1
        </button>
        <button
          className="inline-flex h-7 w-7 items-center justify-center rounded bg-surface_container text-[#8b94a0]"
          type="button"
        >
          2
        </button>
        <button
          className="inline-flex h-7 w-7 items-center justify-center rounded bg-surface_container text-[#8b94a0]"
          type="button"
        >
          3
        </button>
        <button
          className="inline-flex h-7 w-7 items-center justify-center rounded bg-surface_container text-[#8b94a0]"
          type="button"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </section>
  );
}

function ActivityToast(): React.JSX.Element {
  return (
    <div className="mt-10 flex w-fit items-center gap-3 rounded-lg bg-surface_container px-3 py-2 text-xs text-[#bcc3cb] lg:ml-auto">
      <div className="flex -space-x-1.5">
        <span className="h-6 w-6 rounded-full bg-[#9bb1c4]" />
        <span className="h-6 w-6 rounded-full bg-[#bfa287]" />
      </div>
      <p>12 other vault members logged trades just now</p>
    </div>
  );
}

export function TradeJournal(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-surface text-on_surface">
      <div className="mx-auto flex max-w-[1440px]">
        <Sidebar />

        <main className="w-full px-6 pb-8 md:px-8 lg:px-10">
          <TopNavigation />
          <Metrics />
          <Filters />
          <TradeTable />
          <Pagination />
          <ActivityToast />
        </main>
      </div>
    </div>
  );
}

export default TradeJournal;
