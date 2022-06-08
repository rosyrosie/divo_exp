import { ChartOptions } from 'chart.js'

const tickCallback = (tickValue: string | number) => {
  if(typeof tickValue === "string") tickValue = parseInt(tickValue);
  return tickValue>=10000 ? ((tickValue)/10000+'만') : tickValue>=1000 ? (tickValue/1000+'천') : tickValue;
}

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
        callback: tickCallback
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
        callback: tickCallback
      }
    }
  }
};

type datasetType = {
  label: string,
  data: number[],
  type?: 'line' | 'bar',
  yAxisID?: 'y' | 'y1',
  borderColor?: string,
  backgroundColor?: string
};

type chartDataType = {
  labels: string[],
  datasets: datasetType[]
};

export const applyMultiAxis = (chartData: chartDataType) => {
  chartData.datasets.forEach((data: datasetType, i: number) => {
    if(!i){
      data.yAxisID = 'y1';
      data.type = 'bar';
    }
    else data.yAxisID = 'y';
  });
  return chartData;
}

const chartPalette = "1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf";

export const applyColors = (chartData: chartDataType) => {
  chartData.datasets.forEach((data: datasetType, i: number) => {
    data.borderColor = '#' + chartPalette.substring(i*6, i*6+6);
    data.backgroundColor = '#' + chartPalette.substring(i*6, i*6+6) + (!i ? '55' : 'ff');
  });
  chartData.datasets = chartData.datasets.reverse();
  return chartData;
}