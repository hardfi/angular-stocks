import {Component, OnDestroy} from '@angular/core';
import {MobileService} from '../../mobile.service';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-timeframe-picker',
  templateUrl: './timeframe-picker.component.html',
  styleUrls: ['./timeframe-picker.component.scss']
})
export class TimeframePickerComponent implements OnDestroy {
  buttonsList: any[] = [];
  showBar: boolean;

  onDestroy$: Subject<void> = new Subject<void>();

  constructor(private mobileService: MobileService) {
    this.mobileService.isMobileLandscape$.subscribe(val => this.showBar = !val);

    this.buttonsList = [
      {label: '1D'},
      {label: '1M'},
      {label: '1Y'},
    ];
  }

  changeTimeframe(timeframe: string): void {
    console.log(timeframe);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
