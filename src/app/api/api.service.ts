import {Injectable} from '@angular/core';
import axios, {AxiosInstance} from 'axios';
import {Stock} from '../models/stock';
import {baseURL} from '../config/constants';
import {Spot} from '../models/spot';
import {getStartingDate} from '../utils/functions';
import {Timeframe} from '../models/timeframe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL
    });
    this.send();
  }

  getUserStocks(): Promise<{ data: Stock[] }> {
    return this.api.get('stocks.json');
  }

  getSpots(stockName: string, startingDate: Timeframe): Promise<{ data: [Spot[]] }> {
    const date = getStartingDate(startingDate);
    console.log('date');
    console.log(date);
    return this.api.get(`spots/${stockName}.json`);
  }

  // TODO: delete
  send(): void {
    // let counter = 0;
    // const data = (Array.from({length: 500}).map(num => {
    //   counter++;
    //   return {
    //     date: format( sub(new Date(), {days: counter}), 'P'),
    //     spot: Math.floor(Math.random() * (120 - 70) + 70),
    //   };
    // }));
    // console.log(JSON.stringify(data));
  }
}
