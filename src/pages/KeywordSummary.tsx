import { disabledDate } from "@utils/dateUtil";
import { Card, DatePicker, message } from "antd";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { KW_ANLY_SUMM_URL } from "@api";
import useAxios from "@useAxios";
import { useParams } from "react-router-dom";
import { RangeValue } from "rc-picker/lib/interface";
import PresetRange from "@components/PresetRange";

const KeywordSummary = () => {
  const { corpId, dataId } = useParams();
  const { RangePicker } = DatePicker;
  const [ dateRange, setDateRange ] = useState<RangeValue<Moment>>([moment().subtract(1, 'months').subtract(2, 'days'), moment().subtract(2, 'days')]);

  // const [ summary, loading, error ] = useAxios(
  //   KW_ANLY_SUMM_URL(corpId || '0', rangeId[range], endDate?.format(dateToStringFormat)),
  //   null,
  //   'GET',
  //   [corpId, endDate, range],
  //   corpId !== undefined
  // );

  // useEffect(() => {
  //   if(error) message.warning('error', 1.5);
  // }, [error]);

  return (
    <div className="content">
      <div className="header">
        <PresetRange 
          disableDay={dataId?.slice(-1) === 'w'}
          setDateRange={setDateRange}
        />
        <RangePicker 
          disabledDate={disabledDate}
          placeholder={['시작 날짜', '끝 날짜']}
          value={dateRange}
          onChange={setDateRange}
          allowClear={false}
        />
      </div>
      <div className="cards">
        {/* <Card
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
            <Card type="inner" title={texts[0]} style={{ marginTop: idx > 0 ? '12px' : '0' }} key={idx}>
              {texts.map((text: string, i: number) => i>0 && <p key={text}>{text}</p>)}
            </Card>
          )}
        </Card> */}
      </div>
    </div>
  );
}

export default KeywordSummary;