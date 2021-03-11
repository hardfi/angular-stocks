import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobileService } from '../../services/mobile.service';
import { ApiService } from '../../api/api.service';
import { StateService } from '../../services/state.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Timeframe } from '../../models/timeframe';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit, OnDestroy {
  menuItems: SelectItem[] = [];
  timeframes: SelectItem[];
  isMobile: boolean;
  isLandscape: boolean;
  selectedSector: string;
  selectedTimeframe: string;

  onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private mobileService: MobileService,
    private apiService: ApiService,
    private stateService: StateService
  ) {
    this.mobileService.isMobile$.pipe(takeUntil(this.onDestroy$)).subscribe((isMobile) => (this.isMobile = isMobile));
    this.mobileService.isLandscape$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((isLandscape) => (this.isLandscape = isLandscape));
    this.stateService.selectedSector$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((sector) => (this.selectedSector = sector));
    this.stateService.selectedTimeframe$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((timeframe) => (this.selectedTimeframe = timeframe));
    this.timeframes = Object.values(Timeframe).map((option) => ({ label: option, value: option }));
  }

  ngOnInit(): void {
    this.getUserStocks();
  }

  getUserStocks(): void {
    this.apiService
      .getUserStocks()
      .then((response) => {
        Object.values(response.data).forEach((stock) => {
          if (!this.menuItems.find((item) => item.value === stock.sector.toLowerCase())) {
            this.menuItems.push({ label: stock.sector, value: stock.sector.toLowerCase() });
          }
        });
        this.goToCategory(this.menuItems[0].value);
      })
      .catch((err) => console.warn(err));
  }

  goToCategory(sector?: string): void {
    const url = sector ? sector : this.selectedSector;
    this.router.navigate(['chart/' + url.toLowerCase()]);
  }

  changeTimeframe(timeframe: Timeframe): void {
    this.stateService.setTimeframe(timeframe);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
