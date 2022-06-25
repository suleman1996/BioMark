import { RiskData, RisksResponseData } from 'types/api';

export function fromResponse(data: RisksResponseData): Risk[] {
  return [
    'heart',
    'diabetes',
    'bp',
    'bmi',
    'smoking',
    'drinking',
    'stress',
    'sleeping',
  ]
    .filter((topic) => data.hasOwnProperty(topic))
    .map((topic) => fromResponseToRisk(data[topic]));
}

const fromResponseToRisk = (
  data: RiskData,
  icon: string,
  topic: RiskTopic
): Risk => ({
  name: data.name,
  value: data.value,
  showValue: riskValueVisible(data),
  unit: data.unit,
  result: data.card_status,
  description: data.description,
  summary: data.summary,
  icon,
  topic,
  redDot: data.button_type !== 'none' && data.button_type !== 'ethnic',
  ...handleColors(data, topic),
});

const handleColors = (data: any) => {
  if (data.button_type !== 'none') {
    return {
      statusColor:
        data.button_type === 'ethnic'
          ? findRiskStatusBg(data.status)
          : RiskStatusBg.notFound,

      statusClass:
        data.button_type === 'ethnic'
          ? findRiskStatusClass(data.status)
          : RiskStatusClass.notFound,
    };
  } else {
    return {
      statusColor: findRiskStatusBg(data.status),
      statusClass: findRiskStatusClass(data.status),
      button: null,
    };
  }
};

const riskValueVisible = (data: RiskData) => {
  if (typeof data.value === 'number') {
    return data.value > 0;
  }

  return data.value !== '-' && data.value !== '';
};

const findRiskStatusBg = (status: string): RiskStatusBg =>
  riskStatuses.hasOwnProperty(status)
    ? riskStatuses[status].color
    : RiskStatusBg.notFound;

const findRiskStatusClass = (status: string): RiskStatusClass =>
  riskStatuses.hasOwnProperty(status)
    ? riskStatuses[status].class
    : RiskStatusClass.notFound;

export interface Risk {
  name: string;
  topic: RiskTopic;
  statusColor: RiskStatusBg;
  statusClass: string;
  value: number | string;
  unit: string;
  result: string;
  description: string;
  summary: string;
  icon: string;
  link: {
    url: string[];
    completeActionUrl: string[];
    clickable: string;
    text: string;
  };
  redDot: boolean;
  button: string;
  showValue: any;
}
export enum RiskStatusBg {
  notFound = '#D9DFEB',
  good = '#54CB83',
  neutral = '#FBC230',
  danger = '#EB3342',
}

export enum RiskStatusClass {
  notFound = 'notFound',
  good = 'good',
  neutral = 'neutral',
  danger = 'danger',
}

export enum RiskTopic {
  heart = 'heart',
  diabetes = 'diabetes',
  bp = 'bp',
  bmi = 'bmi',
  smoking = 'smoking',
  drinking = 'drinking',
  stress = 'stress',
  sleep = 'sleeping',
}

const riskStatuses = {
  // Good
  good: { color: RiskStatusBg.good, class: RiskStatusClass.good },
  low_risk: { color: RiskStatusBg.good, class: RiskStatusClass.good },
  normal: { color: RiskStatusBg.good, class: RiskStatusClass.good },
  within_limit: { color: RiskStatusBg.good, class: RiskStatusClass.good },

  // Neutral
  neutral: { color: RiskStatusBg.neutral, class: RiskStatusClass.neutral },
  medium_risk: { color: RiskStatusBg.neutral, class: RiskStatusClass.neutral },
  medium: { color: RiskStatusBg.neutral, class: RiskStatusClass.neutral },
  moderate: { color: RiskStatusBg.neutral, class: RiskStatusClass.neutral },
  overweight: { color: RiskStatusBg.neutral, class: RiskStatusClass.neutral },
  elevated: { color: RiskStatusBg.neutral, class: RiskStatusClass.neutral },
  low: { color: RiskStatusBg.neutral, class: RiskStatusClass.neutral },
  underweight: { color: RiskStatusBg.neutral, class: RiskStatusClass.neutral },

  // Danger
  bad: { color: RiskStatusBg.danger, class: RiskStatusClass.danger },
  high_risk: { color: RiskStatusBg.danger, class: RiskStatusClass.danger },
  obese: { color: RiskStatusBg.danger, class: RiskStatusClass.danger },
  high: { color: RiskStatusBg.danger, class: RiskStatusClass.danger },
  above_limit: { color: RiskStatusBg.danger, class: RiskStatusClass.danger },
};
