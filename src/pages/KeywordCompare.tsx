import { disabledDate } from '@utils/dateUtil';
import { AutoComplete, ConfigProvider, DatePicker } from 'antd';
import locale from 'antd/lib/locale/ko_KR';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import { RangeValue } from "rc-picker/lib/interface";

const KeywordCompare = () => {
  const { RangePicker } = DatePicker;
  const [ input, setInput ] = useState('');
  const [ keyword, setKeyword ] = useState('');
  const [ dateRange, setDateRange ] = useState<RangeValue<Moment>>([moment().subtract(1, 'months').subtract(2, 'days'), moment().subtract(2, 'days')]);
  const onDateChange = (dates: RangeValue<Moment>) => setDateRange(dates);
  const options = [{value: '최석우'}, {value: '이상현'}, {value: '주형진'}];

  return (
    <div className="content">
      <div className="header">
        <AutoComplete
          style={{
            width: 300
          }}
          value={input}
          onChange={data => setInput(data)}
          options={options}
          backfill={true}
          placeholder="키워드 입력"
          onSelect={(data: string) => setKeyword(data)}
        />
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
    </div>
  );
}

export default KeywordCompare;