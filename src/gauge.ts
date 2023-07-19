import { Chart } from 'chart.js/auto';
import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GaugeNeedle } from './gauge.plugin';
import { GaugeChartDataset } from './gauge.types';
import { gaugeChartDataset, gaugeChartOptions, themes } from './gauge.options';

@customElement('gauge-chart')
class GaugeChart extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    canvas {
      width: 100%;
    }
  `;

  @property({ type: String })
  data = '';

  @property({ type: String })
  options = '';

  @property({ type: String })
  label = '';

  chartInstance: Chart | any = null;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('resize', this.handleWindowResize);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize(): void {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  }

  updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    if ((changedProperties.has('data') || changedProperties.has('options')) && this.chartInstance) {
      this.updateChart();
    }
  }

  private initializeChart() {
    const canvas = this.renderRoot.querySelector('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const chartDataset = this.handleChartDataset();
    const chartOptions = Object.assign(gaugeChartOptions, JSON.parse(this.options));
    const chartLabel = JSON.parse(this.label);

    if (ctx) {
      this.chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: chartLabel,
          datasets: [chartDataset],
        },
        options: chartOptions,
        plugins: [GaugeNeedle],
      });
    }
  }

  private handleChartDataset(): GaugeChartDataset {
    const chartDataset = Object.assign(gaugeChartDataset, JSON.parse(this.data));
    const chartOptions = Object.assign(gaugeChartOptions, JSON.parse(this.options));
    if (typeof chartOptions?.theme === 'string') {
      chartDataset.backgroundColor = themes[chartOptions?.theme as keyof typeof themes];
    }
    return chartDataset;
  }

  updateChart(): void {
    if (this.chartInstance) {
      const chartDataset = this.handleChartDataset();
      this.chartInstance.data.datasets[0] = chartDataset;
      this.chartInstance.update();
    }
  }

  firstUpdated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('data') || changedProperties.has('options')) {
      this.initializeChart();
    }
  }

  render(): TemplateResult {
    return html`<canvas></canvas>`;
  }
}

export { GaugeChart };
