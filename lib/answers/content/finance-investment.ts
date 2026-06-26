import { withAnswerDefaults } from "../defaults";
import type { AnswerArticle } from "../types";

export const financeAndInvestmentAnswers: AnswerArticle[] = [
  withAnswerDefaults({
    slug: "what-is-a-home-loan-bond-south-africa",
    title: "What is a home loan bond in South Africa?",
    description:
      "A home loan bond is a mortgage registered over property as security for the loan. Monthly repayments cover interest and capital over the loan term.",
    pillar: "property-finance",
    subtopic: "bonds",
    shortAnswer:
      "A home loan bond (mortgage) is a loan from a bank secured by the property you are buying. The bond is registered at the deeds office, giving the bank a legal claim if you default. You repay the loan in monthly instalments over a fixed term — usually 20 or 30 years — at an interest rate linked to the prime lending rate plus or minus a margin.",
    detailedExplanation: [
      "When your bond is approved, a bond registration attorney registers the mortgage against the property title. You become the owner, but the bank holds security until the loan is fully repaid.",
      "Each monthly payment covers interest on the outstanding balance plus a portion of capital. Early in the term, most of the payment is interest; over time, more goes toward reducing the capital.",
      "Banks may require life insurance, building insurance, and debit order repayment as conditions of the bond.",
    ],
    thingsToKnow: [
      "Bonds are typically linked to prime plus or minus a margin.",
      "Standard terms are 20 or 30 years.",
      "Extra payments reduce capital and save interest.",
      "Bond registration is a separate legal process from transfer.",
    ],
    commonMistakes: [
      "Confusing bond approval with final registration — both steps are required.",
      "Not comparing interest rate margins between banks.",
    ],
    relatedCalculators: ["bond-calculator", "affordability-calculator"],
    relatedGuides: ["bond-calculator-south-africa-2025", "how-much-house-can-i-afford-south-africa"],
    relatedAnswers: [
      "how-is-bond-interest-calculated-south-africa",
      "how-much-bond-can-i-afford-south-africa",
      "what-is-prime-lending-rate-south-africa",
    ],
    faqs: [],
    officialSources: [
      { name: "South African Reserve Bank", url: "https://www.resbank.co.za/" },
    ],
    keywords: ["home loan", "bond", "mortgage", "South Africa"],
  }),
  withAnswerDefaults({
    slug: "how-much-bond-can-i-afford-south-africa",
    title: "How much bond can I afford in South Africa?",
    description:
      "Banks typically cap bond repayments at roughly 30% of gross income minus existing debt. Use affordability tools for an indicative maximum.",
    pillar: "property-finance",
    subtopic: "affordability",
    shortAnswer:
      "South African banks generally limit bond repayments to about 30% of gross monthly income, after deducting existing debt obligations. Your maximum bond depends on income, credit score, interest rate, loan term, and deposit. A R45,000 gross income with R3,500 existing debt might support roughly R900,000–R1,000,000 in property at typical rates — but pre-approval from your bank is the definitive answer.",
    detailedExplanation: [
      "Affordability assessments include gross income, net disposable income, existing credit commitments, and a stress test at higher interest rates. Banks apply the National Credit Act affordability rules.",
      "Your deposit increases the purchase price you can afford at the same bond repayment, because the loan amount is smaller. A 10% deposit on a R2 million home requires a R1.8 million bond.",
      "Bond originators can submit applications to multiple banks to find the best approval amount and rate.",
    ],
    thingsToKnow: [
      "30% of gross income is a common bond repayment guideline.",
      "Existing car loans and credit cards reduce capacity.",
      "Pre-approval clarifies your maximum before house hunting.",
      "Joint applications combine both applicants' income and debt.",
    ],
    commonMistakes: [
      "Using net income when banks assess on gross income.",
      "Forgetting to include all monthly debt obligations.",
      "Maxing out affordability without budgeting for rates and levies.",
    ],
    relatedCalculators: ["affordability-calculator", "bond-calculator", "monthly-home-ownership-cost-calculator"],
    relatedGuides: ["how-much-house-can-i-afford-south-africa"],
    relatedAnswers: ["what-is-a-home-loan-bond-south-africa", "what-are-monthly-home-ownership-costs"],
    faqs: [],
    officialSources: [
      { name: "National Credit Regulator", url: "https://www.ncr.org.za/" },
    ],
    keywords: ["affordability", "bond qualification", "how much can I borrow"],
  }),
  withAnswerDefaults({
    slug: "what-is-prime-lending-rate-south-africa",
    title: "What is the prime lending rate in South Africa?",
    description:
      "The prime rate is the benchmark commercial banks use to price home loans, typically set as the repo rate plus a fixed margin.",
    pillar: "property-finance",
    subtopic: "bonds",
    secondaryPillars: ["property-data"],
    shortAnswer:
      "The prime lending rate is the benchmark interest rate South African commercial banks use to price loans to their best customers. Home loan rates are usually quoted as prime plus or minus a margin (e.g. prime minus 0.5% or prime plus 1%). The prime rate moves when the South African Reserve Bank changes the repo rate at Monetary Policy Committee meetings.",
    detailedExplanation: [
      "When the Reserve Bank raises the repo rate to control inflation, banks typically increase prime, and your bond repayment rises if your rate is linked to prime. Fixed-rate bonds are uncommon in South Africa — most home loans are variable.",
      "Your personal margin depends on credit risk, loan-to-value ratio, and bank pricing. Strong applicants with large deposits may qualify for below-prime pricing.",
      "Always confirm whether your quoted rate is linked to prime and what margin applies over the life of the loan.",
    ],
    thingsToKnow: [
      "Prime follows SARB repo rate decisions.",
      "Home loans are typically prime ± a margin.",
      "Rate hikes increase monthly repayments on variable bonds.",
      "Check your margin at approval — it affects total cost.",
    ],
    commonMistakes: [
      "Assuming your rate is fixed when it is linked to prime.",
      "Not budgeting for rate increases when buying at the affordability limit.",
    ],
    relatedCalculators: ["bond-calculator", "affordability-calculator"],
    relatedGuides: ["bond-calculator-south-africa-2025"],
    relatedAnswers: ["how-is-bond-interest-calculated-south-africa", "what-is-a-home-loan-bond-south-africa"],
    faqs: [],
    officialSources: [
      {
        name: "South African Reserve Bank — Key rates",
        url: "https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/selected-historical-rates",
      },
    ],
    keywords: ["prime rate", "repo rate", "interest rates", "SARB"],
  }),
  withAnswerDefaults({
    slug: "how-is-bond-interest-calculated-south-africa",
    title: "How is bond interest calculated in South Africa?",
    description:
      "Home loan interest uses monthly compounding on the reducing balance. The standard amortization formula determines your monthly repayment.",
    pillar: "property-finance",
    subtopic: "bonds",
    shortAnswer:
      "South African home loan interest is calculated monthly on the outstanding balance using compound interest. Your annual rate is divided by 12 to get the monthly rate, then applied in a standard amortization formula that spreads repayment over the loan term. Each payment covers interest first, then capital reduction. Extra payments go directly to capital and reduce total interest paid.",
    detailedExplanation: [
      "The formula Payment = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1] determines your instalment, where P is the loan amount, r is the monthly rate, and n is the number of months.",
      "On a R1.8 million bond at 11% over 20 years, the monthly payment is roughly R18,700 — but total interest over the term exceeds R2.6 million, illustrating why rate and term matter.",
      "Banks may calculate interest daily and capitalize monthly. Small differences between banks are normal; compare total cost over the term.",
    ],
    thingsToKnow: [
      "Interest is charged on the reducing balance each month.",
      "Longer terms mean lower instalments but more total interest.",
      "Additional payments save interest by reducing capital faster.",
      "Rates are quoted annually but applied monthly.",
    ],
    commonMistakes: [
      "Multiplying the annual rate by the loan amount for a monthly payment estimate — use amortization.",
      "Choosing the longest term without considering total interest cost.",
    ],
    relatedCalculators: ["bond-calculator"],
    relatedGuides: ["bond-calculator-south-africa-2025"],
    relatedAnswers: ["what-is-a-home-loan-bond-south-africa", "what-is-prime-lending-rate-south-africa"],
    faqs: [],
    officialSources: [
      { name: "National Credit Regulator", url: "https://www.ncr.org.za/" },
    ],
    keywords: ["bond interest", "amortization", "home loan calculation"],
  }),
  withAnswerDefaults({
    slug: "what-are-monthly-home-ownership-costs",
    title: "What costs are included in monthly home ownership?",
    description:
      "Monthly ownership includes bond repayment plus municipal rates, levies, insurance, and maintenance — not just the bond instalment.",
    pillar: "property-finance",
    subtopic: "property",
    shortAnswer:
      "Monthly home ownership costs include your bond repayment plus municipal rates, body corporate levies (if applicable), building insurance, and maintenance. Many buyers budget only for the bond and underestimate total carrying costs by 20–40%. A common maintenance allowance is 1–2% of property value per year. Sectional title owners pay levies; freehold owners pay rates directly to the municipality.",
    detailedExplanation: [
      "The bond instalment is usually the largest component, but rates, levies, and insurance add materially — especially in sectional title schemes with high levies.",
      "Banks require building insurance on bonded properties. Life insurance on the bond may also be mandatory. These are separate from home contents cover.",
      "Budgeting maintenance prevents surprise repair costs. Older properties and those with pools or gardens may need higher allowances.",
    ],
    thingsToKnow: [
      "Bond + rates + levies + insurance + maintenance = true monthly cost.",
      "Levies apply to sectional title; enter zero for freehold with no estate levy.",
      "Rates vary by municipality and property value.",
      "Maintenance is often budgeted at 1–2% of value annually.",
    ],
    commonMistakes: [
      "Comparing rent only to bond repayment, ignoring carrying costs.",
      "Not checking levy increases in sectional title complexes.",
    ],
    relatedCalculators: ["monthly-home-ownership-cost-calculator", "bond-calculator"],
    relatedGuides: ["how-much-house-can-i-afford-south-africa"],
    relatedAnswers: ["how-much-bond-can-i-afford-south-africa", "what-is-a-home-loan-bond-south-africa"],
    faqs: [],
    officialSources: [],
    keywords: ["monthly ownership cost", "rates and levies", "property carrying costs"],
  }),
  withAnswerDefaults({
    slug: "what-is-loan-to-value-ratio-south-africa",
    title: "What is loan-to-value (LTV) ratio in South Africa?",
    description:
      "LTV is the bond amount divided by property value. A R1.8m loan on a R2m home is 90% LTV. Lower LTV means less risk for the bank.",
    pillar: "property-finance",
    subtopic: "bonds",
    shortAnswer:
      "Loan-to-value (LTV) ratio is the bond amount divided by the property value, expressed as a percentage. A R1.8 million bond on a R2 million property is 90% LTV. Lower LTV means a larger deposit and less risk for the bank — often resulting in better interest rates and easier approval. Most banks prefer LTV below 90%; 100% LTV means no deposit.",
    detailedExplanation: [
      "LTV guides bank risk pricing. High LTV loans (above 90%) may attract higher margins or require mortgage insurance. Deposits directly reduce LTV.",
      "If the property is valued below the purchase price, the bank may cap the bond at a lower LTV based on the valuation — not the offer price.",
      "Refinancing or accessing equity later depends on the current LTV relative to updated property value.",
    ],
    thingsToKnow: [
      "LTV = loan amount ÷ property value × 100.",
      "100% LTV = no deposit.",
      "Bank valuations may differ from purchase price.",
      "Lower LTV often means better rates.",
    ],
    commonMistakes: [
      "Assuming the bank finances based on offer price without valuation.",
      "Not understanding that a low deposit equals high LTV and higher risk pricing.",
    ],
    relatedCalculators: ["deposit-calculator", "affordability-calculator"],
    relatedAnswers: ["how-much-deposit-to-buy-house-south-africa", "can-i-buy-house-with-no-deposit-south-africa"],
    faqs: [],
    officialSources: [],
    keywords: ["loan to value", "LTV", "deposit", "bond"],
  }),
  withAnswerDefaults({
    slug: "what-is-rental-yield-south-africa",
    title: "What is rental yield on a property?",
    description:
      "Rental yield is annual rental income as a percentage of property value. Gross yield excludes expenses; net yield deducts costs.",
    pillar: "property-investment",
    subtopic: "property",
    shortAnswer:
      "Rental yield measures the annual return from rental income relative to the property's value. Gross yield divides annual rent by property value; net yield deducts expenses like levies, rates, maintenance, and vacancy. In South Africa, gross yields of 8–12% are often targeted in strong rental markets, but net yield after expenses is the better measure of cash flow.",
    detailedExplanation: [
      "Example: R15,000 monthly rent on a R2 million property gives gross yield of (R180,000 ÷ R2,000,000) × 100 = 9%. After R3,000 monthly expenses, net yield is lower.",
      "Investors compare yield to bond interest costs. Positive cash flow means rent exceeds bond and running costs; negative cash flow requires subsidizing from other income.",
      "Yield varies by location, property type, and tenant quality. Student areas and high-demand suburbs behave differently.",
    ],
    thingsToKnow: [
      "Gross yield = annual rent ÷ property value.",
      "Net yield deducts levies, rates, maintenance, and vacancy.",
      "Compare yield to your bond rate for investment decisions.",
      "Capital growth is separate from rental yield.",
    ],
    commonMistakes: [
      "Using gross yield without accounting for expenses and vacancy.",
      "Ignoring levy increases in sectional title investments.",
    ],
    relatedCalculators: ["rental-yield-calculator", "rent-vs-buy-calculator"],
    relatedGuides: ["rent-vs-buy-south-africa-2025"],
    relatedAnswers: ["is-it-better-to-rent-or-buy-south-africa", "do-i-pay-tax-on-rental-income-south-africa"],
    faqs: [],
    officialSources: [],
    keywords: ["rental yield", "investment property", "cash flow"],
  }),
  withAnswerDefaults({
    slug: "is-it-better-to-rent-or-buy-south-africa",
    title: "Is it better to rent or buy in South Africa?",
    description:
      "It depends on how long you will stay, property prices, rent levels, interest rates, and personal flexibility needs. Neither is universally better.",
    pillar: "property-investment",
    subtopic: "rent-vs-buy",
    secondaryPillars: ["buying-property"],
    shortAnswer:
      "Neither renting nor buying is universally better in South Africa — it depends on how long you will stay, local property prices, rent levels, interest rates, and your need for flexibility. Buying builds equity but carries transfer costs, maintenance, and interest risk. Renting offers mobility and avoids large upfront costs. Transaction costs mean buying often only makes financial sense if you stay at least 5–7 years.",
    detailedExplanation: [
      "Buying involves transfer duty, attorney fees, and bond interest — significant costs that take years to offset through equity growth and rent saved. Short-term stays often favour renting.",
      "Renting avoids maintenance and rate shocks but exposes you to annual rent increases without building ownership. In high-appreciation areas, owners may benefit from capital growth.",
      "Use a rent vs buy calculator with realistic assumptions for your area, expected stay duration, and property growth rate.",
    ],
    thingsToKnow: [
      "Transfer costs favour longer ownership horizons.",
      "Rent increases over time; bonds may too if rates rise.",
      "Flexibility and job mobility favour renting.",
      "Equity and forced savings favour buying.",
    ],
    commonMistakes: [
      "Comparing rent to bond only, ignoring rates, levies, and maintenance.",
      "Assuming property always appreciates — markets vary.",
    ],
    relatedCalculators: ["rent-vs-buy-calculator", "bond-calculator", "monthly-home-ownership-cost-calculator"],
    relatedGuides: ["rent-vs-buy-south-africa-2025"],
    relatedAnswers: ["what-are-monthly-home-ownership-costs", "what-is-rental-yield-south-africa"],
    relatedAreas: ["cape-town", "johannesburg"],
    faqs: [],
    officialSources: [],
    keywords: ["rent vs buy", "property decision", "South Africa"],
  }),
  withAnswerDefaults({
    slug: "do-i-pay-tax-on-rental-income-south-africa",
    title: "Do I pay tax on rental income in South Africa?",
    description:
      "Yes — rental income is taxable. You can deduct allowable expenses to calculate net rental profit included in your income tax return.",
    pillar: "property-investment",
    subtopic: "tax",
    secondaryPillars: ["property-finance"],
    shortAnswer:
      "Yes, rental income is taxable in South Africa. You must declare gross rental income to SARS and may deduct allowable expenses — including levies, rates, insurance, maintenance, agent fees, and bond interest — to arrive at net rental profit. Net profit is added to your other income and taxed at your marginal rate. Keep records of all income and expenses.",
    detailedExplanation: [
      "Rental income is included in your annual income tax return (ITR12). Expenses must be directly related to earning rental income and supported by invoices.",
      "Capital allowances on furniture and improvements may apply in certain circumstances. Personal use of the property limits deductions proportionally.",
      "If expenses exceed income, a rental loss may offset other income subject to SARS anti-avoidance rules for 'hobby rentals'. Consult a tax practitioner for complex situations.",
    ],
    thingsToKnow: [
      "Declare all rental income to SARS.",
      "Deductible expenses reduce taxable rental profit.",
      "Bond interest on the investment property is typically deductible.",
      "Keep receipts and a rental income ledger.",
    ],
    commonMistakes: [
      "Not declaring rental income from informal or short-term rentals.",
      "Claiming non-deductible personal expenses against rental income.",
    ],
    relatedCalculators: ["rental-yield-calculator", "income-tax-calculator"],
    relatedGuides: ["rent-vs-buy-south-africa-2025"],
    relatedAnswers: ["what-is-rental-yield-south-africa", "what-is-capital-gains-tax-on-property-south-africa"],
    faqs: [],
    officialSources: [
      { name: "SARS — Rental income", url: "https://www.sars.gov.za/types-of-tax/personal-income-tax/rental-income/" },
    ],
    keywords: ["rental income tax", "SARS", "investment property tax"],
  }),
  withAnswerDefaults({
    slug: "what-is-capital-gains-tax-on-property-south-africa",
    title: "What is capital gains tax on property in South Africa?",
    description:
      "CGT applies when you sell property for more than its base cost. Primary residences get a R2 million exclusion; investors pay on taxable gain.",
    pillar: "property-investment",
    subtopic: "tax",
    secondaryPillars: ["property-finance"],
    shortAnswer:
      "Capital gains tax (CGT) in South Africa applies when you sell property for more than its base cost (purchase price plus improvements). Individuals include 40% of the gain in taxable income at their marginal rate. Primary residences qualify for a R2 million exclusion on the gain. Investment and second properties do not. CGT is not a separate tax — it is added to your income tax in the year of sale.",
    detailedExplanation: [
      "Base cost includes purchase price, transfer costs, and capital improvements — not routine maintenance. The gain is selling price minus base cost and the primary residence exclusion where applicable.",
      "For investment property, the full gain (after exclusion rules) flows into the CGT calculation. Holding period and structure (personal vs company) affect effective rates.",
      "Plan for CGT before selling — it can be a significant cash obligation in the year of disposal.",
    ],
    thingsToKnow: [
      "40% inclusion rate for individuals on taxable gain.",
      "R2 million primary residence exclusion.",
      "Investment property sales attract CGT on profit.",
      "CGT is paid via your annual income tax assessment.",
    ],
    commonMistakes: [
      "Assuming your primary home is always fully exempt — only R2m of gain is excluded.",
      "Not keeping records of improvement costs to reduce taxable gain.",
    ],
    relatedCalculators: ["capital-gains-tax-calculator"],
    relatedGuides: ["rent-vs-buy-south-africa-2025"],
    relatedAnswers: ["do-i-pay-tax-on-rental-income-south-africa", "what-is-rental-yield-south-africa"],
    faqs: [],
    officialSources: [
      { name: "SARS — Capital gains tax", url: "https://www.sars.gov.za/types-of-tax/capital-gains-tax/" },
    ],
    keywords: ["capital gains tax", "CGT", "property sale", "primary residence exclusion"],
  }),
];
