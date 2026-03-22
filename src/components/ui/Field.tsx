import { ChevronDown } from "lucide-react";

interface FieldLabelProps {
  text: string;
}

interface TextInputProps {
  label?: string;
  placeholder?: string;
  type?: "text" | "number" | "datetime-local" | "email" | "password";
  useDisplayFont?: boolean;
  id?: string;
  tone?: "low" | "raised";
}

interface SelectInputProps {
  label: string;
  options: string[];
  id?: string;
  tone?: "low" | "raised";
}

interface TextareaInputProps {
  label: string;
  placeholder?: string;
  rows?: number;
  id?: string;
  tone?: "low" | "raised";
}

export function FieldLabel({ text }: FieldLabelProps): React.JSX.Element {
  return (
    <label className="ml-1 block font-sans text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-on_surface_variant">
      {text}
    </label>
  );
}

const controlBase =
  "w-full rounded-lg border-none px-4 py-4 text-on_surface outline-none transition [box-shadow:inset_0_1px_0_rgba(255,255,255,0.02),inset_0_2px_4px_rgba(0,0,0,0.24)] placeholder:text-on_surface_variant/40 focus:ring-2 focus:ring-primary_container/20";

const toneStyles = {
  low: "bg-surface_container_low focus:bg-surface_container_highest",
  raised: "bg-surface_container_highest focus:bg-surface_container_highest",
};

export function TextInput({
  label,
  placeholder,
  type = "text",
  useDisplayFont = false,
  id,
  tone = "raised",
}: TextInputProps): React.JSX.Element {
  return (
    <div className="space-y-2">
      {label ? <FieldLabel text={label} /> : null}
      <input
        id={id}
        className={`${controlBase} ${toneStyles[tone]} text-sm ${useDisplayFont ? "font-display font-medium" : "font-sans font-medium"}`}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}

export function SelectInput({
  label,
  options,
  id,
  tone = "raised",
}: SelectInputProps): React.JSX.Element {
  return (
    <div className="space-y-2">
      <FieldLabel text={label} />
      <div className="relative">
        <select
          id={id}
          className={`${controlBase} ${toneStyles[tone]} appearance-none pr-10 text-sm font-medium cursor-pointer`}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on_surface_variant" />
      </div>
    </div>
  );
}

export function TextareaInput({
  label,
  placeholder,
  rows = 4,
  id,
  tone = "raised",
}: TextareaInputProps): React.JSX.Element {
  return (
    <div className="space-y-2">
      <FieldLabel text={label} />
      <textarea
        id={id}
        rows={rows}
        className={`${controlBase} ${toneStyles[tone]} resize-none py-4 text-sm font-sans leading-relaxed`}
        placeholder={placeholder}
      />
    </div>
  );
}
