import { toneStyles } from "../constants";
import type { Sensor } from "../types";
import { formatInterval, formatPercent, signalTone } from "../utils";

const SEGMENTS = 10;

export default function ConnectionQuality({ sensor }: { sensor: Sensor }) {
  const filled = sensor.online
    ? Math.floor(sensor.signal / (100 / SEGMENTS))
    : 0;
  const tone = toneStyles[signalTone(sensor)];

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-ink">
        Qualidade da conexão
      </h2>
      <div className="space-y-4 rounded-card border border-line bg-surface p-4">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-ink-muted">Conectividade</p>
            <p className={`text-sm font-semibold ${tone.text}`}>
              {formatPercent(sensor.signal)}
            </p>
          </div>
          <div
            aria-label={`Conectividade ${sensor.online ? formatPercent(sensor.signal) : "indisponível"}`}
            className="mt-2 flex gap-1"
            role="img"
          >
            {Array.from({ length: SEGMENTS }, (_, index) => (
              <span
                className={`h-2.5 flex-1 rounded-sm ${index < filled ? tone.bar : "bg-line"}`}
                key={index}
              />
            ))}
          </div>
        </div>

        <dl className="space-y-3 border-t border-line pt-4">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-sm text-ink-muted">Última sincronização</dt>
            <dd className="text-sm font-semibold tabular-nums text-ink">
              {sensor.lastSync}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-sm text-ink-muted">Intervalo de coleta</dt>
            <dd className="text-sm font-semibold text-ink">
              {formatInterval(sensor.intervalMinutes)}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
