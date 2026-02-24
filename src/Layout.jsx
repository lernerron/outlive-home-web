import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';


import {
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { cn } from "@/lib/utils";
import LeadCaptureForm from './components/LeadCaptureForm';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigation = [
    { name: 'Home', href: createPageUrl('Home') },
    {
      name: 'Solutions',
      submenu: [
        { name: 'Bathrooms', href: createPageUrl('BathroomSafety') },
        { name: 'Elevators', href: createPageUrl('Homelifts') },
        { name: 'Stair Lifts', href: createPageUrl('StairLift') },
        { name: 'Ramps', href: createPageUrl('Ramps') },
        { name: 'Wheelchair Lifts', href: createPageUrl('WheelchairRamps') },
      ]
    },
    {
      name: 'Services',
      submenu: [
        { name: 'Assessment & Design', href: createPageUrl('AssessmentDesignServices') },
        { name: 'Financing Options', href: createPageUrl('FinancingOptions') }
      ]
    },
    // Removed 'Contact' from main navigation as it's handled by the footer button/header CTA
  ];

  return (
    <div className="bg-white">
      <header className="fixed w-full bg-white z-50 shadow-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to={createPageUrl('Home')} className="-m-1.5 p-1.5">
              <span className="sr-only">Blue Mountain</span>
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688302222532cfd3939198b2/0f33cbc97_BlueMountainLogo.jpg" alt="Blue Mountain" className="h-10 sm:h-12 w-auto" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <React.Fragment key={item.name}>
                {item.submenu ? (
                  <div className="relative group">
                    <span
                      className={cn(
                        "text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 flex items-center cursor-default",
                        item.submenu.some(sub => sub.href && createPageUrl(currentPageName) === sub.href) ? "text-blue-600" : ""
                      )}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                    </span>
                    <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                      <div className="py-1">
                        {item.submenu.map((subItem) => (
                          subItem.href ? (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={cn(
                                "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600",
                                subItem.href && createPageUrl(currentPageName) === subItem.href ? "bg-gray-100 text-blue-600" : ""
                              )}
                            >
                              {subItem.name}
                            </Link>
                          ) : (
                            <span
                              key={subItem.name}
                              className="block px-4 py-2 text-sm text-gray-500 cursor-default"
                            >
                              {subItem.name}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600",
                      currentPageName === item.name ? "text-blue-600" : ""
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
             <Button onClick={() => setLeadFormOpen(true)} className="bg-blue-600 hover:bg-blue-700">
               Get a Free Consultation
             </Button>
          </div>
        </nav>
        {mobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to={createPageUrl('Home')} className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                  <span className="sr-only">Blue Mountain</span>
                  <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688302222532cfd3939198b2/0f33cbc97_BlueMountainLogo.jpg" alt="Blue Mountain" className="h-8 w-auto" />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                       <React.Fragment key={item.name}>
                        {item.submenu ? (
                           <div>
                             <p className="text-gray-900 -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7">{item.name}</p>
                             <div className="pl-4">
                               {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-50"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                               ))}
                             </div>
                           </div>
                         ) : (
                           <Link
                             to={item.href}
                             className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                             onClick={() => setMobileMenuOpen(false)}
                           >
                             {item.name}
                           </Link>
                         )}
                       </React.Fragment>
                    ))}
                  </div>
                  <div className="py-6">
                    <Button
                      onClick={() => {
                        setLeadFormOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Get a Free Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="pt-20">
        {children}
      </main>

      <footer className="bg-gray-900 text-white" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-20 lg:px-8 lg:pt-24">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <p className="text-sm leading-6 text-gray-300">
                Live Comfortably in the Home you Love
              </p>
              <div className="flex space-x-6">
                {/* Social media links can be added here */}
              </div>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-gray-400 mb-6 uppercase">Solutions</h3>
                  <ul role="list" className="space-y-3">
                    <li><Link to={createPageUrl('Homelifts')} className="text-sm text-gray-300 hover:text-white">Home Elevators</Link></li>
                    <li><Link to={createPageUrl('StairLift')} className="text-sm text-gray-300 hover:text-white">Stair Lifts</Link></li>
                    <li><Link to={createPageUrl('Ramps')} className="text-sm text-gray-300 hover:text-white">Ramps</Link></li>
                    <li><Link to={createPageUrl('SafeShowers')} className="text-sm text-gray-300 hover:text-white">Safe Showers</Link></li>
                    {/* <li><Link to={createPageUrl('GrabBarsHandrails')} className="text-sm text-gray-300 hover:text-white">Grab Bars & Handrails</Link></li> */}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                   <h3 className="text-sm font-semibold leading-6 text-gray-400 mb-6 uppercase">Services</h3>
                   <ul role="list" className="space-y-3">
                     <li><Link to={createPageUrl('AssessmentDesignServices')} className="text-sm text-gray-300 hover:text-white">Assessment & Design</Link></li>
                     <li><Link to={createPageUrl('FinancingOptions')} className="text-sm text-gray-300 hover:text-white">Financing Options</Link></li>
                   </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                   <h3 className="text-sm font-semibold leading-6 text-gray-400 mb-6 uppercase">Company</h3>
                   <ul role="list" className="space-y-3">
                     <li><Link to={createPageUrl('AboutUs')} className="text-sm text-gray-300 hover:text-white">About Us</Link></li>
                     <li>
                        <button 
                          onClick={() => setLeadFormOpen(true)}
                          className="text-sm text-gray-300 hover:text-white text-left w-full"
                        >
                          Contact
                        </button>
                      </li>
                   </ul>
                </div>
                <div className="mt-10 md:mt-0">
                   <h3 className="text-sm font-semibold leading-6 text-gray-400 mb-6 uppercase">Legal</h3>
                   <ul role="list" className="space-y-3">
                     <li><Link to={createPageUrl('PrivacyPolicy')} className="text-sm text-gray-300 hover:text-white">Privacy Policy</Link></li>
                   </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-400">&copy; {new Date().getFullYear()} Blue Mountain. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <LeadCaptureForm 
        isOpen={leadFormOpen}
        onClose={() => setLeadFormOpen(false)}
        source="header-cta" // Default source, can be updated based on interaction point if needed.
      />
    </div>
  );
}