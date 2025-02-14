"use client";

import Link from "next/link";

export default function MobileHeader() {
  return (
    <div className="h-14 flex items-center px-4 fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-lg  z-40 md:hidden">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
            <path
              fill="currentColor"
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            />
          </svg>
        </div>
        <span className="text-xl font-bold text-white">educasm</span>
      </Link>
    </div>
  );
}
