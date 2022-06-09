import { ConfigProvider, DatePicker, message, Segmented, Spin } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import moment from "moment";
import { useEffect, useState } from "react";
import locale from 'antd/lib/locale/ko_KR';
import { dateFormat, dateToStringFormat, picker, rangeId, rangeOptions } from "@utils/dateUtil";
import useAxios from "@useAxios";
import { useParams } from "react-router-dom";
import { SALES_URL } from "@api";
import { Chart } from "react-chartjs-2";
import { applyTrend, lineOptions } from "@utils/chartUtil";

const SalesQty = () => {
  const { corpId, dataId } = useParams();
  const [ range, setRange ] = useState<SegmentedValue>('30일');
  const [ endDate, setEndDate ] = useState(moment().subtract(2, 'days'));

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

  useEffect(() => {
    if(dataId?.slice(-1) == 'w'){
      if(range === '30일') setRange('13주');
    }
  }, [dataId]);

  return (
    <div className="content">
      <div className="header">
        <Segmented 
          options={rangeOptions(dataId || '')}
          value={range}
          onChange={setRange}
        />
        <ConfigProvider locale={locale}>
          <DatePicker
            picker={picker(range)}
            value={endDate}
            onChange={(date) => date && setEndDate(date)}
            allowClear={false}
            format={dateFormat[picker(range)]}
          />
        </ConfigProvider>
      </div>
      <div className="data">
        <div className="chart_box">
          <div className="chart">
            {loading ? <Spin /> : <Chart type="line" options={lineOptions(false)} data={applyTrend(chart.data.salesTrend)} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesQty;