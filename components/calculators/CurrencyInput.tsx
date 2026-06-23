"use client";

import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/lib/format/currency";

type CurrencyInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function CurrencyInput({
  id,
  label,
  value,
  onChange,
  placeholder = "e.g. 500 000",
}: CurrencyInputProps) {
  function handleChange(raw: string) {
    const parsed = parseCurrencyInput(raw);
    onChange(parsed > 0 ? formatCurrencyInput(parsed) : "");
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative mt-2">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted">
          R
        </span>
        <input
          id={id}
          name={id}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-border bg-background py-3 pl-9 pr-4 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
    </div>
  );
}
