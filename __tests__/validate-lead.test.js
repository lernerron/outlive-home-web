import { describe, it, expect } from 'vitest';

// Extract and test the validateLead logic directly
const consumerRequiredFields = ['name', 'zipCode', 'phone', 'email'];
const partnerRequiredFields = ['name', 'email', 'phone'];

const validateLead = (lead) => {
  if (!lead || typeof lead !== 'object') {
    return 'Request body must be a JSON object.';
  }
  const requiredFields = lead.leadType === 'partner' ? partnerRequiredFields : consumerRequiredFields;
  for (const field of requiredFields) {
    if (!lead[field] || typeof lead[field] !== 'string' || !lead[field].trim()) {
      return `Missing required field: ${field}`;
    }
  }
  return null;
};

describe('validateLead', () => {
  it('returns null for a valid consumer lead', () => {
    const lead = {
      name: 'Jane Doe',
      zipCode: '33101',
      phone: '555-123-4567',
      email: 'jane@example.com',
    };
    expect(validateLead(lead)).toBeNull();
  });

  it('returns error for missing required consumer field', () => {
    const lead = {
      name: 'Jane Doe',
      phone: '555-123-4567',
      email: 'jane@example.com',
      // missing zipCode
    };
    expect(validateLead(lead)).toBe('Missing required field: zipCode');
  });

  it('returns error for empty string field', () => {
    const lead = {
      name: '   ',
      zipCode: '33101',
      phone: '555-123-4567',
      email: 'jane@example.com',
    };
    expect(validateLead(lead)).toBe('Missing required field: name');
  });

  it('returns null for a valid partner lead', () => {
    const lead = {
      leadType: 'partner',
      name: 'Acme Corp',
      email: 'contact@acme.com',
      phone: '555-999-0000',
    };
    expect(validateLead(lead)).toBeNull();
  });

  it('returns error for null input', () => {
    expect(validateLead(null)).toBe('Request body must be a JSON object.');
  });

  it('returns error for non-object input', () => {
    expect(validateLead('hello')).toBe('Request body must be a JSON object.');
  });
});
