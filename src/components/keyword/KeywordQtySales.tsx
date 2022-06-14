import { dateToStringFormat, expandDate, isDateRangeShort } from "@utils/dateUtil";
import { message, Radio, Space, Table } from "antd";
import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Moment } from "moment";
import useAxios from "@useAxios";
import { KW_QTY_SALES_URL } from "@api";
import { Chart } from "react-chartjs-2";
import { applyBarLabel, applyColors, applyMultiAxis, labelFormatter, lineOptions } from "@utils/chartUtil";
import { RangeValue } from "rc-picker/lib/interface";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const KeywordQtySales = ({ keyword, dateRange, setDateRange }: { keyword: string, dateRange: RangeValue<Moment>, setDateRange: React.Dispatch<SetStateAction<RangeValue<Moment>>> }) => {
  const { corpId, dataId } = useParams();
  const [ radioKey, setRadioKey ] = useState('qty');

  const [ data, loading, error ] = useAxios(
    KW_QTY_SALES_URL,
    {
      corpId: parseInt(corpId || '0'),
      pivot: keyword,
      startDate: dateRange?.[0]?.format(dateToStringFormat),
      endDate: dateRange?.[1]?.format(dateToStringFormat),
      opt: radioKey
    },
    'POST',
    [corpId, keyword, dateRange, radioKey],
    keyword !== '' && (!radioKey.includes('qty-w') || !isDateRangeShort(dateRange))
  );

  const radioData = [
    { title: '검색량', key: 'qty' },
    { title: '요일별 검색 비율', key: 'qty-wd' },
    { title: '평일/주말 검색 비율', key: 'qty-w' },
    { title: '연령별 검색 비율', key: 'qty-a' },
    { title: '성별 검색 비율', key: 'qty-s' },
    { title: '기기별 검색 비율', key: 'qty-d' }
  ];

  const columns = (unit: string) => [
    {
      title: '데이터',
      dataIndex: 'data',
      key: 'data',
    },
    {
      title: '상관관계',
      dataIndex: 'corr',
      key: 'corr',
    },
    {
      title: `추이(${unit})`,
      dataIndex: 'trend',
      key: 'trend',
    },
  ];

  useEffect(() => {
    if(error) message.warning('error', 1.5);
  }, [error]);

  useEffect(() => {
    if(!radioKey.includes('qty-w')) return;
    expandDate(dateRange, setDateRange);
  }, [radioKey]);

  return (
    <div className="data">
      <div className="chart_box">
        <div className="table_box">
          <Table columns={columns(data?.data?.trendUnit)} dataSource={data?.data?.tableData} pagination={false} bordered />
        </div>
        <div className="chart">
          {data &&
            <Chart 
              type="line" 
              options={applyBarLabel(lineOptions(true, false), labelFormatter(dataId || '0', loading))} 
              data={applyColors(applyMultiAxis(data?.data?.chartData), true)} 
              plugins={[ChartDataLabels]} 
            />
          }
        </div>
      </div>
      <div className="check_box">
        <Radio.Group onChange={e => setRadioKey(e.target.value)} value={radioKey}>
          <Space direction="vertical">
            {radioData.map(radio => (
              <Radio value={radio.key} key={radio.key}>{radio.title}</Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
}

export default KeywordQtySales;