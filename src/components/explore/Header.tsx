"use client";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle = "Press Enter to search" }: HeaderProps) {
  return (
    <div className="text-center mb-12 space-y-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
        {title}
      </h1>
      <p className="text-gray-400">{subtitle}</p>
    </div>
  );
}
