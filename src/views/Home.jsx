"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  PenRuler,
  Wrench,
} from "lucide-react";
import LeadCaptureForm from "../components/LeadCaptureForm";
import InlineLeadForm from "../components/InlineLeadForm";
import { ASSET_URLS } from "@/lib/assets";

export default function HomePage() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Hero section — full-bleed background */}
      <div className="relative isolate min-h-[85vh] flex items-center">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${ASSET_URLS.brand.heroBackground})` }}
        />
        <div className="absolute inset-0 -z-10 bg-black/45" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl leading-tight">
              Outlive at Home
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200 max-w-xl">
              We design elegant bathroom and access solutions that let you stay
              safe and comfortable in the home you love for decades to come.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setLeadFormOpen(true)}
              >
                Get a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <a
                href="#solutions"
                className="text-sm font-semibold text-white hover:text-gray-200 flex items-center"
              >
                See Our Solutions <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Star Social Proof Badge */}
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-orange-500 text-orange-500" />
              ))}
            </div>
            <span className="text-white font-semibold text-sm sm:text-base">
              5-Star Rated Service
            </span>
          </div>
        </div>
      </div>

      {/* Our Expertise Section */}
      <div id="solutions" className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Our Expertise
            </h2>
            <p className="text-lg text-gray-600 mb-12 sm:mb-16">
              We design solutions that fit your home and your personal needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16 sm:mb-20">
            {[
              {
                title: "Bathroom Safety",
                description:
                  "From minor modifications such as grab bars and shower seats to full renovations, we help you navigate your bathroom safely and comfortably.",
                image: ASSET_URLS.home.bathroomSafetyCard,
              },
              {
                title: "Home Elevators",
                description:
                  "Safe, reliable, and elegant home elevators for seamless floor-to-floor access.",
                image: ASSET_URLS.home.homeElevators,
              },
              {
                title: "Stair Lifts",
                description:
                  "Glide up and down your stairs with a gentle, smooth ride from start to finish.",
                image: ASSET_URLS.home.stairLifts,
              },
            ].map((product, index) => (
              <Card key={index} className="overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    {product.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setLeadFormOpen(true)}
            >
              Get a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bathroom Solutions Showcase — LeafHome-style image overlay cards */}
      <div className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Simple solutions. Big results.
            </h2>
            <p className="text-lg text-gray-600">
              We combine style and functionality to design a bathroom you love.
              And use quality craftsmanship that's built to last.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
                onClick={() => setLeadFormOpen(true)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Process Section — 3 numbered steps */}
      <div id="process" className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your project done right.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Phone,
                title: "Free Consultation",
                description:
                  "We visit your home, assess your needs, and discuss solutions — no obligation, no pressure.",
              },
              {
                icon: PenRuler,
                title: "Design & Estimate",
                description:
                  "Our team designs a custom plan tailored to your home, needs, and budget. You'll know exactly what to expect.",
              },
              {
                icon: Wrench,
                title: "Professional Installation",
                description:
                  "Our skilled installers complete your project efficiently and respectfully, backed by our lifetime warranty.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #24477F 0%, #051C2C 100%)",
                      boxShadow: "0 8px 24px rgba(5, 28, 44, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                      transform: "rotate(-6deg)",
                    }}
                  >
                    <step.icon
                      className="h-9 w-9 text-white"
                      style={{ transform: "rotate(6deg)" }}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-7">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Customers Choose Us Section */}
      <section id="why-us" className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              Why Customers Choose Us
            </h2>
            <p className="text-lg text-gray-600">
              Our commitment to excellence sets us apart in every aspect of home
              accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
              {
                icon: Stars,
                title: "Unparalleled Service",
                image: ASSET_URLS.whyUs.customerService,
                alt: "Customer Satisfaction",
                description:
                  "Your dedicated concierge listens closely, follows through with precision, and doesn't stop until you're fully satisfied. We stand behind every project with our satisfaction guarantee.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-blue-100">
                      <item.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-base text-gray-600 leading-7">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="bg-anchor hover:bg-navy text-white"
              onClick={() => setLeadFormOpen(true)}
            >
              Get Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Inline Lead Capture Section */}
      <div className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                Want more info? We've got you.
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-8">
                Get a free, no-obligation consultation. Our experts will call
                you, assess your needs, and help you understand our solutions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Licensed &amp; insured professionals</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">We'll respond within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Lifetime warranty on all installations</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
              <InlineLeadForm source="homepage-inline" />
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Form Dialog */}
      <LeadCaptureForm
        isOpen={leadFormOpen}
        onClose={() => setLeadFormOpen(false)}
        source="homepage"
      />
    </div>
  );
}
