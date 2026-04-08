"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield,
  Award,
  BadgeCheck,
  Flag,
  Play,
  Droplets,
  Wrench,
  Accessibility,
  ShieldCheck,
  Palette,
  ArrowRight,
  CheckCircle2,
  Hotel,
  Heart,
} from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";

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

function DCOFBar({ label, value, maxValue, color, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const percentage = (value / maxValue) * 100;

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-semibold text-text-body">{label}</span>
        <span className={`text-sm font-bold ${color === "navy" ? "text-navy" : "text-warm-gray"}`}>
          {value}
        </span>
      </div>
      <div className="w-full bg-bg-gray rounded-full h-4 overflow-hidden">
        <motion.div
          className={`h-4 rounded-full ${color === "navy" ? "bg-navy" : "bg-warm-gray/40"}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

const CREDENTIALS = [
  { icon: Award, label: "30+ Years Experience" },
  { icon: Shield, label: "ICC Code Compliant" },
  { icon: Accessibility, label: "ADA Compliant" },
  { icon: Hotel, label: "Hilton Preferred Vendor" },
  { icon: BadgeCheck, label: "250,000+ Showers Installed" },
  { icon: Flag, label: "Made in USA" },
];

const FEATURES = [
  { icon: ShieldCheck, label: "Antimicrobial Pans", value: "Refinishable solid surface, no replacement needed" },
  { icon: Palette, label: "Finish Options", value: "6 panel finishes + 3 plumbing finishes" },
  { icon: Droplets, label: "Waterproofing", value: "Built into every installation, protects your home" },
  { icon: Wrench, label: "Above-Joist Install", value: "No structural changes to your home" },
];

const BENEFITS = [
  "Slip resistance nearly double the industry standard",
  "Safety grab bars built into every installation",
  "Antimicrobial surface that stays clean and safe",
];

export default function RapidRecess() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  return (
    <div>
      {/* ─── Section 1: Hero ─── */}
      <section className="bg-navy py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-white"
               style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>
              Our Shower Technology Partner
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]"
              style={{ fontFamily: playfair }}
            >
              Barrier-Free Showers,
              <br className="hidden sm:block" />
              Powered by Rapid Recess
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 inline-block border border-white/20">
              <p className="text-white/80 text-sm font-medium">
                [Rapid Recess logo — pending]
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/75 max-w-2xl">
              Outlive Homes has partnered with Rapid Recess to bring barrier-free
              curbless shower technology to South Florida homes. Together, we help
              people stay safely in the homes they love.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Section 2: Why Rapid Recess ─── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div>
                <h2
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
                  style={{ fontFamily: playfair }}
                >
                  Why Rapid Recess
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-text-body">
                  Josef Erlebach created the first linear drain manufactured in the
                  United States and changed US building codes in 2008 to make
                  curbless showers possible. After his wife Barbara broke her leg
                  in 11 places, he was inspired to build a better barrier-free
                  shower system from the ground up.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-text-body">
                  With over 30 years of installation expertise, Josef built
                  Rapid Recess on a simple philosophy: never
                  sell something you wouldn&apos;t install in your own
                  mother&apos;s house. Their patented above-joist installation
                  means no structural compromise to your home.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="bg-bg-gray border-2 border-dashed border-warm-gray rounded-2xl aspect-video flex items-center justify-center">
                <p className="text-warm-gray text-sm text-center px-4">
                  [Product photo — pending from Rapid Recess]
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Credentials Bar ─── */}
      <section className="bg-bg-gray py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {CREDENTIALS.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="flex items-center gap-2.5 text-anchor"
              >
                <Icon className="w-5 h-5 text-navy" />
                <span className="text-sm font-semibold">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Section 4: Quote ─── */}
      <section className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="border-l-4 border-warm pl-8 py-4">
              <blockquote
                className="text-xl sm:text-2xl leading-relaxed text-text-body italic"
                style={{ fontFamily: playfair }}
              >
                &ldquo;We won&apos;t sell you something we wouldn&apos;t install
                in our mother&apos;s house.&rdquo;
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-text-body/70">
                — Josef Erlebach, Co-Founder, Rapid Recess
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Section 5: Safety & Slip Resistance ─── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-warm">
                Safety First
              </p>
              <h2
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Slip Resistance That Sets the Standard
              </h2>
              <p className="mt-4 text-lg text-text-body/70 max-w-2xl mx-auto">
                Every Rapid Recess shower pan is treated uniformly across the
                entire surface. No patterned zones, no false sense of security.
              </p>
            </div>
          </Reveal>

          {/* DCOF Comparison Bars */}
          <Reveal delay={0.1}>
            <div className="mt-12 max-w-xl mx-auto space-y-6">
              <DCOFBar
                label="Rapid Recess"
                value={0.81}
                maxValue={1.0}
                color="navy"
                delay={0.2}
              />
              <DCOFBar
                label="Industry Minimum"
                value={0.42}
                maxValue={1.0}
                color="gray"
                delay={0.4}
              />
              <p className="text-sm text-text-body/70 text-center mt-4">
                Nearly double the industry standard for slip resistance (DCOF)
              </p>
            </div>
          </Reveal>

          {/* Safety Features */}
          <Reveal delay={0.2}>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: ShieldCheck, title: "Antimicrobial Surface", desc: "Stays clean and safe over time" },
                { icon: Heart, title: "Hydro Rail Grab Bar", desc: "The shower rail doubles as a safety grab bar" },
                { icon: Shield, title: "Valve Grab Bar", desc: "Round grab bar around the valve for fall prevention" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-navy" />
                  </div>
                  <p className="text-sm font-bold text-text-body">{title}</p>
                  <p className="text-xs text-text-body/70 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Section 6: Product Features ─── */}
      <section className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Product Features
              </h2>
            </div>
          </Reveal>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {FEATURES.map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-navy" />
                </div>
                <p className="text-xs font-semibold text-text-body/70 uppercase tracking-wide">
                  {label}
                </p>
                <p className="mt-1 text-sm font-medium text-text-body">
                  {value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Section 7: Trust Proof ─── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-warm">
                Proven at Scale
              </p>
              <h2
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Trusted by the Best
              </h2>
            </div>
          </Reveal>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { stat: "Hilton", label: "Preferred vendor. 438-room Anatole Dallas renovation completed." },
              { stat: "250K+", label: "Showers installed through 15-year Ferguson partnership." },
              { stat: "2008", label: "Changed US building codes to enable curbless showers." },
            ].map(({ stat, label }) => (
              <motion.div key={stat} variants={staggerItem} className="text-center">
                <p
                  className="text-3xl sm:text-4xl font-bold text-navy"
                  style={{ fontFamily: playfair }}
                >
                  {stat}
                </p>
                <p className="mt-2 text-sm text-text-body/70 leading-relaxed">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Section 8: Video Placeholder ─── */}
      <section className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-warm">
                See It In Action
              </p>
              <h2
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Installation Process
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-video bg-white border-2 border-dashed border-warm-gray rounded-2xl flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-navy/10 flex items-center justify-center">
                <Play className="w-8 h-8 text-navy" />
              </div>
              <p className="text-warm-gray text-sm">
                Installation video coming soon
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Section 9: Before/After Gallery ─── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-warm">
                The Transformation
              </p>
              <h2
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Before &amp; After
              </h2>
            </div>
          </Reveal>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            {[
              { id: "before-1", label: "Before photo — pending from Rapid Recess" },
              { id: "after-1", label: "After photo — pending from Rapid Recess" },
              { id: "before-2", label: "Before photo — pending from Rapid Recess" },
              { id: "after-2", label: "After photo — pending from Rapid Recess" },
            ].map(({ id, label }) => (
              <motion.div
                key={id}
                variants={staggerItem}
                className="bg-bg-gray border-2 border-dashed border-warm-gray rounded-2xl aspect-[4/3] flex items-center justify-center"
              >
                <p className="text-warm-gray text-sm text-center px-4">
                  [{label}]
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Section 10: Benefits Bridge ─── */}
      <section className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.15em] uppercase text-warm">
              For Your Home
            </p>
            <h2
              className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
              style={{ fontFamily: playfair }}
            >
              What This Means for You
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-5 text-left max-w-xl mx-auto">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue flex-shrink-0 mt-0.5" />
                  <span className="text-lg leading-relaxed text-text-body">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ─── Section 11: CTA ─── */}
      <section className="bg-anchor py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <Reveal>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ fontFamily: playfair }}
            >
              Ready to Transform Your Bathroom?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              Get a free assessment and see how a barrier-free shower can work
              in your home.
            </p>
            <button
              onClick={() => setLeadFormOpen(true)}
              className="mt-8 inline-flex items-center gap-2 bg-blue hover:bg-blue/90 text-white px-8 py-4 sm:py-6 text-base font-semibold rounded-full shadow-lg shadow-blue/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              Get Your Free Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* Lead Capture Form Dialog */}
      <LeadCaptureForm
        isOpen={leadFormOpen}
        onClose={() => setLeadFormOpen(false)}
        source="partner-rapid-recess"
      />
    </div>
  );
}
