import {format, sub} from 'date-fns';
import {Timeframe} from '../models/timeframe';

export const getStartingDate = (timeframe: Timeframe): string => {
  const today = new Date();
  let date;
  switch (timeframe) {
    case Timeframe.ALL:
      date = sub(today, {years: 10});
      break;
    case Timeframe['1Y']:
      date = sub(today, {years: 1});
      break;
    case Timeframe['6M']:
      date = sub(today, {months: 6});
      break;
    case Timeframe['3M']:
      date = sub(today, {months: 3});
      break;
    case Timeframe['1M']:
      date = sub(today, {months: 1});
      break;
    case Timeframe['2W']:
      date = sub(today, {weeks: 2});
      break;
    case Timeframe['1W']:
      date = sub(today, {weeks: 1});
      break;
    default:
      date = sub(today, {days: 3});
      break;
  }
  return format(date, 'P');
};
