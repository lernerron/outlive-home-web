import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitLead } from '@/api/leads';
import { trackEvent } from '@/lib/analytics';

export default function InlineLeadForm({ source = 'inline' }) {
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

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">We'll contact you within 24 hours to schedule your free consultation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="inline-name" className="text-sm font-medium text-gray-700">Full Name</Label>
          <Input
            id="inline-name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Your full name"
            className={errors.name ? 'border-red-500' : ''}
            autoComplete="name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="inline-zip" className="text-sm font-medium text-gray-700">ZIP Code</Label>
          <Input
            id="inline-zip"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            placeholder="33101"
            maxLength="5"
            className={errors.zipCode ? 'border-red-500' : ''}
            autoComplete="postal-code"
          />
          {errors.zipCode && <p className="mt-1 text-xs text-red-600">{errors.zipCode}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="inline-phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
        <Input
          id="inline-phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="(305) 555-0199"
          className={errors.phone ? 'border-red-500' : ''}
          autoComplete="tel"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
      </div>
      <div>
        <Label htmlFor="inline-email" className="text-sm font-medium text-gray-700">Email Address</Label>
        <Input
          id="inline-email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="you@example.com"
          className={errors.email ? 'border-red-500' : ''}
          autoComplete="email"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>
      {errors.submit && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {errors.submit}
          </p>
        </div>
      )}
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Get My Free Consultation'
        )}
      </Button>
      <p className="text-xs text-gray-400 text-center">
        No obligation. We'll reach out to schedule a convenient time.
      </p>
    </form>
  );
}
