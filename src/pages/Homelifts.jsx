
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ArrowRight,
  Download,
  ChevronRight,
  ShieldCheck,
  Settings2, // Shaftless Rail System
  MousePointerClick, // Easy to Operate
  Wind, // Smooth and Quiet Ride
  Users, // Built-in safety (generic)
  Clock,
  Sparkles
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


import LeadCaptureForm from "../components/LeadCaptureForm";

const featureImages = {
  quickInstallation: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8126875ed_quick-installation-feature.png",
  shaftlessRail: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/113a19b8d_Theinvisibleelevator.png",
  easyToOperate: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68aa89b09_Smallfootprint.png", // Updated image URL
  smoothRide: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/dce936dd7_smooth-and-quiet-ride-feature.png",
  safetyFeatures: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8b4dc3927_built-in-safety-feature.png",
  wheelchairFriendly: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/31d7d12e7_Wheelchairfriendlyoption2.png",
};

const stiltzLiftGenericImage = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9b3d8c_StiltzLift.png";


export default function HomeliftsPage() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  const mainFeatures = [
    {
      title: "Quick Installation",
      image: featureImages.quickInstallation,
      icon: Clock,
      description: "Professionally installed with minimal disruption to your home, often within a day."
    },
    {
      title: "The “invisible” elevator",
      image: featureImages.shaftlessRail,
      icon: Settings2,
      description: "Move your lift to another floor, and with only two slim rails remaining, you’ll hardly even notice it’s there."
    },
    {
      title: "Small footprints",
      image: featureImages.easyToOperate,
      icon: MousePointerClick,
      description: "Both Duo and Trio models have compact footprints – but the Trio Alta will still accommodate a full-sized wheelchair."
    },
    {
      title: "Smooth and Quiet Ride",
      image: featureImages.smoothRide,
      icon: Wind,
      description: "Experience exceptionally quiet and smooth travel between floors."
    },
    {
      title: "Built-In Safety Features",
      image: featureImages.safetyFeatures,
      icon: ShieldCheck,
      description: "Equipped with multiple safety sensors, battery backup, and emergency stop functions."
    },
    {
      title: "Wheelchair Friendly Options",
      image: featureImages.wheelchairFriendly,
      icon: Users,
      description: "Specific models are designed to comfortably accommodate wheelchair users."
    }
  ];

  const modelDetails = [
    {
      title: "Stiltz Duo Alta Homelift", // Kept for alt text and key
      logoUrl: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9a12b85ce_duo-alta-logo.png",
      description: "The Duo Alta Home Elevator is the perfect alternative to a stair lift or conventional hydraulic elevator. Capable of taking two passengers between floors in under 30 seconds, the Duo Alta offers freedom and flexibility that cannot be matched.",
      productImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9b4f43dec_DuoAltaPhoto.png",
    },
    {
      title: "Stiltz Trio Alta Homelift", // Kept for alt text and key
      logoUrl: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/20a8f01ea_trio-alta-logo.png",
      description: "The Trio Alta has an innovative design that can comfortably accommodate a wheelchair, while remaining compact and pleasant to the eye.",
      productImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/c08f4c98f_TrioAltaPhoto.png",
    }
  ];

  const comparisonData = [
    { feature: "Primary Use", trioAlta: "Wheelchair & Multiple Passengers", duoClassic: "Single/Dual Passenger", duoVista: "Single/Dual Passenger, Aesthetic Focus", duoAlta: "Single/Dual Passenger" },
    { feature: "Max Passengers", trioAlta: "3", duoClassic: "2", duoVista: "2", duoAlta: "2" },
    { feature: "Wheelchair Friendly", trioAlta: true, duoClassic: false, duoVista: false, duoAlta: false },
    { feature: "Footprint Size", trioAlta: "< 13.5 sq ft", duoClassic: "< 6 sq ft", duoVista: "Compact", duoAlta: "< 7 sq ft" },
    { feature: "Power Source", trioAlta: "Dedicated Circuit", duoClassic: "Standard Outlet", duoVista: "Dedicated Circuit", duoAlta: "Dedicated Circuit" },
    { feature: "Key Highlight", trioAlta: "Spacious & Luxurious", duoClassic: "No-fuss, Zero Maintenance", duoVista: "Natural Light, Blends In", duoAlta: "Space-Saving Solution" },
    { feature: "Relative Price", trioAlta: "$$$", duoClassic: "$", duoVista: "$$", duoAlta: "$$" },
  ];


  const faqs = [
    {
      question: "How much does a home elevator cost?",
      answer: "The cost of a Stiltz Home Elevator varies depending on the application. An accurate quote can be given following an initial site survey."
    },
    {
      question: "What kind of construction is required?",
      answer: "It all depends on where your Homelift is located – construction can be minimal or extensive but no supporting walls are ever required."
    },
    {
      question: "What happens if the power fails and I am in the Stiltz Homelift?",
      answer: "All Stiltz Homelifts are equipped with a battery backup. In case of a power outage to the home, the battery backup allows anyone in the lift at the time of the power failure to gently descend to the lower level of the home, exit the lift, and wait until the power comes back on."
    },
    {
      question: "Is a Stiltz Homelift suitable for wheelchairs or walkers?",
      answer: "Yes. The Stiltz Trio Alta Homelift is our widest and deepest model. It can accommodate up to three people, a full-sized wheelchair or a walker."
    },
    {
      question: "How safe is the Stiltz Homelift?",
      answer: "Safety is our number one concern. The Stiltz Homelift has safety sensors above and below the lift that immediately detect obstructions and stop the car. The lift is also fitted with weight and balance sensors."
    },
    {
      question: "What is your service area?",
      answer: "We specialize in installing Stiltz residential elevators to enhance accessibility and convenience in homes across California. Please contact us to confirm service in your specific city."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100 via-transparent to-white">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-12 sm:pb-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 text-center lg:text-left">
            <h1 className="mt-12 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Homelifts
            </h1>
            <p className="mt-8 text-lg leading-8 text-gray-600">
              With a home elevator, you will enjoy every inch of your home — downstairs and upstairs! Homelifts are the safest, most convenient, most versatile way of getting between floors when stairs have become a challenge.
            </p>
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-x-6">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setLeadFormOpen(true)}
              >
                Get a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mx-auto mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-lg mx-auto">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/f75325b4e_Homeliftherosectionphoto1.png"
                alt="Stiltz Homelift in modern home showing both floors with woman using the elevator"
                className="w-full h-auto object-contain bg-gray-900/5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stiltz Home Elevator Features Section */}
      <div className="py-20 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Stiltz Home Elevator Features</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover the innovative features that make Stiltz homelifts a leading choice for home accessibility.
            </p>
          </div>
          <div className="mt-16 sm:mt-20 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {mainFeatures.map((feature) => (
              <Card key={feature.title} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className={`w-full h-56 ${feature.title === "Small footprints" ? "object-cover object-bottom" : "object-cover"}`}
                />
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Product Models Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Find the Perfect Stiltz Homelift
            </h2>
            <p className="mt-8 text-lg text-gray-600">
              Explore our range of Stiltz models, each designed with unique benefits to suit your home and lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-16 sm:gap-y-20">
            {modelDetails.map((model) => (
              <Card key={model.title} className="overflow-hidden flex flex-col lg:max-w-3xl mx-auto w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={model.productImage}
                  alt={model.title}
                  className="h-72 w-full object-cover"
                />
                <CardHeader className="pb-6">
                  <img 
                    src={model.logoUrl} 
                    alt={`${model.title} Logo`} 
                    className="h-12 mb-6 self-start"
                  />
                  <CardDescription className="text-base text-gray-700 leading-relaxed">
                    {model.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end pt-0">
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 text-base" onClick={() => setLeadFormOpen(true)}>
                      Learn More
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 flex items-center justify-center py-3 text-base border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => window.open("https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/81a88eabb_Stiltz-US-Duo-Trio-Alta-Brochure-11-01-23-WEB.pdf", "_blank")}
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Brochure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-8 text-lg text-gray-600">
              Find answers to common questions about Stiltz homelifts.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg shadow-sm bg-white">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold text-lg hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      
      {/* Service Area Section */}
      <div className="py-20 sm:py-24 bg-blue-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Service Area</h2>
            <p className="mt-8 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                We are proud to install Stiltz residential elevators, enhancing accessibility and convenience in homes across California. Our team is ready to help you find the perfect mobility solution for your home.
            </p>
            <Button 
                className="mt-10 bg-blue-600 hover:bg-blue-700"
                onClick={() => setLeadFormOpen(true)}
            >
                Inquire About Service in Your City
                <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <Sparkles className="absolute left-1/2 top-1/4 -z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-blue-400 opacity-30 animate-pulse" />
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Enhance Your Home's Accessibility?
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-gray-300">
              Contact us today for a free, no-obligation consultation and quote for your Stiltz homelift.
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => setLeadFormOpen(true)}
              >
                Get a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#cta-gradient)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="cta-gradient">
                  <stop stopColor="#3b82f6" />
                  <stop offset={1} stopColor="#1d4ed8" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <LeadCaptureForm 
        isOpen={leadFormOpen}
        onClose={() => setLeadFormOpen(false)}
        source="homelifts"
      />
    </div>
  );
}
