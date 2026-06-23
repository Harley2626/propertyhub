import type { CalculatorField } from "@/lib/data/tools";

type CalculatorCardProps = {
  title: string;
  fields: CalculatorField[];
};

export function CalculatorCard({ title, fields }: CalculatorCardProps) {
  return (
    <section aria-labelledby="calculator-heading">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h2
              id="calculator-heading"
              className="text-xl font-semibold text-foreground"
            >
              {title}
            </h2>
            <p className="mt-1 text-sm text-muted">
              Enter your details below. Full calculation logic coming soon.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-accent">
            Preview
          </span>
        </div>

        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.id}
                className={
                  fields.length % 2 !== 0 &&
                  field.id === fields[fields.length - 1].id
                    ? "sm:col-span-2"
                    : ""
                }
              >
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-foreground"
                >
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    id={field.id}
                    name={field.id}
                    defaultValue=""
                    disabled
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="" disabled>
                      {field.placeholder}
                    </option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    disabled
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled
            className="w-full rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white opacity-60 sm:w-auto sm:min-w-[200px]"
          >
            Calculate
          </button>
        </div>

        <div className="mt-8 rounded-xl border border-dashed border-border bg-muted-bg p-6">
          <p className="text-sm font-medium text-foreground">Results</p>
          <p className="mt-2 text-sm text-muted">
            Your calculated results will appear here once this tool is fully
            implemented.
          </p>
        </div>
      </div>
    </section>
  );
}
