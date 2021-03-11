import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StocksService } from '../../api/stocks.service';
import { Stock } from '../../models/stock';
import { StateService } from '../../services/state.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Timeframe } from '../../models/timeframe';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category-charts-view',
  templateUrl: './category-charts-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryChartsViewComponent implements OnInit, OnDestroy {
  chartList: Stock[] = [];
  sector: string;
  timeframe: Timeframe;

  onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private apiService: StocksService,
    private changeDetector: ChangeDetectorRef,
    private stateService: StateService,
    private toast: MessageService
  ) {
    this.route.params.subscribe((params) => {
      const sector = params.sector;
      if (sector !== this.sector) {
        this.stateService.setSector(sector);
        this.getUserStocks();
      }
    });
  }

  ngOnInit(): void {
    this.stateService.selectedSector$.pipe(takeUntil(this.onDestroy$)).subscribe((sector) => (this.sector = sector));
    this.stateService.selectedTimeframe$.pipe(takeUntil(this.onDestroy$)).subscribe((timeframe) => {
      this.timeframe = timeframe;
      this.changeDetector.detectChanges();
    });
  }

  getUserStocks(): void {
    this.apiService
      .getUserStocks()
      .then((response) => {
        this.chartList = Object.values(response.data).filter((stock) => stock.sector.toLowerCase() === this.sector);
        this.changeDetector.detectChanges();
      })
      .catch(() => {
        this.toast.add({ severity: 'error', summary: 'Error', detail: 'Cannot download stocks list.' });
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
