import { useParams } from "react-router-dom";
import { DatePicker, message, Tree } from 'antd';
import moment, { Moment } from "moment";
import { Key, useEffect, useState } from "react";
import { RangeValue } from "rc-picker/lib/interface";
import { Chart } from "react-chartjs-2";
import { applyBarLabel, applyColors, applyMultiAxis, labelFormatter, lineOptions } from "@utils/chartUtil";
import useAxios from "@useAxios";
import { KWLIST_URL, KWSALES_CHART_URL } from "@api";
import { dateToStringFormat, disabledDate, expandDate, isDateRangeShort } from "@utils/dateUtil";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const KeywordSalesCorr = () => {
  const { corpId, dataId } = useParams();
  const { RangePicker } = DatePicker;
  const [ dateRange, setDateRange ] = useState<RangeValue<Moment>>([moment().subtract(1, 'months').subtract(2, 'days'), moment().subtract(2, 'days')]);

  const [ checkedKeys, setCheckedKeys ] = useState<Key[] | { checked: Key[], halfChecked: Key[] }>({ checked: ['brand'], halfChecked: [] });

  const [ keywordList, loading, error ] = useAxios(
    KWLIST_URL,
    {
      corpId,
      startDate: dateRange?.[0]?.format(dateToStringFormat),
      endDate: dateRange?.[1]?.format(dateToStringFormat),
      opt: dataId
    },
    'POST',
    [corpId, dateRange, dataId]
  );

  const [ keywordSalesChart, chartLoading, chartError ] = useAxios(
    KWSALES_CHART_URL,
    {
      corpId,
      startDate: dateRange?.[0]?.format(dateToStringFormat),
      endDate: dateRange?.[1]?.format(dateToStringFormat),
      keywords: (checkedKeys as { checked: Key[], halfChecked: Key[] }).checked,
      opt: dataId
    },
    'POST',
    [corpId, dateRange, checkedKeys, dataId],
    corpId !== undefined && (!isDateRangeShort(dateRange) || !dataId?.includes('kw-w'))
  );

  useEffect(() => {
    if(dataId?.includes('kw-w')) return;
    if(chartError) message.warning('데이터 부족', 1.5);
  }, [chartError]);

  useEffect(() => {
    if(!dataId?.includes('kw-w')) return;
    expandDate(dateRange, setDateRange);
  }, [dataId]);

  return (
    <div className="content">
      <div className="header">
        <RangePicker 
          disabledDate={disabledDate}
          placeholder={['시작 날짜', '끝 날짜']}
          value={dateRange}
          onChange={setDateRange}
          allowClear={false}
        />
      </div>
      <div className="data">
        <div className="chart_box">
          <div className="chart">
            {keywordSalesChart && 
              <Chart 
                type="line" 
                options={applyBarLabel(lineOptions(true, false), labelFormatter(dataId || '0', chartLoading))} 
                data={applyColors(applyMultiAxis(keywordSalesChart?.data))} 
                plugins={[ChartDataLabels]} 
              />
            }
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