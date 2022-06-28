import { HomeOutlined } from "@ant-design/icons";
import { CHECK_USER_URL, ID_URL } from "@api";
import LegalAreaCheck from "@components/LegalAreaCheck";
import useAxios from "@useAxios";
import { Button, DatePicker, Segmented, Table } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import moment, { Moment } from "moment";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RangeValue } from "rc-picker/lib/interface";
import { dateToStringFormat, disabledDate } from "@utils/dateUtil";
import KeywordTags from "@components/interestdata/KeywordTags";
import { interestDataColumns, saveasCSV, scrollProps } from "@utils/tableUtil";
import DetailModal from "@components/interestdata/DetailModal";

const InterestData = () => {
  const navigate = useNavigate();

  const [ sysAuth, _, __] = useAxios(
    CHECK_USER_URL,
    null,
    'GET',
    []
  );

  useEffect(() => {
    if(sysAuth?.isCorp === false) navigate('/');
  }, [sysAuth]);
  
  const { RangePicker } = DatePicker;

  const [ type, setType ] = useState<'keyword' | 'area'>('keyword');
  const [ trigger, setTrigger ] = useState(false);
  const [ dateRange, setDateRange ] = useState<RangeValue<Moment>>([moment().subtract(1, 'months').subtract(2, 'days'), moment().subtract(2, 'days')]);

  const [ codeList, setCodeList ] = useState({
    ctp: [] as string[],
    sig: [] as string[],
    emd: [] as string[]
  });

  const [ tagList, setTagList ] = useState<string[]>([]);

  const typeOptions = [
    {
      label: '키워드',
      value: 'keyword'
    },
    {
      label: '행정구역',
      value: 'area'
    }
  ];

  const filterKey = type === 'keyword' ? 'keywords' : 'regionCodes';
  const filterInput = useMemo(() => {
    if(type === 'area'){
      return codeList.emd.length ? codeList.emd : codeList.sig.length ? codeList.sig : codeList.ctp.length ? codeList.ctp : ['0'];
    }
    return tagList;
  }, [codeList, tagList, type]);

  const [ tableData, tLoading, tError ] = useAxios(
    ID_URL,
    {
      [filterKey]: filterInput,
      startDate: dateRange?.[0]?.format(dateToStringFormat),
      endDate: dateRange?.[1]?.format(dateToStringFormat),
    },
    'POST',
    [trigger, type],
  );

  const [ modalId, setModalId ] = useState<string | null>(null);

  return (
    <>
      <div className="interest_data">
        <div className="header">
          <span className="header_title">
            <HomeOutlined onClick={() => navigate('/')} />
            <span className="menu_title">외식소비의도 분석</span>
          </span>
          <span className="spread">
            <Segmented value={type} onChange={setType as (arg: SegmentedValue) => void} options={typeOptions} />
            <RangePicker 
              disabledDate={disabledDate}
              placeholder={['시작 날짜', '끝 날짜']}
              value={dateRange}
              onChange={setDateRange}
              allowClear={false}
            />
          </span>
        </div>
        <div className="body">
          <div className="region_box">
            {type === 'area' ? <LegalAreaCheck codeList={codeList} setCodeList={setCodeList} /> : <KeywordTags tagList={tagList} setTagList={setTagList} />}
          </div>
          <div className="trigger">
            <Button type="primary" onClick={() => setTrigger(t => !t)}>
              상권 분석
            </Button>
          </div>
          <div className="table">
            <Table columns={interestDataColumns(setModalId)} dataSource={tableData?.data} bordered size="small" pagination={false} loading={filterInput.length && tLoading} scroll={scrollProps} />
            <div className="save_csv_box">
              <Button className="save_csv" onClick={() => saveasCSV(interestDataColumns(setModalId), tableData?.data, `외식소비의도 분석.xlsx`)}>CSV 다운로드</Button>
            </div>
          </div>
        </div>
      </div>
    <DetailModal modalId={modalId} setModalId={setModalId} />
    </>
  );
};

export default InterestData;