import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Timeframe } from '../models/timeframe';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private selectedTimeframe: BehaviorSubject<Timeframe> = new BehaviorSubject<Timeframe>(Timeframe['1M']);
  private selectedSector: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public readonly selectedTimeframe$ = this.selectedTimeframe.asObservable();
  public readonly selectedSector$ = this.selectedSector.asObservable();

  setTimeframe(time: Timeframe): void {
    this.selectedTimeframe.next(time);
  }

  setSector(sector: string): void {
    this.selectedSector.next(sector);
  }
}
