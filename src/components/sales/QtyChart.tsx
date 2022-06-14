import { SALES_URL } from "@api";
import useAxios from "@useAxios";
import { applyTrendStyle, lineOptions } from "@utils/chartUtil";
import { dateToStringFormat } from "@utils/dateUtil";
import { message } from "antd";
import { RangeValue } from "rc-picker/lib/interface";
import { useEffect } from "react";
import { Chart } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { Moment } from "moment";

const QtyChart = ({ dateRange }: { dateRange: RangeValue<Moment> }) => {
  const { corpId, dataId } = useParams();
  const [ chart, loading, error ] = useAxios(
    SALES_URL,
    {
      corpId: parseInt(corpId || '0'),
      startDate: dateRange?.[0]?.format(dateToStringFormat),
      endDate: dateRange?.[1]?.format(dateToStringFormat),
      opt: dataId
    },
    'POST',
    [corpId, dateRange, dataId]
  );

  useEffect(() => {
    if(dataId?.slice(-1) === 'w') return;
    if(error) message.warning('error', 1.5);
  }, [error]);  

  return (
    <div className="data">
      <div className="chart_box">
        <div className="chart">
          {chart && <Chart type="line" options={lineOptions(false, false)} data={applyTrendStyle(chart.data.salesTrend)} />}
        </div>
      </div>
    </div>
  );

};

export default QtyChart;