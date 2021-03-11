import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Timeframe } from '../models/timeframe';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  selectedTimeframe$: BehaviorSubject<Timeframe> = new BehaviorSubject<Timeframe>(Timeframe['1M']);
  selectedSector$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setTimeframe(time: Timeframe): void {
    this.selectedTimeframe$.next(time);
  }

  setSector(sector: string): void {
    this.selectedSector$.next(sector);
  }
}
