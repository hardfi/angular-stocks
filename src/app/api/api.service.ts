import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Stock } from '../models/stock';
import { baseURL } from '../config/constants';
import { Spot } from '../models/spot';
import { getStartingDate } from '../utils/functions';
import { Timeframe } from '../models/timeframe';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL,
    });
  }

  getUserStocks(): Promise<{ data: Stock[] }> {
    return this.api.get('stocks.json');
  }

  getSpots(stockName: string, startingDate: Timeframe): Promise<{ data: Spot[] }> {
    const date = getStartingDate(startingDate);
    return this.api.get(`spots/${stockName}/0.json`, { params: { orderBy: '"date"', startAt: `${date}` } });
  }
}
