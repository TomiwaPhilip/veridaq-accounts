import Link from "next/link";

export function GoogleButton() {
  return (
    <button className="bg-[#E18571] flex items-center justify-center py-3 px-10 rounded-lg">
      <img src="/assets/icons/google.svg" className="w-8 h-8 mr-2" />
      <Link href="/api/auth/google" className="font-semibold text-[18px]">
        Sign in with Google
      </Link>
    </button>
  );
}

export function MicrosoftButton() {
  return (
    <button className="bg-[#D0CBDC] flex items-center justify-center py-3 px-8 rounded-lg">
      <img src="/assets/icons/microsoft.svg" className="w-8 h-8 mr-2" />
      <Link href="/api/auth/microsoft" className="font-semibold text-[18px]">
        Sign in with Microsoft
      </Link>
    </button>
  );
}
