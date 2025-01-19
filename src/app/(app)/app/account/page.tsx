import { checkAuthenticationAndMembership } from "@/lib/server-utils";

export default async function Page() {
  const user = await checkAuthenticationAndMembership();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white">Account</h1>

      <p className="text-white mt-2">
        Logged in with email: <span className="font-bold">{user.email}</span>
      </p>
    </div>
  );
}
