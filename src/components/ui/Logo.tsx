import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label={`${site.name} Climate-tech — home`} className="flex items-center gap-3 text-[#F2F6F3]">
      <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-white/20">
        <Image quality={90} src="/images/brand/logo-mark.png" alt="" width={44} height={44} priority />
      </span>
      <span className="flex flex-col leading-[1.05]">
        <span className="font-display text-[17px] font-semibold tracking-[-0.01em]">{site.name}</span>
        <span className="mono-label text-[9px] text-text-dim">Climate-tech</span>
      </span>
    </Link>
  );
}
