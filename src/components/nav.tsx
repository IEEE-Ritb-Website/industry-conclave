'use client'

import { useState } from 'react'
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar, NavbarButton, NavbarLogo, NavBody, NavItems } from './ui/resizable-navbar'
import Link from 'next/link';

export default function Nav() {
  const navItems = [
    {
      name: "About",
      link: "/#about",
    },
    {
      name: "Speakers",
      link: "/speakers",
    },
    {
      name: "FAQ",
      link: "/#faq",
    },
    {
      name: "Contact",
      link: "/#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4 z-10">
          <NavbarButton href='/#timeline' variant="secondary">Timeline</NavbarButton>
          <NavbarButton href='/register' variant="primary">Register</NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <Link
              href={"/"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600"
            >
              <span className="block">Home</span>
            </Link>
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600"
            >
              <span className="block">{item.name}</span>
            </Link>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
              href='/#timeline'
            >
              Timeline
            </NavbarButton>
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="gradient"
              className="w-full"
              href='/register'
            >
              Register
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}