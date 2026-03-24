"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Compass,
  Stars,
  Hammer,
  Star,
  Shield,
  Clock,
  CheckCircle2,
  Phone,
  Ruler,
  Wrench,
} from "lucide-react";
import LeadCaptureForm from "../components/LeadCaptureForm";
import InlineLeadForm from "../components/InlineLeadForm";
import { ASSET_URLS } from "@/lib/assets";

/* ─── Animation Variants ─── */
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

/* ─── Scroll-Reveal Wrapper ─── */
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

/* ─── Animated Counter ─── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════
   PREMIUM HOMEPAGE
   ═══════════════════════════════════════════════════ */
export default function HomePremium() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  const playfair = "var(--font-playfair), Georgia, serif";

  return (
    <div className="bg-white overflow-hidden">

      {/* ═══════════════════════════════════════
          HERO — Cinematic full-bleed
          ═══════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0">
          <Image
            src={ASSET_URLS.brand.heroBackground}
            alt="Elegant bathroom design"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/70 to-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
        </div>
        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 text-warm text-sm font-semibold tracking-[0.2em] uppercase">
                <span className="w-8 h-px bg-warm" />
                South Florida&rsquo;s Home Accessibility Experts
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]"
              style={{ fontFamily: playfair }}
            >
              Outlive at Home
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 text-lg sm:text-xl leading-relaxed text-white/75 max-w-xl"
            >
              We design and install barrier-free bathroom solutions that let
              South Florida customers stay safe and independent at home. From
              shower conversions to complete accessible bathrooms &mdash;
              installed in days, not months.
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
                href="/services/bathroom-safety"
                className="group text-sm font-semibold text-white/80 hover:text-white flex items-center gap-2 transition-colors"
              >
                Explore Bathroom Safety
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white/50"
              animate={{ y: [0, 14, 0], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          5-STAR SOCIAL PROOF BAR
          ═══════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-navy border-t border-white/5"
      >
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-warm text-warm" />
                ))}
              </div>
              <span className="text-white font-semibold text-sm sm:text-base">
                5-Star Rated Service
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-white/40 text-sm">
              <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Licensed &amp; Insured</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Lifetime Warranty</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════
          OUR EXPERTISE
          ═══════════════════════════════════════ */}
      <section id="solutions" className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="text-warm font-semibold text-sm tracking-[0.15em] uppercase">What We Do</span>
              <h2
                className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Our Expertise
              </h2>
              <p className="mt-6 text-lg text-text-body/70 leading-relaxed">
                We design solutions that fit your home and your personal needs.
              </p>
            </div>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              {
                title: "Bathroom Safety",
                description:
                  "From minor modifications such as grab bars and shower seats to full renovations, we help you navigate your bathroom safely and comfortably.",
                image: ASSET_URLS.home.bathroomSafetyCard,
                href: "/services/bathroom-safety",
              },
              {
                title: "Home Elevators",
                description:
                  "Safe, reliable, and elegant home elevators for seamless floor-to-floor access.",
                image: ASSET_URLS.home.homeElevators,
                comingSoon: true,
              },
              {
                title: "Stair Lifts",
                description:
                  "Glide up and down your stairs with a gentle, smooth ride from start to finish.",
                image: ASSET_URLS.home.stairLifts,
                comingSoon: true,
              },
            ].map((product, index) => {
              const CardWrapper = product.href ? 'a' : 'div';
              const cardProps = product.href ? { href: product.href } : {};
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                >
                  <CardWrapper
                    {...cardProps}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-anchor/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {product.comingSoon && (
                        <span className="absolute top-4 right-4 bg-navy text-white text-xs font-semibold px-3 py-1 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <div className="p-7">
                      <h3 className="text-xl font-bold text-anchor mb-3" style={{ fontFamily: playfair }}>
                        {product.title}
                      </h3>
                      <p className="text-text-body/70 leading-relaxed">
                        {product.description}
                      </p>
                      {product.href && (
                        <span className="mt-4 inline-flex items-center text-warm font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                          Learn More <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      )}
                      {product.comingSoon && (
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setLeadFormOpen(true); }}
                          className="mt-4 inline-flex items-center text-navy font-semibold text-sm hover:text-blue transition-colors duration-300"
                        >
                          Notify Me <ArrowRight className="ml-1 h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </CardWrapper>
                </motion.div>
              );
            })}
          </motion.div>

          <Reveal delay={0.2}>
            <div className="text-center">
              <Button
                size="lg"
                className="bg-blue hover:bg-blue/90 text-white px-8 py-6 text-base rounded-full shadow-lg shadow-blue/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => setLeadFormOpen(true)}
              >
                Get Your Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BATHROOM SOLUTIONS SHOWCASE
          ═══════════════════════════════════════ */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-anchor leading-tight"
                style={{ fontFamily: playfair }}
              >
                Simple solutions.{" "}
                <span className="text-warm">Big results.</span>
              </h2>
              <p className="mt-6 text-lg text-text-body/70 leading-relaxed">
                We combine style and functionality to design a bathroom you love.
                And use quality craftsmanship that&rsquo;s built to last.
              </p>
            </div>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              {
                title: "Bathroom Remodels",
                description: "Remodel your bathroom to match your style and needs.",
                image: ASSET_URLS.home.bathroomRemodel,
              },
              {
                title: "Shower Conversions",
                description: "Convert your tub to a shower or your shower to a tub.",
                image: ASSET_URLS.brand.showerGlassEnclosure,
              },
              {
                title: "Walk-in Solutions",
                description: "Safe, accessible walk-in showers and baths for comfort and independence.",
                image: ASSET_URLS.home.walkinShower,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
                className="relative group overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
                onClick={() => setLeadFormOpen(true)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anchor/90 via-anchor/20 to-transparent" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-warm/0 group-hover:bg-warm/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3
                      className="text-2xl sm:text-3xl font-bold text-white mb-3"
                      style={{ fontFamily: playfair }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center text-warm font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROCESS — Horizontal cards
          ═══════════════════════════════════════ */}
      <section id="process" className="bg-bg-gray py-24 sm:py-32 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="text-warm font-semibold text-sm tracking-[0.15em] uppercase">How It Works</span>
              <h2
                className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Your project done right.
              </h2>
            </div>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              {
                icon: Phone,
                step: "01",
                title: "Free Consultation",
                description:
                  "We visit your home, assess your needs, and discuss solutions — no obligation, no pressure.",
              },
              {
                icon: Ruler,
                step: "02",
                title: "Design & Estimate",
                description:
                  "Our team designs a custom plan tailored to your home, needs, and budget. You'll know exactly what to expect.",
              },
              {
                icon: Wrench,
                step: "03",
                title: "Professional Installation",
                description:
                  "Our skilled installers complete your project efficiently and respectfully, backed by our lifetime warranty.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 text-center"
              >
                {/* Step number */}
                <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: "linear-gradient(135deg, #24477F 0%, #051C2C 100%)",
                    boxShadow: "0 6px 20px rgba(5, 28, 44, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-warm font-bold text-xs tracking-[0.15em] uppercase">
                  Step {step.step}
                </span>
                <h3
                  className="mt-2 text-xl font-bold text-anchor"
                  style={{ fontFamily: playfair }}
                >
                  {step.title}
                </h3>
                <p className="mt-4 text-text-body/70 leading-relaxed">
                  {step.description}
                </p>

                {/* Connector arrow (between cards, hidden on mobile) */}
                {index < 2 && (
                  <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-5 w-5 text-navy/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY CUSTOMERS CHOOSE US
          ═══════════════════════════════════════ */}
      <section id="why-us" className="bg-white py-24 sm:py-32 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="text-warm font-semibold text-sm tracking-[0.15em] uppercase">Why Us</span>
              <h2
                className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Why Customers Choose Us
              </h2>
              <p className="mt-6 text-lg text-text-body/70 leading-relaxed">
                Our commitment to excellence sets us apart in every aspect of home
                accessibility.
              </p>
            </div>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              {
                icon: Stars,
                title: "Unparalleled Service",
                image: ASSET_URLS.whyUs.customerService,
                alt: "Customer Satisfaction",
                description:
                  "Your dedicated concierge listens closely, follows through with precision, and doesn't stop until you're fully satisfied. We stand behind every project with our satisfaction guarantee.",
              },
              {
                icon: Compass,
                title: "Universal Design",
                image: ASSET_URLS.whyUs.universalDesign,
                alt: "Universal Design Home",
                description:
                  "We blend beauty, function, and safety so seamlessly you'd never know the difference. Our designs anticipate how your needs evolve — creating spaces that work for you today and decades from now.",
              },
              {
                icon: Hammer,
                title: "Exceptional Craftsmanship",
                image: ASSET_URLS.whyUs.craftsmanship,
                alt: "Quality Craftsmanship",
                description:
                  "Our skilled team combines premium materials with rigorous quality standards. Every modification — from a simple grab bar to a full remodel — is executed flawlessly and built to last.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-anchor/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex flex-col flex-1 p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-navy/10 to-blue/10 group-hover:from-warm/10 group-hover:to-warm/5 transition-colors duration-500">
                      <item.icon className="h-5 w-5 text-navy group-hover:text-warm transition-colors duration-500" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-anchor" style={{ fontFamily: playfair }}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-text-body/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <Reveal delay={0.2}>
            <div className="mt-16 text-center">
              <Button
                size="lg"
                className="bg-navy hover:bg-anchor text-white px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => setLeadFormOpen(true)}
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INLINE LEAD CAPTURE
          ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-navy" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 75% 50%, #24477F 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div>
                <h2
                  className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
                  style={{ fontFamily: playfair }}
                >
                  Want more info?{" "}
                  <span className="text-warm">We&rsquo;ve got you.</span>
                </h2>
                <p className="mt-6 text-lg text-white/60 leading-relaxed">
                  Get a free, no-obligation consultation. Our experts will call
                  you, assess your needs, and help you understand our solutions.
                </p>
                <div className="mt-10 space-y-5">
                  {[
                    { icon: Shield, text: "Licensed & insured professionals" },
                    { icon: Clock, text: "We'll respond within 24 hours" },
                    { icon: CheckCircle2, text: "Lifetime warranty on all installations" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="p-2 rounded-lg bg-white/10">
                        <item.icon className="h-5 w-5 text-warm" />
                      </div>
                      <span className="text-white/80 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-3 bg-warm/10 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/15 shadow-2xl">
                  <InlineLeadForm source="homepage-premium-inline" darkMode />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Lead Capture Form Dialog */}
      <LeadCaptureForm
        isOpen={leadFormOpen}
        onClose={() => setLeadFormOpen(false)}
        source="homepage-premium"
      />
    </div>
  );
}
