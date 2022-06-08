import { ChartOptions } from 'chart.js'

export const lineOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      display: true
    },
    tooltip: {
      callbacks: {
        label: tooltipItem => {
          return tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue
        }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  },
  scales: {
    y: {
      ticks: {
        //callback: (tickValue) => tickValue>=10000 ? (tickValue/10000+'만') : tickValue>=1000 ? (tickValue/1000+'천') : tickValue
      },
      beginAtZero: true
    },
    y1: {
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false
      },
      ticks: {
        //callback: (val) => val>=10000 ? (val/10000+'만') : val>=1000 ? (val/1000+'천') : val
      }
    }
  }
};

export const applyMultiAxis = (chartData: any) => {
  chartData.datasets.forEach((data: any, i: number) => {
    if(!i){
      data.yAxisID = 'y1';
      data.type = 'bar';
    }
    else data.yAxisID = 'y';
  });
  return chartData;
}