"use client";

import { AuthProvider } from '@/lib/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import Analytics from '@/components/Analytics';

export function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
      <Analytics />
    </AuthProvider>
  );
}
