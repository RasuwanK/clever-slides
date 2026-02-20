import Link from "next/link";
import { HomeLink } from "./home-link";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-6">
        <div className="w-full rounded-xl border border-border bg-card p-8 text-center sm:p-10">
          <h1 className="text-3xl font-bold sm:text-4xl text-primary">Slide Not Found</h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            The slide you are looking for does not exist or is no longer
            available.
          </p>
          <HomeLink />
        </div>
      </section>
    </main>
  );
}
