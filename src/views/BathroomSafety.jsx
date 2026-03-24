"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  ArrowDown,
  Phone,
  Ruler,
  Wrench,
  Shield,
  Award,
  BadgeCheck,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import InlineLeadForm from "@/components/InlineLeadForm";
import { ASSET_URLS } from "@/lib/assets";
import services from "@/../../data/services.json";

const playfair = "var(--font-playfair), Georgia, serif";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={delay}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const PHONE_NUMBER = "(305) 555-0100";
const PHONE_HREF = "tel:+13055550100";

const FAQ_ITEMS = [
  {
    question: "How long does the installation take?",
    answer:
      "Most barrier-free shower conversions are completed in 3-5 days. Complete bathroom renovations typically take 7-10 days. We work efficiently to minimize disruption to your home.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "Yes. We offer flexible financing options to make your bathroom safe and accessible. During your free assessment, we'll discuss payment plans that fit your budget, including options for VA benefits and insurance coverage where applicable.",
  },
  {
    question: "Will my bathroom still look beautiful?",
    answer:
      "Absolutely. Our designs blend safety with style — you'd never know the difference. We use premium materials, custom tile work, and modern fixtures that make your bathroom both safe and elegant.",
  },
  {
    question: "I'm not sure what I need. Can you help?",
    answer:
      "That's exactly what our free in-home assessment is for. Our CAPS-certified team evaluates your space, discusses your needs, and recommends the right solution. No obligation, no pressure.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Outlive Homes is fully licensed and insured in the state of Florida. Our team includes CAPS (Certified Aging-in-Place Specialist) professionals trained specifically in home accessibility modifications.",
  },
];

export default function BathroomSafety() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  const allPricesNull = services.every((s) => s.startingPrice === null);

  return (
    <div className="bg-white overflow-hidden">
      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={ASSET_URLS.brand.heroBackground}
            alt="Modern accessible bathroom"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 text-warm text-sm font-semibold tracking-[0.2em] uppercase">
                <span className="w-8 h-px bg-warm" />
                Bathroom Safety Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]"
              style={{ fontFamily: playfair }}
            >
              A Safer Shower.{" "}
              <span className="text-warm">Installed This Week.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 text-lg sm:text-xl leading-relaxed text-white/75 max-w-xl"
            >
              Barrier-free shower conversions designed for safety, built for
              independence. Licensed, insured, and CAPS certified.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button
                size="lg"
                className="bg-blue hover:bg-blue/90 text-white px-8 py-6 text-base font-semibold rounded-full shadow-lg shadow-blue/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => setLeadFormOpen(true)}
              >
                Get Your Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a
                href={PHONE_HREF}
                className="group text-sm font-semibold text-white/80 hover:text-white flex items-center gap-2 transition-colors"
              >
                <Phone className="h-4 w-4" />
                {PHONE_NUMBER}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TRUST BAR
          ═══════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-navy border-t border-white/5"
      >
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Licensed &amp; Insured
            </span>
            <span className="hidden sm:block text-white/20">|</span>
            <span className="flex items-center gap-2">
              <Award className="h-4 w-4" /> CAPS Certified
            </span>
            <span className="hidden sm:block text-white/20">|</span>
            <span className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" /> Satisfaction Guaranteed
            </span>
            <span className="hidden sm:block text-white/20">|</span>
            <span className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Financing Available
            </span>
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════
          PROBLEM SECTION
          ═══════════════════════════════════════ */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div>
                <span className="text-warm font-semibold text-sm tracking-[0.2em] uppercase">
                  The Problem
                </span>
                <h2
                  className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-anchor"
                  style={{ fontFamily: playfair }}
                >
                  Bathrooms Are the Most Dangerous Room in the Home
                </h2>
                <p className="mt-6 text-lg text-text-body/70 leading-relaxed">
                  For many people, a simple shower can be a serious risk. Slippery
                  surfaces, high tub walls, and poor grab bar placement turn a
                  daily routine into a fall hazard. Most families don&rsquo;t act
                  until after an incident &mdash; but it doesn&rsquo;t have to be
                  that way.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { stat: "235K", label: "ER visits per year from bathroom falls" },
                  { stat: "80%", label: "of falls happen in the bathroom" },
                  { stat: "1 in 3", label: "adults 65+ fall each year" },
                  { stat: "3-5 Days", label: "average installation time" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-bg-gray rounded-2xl p-6 text-center"
                  >
                    <p
                      className="text-3xl sm:text-4xl font-bold text-anchor"
                      style={{ fontFamily: playfair }}
                    >
                      {item.stat}
                    </p>
                    <p className="mt-2 text-sm text-text-body/60">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SOLUTIONS — Three productized tiers
          ═══════════════════════════════════════ */}
      <section className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="text-warm font-semibold text-sm tracking-[0.2em] uppercase">
                Our Solutions
              </span>
              <h2
                className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Choose Your Level of Transformation
              </h2>
              <p className="mt-6 text-lg text-text-body/70 leading-relaxed">
                From a simple shower conversion to a complete accessible
                bathroom, we have a solution for every need and budget.
              </p>
              {allPricesNull && (
                <p className="mt-4 text-sm text-text-body/50">
                  All pricing is determined during your free in-home assessment.
                </p>
              )}
            </div>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {services.map((service, index) => {
              const isPopular = service.id === "roll-in-shower";
              return (
                <motion.div
                  key={service.id}
                  variants={staggerItem}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className={`relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border ${
                    isPopular ? "border-warm ring-2 ring-warm/20" : "border-gray-100"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute top-4 right-4 bg-warm text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                      Most Popular
                    </span>
                  )}
                  <div className="p-8">
                    <h3
                      className="text-2xl font-bold text-anchor mb-3"
                      style={{ fontFamily: playfair }}
                    >
                      {service.name}
                    </h3>
                    <p className="text-text-body/70 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {service.startingPrice !== null ? (
                      <p className="text-3xl font-bold text-anchor mb-1" style={{ fontFamily: playfair }}>
                        Starting at ${service.startingPrice.toLocaleString()}
                      </p>
                    ) : (
                      <p className="text-lg font-semibold text-blue mb-1">
                        Get a Free Quote
                      </p>
                    )}
                    <p className="text-sm text-text-body/50 mb-6">
                      Typical timeline: {service.timeline}
                    </p>

                    {service.features.length > 0 && (
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature, fi) => (
                          <li key={fi} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-warm flex-shrink-0 mt-0.5" />
                            <span className="text-text-body/80 text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Button
                      className={`w-full py-6 text-base font-semibold rounded-full transition-all duration-300 ${
                        isPopular
                          ? "bg-blue hover:bg-blue/90 text-white shadow-lg shadow-blue/20"
                          : "bg-navy hover:bg-anchor text-white"
                      }`}
                      onClick={() => setLeadFormOpen(true)}
                    >
                      Get Your Free Assessment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROCESS
          ═══════════════════════════════════════ */}
      <section className="bg-white py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-navy/5 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center mb-20">
              <span className="text-warm font-semibold text-sm tracking-[0.2em] uppercase">
                How It Works
              </span>
              <h2
                className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Three Simple Steps
              </h2>
            </div>
          </Reveal>

          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-px">
              <div className="w-full h-full bg-gradient-to-b from-navy/20 via-blue/20 to-warm/20" />
            </div>

            {[
              {
                icon: Phone,
                step: "01",
                title: "Free Assessment",
                description:
                  "We visit your home, assess your needs, and discuss the best solution for your space — no obligation, no pressure.",
              },
              {
                icon: Ruler,
                step: "02",
                title: "Design & Fixed Quote",
                description:
                  "Our team designs a custom plan and provides a fixed quote — no surprises, no hidden fees. You'll know exactly what to expect.",
              },
              {
                icon: Wrench,
                step: "03",
                title: "Professional Installation",
                description:
                  "Our skilled installers complete your project in 3-5 days, respectfully and on schedule. Backed by our satisfaction guarantee.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative flex items-start mb-16 last:mb-0 md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[3px] border-navy shadow-md z-10" />

                <div
                  className={`md:w-[calc(50%-2.5rem)] ${
                    index % 2 === 0
                      ? "md:pr-0 md:text-right"
                      : "md:pl-0 md:ml-auto"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div
                      className={`flex items-center gap-4 mb-5 ${
                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #24477F 0%, #051C2C 100%)",
                          boxShadow:
                            "0 6px 20px rgba(5, 28, 44, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                        }}
                      >
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <span className="text-warm font-bold text-xs tracking-[0.15em] uppercase">
                          Step {step.step}
                        </span>
                        <h3
                          className="text-xl font-bold text-anchor"
                          style={{ fontFamily: playfair }}
                        >
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p
                      className={`text-text-body/70 leading-relaxed ${
                        index % 2 === 0 ? "md:text-right" : ""
                      }`}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BEFORE / AFTER
          ═══════════════════════════════════════ */}
      <section className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="text-warm font-semibold text-sm tracking-[0.2em] uppercase">
                Our Work
              </span>
              <h2
                className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                See the Transformation
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 max-w-4xl mx-auto">
              {/* Before */}
              <div className="relative w-full lg:w-[45%] aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={ASSET_URLS.home.bathroomSafetyCard}
                  alt="Bathroom before accessibility renovation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 bg-anchor/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Before
                </span>
              </div>

              {/* Arrow separator */}
              <div className="flex items-center justify-center lg:px-6">
                <div className="hidden lg:block">
                  <ArrowRight className="h-8 w-8 text-warm" />
                </div>
                <div className="lg:hidden">
                  <ArrowDown className="h-8 w-8 text-warm" />
                </div>
              </div>

              {/* After */}
              <div className="relative w-full lg:w-[45%] aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={ASSET_URLS.bathroomSafety?.accessible || ASSET_URLS.home.bathroomRemodel}
                  alt="Bathroom after accessibility renovation — modern, barrier-free design"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 bg-warm/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  After
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ
          ═══════════════════════════════════════ */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-warm font-semibold text-sm tracking-[0.2em] uppercase">
                Common Questions
              </span>
              <h2
                className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Frequently Asked Questions
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible defaultValue="item-0">
              {FAQ_ITEMS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-gray-100"
                >
                  <AccordionTrigger className="py-6 text-left text-lg font-semibold text-anchor hover:text-navy transition-colors [&[data-state=open]]:border-l-2 [&[data-state=open]]:border-warm [&[data-state=open]]:pl-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-text-body/70 leading-relaxed [&[data-state=open]]:border-l-2 [&[data-state=open]]:border-warm [&[data-state=open]]:pl-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INLINE LEAD FORM (dark)
          ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 75% 50%, #24477F 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div>
                <span className="text-warm font-semibold text-sm tracking-[0.2em] uppercase">
                  Get Started
                </span>
                <h2
                  className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
                  style={{ fontFamily: playfair }}
                >
                  Ready for a{" "}
                  <span className="text-warm">safer bathroom?</span>
                </h2>
                <p className="mt-6 text-lg text-white/60 leading-relaxed">
                  Get a free, no-obligation assessment. Our CAPS-certified team
                  will evaluate your space and recommend the right solution.
                </p>
                <div className="mt-8">
                  <a
                    href={PHONE_HREF}
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold transition-colors"
                  >
                    <Phone className="h-5 w-5 text-warm" />
                    Call us: {PHONE_NUMBER}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-3 bg-warm/10 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/15 shadow-2xl">
                  <InlineLeadForm
                    source="bathroom-safety-inline"
                    defaultServiceType="Barrier-free shower"
                    darkMode
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Lead Capture Form Modal */}
      <LeadCaptureForm
        isOpen={leadFormOpen}
        onClose={() => setLeadFormOpen(false)}
        source="bathroom-safety"
        defaultServiceType="Barrier-free shower"
      />
    </div>
  );
}
