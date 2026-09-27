import type { Sensor } from "../types";

export const INSTALLED_AT = "25/09/2026";

// Sensor com leituras normais; `overrides` cobre os casos com dados próprios.
export const sensor = (
  lotId: string,
  bag: number,
  overrides: Partial<Sensor> = {},
): Sensor => ({
  id: `LS-${lotId.padStart(3, "0")}-${bag}`,
  installedAt: INSTALLED_AT,
  online: true,
  operational: true,
  signal: 94,
  battery: 78,
  lastCommunication: "há 2 min",
  collected: "há 2 minutos",
  lastSync: "13:07:15",
  intervalMinutes: 5,
  ...overrides,
});
