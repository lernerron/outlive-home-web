
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Heart, ShieldCheck, Target, Briefcase } from "lucide-react";
import LeadCaptureForm from "../components/LeadCaptureForm";

export default function AboutUsPage() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100 to-white">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 sm:pb-24 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              About Blue Mountain
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-700">
              Your trusted partner in creating safe, accessible, and comfortable homes for independent living.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
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
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Blue Mountain Team"
              className="mx-auto w-full max-w-lg rounded-2xl object-cover shadow-xl ring-1 ring-gray-400/10 lg:max-w-md"
            />
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 sm:py-24 bg-blue-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Target className="mx-auto h-16 w-16 text-blue-600 mb-6" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-6 text-xl leading-8 text-gray-700">
              To empower people to live safely, independently, and comfortably in their homes.
            </p>
          </div>
        </div>
      </div>

      {/* We Do It Right Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
            <div>
              <ShieldCheck className="h-12 w-12 text-blue-600 mb-6" />
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                We Do It Right. Directly For You.
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                At Blue Mountain, we turn complex home improvement projects and endless to-dos into achievements. Our local team of experts is right by your side, at every step. So, you’ll never have to tackle it alone. We own the entire journey, from start to finish. And get the job done right, by bringing innovative products, extraordinary people, and the highest standards to every project.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Welcome to Blue Mountain. Your home improvement experience delivered remarkably.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1517673139720-f00915905c97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Quality Craftsmanship"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
      
      {/* We Work Hard To Earn Your Trust Section */}
      <div className="py-20 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
              alt="Trusted Team"
              className="rounded-2xl shadow-xl lg:order-last"
            />
            <div className="lg:order-first">
              <Users className="h-12 w-12 text-blue-600 mb-6" />
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                We Work Hard To Earn Your Trust.
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our success boils down to one thing: our customers. Because if you aren’t living better and safer, we haven’t done our jobs. We’re all about results delivered at every step, enabled by technology. And we work, every day, to earn your trust. When we say something, we do it. When we do something, we stand by it. It might feel like a radical idea. But at Blue Mountain, it’s the standard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Promise Section */}
      <div className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Heart className="mx-auto h-12 w-12 text-blue-600 mb-6" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Promise
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our partnership with homeowners is the driving force behind everything we do. We work closely with you to design and deliver custom solutions. Bringing all of our Blue Mountain excellence to every project. From product selection to installation and beyond, we provide reliable, end-to-end service. Done right at every step. Always striving to show care and respect for you and your home. It’s our promise.
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Home / Careers Section */}
      <div className="bg-blue-600">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-24 lg:flex lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome Home
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-100">
              We’re on a mission to empower people to live safely, independently, and comfortably in their homes. And our passionate team members are making it happen by innovating new ways to help our neighbors live better. Let’s do something great together!
            </p>
          </div>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => { /* TODO: Link to Careers page when created */ }}
            >
              <Briefcase className="mr-2 h-5 w-5" />
              Careers at Blue Mountain
            </Button>
          </div>
        </div>
      </div>

      {/* Lead Capture Form Dialog */}
      <LeadCaptureForm 
        isOpen={leadFormOpen}
        onClose={() => setLeadFormOpen(false)}
        source="about-us"
      />
    </div>
  );
}
