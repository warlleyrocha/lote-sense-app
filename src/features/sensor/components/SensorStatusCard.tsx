import Icon from "@/components/Icon";
import { toneStyles } from "../constants";
import type { Sensor } from "../types";
import { batteryTone, formatPercent, signalTone } from "../utils";

export default function SensorStatusCard({ sensor }: { sensor: Sensor }) {
  const offline = !sensor.online;
  const metrics = [
    {
      label: "Sinal",
      icon: "signal",
      value: sensor.signal,
      tone: signalTone(sensor),
    },
    {
      label: "Bateria",
      icon: "battery",
      value: sensor.battery,
      tone: batteryTone(sensor),
    },
  ] as const;

  return (
    <section className="rounded-card border border-line bg-surface p-5">
      <div className="flex items-center gap-3">
        <span
          className={`size-3 shrink-0 rounded-full ring-4 ${
            offline
              ? "bg-critical ring-critical-badge"
              : "bg-online ring-primary-soft"
          }`}
        />
        <div>
          <h2
            className={`text-lg font-semibold ${offline ? "text-critical" : "text-ink"}`}
          >
            {offline ? "Sensor offline" : "Sensor online"}
          </h2>
          <p className="mt-0.5 text-sm text-ink-muted">
            Última comunicação: {sensor.lastCommunication}
          </p>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4">
        {metrics.map((metric, index) => (
          <div
            className={index > 0 ? "border-l border-line pl-4" : ""}
            key={metric.label}
          >
            <dt className="flex items-center gap-1.5 text-xs text-ink-muted">
              <Icon className="size-4 text-ink-faint" name={metric.icon} />
              {metric.label}
            </dt>
            <dd
              className={`mt-1 text-xl font-semibold ${toneStyles[metric.tone].text}`}
            >
              {metric.label === "Sinal" && offline
                ? "—"
                : formatPercent(metric.value)}
            </dd>
            {metric.tone !== "ok" && (
              <dd
                className={`mt-0.5 text-xs font-medium ${toneStyles[metric.tone].text}`}
              >
                {metric.label === "Sinal" ? "Sinal fraco" : "Bateria baixa"}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
