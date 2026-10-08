import { redirect } from "next/navigation";

/** Cookie Policy is paused for now — cookies are covered in the Privacy Policy (section 7). */
export default function Page() {
  redirect("/privacy#s-7");
}
