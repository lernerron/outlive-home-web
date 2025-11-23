import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BadgeCheck, 
  ArrowRight,
  CheckCircle2,
  AreaChart,
  Ruler,
  Hammer,
  CreditCard,
  Star
} from "lucide-react";
import LeadCaptureForm from "../components/LeadCaptureForm";

export default function SolutionsPage() {
  const [estimateFormOpen, setEstimateFormOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Our Home Modification Solutions
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Comprehensive solutions to help seniors and individuals with mobility challenges live safely and independently at home.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setEstimateFormOpen(true)}
                >
                  Schedule a free consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-800 to-blue-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      {/* Product Solutions Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              Accessibility Solutions
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Quick and effective installations designed to immediately improve safety and accessibility in your home.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 mb-16">
            {[
              {
                title: "Bathroom Accessibility",
                description: "Elegant designs for walk-in tubs, roll-in showers, grab bars and more to enhance safety and accessibility in your bathroom.",
                image: "https://images.pexels.com/photos/6585758/pexels-photo-6585758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                features: ["Walk-in tubs", "Roll-in showers", "Designer grab bars", "Accessible sinks and toilets"],
                link: createPageUrl('BathroomSafety')
              },
              {
                title: "Stairlifts & Elevators",
                description: "Safe, reliable, and easy-to-use stairlifts and home elevators for seamless floor-to-floor mobility.",
                image: "https://images.pexels.com/photos/6827193/pexels-photo-6827193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                features: ["Straight and curved stairlifts", "Residential elevators", "Vertical platform lifts", "Quick professional installation"],
                link: createPageUrl('StairLift')
              },
              {
                title: "Entryway & Mobility",
                description: "Solutions for easy home entry including ramps, wider doorways, and threshold-free entries to improve accessibility.",
                image: "https://images.pexels.com/photos/8525497/pexels-photo-8525497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                features: ["Custom wheelchair ramps", "Widened doorways", "Offset door hinges", "Zero-step entries"],
                link: createPageUrl('WheelchairRamps')
              },
              {
                title: "Smart Home & Safety",
                description: "Modern technology solutions including emergency alert systems, smart monitoring, and fall detection for enhanced security.",
                image: "https://images.pexels.com/photos/3653849/pexels-photo-3653849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                features: ["Emergency alert systems", "Smart monitoring", "Fall detection technology", "Voice-controlled devices"],
                link: createPageUrl('SafetyAssessment')
              }
            ].map((product, index) => (
              <Card key={index} className="overflow-hidden group relative">
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className={`h-full w-full object-cover object-center ${product.link ? "group-hover:scale-105 transition-transform duration-300" : ""}`}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    {product.link && (
                      <ArrowRight className="h-5 w-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <BadgeCheck className="h-4 w-4 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {product.link && (
                    <div className="mt-4">
                      <Link 
                        to={product.link}
                        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                      >
                        Learn more
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
                {product.link && (
                  <Link 
                    to={product.link} 
                    className="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-hidden="true"
                  />
                )}
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setEstimateFormOpen(true)}>
              Schedule a Product Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Full-Service Remodeling Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              Full-Service Home Remodeling
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Comprehensive solutions that transform your entire home for maximum accessibility, safety, and comfort.
            </p>
          </div>

          {/* Process Section */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-center mb-12">Our Process</h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Free Needs Assessment",
                  description: "Expert evaluation by occupational therapists to identify accessibility requirements based on your specific needs.",
                  icon: AreaChart
                },
                {
                  title: "Architectural Design",
                  description: "Detailed design plans that blend accessibility with aesthetics to maintain your home's character and style.",
                  icon: Ruler
                },
                {
                  title: "Professional Installation",
                  description: "Efficient and respectful installers complete your remodel.",
                  icon: Hammer
                },
                {
                  title: "Ongoing Support",
                  description: "Enjoy peace of mind with our lifetime customer support.",
                  icon: CreditCard
                },
              ].map((step, index) => (
                <Card key={index} className="text-center">
                  <div className="p-6">
                    <div className="mx-auto rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6 text-blue-700" />
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-4 text-gray-600">{step.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Remodeling Solutions */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-12">Our Expertise</h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {[
                {
                  title: "Whole Bathroom Remodels",
                  description: "Complete bathroom transformations with curbless showers, comfort-height fixtures, and elegant safety features.",
                  image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  features: [
                    "Roll-in showers with built-in seating",
                    "Anti-scald fixtures and touchless faucets",
                    "Stylish grab bars that complement your decor",
                    "Non-slip flooring with proper lighting"
                  ]
                },
                {
                  title: "Kitchen Accessibility",
                  description: "Kitchen renovations with adjustable-height countertops, accessible appliances, and improved workflow.",
                  image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  features: [
                    "Pull-down shelving systems",
                    "Side-by-side refrigerators and front-control ranges",
                    "Accessible sink areas with knee clearance",
                    "Motion-sensor lighting and faucets"
                  ]
                },
                {
                  title: "First-Floor Living Conversions",
                  description: "Transform existing spaces into accessible first-floor bedrooms and bathrooms to eliminate stair usage.",
                  image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  features: [
                    "Garage conversions to living spaces",
                    "Full bathroom additions on main level",
                    "Widened doorways and zero-threshold entrances"
                  ]
                },
                {
                  title: "Whole-Home Accessibility",
                  description: "Comprehensive modifications throughout your home for maximum safety, accessibility, and independence.",
                  image: "https://images.unsplash.com/photo-1558442083-85c6b0118e19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  features: [
                    "Zero-step entrances with covered protection",
                    "Improved lighting design throughout",
                    "Smart home technology integration",
                    "Open floor plan conversions for improved mobility"
                  ]
                }
              ].map((solution, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
                    <p className="text-gray-600 mb-4">{solution.description}</p>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {solution.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-1" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mb-20">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setEstimateFormOpen(true)}>
              Start Your Remodeling Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-blue-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative px-6 py-16 sm:px-12 sm:py-16 md:py-20 lg:px-16">
            <div className="relative mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to make your home safer and more accessible?
              </h2>
              <p className="mt-6 text-lg leading-8 text-blue-100">
                Our team of experts will help you find the perfect solution to meet your needs and budget.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  onClick={() => setEstimateFormOpen(true)}
                >
                  Schedule a Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Form Dialog */}
      <LeadCaptureForm 
        isOpen={estimateFormOpen}
        onClose={() => setEstimateFormOpen(false)}
        source="solutions"
      />
    </div>
  );
}