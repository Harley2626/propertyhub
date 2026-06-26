import type { GuideArticle } from "../types";

export const firstTimeHomeBuyerGuide: GuideArticle = {
  slug: "first-time-home-buyer-guide-south-africa",
  title: "First-Time Home Buyer Guide South Africa",
  description:
    "Step-by-step guide for first-time home buyers in South Africa — pre-approval, deposits, transfer duty, bond registration, and what to expect from offer to keys.",
  tag: "Property",
  pillar: "buying-property",
  subtopic: "first-time-buyers",
  estimatedReadingTime: "15 min read",
  publishedDate: "2025-06-01",
  updatedDate: "2025-06-24",
  lastReviewed: "2025-06-24",
  reviewedBy: "PropertyPilot Editorial",
  relatedCalculators: [
    "deposit-calculator",
    "affordability-calculator",
    "transfer-duty-calculator",
    "bond-calculator",
  ],
  relatedAreas: ["cape-town", "somerset-west", "durbanville"],
  relatedTool: {
    slug: "deposit-calculator",
    href: "/tools/deposit-calculator",
    label: "Deposit Calculator",
  },
  additionalTools: [
    { href: "/tools/affordability-calculator", label: "Affordability Calculator" },
    { href: "/tools/transfer-duty-calculator", label: "Transfer Duty Calculator" },
    { href: "/tools/bond-calculator", label: "Bond Calculator" },
  ],
  keywords: [
    "first time home buyer south africa",
    "buying first property",
    "first home bond",
    "property transfer process",
    "100 percent bond",
    "propertypilot",
  ],
  sections: [
    {
      id: "introduction",
      title: "Buying your first home in South Africa",
      paragraphs: [
        "Purchasing your first property is one of the biggest financial decisions you will make. For South Africans entering the market in 2025, the journey spans saving and pre-approval, house hunting, offer to purchase, bond approval, transfer duty, and registration at the Deeds Office — typically a process of two to four months from accepted offer to receiving keys, though timelines vary.",
        "First-time buyers often qualify for 100% bonds in certain circumstances, but even without a deposit you still need cash for transfer duty, attorney fees, and bond registration. Understanding the full process before you start prevents costly mistakes, unrealistic expectations, and deals that collapse at the last minute.",
        "This guide walks through every major step — from checking affordability to moving in — with links to free calculators that help you budget along the way.",
      ],
    },
    {
      id: "affordability-first",
      title: "Step 1: Know what you can afford",
      paragraphs: [
        "Before browsing property portals, establish your budget. List gross household income, monthly debt repayments, and available savings. Use PropertyPilot's Affordability Calculator to estimate your maximum bond, then add your deposit to find your maximum purchase price. Cross-check the instalment in the Bond Calculator — if it exceeds roughly 30% of gross income, consider a lower price range.",
        "Obtain pre-approval from a bank or mortgage originator. Pre-approval confirms your borrowing capacity and rate margin, strengthening your position with sellers and agents. It is not a final guarantee — the bank still values the specific property — but it defines a realistic ceiling.",
        "Budget for costs beyond the bond: transfer duty (use the Transfer Duty Calculator), conveyancing fees, bond registration, moving costs, and an emergency fund for post-move expenses. First-time buyers frequently underestimate cash requirements by R100,000 or more.",
      ],
    },
    {
      id: "saving-deposit",
      title: "Step 2: Save your deposit and cash reserves",
      paragraphs: [
        "A deposit reduces your loan amount, monthly instalment, and total interest. Many first-time buyers target 10% of the purchase price, though 100% bonds are sometimes available for creditworthy applicants on properties below certain values. Even with a full bond, you cannot finance transfer duty and legal fees — cash savings are essential.",
        "Use the Deposit Calculator to plan how long it will take to reach your target based on monthly savings. Consider tax-free savings accounts for disciplined saving, and avoid dipping into emergency funds that should cover three to six months of expenses after you move in.",
        "Gifted deposits from family are accepted by many banks with proper documentation. Employer housing schemes and FLISP-related programmes may assist qualifying buyers — research government and institutional support if your income falls within qualifying bands.",
      ],
    },
    {
      id: "house-hunting",
      title: "Step 3: House hunting and due diligence",
      paragraphs: [
        "Search within your pre-approved range in suburbs that match your commute, schools, and lifestyle needs. Attend show days, verify listing accuracy, and compare sectional title levies or municipal rates across options — a cheaper purchase price with high levies can cost more monthly than a slightly pricier home with low levies.",
        "Inspect thoroughly. Check for damp, roof condition, plumbing, electrical compliance certificates, and boundary issues. For sectional title, request body corporate financial statements and meeting minutes — special levies for lift replacements or facade repairs can add thousands unexpectedly.",
        "Work with a reputable estate agent registered with the Property Practitioners Regulatory Authority (PPRA). Agents facilitate offers, coordinate with attorneys, and guide process — but remember they represent the seller unless you appoint a buyer's agent.",
      ],
    },
    {
      id: "offer-to-purchase",
      title: "Step 4: Making an offer to purchase",
      paragraphs: [
        "The offer to purchase (OTP) is a binding contract once signed by both parties. Read every clause carefully before signing. Key terms include purchase price, deposit payable on acceptance, bond clause (subject to bond approval within a specified period), occupation date, and fixtures included.",
        "The bond clause protects you if finance is declined — ensure it allows sufficient time for bond application and specifies who may cancel if approval fails. Without a proper bond clause, you could be liable for the purchase without financing.",
        "Negotiate repairs, appliances, and occupation rent if you move in before transfer. Never sign under pressure. First-time buyers benefit from having an attorney review the OTP before acceptance — the cost is modest compared to the transaction value.",
      ],
    },
    {
      id: "bond-application",
      title: "Step 5: Bond application and approval",
      paragraphs: [
        "Submit your bond application to your chosen bank or through a mortgage originator who shops multiple lenders. Provide ID, payslips, bank statements, proof of address, and the signed offer to purchase. The bank credit-assesses you, values the property, and issues a quotation if approved.",
        "Compare rate margins — even 0.25% matters over 20 years. Accept the quotation to proceed. The bank instructs bond attorneys to prepare registration documents. Bond approval typically takes seven to 21 business days with complete documentation.",
        "If declined, ask why. Common reasons include affordability, credit issues, or valuation below purchase price. You may need to renegotiate price, increase deposit, or apply elsewhere. Originators improve odds by matching your profile to the right bank.",
      ],
    },
    {
      id: "transfer-duty",
      title: "Step 6: Transfer duty and attorney process",
      paragraphs: [
        "The seller's transferring attorney manages change of ownership. The buyer pays transfer duty to SARS (unless VAT applies on a new development), conveyancing fees, and deeds office levies. On a R1.5 million resale property, transfer duty under 2025 brackets is approximately R8,286 — higher prices attract substantially more.",
        "Your bond attorney handles bond registration in parallel. Both processes must complete before the property registers in your name. Keep documents organised and respond promptly to attorney requests — delays at this stage push back occupation and key handover.",
        "Track progress through your estate agent and attorneys. Typical transfer takes eight to twelve weeks from acceptance, depending on province, bond grant timing, and whether the seller's bond cancellation is straightforward.",
      ],
    },
    {
      id: "registration",
      title: "Step 7: Registration and taking occupation",
      paragraphs: [
        "Once transfer duty is paid, guarantees are in place, and documents are lodged, the Deeds Office registers transfer. You become the legal owner on registration date. Bond repayments typically commence from the first month after registration.",
        "Conduct a pre-occupation inspection with the agent. Document any defects not noted earlier. Connect utilities, update your address with banks and SARS, and ensure homeowner's insurance is active — banks require building insurance as a bond condition.",
        "Keep all transfer documents, bond statements, and compliance certificates in a safe place. You will need them for future sale, insurance claims, and renovations requiring municipal approval.",
      ],
    },
    {
      id: "after-move-in",
      title: "After you move in: staying financially healthy",
      paragraphs: [
        "Build a maintenance fund immediately. Allocate at least 1% of property value annually for upkeep on freehold homes. Sectional title owners pay levies but should still budget for internal maintenance and special levy risk.",
        "Consider extra bond payments when possible — even R500 monthly reduces interest and shortens your term. Access bonds allow redraw if you need flexibility. Avoid unsecured debt to furnish your home; high-interest short-term loans undermine the wealth-building purpose of ownership.",
        "Review your bond rate periodically. If your margin is above market, ask the bank to reprice or consider switching — weigh switching costs against savings. Stay informed on SARB rate decisions that affect your instalment.",
      ],
    },
    {
      id: "common-mistakes",
      title: "Common first-time buyer mistakes to avoid",
      paragraphs: [
        "Buying at maximum approval without buffer for rate hikes, maintenance, and lifestyle costs. Skipping pre-approval and falling in love with unaffordable properties. Ignoring transfer duty and legal fees in cash planning. Signing OTPs without bond clauses or legal review.",
        "Underestimating levies and rates on sectional title. Failing to inspect body corporate finances. Choosing the longest bond term without considering total interest cost. Not shopping bond rates across banks.",
        "Moving in without emergency savings — homeownership surprises are inevitable. A geyser replacement or gate motor repair should not trigger high-interest debt. Plan conservatively and use PropertyPilot's calculators at every stage to keep numbers grounded.",
      ],
    },
    {
      id: "support-programmes",
      title: "Government and bank support for first-time buyers",
      paragraphs: [
        "First-time buyers should explore all available assistance. Some banks run promotional campaigns with reduced initiation fees or better rate margins for qualifying entrants. The Finance Linked Individual Subsidy Programme (FLISP) provides a once-off subsidy linked to bond approval for applicants earning below specified household income thresholds — check current National Housing Finance Corporation (NHFC) criteria and participating lenders.",
        "Employer housing schemes, stokvels, and family co-investment arrangements help buyers assemble deposits. Document gifted funds properly for bank compliance. Community property schemes and affordable housing developments may offer entry points below open-market prices with different transfer arrangements.",
        "No programme removes the need for affordability assessment or transfer costs entirely. Treat subsidies and promotions as enhancements to a solid personal budget — not substitutes for transfer duty planning, insurance, or emergency reserves.",
      ],
    },
    {
      id: "checklist",
      title: "First-time buyer checklist",
      paragraphs: [
        "Before house hunting: obtain credit report, calculate affordability, save for deposit and transfer costs, and secure pre-approval. During search: compare total monthly housing cost including levies, verify compliance certificates, and review body corporate records for sectional title. At offer stage: include bond clause, confirm deposit terms, and seek legal review. After acceptance: submit bond application promptly, respond to attorneys, and track transfer milestones. At registration: inspect property, activate insurance, and set up bond payments.",
        "Keep a folder — digital or physical — of OTP, bond approval, transfer duty receipt, compliance certificates, and warranty documents for appliances. First-time buyers who stay organised close transfers faster and avoid penalty interest from delayed duty payment.",
        "Celebrate the milestone, but keep learning. Homeownership rewards buyers who maintain reserves, service their bond diligently, and revisit their financial plan annually. Your first home is both a place to live and a foundation for long-term wealth if managed wisely. Share your timeline with your attorney and agent so every party knows the milestones you are working toward. Clear communication reduces delays and builds confidence through an unfamiliar process.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can first-time buyers get a 100% bond in South Africa?",
      answer:
        "Yes, in qualifying cases. Banks assess income, credit, and property value. There is no universal first-time buyer guarantee, but 100% finance is more common for lower loan-to-value needs and strong profiles.",
    },
    {
      question: "How much deposit do first-time buyers need?",
      answer:
        "Ideally 10% or more, but some buyers proceed with no deposit if approved for 100% finance. You still need cash for transfer duty, legal fees, and bond registration regardless of deposit.",
    },
    {
      question: "What is the first step for a first-time home buyer?",
      answer:
        "Assess affordability and obtain pre-approval. Use an affordability calculator, review savings for deposit and transfer costs, then apply for pre-approval before serious house hunting.",
    },
    {
      question: "How long does it take to buy a house in South Africa?",
      answer:
        "Typically two to four months from accepted offer to registration, depending on bond approval, attorney efficiency, and Deeds Office processing times.",
    },
    {
      question: "Do first-time buyers pay transfer duty?",
      answer:
        "Yes, on standard resales. The first R1,210,000 of property value is duty-free under 2025 brackets; duty applies above that. VAT-inclusive new builds from developers are exempt from transfer duty.",
    },
    {
      question: "What documents do I need for a bond application?",
      answer:
        "South African ID, recent payslips, three to six months bank statements, proof of address, and the signed offer to purchase. Self-employed applicants provide additional financial statements.",
    },
    {
      question: "Should I use a mortgage originator?",
      answer:
        "Originators submit to multiple banks, often at no direct cost to you, and may secure competitive rates. Compare their offer with your primary bank's direct quotation.",
    },
    {
      question: "What is a bond clause in an offer to purchase?",
      answer:
        "A condition that the sale depends on bond approval within a specified period. It protects the buyer if the bank declines the loan or grants less than required.",
    },
    {
      question: "When do I start paying my bond?",
      answer:
        "Monthly instalments typically begin after bond registration and property transfer. Your bank confirms the first debit date on your bond statement.",
    },
    {
      question: "What insurance do I need as a first-time buyer?",
      answer:
        "Building insurance is usually mandatory for bond approval. Contents insurance is strongly recommended. Life cover to settle the bond on death is optional but prudent for dependants.",
    },
  ],
};
