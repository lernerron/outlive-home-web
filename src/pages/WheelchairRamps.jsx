
import React, { useState } from "react";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Clock,
  Ruler,
  Battery,
  Zap,
  Award,
} from "lucide-react";
import EstimateForm from "../components/estimate/EstimateForm";

export default function WheelchairRampsPage() {
  const [estimateFormOpen, setEstimateFormOpen] = useState(false);

  const features = [
    {
      title: "ADA Compliant",
      description: "Meets or exceeds all accessibility standards",
      icon: Shield,
    },
    {
      title: "Custom Sizing",
      description: "Perfectly fitted to your home's dimensions",
      icon: Ruler,
    },
    {
      title: "Weather Resistant",
      description: "Durable materials for indoor and outdoor use",
      icon: Battery,
    },
    {
      title: "Non-Slip Surface",
      description: "Enhanced traction for safety in all conditions",
      icon: Zap,
    },
    {
      title: "Quick Setup",
      description: "Fast installation with minimal home disruption",
      icon: Clock,
    },
    {
      title: "Premium Build",
      description: "High-quality materials ensure lasting durability",
      icon: Award,
    },
  ];

  const benefits = [
    "Safe and easy home access",
    "Modular and portable options available",
    "Customizable to match your home",
    "Low maintenance requirements",
    "Suitable for all mobility devices",
    "Professional installation included",
    "Various width options",
    "Extended warranty coverage",
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100 to-white">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pb-24 lg:flex lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Wheelchair Ramp Solutions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Custom-designed wheelchair ramps that provide safe, reliable access to your home. 
              Professional installation ensures perfect fit and compliance with accessibility standards.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setEstimateFormOpen(true)}
              >
                Schedule a free consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mx-auto mt-8 flex max-w-2xl sm:mt-12 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/8525497/pexels-photo-8525497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Modern Wheelchair Ramp"
                  className="w-full max-w-lg rounded-xl bg-white/5 shadow-2xl ring-1 ring-gray-400/10"
                />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-600 rounded-lg opacity-20 blur-2xl"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400 rounded-lg opacity-20 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Our Wheelchair Ramps
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our wheelchair ramps are designed with safety, durability, and aesthetics in mind.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.name} className="relative pl-16">
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-blue-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Benefits of Our Wheelchair Ramps
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our ramps provide the perfect blend of functionality and aesthetics, ensuring safe access while maintaining your home's appearance.
              </p>
              <div className="mt-10">
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle2 className="h-6 w-6 text-blue-600 mr-2" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1617704227171-8f1cd1b5edfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Wheelchair Ramp Benefits"
                className="rounded-xl shadow-xl ring-1 ring-gray-400/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Estimate Form Dialog */}
      <EstimateForm 
        isOpen={estimateFormOpen}
        onClose={() => setEstimateFormOpen(false)}
      />
    </div>
  );
}
