import { HomeOutlined } from "@ant-design/icons";
import { HT_URL } from "@api";
import LegalAreaRadio from "@components/LegalAreaRadio";
import useAxios from "@useAxios";
import { hotTrendColumns, scrollProps } from "@utils/tableUtil";
import { Pagination, Segmented, Table } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const HotTrend = () => {
  const navigate = useNavigate();

  const [ scale, setScale ] = useState('day');
  const [ type, setType ] = useState<'keyword' | 'area' | 'category' | 'omrank'>('keyword');
  const [ start, setStart ] = useState(0);
  const [ display, setDisplay ] = useState(50);
  const [ trigger, setTrigger ] = useState(false);

  const [ ctpCode, setCtpCode ] = useState<string | null>(null);
  const [ sigCode, setSigCode ] = useState<string | null>(null);
  const [ emdCode, setEmdCode ] = useState<string | null>(null);

  const regionCode = useMemo(() => {
    if(emdCode) return emdCode;
    if(sigCode) return sigCode;
    if(ctpCode) return ctpCode;
    return '0';
  }, [ctpCode, sigCode, emdCode]);

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

  const [ tableData, tLoading, tError ] = useAxios(
    HT_URL(scale, type, start, display, regionCode),
    null,
    'GET',
    [trigger, start, display]
  );

  useEffect(() => {
    start>0 ? setStart(0) : setTrigger(t => !t);
  }, [type, scale, regionCode]);

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
      <div className="body">
        <div className="region_box">
          <LegalAreaRadio ctpCode={ctpCode} setCtpCode={setCtpCode} sigCode={sigCode} setSigCode={setSigCode} emdCode={emdCode} setEmdCode={setEmdCode} disabled={type === 'category'} />
        </div>
        <div className="pagination">
          <Pagination disabled={tLoading} showSizeChanger onShowSizeChange={(current, pageSize) => setDisplay(pageSize)} total={(tableData?.data?.maxPage+1)*display} current={start+1} pageSize={display} onChange={page => setStart(page-1)} />
        </div>
        <div className="table">
          <Table columns={hotTrendColumns(type)} dataSource={tableData?.data?.data} bordered size="small" pagination={false} loading={tLoading} scroll={scrollProps} />
        </div>
      </div>
    </div>
  );
};

export default HotTrend;