import { RangeValue } from 'rc-picker/lib/interface';
import { SegmentedLabeledOption, SegmentedValue } from 'antd/lib/segmented';
import { Moment } from 'moment';
import moment from 'moment';
import 'moment/locale/ko';
import React, { SetStateAction } from 'react';

moment.locale("ko", {
  week: {
    dow: 1
  }
});

export const disabledDate = (current: moment.Moment) => {
  return current && current > moment().endOf('day');
}

export const dateToStringFormat = 'YYYY-MM-DD';

export const dayFormat = (value: Moment) => moment(value).format(dateToStringFormat);
export const weekFormat = (value: Moment) => {
  const toThursday = moment(value).startOf('week').add(3, 'days');
  const year = toThursday.format('YYYY');
  const month = toThursday.format('MM');
  const day = parseInt(toThursday.format('DD'));
  return `${year}-${month} ${Math.floor((day+6)/7)}주차`
}
export const monthFormat = (value: Moment) => moment(value).format('YYYY-MM');

export const rangeId: Record<SegmentedValue, string> = {
  "30일": '30d',
  '13주': '13w',
  '26주': '26w',
  '52주': '52w',
  '24개월': '24m',
  '전체': 'tot'
};

export const rangeOptions: (dataId: string) => (SegmentedValue | SegmentedLabeledOption)[] = (dataId: string) => {
  const disableDay = dataId.slice(-1) === 'w';
  return [
    { label: '30일', value: '30일', disabled: disableDay }, 
    '13주', 
    '26주', 
    '52주', 
    '24개월', 
    '전체'
  ];
}

export const dateFormat = {
  'date': dayFormat,
  'week': weekFormat,
  'month': monthFormat 
};

export const picker = (range: SegmentedValue) => {
  if(typeof range === "number") return 'date';
  if(range.slice(-1) === '일') return 'date';
  if(range.slice(-1) === '주') return 'week';
  return 'month';
};

export const setPresetRange = (range: number, unit: 'days' | 'weeks' | 'months', setDateRange: React.Dispatch<SetStateAction<RangeValue<Moment>>>) => {
  const endDate = moment().subtract(2, 'days');
  const startDate = endDate.clone().subtract(range-1, unit);
  setDateRange([startDate, endDate]);
};

export const isDateRangeShort = (dateRange: RangeValue<Moment>) => {
  return dateRange?.[1] && dateRange[1]?.diff(dateRange[0], 'months') < 2;
};

export const expandDate = (dateRange: RangeValue<Moment>, setDateRange: React.Dispatch<SetStateAction<RangeValue<Moment>>>) => {
  if(isDateRangeShort(dateRange)){
    setDateRange((range: RangeValue<Moment>) => {
      const endDate = range?.[1]?.clone();
      const newStartDate = endDate?.clone()?.subtract(2, 'month');
      return [newStartDate, endDate] as RangeValue<Moment>;
    });
  }
}
