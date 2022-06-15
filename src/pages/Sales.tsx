import { DatePicker, Table } from "antd";
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

  const columns = [
    {
      title: '기간',
      dataIndex: 'range',
      key: 'range'
    },
    {
      title: '평균값',
      dataIndex: 'average',
      key: 'average'
    },
    {
      title: '추세(원/일)',
      dataIndex: 'trend',
      key: 'trend'
    }
  ];

  const dummy = [
    {
      range: '선택 기간',
      average: 30,
      trend: 20
    },
    {
      range: '30일',
      average: 30,
      trend: 20
    },
    {
      range: '60일',
      average: 30,
      trend: 20
    }
  ];

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
          <div className="data_table_box">
            <Table className="text_table" columns={columns} dataSource={dummy} pagination={false} bordered />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;