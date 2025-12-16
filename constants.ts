import { FeasibilitySection } from './types';

const GENERALIZED_TEMPLATE_EN: FeasibilitySection[] = [
  {
    id: 'cover',
    title: 'Cover Page Details',
    description: 'Title, Project Owner, Address, Woreda, Phone, Project Area',
  },
  {
    id: '1',
    title: '1. Executive Summary',
    description: 'A concise overview of the entire project, including objectives, financial highlights, and key recommendations.',
  },
  {
    id: '2',
    title: '2. Introduction',
    description: 'Macro-economic context.',
    subsections: [
      { id: '2.2', title: '2.2 Economic Background', description: 'Potential of the country/region in relation to this specific investment sector.' },
      { id: '2.3', title: '2.3 Growth and Drivers', description: 'Key indicators, growth rates, and market drivers (include indicator values in table source).' },
    ]
  },
  {
    id: '3',
    title: '3. Background of Project Area',
    description: 'Contextual analysis of the project location.',
    subsections: [
      { id: '3.1', title: '3.1 Location', description: 'Specific geographical coordinates and administrative location.' },
      { id: '3.2', title: '3.2 Demographics', description: 'Human population, density, and labor availability.' },
      { id: '3.3', title: '3.3 Cultural Context', description: 'Religion, culture, and social norms affecting the business.' },
      { id: '3.4', title: '3.4 Sector-Relevant Resources', description: 'Availability of key resources (e.g., Livestock for farms, Minerals for industry, Skilled youth for tech).' },
      { id: '3.5', title: '3.5 Infrastructure', description: 'Roads, power, internet, and logistics availability.' },
      { id: '3.6', title: '3.6 Natural Resources', description: 'Climate, topography, soil, water resource, land use/cover.' },
      { id: '3.7', title: '3.7 Socio-economic Situations', description: 'Income levels, employment rates, and livelihood patterns.' },
      { id: '3.8', title: '3.8 Sustainability Assessment', description: 'Long-term viability regarding environmental and social impact.' },
      { id: '3.9', title: '3.9 Operational Risks', description: 'Specific risks (e.g., Disease for agriculture, Supply chain breakage for manufacturing, Regulatory changes).' },
      { id: '3.10', title: '3.10 SWOT Analysis', description: 'Strengths, Weaknesses, Opportunities, and Threats.' },
    ]
  },
  {
    id: '4',
    title: '4. Product/Service Description',
    description: 'Detailed explanation of what is being sold.',
    subsections: [
      { id: '4.1', title: '4.1 Primary Product/Service', description: 'Core offering description.' },
      { id: '4.2', title: '4.2 Secondary Products/By-products', description: 'Additional revenue streams or product lines. Table of general formulas or specs.' },
      { id: '4.3', title: '4.3 Project Objectives', description: 'General and Specific objectives.' },
      { id: '4.4', title: '4.4 Benefits of the Project', description: 'Value add to the economy, owner, and community.' },
    ]
  },
  {
    id: '5',
    title: '5. Market Study & Capacity',
    description: 'Analysis of supply, demand, and marketing strategy.',
    subsections: [
      { id: '5.1', title: '5.1 Market Analysis', description: 'Past supply and current demand trends.' },
      { id: '5.2', title: '5.2 Demand Projection', description: 'Future demand forecasting (Gap analysis).' },
      { id: '5.3', title: '5.3 Pricing and Distribution', description: 'Pricing strategy (include inflation considerations) and distribution channels.' },
      { id: '5.4', title: '5.4 Target Market Location', description: 'Where raw materials come from and where final products go.' },
      { id: '5.5', title: '5.5 Sector Features', description: 'Monopoly, oligopoly, free market, government regulations.' },
      { id: '5.6', title: '5.6 Beneficiaries', description: 'Who benefits from this product/service?' },
      { id: '5.7', title: '5.7 Competitor Analysis', description: 'Past and present interventions/competitors.' },
      { id: '5.8', title: '5.8 Project Justification', description: 'Why this project is needed now.' },
      { id: '5.9', title: '5.9 Strategic Support', description: 'Government or NGO support available for this sector.' },
    ]
  },
  {
    id: '6',
    title: '6. Operational Capacity & Program',
    description: 'Scale of operations.',
    subsections: [
      { id: '6.1', title: '6.1 Installed Capacity', description: 'Maximum possible output per unit of time.' },
      { id: '6.2', title: '6.2 Production/Service Program', description: 'Ramp-up schedule (Year 1: 70%, Year 2: 90%, etc.).' },
    ]
  },
  {
    id: '7',
    title: '7. Inputs and Utilities',
    description: 'Resource requirements.',
    subsections: [
      { id: '7.1', title: '7.1 Direct Inputs', description: 'Raw materials table.' },
      { id: '7.2', title: '7.2 Utilities', description: 'Water, electricity, fuel requirements and costs.' },
    ]
  },
  {
    id: '8',
    title: '8. Technology and Engineering',
    description: 'Technical requirements.',
    subsections: [
      { id: '8.1', title: '8.1 Technology Choice', description: 'Production process flow and technology selection rationale.' },
      { id: '8.2', title: '8.2 Engineering & Assets', description: 'Machinery list, land requirements, site development, civil works/renovations.' },
    ]
  },
  {
    id: '9',
    title: '9. Organization & Management',
    description: 'Human resources.',
    subsections: [
      { id: '9.1', title: '9.1 Manpower Requirement', description: 'Staffing table and labor cost estimation for 10 years.' },
      { id: '9.2', title: '9.2 Organizational Structure', description: 'Hierarchy and management charts.' },
      { id: '9.3', title: '9.3 Training Needs', description: 'Capacity building requirements.' },
      { id: '9.4', title: '9.4 Implementation Schedule', description: 'Gantt chart or timeline for project launch.' },
    ]
  },
  {
    id: '10',
    title: '10. Financial Feasibility',
    description: 'The core financial analysis.',
    subsections: [
      { id: '10.1', title: '10.1 Basic Assumptions', description: 'Project life, repair costs, depreciation methods, working capital cycles.' },
      { id: '10.2', title: '10.2 Financial Analysis Results', description: 'Total investment cost, financing scheme (Debt/Equity).' },
      { id: '10.2.3', title: '10.2.3 Revenue Projections', description: 'Projected sales.' },
      { id: '10.2.7', title: '10.2.7 Key Metrics', description: 'NPV, IRR, Benefit-Cost Ratio, Payback Period.' },
      { id: '10.2.10', title: '10.2.10 Risk Analysis', description: 'Sensitivity analysis and contingency plans.' },
      { id: '10.2.12', title: '10.2.12 Impact Assessment', description: 'Socio-economic benefits, environmental impact, gender, public health.' },
    ]
  },
  {
    id: '11',
    title: '11. Conclusion & Recommendation',
    description: 'Final verdict on feasibility.',
  },
  {
    id: 'annex',
    title: 'Annexes',
    description: 'Detailed financial tables (Cash flow, Income statement, Balance sheet, Loan schedules).',
  }
];

const GENERALIZED_TEMPLATE_AM: FeasibilitySection[] = [
  {
    id: 'cover',
    title: 'የሽፋን ገጽ ዝርዝሮች',
    description: 'ርዕስ ፣ የፕሮጀክት ባለቤት ፣ አድራሻ ፣ ወረዳ ፣ ስልክ ፣ የፕሮጀክት አካባቢ',
  },
  {
    id: '1',
    title: '1. ስራ አስፈጻሚ ማጠቃለያ (Executive Summary)',
    description: 'ዓላማዎችን ፣ ዋና ዋና የፋይናንስ ነጥቦችን እና ምክሮችን ጨምሮ የጠቅላላው ፕሮጀክት አጭር መግለጫ።',
  },
  {
    id: '2',
    title: '2. መግቢያ',
    description: 'ኢኮኖሚያዊ ዳራ።',
    subsections: [
      { id: '2.2', title: '2.2 ኢኮኖሚያዊ ዳራ', description: 'ከዚህ የተለየ የኢንቨስትመንት ዘርፍ ጋር በተያያዘ የሀገሪቱ/ክልሉ እምቅ አቅም።' },
      { id: '2.3', title: '2.3 እድገት እና አንቀሳቃሾች', description: 'ቁልፍ አመልካቾች፣ የእድገት መጠኖች እና የገበያ አንቀሳቃሾች።' },
    ]
  },
  {
    id: '3',
    title: '3. የፕሮጀክቱ አካባቢ ዳራ',
    description: 'የፕሮጀክቱ ቦታ አውድ ትንተና።',
    subsections: [
      { id: '3.1', title: '3.1 ቦታ', description: 'ልዩ መልክዓ ምድራዊ አቀማመጥ እና አስተዳደራዊ ቦታ።' },
      { id: '3.2', title: '3.2 የህዝብ ብዛት', description: 'የሰው ኃይል አቅርቦት እና የህዝብ ጥግግት።' },
      { id: '3.3', title: '3.3 ባህላዊ አውድ', description: 'ሃይማኖት ፣ ባህል እና ማህበራዊ ሁኔታዎች።' },
      { id: '3.4', title: '3.4 ለዘርፉ ጠቃሚ ግብዓቶች', description: 'ቁልፍ ግብዓቶች መገኘት (ለምሳሌ እንስሳት ለግብርና፣ ማዕድናት ለኢንዱስትሪ)።' },
      { id: '3.5', title: '3.5 መሰረተ ልማት', description: 'መንገዶች፣ ኤሌክትሪክ፣ ኢንተርኔት እና ሎጂስቲክስ።' },
      { id: '3.6', title: '3.6 የተፈጥሮ ሀብት', description: 'የአየር ሁኔታ፣ መልክዓ ምድር፣ አፈር፣ ውሃ።' },
      { id: '3.7', title: '3.7 ማህበራዊ እና ኢኮኖሚያዊ ሁኔታዎች', description: 'የገቢ ደረጃዎች፣ የስራ ስምሪት እና የአኗኗር ዘይቤ።' },
      { id: '3.8', title: '3.8 ዘላቂነት ግምገማ', description: 'የአካባቢ እና ማህበራዊ ተፅእኖን በተመለከተ የረጅም ጊዜ አዋጭነት።' },
      { id: '3.9', title: '3.9 የአሠራር አደጋዎች', description: 'ልዩ አደጋዎች (ለምሳሌ በሽታ ለግብርና)።' },
      { id: '3.10', title: '3.10 SWOT ትንተና', description: 'ጥንካሬዎች፣ ድክመቶች፣ እድሎች እና ስጋቶች።' },
    ]
  },
  {
    id: '4',
    title: '4. ምርት / አገልግሎት መግለጫ',
    description: 'ስለሚሸጠው ምርት ዝርዝር ማብራሪያ።',
    subsections: [
      { id: '4.1', title: '4.1 ዋና ምርት/አገልግሎት', description: 'ዋናው የአገልግሎት ወይም ምርት መግለጫ።' },
      { id: '4.2', title: '4.2 ሁለተኛ ደረጃ ምርቶች', description: 'ተጨማሪ የገቢ ምንጮች።' },
      { id: '4.3', title: '4.3 የፕሮጀክት ዓላማዎች', description: 'አጠቃላይ እና ዝርዝር ዓላማዎች።' },
      { id: '4.4', title: '4.4 የፕሮጀክቱ ጥቅሞች', description: 'ለኢኮኖሚው፣ ለባለቤቱ እና ለማህበረሰቡ የሚሰጠው እሴት።' },
    ]
  },
  {
    id: '5',
    title: '5. የገበያ ጥናት እና አቅም',
    description: 'አቅርቦት፣ ፍላጎት እና የገበያ ስትራቴጂ ትንተና።',
    subsections: [
      { id: '5.1', title: '5.1 የገበያ ትንተና', description: 'ያለፈው አቅርቦት እና የአሁን ፍላጎት።' },
      { id: '5.2', title: '5.2 የፍላጎት ትንበያ', description: 'የወደፊት ፍላጎት ትንበያ።' },
      { id: '5.3', title: '5.3 ዋጋ እና ስርጭት', description: 'የዋጋ አወጣጥ ስትራቴጂ እና ስርጭት።' },
      { id: '5.4', title: '5.4 የገበያ ቦታ', description: 'ጥሬ ዕቃዎች ከየት ይመጣሉ እና ምርቶች ወዴት ይሄዳሉ።' },
      { id: '5.5', title: '5.5 የዘርፉ ባህሪያት', description: 'የመንግስት ደንቦች እና የገበያ ሁኔታ።' },
      { id: '5.6', title: '5.6 ተጠቃሚዎች', description: 'ከዚህ ምርት/አገልግሎት ተጠቃሚ የሚሆኑት እነማን ናቸው?' },
      { id: '5.7', title: '5.7 የተፎካካሪዎች ትንተና', description: 'ተወዳዳሪዎች።' },
      { id: '5.8', title: '5.8 የፕሮጀክት ማረጋገጫ', description: 'ይህ ፕሮጀክት ለምን አስፈለገ?' },
      { id: '5.9', title: '5.9 ስትራቴጂካዊ ድጋፍ', description: 'ለዚህ ዘርፍ የመንግስት ወይም መንግስታዊ ያልሆኑ ድርጅቶች ድጋፍ።' },
    ]
  },
  {
    id: '6',
    title: '6. የማምረት አቅም እና ፕሮግራም',
    description: 'የአሠራር መጠን።',
    subsections: [
      { id: '6.1', title: '6.1 የተተከለ አቅም', description: 'ከፍተኛው የማምረት አቅም።' },
      { id: '6.2', title: '6.2 የምርት ፕሮግራም', description: 'በየዓመቱ የታቀደ ምርት።' },
    ]
  },
  {
    id: '7',
    title: '7. ግብዓቶች እና መገልገያዎች',
    description: 'የግብዓት ፍላጎቶች።',
    subsections: [
      { id: '7.1', title: '7.1 ቀጥተኛ ግብዓቶች', description: 'ጥሬ ዕቃዎች።' },
      { id: '7.2', title: '7.2 መገልገያዎች', description: 'ውሃ፣ ኤሌክትሪክ፣ ነዳጅ።' },
    ]
  },
  {
    id: '8',
    title: '8. ቴክኖሎጂ እና ምህንድስና',
    description: 'ቴክኒካዊ መስፈርቶች።',
    subsections: [
      { id: '8.1', title: '8.1 የቴክኖሎጂ ምርጫ', description: 'የምርት ሂደት እና ቴክኖሎጂ።' },
      { id: '8.2', title: '8.2 ምህንድስና እና ንብረቶች', description: 'ማሽነሪዎች፣ መሬት፣ የግንባታ ስራዎች።' },
    ]
  },
  {
    id: '9',
    title: '9. ድርጅት እና አስተዳደር',
    description: 'የሰው ኃይል እና መዋቅር።',
    subsections: [
      { id: '9.1', title: '9.1 የሰው ኃይል ፍላጎት', description: 'የሠራተኞች ዝርዝር እና ወጪ።' },
      { id: '9.2', title: '9.2 የድርጅት መዋቅር', description: 'አስተዳደራዊ መዋቅር።' },
      { id: '9.3', title: '9.3 ስልጠና', description: 'የስልጠና ፍላጎቶች።' },
      { id: '9.4', title: '9.4 የትግበራ መርሃ ግብር', description: 'ፕሮጀክቱን ለመጀመር የጊዜ ሰሌዳ።' },
    ]
  },
  {
    id: '10',
    title: '10. የፋይናንስ አዋጭነት',
    description: 'የፋይናንስ ትንተና።',
    subsections: [
      { id: '10.1', title: '10.1 መሰረታዊ ግምቶች', description: 'የፕሮጀክት ህይወት፣ ጥገና ወጪ፣ ወዘተ።' },
      { id: '10.2', title: '10.2 የፋይናንስ ትንተና ውጤቶች', description: 'ጠቅላላ የኢንቨስትመንት ወጪ።' },
      { id: '10.2.3', title: '10.2.3 የገቢ ትንበያ', description: 'የታቀደ ሽያጭ።' },
      { id: '10.2.7', title: '10.2.7 ቁልፍ መለኪያዎች', description: 'NPV, IRR, ወጪ እና ገቢ ጥምርታ።' },
      { id: '10.2.10', title: '10.2.10 የአደጋ ትንተና', description: 'ስጋቶች እና መፍትሄዎች።' },
      { id: '10.2.12', title: '10.2.12 ተፅእኖ ግምገማ', description: 'ማህበራዊ እና ኢኮኖሚያዊ ጥቅሞች።' },
    ]
  },
  {
    id: '11',
    title: '11. ማጠቃለያ እና ምክር',
    description: 'የመጨረሻ ውሳኔ።',
  },
  {
    id: 'annex',
    title: 'አባሪዎች',
    description: 'ዝርዝር የፋይናንስ ሰንጠረዦች።',
  }
];

const BUSINESS_PLAN_TEMPLATE_EN: FeasibilitySection[] = [
  { 
    id: 'bp_title', 
    title: 'Title Page & Table of Contents', 
    description: 'Business Name, Date, Contact Info, and structure of the document.' 
  },
  { 
    id: 'bp_exec', 
    title: 'Executive Summary', 
    description: 'A concise overview of your entire plan, mission, products, goals, and financial highlights.' 
  },
  { 
    id: 'bp_company', 
    title: 'Company Description', 
    description: 'Details about your business, its structure, history, and mission/vision.' 
  },
  { 
    id: 'bp_products', 
    title: 'Products & Services', 
    description: 'What you sell, the problem it solves, and your unique selling proposition.' 
  },
  { 
    id: 'bp_market', 
    title: 'Market Analysis', 
    description: 'Industry overview, target market, and customer needs.' 
  },
  { 
    id: 'bp_comp', 
    title: 'Competitive Analysis', 
    description: 'Who your competitors are and your competitive advantages.' 
  },
  { 
    id: 'bp_marketing', 
    title: 'Marketing & Sales Strategy', 
    description: "How you'll attract and retain customers." 
  },
  { 
    id: 'bp_ops', 
    title: 'Operations Plan', 
    description: 'Day-to-day activities, facilities, and logistics.' 
  },
  { 
    id: 'bp_team', 
    title: 'Management Team', 
    description: 'Who runs the business and their expertise.' 
  },
  { 
    id: 'bp_fin', 
    title: 'Financial Plan', 
    description: 'Funding needs, projections (P&L, Cash Flow, Balance Sheet).' 
  },
  { 
    id: 'bp_appendix', 
    title: 'Appendix', 
    description: 'Supporting documents (resumes, permits, market data, etc.).' 
  },
];

const BUSINESS_PLAN_TEMPLATE_AM: FeasibilitySection[] = [
  { 
    id: 'bp_title', 
    title: 'የሽፋን ገጽ እና ማውጫ', 
    description: 'የንግድ ስም ፣ ቀን ፣ አድራሻ እና የሰነዱ አወቃቀር።' 
  },
  { 
    id: 'bp_exec', 
    title: 'ስራ አስፈጻሚ ማጠቃለያ', 
    description: 'የጠቅላላው እቅድ አጭር መግለጫ ፣ ተልዕኮ ፣ ምርቶች ፣ ግቦች እና የፋይናንስ ዋና ዋና ነጥቦች።' 
  },
  { 
    id: 'bp_company', 
    title: 'የኩባንያ መግለጫ', 
    description: 'ስለ ንግድዎ ፣ አወቃቀሩ ፣ ታሪክ እና ተልዕኮ/ራዕይ ዝርዝሮች።' 
  },
  { 
    id: 'bp_products', 
    title: 'ምርቶች እና አገልግሎቶች', 
    description: 'የሚሸጡት ፣ የሚፈታው ችግር እና የእርስዎ ልዩ የመሸጫ ነጥብ።' 
  },
  { 
    id: 'bp_market', 
    title: 'የገበያ ትንተና', 
    description: 'የኢንዱስትሪ አጠቃላይ እይታ ፣ ኢላማ ገበያ እና የደንበኛ ፍላጎቶች።' 
  },
  { 
    id: 'bp_comp', 
    title: 'የተወዳዳሪዎች ትንተና', 
    description: 'ተወዳዳሪዎችዎ እነማን ናቸው እና የእርስዎ ተወዳዳሪ ጥቅሞች።' 
  },
  { 
    id: 'bp_marketing', 
    title: 'የግብይት እና ሽያጭ ስትራቴጂ', 
    description: 'ደንበኞችን እንዴት እንደሚስቡ እና እንደሚያቆዩ።' 
  },
  { 
    id: 'bp_ops', 
    title: 'የአሠራር እቅድ', 
    description: 'የእለት ተእለት እንቅስቃሴዎች ፣ መገልገያዎች እና ሎጂስቲክስ።' 
  },
  { 
    id: 'bp_team', 
    title: 'የአስተዳደር ቡድን', 
    description: 'ንግዱን የሚመራው ማን ነው እና የእነሱ ልምድ።' 
  },
  { 
    id: 'bp_fin', 
    title: 'የፋይናንስ እቅድ', 
    description: 'የገንዘብ ፍላጎቶች ፣ ትንበያዎች (ትርፍ እና ኪሳራ ፣ የገንዘብ ፍሰት)።' 
  },
  { 
    id: 'bp_appendix', 
    title: 'አባሪ', 
    description: 'ድጋፍ ሰጪ ሰነዶች።' 
  },
];

export const getFeasibilityTemplate = (lang: 'en' | 'am') => lang === 'am' ? GENERALIZED_TEMPLATE_AM : GENERALIZED_TEMPLATE_EN;
export const getBusinessPlanTemplate = (lang: 'en' | 'am') => lang === 'am' ? BUSINESS_PLAN_TEMPLATE_AM : BUSINESS_PLAN_TEMPLATE_EN;
