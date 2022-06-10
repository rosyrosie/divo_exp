import { dateFormat, dateToStringFormat, picker, rangeId, rangeOptions } from "@utils/dateUtil";
import { Card, ConfigProvider, DatePicker, message, Segmented } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import moment from "moment";
import { useEffect, useState } from "react";
import locale from 'antd/lib/locale/ko_KR';
import { KW_ANLY_SUMM_URL } from "@api";
import useAxios from "@useAxios";
import { useParams } from "react-router-dom";

const KeywordSummary = () => {
  const { corpId, dataId } = useParams();
  const [ range, setRange ] = useState<SegmentedValue>('30일');
  const [ endDate, setEndDate ] = useState(moment().subtract(2, 'days'));

  const [ summary, loading, error ] = useAxios(
    KW_ANLY_SUMM_URL(corpId || '0', rangeId[range], endDate?.format(dateToStringFormat)),
    null,
    'GET',
    [corpId, endDate, range],
    corpId !== undefined
  );

  useEffect(() => {
    if(error) message.warning('error', 1.5);
  }, [error]);

  return (
    <div className="content">
      <div className="header">
        <Segmented 
          options={rangeOptions(dataId || '')}
          value={range}
          onChange={setRange}
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
      </div>
      <div className="cards">
        <Card
          title="브랜드 키워드 정보"
          style={{
            marginBottom: '24px'
          }}
          loading={loading}
        >
          {summary?.data[0].map((text: string) => <p key={text}>{text}</p>)}
        </Card>
        <Card
          title="키워드 상관관계"
          loading={loading}
        >
          {summary?.data[1].map((texts: string[], idx: number) => 
            <Card type="inner" title={texts[0]} style={{ marginTop: idx > 0 ? '12px' : '0' }}>
              {texts.map((text: string, i: number) => i>0 && <p key={text}>{text}</p>)}
            </Card>
          )}
        </Card>
      </div>
    </div>
  );
}

export default KeywordSummary;