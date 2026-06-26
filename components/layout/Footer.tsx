import Link from "next/link";
import { siteConfig } from "@/lib/metadata";

const footerLinks = {
  tools: [
    { label: "Transfer Duty", href: "/tools/transfer-duty-calculator" },
    { label: "Bond Calculator", href: "/tools/bond-calculator" },
    { label: "Affordability", href: "/tools/affordability-calculator" },
    { label: "Income Tax", href: "/tools/income-tax-calculator" },
  ],
  explore: [
    { label: "Answers", href: "/answers" },
    { label: "Guides", href: "/guides" },
    { label: "Areas", href: "/areas" },
    { label: "Property Tools", href: "/#property-tools" },
    { label: "Finance Tools", href: "/#finance-tools" },
  ],
  company: [
    { label: "Authors", href: "/authors" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Methodology", href: "/methodology" },
    { label: "Sources", href: "/sources" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted-bg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2">
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
              {footerLinks.explore.map((link) => (
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
              Company
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
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
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
          <p className="text-center text-xs text-muted sm:text-right">
            Calculators are for informational purposes only.{" "}
            <Link href="/disclaimer" className="underline hover:text-accent">
              Not financial advice
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
