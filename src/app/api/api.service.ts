import {Injectable} from '@angular/core';
import axios, {AxiosInstance} from 'axios';
import {Stock} from '../models/stock';
import {baseURL} from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL
    });
  }

  getUserStocks(): Promise<{ data: Stock[] }> {
    return this.api.get('stocks.json');
  }
}
