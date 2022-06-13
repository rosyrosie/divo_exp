import { dateToStringFormat, rangeId } from "@utils/dateUtil";
import { message, Radio, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SegmentedValue } from "antd/lib/segmented";
import moment from "moment";
import useAxios from "@useAxios";
import { KW_QTY_SALES_URL } from "@api";
import { Chart } from "react-chartjs-2";
import { applyColors, applyMultiAxis, lineOptions } from "@utils/chartUtil";

const KeywordQtySales = ({ keyword, range, endDate }: { keyword: string, range: SegmentedValue; endDate: moment.Moment }) => {
  const { corpId } = useParams();
  const [ radioKey, setRadioKey ] = useState('qty');

  const [ data, loading, error ] = useAxios(
    KW_QTY_SALES_URL,
    {
      corpId: parseInt(corpId || '0'),
      pivot: keyword,
      scale: rangeId[range],
      date: endDate?.format(dateToStringFormat),
      opt: radioKey
    },
    'POST',
    [corpId, keyword, range, endDate, radioKey],
    keyword !== ''
  );

  const radioData = [
    { title: '검색량', key: 'qty' },
    { title: '요일별 검색 비율', key: 'qty-wd' },
    { title: '평일/주말 검색 비율', key: 'qty-w' },
    { title: '연령별 검색 비율', key: 'qty-a' },
    { title: '성별 검색 비율', key: 'qty-s' },
    { title: '기기별 검색 비율', key: 'qty-d' }
  ];

  const columns = [
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
      title: '추이',
      dataIndex: 'trend',
      key: 'trend',
    },
  ];

  useEffect(() => {
    if(error) message.warning('error', 1.5);
  }, [error]);

  return (
    <div className="data">
      <div className="chart_box">
        <Table columns={columns} dataSource={data?.data?.tableData} pagination={false} />
        <div className="chart">
          {data && <Chart type="line" options={lineOptions(true)} data={applyColors(applyMultiAxis(data?.data?.chartData))} />}
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