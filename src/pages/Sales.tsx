import { ConfigProvider, DatePicker, Segmented } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import moment from "moment";
import { useEffect, useState } from "react";
import locale from 'antd/lib/locale/ko_KR';
import { dateFormat, picker, rangeOptions } from "@utils/dateUtil";
import { useParams } from "react-router-dom";
import QtyChart from "@components/sales/QtyChart";

const Sales = () => {
  const { corpId, dataId } = useParams();
  const [ range, setRange ] = useState<SegmentedValue>('30일');
  const [ endDate, setEndDate ] = useState(moment().subtract(2, 'days'));

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
      <QtyChart range={range} endDate={endDate} />
    </div>
  );
}

export default Sales;