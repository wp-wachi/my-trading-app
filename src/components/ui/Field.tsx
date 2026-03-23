import { ChevronDown } from "lucide-react";

interface FieldLabelProps {
  text: string;
  htmlFor?: string;
  className?: string;
}

interface TextInputProps {
  label: string;
  name?: string;
  id?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  defaultValue?: string | number;
  useDisplayFont?: boolean;
  className?: string;
}

interface SelectInputProps {
  label: string;
  options: string[];
  name?: string;
  id?: string;
  defaultValue?: string;
  className?: string;
}

interface TextareaInputProps {
  label: string;
  name?: string;
  id?: string;
  placeholder?: string;
  rows?: number;
  defaultValue?: string;
  className?: string;
}

export function FieldLabel({
  text,
  htmlFor,
  className,
}: FieldLabelProps): React.JSX.Element {
  return (
    <label
      htmlFor={htmlFor}
      className={
        className ?? "mb-2 block text-xs font-semibold text-on_surface_variant"
      }
    >
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
  name,
  id,
  placeholder,
  type = "text",
  defaultValue,
  useDisplayFont = false,
  className,
}: TextInputProps): React.JSX.Element {
  const fieldId: string = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <FieldLabel htmlFor={fieldId} text={label} />
      <input
        id={fieldId}
        name={name}
        placeholder={placeholder}
        type={type}
        defaultValue={defaultValue}
        className={className}
      />
    </div>
  );
}

export function SelectInput({
  label,
  options,
  name,
  id,
  defaultValue,
  className,
}: SelectInputProps): React.JSX.Element {
  const fieldId: string = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <FieldLabel htmlFor={fieldId} text={label} />
      <select
        id={fieldId}
        name={name}
        defaultValue={defaultValue}
        className={className}
      >
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TextareaInput({
  label,
  name,
  id,
  placeholder,
  rows = 4,
  defaultValue,
  className,
}: TextareaInputProps): React.JSX.Element {
  const fieldId: string = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <FieldLabel htmlFor={fieldId} text={label} />
      <textarea
        id={fieldId}
        name={name}
        placeholder={placeholder}
        rows={rows}
        defaultValue={defaultValue}
        className={className}
      />
    </div>
  );
}
