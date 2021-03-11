import { Injectable } from '@angular/core';
import { Spot } from '../models/spot';
import { getStartingDate } from '../utils/functions';
import { Timeframe } from '../models/timeframe';
import { httpClient } from './http-client';

@Injectable({
  providedIn: 'root',
})
export class SpotsService {
  getSpots(stockName: string, startingDate: Timeframe): Promise<{ data: Spot[] }> {
    const date = getStartingDate(startingDate);
    return httpClient.get(`spots/${stockName}/0.json`, { params: { orderBy: '"date"', startAt: `${date}` } });
  }
}
