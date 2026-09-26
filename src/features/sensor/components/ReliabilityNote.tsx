import Icon from "@/components/Icon";
import { reliabilityContent } from "../constants";
import type { Reliability } from "../types";

export default function ReliabilityNote({
  reliability,
}: {
  reliability: Reliability;
}) {
  const content = reliabilityContent[reliability];

  return (
    <section
      className={`flex items-start gap-3 rounded-card border p-4 ${content.box}`}
      role={reliability === "reliable" ? undefined : "alert"}
    >
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-full ${content.iconBadge}`}
      >
        <Icon
          className="size-4"
          name={reliability === "reliable" ? "check" : "alert"}
        />
      </span>
      <div>
        <p className={`text-sm font-semibold ${content.text}`}>
          {content.title}
        </p>
        <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
          {content.message}
        </p>
      </div>
    </section>
  );
}
