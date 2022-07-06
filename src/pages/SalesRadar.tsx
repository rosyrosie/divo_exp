import { SA_RADAR_URL, SA_DRADAR_URL } from "@api";
import useAxios from "@useAxios";
import { applyRadarColors, radarOptions } from "@utils/chartUtil";
import { DatePicker, message } from "antd";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { RangeValue } from "rc-picker/lib/interface";
import { dateToStringFormat, disabledDate } from "@utils/dateUtil";

const SalesRadar = () => {
  const { corpId } = useParams();
  const { RangePicker } = DatePicker;
  const [ nowDateRange, setNowDateRange ] = useState<RangeValue<Moment>>([moment().subtract(3, 'months').subtract(2, 'days'), moment().subtract(2, 'days')]);
  const [ prevDateRange, setPrevDateRange ] = useState<RangeValue<Moment>>([moment().subtract(3, 'months').subtract(1, 'years').subtract(2, 'days'), moment().subtract(1, 'years').subtract(2, 'days')]);

  const [ radarData, loading, error ] = useAxios(
    SA_DRADAR_URL(
      corpId || '0', 
      nowDateRange?.[0]?.format(dateToStringFormat), 
      nowDateRange?.[1]?.format(dateToStringFormat), 
      prevDateRange?.[0]?.format(dateToStringFormat), 
      prevDateRange?.[1]?.format(dateToStringFormat)
    ),
    null,
    'GET',
    [corpId, nowDateRange, prevDateRange],
    corpId !== undefined
  );

  useEffect(() => {
    if(error) message.warning('error', 1.5);
  }, [error]);

  return (
    <div className="sales_radar">
      <div className="header">
        <span>
          <span className="picker_label">기간 1</span>
          <RangePicker 
            disabledDate={disabledDate}
            placeholder={['시작 날짜', '끝 날짜']}
            value={nowDateRange}
            onChange={setNowDateRange}
            allowClear={false}
          />
        </span>
        <span>
          <span className="picker_label">기간 2</span>
          <RangePicker 
            disabledDate={disabledDate}
            placeholder={['시작 날짜', '끝 날짜']}
            value={prevDateRange}
            onChange={setPrevDateRange}
            allowClear={false}
          />
        </span>
      </div>
      <div className="data">
        <div className="radar_box">
          {radarData && <Chart type="radar" options={radarOptions} data={applyRadarColors(radarData)} />}
        </div>
      </div>
    </div>
  );
}

export default SalesRadar;