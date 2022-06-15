import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DatePicker, Select, message, Table } from 'antd';
import useAxios from "@useAxios";
import { KW_SELECT_URL } from "@api";
import { disabledDate, expandDate, isDateRangeShort } from "@utils/dateUtil";
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

  const options = keywordList ? [...keywordList?.data[0], ...keywordList?.data[1], ...keywordList.data[2], ...keywordList.data[3]] : [];

  useEffect(() => {
    if(keyword === '') message.info('키워드를 선택해주세요', 2);
  }, [keyword]);

  useEffect(() => {
    if(dataId !== 'kw-qty-w') return;
    expandDate(dateRange, setDateRange);
  }, [dataId]);

  const columns = [
    {
      title: '기간',
      dataIndex: 'range',
      key: 'range'
    },
    {
      title: '평균값',
      dataIndex: 'average',
      key: 'average'
    },
    {
      title: '추세(원/일)',
      dataIndex: 'trend',
      key: 'trend'
    }
  ];

  const dummy = [
    {
      range: '선택 기간',
      average: 30,
      trend: 20
    },
    {
      range: '30일',
      average: 30,
      trend: 20
    },
    {
      range: '60일',
      average: 30,
      trend: 20
    }
  ];

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
            <div className="data_table_box">
              <Table columns={columns} dataSource={dummy} pagination={false} bordered />
            </div>
          </div>
        </div> : 
        <KeywordQtySales keyword={keyword} dateRange={dateRange} setDateRange={setDateRange} />
      }
    </div>
  );
}

export default Keyword;