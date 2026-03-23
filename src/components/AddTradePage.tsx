"use client";

import {
  Bell,
  Camera,
  Clock3,
  Compass,
  Image as ImageIcon,
  LayoutGrid,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/Button";
import {
  FieldLabel,
  SelectInput,
  TextInput,
  TextareaInput,
} from "@/components/ui/Field";
import { useActionState } from "react";
import {
  createTradeAction,
  type AddTradeFormState,
} from "@/app/add-trade/actions";

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SectionCard({
  title,
  icon,
  children,
}: SectionCardProps): React.JSX.Element {
  return (
    <section className="rounded-xl bg-surface_container_low p-8">
      <h3 className="mb-6 flex items-center gap-2 font-display text-[1.65rem] font-bold text-primary_fixed">
        <span className="text-primary_container">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

interface UploadBoxProps {
  label: string;
}

function UploadBox({ label }: UploadBoxProps): React.JSX.Element {
  return (
    <div>
      <FieldLabel text={label} />
      <div className="group mt-3 flex h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-outline_variant/20 bg-surface_container_lowest p-6 text-center transition hover:bg-surface_container_highest">
        <Camera className="mb-2 h-8 w-8 text-on_surface_variant transition group-hover:text-primary_container" />
        <p className="text-xs font-medium text-on_surface_variant">
          Upload Screenshot
        </p>
      </div>
    </div>
  );
}

function HeaderBar(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-outline_variant/10 bg-surface px-12 py-8">
      <div>
        <h2 className="font-display text-[2.05rem] font-bold tracking-tight text-on_surface">
          Add New Trade
        </h2>
        <p className="mt-1 text-sm text-on_surface_variant">
          Execute your plan with surgical precision.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <button className="group relative" type="button">
          <Bell className="h-[18px] w-[18px] text-on_surface_variant transition group-hover:text-primary_container" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-secondary_container" />
        </button>

        <button type="button">
          <Settings className="h-[18px] w-[18px] text-on_surface_variant transition hover:text-primary_container" />
        </button>

        <div className="h-10 w-10 overflow-hidden rounded-full border border-outline_variant/20 bg-surface_container_highest">
          <div className="flex h-full w-full items-center justify-center text-xs text-on_surface_variant">
            U
          </div>
        </div>
      </div>
    </header>
  );
}

const initialState: AddTradeFormState = {
  status: "idle",
  message: "",
  values: {
    userId: "demo-user-id",
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
  },
};

function TimingSessionSection(): React.JSX.Element {
  return (
    <SectionCard icon={<Clock3 className="h-5 w-5" />} title="Timing & Session">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <TextInput
          label="Time Opened"
          name="openedAt"
          type="datetime-local"
          defaultValue={initialState.values.openedAt}
        />
        <TextInput
          label="Time Closed"
          name="closedAt"
          type="datetime-local"
          defaultValue={initialState.values.closedAt}
        />
        <SelectInput
          label="Session"
          name="session"
          options={["London", "New York", "Asia"]}
          defaultValue={initialState.values.session}
        />
      </div>
    </SectionCard>
  );
}

function AssetContextSection(): React.JSX.Element {
  return (
    <SectionCard icon={<Compass className="h-5 w-5" />} title="Asset & Context">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SelectInput
          label="Pair"
          name="assetPair"
          options={["BTC/USDT", "ETH/USDT", "XAU/USD", "EUR/USD"]}
          defaultValue={initialState.values.assetPair}
        />
        <SelectInput
          label="Timeframe (TF)"
          name="timeframe"
          options={["1M", "5M", "15M", "1H", "4H", "1D"]}
          defaultValue={initialState.values.timeframe}
        />
        <SelectInput
          label="HTF Trend"
          name="htfTrend"
          options={["Bullish", "Bearish", "Neutral/Ranging"]}
          defaultValue={initialState.values.htfTrend}
        />
        <SelectInput
          label="Market Structure"
          name="marketStructure"
          options={["BOS (Bullish)", "BOS (Bearish)", "CHOCH", "Consolidation"]}
          defaultValue={initialState.values.marketStructure}
        />
      </div>
    </SectionCard>
  );
}

function ExecutionSection(): React.JSX.Element {
  return (
    <SectionCard
      icon={<Target className="h-5 w-5" />}
      title="Execution Parameters"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <SelectInput label="Side" name="side" options={["BUY", "SELL"]} />
        <TextInput
          label="Entry Price"
          name="entryPrice"
          placeholder="0.00"
          type="number"
          useDisplayFont
          defaultValue={initialState.values.entryPrice}
        />
        <TextInput
          label="Lot Size"
          name="lotSize"
          placeholder="1.00"
          type="number"
          useDisplayFont
          defaultValue={initialState.values.lotSize}
        />
        <TextInput
          label="Setup"
          name="strategy"
          placeholder="e.g. FVG Mitigation"
          defaultValue={initialState.values.strategy}
        />
        <TextInput
          label="Take Profit (TP)"
          name="takeProfit"
          placeholder="0.00"
          type="number"
          useDisplayFont
          defaultValue={initialState.values.takeProfit}
        />
        <TextInput
          label="Stop Loss (SL)"
          name="stopLoss"
          placeholder="0.00"
          type="number"
          useDisplayFont
          defaultValue={initialState.values.stopLoss}
        />
      </div>
    </SectionCard>
  );
}

function OutcomeSection(): React.JSX.Element {
  return (
    <SectionCard
      icon={<TrendingUp className="h-5 w-5" />}
      title="Outcome & Metrics"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <SelectInput
          label="Status"
          name="status"
          options={["OPEN", "CLOSED"]}
          defaultValue={initialState.values.status}
        />
        <TextInput
          label="Risk:Reward (RR)"
          name="riskReward"
          placeholder="2.5"
          type="number"
          useDisplayFont
          defaultValue={initialState.values.riskReward}
        />
        <TextInput
          label="P/L ($)"
          name="profitLoss"
          placeholder="0.00"
          type="number"
          useDisplayFont
          defaultValue={initialState.values.profitLoss}
        />
      </div>
    </SectionCard>
  );
}

function VisualEvidenceSection(): React.JSX.Element {
  return (
    <SectionCard
      icon={<ImageIcon className="h-5 w-5" />}
      title="Visual Evidence"
    >
      <div className="space-y-6">
        <UploadBox label="Before Entry Chart" />
        <UploadBox label="After Exit Chart" />
      </div>
    </SectionCard>
  );
}

function NarrativeSection(): React.JSX.Element {
  return (
    <SectionCard
      icon={<Sparkles className="h-5 w-5" />}
      title="Narrative & Analysis"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <TextareaInput
            label="Trade Reasoning"
            name="tradeReasoning"
            placeholder="Why did you enter?"
            rows={4}
            defaultValue={initialState.values.tradeReasoning}
          />
        </div>
        <div className="space-y-2">
          <TextareaInput
            label="Post Analysis"
            name="notes"
            placeholder="Reflections after close..."
            rows={4}
            defaultValue={initialState.values.notes}
          />
        </div>
      </div>
    </SectionCard>
  );
}

interface ActionRowProps {
  isPending: boolean;
}

function ActionRow({ isPending }: ActionRowProps): React.JSX.Element {
  return (
    <div className="col-span-12 mb-24 flex items-center justify-end gap-6 pt-4">
      <button
        className="px-8 py-3 font-sans font-bold text-on_surface_variant transition hover:text-on_surface"
        type="button"
      >
        Cancel
      </button>
      <Button
        className="px-12 py-4 font-display text-lg font-black shadow-[0_0_20px_rgba(0,242,150,0.15)] hover:shadow-[0_0_30px_rgba(0,242,150,0.25)]"
        type="submit"
        variant="primary"
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save Trade"}
      </Button>
    </div>
  );
}

export function AddTradePage(): React.JSX.Element {
  const [state, formAction, isPending] = useActionState(
    createTradeAction,
    initialState,
  );

  return (
    <div className="relative flex min-h-screen bg-surface text-on_surface">
      <AppSidebar activeItem="add-trade" />

      <main className="relative min-h-screen flex-1 overflow-hidden bg-surface">
        <HeaderBar />

        <div className="mx-auto max-w-7xl px-12 py-12">
          <form action={formAction} className="grid grid-cols-12 gap-8">
            <input name="userId" type="hidden" value="demo-user-id" />

            <div className="col-span-12 space-y-8 lg:col-span-8">
              <TimingSessionSection />
              <AssetContextSection />
              <ExecutionSection />
              <OutcomeSection />
            </div>

            <div className="col-span-12 space-y-8 lg:col-span-4">
              <VisualEvidenceSection />
              <NarrativeSection />
            </div>

            <div className="col-span-12">
              {state.message ? (
                <p
                  className={`text-sm ${
                    state.status === "success"
                      ? "text-primary_container"
                      : "text-secondary_container"
                  }`}
                >
                  {state.message}
                </p>
              ) : null}

              {state.code ? (
                <p className="text-xs text-on_surface_variant">
                  Code: {state.code}
                </p>
              ) : null}
              {state.details ? (
                <p className="text-xs text-on_surface_variant">
                  {state.details}
                </p>
              ) : null}
            </div>

            <ActionRow isPending={isPending} />
          </form>
        </div>

        <div className="pointer-events-none fixed bottom-0 right-0 z-10 p-8 opacity-5">
          <LayoutGrid className="h-[16rem] w-[16rem] text-primary_fixed" />
        </div>
      </main>
    </div>
  );
}

export default AddTradePage;
