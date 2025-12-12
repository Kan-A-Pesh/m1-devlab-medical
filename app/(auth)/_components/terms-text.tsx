import Link from "next/link";

export function TermsText() {
  return (
    <p className="text-xs text-center text-slate-500">
      En créant un compte, vous acceptez nos{" "}
      <Link href="/terms" className="text-blue-600 hover:underline">
        Conditions d&apos;utilisation
      </Link>{" "}
      et notre{" "}
      <Link href="/privacy" className="text-blue-600 hover:underline">
        Politique de confidentialité
      </Link>
    </p>
  );
}

