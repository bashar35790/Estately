"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { usePathname } from "next/navigation";

interface NavbarItem {
  label: string;
  href: string;
}

interface NavbarProps {
  brand: ReactNode;
  items: NavbarItem[];
  rightContent?: ReactNode;
  className?: string;
  position?: "static" | "sticky" | "fixed";
}

export function Navbar({
  brand,
  items,
  rightContent,
  className,
  position = "sticky",
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "w-full border-b border-slate-800/70 bg-slate-950/95 text-white backdrop-blur-xl",
        position === "sticky" && "sticky top-0",
        position === "fixed" && "fixed top-0",
        position === "static" && "relative",
        className
      )}
    >
      <header
        className={cn(
          "flex items-center justify-between gap-4 px-4 py-3 container mx-auto",
        )}
      >
        <div className="flex items-center gap-4">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <div className="flex items-center gap-3">
            {brand}
          </div>
        </div>

        <ul className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium transition hover:text-white",
                  pathname === item.href ? "text-primary border-b-2 border-secondary pb-1" : "text-slate-300"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {rightContent && <div className="hidden items-center gap-3 md:flex">{rightContent}</div>}
      </header>

      {isMenuOpen && (
        <div className="border-t border-slate-800/70 bg-slate-950/95 md:hidden">
          <ul className="flex flex-col gap-2 px-4 py-4">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-sm transition hover:bg-slate-900 hover:text-white",
                    pathname === item.href ? "bg-slate-900 text-white" : "text-slate-300"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {rightContent && (
            <div className="border-t border-slate-800/70 px-4 py-4">
              <div className="flex flex-col gap-3">{rightContent}</div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
