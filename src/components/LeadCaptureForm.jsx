
import { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const COMMON_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com'
];

export default function LeadCaptureForm({ isOpen, onClose, source = 'website' }) {
  const [formData, setFormData] = useState({
    name: '',
    zipCode: '',
    phone: '',
    address: '',
    email: '',
    comments: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailSuggestion, setEmailSuggestion] = useState('');
  const [locationPermissionRequested, setLocationPermissionRequested] = useState(false);
  // The consentChecked state is no longer needed

  // Auto-detect location for zip code
  useEffect(() => {
    if (isOpen && !locationPermissionRequested && !formData.zipCode) {
      setLocationPermissionRequested(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              // In a real app, you'd use a geocoding service here
              // For demo purposes, we'll just show the feature exists
              console.log('Location detected:', position.coords);
            } catch (error) {
              console.log('Geocoding failed:', error);
            }
          },
          (error) => {
            console.log('Geolocation permission denied or failed:', error);
          },
          { timeout: 5000, maximumAge: 300000 }
        );
      }
    }
  }, [isOpen, locationPermissionRequested, formData.zipCode]);

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

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      // 'address' and 'comments' are optional fields, so skip their validation here.
      // Required fields are handled by validateField.
      if (key !== 'address' && key !== 'comments') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    
    // Consent checkbox validation removed
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
        source
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting lead:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', zipCode: '', phone: '', address: '', email: '', comments: '' });
    setErrors({});
    setIsSubmitting(false);
    setIsSubmitted(false);
    setEmailSuggestion('');
    setLocationPermissionRequested(false);
    // setConsentChecked(false); // This state is no longer needed
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
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">Thank You!</DialogTitle>
              <DialogDescription id="success-description" className="mt-4 text-lg text-gray-600">
                We've received your information and will contact you within 24 hours to schedule your free consultation.
              </DialogDescription>
            </DialogHeader>
            <Button
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700"
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
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Get Your Free Consultation
          </DialogTitle>
          <DialogDescription id="form-description">
            Complete the form below to schedule your free home accessibility consultation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onBlur={(e) => handleBlur('name', e.target.value)}
                className={errors.name ? 'border-red-500 focus:ring-red-500' : ''}
                placeholder="Enter your full name"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                autoComplete="name"
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700 flex items-center">
                ZIP Code *
                <MapPin className="h-4 w-4 ml-1 text-gray-400" />
              </Label>
              <Input
                id="zipCode"
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                onBlur={(e) => handleBlur('zipCode', e.target.value)}
                className={errors.zipCode ? 'border-red-500 focus:ring-red-500' : ''}
                placeholder="12345"
                maxLength="5"
                aria-invalid={errors.zipCode ? 'true' : 'false'}
                aria-describedby={errors.zipCode ? 'zipCode-error' : undefined}
                autoComplete="postal-code"
              />
              {errors.zipCode && (
                <p id="zipCode-error" className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.zipCode}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              onBlur={(e) => handleBlur('phone', e.target.value)}
              className={errors.phone ? 'border-red-500 focus:ring-red-500' : ''}
              placeholder="(555) 123-4567"
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              autoComplete="tel"
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={(e) => handleBlur('email', e.target.value)}
              className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
              placeholder="your.email@example.com"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="email"
            />
            {emailSuggestion && (
              <button
                type="button"
                onClick={applySuggestion}
                className="mt-1 text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Did you mean: {emailSuggestion}?
              </button>
            )}
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">
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
            <Label htmlFor="comments" className="text-sm font-medium text-gray-700">
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
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {errors.submit}
              </p>
            </div>
          )}

          <div className="space-y-4 pt-2">
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
                'Submit'
              )}
            </Button>
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By clicking "Submit", I am providing my e-signature and agree that Blue Mountain may call or text me using an automatic dialing system to arrange a convenient phone or in-home estimate. I understand consent is not required as a condition of purchase, and that I may revoke my consent at any time. Msg / data rates may apply. See our <Link to={createPageUrl('PrivacyPolicy')} className="underline hover:text-blue-700">Privacy Policy</Link>.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
