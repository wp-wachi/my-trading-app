import Link from "next/link";
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  LineChart,
  MoreVertical,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/Button";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  accent?: "green" | "red" | "neutral";
  children?: React.ReactNode;
}

export interface TradeJournalRow {
  id: string;
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

export interface TradeJournalMetrics {
  totalPnl: string;
  winRate: string;
  totalTrades: number;
}

interface TradeJournalProps {
  trades: TradeJournalRow[];
  metrics: TradeJournalMetrics;
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
          <Button
            className="h-8 w-8 rounded-[0.55rem] bg-[#f1cda4] text-[#7a4f2a] hover:bg-[#f3d7b6] hover:text-[#7a4f2a]"
            size="icon"
            variant="icon"
          >
            <FileText size={14} />
          </Button>
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
        ? "text-secondary_container"
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

function Metrics({
  metrics,
}: {
  metrics: TradeJournalMetrics;
}): React.JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.2fr_1.2fr_0.8fr_1.6fr]">
      <MetricCard title="Total P/L" value={metrics.totalPnl} accent="green" />
      <MetricCard title="Win Rate" value={metrics.winRate} />
      <MetricCard
        title="Trades"
        value={String(metrics.totalTrades)}
        subtitle="All records"
      />
      <MetricCard title="Current Drawdown" value="--" accent="red" />
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
          className="w-full rounded-md bg-surface_container_low px-9 py-2.5 text-sm text-on_surface placeholder:text-[#6f7680] outline-none transition focus:bg-surface_container_highest focus:ring-1 focus:ring-primary_container/20"
          placeholder="Search assets..."
          type="text"
        />
      </div>

      <Button size="sm" variant="surface">
        <CalendarDays size={14} />
        Last 30 Days
      </Button>

      <Button size="sm" variant="surface">
        <LineChart size={14} />
        All Assets
      </Button>

      <Button className="text-[#97a1ac]" size="icon" variant="icon">
        <MoreVertical size={16} />
      </Button>

      <Button className="ml-0 lg:ml-auto" size="sm" variant="primary">
        <Plus size={14} />
        Log New Trade
      </Button>
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

function TradeTableRow({ row }: { row: TradeJournalRow }): React.JSX.Element {
  const sideClass =
    row.side === "BUY"
      ? "text-primary_container bg-primary_container/15"
      : "text-secondary_container bg-secondary_container/15";

  const pnlClass = row.pnl.startsWith("-")
    ? "text-secondary_container"
    : row.pnl === "--"
      ? "text-on_surface_variant"
      : "text-primary_container";

  const statusClass =
    row.status === "OPEN"
      ? "bg-primary_container/15 text-primary_container"
      : "bg-surface_container_high text-[#9da6af]";

  return (
    <div className="grid grid-cols-[1.2fr_1fr_0.65fr_1fr_1fr_0.9fr_0.85fr_0.55fr] items-center rounded-md bg-surface_container px-4 py-5 text-sm text-on_surface transition hover:bg-surface_container_highest">
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

      <p className="font-display text-[#d6dbe0]">{row.entryPrice}</p>
      <p className="font-display text-[#d6dbe0]">{row.exitPrice}</p>
      <p className={`font-display font-semibold ${pnlClass}`}>{row.pnl}</p>

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

function TradeTable({
  trades,
}: {
  trades: TradeJournalRow[];
}): React.JSX.Element {
  return (
    <section className="mt-6 overflow-hidden rounded-lg bg-surface_container_lowest/55">
      <TradeTableHeader />
      <div className="space-y-2 px-2 pb-2">
        {trades.map((row) => (
          <TradeTableRow key={row.id} row={row} />
        ))}
      </div>
    </section>
  );
}

function Pagination({
  totalTrades,
  pageSize,
}: {
  totalTrades: number;
  pageSize: number;
}): React.JSX.Element {
  const shown: number = Math.min(totalTrades, pageSize);

  return (
    <section className="mt-4 flex items-center justify-between">
      <p className="text-xs text-[#73808c]">
        Showing {shown === 0 ? 0 : 1} to {shown} of {totalTrades} trades
      </p>
      <div className="flex items-center gap-1">
        <Button
          className="h-7 w-7 rounded text-[#8b94a0]"
          size="icon"
          variant="surface"
        >
          <ChevronLeft size={14} />
        </Button>
        <Button
          className="h-7 w-7 rounded shadow-none"
          size="icon"
          variant="primary"
        >
          1
        </Button>
        <Button
          className="h-7 w-7 rounded text-[#8b94a0]"
          size="icon"
          variant="surface"
        >
          <ChevronRight size={14} />
        </Button>
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

export function TradeJournal({
  trades,
  metrics,
}: TradeJournalProps): React.JSX.Element {
  return (
    <div className="min-h-screen bg-surface text-on_surface">
      <div className="flex min-h-screen">
        <AppSidebar activeItem="trade-journal" />

        <main className="w-full px-6 pb-8 md:px-8 lg:px-10">
          <TopNavigation />
          <Metrics metrics={metrics} />
          <Filters />
          <TradeTable trades={trades} />
          <Pagination
            pageSize={trades.length}
            totalTrades={metrics.totalTrades}
          />
          <ActivityToast />
        </main>
      </div>
    </div>
  );
}

export default TradeJournal;
