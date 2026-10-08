import {
  ChartColumn, Recycle, ShieldCheck, TrendingUp, Globe, Heart, Cpu, Database, Target, Layers, UserRound, Sparkles, Leaf,
  type LucideProps,
} from "lucide-react";
import type { IconKey } from "@/content/home";

const map = {
  esg: ChartColumn,
  circular: Recycle,
  epr: ShieldCheck,
  carbon: TrendingUp,
  climate: Globe,
  engagement: Heart,
  tech: Cpu,
  data: Database,
  measurable: Target,
  scalable: Layers,
  human: UserRound,
  ai: Sparkles,
  sustainability: Leaf,
} satisfies Record<IconKey, React.ComponentType<LucideProps>>;

export function Icon({ name, ...props }: { name: IconKey } & LucideProps) {
  const C = map[name];
  return <C aria-hidden strokeWidth={1.6} {...props} />;
}
