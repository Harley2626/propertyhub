export type FAQ = {
  question: string;
  answer: string;
};

export type CalculatorField = {
  id: string;
  label: string;
  placeholder: string;
  type?: "number" | "text" | "select";
  options?: string[];
};

export type Tool = {
  slug: string;
  title: string;
  description: string;
  href: string;
  explanation: {
    title: string;
    paragraphs: string[];
  };
  faqs: FAQ[];
  fields: CalculatorField[];
};

export type ToolCategory = {
  id: string;
  title: string;
  description: string;
  accent: "blue" | "emerald" | "violet";
  tools: Tool[];
};

export const toolCategories: ToolCategory[] = [
  {
    id: "property-tools",
    title: "Property Tools",
    description:
      "Calculate transfer duty, bond repayments, affordability, and more for the South African property market.",
    accent: "blue",
    tools: [
      {
        slug: "transfer-duty-calculator",
        title: "Transfer Duty Calculator",
        description:
          "Estimate SARS transfer duty on your property purchase based on current brackets.",
        href: "/tools/transfer-duty-calculator",
        explanation: {
          title: "How transfer duty works in South Africa",
          paragraphs: [
            "Transfer duty is a tax levied by SARS when you buy immovable property. The amount depends on the purchase price and follows a progressive sliding scale — similar to income tax.",
            "From 1 April 2025, no transfer duty is payable on the first R1,210,000 of a property's value. Rates then increase from 3% up to 13% for properties above R13.3 million. The same brackets apply to all buyers, including individuals, companies, and trusts.",
            "Transfer duty is not payable when buying a new property from a VAT-registered developer, as VAT applies instead. Budget for transfer duty plus conveyancing fees, deeds office fees, and other transfer costs on top of your purchase price.",
          ],
        },
        faqs: [
          {
            question: "Who pays transfer duty in South Africa?",
            answer:
              "The buyer is responsible for paying transfer duty to SARS. Payment is typically handled by the transferring attorney as part of the property transfer process, before the property is registered in the buyer's name.",
          },
          {
            question: "What are the current SARS transfer duty rates?",
            answer:
              "Effective 1 April 2025: 0% on the first R1,210,000; 3% on the portion from R1,210,001 to R1,663,800; 6% up to R2,329,300; 8% up to R2,994,800; 11% up to R13,310,000; and 13% on any amount above R13,310,000.",
          },
          {
            question: "Is transfer duty the same as VAT?",
            answer:
              "No. Transfer duty applies to most secondary-market property sales between private parties. VAT at 15% applies when buying a new property from a VAT-registered developer — in that case, no transfer duty is charged.",
          },
          {
            question: "What transfer costs should I budget besides duty?",
            answer:
              "In addition to transfer duty, budget for conveyancing attorney fees (including VAT), deeds office registration fees, and postages and petties. Total transfer costs typically add 1–2% of the purchase price on top of transfer duty.",
          },
          {
            question: "Are there any transfer duty exemptions?",
            answer:
              "Certain transactions are exempt, including transfers between spouses, cancelled transactions, and inheritances in some cases. Transactions subject to VAT are also exempt from transfer duty. Always confirm with a conveyancer.",
          },
        ],
        fields: [
          { id: "price", label: "Property purchase price", placeholder: "e.g. 2 500 000", type: "number" },
        ],
      },
      {
        slug: "bond-calculator",
        title: "Bond Calculator",
        description:
          "Work out monthly home loan repayments, total interest, and amortisation.",
        href: "/tools/bond-calculator",
        explanation: {
          title: "Understanding home loan repayments",
          paragraphs: [
            "A home loan (bond) is repaid in monthly instalments over a set term, typically 20 or 30 years in South Africa. Each payment covers both interest and a portion of the capital.",
            "Your interest rate has the biggest impact on total cost. Even a small difference in rate can add hundreds of thousands of rands over the life of the loan.",
            "This calculator uses standard amortisation formulas to estimate your monthly repayment. Actual amounts may differ based on your bank's fees, insurance, and rate concessions.",
          ],
        },
        faqs: [
          {
            question: "What interest rate should I use?",
            answer:
              "Use the rate quoted by your bank or a prime-linked estimate. Most South African home loans are linked to the prime lending rate plus or minus a margin.",
          },
          {
            question: "Does a longer loan term mean lower payments?",
            answer:
              "Yes, a longer term reduces your monthly instalment but increases total interest paid over the life of the loan.",
          },
          {
            question: "Can I pay extra on my bond?",
            answer:
              "Most banks allow additional payments, which reduce outstanding capital and save interest. Check your loan agreement for any penalties or notice requirements.",
          },
        ],
        fields: [
          { id: "amount", label: "Loan amount", placeholder: "e.g. 2 000 000", type: "number" },
          { id: "rate", label: "Interest rate (% per year)", placeholder: "e.g. 11.5", type: "number" },
          { id: "term", label: "Loan term (years)", placeholder: "e.g. 20", type: "number" },
        ],
      },
      {
        slug: "affordability-calculator",
        title: "Affordability Calculator",
        description:
          "See how much property you can afford based on income and existing debt.",
        href: "/tools/affordability-calculator",
        explanation: {
          title: "How banks assess affordability",
          paragraphs: [
            "South African banks use your gross income, existing debt obligations, and credit profile to determine how much you can borrow. A common guideline is that bond repayments should not exceed roughly 30% of gross monthly income.",
            "Your disposable income after living expenses also matters. Banks apply stress tests at higher interest rates to ensure you can still afford repayments if rates rise.",
            "This calculator gives an indicative maximum purchase price. A home loan pre-approval from your bank provides the most accurate figure.",
          ],
        },
        faqs: [
          {
            question: "What is a debt-to-income ratio?",
            answer:
              "It is the percentage of your gross monthly income used to service debt. Banks typically cap total debt obligations, including the new bond, at around 40–45% of gross income.",
          },
          {
            question: "Does my credit score affect affordability?",
            answer:
              "Yes. A stronger credit profile may qualify you for better rates and higher loan amounts. Poor credit can limit approval or increase your interest rate.",
          },
          {
            question: "Should I include my partner's income?",
            answer:
              "If applying jointly, combine both incomes and all shared debt obligations for a more accurate affordability estimate.",
          },
        ],
        fields: [
          { id: "income", label: "Gross monthly income", placeholder: "e.g. 45 000", type: "number" },
          { id: "debt", label: "Existing monthly debt repayments", placeholder: "e.g. 5 000", type: "number" },
          { id: "rate", label: "Estimated interest rate (%)", placeholder: "e.g. 11.5", type: "number" },
        ],
      },
      {
        slug: "rental-yield-calculator",
        title: "Rental Yield Calculator",
        description:
          "Measure gross and net rental yield on investment properties.",
        href: "/tools/rental-yield-calculator",
        explanation: {
          title: "What is rental yield?",
          paragraphs: [
            "Rental yield measures the annual return on a property investment relative to its value. Gross yield uses rental income before expenses; net yield deducts costs such as levies, rates, maintenance, and vacancy.",
            "Investors often compare yield against bond interest costs and alternative investments. A positive cash flow property earns more in rent than it costs to finance and maintain.",
            "Location, tenant quality, and vacancy rates all affect achievable yield. Use realistic expense assumptions for meaningful results.",
          ],
        },
        faqs: [
          {
            question: "What is a good rental yield in South Africa?",
            answer:
              "Gross yields of 8–12% are often targeted in strong rental markets, but net yield after expenses is the more important figure for cash flow analysis.",
          },
          {
            question: "What expenses should I include?",
            answer:
              "Include body corporate levies, municipal rates, insurance, maintenance, agent fees, and an allowance for vacancy periods.",
          },
          {
            question: "Is rental yield the only metric that matters?",
            answer:
              "No. Capital growth, liquidity, and tax implications also matter. Yield is one part of a broader investment analysis.",
          },
        ],
        fields: [
          { id: "value", label: "Property value", placeholder: "e.g. 1 800 000", type: "number" },
          { id: "rent", label: "Monthly rental income", placeholder: "e.g. 12 000", type: "number" },
          { id: "expenses", label: "Monthly expenses", placeholder: "e.g. 2 500", type: "number" },
        ],
      },
      {
        slug: "deposit-calculator",
        title: "Deposit Calculator",
        description:
          "Plan your deposit savings timeline and required upfront costs.",
        href: "/tools/deposit-calculator",
        explanation: {
          title: "Planning your property deposit",
          paragraphs: [
            "Most South African banks require a deposit when financing a property, especially for higher loan-to-value ratios. A larger deposit reduces your loan amount, monthly repayment, and total interest.",
            "First-time buyers may qualify for 100% bonds in some cases, but saving a deposit improves approval chances and negotiating power on interest rates.",
            "Beyond the deposit, budget for transfer duty, bond registration, legal fees, and moving costs — typically 8–12% of the purchase price in total upfront costs.",
          ],
        },
        faqs: [
          {
            question: "How much deposit do I need?",
            answer:
              "Requirements vary by bank and profile. Many buyers aim for 10–20% of the purchase price, though 100% bonds are sometimes available.",
          },
          {
            question: "Can I use my pension to fund a deposit?",
            answer:
              "Generally no for residential purchases. Some retirement products allow limited access under specific conditions — consult a financial adviser.",
          },
          {
            question: "Do I need cash for transfer costs too?",
            answer:
              "Yes. Transfer duty, attorney fees, and bond registration are usually paid in cash and cannot be added to the home loan.",
          },
        ],
        fields: [
          { id: "price", label: "Target property price", placeholder: "e.g. 2 000 000", type: "number" },
          { id: "deposit", label: "Deposit percentage (%)", placeholder: "e.g. 10", type: "number" },
          { id: "saved", label: "Amount already saved", placeholder: "e.g. 80 000", type: "number" },
        ],
      },
      {
        slug: "rent-vs-buy-calculator",
        title: "Rent vs Buy Calculator",
        description:
          "Compare the long-term cost of renting versus buying a home.",
        href: "/tools/rent-vs-buy-calculator",
        explanation: {
          title: "Renting vs buying: which makes financial sense?",
          paragraphs: [
            "The rent vs buy decision depends on property prices, rental costs, interest rates, how long you plan to stay, and expected capital growth. Buying builds equity but carries transaction costs and maintenance.",
            "Renting offers flexibility and avoids large upfront costs, but rent typically increases over time and you do not benefit from property appreciation.",
            "This calculator compares total housing costs over your chosen period. It is a starting point — personal circumstances and lifestyle preferences matter too.",
          ],
        },
        faqs: [
          {
            question: "How long should I plan to stay before buying?",
            answer:
              "Transaction costs mean buying often only makes sense if you stay at least 5–7 years. Shorter periods favour renting.",
          },
          {
            question: "Should I include property growth in the comparison?",
            answer:
              "Yes, for a complete picture. Property values can rise or fall, and growth assumptions significantly affect long-term outcomes.",
          },
          {
            question: "What about maintenance when renting?",
            answer:
              "Landlords typically cover major maintenance when renting. Homeowners should budget 1–2% of property value annually for upkeep.",
          },
        ],
        fields: [
          { id: "rent", label: "Monthly rent", placeholder: "e.g. 15 000", type: "number" },
          { id: "price", label: "Property purchase price", placeholder: "e.g. 2 500 000", type: "number" },
          { id: "years", label: "Comparison period (years)", placeholder: "e.g. 10", type: "number" },
        ],
      },
    ],
  },
  {
    id: "finance-tools",
    title: "Finance Tools",
    description:
      "Plan your financial future with compound interest, retirement, and savings calculators.",
    accent: "emerald",
    tools: [
      {
        slug: "compound-interest-calculator",
        title: "Compound Interest Calculator",
        description:
          "Project how your investments grow over time with compound returns.",
        href: "/tools/compound-interest-calculator",
        explanation: {
          title: "The power of compound interest",
          paragraphs: [
            "Compound interest means you earn returns on both your original investment and on accumulated interest. Over long periods, this snowball effect can dramatically grow wealth.",
            "Regular contributions amplify compounding. Even modest monthly deposits into a tax-free savings account or unit trust can build substantial value over decades.",
            "Inflation reduces real purchasing power, so compare nominal growth against expected inflation for a realistic view of your future wealth.",
          ],
        },
        faqs: [
          {
            question: "What rate of return should I assume?",
            answer:
              "Historical equity returns in South Africa have averaged around 10–12% nominally, but future returns vary. Conservative planning often uses 6–8% after inflation.",
          },
          {
            question: "How often is interest compounded?",
            answer:
              "Compounding frequency affects growth. Monthly or daily compounding yields slightly more than annual compounding at the same stated rate.",
          },
          {
            question: "Is compound interest only for investments?",
            answer:
              "No — debt also compounds. Credit card and personal loan interest works against you the same way investment returns work for you.",
          },
        ],
        fields: [
          { id: "principal", label: "Initial investment", placeholder: "e.g. 50 000", type: "number" },
          { id: "monthly", label: "Monthly contribution", placeholder: "e.g. 2 000", type: "number" },
          { id: "rate", label: "Annual return (%)", placeholder: "e.g. 10", type: "number" },
          { id: "years", label: "Investment period (years)", placeholder: "e.g. 20", type: "number" },
        ],
      },
      {
        slug: "retirement-calculator",
        title: "Retirement Calculator",
        description:
          "Estimate whether you're on track to retire comfortably in South Africa.",
        href: "/tools/retirement-calculator",
        explanation: {
          title: "Planning for retirement in South Africa",
          paragraphs: [
            "Retirement planning estimates whether your savings and pension contributions will provide enough income when you stop working. Key inputs include current age, retirement age, savings, and expected expenses.",
            "South Africans can supplement employer pensions with RA contributions, tax-free savings, and discretionary investments. Tax incentives on RA contributions make them a popular retirement vehicle.",
            "The '4% rule' suggests withdrawing roughly 4% of your portfolio annually in retirement, adjusted for inflation. Your required nest egg depends on desired monthly income and expected lifespan.",
          ],
        },
        faqs: [
          {
            question: "How much do I need to retire in South Africa?",
            answer:
              "A common target is 20–25 times your desired annual retirement income. For R25 000 per month, that implies roughly R6–7.5 million in today's terms.",
          },
          {
            question: "What about my pension fund?",
            answer:
              "Include your current pension or provident fund balance and projected employer contributions. You can usually withdraw up to one-third as cash at retirement.",
          },
          {
            question: "When should I start saving for retirement?",
            answer:
              "As early as possible. Starting in your 20s or 30s gives compound interest decades to work, requiring far less monthly saving than starting in your 50s.",
          },
        ],
        fields: [
          { id: "age", label: "Current age", placeholder: "e.g. 35", type: "number" },
          { id: "retire", label: "Retirement age", placeholder: "e.g. 65", type: "number" },
          { id: "savings", label: "Current retirement savings", placeholder: "e.g. 500 000", type: "number" },
          { id: "income", label: "Desired monthly retirement income", placeholder: "e.g. 25 000", type: "number" },
        ],
      },
      {
        slug: "inflation-calculator",
        title: "Inflation Calculator",
        description:
          "See how inflation erodes purchasing power and adjust future values.",
        href: "/tools/inflation-calculator",
        explanation: {
          title: "Understanding inflation's impact",
          paragraphs: [
            "Inflation reduces the purchasing power of money over time. What costs R100 today will cost more in future years at the prevailing inflation rate.",
            "South Africa's inflation target is 3–6%, with recent CPI often in the 4–6% range. Planning with realistic inflation assumptions prevents underestimating future costs.",
            "Use this calculator to convert today's rands into future equivalents, or to see what a past amount would be worth in today's terms.",
          ],
        },
        faqs: [
          {
            question: "What inflation rate should I use for planning?",
            answer:
              "Many financial planners use 5–6% for long-term South African planning, aligned with the SARB's target range and historical averages.",
          },
          {
            question: "How is CPI different from my personal inflation?",
            answer:
              "CPI measures average price changes for a basket of goods. Your personal inflation depends on what you spend on — medical aid and education often rise faster than CPI.",
          },
          {
            question: "Why does inflation matter for investments?",
            answer:
              "Nominal returns must exceed inflation to grow real wealth. A 8% return with 6% inflation means only 2% real growth.",
          },
        ],
        fields: [
          { id: "amount", label: "Amount in today's rands", placeholder: "e.g. 100 000", type: "number" },
          { id: "rate", label: "Annual inflation rate (%)", placeholder: "e.g. 5.5", type: "number" },
          { id: "years", label: "Number of years", placeholder: "e.g. 10", type: "number" },
        ],
      },
      {
        slug: "emergency-fund-calculator",
        title: "Emergency Fund Calculator",
        description:
          "Determine the ideal emergency fund size for your household.",
        href: "/tools/emergency-fund-calculator",
        explanation: {
          title: "Building your emergency fund",
          paragraphs: [
            "An emergency fund covers unexpected expenses — job loss, medical bills, car repairs — without resorting to high-interest debt. Financial advisers typically recommend 3–6 months of essential expenses.",
            "Keep emergency savings in an accessible, low-risk account such as a money market fund or high-interest savings account. Avoid investing emergency funds in volatile assets.",
            "Start with a smaller goal such as one month's expenses, then build gradually. Any emergency buffer is better than none.",
          ],
        },
        faqs: [
          {
            question: "How many months of expenses should I save?",
            answer:
              "Three months if you have stable employment and dual income. Six months or more if self-employed, single income, or in a volatile industry.",
          },
          {
            question: "Where should I keep my emergency fund?",
            answer:
              "In a separate, easily accessible account — not mixed with daily spending. Money market funds and notice deposits offer modest returns with quick access.",
          },
          {
            question: "Should I pay off debt or build an emergency fund first?",
            answer:
              "A small emergency fund (e.g. one month) first prevents new debt during crises, then aggressively pay high-interest debt, then complete your full emergency fund.",
          },
        ],
        fields: [
          { id: "expenses", label: "Monthly essential expenses", placeholder: "e.g. 20 000", type: "number" },
          { id: "months", label: "Target months of cover", placeholder: "e.g. 6", type: "number" },
          { id: "saved", label: "Amount already saved", placeholder: "e.g. 30 000", type: "number" },
        ],
      },
    ],
  },
  {
    id: "tax-tools",
    title: "Tax Tools",
    description:
      "South African tax calculators for income tax, VAT, and capital gains.",
    accent: "violet",
    tools: [
      {
        slug: "income-tax-calculator",
        title: "Income Tax Calculator South Africa",
        description:
          "Estimate your PAYE and take-home pay using SARS tax brackets.",
        href: "/tools/income-tax-calculator",
        explanation: {
          title: "How South African income tax works",
          paragraphs: [
            "Individual income tax in South Africa is progressive — higher earners pay a higher marginal rate on income above each bracket threshold. The tax year runs from 1 March to 28/29 February.",
            "PAYE is deducted monthly by employers based on your salary and tax code. At year-end, you may owe more or receive a refund after filing your ITR12 return with all deductions and credits.",
            "Tax rebates and medical credits reduce your liability. Use this calculator for estimates — consult a tax practitioner for complex situations.",
          ],
        },
        faqs: [
          {
            question: "What is the difference between marginal and effective tax rate?",
            answer:
              "Marginal rate is tax on your last rand of income. Effective rate is total tax divided by total income — always lower than marginal due to progressive brackets.",
          },
          {
            question: "Are retirement annuity contributions tax deductible?",
            answer:
              "Yes, up to 27.5% of remuneration or taxable income (capped at R350 000 per year), reducing your taxable income.",
          },
          {
            question: "When do I need to file a tax return?",
            answer:
              "Most salaried employees must file if they earn above the filing threshold or have additional income. SARS sets deadlines each year — typically September to January.",
          },
        ],
        fields: [
          { id: "salary", label: "Annual taxable income", placeholder: "e.g. 600 000", type: "number" },
          { id: "age", label: "Age group", placeholder: "Select age group", type: "select", options: ["Under 65", "65 to 74", "75 and over"] },
        ],
      },
      {
        slug: "vat-calculator",
        title: "VAT Calculator South Africa",
        description:
          "Add or remove 15% VAT from amounts quickly and accurately.",
        href: "/tools/vat-calculator",
        explanation: {
          title: "VAT in South Africa at 15%",
          paragraphs: [
            "Value-Added Tax (VAT) is charged at 15% on most goods and services in South Africa. VAT-registered businesses collect VAT on sales and claim input VAT on purchases.",
            "Prices displayed to consumers are usually VAT-inclusive. To extract VAT from an inclusive price, divide by 1.15. To add VAT to an exclusive price, multiply by 1.15.",
            "Some items are zero-rated (basic food items) or exempt (certain financial services). This calculator applies the standard 15% rate.",
          ],
        },
        faqs: [
          {
            question: "What is the current VAT rate in South Africa?",
            answer:
              "The standard VAT rate is 15%, effective since 1 April 2018.",
          },
          {
            question: "How do I calculate VAT from an inclusive price?",
            answer:
              "VAT amount = Inclusive price × 15/115. Ex-VAT price = Inclusive price ÷ 1.15.",
          },
          {
            question: "Who must register for VAT?",
            answer:
              "Businesses with taxable supplies exceeding R1 million in 12 months must register. Voluntary registration is possible above R50 000.",
          },
        ],
        fields: [
          { id: "amount", label: "Amount", placeholder: "e.g. 1 150", type: "number" },
          { id: "mode", label: "Calculation type", placeholder: "Select type", type: "select", options: ["Add VAT (excl. → incl.)", "Remove VAT (incl. → excl.)"] },
        ],
      },
      {
        slug: "capital-gains-tax-calculator",
        title: "Capital Gains Tax Calculator",
        description:
          "Calculate CGT on property and investment disposals in South Africa.",
        href: "/tools/capital-gains-tax-calculator",
        explanation: {
          title: "Capital gains tax explained",
          paragraphs: [
            "Capital Gains Tax (CGT) applies when you dispose of an asset for more than its base cost. In South Africa, only a portion of the gain (the inclusion rate) is added to your taxable income.",
            "For individuals, the inclusion rate is 40% — meaning 40% of your net capital gain is taxed at your marginal income tax rate. Primary residences receive a R2 million exclusion on gains.",
            "Base cost includes purchase price plus improvements and certain acquisition costs. Keeping records of all capital improvements reduces your taxable gain on sale.",
          ],
        },
        faqs: [
          {
            question: "Do I pay CGT when selling my primary home?",
            answer:
              "Primary residences qualify for a R2 million capital gain exclusion. Gains above that amount may be subject to CGT.",
          },
          {
            question: "What is the CGT inclusion rate for individuals?",
            answer:
              "Individuals and special trusts: 40% of the net gain is included in taxable income. Trusts and companies have higher inclusion rates.",
          },
          {
            question: "Can I deduct agent commission from my gain?",
            answer:
              "Yes. Selling costs such as estate agent commission and legal fees form part of the base cost calculation, reducing your capital gain.",
          },
        ],
        fields: [
          { id: "sale", label: "Sale price", placeholder: "e.g. 3 000 000", type: "number" },
          { id: "cost", label: "Base cost (purchase + improvements)", placeholder: "e.g. 1 800 000", type: "number" },
          { id: "rate", label: "Marginal tax rate (%)", placeholder: "e.g. 31", type: "number" },
        ],
      },
    ],
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Property Tools", href: "/#property-tools" },
  { label: "Finance Tools", href: "/#finance-tools" },
  { label: "Guides", href: "/guides" },
] as const;

export function getAllTools(): Tool[] {
  return toolCategories.flatMap((category) => category.tools);
}

export function getToolBySlug(slug: string) {
  for (const category of toolCategories) {
    const tool = category.tools.find((t) => t.slug === slug);
    if (tool) return { tool, category };
  }
  return null;
}

export function getRelatedTools(slug: string, limit = 3): Tool[] {
  for (const category of toolCategories) {
    const index = category.tools.findIndex((t) => t.slug === slug);
    if (index === -1) continue;

    const related = category.tools.filter((t) => t.slug !== slug);
    const before = related.slice(0, limit);

    if (before.length < limit) {
      const others = toolCategories
        .filter((c) => c.id !== category.id)
        .flatMap((c) => c.tools)
        .filter((t) => t.slug !== slug)
        .slice(0, limit - before.length);
      return [...before, ...others];
    }

    return before;
  }
  return [];
}
