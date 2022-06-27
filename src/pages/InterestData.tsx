import { HomeOutlined } from "@ant-design/icons";
import { ID_URL } from "@api";
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

const InterestData = () => {
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;

  const [ type, setType ] = useState<'keyword' | 'area'>('area');
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
    !!filterInput.length
  );

  const columns = [
    {
      title: '순위',
      dataIndex: 'rank',
      key: 'rank',
      width: 50
    },
    {
      title: '구분',
      dataIndex: 'region',
      key: 'region',
      width: 70
    },
    {
      title: '외식소비의도',
      dataIndex: 'searchQty',
      key: 'searchQty',
      width: 90
    },
    {
      title: '성별 현황',
      children: [
        {
          title: '여성',
          dataIndex: 'female',
          key: 'female'
        },
        {
          title: '남성',
          dataIndex: 'male',
          key: 'male'
        }
      ]
    },
    {
      title: '기기별 현황',
      children: [
        {
          title: '모바일',
          dataIndex: 'mobile',
          key: 'mobile'
        },
        {
          title: 'PC',
          dataIndex: 'pc',
          key: 'pc'
        }
      ]
    },
    {
      title: '연령별 현황',
      children: [
        {
          title: '10대',
          dataIndex: 'ten',
          key: 'ten'
        },
        {
          title: '20대',
          dataIndex: 'twenty',
          key: 'twenty'
        },
        {
          title: '30대',
          dataIndex: 'thirty',
          key: 'thirty'
        },
        {
          title: '40대',
          dataIndex: 'forty',
          key: 'forty'
        },
        {
          title: '50대',
          dataIndex: 'fifty',
          key: 'fifty'
        }
      ]
    },
    {
      title: '요일별 현황',
      children: [
        {
          title: '월',
          dataIndex: 'mon',
          key: 'mon'
        },
        {
          title: '화',
          dataIndex: 'tue',
          key: 'tue'
        },
        {
          title: '수',
          dataIndex: 'wed',
          key: 'wed'
        },
        {
          title: '목',
          dataIndex: 'thur',
          key: 'thur'
        },
        {
          title: '금',
          dataIndex: 'fri',
          key: 'fri'
        },
        {
          title: '토',
          dataIndex: 'sat',
          key: 'sat'
        },
        {
          title: '일',
          dataIndex: 'sun',
          key: 'sun'
        }
      ]
    },
    {
      title: '월별 현황',
      children: [
        {
          title: '1월',
          dataIndex: 'jan',
          key: 'jan'
        },
        {
          title: '2월',
          dataIndex: 'feb',
          key: 'feb'
        },
        {
          title: '3월',
          dataIndex: 'mar',
          key: 'mar'
        },
        {
          title: '4월',
          dataIndex: 'apr',
          key: 'apr'
        },
        {
          title: '5월',
          dataIndex: 'may',
          key: 'may'
        },
        {
          title: '6월',
          dataIndex: 'jun',
          key: 'jun'
        },
        {
          title: '7월',
          dataIndex: 'jul',
          key: 'jul'
        },
        {
          title: '8월',
          dataIndex: 'aug',
          key: 'aug'
        },
        {
          title: '9월',
          dataIndex: 'sep',
          key: 'sep'
        },
        {
          title: '10월',
          dataIndex: 'oct',
          key: 'oct'
        },
        {
          title: '11월',
          dataIndex: 'nov',
          key: 'nov'
        },
        {
          title: '12월',
          dataIndex: 'dec',
          key: 'dec'
        },
      ]
    }
  ];

  const scrollProps = {
    y: document.body.clientHeight - 600
  };

  return (
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
          <Table columns={columns} dataSource={tableData?.data} bordered size="small" pagination={false} loading={tLoading} scroll={scrollProps} />
        </div>
      </div>
    </div>
  );
};

export default InterestData;