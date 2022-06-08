import { useParams } from "react-router-dom";
import { DatePicker, Tree } from 'antd';
import moment, { Moment } from "moment";
import { Key, useState } from "react";
import { RangeValue } from "rc-picker/lib/interface";

const KeywordSalesCorr = () => {
  const { corpId } = useParams();
  const { RangePicker } = DatePicker;
  const [ dateRange, setDateRange ] = useState<RangeValue<Moment>>([moment().subtract(1, 'months').subtract(2, 'days'), moment().subtract(2, 'days')]);
  const disabledDate = (current: moment.Moment) => {
    return current && current > moment().endOf('day');
  }
  const onChange = (dates: RangeValue<Moment>) => setDateRange(dates);

  const [ checkedKeys, setCheckedKeys ] = useState<Key[] | { checked: Key[], halfChecked: Key[] }>([]);

  console.log(checkedKeys);

  const treeData = [
    {
      title: '브랜드 키워드 합',
      key: 'brand',
      children: [
        {
          title: '관평동 샤브향',
          key: '관평동 샤브향'
        },
      ],
    },
    {
      title: '상권 키워드 합',
      key: 'area',
      children: [
        {
          title: '관평동 맛집',
          key: '관평동 맛집'
        },
      ],
    },
    {
      title: '업종 키워드 합',
      key: 'cat',
      children: [
        {
          title: '샤브샤브 맛집',
          key: '샤브샤브 맛집'
        },
        {
          title: '대전 샤브샤브',
          key: '대전 샤브샤브',
        },
        {
          title: '관평동 샤브샤브',
          key: '관평동 샤브샤브'
        },
      ],
    },
    {
      title: '경쟁 키워드 합',
      key: 'rival',
      children: [
        {
          title: '샤브쌈주머니',
          key: '샤브쌈주머니',
        }
      ],
    },
  ];

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
        <div className="chart"></div>
        <div className="check_box">
          <Tree 
            checkable
            treeData={treeData}
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