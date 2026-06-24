import type { AreaGuide } from "../types";

export const capeTownArea: AreaGuide = {
  slug: "cape-town",
  title: "Buying Property in Cape Town",
  description:
    "Guide to buying property in Cape Town — popular suburbs, indicative price ranges, and what to know about the local market.",
  city: "Cape Town",
  province: "Western Cape",
  publishedDate: "2025-06-01",
  updatedDate: "2025-06-24",
  lastReviewed: "2025-06-24",
  keywords: [
    "buying property cape town",
    "cape town property prices",
    "cape town suburbs",
    "cape town rental yield",
    "property investment cape town",
  ],
  averagePrices: [
    {
      label: "Entry-level apartment (CBD / outer suburbs)",
      range: "R850,000 – R1.4 million",
    },
    {
      label: "Mid-market family home",
      range: "R2 million – R3.5 million",
      note: "Southern suburbs, northern suburbs, Atlantic Seaboard fringe",
    },
    {
      label: "Premium apartment (Sea Point, Camps Bay)",
      range: "R3 million – R8 million+",
    },
    {
      label: "Luxury freehold (Constantia, Bishopscourt)",
      range: "R8 million – R25 million+",
    },
  ],
  popularSuburbs: [
    {
      name: "Sea Point",
      description:
        "Atlantic Seaboard apartment living with strong walkability and rental demand. Sectional title dominates; check parking, levies, and body corporate records.",
    },
    {
      name: "Claremont / Newlands",
      description:
        "Established southern suburbs near UCT and major schools. Mix of apartments and family homes with good amenities and Metrorail access.",
    },
    {
      name: "Durbanville",
      description:
        "Northern suburbs node popular with families seeking more space than the Atlantic Seaboard. Good schools and wine-route lifestyle.",
    },
    {
      name: "Century City",
      description:
        "Mixed-use canal precinct with retail, offices, and residential stock. Popular with commuters and investors seeking lock-up-and-go living.",
    },
    {
      name: "Observatory",
      description:
        "Character homes near the city bowl with a younger, creative community. Generally lower entry pricing than Sea Point or the southern suburbs premium pockets.",
    },
    {
      name: "Blouberg / Big Bay",
      description:
        "Coastal lifestyle north of the city with beach access and more accessible pricing than central Atlantic Seaboard nodes.",
    },
  ],
  prosAndCons: {
    pros: [
      "Wide range of suburbs from compact apartments to luxury estates",
      "Strong lifestyle appeal for owner-occupiers and tenants",
      "Established rental demand in central and coastal nodes",
      "Diverse property types — sectional title and freehold",
    ],
    cons: [
      "High entry prices in Atlantic Seaboard and premium school zones",
      "Rates and sectional title levies can be substantial",
      "Backup power and water resilience may require extra capital",
      "Commute times on major routes can be long at peak",
    ],
  },
  marketOverview: [
    "Cape Town is not a single market. The metro spans affordable flats in outlying areas, mid-market family homes in the southern and northern suburbs, and premium coastal stock on the Atlantic Seaboard. Buyers should choose a sub-market before searching — price, commute, schools, and property type vary sharply by suburb.",
    "Sectional title dominates the urban core — Sea Point, Green Point, the City Bowl, and Woodstock. Buyers must review levies, reserve funds, and conduct rules. Freehold homes in suburbs such as Claremont, Durbanville, and Constantia offer more space but carry higher maintenance and municipal rates.",
    "Many buyers relocating from other provinces prioritise fibre connectivity, security, and backup power. These features increasingly affect both resale appeal and total monthly cost alongside the bond instalment.",
    "Transfer duty, conveyancing fees, and bond registration are payable in cash on most purchases and cannot be added to the home loan. See our transfer duty guide for how SARS brackets apply to your price point.",
  ],
  propertyInvestment: [
    "Investors typically focus on suburbs with reliable tenant demand: Sea Point and Green Point for professionals, Claremont and Rondebosch for students and academics, Century City for corporate tenants, and Blouberg for coastal lifestyle renters.",
    "Short-term letting may suit tourist-heavy zones but is restricted in many sectional title schemes. Confirm body corporate rules in writing before buying for holiday rental. Long-term leases usually involve less management.",
    "Premium coastal stock often prioritises capital preservation over high rental yields. Buyers seeking yield sometimes look to northern suburbs or value pockets such as Observatory, where entry prices are lower relative to achievable rent — always verify net returns after costs.",
    "Off-plan purchases from VAT-registered developers follow different tax rules to secondary-market resales. Factor construction timelines, snagging, and completion risk into any investment plan.",
  ],
  rentalYield: [
    "Gross rental yield is annual rent divided by purchase price. Premium Atlantic Seaboard apartments often show lower gross percentages than northern suburbs or Blouberg, where prices may be lower relative to rent.",
    "Net yield must deduct levies, municipal rates, insurance, maintenance, vacancy, and letting fees. On sectional title, body corporate levies alone can materially reduce returns — review five years of levy statements where possible.",
    "Match property type to tenant profile: one-bedrooms suit singles and young professionals; two-bedrooms suit couples; larger homes in school zones target families on longer leases.",
    "Use current comparable rentals from listing portals when modelling yield. Our rental yield calculator can help, but inputs should reflect verified market rents — not marketing estimates.",
  ],
  faqs: [
    {
      question: "Is Cape Town a good place to buy property?",
      answer:
        "It depends on your budget, suburb, and time horizon. Cape Town offers strong lifestyle appeal but premium nodes have high entry prices. Research suburb-specific listings and model total monthly cost before buying.",
    },
    {
      question: "What is the average house price in Cape Town?",
      answer:
        "There is no single average — the metro spans a wide range. Mid-market family homes in popular suburbs often fall between roughly R2 million and R3.5 million, but verify current listings for your target area.",
    },
    {
      question: "Which Cape Town suburbs suit first-time buyers?",
      answer:
        "Observatory, parts of Goodwood, Blouberg, Kuils River, and entry apartments in Bellville and Parow are often considered more accessible. Compare security, commute, and levies for each option.",
    },
    {
      question: "What rental yield can I expect in Cape Town?",
      answer:
        "Gross yields vary by suburb and price point — premium coastal stock often yields less than northern suburbs on a percentage basis. Always model net yield after levies and running costs.",
    },
    {
      question: "Do I pay transfer duty on Cape Town property?",
      answer:
        "On most secondary-market purchases, yes. New developments sold by VAT-registered developers may charge VAT instead. See our transfer duty guide for bracket details.",
    },
    {
      question: "Should I buy sectional title or freehold?",
      answer:
        "Sectional title suits lock-up-and-go living with shared security but includes levies and conduct rules. Freehold offers more control and space but higher maintenance responsibility.",
    },
    {
      question: "What should investors check before buying?",
      answer:
        "Tenant demand in the suburb, body corporate financials, letting rules, backup power, and realistic net yield after all costs. Consider reading our bond and affordability guides to stress-test financing.",
    },
  ],
};
