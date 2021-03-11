import { Injectable } from '@angular/core';
import { Stock } from '../models/stock';
import { httpClient } from './http-client';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  getUserStocks(): Promise<{ data: Stock[] }> {
    return httpClient.get('stocks.json');
  }
}
