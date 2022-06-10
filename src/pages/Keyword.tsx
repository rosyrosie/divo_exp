import { SegmentedValue } from "antd/lib/segmented";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ConfigProvider, DatePicker, Select, Segmented } from 'antd';
import useAxios from "@useAxios";
import { KW_SELECT_URL } from "@api";
import locale from 'antd/lib/locale/ko_KR';
import { dateFormat, picker, rangeOptions } from "@utils/dateUtil";
import KwQtyChart from "@components/keyword/KwQtyChart";
import KwRatioChart from "@components/keyword/KwRatioChart";

const Keyword = () => {
  const { Option } = Select;
  const { corpId, dataId } = useParams();
  const [ keyword, setKeyword ] = useState('');
  const [ range, setRange ] = useState<SegmentedValue>('30일');
  const [ endDate, setEndDate ] = useState(moment().subtract(2, 'days'));

  const [ keywordList, loading, error ] = useAxios(
    KW_SELECT_URL + corpId,
    null,
    'GET',
    [corpId],
    corpId !== undefined
  );

  useEffect(() => {
    if(dataId?.slice(-1) === 'w'){
      if(range === '30일') setRange('13주');
    }
  }, [dataId, range]);

  const options = keywordList ? [...keywordList?.data[0], ...keywordList?.data[1], ...keywordList.data[2], ...keywordList.data[3]] : [];

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
          <Segmented 
            options={rangeOptions(dataId || '')}
            value={range}
            onChange={setRange}
            style={{
              marginRight: '12px'
            }}
          />
          <ConfigProvider locale={locale}>
            <DatePicker
              picker={picker(range)}
              value={endDate}
              onChange={(date) => date && setEndDate(date)}
              allowClear={false}
              format={dateFormat[picker(range)]}
              style={{
                width: '170px'
              }}
            />
          </ConfigProvider>
        </span>
      </div>
      {dataId === 'kw-qty' ? <KwQtyChart keyword={keyword} range={range} endDate={endDate} /> : <KwRatioChart keyword={keyword} range={range} endDate={endDate} />}
    </div>
  );
}

export default Keyword;