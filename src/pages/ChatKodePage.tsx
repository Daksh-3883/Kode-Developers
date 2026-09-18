import { Hero } from "@/components/chatkode/Hero";
import { WhatIs } from "@/components/chatkode/sections/WhatIs";
import { Pipeline } from "@/components/chatkode/sections/Pipeline";
import { Mathematics } from "@/components/chatkode/sections/Mathematics";
import { Coding } from "@/components/chatkode/sections/Coding";
import { Algorithms } from "@/components/chatkode/sections/Algorithms";
import { Developers } from "@/components/chatkode/sections/Developers";
import { Approach, KodeDevelopers } from "@/components/chatkode/sections/Approach";
import { HumanFirst } from "@/components/chatkode/sections/HumanFirst";
import { FinalCTA } from "@/components/chatkode/sections/FinalCTA";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function ChatKodePage() {
  useDocumentMeta(
    "ChatKode - AI for Code, Mathematics & Algorithms",
    "ChatKode is a developer-focused AI from Kode Developers, built for coding, mathematics, algorithms and technical problem solving.",
  );

  return (
    <div className="chatkode-integrated min-h-screen bg-background">
      <main>
        <h1 className="sr-only">
          ChatKode - a developer-focused AI for code, mathematics and algorithms
        </h1>
        <Hero />
        <WhatIs />
        <Pipeline />
        <Mathematics />
        <Coding />
        <Algorithms />
        <Developers />
        <Approach />
        <KodeDevelopers />
        <HumanFirst />
        <FinalCTA />
      </main>
    </div>
  );
}
