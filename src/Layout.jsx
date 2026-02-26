import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from "@/lib/utils";
import LeadCaptureForm from './components/LeadCaptureForm';

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Our Solutions', href: '#solutions' },
    { name: 'Our Process', href: '#process' },
    { name: 'Why Us', href: '#why-us' },
  ];

  return (
    <div className="bg-white">
      <header className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      )}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="-m-1.5 p-1.5">
              <span className="sr-only">Outlive Homes</span>
              <span className={cn(
                "text-xl font-bold tracking-tight transition-colors duration-300",
                isScrolled ? "text-blue-900" : "text-white"
              )}>
                Outlive Homes
              </span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className={cn(
                "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors",
                isScrolled ? "text-gray-700" : "text-white"
              )}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-semibold leading-6 transition-colors duration-300",
                  isScrolled
                    ? "text-gray-900 hover:text-blue-600"
                    : "text-white/90 hover:text-white"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
            <a
              href="tel:3055550199"
              className={cn(
                "flex items-center gap-1.5 text-sm font-semibold transition-colors duration-300",
                isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white/90 hover:text-white"
              )}
            >
              <Phone className="h-4 w-4" />
              (305) 555-0199
            </a>
            <Button
              onClick={() => setLeadFormOpen(true)}
              className={cn(
                "transition-all duration-300",
                isScrolled
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-white text-blue-900 hover:bg-white/90"
              )}
            >
              Get a Free Consultation
            </Button>
          </div>
        </nav>
        {mobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="-m-1.5 p-1.5">
                  <span className="sr-only">Outlive Homes</span>
                  <span className="text-xl font-bold tracking-tight text-blue-900">Outlive Homes</span>
                </a>
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
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6 space-y-4">
                    <a
                      href="tel:3055550199"
                      className="flex items-center justify-center gap-2 text-base font-semibold text-blue-600"
                    >
                      <Phone className="h-5 w-5" />
                      (305) 555-0199
                    </a>
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

      <main>
        {children}
      </main>

      <footer className="bg-gray-900 text-white" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-20 lg:px-8 lg:pt-24">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-4">
              <p className="text-lg font-bold text-white">Outlive Homes</p>
              <p className="text-sm leading-6 text-gray-300 italic">
                The Art and Science of Outliving at Home
              </p>
              <p className="text-sm leading-6 text-gray-400">
                South Florida &middot; Miami and Surrounding Metros
              </p>
              <p className="text-xs text-gray-500">Founded 2025</p>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-400 mb-6 uppercase">Quick Links</h3>
                <ul role="list" className="space-y-3">
                  <li><a href="#solutions" className="text-sm text-gray-300 hover:text-white">Our Solutions</a></li>
                  <li><a href="#process" className="text-sm text-gray-300 hover:text-white">Our Process</a></li>
                  <li><a href="#why-us" className="text-sm text-gray-300 hover:text-white">Why Us</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-400 mb-6 uppercase">Company</h3>
                <ul role="list" className="space-y-3">
                  <li>
                    <button
                      onClick={() => setLeadFormOpen(true)}
                      className="text-sm text-gray-300 hover:text-white text-left"
                    >
                      Contact Us
                    </button>
                  </li>
                  <li>
                    <Link to={createPageUrl('PrivacyPolicy')} className="text-sm text-gray-300 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-400">&copy; {new Date().getFullYear()} Outlive Homes. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <LeadCaptureForm
        isOpen={leadFormOpen}
        onClose={() => setLeadFormOpen(false)}
        source="header-cta"
      />
    </div>
  );
}
