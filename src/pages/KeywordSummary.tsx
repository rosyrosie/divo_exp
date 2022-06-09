import { dateFormat, dateToStringFormat, picker, rangeOptions } from "@utils/dateUtil";
import { ConfigProvider, DatePicker, Segmented } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import moment from "moment";
import { useState } from "react";
import locale from 'antd/lib/locale/ko_KR';
import { KW_ANLY_SUMM_URL } from "@api";
import useAxios from "@useAxios";
import { useParams } from "react-router-dom";

const KeywordSummary = () => {
  const { corpId } = useParams();
  const [ range, setRange ] = useState<SegmentedValue>('30일');
  const [ endDate, setEndDate ] = useState(moment().subtract(2, 'days'));

  const [ summary, loading, error ] = useAxios(
    KW_ANLY_SUMM_URL(corpId || '0', '0', endDate?.format(dateToStringFormat)),
    null,
    'GET',
    [endDate],
    corpId !== undefined
  );

  console.log(summary);

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

export default KeywordSummary;