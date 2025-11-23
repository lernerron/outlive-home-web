
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Clock,
  Wrench,
  ShowerHead,
  Sparkles,
  Heart,
  Users,
  Settings
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LeadCaptureForm from "../components/LeadCaptureForm";

export default function SafeShowersPage() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  const walkInFeatures = [
    "Low or no-threshold entry",
    "Slip-resistant flooring",
    "Built-in seating",
    "Grab bars",
    "Handheld shower heads",
    "Frameless glass doors",
    "Designer tile options"
  ];

  const customizationOptions = [
    {
      title: "Bench or seat",
      description: "For safer, more comfortable bathing"
    },
    {
      title: "Recessed shelving",
      description: "For easy access to toiletries"
    },
    {
      title: "Handheld sprayers",
      description: "For flexibility and easier cleaning"
    },
    {
      title: "Designer glass doors",
      description: "For a sleek, open look"
    }
  ];

  const safetyFeatures = [
    "Grab bars and support rails",
    "Non-slip floors and mats",
    "Roll-in showers or walk-in tubs",
    "Shower seating and raised toilet seats",
    "Improved lighting and visibility"
  ];

  const whyChooseReasons = [
    "20+ years of remodeling experience",
    "Certified Aging-in-Place Specialists (CAPS)",
    "Expert installers and licensed contractors",
    "High customer satisfaction (4.8★ average rating)",
    "Free in-home consultations",
    "Competitive pricing and financing available"
  ];

  const faqs = [
    {
      question: "How long does a bathroom remodel take?",
      answer: "Most of our bathroom remodels can be completed in as little as one day. The timeline depends on the scope of work, but we strive to minimize disruption to your daily routine while maintaining the highest quality standards."
    },
    {
      question: "What financing options do you offer?",
      answer: "We offer competitive pricing and various financing options to make your bathroom remodel affordable. During your free consultation, we'll discuss financing plans that work best for your budget."
    },
    {
      question: "Do I need permits?",
      answer: "Permit requirements vary by location and scope of work. Our team will handle all necessary permits and ensure your remodel meets local building codes and accessibility standards."
    },
    {
      question: "Can you work with my occupational therapist?",
      answer: "Absolutely! We regularly collaborate with occupational therapists and healthcare professionals to ensure your bathroom modifications meet your specific medical and mobility needs."
    },
    {
      question: "Is the remodel covered by insurance or grants?",
      answer: "Some accessibility modifications may be covered by insurance or available grants. We can help you explore these options and provide the necessary documentation for potential coverage."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100 to-white">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 sm:pb-32 lg:flex lg:items-center lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-12 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transform Your Bathroom into a Safer, More Comfortable Space
            </h1>
            <p className="mt-8 text-lg leading-8 text-gray-600">
              From modern walk-in showers to full accessibility upgrades, Blue Mountain helps you remodel with confidence—quickly, affordably, and beautifully.
            </p>
            <div className="mt-12 flex items-center gap-x-6">
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
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-20 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Elegant walk-in shower with grab bars and seating"
                  className="w-full max-w-md lg:max-w-lg rounded-xl bg-white/5 shadow-2xl ring-1 ring-gray-400/10"
                />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-600 rounded-lg opacity-20 blur-2xl"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400 rounded-lg opacity-20 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Remodel Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              A Better Bathroom Begins Here
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The bathroom is one of the most-used rooms in any home—and often the first to show its age. Whether you're seeking style, safety, or both, Blue Mountain brings you expert craftsmanship and aging-in-place know-how to create the ideal space for your needs.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Walk-in shower installations", icon: ShowerHead },
                { title: "Tub-to-shower conversions", icon: Settings },
                { title: "Accessibility upgrades", icon: Shield },
                { title: "Full bathroom remodels", icon: Sparkles }
              ].map((specialty, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow p-4">
                  <CardHeader>
                    <div className="mx-auto p-3 bg-blue-100 rounded-full w-fit mb-4">
                      <specialty.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{specialty.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600">
              Let us help you love your bathroom again—and keep you or your loved ones safe at home.
            </p>
          </div>
        </div>
      </div>

      {/* Walk-in Showers Section */}
      <div className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 gap-x-16 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                Elegant, Accessible Showers for Every Need
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Walk-in showers are ideal for anyone seeking improved safety, style, or space. We design every installation around your needs—mobility, comfort, and design preferences.
              </p>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-gray-900">Standard features include:</h3>
                <ul className="space-y-3">
                  {walkInFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <p className="text-gray-600">
                Whether you're aging in place or upgrading for modern comfort, our walk-in showers combine function and beauty in every detail.
              </p>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                alt="Modern walk-in shower with glass doors"
                className="rounded-xl shadow-xl ring-1 ring-gray-400/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customization Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Enhance Comfort and Convenience
            </h2>
            <p className="text-lg text-gray-600 mb-12 sm:mb-16">
              Every remodel is tailored to your lifestyle. Consider adding:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {customizationOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow p-4">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Design Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 gap-x-16 lg:grid-cols-2 items-center">
            <div className="relative lg:order-last">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Senior-friendly bathroom with safety features"
                className="rounded-xl shadow-xl ring-1 ring-gray-400/10"
              />
            </div>
            
            <div className="lg:order-first">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-full">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Designed for Independence and Peace of Mind
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 mb-8">
                We integrate safety features into every remodel to support aging-in-place or disability needs:
              </p>
              
              <ul className="space-y-4">
                {safetyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-gray-600 mt-8">
                Every element is designed with accessibility, comfort, and dignity in mind.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-blue-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Stress-Free from Start to Finish
            </h2>
            <p className="text-lg text-gray-600 mb-12 sm:mb-16">
              We make remodeling smooth and efficient—with minimal disruption to your life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "We assess your current bathroom and understand your goals.",
                icon: Users
              },
              {
                step: "2", 
                title: "Design",
                description: "You'll receive a custom plan and 3D renderings.",
                icon: Settings
              },
              {
                step: "3",
                title: "Installation", 
                description: "Our trained crews complete your project professionally—sometimes in as little as one day.",
                icon: Wrench
              }
            ].map((process, index) => (
              <Card key={index} className="text-center bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">
                    {process.step}
                  </div>
                  <CardTitle className="text-xl">{process.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{process.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700">
              Your dedicated project manager will guide you every step of the way.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              A Trusted Partner in Safe, Accessible Living
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {whyChooseReasons.map((reason, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{reason}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700">
              We're more than contractors—we're your partner in creating a safer, more comfortable home.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-12 sm:mb-16">
              Frequently Asked Questions
            </h2>
          </div>
          
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

      {/* Final CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Remodel Your Bathroom?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Book a free in-home consultation or schedule a call with our team today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
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
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#cta-gradient)" fillOpacity="0.7" />
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
        source="safe-showers"
      />
    </div>
  );
}
