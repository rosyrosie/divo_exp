import { dateToStringFormat, disabledDate } from '@utils/dateUtil';
import { DatePicker, message, Tree } from 'antd';
import moment, { Moment } from 'moment';
import { Key, useEffect, useState } from 'react';
import { RangeValue } from "rc-picker/lib/interface";
import { Select } from 'antd';
import useAxios from '@useAxios';
import { KW_SELECT_URL, KW_CHECKLIST_URL, KW_CMP_CHART_URL } from '@api';
import { useParams } from 'react-router-dom';
import { Chart } from 'react-chartjs-2';
import { applyColors, lineOptions } from '@utils/chartUtil';
import PresetRange from '@components/PresetRange';

const KeywordCompare = () => {
  const { corpId } = useParams();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [ keyword, setKeyword ] = useState('');
  const [ dateRange, setDateRange ] = useState<RangeValue<Moment>>([moment().subtract(1, 'months').subtract(2, 'days'), moment().subtract(2, 'days')]);
  const [ checkedKeys, setCheckedKeys ] = useState<Key[] | { checked: Key[], halfChecked: Key[] }>({ checked: ['brand'], halfChecked: [] });

  const [ keywordList, loading, error ] = useAxios(
    KW_SELECT_URL + corpId,
    null,
    'GET',
    [corpId],
    corpId !== undefined
  );

  const [ checkList, _, __] = useAxios(
    KW_CHECKLIST_URL,
    {
      corpId,
      pivot: keyword,
      startDate: dateRange?.[0]?.format(dateToStringFormat),
      endDate: dateRange?.[1]?.format(dateToStringFormat),
    },
    'POST',
    [corpId, keyword, dateRange],
    keyword !== ''
  );

  const [ chartData, chartLoading, ____ ] = useAxios(
    KW_CMP_CHART_URL,
    {
      corpId,
      pivot: keyword,
      startDate: dateRange?.[0]?.format(dateToStringFormat),
      endDate: dateRange?.[1]?.format(dateToStringFormat),
      keywords: (checkedKeys as { checked: Key[], halfChecked: Key[] }).checked,
    },
    'POST',
    [corpId, keyword, dateRange, checkedKeys],
    keyword !== ''
  );

  const options = keywordList ? [...keywordList?.data[0], ...keywordList?.data[1], ...keywordList.data[2], ...keywordList.data[3]] : [];

  useEffect(() => {
    if(keyword === '') message.info('키워드를 선택해주세요', 2);
  }, [keyword]);

  return (
    <div className="content">
      <div className="header">
        <Select
          showSearch
          placeholder="키워드 선택"
          style={{
            width: 240
          }}
          onChange={value => setKeyword(value)}
        >
          {options.map(option => (
            <Option value={option} key={option}>{option}</Option>
          ))}
        </Select>
        <span>
          <PresetRange disableDay={false} setDateRange={setDateRange} />
          <RangePicker 
            disabledDate={disabledDate}
            placeholder={['시작 날짜', '끝 날짜']}
            value={dateRange}
            onChange={setDateRange}
            allowClear={false}
          />
        </span>
      </div>
      <div className="data">
        <div className="chart_box">
          <div className="chart">
            {keyword !== '' && (chartData && <Chart type="line" options={lineOptions(false, false)} data={applyColors(chartData?.data, false)} />)}
          </div>
        </div>
        <div className="check_box">
          <Tree 
              checkable
              treeData={checkList?.data}
              checkStrictly={true}
              checkedKeys={checkedKeys}
              onCheck={(checked) => setCheckedKeys(checked)}
            />
        </div>
      </div>
    </div>
  );
}

export default KeywordCompare;