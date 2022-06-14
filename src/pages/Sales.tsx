import { DatePicker } from "antd";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { disabledDate, expandDate } from "@utils/dateUtil";
import { useParams } from "react-router-dom";
import { RangeValue } from "rc-picker/lib/interface";
import QtyChart from "@components/sales/QtyChart";
import PerTimeChart from "@components/sales/PerTimeChart";
import PresetRange from "@components/PresetRange";

const Sales = () => {
  const { dataId } = useParams();
  const { RangePicker } = DatePicker;
  const [ dateRange, setDateRange ] = useState<RangeValue<Moment>>([moment().subtract(1, 'months').subtract(2, 'days'), moment().subtract(2, 'days')]);

  useEffect(() => {
    if(dataId?.slice(-1) !== 'w') return;
    expandDate(dateRange, setDateRange);
  }, [dataId]);

  return (
    <div className="content">
      <div className="header">
        <PresetRange 
          disableDay={dataId?.slice(-1) === 'w'}
          setDateRange={setDateRange}
        />
        <RangePicker 
          disabledDate={disabledDate}
          placeholder={['시작 날짜', '끝 날짜']}
          value={dateRange}
          onChange={setDateRange}
          allowClear={false}
        />
      </div>
      {/* {
        (dataId?.includes('-w') || dataId?.includes('-t')) ?
        <PerTimeChart range={range} endDate={endDate} /> :
        <QtyChart range={range} endDate={endDate} />
      } */}
    </div>
  );
}

export default Sales;