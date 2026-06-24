import Link from "next/link";
import { siteConfig } from "@/lib/metadata";

const footerLinks = {
  tools: [
    { label: "Transfer Duty", href: "/tools/transfer-duty-calculator" },
    { label: "Bond Calculator", href: "/tools/bond-calculator" },
    { label: "Affordability", href: "/tools/affordability-calculator" },
    { label: "Income Tax", href: "/tools/income-tax-calculator" },
  ],
  company: [
    { label: "Guides", href: "/guides" },
    { label: "Property Tools", href: "/#property-tools" },
    { label: "Finance Tools", href: "/#finance-tools" },
    { label: "Tax Tools", href: "/#tax-tools" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted-bg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white">
                PP
              </span>
              Property<span className="text-accent">Pilot</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Popular Tools
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Calculators are for informational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
