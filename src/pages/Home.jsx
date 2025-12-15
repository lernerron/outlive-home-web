import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BadgeCheck,
  Heart,
  Home as HomeIcon,
  Key,
  Phone,
  Shield,
  ShowerHead,
  Footprints,
  ArrowRight,
  Stethoscope,
  Stars,
  Hammer,
  Network,
  Workflow,
  UserCheck,
  Link2,
  Quote } from
"lucide-react";
import LeadCaptureForm from "../components/LeadCaptureForm"; // Changed from EstimateForm
import Logo from "../components/Logo";
import { AreaChart, Ruler, CreditCard, Star } from 'lucide-react';

export default function HomePage() {
  const [leadFormOpen, setLeadFormOpen] = useState(false); // Changed state variable name

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-blue-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }} />

        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl text-center px-6 lg:px-8">
            <div className="flex justify-center mb-10">
              <Logo className="h-24" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Live Comfortably in the Home You Love

            </h1>
            <p className="text-gray-600 my-10 text-base sm:text-lg leading-8">

            </p>
            <div className="mt-12 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setLeadFormOpen(true)} // Updated onClick handler
              >
                Get a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Our Expertise Section */}
      <div className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Our Expertise
            </h2>
            <p className="text-lg text-gray-600 mb-12 sm:mb-16">We design solutions that fit your home and your personal needs.

            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16 sm:mb-20">
            {[
            {
              title: "Bathroom Safety",
              description: "From minor modifications such as grab bars and shower seats to full renovations, we help you navigate your bathroom safely and comfortably.",
              image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/317fd6_AccessibleBathroom.jpg",
              link: createPageUrl('BathroomSafety')
            },
            {
              title: "Home Elevators",
              description: "Safe, reliable, and elegant home elevators for seamless floor-to-floor access.",
              image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9b3d8c_StiltzLift.png",
              link: createPageUrl('Homelifts')
            },
            {
              title: "Stair Lifts",
              description: "Glide up and down your stairs with a gentle, smooth ride from start to finish",
              image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/f49588477_Bruno-Elan-SRE-3050-Stairlift-Bottom-Of-Stairs-2.png",
              link: createPageUrl('StairLift') // Changed 'StairLifts' to 'StairLift' as per outline
            },
            {
              title: "Ramps",
              description: "In-and-out of the House Solutions for easy home entry.",
              image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/673f08be2_Ramps.jpg",
              link: createPageUrl('Ramps')
            },
            {
              title: "Grab Bars & Handrails",
              description: "Enhance safety and mobility throughout your home with stylish, sturdy grab bars and handrails designed to blend with your decor.",
              image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/10bde6_Handrails2.jpg",
              link: createPageUrl('GrabBarsHandrails')
            },
            {
              title: "Wheelchair Lifts",
              description: "Provide safe, reliable access between floors for wheelchair users with our vertical platform lifts.",
              image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4239901fe_WheelchairLift-harmar-highlanderii-l-bap-lpr.jpg"
            }].
            map((product, index) =>
            <Card key={index} className="overflow-hidden group relative flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img
                  src={product.image}
                  alt={product.title}
                  className={`h-full w-full object-cover object-center ${product.link ? "group-hover:scale-105 transition-transform duration-300" : ""}`} />

                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    {product.link &&
                  <ArrowRight className="h-5 w-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  }
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
                  {product.link &&
                <div className="mt-auto">
                      <Link
                    to={product.link}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 text-sm">

                        Learn more
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                }
                </div>
                {product.link &&
              <Link
                to={product.link}
                className="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                aria-hidden="true" />

              }
              </Card>
            )}
          </div>

          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setLeadFormOpen(true)}> {/* Updated onClick handler */}
              Get a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
              title: "Free Home Visit and Consultation",
              description: "Meet our experts for personalized recommendations.",
              icon: AreaChart
            },
            {
              title: "Design and Customize",
              description: "Custom designs tailored to your needs blending accessibility with aesthetics to maintain your home's character and style.",
              icon: Ruler
            },
            {
              title: "Professional Installation",
              description: "Efficient and respectful installers complete your remodel.",
              icon: Hammer
            },
            {
              title: "Enjoy and Relax",
              description: "Enjoy peace of mind with our lifetime warranty.",
              icon: Heart
            }].
            map((step, index) =>
            <Card key={index} className="text-center">
                <div className="p-6 sm:p-8">
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

      {/* Why Customers Choose Blue Mountain Living Section Header */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Why Customers Choose Us

            </h2>
            <p className="text-lg text-gray-600 mb-12 sm:mb-16">
              Our commitment to excellence sets us apart in every aspect of home accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-16 lg:gap-28">
            {/* Clinical-Led Design Section */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start">
              <div className="flex flex-col justify-center lg:pr-8">
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Stethoscope className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Clinical-Led Design</h2>
                </div>
                <p className="text-base sm:text-lg text-gray-600 leading-8">
                  We combine clinical insight with construction know-how. Our design process is led by licensed occupational therapists who specialize in accessibility and universal design principles. They assess your mobility, safety, and functional needs, crafting elegant solutions that meet today's challenges and anticipate tomorrow's.
                </p>
              </div>
              <div className="relative h-full flex items-center">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="Clinical Assessment"
                    className="h-full w-full object-cover object-center shadow-xl" />

                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-lg opacity-20 blur-2xl"></div>
                </div>
              </div>
            </div>

            {/* Exceptional Quality and Craftsmanship Section */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start">
              <div className="flex flex-col justify-center lg:order-2 lg:pl-8">
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Hammer className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Exceptional Quality and Craftsmanship</h2>
                </div>
                <p className="text-base sm:text-lg text-gray-600 leading-8">
                  Quality craftsmanship defines every project we undertake. Our team of skilled professionals adheres to the highest industry standards, ensuring every modification—be it a simple grab bar installation or a full-scale accessible remodel—is executed flawlessly. We combine premium materials, advanced techniques, and rigorous quality control processes to deliver durable, beautiful, and safe living spaces.
                </p>
              </div>
              <div className="relative h-full flex items-center lg:order-1">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2531&q=80"
                    alt="Quality Craftsmanship"
                    className="h-full w-full object-cover object-center shadow-xl" />

                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-600 rounded-lg opacity-20 blur-2xl"></div>
                </div>
              </div>
            </div>

            {/* Unparalleled Customer Service Section */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start">
              <div className="flex flex-col justify-center lg:pr-8">
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Stars className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Unparalleled Customer Service</h2>
                </div>
                <p className="text-base sm:text-lg text-gray-600 leading-8">
                  Your satisfaction drives everything we do. We earned a distinguished reputation by delivering exceptional service, every time. Your dedicated concierge will start by listening closely, follow through with precise attention to detail, and finish only when you're fully satisfied. Our satisfaction guarantee means we stand behind our work, ensuring each step from initial consultation to final walkthrough exceeds your expectations. Trust is not just a claim; it's something we continually earn.
                </p>
              </div>
              <div className="relative h-full flex items-center">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="Customer Satisfaction"
                    className="h-full w-full object-cover object-center shadow-xl" />

                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-lg opacity-20 blur-2xl"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to Upgrade Your Home?

            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-gray-300">
              Our team of experts will help you find the perfect solution to meet your needs and budget.
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => setLeadFormOpen(true)} // Updated onClick handler
              >
                Get a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true">

              <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
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
        source="homepage" // Added source prop
      />
    </div>);

}