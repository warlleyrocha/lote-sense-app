import type { Lot } from "@/features/lots/types";
import { toneStyles } from "../constants";
import type { Sensor } from "../types";

export default function SensorInfo({
  lot,
  sensor,
}: {
  lot: Lot;
  sensor: Sensor;
}) {
  const operational = sensor.online && sensor.operational;
  const rows = [
    { label: "ID", value: sensor.id },
    { label: "Nano-lote", value: lot.id },
    { label: "Instalação", value: sensor.installedAt },
    { label: "Etapa", value: lot.stage },
  ];

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-ink">
        Informações do sensor
      </h2>
      <dl className="divide-y divide-line rounded-card border border-line bg-surface px-4">
        {rows.map((row) => (
          <div
            className="flex items-center justify-between gap-4 py-3.5"
            key={row.label}
          >
            <dt className="text-sm text-ink-muted">{row.label}</dt>
            <dd className="text-sm font-semibold text-ink">{row.value}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 py-3.5">
          <dt className="text-sm text-ink-muted">Status</dt>
          <dd
            className={`flex items-center gap-2 text-sm font-semibold ${
              operational ? "text-ink" : toneStyles.warning.text
            }`}
          >
            <span
              className={`size-2 rounded-full ${operational ? toneStyles.ok.dot : toneStyles.warning.dot}`}
            />
            {operational ? "Operacional" : "Requer manutenção"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
