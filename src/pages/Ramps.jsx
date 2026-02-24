
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Construction, Leaf } from "lucide-react";
import LeadCaptureForm from "../components/LeadCaptureForm";

export default function RampsPage() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  const rampTypes = [
  {
    title: "Threshold & Portable Ramps",
    description: "There is a wide variety of ramping solutions for dealing with those small changes in elevation. Blue Mountain Living is a dealer for many brands of threshold ramps and can help you select the best ramp for your specific needs.",
    image: "https://images.unsplash.com/photo-1618123789434-5f5323e980a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    title: "Modular Ramps",
    description: "Modular Ramps are designed to address the accessibility needs of the residential market. The EZ-ACCESS Modular Ramp system is an excellent choice when accessibility needs extend beyond the scope of a portable ramp. The efficient design uses less hardware.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/673f08be2_Ramps.jpg"
  },
  {
    title: "Custom Ramps",
    description: "For the ultimate in accessibility and aesthetics a built-in place ramp is the best option. Ramps that are custom built allow for designs and sizes which are done specific to the site and can blend into a home’s architecture.",
    image: "https://images.unsplash.com/photo-1588821321528-9d4a4a8d011f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  }];


  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1599751449208-e4f04b2a472c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80"
            alt="A wooden ramp leading to a modern home."
            className="h-full w-full object-cover" />

          <div className="absolute inset-0 bg-gray-900/60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Ramps

            </h1>
            <p className="mt-8 text-lg leading-8 text-gray-300">
              We construct and install ramps of all types. Whether you're looking for an aluminum modular ramp or a custom built-in solution, we have the knowledge to accommodate any challenge your residence or business may present.
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
        </div>
      </div>

      {/* Comparison Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Choosing the Right Ramp
            </h2>
            <p className="mt-6 sm:mt-8 text-lg leading-8 text-gray-600">
              The biggest decision is often between a temporary, modular ramp or a permanent, custom-built one. We can help you decide what's best for your home and needs.
            </p>
          </div>
          <div className="mt-16 sm:mt-20 grid grid-cols-1 gap-12 sm:gap-16 text-base leading-7 text-gray-600 md:grid-cols-2 lg:gap-28">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Leaf className="h-8 w-8 text-blue-600" />
                Modular Ramps
              </h3>
              <p>
                Made out of aluminum, these ramps can be installed and removed with little impact on the surrounding landscape. They are a good option for temporary needs as they can be reused or resold if no longer needed.
              </p>
              <p>
                Modular ramps are best suited for individuals who are looking for a short-term solution (less than 2 years), such as those who are recovering from an injury.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Construction className="h-8 w-8 text-blue-600" />
                Custom Ramps
              </h3>
              <p>
                More labor-intensive and more expensive, custom ramps built from wood or concrete look better and can add value to the house when installed correctly.
              </p>
              <p>
                These are the best option for a permanent solution that seamlessly integrates with your home's architecture. They are also ideal for businesses needing a permanent, aesthetically pleasing solution.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ramp Types Section */}
      <div className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ramp Solutions for Every Need
            </h2>
            <p className="mt-6 sm:mt-8 text-lg leading-8 text-gray-600">
              As a dealer for many top brands, we can help you select the perfect ramp for your specific requirements.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {rampTypes.map((ramp) =>
            <Card key={ramp.title} className="overflow-hidden flex flex-col">
                <img src={ramp.image} alt={ramp.title} className="h-56 w-full object-cover" />
                <CardHeader>
                  <CardTitle>{ramp.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>{ramp.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Find the Perfect Ramp for Your Home
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-gray-300">
              Our experts are ready to help you find a safe and reliable solution that fits your home, business, and budget.
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
        source="ramps" />

    </div>);

}
