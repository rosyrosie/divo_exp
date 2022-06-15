import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { SA_COMPARE_URL } from "@api";
import useAxios from "@useAxios";
import { applyColors, lineOptions } from "@utils/chartUtil";
import { Button, Col, message, Row, Segmented } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const SalesCompare = () => {
  const { corpId } = useParams();
  const [ scale, setScale ] = useState('13w');
  const [ compareType, setCompareType ] = useState(0);
  const [ dataIndex, setDataIndex ] = useState(0);
  const [ data, loading, error ] = useAxios(
    SA_COMPARE_URL(corpId || '0', scale),
    null,
    'GET',
    [corpId, scale],
    corpId !== undefined
  );

  const statData = data?.analysisList[compareType];
  const chartData = data?.analysisList[compareType].graphList;

  const compareTitle = [
    ['점심', '저녁'],
    ['평일', '주말'],
    ['재방문', '신규']
  ];

  const compareData = [
    ['일 매출액', '결제단가', '일 결제건수', '재방문자 매출 비율'],
    ['일 매출액', '결제단가', '일 결제건수', '저녁 매출 비율', '재방문자 매출 비율'],
    ['일 매출액', '결제단가', '일 결제건수']
  ];

  useEffect(() => {
    setDataIndex(0);
  }, [compareType]);

  useEffect(() => {
    if(error) message.warning('error', 1.5);
  }, [error]);

  return (
    <div className="content">
      <div className="header">
        <Segmented 
          options={[
            {
              label: '점심 · 저녁',
              value: 0
            },
            {
              label: '평일 · 주말',
              value: 1
            },
            {
              label: '재방문 · 신규',
              value: 2
            }
          ]}
          value={compareType}
          onChange={setCompareType as (value: SegmentedValue) => void}
        />
        <Segmented 
          options={[
            {
              label: '최근 3개월',
              value: '13w'
            },
            {
              label: '최근 6개월',
              value: '26w'
            },
            {
              label: '최근 1년',
              value: '52w'
            },
            {
              label: '최근 2년',
              value: '24m'
            },
            {
              label: '전체',
              value: 'tot'
            }
          ]}
          value={scale}
          onChange={setScale as (value: SegmentedValue) => void}
        />
      </div>
      <div className="box">
        <div className="compare_table_box">
          <Row>
            <Col span={8}>{compareTitle[compareType][0]}</Col>
            <Col span={8}></Col>
            <Col span={8}>{compareTitle[compareType][1]}</Col>
          </Row>
          {Array.from({ length: chartData?.length }, (_, i) => i).map(index => (
            <Row key={index}>
              <Col span={8}>
                <span className="stat">
                  {statData?.leftAvg[index]}
                </span>
              </Col>
              <Col span={8}>
                <Button type={index===dataIndex ? "primary" : "text"} onClick={() => setDataIndex(index)}>
                  {compareData[compareType][index]}
                </Button>
              </Col>
              <Col span={8}>{statData?.rightAvg[index]}</Col>
            </Row>
          ))}
        </div>
        <div className="compare_chart_box">
          <div className="compare_chart">
            {chartData?.[dataIndex] && 
            <>
              <div className="prev_overlay">
                <Button shape="circle" icon={<LeftOutlined />} disabled={dataIndex===0} onClick={() => setDataIndex(i => i-1)}/>
              </div>
              <Chart type="line" options={lineOptions(false, false)} data={applyColors(chartData[dataIndex], false)} />
              <div className="next_overlay">
                <Button shape="circle" icon={<RightOutlined />} disabled={dataIndex===chartData.length-1} onClick={() => setDataIndex(i => i+1)}/>
              </div>
            </>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesCompare;