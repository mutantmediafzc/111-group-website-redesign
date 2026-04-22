"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { gsap } from "gsap";
import { use } from "react";

/* ─── Country Data ─────────────────────────────────────── */
const COUNTRY_DATA: Record<string, {
  name: string;
  slug: string;
  type: "Citizenship" | "Residency";
  flagEmoji: string;
  flag: string | null;
  img: string;
  price: string;
  region: string;
  minInvestment: string;
  processing: string;
  visaFree: string;
  heroTitle: string;
  heroDesc: string;
  highlights: string[];
  benefits: { icon: string; title: string; desc: string }[];
  steps: { num: string; title: string; desc: string; duration: string }[];
  faqs: { q: string; a: string }[];
}> = {
  "antigua-barbuda": {
    name: "Antigua & Barbuda",
    slug: "antigua-barbuda",
    type: "Citizenship",
    flagEmoji: "🇦🇬",
    flag: "/brand/images/country-flags-3d/antigua.png",
    img: "/brand/images/country-images/antigua.png",
    price: "from $100,000",
    region: "Caribbean",
    minInvestment: "USD 100,000",
    processing: "3–5 months",
    visaFree: "150+ countries",
    heroTitle: "Antigua & Barbuda Citizenship by Investment",
    heroDesc: "Obtain an Antiguan passport through a qualifying donation or real estate investment. Visa-free access to 150+ countries with no residency requirement.",
    highlights: ["UWI fund option from USD 150,000", "Includes spouse, children & parents", "No worldwide income tax", "Dual citizenship permitted"],
    benefits: [
      { icon: "🌍", title: "150+ Visa-Free Countries", desc: "Travel freely to the UK, EU Schengen zone, Singapore, and over 150 nations." },
      { icon: "👨‍👩‍👧‍👦", title: "Full Family Inclusion", desc: "Spouse, dependent children, and parents can all be included under one application." },
      { icon: "💰", title: "No Worldwide Tax", desc: "No income, capital gains, or inheritance tax on worldwide earnings." },
      { icon: "🏡", title: "Real Estate Option", desc: "Invest in approved real estate and hold for 5 years to qualify." },
      { icon: "✅", title: "No Residency Required", desc: "Citizenship granted through investment — no relocation needed." },
      { icon: "🛡️", title: "Dual Citizenship", desc: "Antigua & Barbuda permits dual or multiple citizenship." },
    ],
    steps: [
      { num: "01", title: "Free Consultation", desc: "Our advisor reviews your profile, goals, and budget to confirm Antigua & Barbuda is the right fit.", duration: "Day 1" },
      { num: "02", title: "Investment Route Selection", desc: "Choose between the National Development Fund donation or an approved real estate investment.", duration: "Week 1" },
      { num: "03", title: "Document Preparation", desc: "Our legal team compiles, authenticates, and translates all required documentation.", duration: "Week 2–4" },
      { num: "04", title: "Application Submission", desc: "We submit the complete application package to the Citizenship by Investment Unit.", duration: "Week 4–6" },
      { num: "05", title: "Government Due Diligence", desc: "The CIU conducts background checks. We liaise directly throughout this stage.", duration: "3–5 months" },
      { num: "06", title: "Passport Issuance", desc: "Upon approval, we coordinate oath of allegiance and passport collection.", duration: "Final stage" },
    ],
    faqs: [
      { q: "What is the minimum investment?", a: "The National Development Fund donation starts at USD 100,000 for a single applicant. Real estate options start from USD 200,000." },
      { q: "Can parents be included?", a: "Yes. Dependent parents aged 55+ can be included in the application." },
      { q: "Is there a residency requirement?", a: "No residency is required prior to or after obtaining citizenship." },
      { q: "How long does the process take?", a: "Typically 3–5 months from application submission to passport issuance." },
      { q: "Is dual citizenship allowed?", a: "Yes. Antigua & Barbuda permits dual citizenship, and your current nationality is not affected." },
    ],
  },
  "dominica": {
    name: "Dominica",
    slug: "dominica",
    type: "Citizenship",
    flagEmoji: "🇩🇲",
    flag: "/brand/images/country-flags-3d/dominica.png",
    img: "/brand/images/country-images/dominica.png",
    price: "from $100,000",
    region: "Caribbean",
    minInvestment: "USD 100,000",
    processing: "4–6 months",
    visaFree: "140+ countries",
    heroTitle: "Dominica Citizenship by Investment",
    heroDesc: "The world's most affordable CBI program. Acquire a Dominican passport through a government fund donation — ranked #1 for value by the IMI Index.",
    highlights: ["Most affordable CBI program globally", "Ranked #1 for value by IMI", "No residency requirement", "Family of four from USD 175,000"],
    benefits: [
      { icon: "💎", title: "Best Value Program", desc: "Consistently ranked #1 for value by the Investment Migration Insider Index." },
      { icon: "🌍", title: "140+ Visa-Free Countries", desc: "Access the UK, EU Schengen, Singapore, and more without a visa." },
      { icon: "👨‍👩‍👧‍👦", title: "Family Inclusion", desc: "Include spouse, children, and dependent parents under one application." },
      { icon: "💰", title: "Tax Neutral", desc: "No tax on worldwide income or capital gains for Dominica citizens." },
      { icon: "✅", title: "No Residency Required", desc: "No physical presence required before or after citizenship." },
      { icon: "🛡️", title: "Dual Citizenship", desc: "Dominica permits holding multiple citizenships simultaneously." },
    ],
    steps: [
      { num: "01", title: "Free Consultation", desc: "We assess your profile and confirm Dominica's program suits your goals and budget.", duration: "Day 1" },
      { num: "02", title: "Fund Donation or Real Estate", desc: "Select between the Economic Diversification Fund or an approved real estate project.", duration: "Week 1" },
      { num: "03", title: "Document Compilation", desc: "Our team prepares, authenticates, and translates all application documents.", duration: "Week 2–4" },
      { num: "04", title: "Application Submission", desc: "We file the complete application to Dominica's Citizenship by Investment Unit.", duration: "Week 4–6" },
      { num: "05", title: "Government Review", desc: "Background checks and due diligence conducted by the Dominican government.", duration: "4–6 months" },
      { num: "06", title: "Passport Collection", desc: "We coordinate the final steps for passport issuance and secure delivery.", duration: "Final stage" },
    ],
    faqs: [
      { q: "What is the minimum investment?", a: "A single applicant can obtain citizenship through a USD 100,000 donation to the Economic Diversification Fund." },
      { q: "What is the family price?", a: "A family of four can qualify from USD 175,000 via the government fund route." },
      { q: "Is there a residency requirement?", a: "No. You are not required to reside in Dominica before or after obtaining citizenship." },
      { q: "How long does processing take?", a: "Typically 4–6 months from submission of a complete application." },
      { q: "Is the IMI ranking reliable?", a: "Yes. The Investment Migration Insider Index is widely regarded as the industry's most credible benchmark." },
    ],
  },
  "egypt": {
    name: "Egypt",
    slug: "egypt",
    type: "Citizenship",
    flagEmoji: "🇪🇬",
    flag: "/brand/images/country-flags-3d/egypt.png",
    img: "/brand/images/country-images/egypt.png",
    price: "from $250,000",
    region: "Africa & Middle East",
    minInvestment: "USD 250,000",
    processing: "3–6 months",
    visaFree: "50+ countries",
    heroTitle: "Egypt Citizenship by Investment",
    heroDesc: "Obtain Egyptian citizenship through a qualifying investment in real estate, deposits, or government bonds — a gateway to Africa and the Arab world.",
    highlights: ["Real estate, deposit & bond routes", "Strategic location — Africa & Middle East", "Rich cultural heritage", "Arab League access"],
    benefits: [
      { icon: "🌍", title: "Regional Hub", desc: "Egypt sits at the crossroads of Africa, the Middle East, and the Mediterranean." },
      { icon: "🏛️", title: "Arab League Membership", desc: "Access rights and relationships across 22 Arab League member states." },
      { icon: "🏡", title: "Multiple Investment Routes", desc: "Choose real estate, fixed deposits, government bonds, or business investment." },
      { icon: "💰", title: "Affordable Entry", desc: "One of the more accessible citizenship programs in the broader MENA region." },
      { icon: "👨‍👩‍👧‍👦", title: "Family Inclusion", desc: "Spouse and dependent children may be included in the application." },
      { icon: "✅", title: "Straightforward Process", desc: "Government-authorised program with clear eligibility criteria and documentation." },
    ],
    steps: [
      { num: "01", title: "Consultation & Eligibility", desc: "We review your background, nationality, and investment capacity to confirm eligibility.", duration: "Day 1" },
      { num: "02", title: "Investment Selection", desc: "Choose your preferred route: real estate, deposit, bonds, or business contribution.", duration: "Week 1–2" },
      { num: "03", title: "Document Preparation", desc: "Our legal team compiles required documentation and handles translations.", duration: "Week 2–4" },
      { num: "04", title: "Application Submission", desc: "We submit the complete file to the relevant Egyptian authority.", duration: "Week 4–6" },
      { num: "05", title: "Government Review", desc: "Background checks and approval process conducted by Egyptian authorities.", duration: "3–6 months" },
      { num: "06", title: "Citizenship Certificate & Passport", desc: "We coordinate collection of your Egyptian citizenship certificate and passport.", duration: "Final stage" },
    ],
    faqs: [
      { q: "What investment routes are available?", a: "Options include real estate purchase, fixed deposits with Egyptian banks, government bonds, and business investment." },
      { q: "What is the minimum investment?", a: "Real estate and deposit routes start from approximately USD 250,000." },
      { q: "How many countries can I visit visa-free?", a: "An Egyptian passport currently provides visa-free or visa-on-arrival access to approximately 50+ countries." },
      { q: "Is dual citizenship allowed?", a: "Egypt generally does not recognise dual citizenship for naturalised citizens. We advise on this in detail during consultation." },
      { q: "How long does the process take?", a: "Typically 3–6 months depending on the investment route and document preparation timeline." },
    ],
  },
  "grenada": {
    name: "Grenada",
    slug: "grenada",
    type: "Citizenship",
    flagEmoji: "🇬🇩",
    flag: "/brand/images/country-flags-3d/Grenada.png",
    img: "/brand/images/country-images/grenada.png",
    price: "from $150,000",
    region: "Caribbean",
    minInvestment: "USD 150,000",
    processing: "4–6 months",
    visaFree: "140+ countries",
    heroTitle: "Grenada Citizenship by Investment",
    heroDesc: "The only Caribbean passport with access to the US E-2 Treaty Investor Visa. Visa-free to 140+ countries including UK, EU, and China.",
    highlights: ["Only Caribbean passport with US E-2 Treaty Investor Visa", "Includes spouse, children & parents", "No residency requirement", "Dual citizenship permitted"],
    benefits: [
      { icon: "🇺🇸", title: "US E-2 Treaty Access", desc: "Grenada is the only Caribbean CBI nation with a US E-2 Treaty Investor Visa — allowing Grenadian passport holders to live and work in the USA." },
      { icon: "🌍", title: "140+ Visa-Free Countries", desc: "Travel visa-free to the UK, EU Schengen, China, Singapore, and more." },
      { icon: "👨‍👩‍👧‍👦", title: "Parents Included", desc: "Dependent parents and grandparents can be included in a single application." },
      { icon: "💰", title: "Tax Neutral", desc: "No tax on worldwide income, capital gains, or inheritance for Grenada citizens." },
      { icon: "✅", title: "No Residency Required", desc: "No need to visit or reside in Grenada before or after citizenship is granted." },
      { icon: "🛡️", title: "Dual Citizenship", desc: "Grenada permits full dual or multiple citizenship." },
    ],
    steps: [
      { num: "01", title: "Free Consultation", desc: "Our advisor discusses the E-2 route and Grenada's unique advantages for your situation.", duration: "Day 1" },
      { num: "02", title: "Investment Selection", desc: "Choose between the National Transformation Fund donation (from USD 150K) or real estate.", duration: "Week 1" },
      { num: "03", title: "Document Preparation", desc: "Full legal due diligence package compiled and authenticated by our team.", duration: "Week 2–4" },
      { num: "04", title: "Application Submission", desc: "Application filed to Grenada's Citizenship by Investment Unit.", duration: "Week 4–6" },
      { num: "05", title: "Government Processing", desc: "Due diligence and background checks conducted by the Grenadian government.", duration: "4–6 months" },
      { num: "06", title: "Passport & E-2 Pathway", desc: "Passport issued. We then guide you through the US E-2 visa application if required.", duration: "Final stage" },
    ],
    faqs: [
      { q: "What makes Grenada unique among Caribbean programs?", a: "Grenada is the only Caribbean CBI country with access to the US E-2 Treaty Investor Visa, enabling Grenadian passport holders to live and work in the United States." },
      { q: "What is the minimum investment?", a: "The National Transformation Fund donation starts at USD 150,000 for a single applicant." },
      { q: "Can parents be included?", a: "Yes. Dependent parents and grandparents may be included under the Grenada program." },
      { q: "How long does processing take?", a: "Typically 4–6 months from a complete application submission." },
      { q: "Is dual citizenship allowed?", a: "Yes. Grenada fully permits dual and multiple citizenship." },
    ],
  },
  "jordan": {
    name: "Jordan",
    slug: "jordan",
    type: "Citizenship",
    flagEmoji: "🇯🇴",
    flag: "/brand/images/country-flags-3d/jordan.png",
    img: "/brand/images/country-images/jordan.png",
    price: "from $750,000",
    region: "Middle East",
    minInvestment: "USD 750,000",
    processing: "3–6 months",
    visaFree: "50+ countries",
    heroTitle: "Jordan Citizenship by Investment",
    heroDesc: "Obtain Jordanian citizenship through a substantial real estate or business investment — a prestigious Middle Eastern passport with strong regional access.",
    highlights: ["Real estate & business investment routes", "Prestigious Jordanian passport", "Access to GCC and Arab markets", "Family inclusion available"],
    benefits: [
      { icon: "🏛️", title: "Prestigious Middle East Passport", desc: "Jordan's passport provides strong regional access and is respected across the Arab world and beyond." },
      { icon: "🌍", title: "Arab World Access", desc: "Ease of travel across the Middle East and North Africa with strong bilateral relations." },
      { icon: "🏡", title: "Real Estate Route", desc: "Invest in Jordanian real estate with a minimum of USD 750,000 to qualify." },
      { icon: "💼", title: "Business Investment", desc: "Alternative business investment and deposit routes available for qualifying applicants." },
      { icon: "👨‍👩‍👧‍👦", title: "Family Inclusion", desc: "Spouse and dependent children may be included in a single application." },
      { icon: "✅", title: "Government-Authorised", desc: "A fully sovereign, legally established program under Jordanian nationality law." },
    ],
    steps: [
      { num: "01", title: "Consultation & Eligibility", desc: "We review your profile and confirm eligibility under Jordan's investment citizenship requirements.", duration: "Day 1" },
      { num: "02", title: "Investment Structuring", desc: "Select your preferred investment route — real estate, fixed deposit, or business.", duration: "Week 1–2" },
      { num: "03", title: "Document Preparation", desc: "Our legal team handles all documentation, translation, and authentication.", duration: "Week 2–6" },
      { num: "04", title: "Application Filing", desc: "Complete application filed to the relevant Jordanian authority.", duration: "Week 6–8" },
      { num: "05", title: "Government Review", desc: "Background checks and due diligence by Jordanian authorities.", duration: "3–6 months" },
      { num: "06", title: "Citizenship & Passport", desc: "Citizenship decree issued and passport obtained through our coordination.", duration: "Final stage" },
    ],
    faqs: [
      { q: "What is the minimum investment for Jordan?", a: "The primary real estate route requires a minimum investment of USD 750,000." },
      { q: "Are there other investment routes?", a: "Yes. Fixed deposit and business investment routes are also available with varying minimum requirements." },
      { q: "How many countries can I travel to visa-free?", a: "A Jordanian passport provides visa-free or visa-on-arrival access to approximately 50+ countries." },
      { q: "Is dual citizenship permitted in Jordan?", a: "Jordan's dual citizenship policy is complex and subject to government discretion. We advise on this fully during consultation." },
      { q: "How long does the process take?", a: "Approximately 3–6 months from complete document submission." },
    ],
  },
  "st-kitts-nevis": {
    name: "St Kitts & Nevis",
    slug: "st-kitts-nevis",
    type: "Citizenship",
    flagEmoji: "🇰🇳",
    flag: "/brand/images/country-flags-3d/saint-kitts.png",
    img: "/brand/images/country-images/saint-kitts-and-nevis.png",
    price: "from $250,000",
    region: "Caribbean",
    minInvestment: "USD 250,000",
    processing: "4–6 months",
    visaFree: "150+ countries",
    heroTitle: "St Kitts & Nevis Citizenship by Investment",
    heroDesc: "The world's oldest citizenship by investment program, established in 1984. Visa-free to 150+ countries including the Schengen zone, UK, and Singapore.",
    highlights: ["World's oldest CBI program (est. 1984)", "Accelerated Application Process available", "No residency requirement", "Dual citizenship permitted"],
    benefits: [
      { icon: "🏆", title: "World's Oldest CBI Program", desc: "Established in 1984 — the most credible and thoroughly proven citizenship by investment program globally." },
      { icon: "⚡", title: "Accelerated Processing", desc: "An Accelerated Application Process is available for eligible applicants, reducing timelines significantly." },
      { icon: "🌍", title: "150+ Visa-Free Countries", desc: "Travel freely to the UK, EU Schengen zone, Singapore, and over 150 nations." },
      { icon: "💰", title: "Tax Neutral", desc: "No income, capital gains, or inheritance tax for St Kitts & Nevis citizens." },
      { icon: "✅", title: "No Residency Required", desc: "No physical presence required before or after obtaining citizenship." },
      { icon: "🛡️", title: "Dual Citizenship", desc: "St Kitts & Nevis fully permits dual and multiple citizenship." },
    ],
    steps: [
      { num: "01", title: "Free Consultation", desc: "We review your profile and explain the standard and accelerated application tracks.", duration: "Day 1" },
      { num: "02", title: "Investment Route", desc: "Choose between the Sustainable Island State Contribution or an approved real estate investment.", duration: "Week 1" },
      { num: "03", title: "Document Preparation", desc: "Legal team compiles, notarises, and authenticates all required documents.", duration: "Week 2–4" },
      { num: "04", title: "Application Submission", desc: "Filed directly to the SKN Citizenship by Investment Unit.", duration: "Week 4–6" },
      { num: "05", title: "Government Due Diligence", desc: "Background screening and review by SKN authorities.", duration: "4–6 months" },
      { num: "06", title: "Passport Issuance", desc: "Passport collected and securely delivered upon approval.", duration: "Final stage" },
    ],
    faqs: [
      { q: "What is the minimum investment?", a: "The Sustainable Island State Contribution (SISC) starts at USD 250,000 for a single applicant." },
      { q: "What is the Accelerated Application Process?", a: "An expedited track for qualifying applicants that can reduce processing time to as little as 45–60 days." },
      { q: "Is there a residency requirement?", a: "No residency is required before or after obtaining St Kitts & Nevis citizenship." },
      { q: "How long does standard processing take?", a: "Typically 4–6 months for the standard application track." },
      { q: "Is dual citizenship allowed?", a: "Yes. St Kitts & Nevis fully permits dual and multiple citizenship." },
    ],
  },
  "saint-lucia": {
    name: "Saint Lucia",
    slug: "saint-lucia",
    type: "Citizenship",
    flagEmoji: "🇱🇨",
    flag: "/brand/images/country-flags-3d/st-lucia.png",
    img: "/brand/images/country-images/saint-lucia.png",
    price: "from $100,000",
    region: "Caribbean",
    minInvestment: "USD 100,000",
    processing: "3–6 months",
    visaFree: "145+ countries",
    heroTitle: "Saint Lucia Citizenship by Investment",
    heroDesc: "Multiple investment routes including a returnable government bond option. Visa-free access to 145+ countries with no worldwide income tax.",
    highlights: ["Multiple investment routes", "Government bond option (returnable)", "Includes full family", "No tax on worldwide income"],
    benefits: [
      { icon: "🔄", title: "Returnable Bond Option", desc: "Saint Lucia uniquely offers a government bond route where the investment is returned after 5 years." },
      { icon: "🌍", title: "145+ Visa-Free Countries", desc: "Travel to the UK, EU Schengen, Singapore, Hong Kong, and more." },
      { icon: "👨‍👩‍👧‍👦", title: "Full Family Inclusion", desc: "Spouse, children, and dependent parents can all be included in one application." },
      { icon: "💰", title: "No Worldwide Tax", desc: "Saint Lucia does not tax income, capital gains, or inheritance earned overseas." },
      { icon: "🏡", title: "Multiple Routes", desc: "Choose from NDF donation, government bonds, real estate, or enterprise projects." },
      { icon: "✅", title: "No Residency Required", desc: "No physical presence in Saint Lucia is required to obtain or maintain citizenship." },
    ],
    steps: [
      { num: "01", title: "Free Consultation", desc: "We identify the best investment route based on your goals, including the bond option.", duration: "Day 1" },
      { num: "02", title: "Investment Selection", desc: "Choose NDF, government bonds, real estate, or an approved enterprise project.", duration: "Week 1" },
      { num: "03", title: "Document Preparation", desc: "Our legal team handles all notarisation, authentication, and translations.", duration: "Week 2–4" },
      { num: "04", title: "Application Submission", desc: "Complete application filed to Saint Lucia's Citizenship by Investment Unit.", duration: "Week 4–6" },
      { num: "05", title: "Government Review", desc: "Due diligence and background checks by Saint Lucian authorities.", duration: "3–6 months" },
      { num: "06", title: "Passport & Bond Return", desc: "Passport issued; for bond investors, we track the 5-year return schedule.", duration: "Final stage" },
    ],
    faqs: [
      { q: "What is the government bond option?", a: "Saint Lucia offers a USD 300,000 non-interest-bearing bond that is returned to the investor after 5 years, making it a recoverable investment." },
      { q: "What is the minimum investment?", a: "The National Development Fund donation starts at USD 100,000 for a single applicant." },
      { q: "Can parents be included?", a: "Yes. Dependent parents aged 65+ may be included in the application." },
      { q: "Is there a residency requirement?", a: "No. No presence in Saint Lucia is required before or after citizenship." },
      { q: "How long does processing take?", a: "Typically 3–6 months from submission of a complete application." },
    ],
  },
  "turkey": {
    name: "Turkey",
    slug: "turkey",
    type: "Citizenship",
    flagEmoji: "🇹🇷",
    flag: "/brand/images/country-flags-3d/turkety.png",
    img: "/brand/images/country-images/turkey.png",
    price: "from $400,000",
    region: "Europe & Middle East",
    minInvestment: "USD 400,000",
    processing: "3–6 months",
    visaFree: "110+ countries",
    heroTitle: "Turkey Citizenship by Investment",
    heroDesc: "Obtain Turkish citizenship through real estate investment from USD 400,000 — a gateway between Europe and Asia with strong economic growth.",
    highlights: ["Real estate from USD 400,000", "Gateway between Europe & Asia", "Strong economic growth market", "Dual citizenship permitted"],
    benefits: [
      { icon: "🌉", title: "Europe-Asia Gateway", desc: "Turkey's unique geographic and economic position bridges European and Middle Eastern markets." },
      { icon: "🏡", title: "Real Estate Route", desc: "Invest in Turkish real estate from USD 400,000 and hold for 3 years to qualify." },
      { icon: "🌍", title: "110+ Visa-Free Countries", desc: "Travel to Japan, South Korea, Singapore, and 110+ nations visa-free." },
      { icon: "💼", title: "Economic Opportunity", desc: "Turkey is a growing economy with significant real estate appreciation potential in major cities." },
      { icon: "👨‍👩‍👧‍👦", title: "Family Inclusion", desc: "Spouse and children under 18 can be included in the application." },
      { icon: "🛡️", title: "Dual Citizenship", desc: "Turkey permits full dual and multiple citizenship." },
    ],
    steps: [
      { num: "01", title: "Consultation", desc: "We review your goals and confirm Turkey's program is right for your profile.", duration: "Day 1" },
      { num: "02", title: "Property Selection", desc: "We assist in identifying TAPU-compliant approved real estate meeting the minimum threshold.", duration: "Week 1–3" },
      { num: "03", title: "Property Purchase & Valuation", desc: "Legal transfer completed with official TAPU appraisal certificate.", duration: "Week 3–6" },
      { num: "04", title: "Application Submission", desc: "Citizenship application filed to the relevant Turkish Directorate General.", duration: "Week 6–8" },
      { num: "05", title: "Government Review", desc: "Background checks and processing by Turkish authorities.", duration: "3–6 months" },
      { num: "06", title: "Citizenship & Passport", desc: "Citizenship decree issued; passport obtained through our coordination.", duration: "Final stage" },
    ],
    faqs: [
      { q: "What is the minimum investment for Turkey?", a: "A real estate purchase of minimum USD 400,000 (officially valued) is required." },
      { q: "Can I sell the property after obtaining citizenship?", a: "The property must be held for a minimum of 3 years before it can be sold." },
      { q: "Is dual citizenship allowed?", a: "Yes. Turkey fully permits dual and multiple citizenship." },
      { q: "How long does the process take?", a: "Typically 3–6 months from property purchase to passport issuance." },
      { q: "Can my family be included?", a: "Yes. Spouse and children under 18 may be included in the application." },
    ],
  },
  "vanuatu": {
    name: "Vanuatu",
    slug: "vanuatu",
    type: "Citizenship",
    flagEmoji: "🇻🇺",
    flag: "/brand/images/country-flags-3d/vanuatu.png",
    img: "/brand/images/country-images/vanuatu.png",
    price: "from $130,000",
    region: "Pacific",
    minInvestment: "USD 130,000",
    processing: "30–60 days",
    visaFree: "130+ countries",
    heroTitle: "Vanuatu Citizenship by Investment",
    heroDesc: "The world's fastest citizenship by investment program. Passport delivered in 30–60 days with visa-free access to 130+ countries and zero taxes.",
    highlights: ["Fastest passport program in the world", "No income, capital gains or inheritance tax", "No residency requirement", "Passport delivered within 60 days"],
    benefits: [
      { icon: "⚡", title: "30–60 Day Processing", desc: "The fastest citizenship program globally — passport delivered within 30–60 days of approval." },
      { icon: "🌍", title: "130+ Visa-Free Countries", desc: "Including the UK, EU Schengen, Singapore, Russia, and more." },
      { icon: "💰", title: "Zero Tax", desc: "No income tax, no capital gains tax, no inheritance tax — ever." },
      { icon: "✅", title: "No Residency Required", desc: "No need to visit or reside in Vanuatu before or after citizenship." },
      { icon: "🛡️", title: "Dual Citizenship", desc: "Vanuatu fully permits dual and multiple citizenship." },
      { icon: "🏝️", title: "Pacific Nation Stability", desc: "A politically stable Pacific island nation with a well-established CBI program." },
    ],
    steps: [
      { num: "01", title: "Consultation", desc: "We confirm Vanuatu's eligibility requirements and discuss the DSP donation route.", duration: "Day 1" },
      { num: "02", title: "Application Preparation", desc: "Our team assembles all required documents for submission.", duration: "Week 1–2" },
      { num: "03", title: "Due Diligence File", desc: "We prepare a comprehensive background and due diligence file.", duration: "Week 2–3" },
      { num: "04", title: "Application Submission", desc: "Filed to the Vanuatu Financial Intelligence Unit and Citizenship Office.", duration: "Week 3–4" },
      { num: "05", title: "Government Approval", desc: "Fast-track review by Vanuatu's Commission of Inquiry.", duration: "30–60 days" },
      { num: "06", title: "Passport Delivery", desc: "Passport issued and securely delivered — no travel to Vanuatu required.", duration: "Final stage" },
    ],
    faqs: [
      { q: "How fast is the Vanuatu program?", a: "Vanuatu is the world's fastest CBI program, with passports typically delivered within 30–60 days of approval." },
      { q: "What is the minimum investment?", a: "The Development Support Program (DSP) donation starts at USD 130,000 for a single applicant." },
      { q: "Do I need to travel to Vanuatu?", a: "No. The entire process is handled remotely — no travel is required at any stage." },
      { q: "What taxes apply?", a: "None. Vanuatu has no income tax, capital gains tax, wealth tax, or inheritance tax." },
      { q: "Is dual citizenship allowed?", a: "Yes. Vanuatu fully permits dual and multiple citizenship." },
    ],
  },
  "nauru": {
    name: "Nauru",
    slug: "nauru",
    type: "Citizenship",
    flagEmoji: "🇳🇷",
    flag: null,
    img: "/brand/images/country-images/nauru.png",
    price: "from $105,000",
    region: "Pacific",
    minInvestment: "USD 105,000",
    processing: "3–6 months",
    visaFree: "90+ countries",
    heroTitle: "Nauru Citizenship by Investment",
    heroDesc: "One of the Pacific's most affordable citizenship programs. Obtain Nauruan citizenship through a qualifying government contribution.",
    highlights: ["Affordable Pacific citizenship", "Family inclusion available", "No residency requirement", "Dual citizenship permitted"],
    benefits: [
      { icon: "💎", title: "Affordable Entry", desc: "One of the lowest minimum investment thresholds in the Pacific CBI market." },
      { icon: "🌍", title: "90+ Visa-Free Countries", desc: "Access a range of countries including Commonwealth nations." },
      { icon: "👨‍👩‍👧‍👦", title: "Family Inclusion", desc: "Spouse and dependent children can be included in the application." },
      { icon: "✅", title: "No Residency Required", desc: "No physical presence required before or after obtaining citizenship." },
      { icon: "🛡️", title: "Dual Citizenship", desc: "Nauru permits dual and multiple citizenship." },
      { icon: "🏝️", title: "Pacific Nation", desc: "A sovereign Pacific island nation with a government-authorised citizenship program." },
    ],
    steps: [
      { num: "01", title: "Consultation", desc: "We confirm eligibility and walk through Nauru's program requirements.", duration: "Day 1" },
      { num: "02", title: "Investment Preparation", desc: "We structure the qualifying government contribution and prepare documentation.", duration: "Week 1–2" },
      { num: "03", title: "Document Compilation", desc: "Full document package prepared, authenticated, and translated.", duration: "Week 2–4" },
      { num: "04", title: "Application Filing", desc: "Complete application submitted to Nauruan authorities.", duration: "Week 4–6" },
      { num: "05", title: "Government Review", desc: "Background checks and due diligence by the Government of Nauru.", duration: "3–6 months" },
      { num: "06", title: "Passport Issuance", desc: "Citizenship and passport issued upon approval.", duration: "Final stage" },
    ],
    faqs: [
      { q: "What is the minimum investment for Nauru?", a: "The program starts from approximately USD 105,000 for a single applicant." },
      { q: "Is residency required?", a: "No. There is no residency requirement before or after obtaining Nauruan citizenship." },
      { q: "Is dual citizenship allowed?", a: "Yes. Nauru permits dual and multiple citizenship." },
      { q: "How long does the process take?", a: "Typically 3–6 months from submission of a complete application." },
      { q: "Who can be included?", a: "Spouse and dependent children may be included in the main application." },
    ],
  },
  "sao-tome-principe": {
    name: "São Tomé & Príncipe",
    slug: "sao-tome-principe",
    type: "Citizenship",
    flagEmoji: "🇸🇹",
    flag: null,
    img: "/brand/images/country-images/sao-tome-and-principe.png",
    price: "from $50,000",
    region: "Africa",
    minInvestment: "USD 50,000",
    processing: "3–6 months",
    visaFree: "70+ countries",
    heroTitle: "São Tomé & Príncipe Citizenship by Investment",
    heroDesc: "Africa's most affordable citizenship by investment program. Obtain a São Tomé & Príncipe passport through a low-threshold government contribution.",
    highlights: ["Africa's most affordable CBI program", "Lowest entry threshold globally", "Family inclusion available", "Dual citizenship permitted"],
    benefits: [
      { icon: "💎", title: "Lowest Entry Point", desc: "One of the most affordable citizenship programs globally, starting from USD 50,000." },
      { icon: "🌍", title: "70+ Visa-Free Countries", desc: "Access to ECOWAS, CPLP member states, and other partner nations." },
      { icon: "🌐", title: "Lusophone Access", desc: "Member of the CPLP — Community of Portuguese Language Countries — opening doors across Africa, Europe, and Latin America." },
      { icon: "👨‍👩‍👧‍👦", title: "Family Inclusion", desc: "Spouse and dependent children can be included in the application." },
      { icon: "✅", title: "No Residency Required", desc: "No physical presence required before or after obtaining citizenship." },
      { icon: "🛡️", title: "Dual Citizenship", desc: "São Tomé & Príncipe permits dual and multiple citizenship." },
    ],
    steps: [
      { num: "01", title: "Consultation", desc: "We confirm your eligibility and outline the requirements for São Tomé & Príncipe citizenship.", duration: "Day 1" },
      { num: "02", title: "Investment Preparation", desc: "We structure the qualifying contribution and prepare all required documentation.", duration: "Week 1–2" },
      { num: "03", title: "Document Compilation", desc: "Full document package prepared, authenticated, and translated where required.", duration: "Week 2–4" },
      { num: "04", title: "Application Submission", desc: "Complete application filed to São Tomé & Príncipe authorities.", duration: "Week 4–6" },
      { num: "05", title: "Government Review", desc: "Background checks and processing by São Tomé & Príncipe government.", duration: "3–6 months" },
      { num: "06", title: "Citizenship & Passport", desc: "Citizenship certificate and passport issued upon approval.", duration: "Final stage" },
    ],
    faqs: [
      { q: "What is the minimum investment?", a: "The program starts from approximately USD 50,000, making it one of the most accessible CBI programs globally." },
      { q: "What is the CPLP?", a: "The Community of Portuguese Language Countries — São Tomé & Príncipe's membership provides diplomatic and travel advantages across 9 member nations." },
      { q: "Is residency required?", a: "No. There is no residency requirement before or after obtaining citizenship." },
      { q: "Is dual citizenship allowed?", a: "Yes. São Tomé & Príncipe permits dual and multiple citizenship." },
      { q: "How long does the process take?", a: "Typically 3–6 months from submission of a complete application." },
    ],
  },
};

/* ─── Shared components ─────────────────────────────────── */
const inputCls = "w-full rounded-lg border border-white/10 bg-white/8 px-4 pb-3 pt-6 text-[0.88rem] text-white outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/40 transition-all placeholder:text-transparent peer";
const labelCls = "absolute left-4 top-2 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/40 pointer-events-none";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line last:border-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
        <span className="text-[0.88rem] font-semibold text-fg">{q}</span>
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${open ? "border-[color:var(--color-brand)] bg-[color:var(--color-brand)] text-white rotate-45" : "border-line text-fg-muted"}`}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
        </span>
      </button>
      {open && <p className="pb-5 text-[0.82rem] text-fg-soft leading-relaxed">{a}</p>}
    </div>
  );
}

function useModal() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  let _cachedNav: HTMLElement | null = null;
  function getNav() { if (!_cachedNav) _cachedNav = document.querySelector("header"); return _cachedNav; }
  function lockScroll() { document.body.style.overflow = "hidden"; const nav = getNav(); if (nav) { nav.style.opacity = "0"; nav.style.pointerEvents = "none"; } }
  function unlockScroll() { document.body.style.overflow = ""; const nav = getNav(); if (nav) { nav.style.opacity = ""; nav.style.pointerEvents = ""; } }
  const open = useCallback(() => {
    lockScroll();
    gsap.set(overlayRef.current, { display: "flex" });
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(contentRef.current, { opacity: 0, scale: 0.94, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, delay: 0.1 });
  }, []);
  const close = useCallback(() => {
    gsap.to(contentRef.current, { opacity: 0, scale: 0.95, y: 12, duration: 0.25 });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.1, onComplete: () => { gsap.set(overlayRef.current, { display: "none" }); unlockScroll(); } });
  }, []);
  return { overlayRef, contentRef, open, close };
}

function ContactModal({ overlayRef, contentRef, close, country }: { overlayRef: React.RefObject<HTMLDivElement | null>; contentRef: React.RefObject<HTMLDivElement | null>; close: () => void; country: string }) {
  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div ref={contentRef} className="relative flex w-full max-w-[760px] overflow-hidden rounded-2xl shadow-2xl" style={{ maxHeight: "88vh" }}>
        <div className="flex flex-1 flex-col overflow-y-auto bg-[#1C1F22] px-8 py-10">
          <button onClick={close} aria-label="Close" className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          <div className="mb-7">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)] mb-1">{country}</p>
            <h2 className="text-[1.55rem] font-semibold leading-tight text-white">Book a Free Consultation</h2>
            <p className="mt-1.5 text-[0.78rem] font-light text-white/45">Our advisor will reach out within 24 hours to discuss your citizenship options.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative"><input type="text" placeholder=" " className={inputCls} /><label className={labelCls}>First Name</label></div>
              <div className="relative"><input type="text" placeholder=" " className={inputCls} /><label className={labelCls}>Last Name</label></div>
            </div>
            <div className="relative"><input type="email" placeholder=" " className={inputCls} /><label className={labelCls}>Email</label></div>
            <div className="relative"><input type="tel" placeholder=" " className={inputCls} /><label className={labelCls}>Mobile</label></div>
            <button type="submit" className="mt-2 w-full rounded-lg bg-[color:var(--color-brand)] py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-85">
              Book Consultation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const country = COUNTRY_DATA[slug];

  if (!country) return notFound();

  const modal = useModal();

  return (
    <>
      <ContactModal overlayRef={modal.overlayRef} contentRef={modal.contentRef} close={modal.close} country={country.name} />

      {/* Hero */}
      <section className="relative min-h-[72vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={country.img} alt={country.name} fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/88" />
        </div>
        <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-10 pb-16 pt-40">
          <div className="flex items-center gap-2 text-[0.67rem] text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services/citizenship-by-investment" className="hover:text-white/80 transition-colors">Citizenship by Investment</Link>
            <span>/</span>
            <span className="text-white/80">{country.name}</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[color:var(--color-brand)]">✦</span>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/60">{country.type} Program · {country.region}</span>
              </div>
              <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-5">
                {country.name}
              </h1>
              <p className="text-[1rem] text-white/65 leading-relaxed max-w-lg">{country.heroDesc}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:min-w-[200px]">
              {[
                { val: country.minInvestment, label: "Min. Investment" },
                { val: country.processing, label: "Processing" },
                { val: country.visaFree, label: "Visa-Free" },
                { val: "100%", label: "Certified" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-white/8 backdrop-blur-sm border border-white/10 px-4 py-3">
                  <p className="font-display text-[1.2rem] font-semibold text-[color:var(--color-brand)] leading-none">{s.val}</p>
                  <p className="mt-1 text-[0.63rem] uppercase tracking-[0.1em] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <div className="bg-bg">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">

            {/* Left content */}
            <div className="flex flex-col gap-16 min-w-0">

              {/* Highlights */}
              <section id="highlights">
                <p className="eyebrow eyebrow-gold mb-2">Program Highlights</p>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-3">
                  Why Choose {country.name}?
                </h2>
                <div className="mt-6 flex flex-col gap-3">
                  {country.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-3 rounded-xl bg-bg-elev px-5 py-4">
                      <svg className="shrink-0 text-[color:var(--color-brand)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      <span className="text-[0.88rem] font-medium text-fg">{h}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Benefits */}
              <section id="benefits">
                <p className="eyebrow eyebrow-gold mb-2">Key Benefits</p>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-8">
                  What You Gain
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {country.benefits.map((b) => (
                    <div key={b.title} className="rounded-2xl bg-bg-elev p-6">
                      <div className="text-2xl mb-3">{b.icon}</div>
                      <h3 className="font-semibold text-fg text-[0.88rem] mb-2">{b.title}</h3>
                      <p className="text-[0.76rem] text-fg-soft leading-relaxed">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Steps */}
              <section id="steps">
                <p className="eyebrow eyebrow-gold mb-2">Steps & Procedure</p>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-3">How the Process Works</h2>
                <p className="text-[0.88rem] text-fg-soft max-w-xl leading-relaxed mb-10">From first consultation to passport in hand — 111 Group manages every step.</p>
                <div className="flex flex-col gap-0">
                  {country.steps.map((s, i) => (
                    <div key={s.num} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-white text-[0.68rem] font-bold">{s.num}</div>
                        {i < country.steps.length - 1 && <div className="w-px flex-1 bg-line my-2" />}
                      </div>
                      <div className="pb-8 mt-1.5">
                        <div className="flex items-center gap-3 mb-1.5">
                          <h3 className="font-display text-[0.95rem] font-semibold text-fg">{s.title}</h3>
                          <span className="rounded-full bg-bg px-2.5 py-0.5 text-[0.58rem] font-medium text-fg-muted">{s.duration}</span>
                        </div>
                        <p className="text-[0.8rem] text-fg-soft leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section id="faq">
                <p className="eyebrow eyebrow-gold mb-2">FAQ</p>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.02em] text-fg mb-8">Frequently Asked Questions</h2>
                <div className="rounded-2xl bg-bg-elev px-7">
                  {country.faqs.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
                </div>
              </section>
            </div>

            {/* Sticky Sidebar */}
            <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl bg-bg-elev p-5">
                <p className="text-[0.63rem] font-semibold uppercase tracking-[0.18em] text-fg-muted mb-4">Quick Access</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Book Free Consultation", sub: "Speak with an advisor", gold: true, onClick: () => modal.open(), icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
                    { label: "Steps & Procedure", sub: "Our 6-step process", href: "#steps", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> },
                    { label: "All Programs", sub: "Explore other countries", href: "/services/citizenship-by-investment", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg> },
                  ].map((item) => {
                    const cls = `flex items-center gap-3 rounded-xl px-4 py-3 transition-all group cursor-pointer ${item.gold ? "bg-[color:var(--color-brand)] hover:opacity-90" : "bg-bg border border-line hover:border-[color:var(--color-brand)]"}`;
                    const inner = (
                      <>
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.gold ? "bg-white/15 text-white" : "bg-bg-soft text-[color:var(--color-brand)]"}`}>{item.icon}</span>
                        <div className="min-w-0 flex-1">
                          <p className={`text-[0.78rem] font-semibold leading-tight ${item.gold ? "text-white" : "text-fg"}`}>{item.label}</p>
                          {item.sub && <p className={`text-[0.66rem] mt-0.5 ${item.gold ? "text-white/70" : "text-fg-muted"}`}>{item.sub}</p>}
                        </div>
                        <svg className={`ml-auto shrink-0 ${item.gold ? "text-white/70" : "text-fg-muted"}`} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                      </>
                    );
                    if (item.onClick) return <button key={item.label} type="button" onClick={item.onClick} className={cls}>{inner}</button>;
                    return <a key={item.label} href={item.href} className={cls}>{inner}</a>;
                  })}
                </div>
              </div>

              <div className="rounded-2xl bg-bg-elev p-5">
                <p className="text-[0.63rem] font-semibold uppercase tracking-[0.18em] text-fg-muted mb-4">On this page</p>
                <nav className="flex flex-col gap-0.5">
                  {[{ href: "#highlights", label: "Program Highlights" }, { href: "#benefits", label: "Key Benefits" }, { href: "#steps", label: "Steps & Procedure" }, { href: "#faq", label: "FAQ" }].map((item) => (
                    <a key={item.href} href={item.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-[0.76rem] text-fg-soft hover:text-fg hover:bg-bg transition-all">
                      <span className="w-1 h-1 rounded-full bg-[color:var(--color-brand)] shrink-0" />{item.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="rounded-2xl bg-[color:var(--color-brand)]/10 border border-[color:var(--color-brand)]/20 p-5">
                <p className="text-[0.72rem] font-semibold text-[color:var(--color-brand)] mb-2">Free Consultation</p>
                <p className="text-[0.76rem] text-fg-soft leading-relaxed mb-4">Speak with a certified 111 Group advisor about {country.name} citizenship — no cost, no commitment.</p>
                <button onClick={() => modal.open()} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-brand)] py-3 text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-white hover:opacity-90 transition-opacity">
                  Book Free Call
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
