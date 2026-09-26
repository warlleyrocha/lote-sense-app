import type { ReactNode } from "react";
import Icon from "@/components/Icon";
import { metricLabel } from "@/features/lots/constants";
import type { Lot, Metric } from "@/features/lots/types";
import { getReferenceState } from "@/features/lots/utils";
import { reliabilityContent } from "../constants";
import type { Reliability } from "../types";

const metrics: Metric[] = ["temperature", "humidity"];

function Row({
  label,
  icon,
  iconClass,
  children,
}: {
  label: string;
  icon: "check" | "alert";
  iconClass: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-3.5">
      <span
        className={`flex size-9 shrink-0 items-center justify-center rounded-full ${iconClass}`}
      >
        <Icon className="size-4" name={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-section text-ink-faint">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-ink">{children}</p>
      </div>
    </div>
  );
}

// Separa "problema no café" de "problema no sensor". O café usa tom neutro: âmbar/vermelho ficam para o equipamento.
export default function DiagnosisCard({
  lot,
  reliability,
}: {
  lot: Lot;
  reliability: Reliability;
}) {
  const sensorContent = reliabilityContent[reliability];
  const deviating = metrics.filter(
    (metric) => getReferenceState(metric, lot[metric]) !== "within",
  );
  const coffeeOk = deviating.length === 0;
  const sensorOk = reliability === "reliable";

  const deviatingNames = deviating.map((metric, index) => {
    const label = metricLabel[metric];
    return index === 0 ? label : label.toLowerCase();
  });
  const coffeeText = coffeeOk
    ? "Dentro da referência"
    : `${deviatingNames.join(" e ")} fora da referência`;

  let conclusion: string;
  if (!sensorOk) {
    conclusion =
      "O sensor apresenta problema. Confirme no local antes de agir sobre o café.";
  } else if (coffeeOk) {
    conclusion = "Leitura válida: o café está dentro da referência.";
  } else {
    conclusion = `Leitura válida: a alteração no ${lot.name} vem do café, não de falha do equipamento.`;
  }

  return (
    <section aria-labelledby="diagnosis-title">
      <h2 className="mb-3 text-lg font-semibold text-ink" id="diagnosis-title">
        Sensor e café
      </h2>
      <div className="rounded-card border border-line bg-surface px-4">
        <div className="divide-y divide-line">
          <Row
            icon={sensorOk ? "check" : "alert"}
            iconClass={
              sensorOk ? "bg-primary text-surface" : sensorContent.iconBadge
            }
            label="Sensor"
          >
            <span className={sensorOk ? "" : sensorContent.text}>
              {sensorContent.sensorLabel}
            </span>
          </Row>
          <Row
            icon={coffeeOk ? "check" : "alert"}
            iconClass={
              coffeeOk
                ? "bg-primary-soft text-primary"
                : "bg-muted text-ink ring-1 ring-line-strong"
            }
            label={`Café • ${lot.name}`}
          >
            {coffeeText}
          </Row>
        </div>
        <p className="border-t border-line py-3.5 text-sm leading-relaxed text-ink-muted">
          {conclusion}
        </p>
      </div>
    </section>
  );
}
