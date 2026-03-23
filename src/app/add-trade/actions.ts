"use server";

import { Prisma, TradeSide, TradeStatus } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface AddTradeValues {
  userId: string;
  openedAt: string;
  closedAt: string;
  session: string;
  assetPair: string;
  timeframe: string;
  htfTrend: string;
  marketStructure: string;
  side: string;
  entryPrice: string;
  lotSize: string;
  strategy: string;
  takeProfit: string;
  stopLoss: string;
  status: string;
  riskReward: string;
  profitLoss: string;
  tradeReasoning: string;
  notes: string;
}

interface AddTradeFieldErrors {
  assetPair?: string;
  side?: string;
  entryPrice?: string;
  lotSize?: string;
  closedAt?: string;
}

interface ActionErrorInfo {
  code: string;
  message: string;
  details: string;
}

export interface AddTradeFormState {
  status: "idle" | "success" | "error";
  message: string;
  code?: string;
  details?: string;
  values: AddTradeValues;
  fieldErrors?: AddTradeFieldErrors;
}

function readString(formData: FormData, key: string): string {
  const value: FormDataEntryValue | null = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

const EMPTY_VALUES: AddTradeValues = {
  userId: "",
  openedAt: "",
  closedAt: "",
  session: "London",
  assetPair: "BTC/USDT",
  timeframe: "15M",
  htfTrend: "Neutral/Ranging",
  marketStructure: "Consolidation",
  side: "BUY",
  entryPrice: "",
  lotSize: "",
  strategy: "",
  takeProfit: "",
  stopLoss: "",
  status: "OPEN",
  riskReward: "",
  profitLoss: "",
  tradeReasoning: "",
  notes: "",
};

function mapPrismaError(
  error: Prisma.PrismaClientKnownRequestError,
): ActionErrorInfo {
  if (error.code === "P2003") {
    return {
      code: "FOREIGN_KEY_CONSTRAINT",
      message: "Unable to save trade.",
      details:
        "The authenticated user record was not found. Please sign out and sign in with Google again.",
    };
  }

  if (error.code === "P2002") {
    return {
      code: "UNIQUE_CONSTRAINT",
      message: "Unable to save trade.",
      details: "A duplicate trade was detected for a unique field.",
    };
  }

  return {
    code: error.code,
    message: "Unable to save trade.",
    details: "A database constraint error occurred while saving.",
  };
}

export async function createTradeAction(
  _prevState: AddTradeFormState,
  formData: FormData,
): Promise<AddTradeFormState> {
  const session = await auth();
  const authenticatedUserId: string | undefined = session?.user?.id;

  const values: AddTradeValues = {
    userId: authenticatedUserId ?? "",
    openedAt: readString(formData, "openedAt"),
    closedAt: readString(formData, "closedAt"),
    session: readString(formData, "session"),
    assetPair: readString(formData, "assetPair"),
    timeframe: readString(formData, "timeframe"),
    htfTrend: readString(formData, "htfTrend"),
    marketStructure: readString(formData, "marketStructure"),
    side: readString(formData, "side"),
    entryPrice: readString(formData, "entryPrice"),
    lotSize: readString(formData, "lotSize"),
    strategy: readString(formData, "strategy"),
    takeProfit: readString(formData, "takeProfit"),
    stopLoss: readString(formData, "stopLoss"),
    status: readString(formData, "status"),
    riskReward: readString(formData, "riskReward"),
    profitLoss: readString(formData, "profitLoss"),
    tradeReasoning: readString(formData, "tradeReasoning"),
    notes: readString(formData, "notes"),
  };

  if (!authenticatedUserId) {
    return {
      status: "error",
      message: "Authentication required.",
      code: "AUTH_REQUIRED",
      details: "Please sign in with Google before creating a trade.",
      values,
    };
  }

  const fieldErrors: AddTradeFieldErrors = {};

  if (!values.assetPair) fieldErrors.assetPair = "Asset pair is required.";
  if (!values.entryPrice || Number.isNaN(Number(values.entryPrice))) {
    fieldErrors.entryPrice = "Valid entry price is required.";
  }
  if (!values.lotSize || Number.isNaN(Number(values.lotSize))) {
    fieldErrors.lotSize = "Valid lot size is required.";
  }
  if (values.side !== "BUY" && values.side !== "SELL") {
    fieldErrors.side = "Side must be BUY or SELL.";
  }
  if (values.closedAt && Number.isNaN(new Date(values.closedAt).getTime())) {
    fieldErrors.closedAt = "Invalid closed time.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Validation failed.",
      code: "VALIDATION_ERROR",
      details: "Please correct highlighted fields and resubmit.",
      values,
      fieldErrors,
    };
  }

  const side: TradeSide =
    values.side === "SELL" ? TradeSide.SELL : TradeSide.BUY;
  const status: TradeStatus =
    values.status === "CLOSED" ? TradeStatus.CLOSED : TradeStatus.OPEN;

  try {
    await prisma.trade.create({
      data: {
        userId: authenticatedUserId,
        assetPair: values.assetPair,
        side,
        entryPrice: new Prisma.Decimal(values.entryPrice),
        lotSize: new Prisma.Decimal(values.lotSize),
        status,
        profitLoss: values.profitLoss
          ? new Prisma.Decimal(values.profitLoss)
          : null,
        strategy: values.strategy || null,
        notes: values.notes || null,
        closedAt: values.closedAt ? new Date(values.closedAt) : null,
      },
    });

    return {
      status: "success",
      message: "Trade saved successfully.",
      code: "TRADE_CREATED",
      details: "Your trade has been recorded.",
      values: EMPTY_VALUES,
    };
  } catch (error: unknown) {
    console.error("createTradeAction failed:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const mapped: ActionErrorInfo = mapPrismaError(error);
      return {
        status: "error",
        message: mapped.message,
        code: mapped.code,
        details: mapped.details,
        values,
      };
    }

    return {
      status: "error",
      message: "Failed to save trade.",
      code: "UNKNOWN_ERROR",
      details: "Unexpected server error. Please try again.",
      values,
    };
  }
}
