import type { Sensor } from "../types";

export const INSTALLED_AT = "25/09/2026";

// Sensores com dados próprios; os demais usam `defaultSensor`.
export const sensors: Sensor[] = [
  {
    id: "LS-008",
    lotId: "08",
    installedAt: INSTALLED_AT,
    online: true,
    operational: true,
    signal: 98,
    battery: 82,
    lastCommunication: "agora",
    collected: "há menos de 1 minuto",
    lastSync: "13:08:42",
    intervalMinutes: 5,
  },
];

export const defaultSensor = (lotId: string): Sensor => ({
  id: `LS-${lotId.padStart(3, "0")}`,
  lotId,
  installedAt: INSTALLED_AT,
  online: true,
  operational: true,
  signal: 94,
  battery: 78,
  lastCommunication: "há 2 min",
  collected: "há 2 minutos",
  lastSync: "13:07:15",
  intervalMinutes: 5,
});
