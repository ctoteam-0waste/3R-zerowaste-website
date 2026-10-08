import Link from "next/link";
import { Mascot } from "@/components/ui/Mascot";

export default function NotFound() {
  return (
    <section className="-mt-[76px] flex min-h-[80vh] items-center bg-ink pt-[76px] text-[#F2F6F3]">
      <div className="container-site flex flex-wrap items-center gap-10">
        <div className="w-[180px]">
          <Mascot />
        </div>
        <div className="flex flex-col gap-4">
          <p className="mono-label text-xs text-lime-brand">404</p>
          <h1 className="h-section">This page wandered off.</h1>
          <Link href="/" className="font-semibold text-lime-brand">
            ← Back to 3R ZeroWaste
          </Link>
        </div>
      </div>
    </section>
  );
}
