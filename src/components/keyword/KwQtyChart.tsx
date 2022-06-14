import { KW_TREND_URL } from "@api";
import useAxios from "@useAxios";
import { applyTrendStyle, lineOptions } from "@utils/chartUtil";
import { dateToStringFormat } from "@utils/dateUtil";
import { Moment } from "moment";
import { message } from "antd";
import { RangeValue } from "rc-picker/lib/interface";
import { useEffect } from "react";
import { Chart } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const KwQtyChart = ({ keyword, dateRange }: { keyword: string, dateRange: RangeValue<Moment> }) => {
  const { corpId, dataId } = useParams();

  const [ chart, loading, error ] = useAxios(
    KW_TREND_URL,
    {
      corpId: parseInt(corpId || '0'),
      pivot: keyword,
      startDate: dateRange?.[0]?.format(dateToStringFormat),
      endDate: dateRange?.[1]?.format(dateToStringFormat),
      opt: dataId
    },
    'POST',
    [corpId, keyword, dateRange, dataId],
    keyword !== ''
  );

  useEffect(() => {
    if(dataId?.slice(-1) === 'w') return;
    if(error) message.warning('error', 1.5);
  }, [error]);  

  return (
    <div className="qty_chart">
      {chart && <Chart type="line" options={lineOptions(false, false)} data={applyTrendStyle(chart.data)} />}
    </div>
  );
}

export default KwQtyChart;