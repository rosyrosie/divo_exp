import { KW_TREND_BAR_URL, KW_TREND_URL } from "@api";
import useAxios from "@useAxios";
import { applyBarStyle, applyColors, applyTrendStyle, barOptions, lineOptions } from "@utils/chartUtil";
import { dateToStringFormat, rangeId } from "@utils/dateUtil";
import { message } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import { useEffect } from "react";
import { Chart } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const KwRatioChart = ({ keyword, range, endDate }: { keyword: string, range: SegmentedValue; endDate: moment.Moment }) => {
  const { corpId, dataId } = useParams();

  const [ lineChart, lineLoading, lineError ] = useAxios(
    KW_TREND_URL,
    {
      corpId: parseInt(corpId || '0'),
      pivot: keyword,
      scale: rangeId[range],
      date: endDate?.format(dateToStringFormat),
      opt: dataId
    },
    'POST',
    [corpId, keyword, range, endDate, dataId],
    keyword !== ''
  );

  const [ barChart, barLoading, barError ] = useAxios(
    KW_TREND_BAR_URL,
    {
      corpId: parseInt(corpId || '0'),
      pivot: keyword,
      scale: rangeId[range],
      date: endDate?.format(dateToStringFormat),
      opt: dataId
    },
    'POST',
    [corpId, keyword, range, endDate, dataId]
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
            {barChart && <Chart type="bar" options={barOptions} data={applyBarStyle(barChart.data)} />}
          </div>
        </div>
        <div className="chart_container">
          <div className="chart">
            {lineChart && <Chart type="line" options={lineOptions(false)} data={dataId === 'kw-qty-a' ? applyColors(lineChart.data) : applyTrendStyle(lineChart.data)} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KwRatioChart;