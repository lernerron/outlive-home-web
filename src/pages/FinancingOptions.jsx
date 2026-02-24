import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  Percent,
  Award,
  Users,
  FileText,
  ThumbsUp
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LeadCaptureForm from '../components/LeadCaptureForm';

export default function FinancingOptionsPage() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  const benefits = [
    {
      title: "Flexible Plans",
      description: "Find a payment plan that fits your budget. We offer a variety of options, including zero-interest plans for qualifying applicants.",
      icon: Percent,
    },
    {
      title: "Simple & Confidential Application",
      description: "Our application process is quick and easy. Your personal information is always kept secure and confidential.",
      icon: FileText,
    },
    {
      title: "Fast Approval Decisions",
      description: "Receive a decision quickly, often within minutes, so you can move forward with your project without delay.",
      icon: ThumbsUp,
    }
  ];

  const faqs = [
    {
      question: "What kind of financing plans do you offer?",
      answer: "We offer a range of flexible financing plans to suit different budgets. This includes options with low monthly payments and, for qualifying applicants, special promotions like zero-interest plans. We'll discuss all available options during your free consultation."
    },
    {
      question: "How do I apply for financing?",
      answer: "The application process is simple and straightforward. You can apply during your free in-home consultation with the help of our specialist. They will guide you through the required information and submit the application for a quick decision."
    },
    {
      question: "Can I combine a discount with a financing offer?",
      answer: "Yes! We are happy to allow qualifying customers to combine our Military or Senior Citizen discounts with a financing plan. Our goal is to make your project as affordable as possible."
    },
    {
      question: "What information is needed to apply?",
      answer: "Typically, you will need to provide basic personal and financial information. Our financing partners use this to make a credit decision. The entire process is handled securely and confidentially."
    },
    {
      question: "Is there a penalty for paying off the loan early?",
      answer: "Most of our financing plans do not have any prepayment penalties, allowing you the flexibility to pay off your balance at any time. We recommend confirming the specific terms of the plan you select."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 sm:pb-32 lg:flex lg:items-center lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-12 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Affordable Financing For Your Home Accessibility Project
            </h1>
            <p className="mt-8 text-lg leading-8 text-gray-600">
              We help make your project more affordable with convenient financing options available to qualifying applicants. Realize your home improvement dreams without the upfront financial burden.
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
              <img
                src="https://images.unsplash.com/photo-1579621970795-87f5a3a18a58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Affordable financing options"
                className="w-full max-w-md lg:max-w-lg rounded-xl bg-white/5 shadow-2xl ring-1 ring-gray-400/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Finance Your Project with Confidence
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our goal is to provide a simple, transparent, and beneficial financing experience from start to finish.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center p-6 hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-col items-center">
                  <div className="p-4 bg-blue-100 rounded-full mb-4">
                    <benefit.icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Discounts Section */}
      <div className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              We Proudly Support Our Community
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              As a thank you for your service and contributions, we are honored to offer special discounts.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-lg text-center">
              <Award className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900">Military Discount</h3>
              <p className="mt-4 text-gray-600">
                We thank all active-duty military members and veterans for their service with a special discount on our services.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-lg text-center">
              <Users className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900">Senior Citizen Discount</h3>
              <p className="mt-4 text-gray-600">
                We offer a special discount for senior citizens to help make aging-in-place modifications more affordable.
              </p>
            </div>
          </div>
          <p className="text-center mt-8 text-gray-600">Please mention these discounts during your consultation to apply them to your project estimate.</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 sm:py-24">
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

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Discuss Your Project?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Let's explore your options. Schedule a free, no-obligation consultation to get a project estimate and learn more about our financing plans.
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

      <LeadCaptureForm
        isOpen={leadFormOpen}
        onClose={() => setLeadFormOpen(false)}
        source="financing-options"
      />
    </div>
  );
}