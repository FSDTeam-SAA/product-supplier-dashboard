import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-4 text-center">
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-50 text-[#2A6592] shadow-sm">
        <FileQuestion className="h-12 w-12 stroke-[1.5]" />
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        404
      </h1>
      <h2 className="mt-2 text-xl font-semibold text-slate-700">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button className="bg-[#2A6592] hover:bg-[#204e71] text-white flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link href="/supplier">
          <Button variant="outline" className="flex items-center gap-2 border-slate-200">
            <ArrowLeft className="h-4 w-4" />
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
