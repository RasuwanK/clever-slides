"use client";
import { TextAreaWithButton } from "@/components/ui/textarea-with-button";
import { Logo } from "@/components/ui/logo";
import { Typewriter } from "@/components/ui/typewriter";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <main>
        <header className="flex flex-row w-full items-center fixed top-0 p-5">
          <Logo />
          <div className="ml-auto">
            <Link className="text-primary" href="/auth/signin">Sign in</Link>
          </div>
        </header>
        <div id="promt-dialog" className="flex flex-col min-h-screen justify-center items-center gap-10">
          <header className="flex flex-col items-center gap-5">
            <Typewriter text="Think. Type. Create" className="text-6xl font-bold text-primary" />
            <p className="text-xl">Create presentations with a single prompt</p>
          </header>
          <form>
            <TextAreaWithButton
              placeholder="Create a professional presentation for a pitch deck about an AI startup"
            />
          </form>
        </div>
        <footer className="min-h-20 flex flex-col items-center justify-center bg-primary">
          <p className="text-white">Created by Rasuwan Kalhara</p>
        </footer>
      </main>
    </div>
  );
}
