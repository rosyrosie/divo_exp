import { SegmentedValue } from 'antd/lib/segmented';
import { Moment } from 'moment';
import moment from 'moment';
import 'moment/locale/ko';

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

export const rangeOptions = ['30일', '13주', '26주', '52주', '24개월', '전체'];

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
}