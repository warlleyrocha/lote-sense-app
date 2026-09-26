import { BATTERY_THRESHOLDS, SIGNAL_THRESHOLDS } from "./constants";
import type { Reliability, Sensor, Tone } from "./types";

const toneOf = (
  value: number,
  thresholds: { warning: number; critical: number },
): Tone => {
  if (value < thresholds.critical) return "critical";
  if (value < thresholds.warning) return "warning";
  return "ok";
};

export const signalTone = (sensor: Sensor): Tone =>
  sensor.online ? toneOf(sensor.signal, SIGNAL_THRESHOLDS) : "critical";

export const batteryTone = (sensor: Sensor): Tone =>
  toneOf(sensor.battery, BATTERY_THRESHOLDS);

// Se as leituras do lote podem ser tomadas como válidas.
export function getReliability(sensor: Sensor): Reliability {
  if (!sensor.online || !sensor.operational) return "unreliable";
  if (signalTone(sensor) !== "ok" || batteryTone(sensor) !== "ok")
    return "attention";
  return "reliable";
}

export const formatPercent = (value: number) => `${value}%`;

export const formatInterval = (minutes: number) =>
  minutes === 1 ? "A cada 1 minuto" : `A cada ${minutes} minutos`;
