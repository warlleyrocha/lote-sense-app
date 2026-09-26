import { useLot } from "@/features/lots/hooks/useLot";
import { defaultSensor, sensors } from "../data/sensors";
import type { SensorDetail } from "../types";

export function useSensor(lotId: string | undefined): SensorDetail | undefined {
  // Único ponto de acesso ao sensor: trocar por chamada de API aqui.
  const lot = useLot(lotId);
  if (!lot) return undefined;
  const sensor =
    sensors.find((item) => item.lotId === lot.id) ?? defaultSensor(lot.id);
  return { lot, sensor };
}
