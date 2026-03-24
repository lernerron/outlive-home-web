
"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';
import { submitLead } from '@/api/leads';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { trackEvent } from '@/lib/analytics';

const COMMON_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com'
];

export default function LeadCaptureForm({ isOpen, onClose, source = 'website', defaultServiceType = '' }) {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const isTurnstileEnabled = Boolean(turnstileSiteKey);
  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    zipCode: '',
    phone: '',
    address: '',
    email: '',
    comments: '',
    serviceType: defaultServiceType,
    urgency: '',
    relationship: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailSuggestion, setEmailSuggestion] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileError, setTurnstileError] = useState('');

  useEffect(() => {
    if (!isOpen || !isTurnstileEnabled || !turnstileRef.current) {
      return;
    }

    const renderWidget = () => {
      if (!window.turnstile || !turnstileRef.current) return;
      if (turnstileWidgetId.current !== null) return;
      turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token) => {
          setTurnstileToken(token);
          setTurnstileError('');
        },
        'expired-callback': () => {
          setTurnstileToken('');
        },
        'error-callback': () => {
          setTurnstileError('Turnstile verification failed. Please try again.');
          setTurnstileToken('');
        }
      });
    };

    const existingScript = document.querySelector(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    } else {
      renderWidget();
    }

    return () => {
      if (window.turnstile && turnstileWidgetId.current !== null) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
      setTurnstileToken('');
      setTurnstileError('');
    };
  }, [isOpen, isTurnstileEnabled, turnstileSiteKey]);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      
      case 'zipCode':
        if (!value.trim()) return 'ZIP code is required';
        if (!/^\d{5}(-\d{4})?$/.test(value)) return 'Please enter a valid ZIP code';
        return '';
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const cleanPhone = value.replace(/\D/g, '');
        if (cleanPhone.length < 10) return 'Please enter a valid phone number';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      
      default:
        return '';
    }
  };

  const formatPhoneNumber = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length >= 6) {
      return `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3, 6)}-${cleanValue.slice(6, 10)}`;
    } else if (cleanValue.length >= 3) {
      return `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3)}`;
    } else {
      return cleanValue;
    }
  };

  const handleInputChange = (name, value) => {
    let processedValue = value;

    // Auto-format phone number
    if (name === 'phone') {
      processedValue = formatPhoneNumber(value);
    }

    // ZIP code validation and formatting
    if (name === 'zipCode') {
      processedValue = value.replace(/\D/g, '').slice(0, 5);
    }

    setFormData(prev => ({ ...prev, [name]: processedValue }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Email domain suggestions
    if (name === 'email' && value.includes('@') && !value.includes('.')) {
      const emailPart = value.split('@')[1];
      const suggestion = COMMON_EMAIL_DOMAINS.find(domain => 
        domain.startsWith(emailPart.toLowerCase())
      );
      if (suggestion) {
        setEmailSuggestion(`${value.split('@')[0]}@${suggestion}`);
      } else {
        setEmailSuggestion('');
      }
    } else {
      setEmailSuggestion('');
    }
  };

  const handleBlur = (name, value) => {
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const optionalFields = ['address', 'comments', 'serviceType', 'urgency', 'relationship'];

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!optionalFields.includes(key)) {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isTurnstileEnabled && !turnstileToken) {
      setTurnstileError('Please complete the Turnstile check before submitting.');
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Clean phone number for storage
      const cleanPhone = formData.phone.replace(/\D/g, '');
      
      await submitLead({
        ...formData,
        phone: cleanPhone,
        source,
        turnstileToken: isTurnstileEnabled ? turnstileToken : undefined
      });

      setIsSubmitted(true);
      trackEvent('lead_submit', { source });
    } catch (error) {
      console.error('Error submitting lead:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', zipCode: '', phone: '', address: '', email: '', comments: '', serviceType: defaultServiceType, urgency: '', relationship: '' });
    setErrors({});
    setIsSubmitting(false);
    setIsSubmitted(false);
    setEmailSuggestion('');
    setTurnstileToken('');
    setTurnstileError('');
    onClose();
  };

  const applySuggestion = () => {
    if (emailSuggestion) {
      setFormData(prev => ({ ...prev, email: emailSuggestion }));
      setEmailSuggestion('');
    }
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md" aria-describedby="success-description">
          <div className="text-center py-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-anchor/10 mb-6">
              <CheckCircle2 className="h-8 w-8 text-anchor" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-text-body">Thank You!</DialogTitle>
              <DialogDescription id="success-description" className="mt-4 text-lg text-text-body/70">
                We&rsquo;ve received your information and will contact you within 24 hours to schedule your free consultation.
              </DialogDescription>
            </DialogHeader>
            <Button
              className="mt-8 w-full bg-blue hover:bg-blue/90 text-white"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg" aria-describedby="form-description">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-text-body">
            Get Your Free Assessment
          </DialogTitle>
          <DialogDescription id="form-description">
            Complete the form below to schedule your free home accessibility assessment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-text-body mb-1.5">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onBlur={(e) => handleBlur('name', e.target.value)}
                className={errors.name ? 'border-warm focus:ring-warm' : ''}
                placeholder="Enter your full name"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                autoComplete="name"
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-warm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="zipCode" className="text-sm font-medium text-text-body mb-1.5 flex items-center">
                ZIP Code *
                <MapPin className="h-4 w-4 ml-1 text-warm-gray" />
              </Label>
              <Input
                id="zipCode"
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                onBlur={(e) => handleBlur('zipCode', e.target.value)}
                className={errors.zipCode ? 'border-warm focus:ring-warm' : ''}
                placeholder="33101"
                maxLength="5"
                aria-invalid={errors.zipCode ? 'true' : 'false'}
                aria-describedby={errors.zipCode ? 'zipCode-error' : undefined}
                autoComplete="postal-code"
              />
              {errors.zipCode && (
                <p id="zipCode-error" className="mt-1 text-sm text-warm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.zipCode}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-text-body mb-1.5">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onBlur={(e) => handleBlur('phone', e.target.value)}
                className={errors.phone ? 'border-warm focus:ring-warm' : ''}
                placeholder="(305) 555-1234"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                autoComplete="tel"
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-warm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-text-body mb-1.5">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={(e) => handleBlur('email', e.target.value)}
                className={errors.email ? 'border-warm focus:ring-warm' : ''}
                placeholder="you@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
              {emailSuggestion && (
                <button
                  type="button"
                  onClick={applySuggestion}
                  className="mt-1 text-sm text-blue hover:text-navy underline"
                >
                  Did you mean: {emailSuggestion}?
                </button>
              )}
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-warm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Qualification fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="serviceType" className="text-sm font-medium text-text-body mb-1.5">
                Service Needed
              </Label>
              <select
                id="serviceType"
                value={formData.serviceType}
                onChange={(e) => handleInputChange('serviceType', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-warm-gray/30 bg-white text-text-body focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-colors duration-200 appearance-none"
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
              <Label htmlFor="urgency" className="text-sm font-medium text-text-body mb-1.5">
                Timeline
              </Label>
              <select
                id="urgency"
                value={formData.urgency}
                onChange={(e) => handleInputChange('urgency', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-warm-gray/30 bg-white text-text-body focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-colors duration-200 appearance-none"
              >
                <option value="">Select...</option>
                <option value="Urgent (recent fall/surgery)">Urgent (recent fall/surgery)</option>
                <option value="Within 1 month">Within 1 month</option>
                <option value="Within 3 months">Within 3 months</option>
                <option value="Planning ahead">Planning ahead</option>
              </select>
            </div>
            <div>
              <Label htmlFor="relationship" className="text-sm font-medium text-text-body mb-1.5">
                This is for...
              </Label>
              <select
                id="relationship"
                value={formData.relationship}
                onChange={(e) => handleInputChange('relationship', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-warm-gray/30 bg-white text-text-body focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-colors duration-200 appearance-none"
              >
                <option value="">Select...</option>
                <option value="Myself">Myself</option>
                <option value="My parent/family member">My parent/family member</option>
                <option value="My patient/client">My patient/client</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="address" className="text-sm font-medium text-text-body mb-1.5">
              Street Address (Optional)
            </Label>
            <Input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="123 Main Street"
              autoComplete="street-address"
            />
          </div>

          <div>
            <Label htmlFor="comments" className="text-sm font-medium text-text-body mb-1.5">
              Questions or Comments (Optional)
            </Label>
            <Textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => handleInputChange('comments', e.target.value)}
              placeholder="Let us know if you have any questions or specific needs."
              rows={3}
              className="mt-1"
            />
          </div>

          {errors.submit && (
            <div className="p-3 bg-warm/10 border border-warm/30 rounded-xl">
              <p className="text-sm text-warm flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {errors.submit}
              </p>
            </div>
          )}

          <div className="space-y-4 pt-2">
            {isTurnstileEnabled && (
              <div className="space-y-2">
                <div ref={turnstileRef} />
                {turnstileError && (
                  <p className="text-sm text-warm">{turnstileError}</p>
                )}
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
            <p className="text-xs text-text-body/60 text-center leading-relaxed">
              By clicking &ldquo;Get Your Free Assessment&rdquo;, I am providing my e-signature and agree that Outlive Homes may call or text me using an automatic dialing system to arrange a convenient phone or in-home estimate. I understand consent is not required as a condition of purchase, and that I may revoke my consent at any time. Msg / data rates may apply. See our <Link href={createPageUrl('PrivacyPolicy')} className="underline hover:text-blue">Privacy Policy</Link>.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
