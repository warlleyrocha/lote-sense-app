import { Link, useParams } from "react-router";
import Icon from "@/components/Icon";
import ScreenHeader from "@/components/ScreenHeader";
import LotNotFound from "@/features/lots/components/LotNotFound";
import TrendChart from "@/features/lots/components/TrendChart";
import type { Metric } from "@/features/lots/types";
import { bagLabel } from "@/features/lots/utils";
import ConnectionQuality from "../components/ConnectionQuality";
import CurrentReadings from "../components/CurrentReadings";
import DiagnosisCard from "../components/DiagnosisCard";
import ReliabilityNote from "../components/ReliabilityNote";
import SensorInfo from "../components/SensorInfo";
import SensorStatusCard from "../components/SensorStatusCard";
import { useBag } from "../hooks/useBag";
import { getReliability } from "../utils";

const metrics: Metric[] = ["temperature", "humidity"];

export default function BagPage() {
  const { id, bag: bagNumber } = useParams();
  const detail = useBag(id, bagNumber);

  if (!detail) return <LotNotFound />;

  const { lot, bag } = detail;
  const reliability = getReliability(bag.sensor);

  return (
    <>
      <ScreenHeader
        backLabel={`Voltar para ${lot.name}`}
        backTo={`/lotes/${lot.id}`}
        subtitle={`${lot.name} • Etiqueta ${bag.tag}`}
        title={bagLabel(bag.number)}
      />

      <div className="space-y-7 px-page py-5">
        <SensorStatusCard sensor={bag.sensor} />
        <CurrentReadings bag={bag} reliability={reliability} />
        <DiagnosisCard bag={bag} lot={lot} reliability={reliability} />

        <section>
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-ink">Últimas 24 horas</h2>
            <p className="mt-1 text-sm text-ink-muted">
              {bag.status === "healthy"
                ? "Condições estáveis nas últimas horas"
                : "Tendência de elevação nas últimas horas"}
            </p>
          </div>
          <div className="space-y-3">
            {metrics.map((metric) => (
              <TrendChart
                key={metric}
                metric={metric}
                status={bag.status}
                value={bag[metric]}
              />
            ))}
          </div>
        </section>

        <SensorInfo bag={bag} lot={lot} />
        <ConnectionQuality sensor={bag.sensor} />
        <ReliabilityNote reliability={reliability} />

        <Link
          className="flex items-center justify-center gap-2 rounded-inner border border-line bg-surface px-4 py-4 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
          to={`/lotes/${lot.id}/historico?saca=${bag.number}`}
        >
          <Icon className="size-5" name="history" />
          Ver histórico da saca
        </Link>
      </div>
    </>
  );
}
