import { useParams } from "react-router-dom";
import { ConfigProvider, DatePicker, message, Spin, Tree } from 'antd';
import moment, { Moment } from "moment";
import { Key, useEffect, useState } from "react";
import { RangeValue } from "rc-picker/lib/interface";
import { Chart } from "react-chartjs-2";
import { applyColors, applyMultiAxis, lineOptions } from "@utils/chartUtil";
import useAxios from "@useAxios";
import { KWLIST_URL, KWSALES_CHART_URL } from "@api";
import 'moment/locale/ko';
import locale from 'antd/lib/locale/ko_KR';
import { kwSalesMenu } from "@routes/menuconfig";

const KeywordSalesCorr = ({ opt }: { opt: typeof kwSalesMenu[number] }) => {
  const { corpId } = useParams();
  const { RangePicker } = DatePicker;
  const [ dateRange, setDateRange ] = useState<RangeValue<Moment>>([moment().subtract(1, 'months').subtract(2, 'days'), moment().subtract(2, 'days')]);
  const disabledDate = (current: moment.Moment) => {
    return current && current > moment().endOf('day');
  }
  const onChange = (dates: RangeValue<Moment>) => setDateRange(dates);

  const [ checkedKeys, setCheckedKeys ] = useState<Key[] | { checked: Key[], halfChecked: Key[] }>({ checked: ['brand'], halfChecked: [] });

  const [ keywordList, loading, error ] = useAxios(
    KWLIST_URL,
    {
      corpId,
      startDate: dateRange?.[0]?.format('YYYY-MM-DD'),
      endDate: dateRange?.[1]?.format('YYYY-MM-DD'),
      opt
    },
    'POST',
    [dateRange, opt]
  );

  const [ keywordSalesChart, chartLoading, chartError ] = useAxios(
    KWSALES_CHART_URL,
    {
      corpId,
      startDate: dateRange?.[0]?.format('YYYY-MM-DD'),
      endDate: dateRange?.[1]?.format('YYYY-MM-DD'),
      keywords: (checkedKeys as { checked: Key[], halfChecked: Key[] }).checked,
      opt
    },
    'POST',
    [dateRange, checkedKeys, opt]
  );

  useEffect(() => {
    if(chartError) message.warning('데이터 부족', 1.5);
  }, [chartError]);

  return (
    <div className="content">
      <div className="header">
        <ConfigProvider locale={locale}>
          <RangePicker 
            disabledDate={disabledDate}
            placeholder={['시작 날짜', '끝 날짜']}
            value={dateRange}
            onChange={(dates) => onChange(dates)}
            allowClear={false}
          />
        </ConfigProvider>
      </div>
      <div className="data">
        <div className="chart_box">
          <div className="chart">
            {chartLoading ? <Spin /> : <Chart type="line" options={lineOptions} data={applyColors(applyMultiAxis(keywordSalesChart?.data))} />}
          </div>
        </div>
        <div className="check_box">
          <Tree 
            checkable
            treeData={keywordList?.data}
            checkStrictly={true}
            checkedKeys={checkedKeys}
            onCheck={(checked) => setCheckedKeys(checked)}
          />
        </div>
      </div>
    </div>
  );

}

export default KeywordSalesCorr;