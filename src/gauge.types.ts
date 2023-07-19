import { ChartDataset, ChartOptions } from 'chart.js';

export interface GaugeChartDataset extends ChartDataset<'doughnut', number[]> {
  value?: number;
}

export interface GaugeChartOptions extends ChartOptions<'doughnut'> {
  theme?: string | [];
}
