"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Shield,
  Award,
  BadgeCheck,
  CalendarClock,
  Stethoscope,
  Bell,
  Phone,
  Ruler,
  Wrench,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { submitLead } from "@/api/leads";
import { trackEvent } from "@/lib/analytics";

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

const ROLE_OPTIONS = [
  "Occupational Therapist",
  "Physical Therapist",
  "Discharge Planner",
  "Geriatric Care Manager",
  "Other",
];

function PartnerInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    role: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatPhoneNumber = (value) => {
    const clean = value.replace(/\D/g, "");
    if (clean.length >= 6)
      return `(${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(6, 10)}`;
    if (clean.length >= 3) return `(${clean.slice(0, 3)}) ${clean.slice(3)}`;
    return clean;
  };

  const handleInputChange = (name, value) => {
    let processed = value;
    if (name === "phone") processed = formatPhoneNumber(value);
    setFormData((prev) => ({ ...prev, [name]: processed }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Required";
    if (!formData.organization.trim()) errs.organization = "Required";
    if (!formData.role) errs.role = "Required";
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      errs.email = "Valid email required";
    if (
      !formData.phone.trim() ||
      formData.phone.replace(/\D/g, "").length < 10
    )
      errs.phone = "Valid phone required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setErrors({});
    try {
      await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ""),
        organization: formData.organization,
        role: formData.role,
        message: formData.message,
        leadType: "partner",
        source: "partners-page",
      });
      setIsSubmitted(true);
      trackEvent("lead_submit", { source: "partners-page", type: "partner" });
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 mb-6">
          <CheckCircle2 className="h-8 w-8 text-white" />
        </div>
        <h3
          className="text-2xl font-bold text-white mb-3"
          style={{ fontFamily: playfair }}
        >
          Thank You
        </h3>
        <p className="text-white/70">
          Our partnerships team will contact you within one business day.
        </p>
      </div>
    );
  }

  const labelClass = "text-sm font-medium text-white/80 mb-1.5";
  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-white/30 bg-white/15 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-warm focus:border-warm transition-colors duration-200";
  const errorMsgClass = "mt-1 text-xs text-warm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="partner-name" className={labelClass}>
            Full Name *
          </Label>
          <input
            id="partner-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Your full name"
            className={`${inputClass} ${errors.name ? "border-warm" : ""}`}
            autoComplete="name"
          />
          {errors.name && <p className={errorMsgClass}>{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="partner-org" className={labelClass}>
            Organization *
          </Label>
          <input
            id="partner-org"
            type="text"
            value={formData.organization}
            onChange={(e) => handleInputChange("organization", e.target.value)}
            placeholder="Hospital, practice, or agency"
            className={`${inputClass} ${errors.organization ? "border-warm" : ""}`}
            autoComplete="organization"
          />
          {errors.organization && (
            <p className={errorMsgClass}>{errors.organization}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="partner-role" className={labelClass}>
          Your Role *
        </Label>
        <select
          id="partner-role"
          value={formData.role}
          onChange={(e) => handleInputChange("role", e.target.value)}
          className={`${inputClass} appearance-none ${errors.role ? "border-warm" : ""}`}
        >
          <option value="" className="text-text-body">
            Select your role...
          </option>
          {ROLE_OPTIONS.map((role) => (
            <option key={role} value={role} className="text-text-body">
              {role}
            </option>
          ))}
        </select>
        {errors.role && <p className={errorMsgClass}>{errors.role}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="partner-email" className={labelClass}>
            Email *
          </Label>
          <input
            id="partner-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="you@organization.com"
            className={`${inputClass} ${errors.email ? "border-warm" : ""}`}
            autoComplete="email"
          />
          {errors.email && <p className={errorMsgClass}>{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="partner-phone" className={labelClass}>
            Phone *
          </Label>
          <input
            id="partner-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="(305) 555-1234"
            className={`${inputClass} ${errors.phone ? "border-warm" : ""}`}
            autoComplete="tel"
          />
          {errors.phone && <p className={errorMsgClass}>{errors.phone}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="partner-message" className={labelClass}>
          Message (Optional)
        </Label>
        <textarea
          id="partner-message"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          placeholder="Tell us about your practice and how we can help your patients..."
          rows={3}
          className={`${inputClass} resize-none md:h-32`}
        />
      </div>

      {errors.submit && (
        <div className="p-3 bg-warm/10 border border-warm/30 rounded-xl">
          <p className="text-sm text-warm flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {errors.submit}
          </p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-blue hover:bg-blue/90 text-white py-6 text-base font-semibold rounded-full shadow-lg shadow-blue/20"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Become a Partner
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
}

export default function Partners() {
  return (
    <div className="bg-white overflow-hidden">
      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-navy">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 75% 50%, #24477F 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full py-24 sm:py-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 text-warm text-sm font-semibold tracking-[0.2em] uppercase">
                <span className="w-8 h-px bg-warm" />
                Healthcare Partnerships
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]"
              style={{ fontFamily: playfair }}
            >
              Your Patients Need Their Homes Modified.{" "}
              <span className="text-warm">We Make It Happen.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 text-lg sm:text-xl leading-relaxed text-white/75 max-w-xl"
            >
              Coordinating home modifications for patients is time-consuming and
              hard to quality-control. We handle everything &mdash; so you can
              focus on patient care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-10"
            >
              <a
                href="#partner-form"
                className="inline-flex items-center bg-blue hover:bg-blue/90 text-white px-8 py-4 text-base font-semibold rounded-full shadow-lg shadow-blue/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Become a Partner
                <ArrowRight className="ml-2 h-5 w-5" />
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
              <BadgeCheck className="h-4 w-4" /> Professional Credentials
            </span>
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════
          PARTNER BENEFITS
          ═══════════════════════════════════════ */}
      <section className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="text-warm font-semibold text-sm tracking-[0.2em] uppercase">
                Why Partner With Us
              </span>
              <h2
                className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                Better Outcomes for Your Patients
              </h2>
              <p className="mt-6 text-lg text-text-body/70 leading-relaxed">
                When you refer patients to Outlive Homes, you get a trusted
                partner who communicates, coordinates, and delivers.
              </p>
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
                icon: CalendarClock,
                title: "Priority Scheduling",
                description:
                  "Your patients get seen first. We prioritize referrals from healthcare partners to minimize wait times — especially for urgent post-fall or post-surgery cases.",
              },
              {
                icon: Stethoscope,
                title: "Clinical Coordination",
                description:
                  "We work with your care plan. Share therapy goals and mobility assessments, and we'll design the modification to support your treatment plan.",
              },
              {
                icon: Bell,
                title: "Patient Updates",
                description:
                  "You stay informed on project progress. From assessment to installation, we keep you in the loop so you can update patients and families with confidence.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background:
                      "linear-gradient(135deg, #24477F 0%, #051C2C 100%)",
                    boxShadow:
                      "0 6px 20px rgba(5, 28, 44, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3
                  className="text-xl font-bold text-anchor mb-3"
                  style={{ fontFamily: playfair }}
                >
                  {benefit.title}
                </h3>
                <p className="text-text-body/70 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW WE WORK TOGETHER
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
                How We Work With Partners
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
                title: "You Refer a Patient",
                description:
                  "Submit a referral through this form or call us directly. Include any relevant care plans or mobility assessments to help us prepare.",
              },
              {
                icon: Ruler,
                step: "02",
                title: "We Assess & Coordinate",
                description:
                  "We schedule an in-home assessment, design the modification to support your treatment plan, and provide a fixed quote to the patient.",
              },
              {
                icon: Wrench,
                step: "03",
                title: "You Get Updates",
                description:
                  "We keep you informed throughout the project. When installation is complete, we send a summary so you can update the patient's care record.",
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
          OUTLIVEHOME.ORG CROSS-LINK
          ═══════════════════════════════════════ */}
      <section className="bg-bg-gray py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-warm font-semibold text-sm tracking-[0.2em] uppercase">
                Our Nonprofit Partner
              </span>
              <h2
                className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-anchor"
                style={{ fontFamily: playfair }}
              >
                OutliveHome.org
              </h2>
              <p className="mt-6 text-lg text-text-body/70 leading-relaxed">
                Outlive Homes works alongside OutliveHome.org, our nonprofit
                partnership platform dedicated to connecting people with the
                resources they need to age safely at home. The platform brings
                together healthcare providers, community organizations, and home
                accessibility professionals.
              </p>
              <a
                href="https://www.outlivehomes.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 bg-navy hover:bg-anchor text-white px-8 py-4 text-base font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Visit OutliveHome.org
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PARTNER INQUIRY FORM
          ═══════════════════════════════════════ */}
      <section id="partner-form" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 75% 50%, #24477F 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal>
              <div>
                <span className="text-warm font-semibold text-sm tracking-[0.2em] uppercase">
                  Get Started
                </span>
                <h2
                  className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
                  style={{ fontFamily: playfair }}
                >
                  Partner With{" "}
                  <span className="text-warm">Outlive Homes</span>
                </h2>
                <p className="mt-6 text-lg text-white/60 leading-relaxed">
                  Join our network of healthcare partners. We&rsquo;ll work with
                  your care plans, prioritize your patients, and keep you
                  informed every step of the way.
                </p>
                <div className="mt-10 space-y-5">
                  {[
                    {
                      icon: CalendarClock,
                      text: "Priority scheduling for partner referrals",
                    },
                    {
                      icon: Stethoscope,
                      text: "Coordination with your care plans",
                    },
                    {
                      icon: Bell,
                      text: "Progress updates throughout the project",
                    },
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
                      <span className="text-white/80 font-medium">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-3 bg-warm/10 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/15 shadow-2xl">
                  <PartnerInquiryForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
