import {
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
  Search,
  Upload,
  Wallet,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/Button";

interface PreviewTrade {
  date: string;
  pair: string;
  side: "LONG" | "SHORT";
  entry: string;
  exit: string;
  pnl: string;
  token: string;
  tokenColor: string;
}

const PREVIEW_TRADES: PreviewTrade[] = [
  {
    date: "2023.11.24 10:00",
    pair: "BTC/USDT",
    side: "LONG",
    entry: "42,100.50",
    exit: "43,500.00",
    pnl: "+3.32%",
    token: "₿",
    tokenColor: "bg-orange-500/20 text-orange-400",
  },
  {
    date: "2023.11.23 15:20",
    pair: "ETH/USDT",
    side: "SHORT",
    entry: "2,450.00",
    exit: "2,410.15",
    pnl: "+1.63%",
    token: "Ξ",
    tokenColor: "bg-blue-500/20 text-blue-400",
  },
  {
    date: "2023.11.22 09:12",
    pair: "SOL/USDT",
    side: "LONG",
    entry: "58.40",
    exit: "56.20",
    pnl: "-3.77%",
    token: "S",
    tokenColor: "bg-purple-500/20 text-purple-400",
  },
];

function TopBar(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-surface_container px-10">
      <div className="flex items-center gap-12">
        <span className="font-display text-[1.9rem] font-bold tracking-tight text-primary_container">
          Kinetic Vault
        </span>
        <nav className="hidden gap-8 md:flex">
          <a
            className="text-sm font-medium text-on_surface_variant transition hover:text-on_surface"
            href="#"
          >
            Market
          </a>
          <a
            className="text-sm font-medium text-on_surface_variant transition hover:text-on_surface"
            href="#"
          >
            Portfolio
          </a>
          <a
            className="text-sm font-medium text-on_surface_variant transition hover:text-on_surface"
            href="#"
          >
            Academy
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-on_surface_variant" />
          <input
            className="w-64 rounded-full bg-surface_container_low px-10 py-1.5 text-xs text-on_surface outline-none transition focus:ring-1 focus:ring-primary_container/30"
            placeholder="Search assets..."
            type="text"
          />
        </div>

        <button
          className="rounded-full p-2 text-on_surface_variant transition hover:bg-surface_container_highest hover:text-on_surface"
          type="button"
        >
          <Bell className="h-4 w-4" />
        </button>
        <button
          className="rounded-full p-2 text-on_surface_variant transition hover:bg-surface_container_highest hover:text-on_surface"
          type="button"
        >
          <Wallet className="h-4 w-4" />
        </button>

        <div className="h-8 w-8 rounded-full border border-primary_container/20 bg-surface_container_highest" />
      </div>
    </header>
  );
}

function PageHeader(): React.JSX.Element {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <h1 className="font-display text-5xl font-bold tracking-tight text-on_surface">
          Import Trade Journal
        </h1>
        <p className="mt-2 text-on_surface_variant">
          Ingest broker API responses or raw JSON datasets to synchronize your
          vault.
        </p>
      </div>
      <Button className="px-6 py-2" size="sm" variant="surface">
        <Upload className="h-4 w-4" />
        Upload JSON File
      </Button>
    </div>
  );
}

function JsonEditorCard(): React.JSX.Element {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl bg-surface_container p-1 shadow-ambient">
        <div className="flex items-center justify-between rounded-t-lg bg-surface_container_high px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-error/40" />
            <span className="h-3 w-3 rounded-full bg-tertiary_container/40" />
            <span className="h-3 w-3 rounded-full bg-primary_container/40" />
            <span className="ml-4 font-mono text-xs text-on_surface_variant">
              terminal.raw_input.json
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary_container/60">
            READ/WRITE MODE
          </span>
        </div>

        <textarea
          className="h-[400px] w-full resize-none bg-surface_container_lowest p-6 font-mono text-sm text-primary_fixed outline-none placeholder:text-outline_variant"
          placeholder='[{ "id": "tr_9921", "asset": "BTC/USDT", "type": "LONG", "entry": 42100.50, "exit": 43500.00, "timestamp": "2023-11-24T10:00:00Z" }]'
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs text-on_surface_variant">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary_container" />
            Valid JSON format detected
          </span>
          <span className="opacity-50">1,244 bytes detected</span>
        </div>

        <div className="flex gap-3">
          <button
            className="rounded-lg border border-outline_variant px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-on_surface_variant transition hover:border-secondary_container hover:text-secondary_container"
            type="button"
          >
            Clear
          </button>
          <Button
            className="px-8 py-2.5 text-xs tracking-[0.16em]"
            size="sm"
            variant="primary"
          >
            Parse Trades
          </Button>
        </div>
      </div>
    </div>
  );
}

function SchemaGuideCard(): React.JSX.Element {
  return (
    <div className="rounded-xl border border-outline_variant/10 bg-surface_container_low p-6">
      <h3 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold">
        <Info className="h-5 w-5 text-primary_container" />
        Schema Guide
      </h3>
      <ul className="space-y-4 text-sm text-on_surface_variant">
        <li className="flex gap-3">
          <span className="h-fit rounded bg-primary_container/10 px-1.5 py-0.5 font-mono text-primary_container">
            id
          </span>
          <span>Unique transaction hash or local reference ID.</span>
        </li>
        <li className="flex gap-3">
          <span className="h-fit rounded bg-primary_container/10 px-1.5 py-0.5 font-mono text-primary_container">
            asset
          </span>
          <span>Trading pair (e.g., BTC/USDT or SOL/USD).</span>
        </li>
        <li className="flex gap-3">
          <span className="h-fit rounded bg-primary_container/10 px-1.5 py-0.5 font-mono text-primary_container">
            type
          </span>
          <span>
            Action: <em>LONG</em> or <em>SHORT</em>.
          </span>
        </li>
      </ul>
    </div>
  );
}

function BrokerSupportCard(): React.JSX.Element {
  const brokers = ["BINANCE", "BYBIT", "OKX", "KRAKEN"];

  return (
    <div className="rounded-xl border border-outline_variant/10 bg-surface_container_low p-6">
      <h3 className="mb-4 font-display text-2xl font-bold">Broker Support</h3>
      <div className="grid grid-cols-2 gap-3">
        {brokers.map((broker) => (
          <div
            key={broker}
            className="flex items-center justify-center rounded-lg bg-surface_container_highest p-3"
          >
            <span className="font-display text-xs font-bold opacity-60">
              {broker}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewHeader(): React.JSX.Element {
  return (
    <div className="flex items-center justify-between border-b border-outline_variant/10 bg-surface_container_low/50 px-8 py-6">
      <div>
        <h2 className="font-display text-4xl font-bold tracking-tight">
          Preview Trades
        </h2>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-on_surface_variant">
          3 Trades Detected in JSON Buffer
        </p>
      </div>
      <Button
        className="px-6 py-2.5 text-xs tracking-[0.16em]"
        size="sm"
        variant="primary"
      >
        <Check className="h-4 w-4" />
        Import into Vault
      </Button>
    </div>
  );
}

function PnlCell({ pnl }: { pnl: string }): React.JSX.Element {
  const isPositive = pnl.startsWith("+");
  return (
    <span
      className={`font-display text-2xl font-bold ${isPositive ? "text-primary_container" : "text-secondary"}`}
    >
      {pnl}
    </span>
  );
}

function PreviewTable(): React.JSX.Element {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="text-[10px] font-bold uppercase tracking-[0.2em] text-on_surface_variant">
            <th className="px-8 py-4">Date</th>
            <th className="px-8 py-4">Pair</th>
            <th className="px-8 py-4">Type</th>
            <th className="px-8 py-4">Entry</th>
            <th className="px-8 py-4">Exit</th>
            <th className="px-8 py-4 text-right">P/L</th>
          </tr>
        </thead>
        <tbody>
          {PREVIEW_TRADES.map((trade) => {
            const isLong = trade.side === "LONG";
            return (
              <tr
                key={`${trade.date}-${trade.pair}`}
                className="transition-colors hover:bg-surface_container_highest"
              >
                <td className="px-8 py-5 font-mono text-sm text-on_surface_variant">
                  {trade.date}
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${trade.tokenColor}`}
                    >
                      {trade.token}
                    </div>
                    <span className="font-display text-xl font-bold">
                      {trade.pair}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span
                    className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                      isLong
                        ? "bg-primary_container/10 text-primary_container"
                        : "bg-secondary_container/10 text-secondary"
                    }`}
                  >
                    {trade.side}
                  </span>
                </td>
                <td className="px-8 py-5 font-mono text-sm tabular-nums">
                  {trade.entry}
                </td>
                <td className="px-8 py-5 font-mono text-sm tabular-nums">
                  {trade.exit}
                </td>
                <td className="px-8 py-5 text-right">
                  <PnlCell pnl={trade.pnl} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PreviewFooter(): React.JSX.Element {
  return (
    <div className="flex items-center justify-between bg-surface_container_lowest px-8 py-4">
      <p className="text-xs italic text-on_surface_variant">
        All values are calculated based on entry/exit relative to the provided
        asset pair metadata.
      </p>
      <div className="flex gap-1">
        <button
          className="flex h-8 w-8 items-center justify-center rounded hover:bg-surface_container_highest"
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded bg-primary_container/20 text-xs font-bold text-primary_container"
          type="button"
        >
          1
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded hover:bg-surface_container_highest"
          type="button"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function PreviewSection(): React.JSX.Element {
  return (
    <section className="overflow-hidden rounded-2xl border border-outline_variant/5 bg-surface_container">
      <PreviewHeader />
      <PreviewTable />
      <PreviewFooter />
    </section>
  );
}

export function ImportTradesPage(): React.JSX.Element {
  return (
    <div className="flex min-h-screen bg-surface text-on_surface">
      <AppSidebar activeItem="import-trades" />

      <main className="ml-0 min-h-screen flex-1">
        <TopBar />

        <div className="mx-auto max-w-7xl p-10">
          <PageHeader />

          <div className="mb-10 grid grid-cols-12 gap-6">
            <div className="col-span-12 space-y-4 lg:col-span-8">
              <JsonEditorCard />
            </div>

            <div className="col-span-12 space-y-6 lg:col-span-4">
              <SchemaGuideCard />
              <BrokerSupportCard />
            </div>
          </div>

          <PreviewSection />
        </div>
      </main>
    </div>
  );
}

export default ImportTradesPage;
