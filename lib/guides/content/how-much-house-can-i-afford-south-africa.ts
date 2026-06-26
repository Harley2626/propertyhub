import type { GuideArticle } from "../types";

export const houseAffordabilityGuide: GuideArticle = {
  slug: "how-much-house-can-i-afford-south-africa",
  title: "How Much House Can I Afford? (South Africa)",
  description:
    "Learn how South African banks assess home loan affordability — income rules, debt ratios, deposits, and how to calculate the maximum property price you can afford in 2025.",
  tag: "Finance",
  pillar: "property-finance",
  subtopic: "affordability",
  estimatedReadingTime: "14 min read",
  publishedDate: "2025-06-01",
  updatedDate: "2025-06-24",
  lastReviewed: "2025-06-24",
  authorSlug: "jared-devlin",
  relatedCalculators: ["affordability-calculator", "bond-calculator", "deposit-calculator"],
  relatedGuides: ["bond-calculator-south-africa-2025", "first-time-home-buyer-guide-south-africa"],
  relatedTool: {
    slug: "affordability-calculator",
    href: "/tools/affordability-calculator",
    label: "Affordability Calculator",
  },
  additionalTools: [
    { href: "/tools/bond-calculator", label: "Bond Calculator" },
    { href: "/tools/deposit-calculator", label: "Deposit Calculator" },
  ],
  keywords: [
    "how much house can i afford south africa",
    "home loan affordability",
    "bond affordability calculator",
    "maximum bond amount",
    "debt to income ratio",
    "propertypilot",
  ],
  sections: [
    {
      id: "introduction",
      title: "What does affordability mean when buying property?",
      paragraphs: [
        '"How much house can I afford?" is the first question most South African buyers ask — and the answer is not simply your annual salary multiplied by a factor. Affordability combines your gross income, existing debt, living expenses, credit profile, deposit, and the interest rate on your home loan to determine the maximum bond a bank will grant and the monthly instalment you can sustain without financial distress.',
        "Banks assess affordability under the National Credit Act (NCA), which requires responsible lending. You may feel comfortable with a higher instalment, but the bank applies its own models, stress tests, and policy limits. Understanding these rules before you house hunt prevents disappointment and helps you target properties within a realistic price range.",
        "This guide explains how affordability works in South Africa, the rules of thumb buyers use, what banks actually measure, how deposits and rates affect your maximum price, and how to use an affordability calculator alongside a bond calculator to answer the question with numbers.",
      ],
    },
    {
      id: "income-rules",
      title: "Income and the 30% guideline",
      paragraphs: [
        "A common rule of thumb — though not a legal cap — is that your bond instalment should not exceed roughly 30% of gross monthly household income. If your combined gross income is R50,000 per month, that suggests a maximum instalment around R15,000. At current rates and a 20-year term, that might support a bond of roughly R1.4 million to R1.6 million depending on the interest rate.",
        "Gross income includes your basic salary plus regular allowances, commission, and rental income that you can document. Banks may annualise variable income or apply haircuts to commission unless you have a consistent two-to-three year track record. Self-employed applicants provide financial statements and tax returns; the bank uses net profit trends rather than turnover.",
        "Joint applications combine both applicants' income and all shared debt. A higher combined income increases borrowing power, but both credit profiles are assessed. If one applicant has impaired credit, it can limit the approved amount or rate margin even when the other earns well.",
      ],
    },
    {
      id: "debt-ratios",
      title: "Debt-to-income and total obligations",
      paragraphs: [
        "Banks cap total monthly debt repayments — bond, car finance, personal loans, credit cards, and store accounts — at approximately 40% to 45% of gross income. If you already pay R8,000 per month on a car and credit facilities, that reduces the instalment room available for a bond before you hit the bank's ceiling.",
        "Paying down or settling short-term debt before applying can materially increase your maximum bond. Clearing a R2,000 monthly personal loan might free enough capacity for an additional R300,000 to R400,000 in bond amount at typical rates and terms. Avoid new credit applications in the six months before a bond application — hard enquiries and new accounts can temporarily lower your score.",
        "Living expenses are also modelled. Banks use household expense benchmarks or declared budgets to estimate disposable income after debt service. Under-declaring expenses does not help — inconsistencies between your declared budget and bank statement patterns can delay approval.",
      ],
    },
    {
      id: "stress-testing",
      title: "Interest rate stress testing",
      paragraphs: [
        "South African home loans are predominantly variable, linked to prime. Banks do not approve you only at today's rate — they stress-test affordability at a higher rate, often one to two percentage points above your quoted margin, to ensure you could still repay if the South African Reserve Bank raises rates.",
        "This stress test directly reduces the maximum bond relative to a simple bond calculator result at the current rate. If a bond calculator shows R18,000 per month at 11.5% but the bank tests at 13.5%, your approved amount will be lower than the calculator suggests at 11.5%. Always calculate at a higher rate when estimating affordability yourself.",
        "Fixed-rate periods offer temporary certainty but revert to variable rates. Your long-term affordability should assume rates can rise over a 20-year horizon. Buyers who stretch to the maximum approval at a low-rate cycle are most vulnerable when prime increases.",
      ],
    },
    {
      id: "deposits",
      title: "How your deposit affects affordability",
      paragraphs: [
        "Affordability has two dimensions: the maximum bond the bank grants and the total property price you can afford including your deposit. A R200,000 deposit adds R200,000 to your purchasing power on top of the approved bond. Without a deposit, your maximum price equals your maximum bond; with a 10% deposit, you can buy a home worth roughly 11% more than the bond alone.",
        "Banks may offer better rate margins on lower loan-to-value ratios. A 20% deposit signals lower risk, which can reduce your instalment through a better rate — effectively increasing affordability twice: through a lower loan amount and a lower rate.",
        "Remember that your deposit is not your only cash need. Transfer duty, conveyancing fees, and bond registration require additional cash that cannot be financed through the bond. Use PropertyPilot's Deposit Calculator and Transfer Duty Calculator alongside the Affordability Calculator to ensure your savings cover both the deposit and transaction costs.",
      ],
    },
    {
      id: "property-costs",
      title: "Costs beyond the bond instalment",
      paragraphs: [
        "Affordable homeownership means more than affording the bond. Municipal rates, body corporate levies in sectional title schemes, insurance, maintenance, and utilities add hundreds to thousands of rands monthly. Banks sometimes include estimated levies and rates in affordability assessments for the specific property you buy.",
        "A sectional title flat with a R3,500 levy and R800 rates effectively adds R4,300 to your monthly housing cost beyond the bond instalment. When asking how much house you can afford, compare total housing cost — not the bond alone — to your income.",
        "Rule of thumb for maintenance on freehold homes: budget 1% of property value per year. Older properties and those with pools or large gardens may cost more. Under-budgeting for ongoing costs is a common reason buyers feel house poor despite bank approval.",
      ],
    },
    {
      id: "credit-profile",
      title: "Credit score and employment stability",
      paragraphs: [
        "Your credit bureau record influences both approval and pricing. Adverse listings, judgments, slow payments, and high utilisation on revolving credit reduce your score and may lead to decline or a higher rate margin. A better score can mean prime minus a margin rather than prime plus — a difference worth tens of thousands over the loan term.",
        "Employment stability matters. Permanent employment with a consistent employer strengthens your application. Contract workers, recent job changers, and probationary employees may face additional scrutiny. Self-employed buyers need clean, auditable financials — messy accounts delay approval.",
        "Obtain your free credit report from a bureau before applying. Dispute errors and settle small arrears. Three to six months of disciplined payment behaviour can improve your profile before a bond application.",
      ],
    },
    {
      id: "using-calculators",
      title: "Using affordability and bond calculators together",
      paragraphs: [
        "PropertyPilot's Affordability Calculator estimates the maximum bond based on gross income, existing debt, and an estimated interest rate. It applies common bank guidelines to give an indicative ceiling. Enter realistic figures — overstating income or understating debt produces misleading results.",
        "Once you have a maximum bond estimate, add your deposit to find your maximum purchase price. Then use the Bond Calculator to model instalments at different rates and terms. If the instalment exceeds 30% of gross income or leaves insufficient room for living costs, reduce your target price.",
        "Iterate: adjust deposit savings, debt repayment plans, and price targets until bond instalment, transfer costs, and monthly housing expenses align with your budget. Pre-approval from a bank validates the estimate — calculators narrow your search; pre-approval confirms it.",
      ],
    },
    {
      id: "practical-steps",
      title: "Practical steps to determine your budget",
      paragraphs: [
        "Step one: list gross household income and all monthly debt repayments. Step two: run the Affordability Calculator with a conservative rate. Step three: subtract estimated transfer costs and required deposit from your savings to confirm cash availability. Step four: use the Bond Calculator on your target price range. Step five: add levies, rates, and maintenance to the instalment for a true monthly housing cost.",
        "Get pre-approved before viewing properties above your range. Estate agents in competitive markets such as Cape Town's Atlantic Seaboard and Gauteng's northern suburbs often request proof of affordability. Pre-approval also reveals your actual rate margin, which may differ from estimates.",
        "If the approved amount is lower than hoped, consider a co-applicant, increasing your deposit, settling short-term debt, or extending your search to areas with lower entry prices. Affordability is not fixed — it improves as income rises, debt falls, and savings grow.",
      ],
    },
    {
      id: "regional-differences",
      title: "Affordability across South African metros",
      paragraphs: [
        "The same income buys different property in different cities. A R1.2 million bond might secure a two-bedroom apartment in parts of Pretoria or Port Elizabeth but fall short of a one-bedroom in Cape Town's City Bowl. Affordability is always relative to local prices, levies, and lifestyle costs — not an abstract national number.",
        "Remote and hybrid work has shifted buyer preferences toward larger homes in outer Gauteng, the Cape Winelands, and KwaZulu-Natal coast at the expense of compact urban units. If your employer allows location flexibility, widening your search geography can dramatically improve what your approved bond buys.",
        "When relocating metros, recalculate affordability including commute costs, school fees, and insurance premiums that differ by area. A lower purchase price with a long commute may cost more monthly than a higher price near work and amenities.",
        "Bond originators often know which banks favour specific income types — commission earners, government employees, or professionals — and can route your application accordingly. The affordability ceiling is the same maths everywhere, but approval outcomes vary by lender policy. Document your income consistently for at least six months before applying to strengthen your file. Small improvements in credit and debt reduction can shift affordability meaningfully within a year.",
      ],
    },
  ],
  faqs: [
    {
      question: "How much bond can I afford on a R30,000 salary?",
      answer:
        "Indicatively, banks may allow a bond instalment of roughly R9,000 to R12,000 on R30,000 gross, depending on existing debt and credit profile. At typical rates over 20 years, that suggests a bond of roughly R900,000 to R1.2 million before adding a deposit. Use the Affordability Calculator for a tailored estimate.",
    },
    {
      question: "What is the debt-to-income ratio for home loans in South Africa?",
      answer:
        "Banks typically cap total monthly debt repayments at around 40% to 45% of gross income, including the new bond. Individual policies vary by bank and risk profile.",
    },
    {
      question: "Does gross or net income matter for bond approval?",
      answer:
        "Banks primarily use gross income for initial affordability ratios, but net disposable income after tax and expenses is also considered. Self-employed applicants are assessed on net profit from financial statements.",
    },
    {
      question: "Can I afford a house with no deposit?",
      answer:
        "Possibly, if you qualify for a 100% bond and have cash for transfer duty and legal fees. Approval depends on income, credit, and the property. A deposit improves terms and reduces instalments.",
    },
    {
      question: "How accurate is an affordability calculator?",
      answer:
        "It provides a strong indicative maximum based on common lending guidelines. Final approval depends on the bank's full assessment, property valuation, and stress testing at higher rates.",
    },
    {
      question: "Should I buy at my maximum approved bond?",
      answer:
        "Financial advisers often recommend buying below your maximum to buffer against rate hikes, maintenance, and lifestyle costs. Maximum approval is a ceiling, not a target.",
    },
    {
      question: "How does my spouse's income affect affordability?",
      answer:
        "Joint applications combine both incomes and both parties' debt obligations. Combined income increases borrowing power, but both credit records are checked.",
    },
    {
      question: "What credit score do I need for a home loan in South Africa?",
      answer:
        "Banks do not publish minimum scores, but higher scores improve approval odds and rate margins. Serious adverse listings or judgments can lead to decline until resolved.",
    },
    {
      question: "Do banks include levies in affordability calculations?",
      answer:
        "Many banks factor estimated body corporate levies and municipal rates for the property being purchased, reducing the maximum bond instalment they will approve.",
    },
  ],
};
