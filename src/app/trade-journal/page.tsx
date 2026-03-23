import { redirect } from "next/navigation";
import {
  TradeJournal,
  type TradeJournalMetrics,
  type TradeJournalRow,
} from "@/components/TradeJournal";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

const TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function toNumber(value: { toString(): string } | null): number {
  return Number(value?.toString() ?? "0");
}

function formatCurrency(value: number): string {
  return CURRENCY_FORMATTER.format(value);
}

function formatSignedCurrency(value: number): string {
  const prefix = value >= 0 ? "+" : "-";
  return `${prefix}${formatCurrency(Math.abs(value))}`;
}

export default async function TradeJournalPage(): Promise<React.JSX.Element> {
  const session = await auth();
  const userId: string | undefined = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }

  const records = await prisma.trade.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      assetPair: true,
      side: true,
      entryPrice: true,
      exitPrice: true,
      profitLoss: true,
      status: true,
      createdAt: true,
    },
  });

  const closedTrades = records.filter((trade) => trade.status === "CLOSED");
  const winningTrades = closedTrades.filter(
    (trade) => toNumber(trade.profitLoss) > 0,
  ).length;
  const totalPnl = records.reduce(
    (sum, trade) => sum + toNumber(trade.profitLoss),
    0,
  );

  const metrics: TradeJournalMetrics = {
    totalPnl: formatSignedCurrency(totalPnl),
    winRate:
      closedTrades.length > 0
        ? `${((winningTrades / closedTrades.length) * 100).toFixed(1)}%`
        : "0.0%",
    totalTrades: records.length,
  };

  const trades: TradeJournalRow[] = records.map((trade) => {
    const baseAsset = trade.assetPair.split("/")[0] ?? "";
    const symbol = baseAsset.charAt(0).toUpperCase() || "•";
    const pnlValue = toNumber(trade.profitLoss);

    return {
      id: trade.id,
      date: DATE_FORMATTER.format(trade.createdAt),
      time: TIME_FORMATTER.format(trade.createdAt),
      asset: trade.assetPair.replace("/", " / "),
      side: trade.side,
      entryPrice: formatCurrency(toNumber(trade.entryPrice)),
      exitPrice: trade.exitPrice
        ? formatCurrency(toNumber(trade.exitPrice))
        : "--",
      pnl: trade.profitLoss ? formatSignedCurrency(pnlValue) : "--",
      status: trade.status,
      badgeColor:
        trade.side === "BUY"
          ? "bg-primary_container/20 text-primary_container"
          : "bg-secondary_container/20 text-secondary_container",
      symbol,
    };
  });

  return <TradeJournal metrics={metrics} trades={trades} />;
}
