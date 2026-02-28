"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { submitLead } from '@/api/leads';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export default function StickyCtaBanner({ visible, onOpenModal }) {
  const [formData, setFormData] = useState({
    name: '',
    zipCode: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatPhoneNumber = (value) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length >= 6) return `(${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(6, 10)}`;
    if (clean.length >= 3) return `(${clean.slice(0, 3)}) ${clean.slice(3)}`;
    return clean;
  };

  const handleInputChange = (name, value) => {
    let processed = value;
    if (name === 'phone') processed = formatPhoneNumber(value);
    if (name === 'zipCode') processed = value.replace(/\D/g, '').slice(0, 5);
    setFormData(prev => ({ ...prev, [name]: processed }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Valid email required';
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) errs.phone = 'Valid phone required';
    if (!formData.zipCode.trim() || !/^\d{5}$/.test(formData.zipCode)) errs.zipCode = 'Valid ZIP required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setErrors({});
    try {
      await submitLead({
        ...formData,
        phone: formData.phone.replace(/\D/g, ''),
        source: 'sticky-banner',
      });
      setIsSubmitted(true);
      trackEvent('lead_submit', { source: 'sticky-banner' });
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="complementary"
      aria-label="Quick contact form"
      className={cn(
        "fixed top-16 left-0 right-0 z-40 bg-anchor shadow-md",
        "transition-all duration-300 motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-2 lg:px-8">
        {/* Promo headline */}
        <p className="text-center text-xs sm:text-sm font-bold text-warm mb-1.5">
          $1,000 Off Your Shower, Plus Low Monthly Payments!*
        </p>

        {/* Mobile: CTA button only */}
        <div className="flex items-center justify-between lg:hidden">
          <p className="text-sm font-medium text-white">
            Ready to transform your home?
          </p>
          <Button
            onClick={onOpenModal}
            className="bg-warm hover:bg-warm/90 text-white text-sm px-4 py-1.5 h-auto"
          >
            Get Free Estimate
          </Button>
        </div>

        {/* Desktop: inline form */}
        <div className="hidden lg:block">
          {isSubmitted ? (
            <div className="flex items-center justify-center gap-2 py-1">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <p className="text-sm font-medium text-white">
                Thank you! We'll contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-3" noValidate>
              <p className="text-sm font-medium text-white whitespace-nowrap mr-1">
                Get a Free Estimate:
              </p>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Full Name"
                className={cn(
                  "h-8 text-sm bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-warm focus:border-warm",
                  errors.name && "border-red-400"
                )}
                autoComplete="name"
                aria-label="Full Name"
              />
              <Input
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                placeholder="ZIP"
                maxLength="5"
                className={cn(
                  "h-8 text-sm w-24 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-warm focus:border-warm",
                  errors.zipCode && "border-red-400"
                )}
                autoComplete="postal-code"
                aria-label="ZIP Code"
              />
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Phone"
                className={cn(
                  "h-8 text-sm bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-warm focus:border-warm",
                  errors.phone && "border-red-400"
                )}
                autoComplete="tel"
                aria-label="Phone Number"
              />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Email"
                className={cn(
                  "h-8 text-sm bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-warm focus:border-warm",
                  errors.email && "border-red-400"
                )}
                autoComplete="email"
                aria-label="Email Address"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-8 bg-warm hover:bg-warm/90 text-white text-sm px-5 whitespace-nowrap"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Get Free Quote'
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Consent text */}
        <p className="text-[9px] leading-tight text-white/50 mt-1.5 max-w-5xl mx-auto text-center">
          By submitting this form, you consent to receive text messages from Outlive Homes for marketing, customer care, and account notifications. Message frequency may vary. Msg and Data rates apply. Reply &ldquo;STOP&rdquo; to unsubscribe. Text HELP for support. Consent is not a condition of purchase. You also consent to receiving phone calls and emails with explicit information about your project needs. We will never share your personal information with 3rd parties for marketing purposes or spam you. <a href="/privacypolicy" className="underline hover:text-white/70">Terms and Conditions</a> | <a href="/privacypolicy" className="underline hover:text-white/70">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
