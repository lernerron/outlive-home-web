
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Wrench,
  Battery,
  Zap,
  Award,
  ThumbsUp } from
"lucide-react";
import LeadCaptureForm from "../components/LeadCaptureForm";

export default function StairLiftPage() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  const features = [
  {
    title: "Safety Sensors",
    description:
    "Multiple safety sensors ensure the lift stops if it encounters any obstacles",
    icon: ShieldCheck
  },
  {
    title: "Quick Installation",
    description: "Professional installation in as little as one day",
    icon: Clock
  },
  {
    title: "Easy Maintenance",
    description:
    "Minimal maintenance required with self-lubricating components",
    icon: Wrench
  },
  {
    title: "Battery Backup",
    description:
    "Built-in battery backup system ensures operation during power outages",
    icon: Battery
  },
  {
    title: "Energy Efficient",
    description: "Low power consumption when operating and on standby",
    icon: Zap
  },
  {
    title: "Warranty Coverage",
    description: "Comprehensive warranty for peace of mind",
    icon: Award
  }];


  const benefits = [
  "Restores independence and access to all levels of your home",
  "Smooth, quiet operation with comfortable seating",
  "Compact design that folds when not in use",
  "Remote controls for convenient operation",
  "Custom rail lengths to fit any staircase",
  "Professional installation by certified technicians",
  "Options for both straight and curved staircases",
  "Soft start and stop for maximum comfort"];


  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100 to-white">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 sm:pb-24 lg:flex lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Stair Lifts for Independent Living
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Regain access to your entire home with our safe and reliable stair lifts. Custom-designed to fit your unique needs, allowing you to move freely and safely.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setLeadFormOpen(true)}>
                Get a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl flex-col sm:mt-20 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="relative">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2914844b0_BrunoWebsitePhoto.jpg"
                  alt="Modern Stairlift Installation by Bruno"
                  className="w-full max-w-md lg:max-w-lg rounded-xl bg-white/5 shadow-2xl ring-1 ring-gray-400/10" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-600 rounded-lg opacity-20 blur-2xl"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400 rounded-lg opacity-20 blur-2xl"></div>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-600 text-center lg:text-right">
              Bruno®
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Why Choose Our Stair Lifts
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Safe, Reliable, and Comfortable
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our stair lifts are meticulously engineered for your comfort and safety, offering reliable, smooth access to every level of your home.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) =>
              <div key={feature.title} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
              )}
            </dl>
          </div>
        </div>
      </div>

      {/* Benefits List */}
      <div className="bg-blue-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Seamless Mobility, Enhanced Comfort, Complete Safety
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our stair lifts are equipped with all essential features for safe and comfortable use, meticulously backed by professional installation and dedicated ongoing support.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) =>
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">{benefit}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Home with a Stair Lift?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Take the first step towards enhanced home mobility with a free, no-obligation consultation and estimate from our stair lift specialists.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
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
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true">
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                fillOpacity="0.7" />
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
        source="stair-lift" />
    </div>);
}
