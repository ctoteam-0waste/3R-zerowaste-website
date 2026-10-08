import { getPosts } from "@/lib/content";
import { PostCard } from "@/components/blog/PostCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BlogSection() {
  const posts = getPosts();
  const featured = posts.find((p) => p.featured);
  const latest = posts.filter((p) => !p.featured).slice(0, 3);
  return (
    <section id="blog" aria-labelledby="blog-h" className="section-pad bg-paper text-text">
      <div className="container-site flex flex-col gap-14">
        <SectionHeading
          id="blog-h"
          eyebrow="11 — Insights & Blog"
          title="Ideas for a circular, measurable future."
          aside={
            <Button href="/blog" variant="outline" arrow>
              View all articles
            </Button>
          }
        />
        {featured && (
          <Reveal>
            <PostCard post={featured} featured />
          </Reveal>
        )}
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-7">
          {latest.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.06}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
