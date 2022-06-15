import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DatePicker, Select, message, Table } from 'antd';
import useAxios from "@useAxios";
import { KW_SELECT_URL, KW_TABLE_URL } from "@api";
import { dateToStringFormat, disabledDate, expandDate, isDateRangeShort } from "@utils/dateUtil";
import KwQtyChart from "@components/keyword/KwQtyChart";
import KwRatioChart from "@components/keyword/KwRatioChart";
import KeywordQtySales from "@components/keyword/KeywordQtySales";
import { RangeValue } from "rc-picker/lib/interface";
import PresetRange from "@components/PresetRange";

const Keyword = () => {
  const { Option } = Select;
  const { corpId, dataId } = useParams();
  const { RangePicker } = DatePicker;
  const [ keyword, setKeyword ] = useState('');
  const [ dateRange, setDateRange ] = useState<RangeValue<Moment>>([moment().subtract(1, 'months').subtract(2, 'days'), moment().subtract(2, 'days')]);

  const [ keywordList, loading, error ] = useAxios(
    KW_SELECT_URL + corpId,
    null,
    'GET',
    [corpId],
    corpId !== undefined && (dataId !== 'kw-qty-w' || !isDateRangeShort(dateRange))
  );

  const [ tableData, _, __ ] = useAxios(
    KW_TABLE_URL,
    {
      corpId: parseInt(corpId || '0'),
      pivot: keyword,
      startDate: dateRange?.[0]?.format(dateToStringFormat),
      endDate: dateRange?.[1]?.format(dateToStringFormat),
      opt: dataId
    },
    'POST',
    [corpId, dateRange, keyword, dataId],
    keyword !== '' && dataId !== 'kw-qty-sales' && (!dataId?.includes('-w') || !isDateRangeShort(dateRange))
  );

  const options = keywordList ? [...keywordList?.data[0], ...keywordList?.data[1], ...keywordList.data[2], ...keywordList.data[3]] : [];

  useEffect(() => {
    if(keyword === '') message.info('키워드를 선택해주세요', 2);
  }, [keyword]);

  useEffect(() => {
    if(dataId !== 'kw-qty-w') return;
    expandDate(dateRange, setDateRange);
  }, [dataId]);

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
          <PresetRange 
            disableDay={dataId === 'kw-qty-w'}
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
      {dataId !== 'kw-qty-sales' ? 
        <div className="data">
          <div className="chart_box">
            {dataId === 'kw-qty' ? 
              <KwQtyChart keyword={keyword} dateRange={dateRange} /> : 
              <KwRatioChart keyword={keyword} dateRange={dateRange} />
            }
            {tableData && <div className="data_table_box">
              <Table columns={tableData.data.columns} dataSource={tableData.data.data} pagination={false} bordered />
            </div>}
          </div>
        </div> : 
        <KeywordQtySales keyword={keyword} dateRange={dateRange} setDateRange={setDateRange} />
      }
    </div>
  );
}

export default Keyword;