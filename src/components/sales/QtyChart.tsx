import { SALES_URL } from "@api";
import useAxios from "@useAxios";
import { applyTrendStyle, lineOptions } from "@utils/chartUtil";
import { dateToStringFormat, rangeId } from "@utils/dateUtil";
import { message } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import { useEffect } from "react";
import { Chart } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const QtyChart = ({ range, endDate }: { range: SegmentedValue; endDate: moment.Moment }) => {
  const { corpId, dataId } = useParams();
  const [ chart, loading, error ] = useAxios(
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

  useEffect(() => {
    if(dataId?.slice(-1) === 'w') return;
    if(error) message.warning('error', 1.5);
  }, [error]);  

  return (
    <div className="data">
      <div className="chart_box">
        <div className="chart">
          {chart && <Chart type="line" options={lineOptions(false)} data={applyTrendStyle(chart.data.salesTrend)} />}
        </div>
      </div>
    </div>
  );

};

export default QtyChart;