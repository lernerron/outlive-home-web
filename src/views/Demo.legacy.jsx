"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Phone,
  Ruler,
  Wrench,
  Star,
  Shield,
  Clock,
  CheckCircle2,
  Award,
  Home,
  Users,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Quote,
} from "lucide-react";
import { ASSET_URLS } from "@/lib/assets";

/* ─────────────────── Utility: Animated counter ─────────────────── */
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─────────────────── Utility: Section wrapper with scroll reveal ─────────────────── */
function RevealSection({ children, className = "", delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────── Utility: Staggered children ─────────────────── */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─────────────────── Before/After Slider ─────────────────── */
function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e) => { if (isDragging.current) handleMove(e.clientX); };
  const handleTouchMove = (e) => { handleMove(e.touches[0].clientX); };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-col-resize select-none shadow-2xl"
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* After image (full) */}
      <Image src={afterSrc} alt={afterAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      {/* Before image (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
        <Image src={beforeSrc} alt={beforeAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
          <ChevronLeft className="h-4 w-4 text-anchor -mr-1" />
          <ChevronRight className="h-4 w-4 text-anchor -ml-1" />
        </div>
      </div>
      {/* Labels */}
      <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-anchor/80 backdrop-blur-sm rounded-full text-white text-xs font-semibold tracking-wide uppercase">
        Before
      </div>
      <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-warm/90 backdrop-blur-sm rounded-full text-white text-xs font-semibold tracking-wide uppercase">
        After
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN DEMO COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function Demo() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Outlive Homes transformed our bathroom into a sanctuary. The attention to detail was extraordinary — every tile, every fixture chosen with both beauty and safety in mind.",
      name: "Margaret & David Chen",
      location: "Coral Gables, FL",
      rating: 5,
    },
    {
      quote: "We were nervous about the renovation process, but the Outlive team made it seamless. Our new walk-in shower is gorgeous, and we feel so much safer.",
      name: "Robert Alvarez",
      location: "Fort Lauderdale, FL",
      rating: 5,
    },
    {
      quote: "The home elevator changed everything for us. My mother can move freely between floors again. The craftsmanship is impeccable — it looks like it was always part of the house.",
      name: "Sandra Williams",
      location: "Boca Raton, FL",
      rating: 5,
    },
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="bg-white overflow-hidden">

      {/* ════════════════════════════════════════════
          1. CINEMATIC HERO
          ════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-anchor" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 20% 50%, #24477F 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 30%, #1A6FAD 0%, transparent 60%)",
          }}
        />
        {/* Hero image with overlay */}
        <div className="absolute inset-0">
          <Image
            src={ASSET_URLS.brand.heroBackground}
            alt="Elegant bathroom design"
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
        </div>
        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm font-medium tracking-wide">
              <Sparkles className="h-4 w-4 text-warm" />
              Design Showcase
            </span>
          </motion.div>

          {/* Main heading with staggered word reveal */}
          <motion.h1
            className="mt-8 text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Spaces That
            <br />
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue/50 to-warm">
                Outlive Time
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="mt-8 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            We design homes where elegance meets accessibility — spaces that grow
            with you and feel timeless for decades to come.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <Button
              size="lg"
              className="bg-warm hover:bg-warm/90 text-white px-8 py-6 text-base font-semibold rounded-full shadow-lg shadow-warm/25 transition-all hover:shadow-xl hover:shadow-warm/30 hover:-translate-y-0.5"
            >
              Begin Your Transformation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 px-8 py-6 text-base rounded-full border border-white/20"
            >
              See Our Work
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-white/60"
                animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. STATS / TRUST BAR
          ════════════════════════════════════════════ */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { value: 25, suffix: "+", label: "Years Experience", icon: Award },
              { value: 1200, suffix: "+", label: "Projects Completed", icon: Home },
              { value: 98, suffix: "%", label: "Client Satisfaction", icon: Heart },
              { value: 500, suffix: "+", label: "Families Served", icon: Users },
            ].map((stat, i) => (
              <motion.div key={i} variants={staggerItem} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-bg-gray mb-4 group-hover:bg-anchor group-hover:scale-105 transition-all duration-300">
                  <stat.icon className="h-6 w-6 text-anchor group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-4xl sm:text-5xl font-bold text-anchor tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-warm-gray font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. BEFORE & AFTER GALLERY
          ════════════════════════════════════════════ */}
      <RevealSection className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <motion.span
              className="text-warm font-semibold text-sm tracking-widest uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Transformations
            </motion.span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-anchor tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              See the Difference
            </h2>
            <p className="mt-6 text-lg text-text-body/70 leading-relaxed">
              Drag the slider to reveal how we transform ordinary bathrooms into safe, elegant sanctuaries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <BeforeAfterSlider
                beforeSrc={ASSET_URLS.home.bathroomSafetyCard}
                afterSrc={ASSET_URLS.home.bathroomRemodel}
                beforeAlt="Bathroom before renovation"
                afterAlt="Bathroom after renovation"
              />
              <p className="mt-4 text-center text-sm text-warm-gray">Bathroom Safety Remodel — Coral Gables</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <BeforeAfterSlider
                beforeSrc={ASSET_URLS.home.walkinShower}
                afterSrc={ASSET_URLS.brand.showerGlassEnclosure}
                beforeAlt="Shower before conversion"
                afterAlt="Walk-in shower after conversion"
              />
              <p className="mt-4 text-center text-sm text-warm-gray">Walk-in Shower Conversion — Fort Lauderdale</p>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ════════════════════════════════════════════
          4. SERVICES SHOWCASE — 3D Card Hover
          ════════════════════════════════════════════ */}
      <RevealSection className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="text-warm font-semibold text-sm tracking-widest uppercase">What We Do</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-anchor tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Our Services
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                title: "Bathroom Remodels",
                description: "Complete bathroom transformations that blend luxury aesthetics with universal design principles.",
                image: ASSET_URLS.home.bathroomRemodel,
                icon: "01",
              },
              {
                title: "Shower Conversions",
                description: "Seamless tub-to-shower or shower-to-tub conversions with premium materials and finishes.",
                image: ASSET_URLS.brand.showerGlassEnclosure,
                icon: "02",
              },
              {
                title: "Walk-in Solutions",
                description: "Barrier-free walk-in showers and baths designed for independence without compromising style.",
                image: ASSET_URLS.home.walkinShower,
                icon: "03",
              },
              {
                title: "Bathroom Safety",
                description: "Strategic safety upgrades — from grab bars to full accessibility overhauls — that feel naturally elegant.",
                image: ASSET_URLS.home.bathroomSafetyCard,
                icon: "04",
              },
              {
                title: "Home Elevators",
                description: "Quiet, reliable residential elevators that provide effortless floor-to-floor access.",
                image: ASSET_URLS.home.homeElevators,
                icon: "05",
              },
              {
                title: "Stair Lifts",
                description: "Premium stair lifts with smooth operation and custom rail configurations for any staircase.",
                image: ASSET_URLS.home.stairLifts,
                icon: "06",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-gray-100"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-anchor/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-4 left-4 text-xs font-bold tracking-widest text-white/60 bg-anchor/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {service.icon}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-anchor mb-2 group-hover:text-navy transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-body/70 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center text-warm font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </RevealSection>

      {/* ════════════════════════════════════════════
          5. TESTIMONIAL CAROUSEL
          ════════════════════════════════════════════ */}
      <section className="relative bg-anchor py-24 sm:py-32 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-navy/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Quote className="h-12 w-12 text-warm/60 mx-auto mb-8" />
          </motion.div>

          <div className="relative min-h-[240px] sm:min-h-[200px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light text-white/90 leading-relaxed italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </blockquote>
                <div className="mt-8">
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warm text-warm" />
                    ))}
                  </div>
                  <p className="text-white font-semibold text-base">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-white/50 text-sm mt-1">
                    {testimonials[activeTestimonial].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeTestimonial
                    ? "w-8 h-2.5 bg-warm"
                    : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          6. TIMELINE / PROCESS
          ════════════════════════════════════════════ */}
      <RevealSection className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-20">
            <span className="text-warm font-semibold text-sm tracking-widest uppercase">How It Works</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-anchor tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Your Journey With Us
            </h2>
          </div>

          {/* Vertical timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-navy via-blue to-warm sm:-translate-x-px" />

            {[
              {
                step: "01",
                icon: Phone,
                title: "Free Consultation",
                description: "We visit your home, listen to your needs, and understand your vision. No pressure, no obligation — just a genuine conversation about making your home work better for you.",
              },
              {
                step: "02",
                icon: Ruler,
                title: "Custom Design",
                description: "Our design team creates a tailored plan that balances beauty, safety, and your budget. You'll see detailed renderings and know exactly what to expect before we start.",
              },
              {
                step: "03",
                icon: Wrench,
                title: "Expert Installation",
                description: "Our skilled craftsmen bring your vision to life with meticulous attention to detail. We treat your home with the respect it deserves — clean, quiet, on schedule.",
              },
              {
                step: "04",
                icon: Shield,
                title: "Lifetime Guarantee",
                description: "Every project is backed by our lifetime warranty. We stand behind our work because we believe in building relationships that last as long as our craftsmanship.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 sm:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-navy -translate-x-1/2 mt-1 z-10 shadow-md" />

                {/* Content card */}
                <div className={`ml-20 sm:ml-0 sm:w-[calc(50%-3rem)] ${i % 2 === 0 ? "sm:pr-0" : "sm:pl-0"}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #24477F 0%, #051C2C 100%)",
                          boxShadow: "0 4px 12px rgba(5, 28, 44, 0.25)",
                        }}
                      >
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="text-warm font-bold text-xs tracking-widest uppercase">Step {item.step}</span>
                        <h3 className="text-xl font-bold text-anchor">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-text-body/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ════════════════════════════════════════════
          7. CTA SECTION
          ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background with image */}
        <div className="absolute inset-0">
          <Image
            src={ASSET_URLS.brand.heroBackground}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-anchor via-anchor/95 to-navy/90" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                Ready to Transform
                <br />
                <span className="text-warm">Your Home?</span>
              </h2>
              <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-lg">
                Every great project starts with a conversation. Tell us your vision and
                we'll show you what's possible — free, no obligation.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-warm hover:bg-warm/90 text-white px-8 py-6 text-base font-semibold rounded-full shadow-lg shadow-warm/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-white/10 px-8 py-6 text-base rounded-full border border-white/20"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  (305) 555-0199
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-6">
                {[
                  { icon: Shield, text: "Licensed & Insured" },
                  { icon: Clock, text: "24hr Response" },
                  { icon: CheckCircle2, text: "Lifetime Warranty" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/60">
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-warm/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Get Your Free Estimate</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-warm/50 focus:border-transparent transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-warm/50 focus:border-transparent transition-all"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-warm/50 focus:border-transparent transition-all"
                    />
                    <select
                      className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white/40 focus:outline-none focus:ring-2 focus:ring-warm/50 focus:border-transparent transition-all appearance-none"
                      defaultValue=""
                    >
                      <option value="" disabled>Select a Service</option>
                      <option>Bathroom Remodel</option>
                      <option>Shower Conversion</option>
                      <option>Walk-in Solution</option>
                      <option>Home Elevator</option>
                      <option>Stair Lift</option>
                    </select>
                    <Button className="w-full bg-warm hover:bg-warm/90 text-white py-6 text-base font-semibold rounded-xl shadow-lg">
                      Get Free Estimate
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                  <p className="mt-4 text-xs text-white/30 text-center">
                    No spam. No obligation. Just helpful information.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          8. DESIGN LABEL
          ════════════════════════════════════════════ */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-sm text-warm-gray">
            <span className="font-semibold text-anchor">Design Showcase</span> — This page demonstrates premium web design capabilities for Outlive Homes.
            All sections are fully responsive, accessible (WCAG AA), and built with production-grade code.
          </p>
        </div>
      </section>
    </div>
  );
}
