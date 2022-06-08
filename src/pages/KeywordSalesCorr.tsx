import { useParams } from "react-router-dom";
import { DatePicker, Tree } from 'antd';
import moment, { Moment } from "moment";
import { Key, useState } from "react";
import { RangeValue } from "rc-picker/lib/interface";
import { Chart, Line } from "react-chartjs-2";
import { applyMultiAxis, lineOptions } from "@utils/chartUtil";
import useAxios from "@useAxios";
import { KWLIST_URL, KWSALES_CHART_URL } from "@api";

const KeywordSalesCorr = () => {
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
      opt: 0
    },
    'POST',
    [dateRange]
  );

  const [ keywordSalesChart, _, __] = useAxios(
    KWSALES_CHART_URL,
    {
      corpId,
      startDate: dateRange?.[0]?.format('YYYY-MM-DD'),
      endDate: dateRange?.[1]?.format('YYYY-MM-DD'),
      keywords: (checkedKeys as { checked: Key[], halfChecked: Key[] }).checked,
      opt: 0
    },
    'POST',
    [dateRange, checkedKeys]
  );

  return (
    <div className="content">
      <div className="header">
        <RangePicker 
          disabledDate={disabledDate}
          placeholder={['시작 날짜', '끝 날짜']}
          value={dateRange}
          onChange={(dates) => onChange(dates)}
          allowClear={false}
        />
      </div>
      <div className="data">
        <div className="chart_box">
          <div className="chart">
            {keywordSalesChart && <Chart type="line" options={lineOptions} data={applyMultiAxis(keywordSalesChart?.data)} />}
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