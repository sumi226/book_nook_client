import { requireUser } from "@/lib/dal";

export const metadata = { title: "My profile | Book Nook" };

export default async function MyProfilePage() {
  const user = await requireUser("/my-profile");
  return (
    <main id="main-content" className="profile-page">
      <section className="page-intro personal-intro">
        <p className="eyebrow"><span className="eyebrow-line" />Your reader profile</p>
        <h1>My <em>profile.</em></h1>
      </section>
      <section className="profile-card section-wrap">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="profile-photo" src={user.image} alt="" />
        ) : (
          <div className="profile-photo profile-initial" aria-hidden="true">
            {user.name.slice(0, 1).toUpperCase()}
          </div>
        )}
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </section>
    </main>
  );
}
