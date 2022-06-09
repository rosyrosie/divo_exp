import { SALES_BAR_URL, SALES_URL } from "@api";
import useAxios from "@useAxios";
import { applyBarStyle, applyTrendStyle, barOptions, lineOptions } from "@utils/chartUtil";
import { dateToStringFormat, rangeId } from "@utils/dateUtil";
import { message } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import { useEffect } from "react";
import { Chart } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const PerTimeChart = ({ range, endDate }: { range: SegmentedValue; endDate: moment.Moment }) => {
  const { corpId, dataId } = useParams();
  const [ lineChart, lineLoading, lineError ] = useAxios(
    SALES_URL,
    {
      corpId: parseInt(corpId || '0'),
      scale: rangeId[range],
      endDate: endDate?.format(dateToStringFormat),
      opt: dataId
    },
    'POST',
    [corpId, range, endDate, dataId]
  );

  const [ barChart, barLoading, barError ] = useAxios(
    SALES_BAR_URL,
    {
      corpId: parseInt(corpId || '0'),
      scale: rangeId[range],
      endDate: endDate?.format(dateToStringFormat),
      opt: dataId
    },
    'POST',
    [corpId, range, endDate, dataId]
  );

  useEffect(() => {
    if(dataId?.slice(-1) === 'w') return;
    if(lineError || barError) message.warning('error', 1.5);
  }, [lineError, barError]);  

  return (
    <div className="data">
      <div className="double_chart_box">
        <div className="chart_container">
          <div className="chart">
            {barChart && <Chart type="bar" options={barOptions} data={applyBarStyle(barChart.data.salesTrend)} />}
          </div>
        </div>
        <div className="chart_container">
          <div className="chart">
            {lineChart && <Chart type="line" options={lineOptions(false)} data={applyTrendStyle(lineChart.data.salesTrend)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerTimeChart;