import { HomeOutlined } from "@ant-design/icons";
import { HT_URL } from "@api";
import LegalAreaCheck from "@components/LegalAreaCheck";
import LegalAreaRadio from "@components/LegalAreaRadio";
import useAxios from "@useAxios";
import { Segmented } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HotTrend = () => {
  const navigate = useNavigate();

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
        <span className="spread">
          <Segmented value={type} onChange={setType as (arg: SegmentedValue) => void} options={typeOptions} />
          <Segmented value={scale} onChange={setScale as (arg: SegmentedValue) => void} options={scaleOptions} />
        </span>
      </div>
      <div className="region_box">
        <LegalAreaRadio />
      </div>
    </div>
  );
};

export default HotTrend;