import { DatePicker, message, Table } from "antd";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { dateToStringFormat, disabledDate, expandDate, isDateRangeShort } from "@utils/dateUtil";
import { useParams } from "react-router-dom";
import { RangeValue } from "rc-picker/lib/interface";
import QtyChart from "@components/sales/QtyChart";
import PerTimeChart from "@components/sales/PerTimeChart";
import PresetRange from "@components/PresetRange";
import useAxios from "@useAxios";
import { SALES_TABLE_URL } from "@api";

const Sales = () => {
  const { corpId, dataId } = useParams();
  const { RangePicker } = DatePicker;
  const [ dateRange, setDateRange ] = useState<RangeValue<Moment>>([moment().subtract(1, 'months').subtract(2, 'days'), moment().subtract(2, 'days')]);

  const [ tableData, loading, error ] = useAxios(
    SALES_TABLE_URL,
    {
      corpId: parseInt(corpId || '0'),
      startDate: dateRange?.[0]?.format(dateToStringFormat),
      endDate: dateRange?.[1]?.format(dateToStringFormat),
      opt: dataId
    },
    'POST',
    [corpId, dateRange, dataId],
    corpId !== undefined && (!dataId?.includes('-w') || !isDateRangeShort(dateRange))
  );

  useEffect(() => {
    if(dataId?.slice(-1) !== 'w') return;
    expandDate(dateRange, setDateRange);
  }, [dataId]);

  useEffect(() => {
    if(!dataId?.includes('-w') || !isDateRangeShort(dateRange)) return;
    message.error({
      content: '선택 기간이 너무 짧습니다. 요일별 데이터의 기간은 최소 2개월 이상으로 설정해주세요.',
      style: {
        fontSize: 16
      }
    }, 5);
  }, [dateRange]);

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
      <div className="data">
        <div className="chart_box">
          {
            (dataId?.includes('-w') || dataId?.includes('-t')) ?
            <PerTimeChart dateRange={dateRange} /> :
            <QtyChart dateRange={dateRange} />
          }
          {tableData && <div className="data_table_box">
            <Table className="text_table" columns={tableData.data.column} dataSource={tableData.data.data} pagination={false} bordered />
          </div>}
        </div>
      </div>
    </div>
  );
}

export default Sales;