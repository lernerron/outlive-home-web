"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitLead } from '@/api/leads';
import { trackEvent } from '@/lib/analytics';

export default function InlineLeadForm({ source = 'inline', defaultServiceType = '', darkMode = false }) {
  const [formData, setFormData] = useState({
    name: '',
    zipCode: '',
    phone: '',
    email: '',
    serviceType: defaultServiceType,
    urgency: '',
    relationship: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dismissTimer = useRef(null);

  useEffect(() => {
    if (isSubmitted) {
      dismissTimer.current = setTimeout(() => {
        resetForm();
      }, 10000);
    }
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, [isSubmitted]);

  const resetForm = () => {
    setFormData({ name: '', zipCode: '', phone: '', email: '', serviceType: defaultServiceType, urgency: '', relationship: '' });
    setErrors({});
    setIsSubmitting(false);
    setIsSubmitted(false);
  };

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
        source,
      });
      setIsSubmitted(true);
      trackEvent('lead_submit', { source });
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Label and input styles adapt to dark/light background
  const labelClass = darkMode
    ? 'text-sm font-medium text-white/90 mb-1.5'
    : 'text-sm font-medium text-text-body mb-1.5';

  const inputClass = darkMode
    ? 'w-full px-4 py-3 rounded-xl border border-white/30 bg-white/15 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-colors duration-200'
    : '';

  const selectClass = darkMode
    ? 'w-full px-4 py-3 rounded-xl border border-white/30 bg-white/15 text-white focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-colors duration-200 appearance-none'
    : 'w-full px-4 py-3 rounded-xl border border-warm-gray/30 bg-white text-text-body focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-colors duration-200 appearance-none';

  const errorClass = darkMode ? 'mt-1 text-xs text-warm' : 'mt-1 text-xs text-warm';

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-6 ${darkMode ? 'bg-white/10' : 'bg-anchor/10'}`}>
          <CheckCircle2 className={`h-8 w-8 ${darkMode ? 'text-white' : 'text-anchor'}`} />
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-text-body'}`}>
          Thank You!
        </h3>
        <p className={darkMode ? 'text-white/70' : 'text-text-body/70'}>
          We&rsquo;ll be in touch within 24 hours.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className={`mt-4 text-sm font-semibold underline ${darkMode ? 'text-warm hover:text-warm/80' : 'text-blue hover:text-navy'}`}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="inline-name" className={labelClass}>Full Name</Label>
          <Input
            id="inline-name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Your full name"
            className={`${inputClass} ${errors.name ? 'border-warm' : ''}`}
            autoComplete="name"
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="inline-zip" className={labelClass}>ZIP Code</Label>
          <Input
            id="inline-zip"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            placeholder="33101"
            maxLength="5"
            className={`${inputClass} ${errors.zipCode ? 'border-warm' : ''}`}
            autoComplete="postal-code"
          />
          {errors.zipCode && <p className={errorClass}>{errors.zipCode}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="inline-phone" className={labelClass}>Phone Number</Label>
          <Input
            id="inline-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="(305) 555-1234"
            className={`${inputClass} ${errors.phone ? 'border-warm' : ''}`}
            autoComplete="tel"
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>
        <div>
          <Label htmlFor="inline-email" className={labelClass}>Email Address</Label>
          <Input
            id="inline-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="you@example.com"
            className={`${inputClass} ${errors.email ? 'border-warm' : ''}`}
            autoComplete="email"
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>
      </div>

      {/* Qualification fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="inline-serviceType" className={labelClass}>Service Needed</Label>
          <select
            id="inline-serviceType"
            value={formData.serviceType}
            onChange={(e) => handleInputChange('serviceType', e.target.value)}
            className={selectClass}
          >
            <option value="">Select...</option>
            <option value="Barrier-free shower">Barrier-free shower</option>
            <option value="Roll-in shower">Roll-in shower</option>
            <option value="Complete bathroom">Complete bathroom</option>
            <option value="Grab bars & safety">Grab bars &amp; safety</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>
        <div>
          <Label htmlFor="inline-urgency" className={labelClass}>Timeline</Label>
          <select
            id="inline-urgency"
            value={formData.urgency}
            onChange={(e) => handleInputChange('urgency', e.target.value)}
            className={selectClass}
          >
            <option value="">Select...</option>
            <option value="Urgent (recent fall/surgery)">Urgent</option>
            <option value="Within 1 month">Within 1 month</option>
            <option value="Within 3 months">Within 3 months</option>
            <option value="Planning ahead">Planning ahead</option>
          </select>
        </div>
        <div>
          <Label htmlFor="inline-relationship" className={labelClass}>This is for...</Label>
          <select
            id="inline-relationship"
            value={formData.relationship}
            onChange={(e) => handleInputChange('relationship', e.target.value)}
            className={selectClass}
          >
            <option value="">Select...</option>
            <option value="Myself">Myself</option>
            <option value="My parent/family member">Parent/family</option>
            <option value="My patient/client">Patient/client</option>
          </select>
        </div>
      </div>

      {errors.submit && (
        <div className="p-3 bg-warm/10 border border-warm/30 rounded-xl">
          <p className="text-sm text-warm flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {errors.submit}
          </p>
        </div>
      )}
      <Button
        type="submit"
        className="w-full bg-blue hover:bg-blue/90 text-white py-3 text-lg font-semibold rounded-full shadow-lg shadow-blue/20"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Get Your Free Assessment'
        )}
      </Button>
      <p className={`text-xs text-center ${darkMode ? 'text-white/40' : 'text-text-body/50'}`}>
        No obligation. We&rsquo;ll reach out to schedule a convenient time.
      </p>
    </form>
  );
}
