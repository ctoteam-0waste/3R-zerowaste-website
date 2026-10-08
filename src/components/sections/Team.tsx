import Image from "next/image";
import { ChartColumn, Leaf, Target, Users } from "lucide-react";
import { team, teamIntro, teamValues } from "@/content/team";
import { LinkedInIcon } from "@/components/ui/SocialIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt } from "@/components/ui/Tilt";

const valueIcons = [Users, Target, ChartColumn, Leaf];

export function Team() {
  return (
    <section id="team" aria-labelledby="team-h" className="section-pad relative overflow-hidden bg-paper text-text">
      <div aria-hidden className="absolute left-1/2 top-[40%] h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(200,242,106,.28),rgba(245,242,234,0))]" />
      <div className="container-site relative flex flex-col gap-14">
        <SectionHeading
          id="team-h"
          eyebrow="09 — Our Team"
          title="People building the future of sustainable technology."
          aside={<p className="max-w-[420px] text-[17px] leading-[1.7] text-text-muted">{teamIntro}</p>}
        />
        <ul className="flex flex-wrap justify-center gap-5">
          {team.map((m, i) => (
            <Reveal as="li" key={m.name} delay={(i % 5) * 0.05} className="max-w-[236px] flex-[1_1_150px] sm:flex-[1_1_210px]">
              <Tilt className="h-full">
                <article className="group relative flex h-full flex-col items-center gap-4 rounded-[26px] border border-text/[0.07] bg-white/[0.82] px-3.5 pb-5 pt-7 text-center transition-[box-shadow,border-color] duration-500 hover:border-emerald-brand/35 hover:shadow-[0_40px_70px_-40px_rgba(11,40,28,.45)] sm:px-5 sm:pb-[26px] sm:pt-[34px]">
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      aria-label={`${m.name} on LinkedIn`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-3.5 top-3.5 grid h-11 w-11 place-items-center rounded-full text-text-muted transition-colors hover:bg-text hover:text-lime-brand"
                    >
                      <LinkedInIcon className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <div className="h-24 w-24 rounded-full bg-[conic-gradient(from_200deg,#2BD08B,#C8F26A,#6FE3D6,#2BD08B)] p-1 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105 sm:h-[124px] sm:w-[124px]">
                    <Image quality={90} src={m.photo} alt={`Portrait of ${m.name}`} width={240} height={240} className="h-full w-full rounded-full border-[3px] border-white bg-[#DCE6D3] object-cover" />
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    {m.founding && <span className="mono-label rounded-md bg-lime-brand px-2 py-1 text-[9.5px] text-text">Founding team</span>}
                    <h3 className="text-xl font-semibold">{m.name}</h3>
                    <span className="mono-label text-[10.5px] leading-normal text-emerald-deep">{m.role}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-text-muted">{m.bio}</p>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </ul>
        <Reveal className="flex flex-wrap justify-center gap-2 self-center rounded-3xl bg-text p-2.5 sm:rounded-full">
          {teamValues.map((v, i) => {
            const I = valueIcons[i];
            return (
              <div key={v} className={`flex min-h-12 items-center gap-2.5 px-5 text-sm font-semibold text-[#F2F6F3] ${i > 0 ? "sm:border-l sm:border-white/[0.12]" : ""}`}>
                <I aria-hidden className="h-[22px] w-[22px] text-lime-brand" strokeWidth={1.6} />
                {v}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
