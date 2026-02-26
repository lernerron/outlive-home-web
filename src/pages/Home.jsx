import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Stethoscope,
  Stars,
  Hammer,
  Star,
  Quote,
  Shield,
  Clock,
  CheckCircle2,
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
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-300 mb-4">
              South Florida's Home Accessibility Experts
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl leading-tight">
              The Art and Science of
              <br />
              Outliving at Home
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200 max-w-xl">
              We design elegant, clinical-grade accessibility solutions that let
              you stay safely and comfortably in the home you love.
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
                image: ASSET_URLS.home.bathroomSafety,
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
              {
                title: "Ramps",
                description:
                  "In-and-out of the house solutions for easy home entry.",
                image: ASSET_URLS.home.ramps,
              },
              {
                title: "Grab Bars & Handrails",
                description:
                  "Enhance safety and mobility throughout your home with stylish, sturdy grab bars and handrails designed to blend with your decor.",
                image: ASSET_URLS.home.grabBarsHandrails,
              },
              {
                title: "Wheelchair Lifts",
                description:
                  "Provide safe, reliable access between floors for wheelchair users with our vertical platform lifts.",
                image: ASSET_URLS.home.wheelchairLifts,
              },
            ].map((product, index) => (
              <Card key={index} className="overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
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
                image: ASSET_URLS.home.bathroomSafety,
              },
              {
                title: "Shower Conversions",
                description: "Convert your tub to a shower or your shower to a tub.",
                image: ASSET_URLS.brand.heroBackground,
              },
              {
                title: "Walk-in Solutions",
                description: "Safe, accessible walk-in showers and baths for comfort and independence.",
                image: ASSET_URLS.home.grabBarsHandrails,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
                onClick={() => setLeadFormOpen(true)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                step: 1,
                title: "Free Consultation",
                description:
                  "We visit your home, assess your needs, and discuss solutions — no obligation, no pressure.",
              },
              {
                step: 2,
                title: "Design & Estimate",
                description:
                  "Our team designs a custom plan tailored to your home, needs, and budget. You'll know exactly what to expect.",
              },
              {
                step: 3,
                title: "Professional Installation",
                description:
                  "Our skilled installers complete your project efficiently and respectfully, backed by our lifetime warranty.",
              },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-7">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Customers Choose Us Section */}
      <div id="why-us" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Why Customers Choose Us
            </h2>
            <p className="text-lg text-gray-600 mb-12 sm:mb-16">
              Our commitment to excellence sets us apart in every aspect of home
              accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-16 lg:gap-28">
            {/* Clinical-Led Design */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start">
              <div className="flex flex-col justify-center lg:pr-8">
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Stethoscope className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Clinical-Led Design
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-600 leading-8">
                  We combine clinical insight with construction know-how. Our
                  design process is led by licensed occupational therapists who
                  specialize in accessibility and universal design principles.
                  They assess your mobility, safety, and functional needs,
                  crafting elegant solutions that meet today's challenges and
                  anticipate tomorrow's.
                </p>
              </div>
              <div className="relative h-full flex items-center">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Clinical Assessment"
                    className="h-full w-full object-cover object-center shadow-xl"
                  />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-lg opacity-20 blur-2xl"></div>
                </div>
              </div>
            </div>

            {/* Exceptional Quality and Craftsmanship */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start">
              <div className="flex flex-col justify-center lg:order-2 lg:pl-8">
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Hammer className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Exceptional Quality and Craftsmanship
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-600 leading-8">
                  Quality craftsmanship defines every project we undertake. Our
                  team of skilled professionals adheres to the highest industry
                  standards, ensuring every modification—be it a simple grab bar
                  installation or a full-scale accessible remodel—is executed
                  flawlessly. We combine premium materials, advanced techniques,
                  and rigorous quality control processes to deliver durable,
                  beautiful, and safe living spaces.
                </p>
              </div>
              <div className="relative h-full flex items-center lg:order-1">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2531&q=80"
                    alt="Quality Craftsmanship"
                    className="h-full w-full object-cover object-center shadow-xl"
                  />
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-600 rounded-lg opacity-20 blur-2xl"></div>
                </div>
              </div>
            </div>

            {/* Unparalleled Customer Service */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start">
              <div className="flex flex-col justify-center lg:pr-8">
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Stars className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Unparalleled Customer Service
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-600 leading-8">
                  Your satisfaction drives everything we do. We earned a
                  distinguished reputation by delivering exceptional service,
                  every time. Your dedicated concierge will start by listening
                  closely, follow through with precise attention to detail, and
                  finish only when you're fully satisfied. Our satisfaction
                  guarantee means we stand behind our work, ensuring each step
                  from initial consultation to final walkthrough exceeds your
                  expectations.
                </p>
              </div>
              <div className="relative h-full flex items-center">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Customer Satisfaction"
                    className="h-full w-full object-cover object-center shadow-xl"
                  />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-lg opacity-20 blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Testimonial */}
      <div className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Quote className="mx-auto h-10 w-10 text-blue-200 mb-8" />
          <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed text-gray-900 mb-8">
            "This was the best experience we've ever had with a home renovation.
            The team was professional, listened to everything we needed, and
            delivered beyond our expectations. Our bathroom is now safe, beautiful,
            and exactly what we envisioned."
          </blockquote>
          <div className="flex items-center justify-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-orange-500 text-orange-500" />
            ))}
          </div>
          <p className="font-semibold text-gray-900">Maria R.</p>
          <p className="text-sm text-gray-500">Verified Customer &middot; Miami, FL</p>
        </div>
      </div>

      {/* Inline Lead Capture Section */}
      <div className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                Want more info? We've got you.
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-8">
                Get a free, no-obligation consultation. Our experts will visit
                your home, assess your needs, and design the perfect solution —
                all at no cost to you.
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
