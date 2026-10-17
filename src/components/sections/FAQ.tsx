import { faqs, faqJsonLd } from "@/content/faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-h" className="section-pad bg-ink-2 text-[#F2F6F3]">
      <div className="container-site flex flex-col gap-12">
        <SectionHeading id="faq-h" tone="dark" eyebrow="13 — FAQ" title="Questions people ask about 3R" />
        {/* Native <details> keeps every answer in the server HTML, so crawlers read it without JS */}
        <Reveal>
          <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {faqs.map((f) => (
              <li key={f.q}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[19px] font-semibold [&::-webkit-details-marker]:hidden">
                    <h3>{f.q}</h3>
                    <span aria-hidden className="text-2xl leading-none text-lime-brand transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[820px] text-[15px] leading-relaxed text-[#B9C8C0]">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <JsonLd data={faqJsonLd} />
    </section>
  );
}
