# PropertyPilot

**Property & Finance Tools for South Africans**

Free property and finance calculators, guides, and tools to help South Africans make smarter property decisions.

Production: [https://thepropertypilot.co.za](https://thepropertypilot.co.za)

## Tools

- Transfer duty, bond, affordability, and deposit calculators
- Rental yield, rent vs buy, compound interest, and retirement planning
- Income tax, VAT, capital gains tax, inflation, and emergency fund calculators

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For production, set:

```bash
NEXT_PUBLIC_SITE_URL=https://thepropertypilot.co.za
```

Copy `.env.example` to `.env.production` (or configure env vars on your host) before deploying.

### Google Analytics 4

1. Create a GA4 property at [Google Analytics](https://analytics.google.com) for `thepropertypilot.co.za`.
2. Copy the **Measurement ID** (format `G-XXXXXXXXXX`).
3. Add it to your production environment:

   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

   **Where it lives:** `.env.production` locally, or your hosting provider's environment variables (Vercel, Netlify, etc.). See `.env.example` for the exact variable name.

4. Deploy. Analytics scripts load **only in production** when this variable is set — not during `npm run dev`.

Implementation: `components/analytics/GoogleAnalytics.tsx` (gtag.js) and `components/analytics/AnalyticsPageView.tsx` (App Router page views).

### Google Search Console

1. Add property: `https://thepropertypilot.co.za` (URL prefix or domain property).
2. **Verify ownership** — HTML tag method:
   - Copy the verification code from Search Console.
   - Set `GOOGLE_SITE_VERIFICATION=<code>` in production env (see `.env.example`).
   - Redeploy; confirm the meta tag appears in page source.
3. **Submit sitemap:** `https://thepropertypilot.co.za/sitemap.xml`
4. **Confirm robots.txt:** `https://thepropertypilot.co.za/robots.txt` — allows all crawlers and references the sitemap.

The site ships with `index, follow` robots metadata, absolute canonical URLs on all public pages, and JSON-LD structured data on homepage, tools, guides, and area pages.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm test` | Run calculator test suite |
| `npm run test:validation` | Run validation suite only |

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router)
- TypeScript
- Tailwind CSS v4

## License

Private — all rights reserved.
