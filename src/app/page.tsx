import { APP_DESC, APP_NAME } from "@/constants";
import { HOUSEHOLD_COOKIE } from "@/lib/token";
import { cookies } from "next/headers";
import Link from "next/link";
import CreateHouseholdForm from "./components/create-household-form";


const Home = async () => {
  const cookieStore = await cookies();
  const rememberedToken = cookieStore.get(HOUSEHOLD_COOKIE)?.value;
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-xl text-center">
          <div className="mb-6 text-6xl">🪴</div>
          <h1 className="mb-4 text-5xl font-semibold tracking-tight text-green-950">
            {APP_NAME}
          </h1>
          <p className="mx-auto mb-8 max-w-md text-lg leading-relaxed text-green-800">
            {APP_DESC}
          </p>

          <CreateHouseholdForm />

          {rememberedToken && (
            <Link
              href={`/h/${rememberedToken}`}
              className="mt-5 inline-block text-sm font-medium text-green-700 underline underline-offset-4"
            >
              Continue to your last household
            </Link>
          )}
          <p className="mt-8 text-sm font-medium text-green-700">
            No account. No password. Just share the link.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;