import { Suspense } from 'react';
import GateForm from './gate-form';

export const metadata = {
  title: 'Access Required | Outlive Homes',
  robots: { index: false, follow: false },
};

export default function GatePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-900 text-center mb-2">
          Outlive Homes
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          This site is currently in preview. Enter the password to continue.
        </p>
        <Suspense fallback={<div className="h-20" />}>
          <GateForm />
        </Suspense>
      </div>
    </div>
  );
}
