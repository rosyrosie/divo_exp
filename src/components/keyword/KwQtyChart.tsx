import { KW_TREND_URL } from "@api";
import useAxios from "@useAxios";
import { applyTrendStyle, lineOptions } from "@utils/chartUtil";
import { dateToStringFormat, rangeId } from "@utils/dateUtil";
import { message } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import { useEffect } from "react";
import { Chart } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const KwQtyChart = ({ keyword, range, endDate }: { keyword: string, range: SegmentedValue; endDate: moment.Moment }) => {
  const { corpId, dataId } = useParams();

  const [ chart, loading, error ] = useAxios(
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

  useEffect(() => {
    if(dataId?.slice(-1) === 'w') return;
    if(error) message.warning('error', 1.5);
  }, [error]);  

  return (
    <div className="data">
      <div className="chart_box">
        <div className="chart">
          {chart && <Chart type="line" options={lineOptions(false)} data={applyTrendStyle(chart.data)} />}
        </div>
      </div>
    </div>
  );
}

export default KwQtyChart;