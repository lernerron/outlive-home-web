"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  BadgeCheck,
  Flag,
  ShowerHead,
  ArrowUpDown,
  Accessibility,
  Grip,
  MoveUp,
  DoorOpen,
  ArrowUp,
  Bath,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
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
  { icon: Shield, label: "CSLB #807715" },
  { icon: Award, label: "30 Years Experience" },
  { icon: BadgeCheck, label: "CAPS Certified (NAHB)" },
  { icon: Award, label: "NAHB Award Winner" },
  { icon: Flag, label: "#1 Stiltz Dealer" },
  { icon: Shield, label: "Fully Insured" },
];

const SERVICES = [
  { icon: ShowerHead, title: "Accessible Showers & Bathrooms", desc: "Barrier-free curbless showers and full bathroom modifications" },
  { icon: ArrowUpDown, title: "Platform Lifts & Elevators", desc: "Stiltz home elevators and platform lift installations" },
  { icon: Accessibility, title: "Ramps", desc: "Modular, custom, and threshold ramps for any entrance" },
  { icon: Grip, title: "Grab Bars & Handrails", desc: "Strategic placement for bathrooms, hallways, and stairs" },
  { icon: MoveUp, title: "Stair Lifts", desc: "Indoor and outdoor stair lift systems" },
  { icon: DoorOpen, title: "Door Modifications", desc: "Wider doorways, automated doors, and lever handles" },
  { icon: ArrowUp, title: "Ceiling Lifts", desc: "Track-based ceiling lift systems for transfers" },
  { icon: Bath, title: "Walk-in Bathtubs", desc: "Low-threshold tubs with built-in seating" },
];

const BENEFITS = [
  "One team handles everything, from design through installation",
  "30 years of aging-in-place expertise, purpose-built for your home",
  "Licensed, insured, and award-winning, every project",
];

export default function AIPR() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  return (
    <div>
      {/* ─── Section 1: Hero ─── */}
      <section className="bg-navy py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p
              className="text-sm font-bold tracking-[0.2em] uppercase text-white"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
            >
              Our Los Angeles Founding Partner
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]"
              style={{ fontFamily: playfair }}
            >
              30 Years of Expertise.
              <br className="hidden sm:block" />
              Partnered with Outlive Homes.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/75 max-w-2xl">
              Aging-in-Place Remodeling brings three decades of accessibility
              expertise to the Outlive Homes partnership in Los Angeles. NAHB
              award-winning, CAPS certified, and the #1 Stiltz home elevator
              dealer in the United States.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Section 2: Credentials Bar ─── */}
      <section className="bg-bg-gray py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
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

      {/* ─── Section 3: Tyler Owen Bio ─── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div>
                <p className="text-sm font-semibold tracking-[0.15em] uppercase text-warm">
                  Founding Partner
                </p>
                <h2
                  className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
                  style={{ fontFamily: playfair }}
                >
                  Tyler Owen
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-text-body">
                  Tyler is the founder of Aging-in-Place Remodeling, a Certified
                  Aging-in-Place Specialist (CAPS) designated by the National
                  Association of Home Builders. He holds CSLB General Contractor
                  License #807715 and won the NAHB Best of American Living Award
                  for his work in accessibility remodeling.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-text-body">
                  As the #1 Stiltz home elevator dealer in the United States, his
                  team has completed hundreds of accessibility modifications across
                  Southern California. AIPR is a founding partner of Outlive Homes,
                  bringing three decades of expertise to the LA market.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="bg-bg-gray border-2 border-dashed border-warm-gray rounded-2xl aspect-[3/4] flex items-center justify-center">
                <p className="text-warm-gray text-sm text-center px-4">
                  [Tyler Owen photo — pending]
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Section 4: Services in LA ─── */}
      <section className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-warm">
                Full-Spectrum Accessibility
              </p>
              <h2
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Services in Los Angeles
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
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-navy" />
                </div>
                <p className="text-sm font-bold text-text-body">{title}</p>
                <p className="mt-1 text-xs text-text-body/70 leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Section 5: Stiltz Elevators Feature ─── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div>
                <p className="text-sm font-semibold tracking-[0.15em] uppercase text-warm">
                  #1 Stiltz Dealer in the US
                </p>
                <h2
                  className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
                  style={{ fontFamily: playfair }}
                >
                  Home Elevators, Without the Shaft
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-text-body">
                  Stiltz home elevators install in the footprint of an armchair.
                  No shaft, no pit, no major construction. They run on standard
                  household power and fit into existing homes without structural
                  changes.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-text-body">
                  As the top Stiltz dealer in the country, AIPR brings unmatched
                  installation expertise to every project. Available as
                  through-floor lifts for 2-story homes, these elevators are a
                  major product line alongside Rapid Recess barrier-free showers.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="bg-bg-gray border-2 border-dashed border-warm-gray rounded-2xl aspect-video flex items-center justify-center">
                <p className="text-warm-gray text-sm text-center px-4">
                  [Stiltz elevator photo — pending from AIPR]
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Section 6: Track Record ─── */}
      <section className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-warm">
                Proven Results
              </p>
              <h2
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Built in Partnership with Aging-in-Place Remodeling
              </h2>
            </div>
          </Reveal>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="mt-16 flex flex-wrap items-center justify-center gap-12 sm:gap-20"
          >
            {[
              { stat: "30+", label: "Years in Business" },
              { stat: "NAHB", label: "Best of American Living Award" },
              { stat: "100s", label: "Homes Modified" },
            ].map(({ stat, label }) => (
              <motion.div key={label} variants={staggerItem} className="text-center">
                <p
                  className="text-4xl sm:text-5xl font-bold text-navy"
                  style={{ fontFamily: playfair }}
                >
                  {stat}
                </p>
                <p className="mt-2 text-sm font-medium text-text-body/70">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Section 7: Gallery ─── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-warm">
                Our Work
              </p>
              <h2
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Project Gallery
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
              { id: "project-1", label: "Project photo — pending from AIPR" },
              { id: "project-2", label: "Project photo — pending from AIPR" },
              { id: "project-3", label: "Project photo — pending from AIPR" },
              { id: "project-4", label: "Project photo — pending from AIPR" },
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

      {/* ─── Section 8: Quote ─── */}
      <section className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="border-l-4 border-warm pl-8 py-4">
              <blockquote
                className="text-xl sm:text-2xl leading-relaxed text-text-body italic"
                style={{ fontFamily: playfair }}
              >
                &ldquo;[Partner testimonial pending — we&apos;ll add a quote
                from Tyler or an AIPR customer here]&rdquo;
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-text-body/70">
                — Tyler Owen, Founding Partner
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Section 9: Service Area ─── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <Reveal>
            <div className="w-16 h-16 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-navy" />
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
              style={{ fontFamily: playfair }}
            >
              Serving the Los Angeles Metro Area
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-body">
              Our Outlive Homes partnership with AIPR covers the greater Los
              Angeles area. For service in San Diego, Orange County, or Southwest
              Riverside, contact{" "}
              <a
                href="https://www.aipremodeling.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue font-semibold hover:underline inline-flex items-center gap-1"
              >
                Aging-in-Place Remodeling
                <ExternalLink className="w-4 h-4" />
              </a>{" "}
              directly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Section 10: Benefits Bridge ─── */}
      <section className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.15em] uppercase text-warm">
              Why It Matters
            </p>
            <h2
              className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anchor"
              style={{ fontFamily: playfair }}
            >
              The Outlive + AIPR Difference
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
              Ready to Make Your LA Home Accessible?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              Get a free assessment and discover what&apos;s possible for your
              home with 30 years of expertise behind every project.
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
        source="partner-aipr"
      />
    </div>
  );
}
