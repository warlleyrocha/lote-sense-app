import type { ReactNode } from "react";
import Icon from "@/components/Icon";
import { metricLabel } from "@/features/lots/constants";
import type { Bag, Lot } from "@/features/lots/types";
import { bagLabel, deviatingMetrics } from "@/features/lots/utils";
import { reliabilityContent } from "../constants";
import type { Reliability } from "../types";

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

// Separa "problema no café" de "problema no sensor" e compara com as outras sacas do lote:
// desvio só nesta saca aponta para a saca; em todas, para o ambiente.
// O café usa tom neutro: âmbar/vermelho ficam para o equipamento.
export default function DiagnosisCard({
  lot,
  bag,
  reliability,
}: {
  lot: Lot;
  bag: Bag;
  reliability: Reliability;
}) {
  const sensorContent = reliabilityContent[reliability];
  const deviating = deviatingMetrics(bag);
  const coffeeOk = deviating.length === 0;
  const sensorOk = reliability === "reliable";
  const others = lot.bags.filter((item) => item.number !== bag.number);
  const othersAffected = others.filter((item) => item.status !== "healthy");

  const deviatingNames = deviating.map((metric, index) => {
    const label = metricLabel[metric];
    return index === 0 ? label : label.toLowerCase();
  });
  const coffeeText = coffeeOk
    ? "Dentro da referência"
    : `${deviatingNames.join(" e ")} fora da referência`;
  let othersText: string;
  if (othersAffected.length === 0) {
    othersText = `${others.length === 1 ? "A outra está" : `As ${others.length} estão`} dentro do esperado`;
  } else if (othersAffected.length === others.length) {
    othersText = `${others.length === 1 ? "A outra também está" : `As ${others.length} também estão`} fora do esperado`;
  } else {
    othersText = `${othersAffected.length} de ${others.length} fora do esperado`;
  }

  let conclusion: string;
  if (!sensorOk) {
    conclusion =
      "O sensor apresenta problema. Confirme no local antes de agir sobre o café.";
  } else if (coffeeOk) {
    conclusion = "Leitura válida: o café desta saca está dentro da referência.";
  } else if (othersAffected.length === 0 && others.length > 0) {
    conclusion = `Leitura válida: o desvio é só desta saca. Localize-a pela etiqueta ${bag.tag} e verifique o café.`;
  } else if (othersAffected.length === others.length) {
    conclusion =
      "Leitura válida: todas as sacas do lote desviam juntas, o que indica uma condição do ambiente de armazenamento.";
  } else {
    conclusion = `Leitura válida: o desvio atinge parte das sacas do ${lot.name}. Verifique as sacas afetadas e o entorno delas.`;
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
            label={`Café • ${bagLabel(bag.number)}`}
          >
            {coffeeText}
          </Row>
          {others.length > 0 && (
            <Row
              icon={othersAffected.length === 0 ? "check" : "alert"}
              iconClass={
                othersAffected.length === 0
                  ? "bg-primary-soft text-primary"
                  : "bg-muted text-ink ring-1 ring-line-strong"
              }
              label={`Outras sacas • ${lot.name}`}
            >
              {othersText}
            </Row>
          )}
        </div>
        <p className="border-t border-line py-3.5 text-sm leading-relaxed text-ink-muted">
          {conclusion}
        </p>
      </div>
    </section>
  );
}
