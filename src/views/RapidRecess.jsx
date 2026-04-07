"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  BadgeCheck,
  Flag,
  Play,
  Layers,
  Wrench,
  ScanLine,
  Accessibility,
  Droplets,
  Factory,
  ArrowRight,
  CheckCircle2,
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

const CREDENTIALS = [
  { icon: Award, label: "30+ Years Experience" },
  { icon: Shield, label: "ICC Code Compliant" },
  { icon: Accessibility, label: "ADA Compliant" },
  { icon: Flag, label: "Made in USA" },
];

const SPECS = [
  { icon: Layers, label: "Material", value: "16-gauge galvanized steel" },
  { icon: Wrench, label: "Installation", value: "From above joists" },
  { icon: ScanLine, label: "Structure", value: "No structural cutting required" },
  { icon: Shield, label: "Code", value: "ICC code compliant" },
  { icon: Accessibility, label: "Accessibility", value: "ADA compliant" },
  { icon: Droplets, label: "Drain", value: "Patented BPC drain connection" },
  { icon: BadgeCheck, label: "Shower Pans", value: "100% recycled PET foam" },
  { icon: Factory, label: "Manufacturing", value: "Colorado + Texas, USA" },
];

const BENEFITS = [
  "No step-over threshold for safe, easy entry",
  "Installs without structural demolition or cutting",
  "ADA-compliant and code-approved from day one",
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
                <p className="text-sm font-semibold tracking-[0.15em] uppercase text-warm">
                  The Partnership
                </p>
                <h2
                  className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
                  style={{ fontFamily: playfair }}
                >
                  Why Rapid Recess
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-text-body">
                  Founded in 2012, Rapid Recess was created by the same team that
                  built QuickDrain USA, an award-winning linear drain manufacturer
                  acquired in 2017. They brought decades of plumbing innovation
                  to a new challenge: making barrier-free showers accessible to
                  every home.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-text-body">
                  Their patented above-joist installation system means no structural
                  compromise. No cutting through floor joists. No weakening your
                  home. Just a clean, code-compliant curbless shower that installs
                  in days, not weeks.
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

      {/* ─── Section 4: Partner Quote ─── */}
      <section className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="border-l-4 border-warm pl-8 py-4">
              <blockquote
                className="text-xl sm:text-2xl leading-relaxed text-text-body italic"
                style={{ fontFamily: playfair }}
              >
                &ldquo;[Partner testimonial pending — we&apos;ll add a quote from
                the Rapid Recess team here]&rdquo;
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-text-body/70">
                — Rapid Recess
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Section 5: Technical Specs ─── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-warm">
                Product Details
              </p>
              <h2
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Technical Specifications
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
            {SPECS.map(({ icon: Icon, label, value }) => (
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

      {/* ─── Section 6: Video Placeholder ─── */}
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

      {/* ─── Section 7: Before/After Gallery ─── */}
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

      {/* ─── Section 8: Benefits Bridge ─── */}
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

      {/* ─── Section 9: CTA ─── */}
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
