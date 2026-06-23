"use client";

import { formatNumberInput, parseNumberInput } from "@/lib/format/numbers";

type NumberInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
  decimals?: number;
};

export function NumberInput({
  id,
  label,
  value,
  onChange,
  placeholder = "e.g. 10",
  suffix,
  decimals = 0,
}: NumberInputProps) {
  function handleChange(raw: string) {
    const parsed = parseNumberInput(raw);
    onChange(parsed > 0 ? formatNumberInput(parsed, decimals) : "");
  }

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
          onChange={(e) => handleChange(e.target.value)}
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
