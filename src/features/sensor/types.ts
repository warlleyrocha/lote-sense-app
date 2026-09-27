import type { Bag, Lot } from "@/features/lots/types";

export type Sensor = {
  id: string;
  installedAt: string;
  online: boolean;
  operational: boolean;
  // Percentuais de 0 a 100.
  signal: number;
  battery: number;
  lastCommunication: string;
  collected: string;
  lastSync: string;
  intervalMinutes: number;
};

// Saúde do equipamento: cores de alerta (âmbar/vermelho) só aparecem aqui.
export type Tone = "ok" | "warning" | "critical";

export type Reliability = "reliable" | "attention" | "unreliable";

export type BagDetail = { lot: Lot; bag: Bag };
