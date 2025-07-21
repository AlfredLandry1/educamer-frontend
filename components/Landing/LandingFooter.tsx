import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-8">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} Educamer</span>
          <span className="hidden md:inline">|</span>
          <Link href="/privacy" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600">Confidentialité</Link>
          <span className="hidden md:inline">|</span>
          <Link href="/terms" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600">CGU</Link>
          <span className="hidden md:inline">|</span>
          <Link href="/mentions-legales" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600">Mentions légales</Link>
          <span className="hidden md:inline">|</span>
          <a href="mailto:contact@educamer.com" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://twitter.com/educamer" aria-label="Twitter" className="hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600">Twitter</a>
          <a href="https://linkedin.com/company/educamer" aria-label="LinkedIn" className="hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600">LinkedIn</a>
        </div>
        <div>
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
} 