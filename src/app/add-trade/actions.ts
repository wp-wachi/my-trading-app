"use server";

import { Prisma, TradeSide, TradeStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export interface AddTradeFormState {
  status: "idle" | "success" | "error";
  message: string;
}

function getValue(formData: FormData, key: string): string {
  const value: FormDataEntryValue | null = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function createTradeAction(
  _prevState: AddTradeFormState,
  formData: FormData,
): Promise<AddTradeFormState> {
  const userId: string = getValue(formData, "userId");
  const assetPair: string = getValue(formData, "assetPair");
  const sideInput: string = getValue(formData, "side");
  const entryPriceInput: string = getValue(formData, "entryPrice");
  const lotSizeInput: string = getValue(formData, "lotSize");
  const statusInput: string = getValue(formData, "status");
  const profitLossInput: string = getValue(formData, "profitLoss");
  const notes: string = getValue(formData, "notes");
  const strategy: string = getValue(formData, "strategy");
  const closedAtInput: string = getValue(formData, "closedAt");

  if (!userId || !assetPair || !entryPriceInput || !lotSizeInput) {
    return { status: "error", message: "Missing required fields." };
  }

  const side: TradeSide | null =
    sideInput === "BUY" || sideInput === "SELL"
      ? (sideInput as TradeSide)
      : null;

  if (!side) {
    return { status: "error", message: "Invalid trade side." };
  }

  const status: TradeStatus =
    statusInput === "CLOSED" ? TradeStatus.CLOSED : TradeStatus.OPEN;

  try {
    await prisma.trade.create({
      data: {
        userId,
        assetPair,
        side,
        entryPrice: new Prisma.Decimal(entryPriceInput),
        lotSize: new Prisma.Decimal(lotSizeInput),
        status,
        profitLoss: profitLossInput
          ? new Prisma.Decimal(profitLossInput)
          : null,
        notes: notes || null,
        strategy: strategy || null,
        closedAt: closedAtInput ? new Date(closedAtInput) : null,
      },
    });

    return { status: "success", message: "Trade saved successfully." };
  } catch {
    return { status: "error", message: "Failed to save trade." };
  }
}
