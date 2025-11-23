
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowRight, 
  Stethoscope, 
  Home, 
  PenTool, 
  ShoppingCart, 
  Wrench, 
  MapPin, 
  Eye, 
  Scale,
  CheckCircle2,
  Users,
  Target,
  Award
} from 'lucide-react';
import LeadCaptureForm from '../components/LeadCaptureForm';

export default function AssessmentDesignServicesPage() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  const services = [
    {
      title: "Home Assessment & Consultation",
      description: "Comprehensive barrier-free home consultation tailored to your specific physical limitations and lifestyle needs.",
      icon: Home,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Custom Design & Architectural Drawings",
      description: "Professional architectural working drawings and custom design solutions for your accessibility modifications.",
      icon: PenTool,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Product Selection Assistance",
      description: "Expert guidance on stairlifts, ceiling lifts, wheelchair lifts, and home elevators to meet your unique requirements.",
      icon: ShoppingCart,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Project Management",
      description: "Complete oversight of custom renovations and new home construction to ensure accessibility standards are met.",
      icon: Wrench,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Alternative Housing Recommendations",
      description: "Professional guidance on accessible housing options when modifications aren't the best solution.",
      icon: MapPin,
      color: "bg-teal-100 text-teal-600"
    },
    {
      title: "Pre-Purchase Home Inspection",
      description: "Accessibility inspection services before you purchase a home to identify modification needs and costs.",
      icon: Eye,
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "Expert Legal Testimony",
      description: "Professional testimony to assist with legal disability claims and accessibility compliance issues.",
      icon: Scale,
      color: "bg-red-100 text-red-600"
    }
  ];

  const keyBenefits = [
    {
      title: "Unbiased Professional Advice",
      description: "We're not retailers - we provide expert consultation without sales pressure",
      icon: Award
    },
    {
      title: "Tailored Solutions",
      description: "Every home and situation is different - we customize solutions to your specific needs",
      icon: Target
    },
    {
      title: "Collaborative Approach",
      description: "We work with your existing team of designers, contractors, and healthcare professionals",
      icon: Users
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 sm:pb-32 lg:flex lg:items-center lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 rounded-full">
                <Stethoscope className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Clinical-Led Assessment & Design
              </h1>
            </div>
            <p className="mt-8 text-lg leading-8 text-gray-600">
              Expert help through every step of creating a barrier-free home for people with physical limitations or disabilities. Our clinical approach ensures solutions that truly meet your functional needs.
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
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Clinical assessment of home accessibility needs"
                  className="w-full max-w-md lg:max-w-lg rounded-xl bg-white/5 shadow-2xl ring-1 ring-gray-400/10"
                />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-600 rounded-lg opacity-20 blur-2xl"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400 rounded-lg opacity-20 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Our Services
            </h2>
            <p className="text-lg leading-8 text-gray-600 mb-12 sm:mb-16">
              Comprehensive accessibility solutions designed by experts who understand both clinical needs and practical implementation.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 md:grid-cols-2 lg:mx-0 lg:max-w-none xl:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${service.color}`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-6 text-sm sm:text-base">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How We Help Section */}
      <div className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How We Help You Navigate Complex Decisions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-8">
                  <strong className="text-gray-900">How do you select the right stair lift, wheelchair lift, ceiling lift or other accessibility product to meet your unique needs?</strong>
                </p>
                <p className="text-gray-700 leading-8">
                  How do you ensure these products fit your home, from potential kitchen or bathroom redesigns to product selection and installation for full accessibility?
                </p>
                <p className="text-gray-700 leading-8">
                  We're expert consultants in the design and implementation of barrier-free solutions for homes and offices. We go well beyond the services of most other providers.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Accessibility consultation and planning"
                className="rounded-xl shadow-xl ring-1 ring-gray-400/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Approach Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Our Collaborative Approach
            </h2>
            <p className="text-lg text-gray-700 leading-8">
              We'll work with your team, whether they're interior designers, contractors, legal experts, adjusters or physiotherapists, to find the right solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 sm:mb-16">
            {keyBenefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6">
                <CardHeader>
                  <div className="mx-auto p-4 bg-blue-100 rounded-full w-fit mb-4">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 lg:p-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">
                Tailored Solutions for Every Situation
              </h3>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-blue-800 leading-8 mb-8">
                  Everything is tailored to meet your needs – every home and every situation is different. We're here to help you design and implement your perfect barrier-free home.
                </p>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <p className="text-blue-900 font-semibold text-lg">
                    Best of all, we aren't a retailer, but we are experts in all the accessibility products available. You get unbiased, professional advice without the sales pitch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Create Your Barrier-Free Home?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Let our clinical experts assess your needs and design the perfect accessibility solution for your home and lifestyle.
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
        source="clinical-assessment"
      />
    </div>
  );
}
