import type { Reliability, Tone } from "./types";

export const SIGNAL_THRESHOLDS = { warning: 40, critical: 20 };
export const BATTERY_THRESHOLDS = { warning: 20, critical: 10 };

// Classes completas (não montadas por interpolação) para o Tailwind detectá-las.
export const toneStyles: Record<
  Tone,
  { text: string; bar: string; dot: string }
> = {
  ok: { text: "text-ink", bar: "bg-primary", dot: "bg-online" },
  warning: { text: "text-warning", bar: "bg-warning", dot: "bg-warning" },
  critical: { text: "text-critical", bar: "bg-critical", dot: "bg-critical" },
};

export const reliabilityContent: Record<
  Reliability,
  {
    title: string;
    message: string;
    box: string;
    iconBadge: string;
    text: string;
    sensorLabel: string;
  }
> = {
  reliable: {
    title: "Dados confiáveis",
    message: "Sensor conectado e enviando leituras normalmente.",
    box: "border-primary-pale bg-primary-soft",
    iconBadge: "bg-primary text-surface",
    text: "text-primary",
    sensorLabel: "Funcionando normalmente",
  },
  attention: {
    title: "Dados com ressalvas",
    message:
      "Sinal fraco ou bateria baixa. As leituras ainda chegam, mas podem falhar em breve.",
    box: "border-warning-border bg-warning-soft",
    iconBadge: "bg-warning-badge text-warning",
    text: "text-warning",
    sensorLabel: "Requer atenção",
  },
  unreliable: {
    title: "Dados não confiáveis",
    message:
      "Sensor sem comunicação. Os valores exibidos são os da última leitura recebida.",
    box: "border-critical-border bg-critical-soft",
    iconBadge: "bg-critical-badge text-critical",
    text: "text-critical",
    sensorLabel: "Sem comunicação",
  },
};
