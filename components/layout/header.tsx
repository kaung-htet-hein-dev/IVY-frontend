'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/helpers';
import { motion } from 'framer-motion';
import { Menu, Scissors, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LanguageSwitcher from './language-switcher';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/booking', label: 'Book Now' },
  { href: '/my-bookings', label: 'My Bookings' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMobileMenuOpen ? 'bg-background shadow-md py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Scissors className="h-6 w-6 text-primary" />
          <span
            className={cn(
              'font-playfair text-xl md:text-2xl font-bold',
              isScrolled || isMobileMenuOpen || !isHome ? 'text-foreground' : 'text-white'
            )}
          >
            IVY Hair Studio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === link.href
                  ? 'text-primary font-medium'
                  : isScrolled || isMobileMenuOpen || !isHome
                    ? 'text-foreground'
                    : 'text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher isScrolled={isScrolled || isMobileMenuOpen || !isHome} />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher isScrolled={isScrolled || isMobileMenuOpen || !isHome} />
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              isScrolled || isMobileMenuOpen || !isHome ? 'text-foreground' : 'text-white'
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background shadow-lg py-4"
        >
          <div className="container px-4 mx-auto flex flex-col space-y-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary py-2',
                  pathname === link.href ? 'text-primary font-medium' : 'text-foreground'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
