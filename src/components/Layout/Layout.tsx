"use client";

import { Compass, Gamepad2, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import PreFillForm from "../PreFillForm";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const { userContext } = useUserContext();

  if (!userContext) {
    return <PreFillForm />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar />
      <MobileHeader />

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto bg-[#0F172A] pt-14">{children}</div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 bg-[#0F172A] backdrop-blur-lg 
          border-t border-gray-800 z-40 md:hidden"
      >
        <div className="flex justify-around items-center h-14 max-w-4xl mx-auto relative">
          <Link
            href="/"
            className={`flex flex-col items-center gap-0.5 px-6 py-1 rounded-lg
                transition-colors ${
                  pathname === "/"
                    ? "text-primary"
                    : "text-gray-400 hover:text-gray-300"
                }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px]">Explore</span>
          </Link>

          {/* New Thread Button */}
          <Link
            href="/chathistory"
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 
              bg-primary rounded-full flex items-center justify-center 
              shadow-lg shadow-primary/20 hover:bg-primary/90 
              active:scale-95 transition-all duration-200"
          >
            <Plus className="w-6 h-6 text-white" />
          </Link>

          <Link
            href="/playground"
            className={`flex flex-col items-center gap-0.5 px-6 py-1 rounded-lg
                transition-colors ${
                  pathname === "/playground"
                    ? "text-primary"
                    : "text-gray-400 hover:text-gray-300"
                }`}
          >
            <Gamepad2 className="w-5 h-5" />
            <span className="text-[10px]">Playground</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
