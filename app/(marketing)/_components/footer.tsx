import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-slate-900">CareUp</span>
          </div>

          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} CareUp. Tous droits réservés.
          </div>

          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Confidentialité</Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

