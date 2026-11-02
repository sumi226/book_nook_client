import { AccountForm } from "@/components/book-forms";
import { safeReturnPath } from "@/lib/dal";

export const metadata = { title: "Join the nook | Book Nook" };
export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string }>;
}) {
  const query = await searchParams;
  return (
    <main id="main-content" className="account-page">
      <div className="account-aside account-aside-register">
        <p className="eyebrow"><span className="eyebrow-line" />A new chapter begins</p>
        <blockquote>Let the pages take you somewhere you haven&apos;t been.</blockquote>
        <span>YOUR NEXT FAVORITE IS WAITING</span>
        <div className="account-aside-mark">❋</div>
      </div>
      <AccountForm
        mode="register"
        redirectTo={safeReturnPath(query.callbackURL)}
      />
    </main>
  );
}
