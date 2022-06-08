import { DatePicker, Segmented } from "antd";
import { SegmentedValue } from "antd/lib/segmented";
import { useState } from "react";

const SalesQty = () => {
  const idMap = {
    "30일": '30d',
    '13주': '13w',
    '26주': '26w',
    '52주': '52w',
    '24개월': '24m',
    '전체': 'all'
  };

  const rangeOptions = ['30일', '13주', '26주', '52주', '24개월', '전체'];
  
  const picker = (range: SegmentedValue) => {
    if(typeof range === "number") return 'date';
    if(range.slice(-1) === '일') return 'date';
    if(range.slice(-1) === '주') return 'week';
    return 'month';
  }

  const [ range, setRange ] = useState<SegmentedValue>('30일');

  return (
    <div className="content">
      <div className="header">
        <Segmented 
          options={rangeOptions}
          value={range}
          onChange={setRange}
        />
        <DatePicker picker={picker(range)}/>
      </div>
    </div>
  );
}

export default SalesQty;