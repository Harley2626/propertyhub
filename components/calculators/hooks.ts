"use client";

import { useMemo, useState } from "react";
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/lib/format/currency";
import { formatNumberInput, parseNumberInput } from "@/lib/format/numbers";

export function useCurrencyInput(initial = 0) {
  const [inputValue, setInputValue] = useState(
    initial > 0 ? formatCurrencyInput(initial) : "",
  );
  const value = useMemo(() => parseCurrencyInput(inputValue), [inputValue]);

  function onChange(raw: string) {
    const parsed = parseCurrencyInput(raw);
    setInputValue(parsed > 0 ? formatCurrencyInput(parsed) : "");
  }

  return { inputValue, value, onChange, setInputValue };
}

export function useNumberInput(initial = 0, decimals = 0) {
  const [inputValue, setInputValue] = useState(
    initial > 0 ? formatNumberInput(initial, decimals) : "",
  );
  const value = useMemo(() => parseNumberInput(inputValue), [inputValue]);

  function onChange(raw: string) {
    setInputValue(raw);
  }

  function onBlur() {
    const parsed = parseNumberInput(inputValue);
    setInputValue(parsed > 0 ? formatNumberInput(parsed, decimals) : "");
  }

  return { inputValue, value, onChange, onBlur, setInputValue };
}
