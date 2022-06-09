import { ConfigProvider, DatePicker, Segmented } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import moment from "moment";
import { useState } from "react";
import locale from 'antd/lib/locale/ko_KR';
import { dateFormat, picker, rangeOptions } from "@utils/dateUtil";

const SalesQty = () => {
  const [ range, setRange ] = useState<SegmentedValue>('30일');
  const [ endDate, setEndDate ] = useState(moment().subtract(2, 'days'));

  return (
    <div className="content">
      <div className="header">
        <Segmented 
          options={rangeOptions}
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
    </div>
  );
}

export default SalesQty;