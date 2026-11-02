import { AccountForm } from "@/components/book-forms";
import { safeReturnPath } from "@/lib/dal";

export const metadata = { title: "Sign In" };
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string; registered?: string }>;
}) {
  const query = await searchParams;
  return (
    <main id="main-content" className="account-page">
      <div className="account-aside">
        <p className="eyebrow"><span className="eyebrow-line" />A library of your own</p>
        <blockquote>“A book is a dream that you hold in your hand.”</blockquote>
        <span>— Neil Gaiman</span>
        <div className="account-aside-mark">✳</div>
      </div>
      <AccountForm
        mode="login"
        redirectTo={safeReturnPath(query.callbackURL)}
        registered={query.registered === "1"}
      />
    </main>
  );
}
