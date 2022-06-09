import { disabledDate } from '@utils/dateUtil';
import { ConfigProvider, DatePicker } from 'antd';
import locale from 'antd/lib/locale/ko_KR';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import { RangeValue } from "rc-picker/lib/interface";
import { Select } from 'antd';
import useAxios from '@useAxios';
import { KW_SELECT_URL, KW_CHECKLIST_URL, KW_CMP_CHART_URL } from '@api';
import { useParams } from 'react-router-dom';

const KeywordCompare = () => {
  const { corpId } = useParams();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [ keyword, setKeyword ] = useState('');
  const [ dateRange, setDateRange ] = useState<RangeValue<Moment>>([moment().subtract(1, 'months').subtract(2, 'days'), moment().subtract(2, 'days')]);
  const onDateChange = (dates: RangeValue<Moment>) => setDateRange(dates);
  const options = ['최석우', '이상현', '주형진'];

  const [ keywordList, loading, error ] = useAxios(
    KW_SELECT_URL + corpId,
    null,
    'GET',
    [corpId],
    corpId !== undefined
  );

  console.log(keywordList);

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
        <ConfigProvider locale={locale}>
          <RangePicker 
            disabledDate={disabledDate}
            placeholder={['시작 날짜', '끝 날짜']}
            value={dateRange}
            onChange={onDateChange}
            allowClear={false}
          />
        </ConfigProvider>
      </div>
      <div className="data">
        <div className="chart_box">
          <div className="chart"></div>
        </div>
        <div className="check_box">

        </div>
      </div>
    </div>
  );
}

export default KeywordCompare;