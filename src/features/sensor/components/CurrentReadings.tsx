import Icon from "@/components/Icon";
import ReferenceHint from "@/features/lots/components/ReferenceHint";
import { metricLabel } from "@/features/lots/constants";
import type { Lot, Metric } from "@/features/lots/types";
import {
  formatMetric,
  formatReference,
  getReferenceState,
  isDeviation,
  referenceStateLabel,
} from "@/features/lots/utils";
import type { Reliability, Sensor } from "../types";

const metrics: { metric: Metric; icon: "thermometer" | "droplet" }[] = [
  { metric: "temperature", icon: "thermometer" },
  { metric: "humidity", icon: "droplet" },
];

type CurrentReadingsProps = {
  lot: Lot;
  sensor: Sensor;
  reliability: Reliability;
};

// Valores em tom neutro: aqui a cor de alerta só indica problema do equipamento (ver `reliability`).
export default function CurrentReadings({
  lot,
  sensor,
  reliability,
}: CurrentReadingsProps) {
  const stale = reliability === "unreliable";

  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-ink">Condições do armazenamento</h2>
        <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
          Medidos pelo sensor
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map(({ metric, icon }) => {
          const value = lot[metric];
          const state = getReferenceState(metric, value);
          return (
            <article
              className="rounded-card border border-line bg-surface p-4"
              key={metric}
            >
              <div className="flex size-9 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Icon className="size-5" name={icon} />
              </div>
              <p className="mt-4 text-xs font-medium text-ink-muted">
                {metricLabel[metric]}
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">
                {formatMetric(metric, value)}
              </p>
              <p className="mt-2 text-xs text-ink-muted">
                {isDeviation(state)
                  ? `${referenceStateLabel[state]} do café`
                  : referenceStateLabel[state]}
                <span className="flex items-center gap-1 text-ink-faint">
                  Ref.: {formatReference(metric)}
                  <ReferenceHint
                    align={metric === "temperature" ? "start" : "end"}
                    metric={metric}
                  />
                </span>
              </p>
            </article>
          );
        })}
      </div>

      <p
        className={`mt-3 flex items-center gap-1.5 text-sm ${stale ? "font-medium text-critical" : "text-ink-muted"}`}
      >
        <Icon className="size-4" name="history" />
        Dados coletados {sensor.collected}
      </p>
    </section>
  );
}
