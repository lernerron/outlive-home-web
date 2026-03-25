"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import LeadCaptureForm from '@/components/LeadCaptureForm';
import StickyCtaBanner from '@/components/StickyCtaBanner';
import { getBannerConfig } from '@/lib/banner-config';

export default function Layout({ children, bannerPreset, headerVariant = "transparent" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef('down');
  const bannerConfig = getBannerConfig(bannerPreset);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const heroThreshold = window.innerHeight * bannerConfig.scrollThreshold;
    const delta = currentY - lastScrollY.current;

    setIsScrolled(currentY > 80);

    if (Math.abs(delta) > 5) {
      scrollDirection.current = delta > 0 ? 'down' : 'up';
    }

    const pastHero = currentY > heroThreshold;
    const isDown = scrollDirection.current === 'down';
    setShowBanner(pastHero && isDown);

    lastScrollY.current = currentY;
  }, [bannerConfig.scrollThreshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navigation = [
    { name: 'Bathroom Safety', href: '/services/bathroom-safety' },
    { name: 'Our Process', href: '/#process' },
    { name: 'Why Us', href: '/#why-us' },
    { name: 'Blog', href: '/blog' },
  ];

  const isSolid = headerVariant === "solid";
  const useSolidHeader = isSolid || isScrolled;

  return (
    <div className="bg-white">
      <header className={cn(
        "fixed w-full z-50",
        isSolid ? "" : "transition-all duration-300",
        useSolidHeader ? "bg-white border-b border-gray-100" : "bg-transparent",
        isScrolled && "shadow-sm"
      )}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Outlive Homes</span>
              <span className={cn(
                "text-xl font-bold tracking-tight",
                isSolid ? "" : "transition-colors duration-300",
                useSolidHeader ? "text-anchor" : "text-white"
              )}>
                Outlive Homes
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className={cn(
                "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5",
                isSolid ? "" : "transition-colors",
                useSolidHeader ? "text-text-body" : "text-white"
              )}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => {
              const Tag = item.href.startsWith('/') ? Link : 'a';
              return (
                <Tag
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-semibold leading-6",
                    isSolid ? "" : "transition-colors duration-300",
                    useSolidHeader
                      ? "text-text-body hover:text-blue"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {item.name}
                </Tag>
              );
            })}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
            <Button
              onClick={() => setLeadFormOpen(true)}
              className={cn(
                "rounded-full",
                isSolid ? "" : "transition-all duration-300",
                useSolidHeader
                  ? "bg-blue hover:bg-blue/90 text-white shadow-lg shadow-blue/20"
                  : "bg-white text-anchor hover:bg-white/90"
              )}
            >
              Get Your Free Assessment
            </Button>
          </div>
        </nav>
        {mobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-anchor/10">
              <div className="flex items-center justify-between">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="-m-1.5 p-1.5">
                  <span className="sr-only">Outlive Homes</span>
                  <span className="text-xl font-bold tracking-tight text-anchor">Outlive Homes</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-text-body"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => {
                      const Tag = item.href.startsWith('/') ? Link : 'a';
                      return (
                        <Tag
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text-body hover:bg-bg-gray"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Tag>
                      );
                    })}
                  </div>
                  <div className="py-6 space-y-4">
                    <Button
                      onClick={() => {
                        setLeadFormOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-blue hover:bg-blue/90 text-white rounded-full shadow-lg shadow-blue/20"
                    >
                      Get Your Free Assessment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <StickyCtaBanner
        visible={showBanner}
        onOpenModal={() => setLeadFormOpen(true)}
        config={bannerConfig}
      />

      <main>
        {isSolid && <div className="h-20" />}
        {children}
      </main>

      <footer className="bg-anchor text-white" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-20 lg:px-8 lg:pt-24">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-4">
              <p className="text-lg font-bold text-white">Outlive Homes</p>
              <p className="text-sm leading-6 text-white/70 italic">
                The Art and Science of Outliving at Home
              </p>
              <p className="text-sm leading-6 text-white/50">
                South Florida &middot; Miami and Surrounding Metros
              </p>
              <p className="text-xs text-white/40">Founded 2025</p>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white/50 mb-6 uppercase">Quick Links</h3>
                <ul role="list" className="space-y-3">
                  <li><Link href="/services/bathroom-safety" className="text-sm text-white/70 hover:text-white">Bathroom Safety</Link></li>
                  <li><a href="/#process" className="text-sm text-white/70 hover:text-white">Our Process</a></li>
                  <li><a href="/#why-us" className="text-sm text-white/70 hover:text-white">Why Us</a></li>
                  <li><Link href="/blog" className="text-sm text-white/70 hover:text-white">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white/50 mb-6 uppercase">Company</h3>
                <ul role="list" className="space-y-3">
                  <li><Link href="/partners" className="text-sm text-white/70 hover:text-white">Partners</Link></li>
                  <li>
                    <button
                      onClick={() => setLeadFormOpen(true)}
                      className="text-sm text-white/70 hover:text-white text-left"
                    >
                      Contact Us
                    </button>
                  </li>
                  <li>
                    <Link href={createPageUrl('PrivacyPolicy')} className="text-sm text-white/70 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-white/50">&copy; {new Date().getFullYear()} Outlive Homes. All rights reserved.</p>
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
