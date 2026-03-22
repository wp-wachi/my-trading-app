import {
  Bell,
  Camera,
  ChevronDown,
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

interface FieldLabelProps {
  text: string;
}

function FieldLabel({ text }: FieldLabelProps): React.JSX.Element {
  return (
    <label className="ml-1 block font-sans text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-on_surface_variant">
      {text}
    </label>
  );
}

interface SelectFieldProps {
  label: string;
  options: string[];
}

function SelectField({ label, options }: SelectFieldProps): React.JSX.Element {
  return (
    <div className="space-y-2">
      <FieldLabel text={label} />
      <div className="relative">
        <select className="w-full appearance-none rounded-lg bg-surface_container_highest py-3.5 pl-4 pr-10 text-sm font-medium text-on_surface outline-none transition focus:ring-1 focus:ring-primary_container/20">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on_surface_variant" />
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "datetime-local";
  useDisplayFont?: boolean;
}

function InputField({
  label,
  placeholder,
  type = "text",
  useDisplayFont = false,
}: InputFieldProps): React.JSX.Element {
  return (
    <div className="space-y-2">
      <FieldLabel text={label} />
      <input
        className={`w-full rounded-lg bg-surface_container_highest px-4 py-3.5 text-sm text-on_surface outline-none transition focus:ring-1 focus:ring-primary_container/20 ${
          useDisplayFont ? "font-display font-medium" : "font-sans font-medium"
        }`}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}

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

function TimingSessionSection(): React.JSX.Element {
  return (
    <SectionCard icon={<Clock3 className="h-5 w-5" />} title="Timing & Session">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <InputField label="Time Opened" type="datetime-local" />
        <InputField label="Time Closed" type="datetime-local" />
        <SelectField label="Session" options={["London", "New York", "Asia"]} />
      </div>
    </SectionCard>
  );
}

function AssetContextSection(): React.JSX.Element {
  return (
    <SectionCard icon={<Compass className="h-5 w-5" />} title="Asset & Context">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SelectField
          label="Pair"
          options={["BTC/USDT", "ETH/USDT", "XAU/USD", "EUR/USD"]}
        />
        <SelectField
          label="Timeframe (TF)"
          options={["1M", "5M", "15M", "1H", "4H", "1D"]}
        />
        <SelectField
          label="HTF Trend"
          options={["Bullish", "Bearish", "Neutral/Ranging"]}
        />
        <SelectField
          label="Market Structure"
          options={["BOS (Bullish)", "BOS (Bearish)", "CHOCH", "Consolidation"]}
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
        <SelectField label="Type" options={["Long", "Short"]} />
        <InputField
          label="Entry Price"
          placeholder="0.00"
          type="number"
          useDisplayFont
        />
        <InputField label="Setup" placeholder="e.g. FVG Mitigation" />
        <InputField
          label="Take Profit (TP)"
          placeholder="0.00"
          type="number"
          useDisplayFont
        />
        <InputField
          label="Stop Loss (SL)"
          placeholder="0.00"
          type="number"
          useDisplayFont
        />
        <InputField
          label="Risk (%)"
          placeholder="1.0"
          type="number"
          useDisplayFont
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
        <SelectField
          label="Result"
          options={["Win", "Loss", "Break-Even (BE)"]}
        />
        <InputField
          label="Risk:Reward (RR)"
          placeholder="2.5"
          type="number"
          useDisplayFont
        />
        <InputField
          label="P/L ($)"
          placeholder="0.00"
          type="number"
          useDisplayFont
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
          <FieldLabel text="Trade Reasoning" />
          <textarea
            className="h-28 w-full resize-none rounded-lg bg-surface_container_highest px-4 py-3.5 text-sm text-on_surface outline-none transition focus:ring-1 focus:ring-primary_container/20"
            placeholder="Why did you enter?"
          />
        </div>
        <div className="space-y-2">
          <FieldLabel text="Post Analysis" />
          <textarea
            className="h-28 w-full resize-none rounded-lg bg-surface_container_highest px-4 py-3.5 text-sm text-on_surface outline-none transition focus:ring-1 focus:ring-primary_container/20"
            placeholder="Reflections after close..."
          />
        </div>
      </div>
    </SectionCard>
  );
}

function ActionRow(): React.JSX.Element {
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
        variant="primary"
      >
        Save Trade
      </Button>
    </div>
  );
}

export function AddTradePage(): React.JSX.Element {
  return (
    <div className="relative flex min-h-screen bg-surface text-on_surface">
      <AppSidebar activeItem="add-trade" />

      <main className="relative min-h-screen flex-1 overflow-hidden bg-surface">
        <HeaderBar />

        <div className="mx-auto max-w-7xl px-12 py-12">
          <form className="grid grid-cols-12 gap-8">
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

            <ActionRow />
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
