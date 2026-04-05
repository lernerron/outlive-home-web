"use client";

import Link from 'next/link';
import { CheckCircle2, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

export default function ThankYouContent() {
  return (
    <Layout headerVariant="solid">
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-anchor/10 mb-8">
            <CheckCircle2 className="h-10 w-10 text-anchor" />
          </div>

          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight text-anchor"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Thank You!
          </h1>

          <p className="mt-6 text-lg text-text-body/70 leading-relaxed">
            We&rsquo;ve received your information and will contact you within
            24 hours to schedule your free in-home assessment.
          </p>

          <div className="mt-12 bg-bg-gray rounded-2xl p-8 text-left">
            <h2 className="text-lg font-semibold text-text-body mb-4">What happens next?</h2>
            <ol className="space-y-4 text-text-body/70">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue text-white text-sm font-bold flex items-center justify-center">1</span>
                <span>Our team reviews your information and prepares for your assessment</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue text-white text-sm font-bold flex items-center justify-center">2</span>
                <span>We call to schedule a convenient time for your free in-home visit</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue text-white text-sm font-bold flex items-center justify-center">3</span>
                <span>A CAPS-certified specialist evaluates your space and recommends solutions</span>
              </li>
            </ol>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-blue hover:bg-blue/90 text-white px-8 py-6 text-base rounded-full shadow-lg shadow-blue/20">
                Back to Home
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
