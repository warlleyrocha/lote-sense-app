import { useLot } from "@/features/lots/hooks/useLot";
import type { BagDetail } from "../types";

export function useBag(
  lotId: string | undefined,
  bagNumber: string | undefined,
): BagDetail | undefined {
  // Único ponto de acesso à saca e ao seu sensor: trocar por chamada de API aqui.
  const lot = useLot(lotId);
  const bag = lot?.bags.find((item) => String(item.number) === bagNumber);
  if (!lot || !bag) return undefined;
  return { lot, bag };
}
