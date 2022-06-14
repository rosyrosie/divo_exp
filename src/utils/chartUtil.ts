import { ChartOptions } from 'chart.js'

const tickCallback = (tickValue: string | number) => {
  if(typeof tickValue === "string") tickValue = parseInt(tickValue);
  return tickValue>=10000 ? ((tickValue)/10000+'만') : tickValue>=1000 ? (tickValue/1000+'천') : tickValue;
}

export const lineOptions: (multiAxis: boolean, forRank: boolean) => ChartOptions = (multiAxis: boolean = true, forRank: boolean = false) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      display: true
    },
    datalabels: {
      display: true,
      align: 'end',
      anchor: 'end',
      font: {
        weight: 'bold',
        size: 11
      },
      padding: 4
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
      beginAtZero: true,
      reverse: forRank
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

export const radarOptions: ChartOptions = {
  responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: tooltipItem => tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue + '등급'
        }
      }
    },
    elements: {
      point:{
        radius: 1,
        hoverRadius: 2
      },
      line: {
        borderWidth: 1.5
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    scales: {
      r: {
        min: 0,
        pointLabels: {
          font: {
            size: 13
          }
        },
        ticks: {
          showLabelBackdrop: false,
          stepSize: 1,
          font: {
            weight: 'bold'
          }
        },
      }
    }
}

type datasetType = {
  label: string,
  data: number[],
  type?: 'line' | 'bar',
  yAxisID?: 'y' | 'y1',
  borderColor?: string,
  backgroundColor?: string,
  borderDash?: number[],
  maxBarThickness?: number,
  datalabels?: any
};

export type chartDataType = {
  labels: string[],
  datasets: datasetType[],
};

export const applyMultiAxis = (chartData: chartDataType) => {
  chartData.datasets.forEach((data: datasetType, i: number) => {
    if(!i){
      data.yAxisID = 'y1';
      data.type = 'bar';
    }
    else{
      data.yAxisID = 'y';
      data.datalabels = {
        labels: {
          title: null
        }
      };
    }
    data.maxBarThickness = 60;
  });
  return chartData;
}

const chartPalette = "1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf";

export const applyColors = (chartData: chartDataType, reverse: boolean) => {
  chartData.datasets.forEach((data: datasetType, i: number) => {
    data.borderColor = '#' + chartPalette.substring(i*6, i*6+6);
    data.backgroundColor = '#' + chartPalette.substring(i*6, i*6+6) + (!i && reverse ? '55' : 'ff');
  });
  if(reverse) chartData.datasets = chartData.datasets.reverse();
  return chartData;
};

export const applyRadarColors = (chartData: chartDataType) => {
  chartData.datasets.forEach((data: datasetType, i: number) => {
    data.borderColor = '#' + chartPalette.substring(i*6, i*6+6);
    data.backgroundColor = '#' + chartPalette.substring(i*6, i*6+6) + '33';
  });
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

export const applyBarLabel = (options: ChartOptions, formatter: (val: any) => {}) => {
  return {
    ...options,
    plugins: {
      ...options.plugins,
      datalabels: {
        ...options.plugins?.datalabels,
        formatter
      }
    }
  }
}

export const labelFormatter = (dataId: string, loading: boolean) => {
  if(dataId.slice(-1) !== 'r'){
    return (val: any) => !!val && !loading ? `${Math.round((parseInt(val)/10000))}만원` : '';
  }
  return (val: any) => !!val && !loading ? `${Math.round(parseInt(val))}%` : '';
}