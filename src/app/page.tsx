import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { HOUSEHOLDS_COOKIE } from "@/lib/token";
import { parseHouseholdList } from "@/lib/household-list";
import CreateHouseholdForm from "@/components/create-household-form";
import { APP_NAME, APP_DESC } from "@/constants";
import WelcomeToast from "@/components/welcome-toast";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ new?: string }>;
}) => {
  const cookieStore = await cookies();
  const households = parseHouseholdList(cookieStore.get(HOUSEHOLDS_COOKIE)?.value);
  const { new: forceNew } = await searchParams;

  if (households.length > 0 && !forceNew) {
    redirect(`/h/${households[households.length - 1].token}`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <WelcomeToast />
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
          <p className="mt-8 text-sm font-medium text-green-700">
            No account. No password. Just share the link.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;