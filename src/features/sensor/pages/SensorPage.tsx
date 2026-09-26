import { Link, useParams } from "react-router";
import Icon from "@/components/Icon";
import ScreenHeader from "@/components/ScreenHeader";
import LotNotFound from "@/features/lots/components/LotNotFound";
import ConnectionQuality from "../components/ConnectionQuality";
import CurrentReadings from "../components/CurrentReadings";
import DiagnosisCard from "../components/DiagnosisCard";
import ReliabilityNote from "../components/ReliabilityNote";
import SensorInfo from "../components/SensorInfo";
import SensorStatusCard from "../components/SensorStatusCard";
import { useSensor } from "../hooks/useSensor";
import { getReliability } from "../utils";

export default function SensorPage() {
  const { id } = useParams();
  const detail = useSensor(id);

  if (!detail) return <LotNotFound />;

  const { lot, sensor } = detail;
  const reliability = getReliability(sensor);

  return (
    <>
      <ScreenHeader
        backLabel="Voltar para detalhes do lote"
        backTo={`/lotes/${lot.id}`}
        subtitle={`${lot.device.code} • ${lot.stage}`}
        title="Sensor de armazenamento"
      />

      <div className="space-y-7 px-page py-5">
        <SensorStatusCard sensor={sensor} />
        <CurrentReadings lot={lot} reliability={reliability} sensor={sensor} />
        <DiagnosisCard lot={lot} reliability={reliability} />
        <SensorInfo lot={lot} sensor={sensor} />
        <ConnectionQuality sensor={sensor} />
        <ReliabilityNote reliability={reliability} />

        <Link
          className="flex items-center justify-center gap-2 rounded-inner border border-line bg-surface px-4 py-4 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
          to={`/lotes/${lot.id}/historico`}
        >
          <Icon className="size-5" name="history" />
          Ver histórico do sensor
        </Link>
      </div>
    </>
  );
}
