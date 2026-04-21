"use client";

import Link from "next/link";
import Image from "next/image";
import { BRAND, NAV_LINKS, PRACTICE_AREAS } from "../lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative border-t border-line bg-[color:var(--color-charcoal-900)] bg-cover bg-center bg-no-repeat pt-20 pb-10 text-[color:var(--color-ivory)]/80"
      style={{ backgroundImage: "url('/brand/images/footer-bg/footer-dotted-globe-bg%20(2).png')" }}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Columns */}
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <div className="col-span-12 md:col-span-4">
            <Link href="/" className="flex items-center">
              <div className="relative h-28 w-56 overflow-hidden">
                <Image src={BRAND.logo} alt={BRAND.name} fill sizes="224px" unoptimized className="object-contain" />
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[color:var(--color-ivory)]/60">
              A Dubai-rooted legal partnership. Counsel for citizenship,
              residency and the complete legal architecture of global
              enterprise.
            </p>
            <div className="mt-6 flex items-center gap-5">
              {BRAND.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="link-underline eyebrow text-[color:var(--color-ivory)]/70 hover:text-brand"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="eyebrow text-[color:var(--color-ivory)]/50 mb-5">Navigate</div>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[color:var(--color-ivory)]/80 hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="eyebrow text-[color:var(--color-ivory)]/50 mb-5">Practice</div>
            <ul className="grid grid-cols-1 gap-3">
              {PRACTICE_AREAS.slice(0, 8).map((p) => (
                <li key={p} className="text-sm text-[color:var(--color-ivory)]/70 hover:text-brand">
                  <Link href="#expertise">{p}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow text-[color:var(--color-ivory)]/50 mb-5">Chambers</div>
            <address className="not-italic space-y-3 text-sm text-[color:var(--color-ivory)]/80">
              <div>{BRAND.contact.address}</div>
              <a href={`mailto:${BRAND.contact.email}`} className="block hover:text-brand">
                {BRAND.contact.email}
              </a>
              <a href={`tel:${BRAND.contact.phone}`} className="block hover:text-brand">
                {BRAND.contact.phone}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[color:var(--color-ivory)]/10 pt-8 text-xs text-[color:var(--color-ivory)]/50 md:flex-row md:items-center">
          <div>© {year} {BRAND.legal}. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="#" className="link-underline">Privacy Policy</Link>
            <Link href="#" className="link-underline">Terms</Link>
            <Link href="#" className="link-underline">Regulatory</Link>
          </div>
          <div className="font-mono text-[0.65rem]">v.2026.04 — Volume 1</div>
        </div>
      </div>
    </footer>
  );
}
