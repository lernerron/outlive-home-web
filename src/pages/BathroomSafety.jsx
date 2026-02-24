
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Ruler,
  AreaChart,
  Hammer,
  CreditCard } from
"lucide-react";
import LeadCaptureForm from "../components/LeadCaptureForm";

export default function BathroomSafetyPage() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  const benefits = [
  "Barrier-free shower entry",
  "Beautiful custom designs to match your home's aesthetic",
  "Optional grab bars placed at your ideal reach",
  "Seated or standing bathing options",
  "Slip-resistant floors",
  "Modern, designer-inspired fixtures",
  "Professional installation with proven track record",
  "Same-day installation available"];


  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100 to-white">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-12 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">We’ll Help Make Your Bathing Experience Safer

            </h1>
            <p className="mt-8 text-lg leading-8 text-gray-600">
              Blue Mountain is dedicated to helping you bathe safely and
              comfortably. We have performed hundreds of bathroom remodels,
              transforming bathrooms into beautiful and safe, barrier-free
              environments.
            </p>
            <div className="mt-12 flex items-center gap-x-6">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setLeadFormOpen(true)}>

                Get a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-20 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="relative">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/152233e36_kohlrChoreograph2.png"
                  alt="Elegant accessible shower with marble-style walls"
                  className="w-full max-w-md lg:max-w-lg rounded-xl bg-white/5 shadow-2xl ring-1 ring-gray-400/10" />


                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-600 rounded-lg opacity-20 blur-2xl"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400 rounded-lg opacity-20 blur-2xl"></div>
              </div>
              <p className="text-right text-[8px] mt-1 text-gray-500">Kohler</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 gap-x-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Benefits of Our Bathroom Solutions
              </h2>
              <p className="mt-8 text-lg leading-8 text-gray-600">
                Safer and more comfortable environment without sacrificing
                style.
              </p>
              <div className="mt-12">
                <ul className="space-y-6">
                  {benefits.map((benefit, index) =>
                  <li key={index} className="flex items-center">
                      <CheckCircle2 className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="relative h-full">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/317fd6_AccessibleBathroom.jpg"
                alt="Modern accessible bathroom with roll-in shower"
                className="h-full w-full object-cover rounded-xl shadow-xl ring-1 ring-gray-400/10" />

            </div>
          </div>
        </div>
      </div>

      {/* Our Solutions Section */}
      <div className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Bathroom Solutions
            </h2>
            <p className="mt-6 sm:mt-8 text-lg leading-8 text-gray-600">
              We offer a variety of solutions to meet your specific needs,
              from full renovations to targeted safety upgrades.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24 mt-16 sm:mt-20">
            {/* Walk-In Showers */}
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  Walk-In Showers
                </h3>
                <p className="mt-4 text-gray-600">
                  A properly designed roll-in or walk-in shower can be a
                  game-changer. We eliminate barriers by making the shower
                  floor level with the bathroom floor, allowing for seamless
                  and safe access. We offer both custom tile and one-day
                  fiberglass systems.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Barrier-free, no-threshold entry</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Customizable tile or high-gloss fiberglass</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Plywood-reinforced walls for grab bar placement</span>
                  </li>
                </ul>
              </div>
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Custom tile walk-in shower"
                className="rounded-xl shadow-lg" />

            </div>

            {/* Walk-In Tubs */}
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
              <div className="lg:order-last">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/523f79347_KohlerWalk-inTub1.jpg"
                  alt="A comfortable walk-in tub with a side door"
                  className="rounded-xl shadow-lg" />


                <p className="text-right text-[8px] mt-1 text-gray-500">Kohler</p>
              </div>
              <div className="lg:order-first">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  Walk-In Tubs
                </h3>
                <p className="mt-4 text-gray-600">
                  Enjoy the therapeutic benefits of a warm bath without the
                  risk of stepping over a high tub wall. Our walk-in tubs
                  feature a low-threshold door, built-in seating, and
                  strategically placed grab bars for maximum safety and comfort.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Low 3" Step-in</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Fast-Drain Technology</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Hydrotherapy jets for relaxation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Wet Rooms */}
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  Wet Rooms
                </h3>
                <p className="mt-4 text-gray-600">
                  For the ultimate in accessibility, a wet room transforms the
                  entire bathroom into a waterproofed shower area. This open-plan
                  design removes all barriers, making it ideal for wheelchair
                  users and creating a spacious, modern aesthetic.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Completely open and barrier-free design</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Floor-level central drainage system</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Total waterproofing for ultimate peace of mind</span>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4cffb52aa_Wet-Roombyhttps-motionspotcouk.jpg"
                  alt="Spacious and modern wet room"
                  className="rounded-xl shadow-lg" />


                <p className="text-right text-[8px] mt-1 text-gray-500">Credit: MotionSpot</p>
              </div>
            </div>

            {/* Safety & Accessibility Updates */}
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
              <div className="lg:order-last">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/531adeaa4_SafteyAccessibilityUpdatesCredit-LameBlackLamb.jpg"
                  alt="Bathroom with multiple accessibility features including grab bars and shower seat"
                  className="rounded-xl shadow-lg" />


                <p className="text-right text-[8px] mt-1 text-gray-500">Credit: Lame Black Lamb</p>
              </div>
              <div className="lg:order-first">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  Safety & Accessibility Updates
                </h3>
                <p className="mt-4 text-gray-600">
                  Not every home needs a full remodel. We can significantly
                  improve your bathroom's safety with smaller, targeted
                  updates. This can include modifying an existing shower
                  threshold, or adding essential safety equipment.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Installation of grab bars and handrails</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Non-slip flooring treatments</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Raised toilets and shower seating</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Process Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-12 sm:mb-16">
              Our Process
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
            {
              title: "Free Consultation",
              description:
              "Meet our experts for personalized recommendations.",
              icon: AreaChart
            },
            {
              title: "Design & Plan ",
              description:
              "Custom designs tailored to your needs blending accessibility with aesthetics to maintain your home's character and style.",
              icon: Ruler
            },
            {
              title: "Professional Installation",
              description:
              "Efficient and respectful installers complete your remodel.",
              icon: Hammer
            },
            {
              title: "Ongoing Support",
              description:
              "Enjoy peace of mind with our lifetime customer support.",
              icon: CreditCard
            }].
            map((step, index) =>
            <Card key={index} className="text-center">
                <div className="p-8">
                  <div className="mx-auto rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-6">
                    <step.icon className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-lg font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="bg-gray-900 text-center px-6 py-24 relative isolate overflow-hidden shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Bathroom?
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-gray-300">
              Contact us today for a free consultation and estimate for your
              accessible bathroom solution.
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => setLeadFormOpen(true)}>

                Get a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true">

              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#cta-gradient)"
                fillOpacity="0.7" />

              <defs>
                <radialGradient id="cta-gradient">
                  <stop stopColor="#3b82f6" />
                  <stop offset={1} stopColor="#1e40af" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Lead Capture Form Dialog */}
      <LeadCaptureForm
        isOpen={leadFormOpen}
        onClose={() => setLeadFormOpen(false)}
        source="bathroom-safety" />

    </div>);

}