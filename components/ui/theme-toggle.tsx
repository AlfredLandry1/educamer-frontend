"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { useEffect, useState } from "react";

const themes = [
  { value: "light", label: "Clair", icon: Sun },
  { value: "dark", label: "Sombre", icon: Moon },
  { value: "system", label: "Auto", icon: Laptop },
];

export default function ThemeToggle() {
  const { theme = "system", setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const current = themes.find(t => t.value === theme) || themes[2];
  const Icon = current.icon;

  return (
    <div className="relative group">
      <button
        aria-label="Changer le thème"
        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-primary-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 shadow-sm"
        tabIndex={0}
        onClick={() => {
          const idx = themes.findIndex(t => t.value === theme);
          setTheme(themes[(idx + 1) % themes.length].value);
        }}
      >
        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max text-xs text-gray-500 bg-white/90 rounded px-2 py-1 shadow pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity">
        {current.label}
      </div>
    </div>
  );
} 