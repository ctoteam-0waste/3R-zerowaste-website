import { site } from "@/content/site";
import { faqs } from "@/content/faq";

/** /llms.txt — a plain-text brief for AI answer engines (ChatGPT, Perplexity, Gemini, Claude). */
export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> ${site.seoDescription}

${site.about}

## Key facts

- Legal name: ${site.legalName} (also written 3RZeroWaste, 3RZW)
- Founded: 24 July 2020, Gurugram, Haryana, India
- Founder & CEO: Shiv Rao Challa
- Headquarters: ${site.address}, India
- Non-profit arm: 3RZW Environment Foundation (est. 25 September 2020)
- CPCB-authorised e-waste recycler at IMT Manesar, 500 tonnes/year capacity (since 2023)
- 260+ B2B clients, 32+ RWAs, 35+ schools; 17 lakh+ citizens reached through community drives
- Consumer product: KarmaVerse sustainability rewards app (${site.karmaverseUrl})

## Pages

- [Home](${site.url}/): what 3R ZeroWaste does
- [About](${site.url}/about): story, mission, leadership
- [Solutions](${site.url}/solutions): ESG & BRSR, EPR, circular economy, carbon & net zero, climate intelligence
- [KarmaVerse](${site.url}/karmaverse): the sustainability rewards app
- [Impact](${site.url}/impact): clients, waste recovered, community reach
- [Blog](${site.url}/blog): guides on EPR, BRSR, e-waste rules and emissions
- [Contact](${site.url}/contact)

## FAQ

${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Contact

- Email: ${site.footerEmail}
- Phone: ${site.phone}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
