import { Component, OnDestroy } from '@angular/core';
import { MobileService } from '../../services/mobile.service';
import { Subject } from 'rxjs';
import { Timeframe } from '../../models/timeframe';
import { takeUntil } from 'rxjs/operators';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-timeframe-picker',
  templateUrl: './timeframe-picker.component.html',
  styleUrls: ['./timeframe-picker.component.scss'],
})
export class TimeframePickerComponent implements OnDestroy {
  buttonsList: any[] = [];
  showBar: boolean;
  isMobile: boolean;
  selectedTimeframe: Timeframe;

  onDestroy$: Subject<void> = new Subject<void>();

  constructor(private mobileService: MobileService, private stateService: StateService) {
    this.mobileService.isMobileLandscape$.pipe(takeUntil(this.onDestroy$)).subscribe((val) => (this.showBar = !val));
    this.mobileService.isMobile$.pipe(takeUntil(this.onDestroy$)).subscribe((val) => (this.isMobile = val));
    this.stateService.selectedTimeframe$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((val) => (this.selectedTimeframe = val));
    this.buttonsList = Object.keys(Timeframe);
  }

  changeTimeframe(timeframe: Timeframe): void {
    this.stateService.setTimeframe(timeframe);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
