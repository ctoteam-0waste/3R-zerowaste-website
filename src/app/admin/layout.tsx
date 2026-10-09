import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/** Full-screen shell that sits over the public navbar, footer and mascot. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[200] overflow-y-auto bg-paper text-text">{children}</div>;
}
