import { HomeOutlined } from "@ant-design/icons";
import { GET_REG_URL, HT_URL } from "@api";
import useAxios from "@useAxios";
import { Segmented } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HotTrend = () => {
  const navigate = useNavigate();
  const [ ctpList, ctpLoading, ctpError ] = useAxios(
    GET_REG_URL + '0',
    null,
    'GET'
  );

  const [ scale, setScale ] = useState('day');
  const [ type, setType ] = useState('keyword');
  const [ start, setStart ] = useState(0);

  const [ tableData, tLoading, tError ] = useAxios(
    HT_URL(scale, type, start, 50, '0'),
    null,
    'GET',
    [scale, type, start]
  ); 

  const scaleOptions = [
    {
      label: '일',
      value: 'day'
    },
    {
      label: '주',
      value: 'week'
    },
    {
      label: '월',
      value: 'month'
    },
    {
      label: '분기',
      value: 'quarter'
    },
    {
      label: '년',
      value: 'year'
    }
  ];

  const typeOptions = [
    {
      label: '키워드',
      value: 'keyword'
    },
    {
      label: '행정구역',
      value: 'area'
    },
    {
      label: '업종',
      value: 'category'
    },
    {
      label: '음식점',
      value: 'omrank'
    }
  ];

  return (
    <div className="hot_trend">
      <div className="header">
        <span className="header_title">
          <HomeOutlined onClick={() => navigate('/')} />
          <span className="menu_title">급등락 키워드</span>
        </span>
        <span>
          <Segmented value={scale} onChange={setScale as (arg: SegmentedValue) => void} options={scaleOptions} style={{ marginRight: 12 }}/>
          <Segmented value={type} onChange={setType as (arg: SegmentedValue) => void} options={typeOptions} />
        </span>
      </div>
    </div>
  );
};

export default HotTrend;