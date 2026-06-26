import { withAnswerDefaults } from "../defaults";
import type { AnswerArticle } from "../types";

export const buyingPropertyAnswers: AnswerArticle[] = [
  withAnswerDefaults({
    slug: "what-is-transfer-duty-south-africa",
    title: "What is transfer duty in South Africa?",
    description:
      "Transfer duty is a tax the buyer pays to SARS when purchasing immovable property. Rates follow a progressive sliding scale based on purchase price.",
    pillar: "buying-property",
    subtopic: "transfer-duty",
    shortAnswer:
      "Transfer duty is a tax levied by SARS on the purchase of immovable property in South Africa. The buyer pays it before the property can be registered in their name. From 1 April 2025, no duty is payable on the first R1.21 million of value; higher brackets apply up to 13% on amounts above R13.31 million. New builds from VAT-registered developers are generally exempt because VAT applies instead.",
    detailedExplanation: [
      "When you buy a house, flat, or plot from a private seller on the secondary market, SARS charges transfer duty on the purchase price. Your conveyancing attorney collects and pays it on your behalf as part of the transfer process.",
      "The duty is calculated on a sliding scale — similar to income tax brackets — not as a flat percentage of the full price. The first R1,210,000 of property value is exempt (2025/2026 rates). Amounts above that fall into brackets of 3%, 6%, 8%, 11%, and 13%.",
      "Transfer duty is separate from conveyancing fees, deeds office fees, and bond registration costs. Budget for all of these when planning your upfront cash requirement.",
    ],
    thingsToKnow: [
      "The buyer always pays transfer duty — not the seller.",
      "No transfer duty on the first R1,210,000 of property value (2025 rates).",
      "Buying from a VAT-registered developer? VAT at 15% usually applies instead of transfer duty.",
      "Transfer duty must be paid before the property is registered in your name.",
    ],
    commonMistakes: [
      "Confusing transfer duty with conveyancing attorney fees — they are separate costs.",
      "Assuming transfer duty is included in the bond — it must be paid in cash.",
      "Using outdated SARS brackets from before the 2025 tax year.",
    ],
    relatedCalculators: ["transfer-duty-calculator", "deposit-calculator"],
    relatedGuides: ["transfer-duty-calculator-south-africa-2025", "first-time-home-buyer-guide-south-africa"],
    relatedAnswers: [
      "who-pays-transfer-duty-south-africa",
      "transfer-duty-vs-vat-on-property-south-africa",
      "what-upfront-costs-buying-property-south-africa",
    ],
    faqs: [
      {
        question: "Is transfer duty the same as registration fees?",
        answer:
          "No. Transfer duty is a SARS tax on the property value. Registration fees are paid to the deeds office and conveyancer for registering the title and bond.",
      },
      {
        question: "Do first-time buyers pay less transfer duty?",
        answer:
          "The same SARS brackets apply to all buyers. There is no separate first-time buyer exemption, though the nil-rate threshold benefits lower-priced purchases.",
      },
    ],
    officialSources: [
      {
        name: "SARS — Transfer duty",
        url: "https://www.sars.gov.za/types-of-tax/transfer-duty/",
        description: "Official transfer duty rates and exemptions.",
      },
    ],
    keywords: ["transfer duty", "SARS", "property tax", "South Africa"],
  }),
  withAnswerDefaults({
    slug: "how-much-deposit-to-buy-house-south-africa",
    title: "How much deposit do I need to buy a house in South Africa?",
    description:
      "Most buyers aim for 10–20% of the purchase price, though 100% bonds are sometimes available for qualifying applicants.",
    pillar: "buying-property",
    subtopic: "deposits",
    shortAnswer:
      "Most South African banks prefer a deposit of 10–20% of the purchase price, though qualifying first-time buyers may obtain a 100% bond with no deposit. A larger deposit reduces your loan amount, monthly repayment, and total interest. You also need cash for transfer duty, conveyancing fees, and bond registration — typically 8–12% of the price on top of the deposit.",
    detailedExplanation: [
      "Your deposit is the portion of the purchase price you pay upfront in cash. The bank finances the remainder as a home loan (bond). A 10% deposit on a R2 million home means R200,000 cash plus transfer costs.",
      "Banks assess your credit profile, income, and loan-to-value ratio when deciding whether to grant a 100% bond. First-time buyers with strong credit may qualify, but a deposit improves approval odds and may secure a better interest rate.",
      "Remember that the deposit is only part of your upfront cash need. Transfer duty, attorney fees, and moving costs are paid separately and cannot be added to the bond.",
    ],
    thingsToKnow: [
      "10% is a common target deposit; 20% reduces interest costs significantly.",
      "100% bonds exist but are not guaranteed — bank policy varies.",
      "Transfer duty and attorney fees are additional cash requirements.",
      "A larger deposit may qualify you for a lower interest rate.",
    ],
    commonMistakes: [
      "Saving only for the deposit and forgetting transfer duty and legal fees.",
      "Assuming the deposit can be financed through the bond.",
      "Not getting pre-approval before making an offer.",
    ],
    relatedCalculators: ["deposit-calculator", "affordability-calculator", "bond-calculator"],
    relatedGuides: ["first-time-home-buyer-guide-south-africa", "how-much-house-can-i-afford-south-africa"],
    relatedAnswers: [
      "can-i-buy-house-with-no-deposit-south-africa",
      "what-upfront-costs-buying-property-south-africa",
    ],
    faqs: [
      {
        question: "Can I use a gift as a deposit?",
        answer:
          "Yes, but banks may require proof of the gift and a declaration that it is not a loan. Check your bank's policy before relying on gifted funds.",
      },
    ],
    officialSources: [
      {
        name: "National Credit Regulator — Home loans",
        url: "https://www.ncr.org.za/",
        description: "Consumer credit and lending guidance.",
      },
    ],
    keywords: ["deposit", "home loan", "100% bond", "first-time buyer"],
  }),
  withAnswerDefaults({
    slug: "who-pays-transfer-duty-south-africa",
    title: "Who pays transfer duty when buying property?",
    description:
      "The buyer is responsible for paying transfer duty to SARS, typically handled by the conveyancing attorney during transfer.",
    pillar: "buying-property",
    subtopic: "transfer-duty",
    shortAnswer:
      "The buyer pays transfer duty in South Africa — not the seller. Payment is usually handled by the transferring attorney, who collects the amount from you and pays SARS before the property is registered in your name. The seller pays their own costs, such as estate agent commission and any outstanding bond cancellation fees.",
    detailedExplanation: [
      "Transfer duty is a buyer-side tax on property acquisitions. Even though the seller initiates the sale, the legal obligation to pay transfer duty falls on the purchaser.",
      "Your conveyancer will request transfer duty funds together with their fees before lodgement at the deeds office. If you are buying through a company or trust, the same buyer-pays rule applies.",
      "In a property development sale where the seller is VAT registered, transfer duty may not apply — VAT is charged on the purchase price instead.",
    ],
    thingsToKnow: [
      "Buyer pays transfer duty; seller pays agent commission.",
      "Conveyancer handles SARS payment on your behalf.",
      "VAT-registered developer sales may replace transfer duty with VAT.",
    ],
    commonMistakes: [
      "Expecting the seller to cover transfer duty as part of negotiations.",
      "Not budgeting for transfer duty when calculating total cash needed.",
    ],
    relatedCalculators: ["transfer-duty-calculator", "deposit-calculator"],
    relatedGuides: ["transfer-duty-calculator-south-africa-2025"],
    relatedAnswers: ["what-is-transfer-duty-south-africa", "what-upfront-costs-buying-property-south-africa"],
    faqs: [],
    officialSources: [
      {
        name: "SARS — Transfer duty",
        url: "https://www.sars.gov.za/types-of-tax/transfer-duty/",
      },
    ],
    keywords: ["who pays transfer duty", "buyer costs", "property transfer"],
  }),
  withAnswerDefaults({
    slug: "what-are-conveyancing-fees-south-africa",
    title: "What are conveyancing fees in South Africa?",
    description:
      "Conveyancing fees are charged by the transferring attorney to register the property in the buyer's name. They are separate from transfer duty.",
    pillar: "buying-property",
    subtopic: "transfer-process",
    shortAnswer:
      "Conveyancing fees are professional fees charged by the transferring attorney to handle the legal transfer of property into your name. They are based on the purchase price according to Law Society guidelines, include VAT, and are separate from transfer duty, deeds office fees, and bond registration costs. Total transfer costs typically add 1–2% of the purchase price on top of transfer duty.",
    detailedExplanation: [
      "When you buy property, a conveyancing attorney (transferring attorney) prepares documents, liaises with the bank and SARS, and lodges the transfer at the deeds office. Their fee compensates this work.",
      "Fees scale with property value — higher purchase prices attract higher conveyancing fees. You may also pay deeds office registration fees, postage, and petty charges.",
      "If you take a bond, a separate bond registration attorney registers the mortgage. Bond registration fees are an additional cost.",
    ],
    thingsToKnow: [
      "Conveyancing fees follow Law Society tariff guidelines.",
      "VAT at 15% applies to attorney fees.",
      "Bond registration uses a separate attorney and fee.",
      "Budget 1–2% of purchase price for total transfer costs beyond duty.",
    ],
    commonMistakes: [
      "Thinking conveyancing fees include transfer duty — they are separate.",
      "Not comparing the bond registration attorney's fees with transfer costs.",
    ],
    relatedCalculators: ["deposit-calculator", "transfer-duty-calculator"],
    relatedGuides: ["first-time-home-buyer-guide-south-africa"],
    relatedAnswers: ["what-upfront-costs-buying-property-south-africa", "what-is-transfer-duty-south-africa"],
    faqs: [
      {
        question: "Can I choose my own conveyancer?",
        answer:
          "The seller typically appoints the transferring attorney, but you can negotiate this in the offer to purchase. The bond registration attorney is usually nominated by your bank.",
      },
    ],
    officialSources: [
      {
        name: "Legal Practice Council",
        url: "https://lpc.org.za/",
        description: "Regulator for legal practitioners including conveyancers.",
      },
    ],
    keywords: ["conveyancing fees", "transfer costs", "attorney fees"],
  }),
  withAnswerDefaults({
    slug: "what-is-an-offer-to-purchase-south-africa",
    title: "What is an offer to purchase (OTP) in South Africa?",
    description:
      "An offer to purchase is a written contract in which a buyer proposes terms to buy a property. Once signed by both parties, it becomes legally binding.",
    pillar: "buying-property",
    subtopic: "offer-to-purchase",
    shortAnswer:
      "An offer to purchase (OTP) is a written agreement in which a buyer proposes to buy a property at a stated price and on specific conditions. Once the seller accepts and both parties sign, it becomes a binding contract. Standard OTPs include the price, deposit, bond clause, inspection conditions, and transfer date. Always read suspensive conditions carefully before signing.",
    detailedExplanation: [
      "The OTP sets out the commercial terms of the sale: purchase price, deposit amount, date of occupation, and conditions that must be met before the sale proceeds (suspensive conditions).",
      "Common suspensive conditions include bond approval within a set period and a satisfactory home inspection. If the condition is not met, the contract may lapse without penalty — depending on how the OTP is drafted.",
      "Estate agents typically provide a standard OTP template, but you can request amendments. Have an attorney review complex clauses before signing.",
    ],
    thingsToKnow: [
      "A signed OTP is legally binding — not just an informal offer.",
      "Bond approval clauses protect buyers who cannot secure finance.",
      "Occupation date and who pays occupational rent should be specified.",
      "Fixtures and appliances included in the sale should be listed.",
    ],
    commonMistakes: [
      "Signing without a bond approval suspensive condition.",
      "Not specifying what happens if the sale falls through.",
      "Verbal agreements that contradict the written OTP.",
    ],
    relatedCalculators: ["property-offer-calculator", "deposit-calculator"],
    relatedGuides: ["first-time-home-buyer-guide-south-africa"],
    relatedAnswers: ["how-long-does-property-transfer-take-south-africa", "what-upfront-costs-buying-property-south-africa"],
    faqs: [
      {
        question: "Can I withdraw after signing an OTP?",
        answer:
          "Only if a suspensive condition has not been fulfilled or if both parties agree to cancel. Otherwise, withdrawing may have legal and financial consequences.",
      },
    ],
    officialSources: [
      {
        name: "Property Practitioners Regulatory Authority",
        url: "https://www.ppra.org.za/",
        description: "Regulator for estate agents and property practitioners.",
      },
    ],
    keywords: ["offer to purchase", "OTP", "property contract", "suspensive conditions"],
  }),
  withAnswerDefaults({
    slug: "how-long-does-property-transfer-take-south-africa",
    title: "How long does property transfer take in South Africa?",
    description:
      "Property transfer typically takes 8–12 weeks from signed offer to registration, depending on bond approval, FICA, and deeds office queues.",
    pillar: "buying-property",
    subtopic: "transfer-process",
    shortAnswer:
      "Property transfer in South Africa typically takes 8–12 weeks from a signed offer to purchase until registration in the buyer's name. Timelines depend on bond approval, FICA compliance, rates clearance, and deeds office processing. Cash purchases without bonds may complete faster. Delays often occur waiting for bank guarantees, municipal rates clearance, or transfer duty payment.",
    detailedExplanation: [
      "After the OTP is signed, the buyer applies for a bond while the conveyancer opens a transfer file. Both the bond registration and transfer must be lodged at the deeds office — often simultaneously.",
      "The municipality issues a rates clearance certificate confirming rates are paid up to date. Without it, transfer cannot proceed. SARS transfer duty must also be paid before lodgement.",
      "Deeds office turnaround varies by region and workload. Cape Town, Johannesburg, and Durban may differ. Your conveyancer provides progress updates at each stage.",
    ],
    thingsToKnow: [
      "Bond approval can take 1–3 weeks after a complete application.",
      "Rates clearance requires the seller's account to be settled.",
      "Simultaneous lodgement of bond and transfer is standard practice.",
      "Occupation may occur before registration — check your OTP terms.",
    ],
    commonMistakes: [
      "Expecting transfer within a few weeks without accounting for bond approval.",
      "Not providing FICA documents promptly to the attorney.",
      "Planning exact move dates before registration is confirmed.",
    ],
    relatedCalculators: ["deposit-calculator"],
    relatedGuides: ["first-time-home-buyer-guide-south-africa"],
    relatedAnswers: ["what-is-an-offer-to-purchase-south-africa", "what-is-rates-clearance-certificate"],
    faqs: [],
    officialSources: [
      {
        name: "Deeds Registries — Department of Land Reform",
        url: "https://www.dalrrd.gov.za/",
        description: "National deeds registration information.",
      },
    ],
    keywords: ["property transfer timeline", "deeds office", "registration"],
  }),
  withAnswerDefaults({
    slug: "transfer-duty-vs-vat-on-property-south-africa",
    title: "What is the difference between transfer duty and VAT on property?",
    description:
      "Transfer duty applies to most resale property. VAT at 15% applies when buying a new property from a VAT-registered developer — not both.",
    pillar: "buying-property",
    subtopic: "transfer-duty",
    secondaryPillars: ["property-finance"],
    shortAnswer:
      "Transfer duty is a SARS tax on secondary-market property sales between private parties. VAT at 15% applies when you buy a new property from a VAT-registered developer, seller, or builder — in that case, no transfer duty is charged. You pay one or the other, not both. Resale homes from private sellers attract transfer duty; new sectional title units from developers typically include VAT in the price.",
    detailedExplanation: [
      "The distinction matters for budgeting. VAT is calculated at 15% of the price (often included in the advertised price for new developments). Transfer duty follows progressive brackets and may be lower than 15% on moderate-priced resale homes.",
      "If a seller is registered for VAT and sells the property as part of their enterprise, VAT may apply even on resale in certain commercial contexts. Residential resales between individuals typically attract transfer duty.",
      "Your offer to purchase should state whether the price is inclusive or exclusive of VAT where applicable.",
    ],
    thingsToKnow: [
      "New builds from developers: usually VAT, not transfer duty.",
      "Private resale: usually transfer duty, not VAT.",
      "Never pay both transfer duty and VAT on the same transaction.",
    ],
    commonMistakes: [
      "Assuming all property purchases include VAT like retail goods.",
      "Not confirming with the seller whether they are VAT registered.",
    ],
    relatedCalculators: ["transfer-duty-calculator", "vat-calculator"],
    relatedGuides: ["transfer-duty-calculator-south-africa-2025"],
    relatedAnswers: ["what-is-transfer-duty-south-africa", "who-pays-transfer-duty-south-africa"],
    faqs: [],
    officialSources: [
      { name: "SARS — Transfer duty", url: "https://www.sars.gov.za/types-of-tax/transfer-duty/" },
      { name: "SARS — VAT", url: "https://www.sars.gov.za/types-of-tax/value-added-tax/" },
    ],
    keywords: ["transfer duty vs VAT", "new property", "developer sale"],
  }),
  withAnswerDefaults({
    slug: "what-is-rates-clearance-certificate",
    title: "What is a rates clearance certificate?",
    description:
      "A rates clearance certificate confirms municipal rates and taxes are paid before property transfer can be registered.",
    pillar: "buying-property",
    subtopic: "transfer-process",
    shortAnswer:
      "A rates clearance certificate is issued by the municipality confirming that property rates and taxes are paid up to a future date — typically several months after transfer. The conveyancer requests it before lodging transfer at the deeds office. Without a valid certificate, the property cannot be registered in the buyer's name. The seller usually settles outstanding rates as part of the transfer process.",
    detailedExplanation: [
      "Municipal rates fund local services and infrastructure. When property changes ownership, the deeds office requires proof that rates won't be in arrears at registration.",
      "The conveyancer applies to the municipality with the transfer details. The municipality calculates amounts due — including advance payments for months ahead — and issues the certificate once paid.",
      "Sectional title properties also require levy clearance from the body corporate, separate from municipal rates clearance.",
    ],
    thingsToKnow: [
      "Required before deeds office registration.",
      "Seller typically pays outstanding and advance rates.",
      "Body corporate levy clearance is separate for sectional title.",
      "Processing time varies by municipality.",
    ],
    commonMistakes: [
      "Confusing rates clearance with a municipal rates account estimate.",
      "Not budgeting for advance rates the seller may recover from proceeds.",
    ],
    relatedCalculators: ["monthly-home-ownership-cost-calculator"],
    relatedGuides: ["first-time-home-buyer-guide-south-africa"],
    relatedAnswers: ["how-long-does-property-transfer-take-south-africa"],
    faqs: [],
    officialSources: [
      {
        name: "South African Local Government Association",
        url: "https://salga.org.za/",
        description: "Municipal governance and services overview.",
      },
    ],
    keywords: ["rates clearance", "municipal rates", "property transfer"],
  }),
  withAnswerDefaults({
    slug: "what-upfront-costs-buying-property-south-africa",
    title: "What upfront costs are involved when buying property in South Africa?",
    description:
      "Upfront costs include deposit, transfer duty, conveyancing fees, bond registration, and moving expenses — typically 8–12% beyond the purchase price.",
    pillar: "buying-property",
    subtopic: "deposits",
    secondaryPillars: ["property-finance"],
    shortAnswer:
      "Upfront costs when buying property in South Africa typically include your deposit (often 10–20%), transfer duty, conveyancing and bond registration attorney fees, deeds office fees, and moving expenses. Total cash required is often 8–12% of the purchase price on top of the deposit. Transfer duty and attorney fees cannot be added to the home loan and must be paid in cash.",
    detailedExplanation: [
      "The largest upfront item is usually the deposit, followed by transfer duty on resale properties. Conveyancing fees and bond registration costs add another 1–2% of the purchase price.",
      "Smaller items include home inspection fees, insurance premiums required by the bank, and utility deposits. First-time buyers sometimes underestimate moving and furnishing costs.",
      "Use a deposit calculator to model deposit plus transfer duty plus transfer costs as a single upfront figure before making an offer.",
    ],
    thingsToKnow: [
      "Transfer duty and attorney fees are cash costs — not bondable.",
      "Budget 8–12% of price for costs beyond the deposit.",
      "100% bond applicants still need cash for transfer costs.",
      "Pre-approval helps clarify what the bank will finance.",
    ],
    commonMistakes: [
      "Equating the deposit with total upfront cash needed.",
      "Forgetting bond initiation and monthly service fees.",
      "Not reserving emergency funds after moving in.",
    ],
    relatedCalculators: ["deposit-calculator", "transfer-duty-calculator", "property-offer-calculator"],
    relatedGuides: ["first-time-home-buyer-guide-south-africa", "transfer-duty-calculator-south-africa-2025"],
    relatedAnswers: [
      "how-much-deposit-to-buy-house-south-africa",
      "what-is-transfer-duty-south-africa",
      "what-are-conveyancing-fees-south-africa",
    ],
    relatedAreas: ["cape-town", "johannesburg"],
    faqs: [],
    officialSources: [
      { name: "SARS — Transfer duty", url: "https://www.sars.gov.za/types-of-tax/transfer-duty/" },
    ],
    keywords: ["upfront costs", "transfer costs", "buying property costs"],
  }),
  withAnswerDefaults({
    slug: "can-i-buy-house-with-no-deposit-south-africa",
    title: "Can I buy a house with no deposit in South Africa?",
    description:
      "100% bonds are available to qualifying buyers, especially first-time purchasers with strong credit — but transfer costs still require cash.",
    pillar: "buying-property",
    subtopic: "deposits",
    secondaryPillars: ["property-finance"],
    shortAnswer:
      "Yes — some South African banks offer 100% bonds with no deposit to qualifying buyers, particularly first-time homeowners with stable income and good credit. Approval is not guaranteed and interest rates may be less favourable than with a deposit. Even with a 100% bond, you still need cash for transfer duty, conveyancing fees, and bond registration — typically tens of thousands of rands.",
    detailedExplanation: [
      "A 100% bond means the bank finances the full purchase price. Banks limit exposure on high loan-to-value loans, so they apply stricter affordability and credit checks.",
      "Government and bank programmes occasionally promote deposit assistance or FLISP subsidies for qualifying first-time buyers — check current programmes with your bank or a bond originator.",
      "Saving even a small deposit improves your negotiating position on interest rates and reduces total interest over the loan term.",
    ],
    thingsToKnow: [
      "100% bonds require strong affordability and credit scores.",
      "Transfer costs remain payable in cash regardless of deposit.",
      "FLISP may assist qualifying first-time buyers — verify eligibility.",
      "A deposit often secures a better interest rate.",
    ],
    commonMistakes: [
      "Assuming 100% bond approval is automatic for first-time buyers.",
      "Having no savings for transfer duty and attorney fees.",
    ],
    relatedCalculators: ["affordability-calculator", "deposit-calculator"],
    relatedGuides: ["how-much-house-can-i-afford-south-africa", "first-time-home-buyer-guide-south-africa"],
    relatedAnswers: ["how-much-deposit-to-buy-house-south-africa", "what-upfront-costs-buying-property-south-africa"],
    faqs: [
      {
        question: "What is FLISP?",
        answer:
          "The Finance Linked Individual Subsidy Programme provides a once-off subsidy to qualifying first-time buyers earning below certain income thresholds. Check the latest criteria with the Department of Human Settlements.",
      },
    ],
    officialSources: [
      { name: "National Housing Finance Corporation", url: "https://www.nhfc.co.za/" },
    ],
    keywords: ["100% bond", "no deposit", "first-time buyer", "FLISP"],
  }),
];
