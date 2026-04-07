"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';

const playfair = "var(--font-playfair), Georgia, serif";

export default function PartnerGate({ slug }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/partner-gate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, password }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        setError('Incorrect password');
        setLoading(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg-gray flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo className="h-10" dark />
          </div>

          {/* Heading */}
          <h1
            className="text-2xl font-bold text-anchor text-center mb-2"
            style={{ fontFamily: playfair }}
          >
            Partner Preview
          </h1>
          <p className="text-text-body/70 text-center text-sm mb-8">
            Enter your access code to view this page.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="partner-password"
              className="text-sm font-medium text-text-body mb-1.5 block"
            >
              Access Code
            </label>
            <input
              id="partner-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter access code"
              className={`w-full px-4 py-3 rounded-xl border ${
                error
                  ? 'border-warm focus:ring-warm focus:border-warm'
                  : 'border-warm-gray/30 focus:ring-blue focus:border-blue'
              } bg-white text-text-body placeholder:text-warm-gray focus:outline-none focus:ring-2 transition-colors duration-200`}
              autoFocus
              required
            />
            {error && (
              <p className="text-sm text-warm mt-1.5">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-blue hover:bg-blue/90 text-white px-8 py-3 text-base font-semibold rounded-full shadow-lg shadow-blue/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Checking...
                </>
              ) : (
                'Continue'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
