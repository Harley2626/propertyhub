"use client";

import { formatNumberInput, parseNumberInput } from "@/lib/format/numbers";

type NumberInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  suffix?: string;
  decimals?: number;
};

export function NumberInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder = "e.g. 10",
  suffix,
}: NumberInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          name={id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-border bg-background py-3 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 ${suffix ? "pl-4 pr-10" : "px-4"}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function formatNumberOnBlur(raw: string, decimals = 0): string {
  const parsed = parseNumberInput(raw);
  return parsed > 0 ? formatNumberInput(parsed, decimals) : "";
}
