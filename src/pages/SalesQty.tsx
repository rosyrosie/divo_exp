import { ConfigProvider, DatePicker, Segmented } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import moment from "moment";
import { useState } from "react";
import locale from 'antd/lib/locale/ko_KR';
import { dateFormat, dateToStringFormat, picker, rangeId, rangeOptions } from "@utils/dateUtil";
import useAxios from "@useAxios";
import { useParams } from "react-router-dom";
import { SALES_URL } from "@api";

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
    [range, endDate, dataId]
  );

  console.log(chart);

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