"use client";

import { Compass, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import PreFillForm from "../PreFillForm";
import Sidebar from "./Sidebar";

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

      {/* Main Content */}
      <main className="flex-1  ">
        <div className=" mx-auto ">{children}</div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav
        className="  fixed bottom-0 left-0 right-0 bg-[#0F172A] backdrop-blur-lg 
          border-t border-gray-800 z-40"
      >
        <div className="flex justify-around items-center h-12 max-w-4xl mx-auto">
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
