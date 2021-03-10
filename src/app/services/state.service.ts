import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Timeframe} from '../models/timeframe';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  selectedTimeframe$: BehaviorSubject<Timeframe> = new BehaviorSubject<Timeframe>(Timeframe.ALL);

  setTimeframe(time: Timeframe): void {
    this.selectedTimeframe$.next(time);
  }
}
