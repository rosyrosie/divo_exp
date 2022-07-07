import { HomeOutlined } from "@ant-design/icons";
import { dateToStringFormat, disabledDate } from "@utils/dateUtil";
import { Button, DatePicker, Input, message, Tag, Tree } from "antd";
import moment, { Moment } from "moment";
import { KeyboardEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RangeValue } from "rc-picker/lib/interface";
import PresetRange from "@components/PresetRange";
import axios from "axios";
import { AD_CHART_URL, AD_DB_URL, AD_TREE_URL, CHECK_USER_URL } from "@api";
import useAxios from "@useAxios";
import { applyColors, lineOptions } from "@utils/chartUtil";
import { Chart } from "react-chartjs-2";

const AreaDatalab = () => {
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
  const [ dateRange, setDateRange ] = useState<RangeValue<Moment>>([moment().subtract(1, 'months').subtract(2, 'days'), moment().subtract(2, 'days')]);

  const [ pivot, setPivot ] = useState('');
  const [ keywordList, setKeywordList ] = useState<string[]>([]);
  const [ newKeyword, setNewKeyword ] = useState('');
  const [ dbLoading, setDBLoading ] = useState(false);

  const [ trigger, setTrigger ] = useState(false);

  const [ checkList, cLoading, cError ] = useAxios(
    AD_TREE_URL,
    {
      pivot,
      keywords: keywordList,
      startDate: dateRange?.[0]?.format(dateToStringFormat),
      endDate: dateRange?.[1]?.format(dateToStringFormat)
    },
    'POST',
    [trigger, dateRange],
    !!pivot && keywordList.length > 0
  );

  const [ chartData, chLoading, chError ] = useAxios(
    AD_CHART_URL,
    {
      pivot,
      keywords: keywordList,
      startDate: dateRange?.[0]?.format(dateToStringFormat),
      endDate: dateRange?.[1]?.format(dateToStringFormat)
    },
    'POST',
    [trigger, dateRange],
    !!pivot && keywordList.length > 0
  );

  const onKeyPress: KeyboardEventHandler = e => {
    if(e.key !== 'Enter' || newKeyword.trim() === '') return;
    if(keywordList.includes(newKeyword)){
      message.error("이미 등록된 키워드입니다", 1.5);
      return;
    }
    if(keywordList.length === 9){
      message.error("비교 키워드는 최대 9개까지 추가 가능합니다", 1.5);
      return;
    }
    setKeywordList(list => [...list, newKeyword]);
    let token = localStorage.getItem('token');
    setDBLoading(true);
    axios.get(AD_DB_URL+newKeyword, {headers: {"Authorization": `Token ${token}`}}).then(res => setDBLoading(false));
    setNewKeyword('');

  }

  const onTagClose = (keyword: string) => {
    setKeywordList(list => list.filter(item => item !== keyword));
  }

  const onSubmit =  () => {
    if(dbLoading) return;
    setTrigger(t => !t);
  }

  return (
    <div className="area_datalab">
      <div className="header">
        <span className="header_title">
          <HomeOutlined onClick={() => navigate('/')} />
          <span className="menu_title">상권연관성 분석</span>
        </span>
        <span className="spread">
          <PresetRange 
            disableDay={false}
            setDateRange={setDateRange}
          />
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
        <div className="keyword_input">
          <Input value={pivot} onChange={e => setPivot(e.target.value)} placeholder="기준 키워드 입력" style={{ marginBottom: 12 }} status="error" />
          {keywordList.map(keyword => 
            <Tag
              key={keyword}
              className="keyword_tag"
              closable
              onClose={() => onTagClose(keyword)}
            >
              {keyword}
            </Tag>
          )}
          <Input value={newKeyword} onChange={e => setNewKeyword(e.target.value)} placeholder="비교 키워드 추가" onKeyPress={onKeyPress} style={{ marginBottom: 12 }} />
          <Button type="primary" onClick={onSubmit} disabled={dbLoading || !pivot || keywordList.length === 0}>데이터 조회</Button>
        </div>
        <div className="data">
          <div className="chart_box">
            <div className="chart">
              {chartData && <Chart type="line" options={lineOptions(false, false)} data={applyColors(chartData?.data, false)} />}
            </div>
          </div>
          <div className="check_box">
            <Tree
              treeData={checkList?.data}
              checkStrictly={true}
            />
          </div>
      </div>
      </div>
    </div>
  );
}

export default AreaDatalab;