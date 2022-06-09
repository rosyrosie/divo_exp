import { ChartOptions } from 'chart.js'

const tickCallback = (tickValue: string | number) => {
  if(typeof tickValue === "string") tickValue = parseInt(tickValue);
  return tickValue>=10000 ? ((tickValue)/10000+'만') : tickValue>=1000 ? (tickValue/1000+'천') : tickValue;
}

export const lineOptions: (multiAxis: boolean) => ChartOptions = (multiAxis: boolean = true) => ({
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
      display: multiAxis,
      position: 'right',
      grid: {
        drawOnChartArea: false
      },
      ticks: {
        callback: tickCallback
      }
    }
  }
});

export const barOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    tooltip: {
      callbacks: {
        label: tooltipItem => tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue
      }
    }
  },
  //maxBarThickness: 80,
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
    }
  }
};

type datasetType = {
  label: string,
  data: number[],
  type?: 'line' | 'bar',
  yAxisID?: 'y' | 'y1',
  borderColor?: string,
  backgroundColor?: string,
  borderDash?: number[],
  maxBarThickness?: number
};

type chartDataType = {
  labels: string[],
  datasets: datasetType[],
};

export const applyMultiAxis = (chartData: chartDataType) => {
  chartData.datasets.forEach((data: datasetType, i: number) => {
    if(!i){
      data.yAxisID = 'y1';
      data.type = 'bar';
    }
    else data.yAxisID = 'y';
    data.maxBarThickness = 60;
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

export const applyTrendStyle = (chartData: chartDataType) => {
  chartData.datasets.forEach((data: datasetType, i: number) => {
    if(i%2) data.borderDash = [10, 5];
    const idx = Math.floor(i/2);
    data.borderColor = '#' + chartPalette.substring(idx*6, idx*6+6) + (i%2 ? '88' : 'ff');
    data.backgroundColor = '#' + chartPalette.substring(idx*6, idx*6+6)  + (i%2 ? '88' : 'ff'); 
  });
  return chartData;
}

export const applyBarStyle = (chartData: chartDataType) => {
  chartData.datasets.forEach((data: datasetType, i: number) => {
    data.maxBarThickness = 60;
    data.borderColor = '#' + chartPalette.substring(12, 18);
    data.backgroundColor = '#' + chartPalette.substring(12, 18) + '88';
  });
  return chartData;
}