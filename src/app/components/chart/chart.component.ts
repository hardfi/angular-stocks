import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {ApiService} from '../../api/api.service';
import {ChartData} from '../../models/chart';
import {StateService} from '../../services/state.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Timeframe} from '../../models/timeframe';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnChanges, OnDestroy {
  @Input() chartName: string;
  chartOptions: any;
  data: ChartData;
  selectedTimeframe: Timeframe;

  onDestroy$: Subject<void> = new Subject<void>();

  constructor(private apiService: ApiService,
              private changeDetector: ChangeDetectorRef,
              private stateService: StateService) {
    this.stateService.selectedTimeframe$.pipe(takeUntil(this.onDestroy$)).subscribe(timeframe => {
      this.selectedTimeframe = timeframe;
      if (this.chartName) {
        this.getChartData();
      }
    });

    this.chartOptions = {
      legend: false,
      scales: {
        xAxes: [{
          ticks: {
            fontColor: '#495057'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: '#495057'
          }
        }]
      }
    };
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.chartName?.currentValue) {
      this.getChartData();
    }
  }

  getChartData(): void {
    this.apiService.getSpots(this.chartName, this.selectedTimeframe).then(response => {
      const data = response.data[0];
      this.data = data.reduce((result, spot) => {
        result.labels.push(spot.date);
        result.datasets[0].data.push(spot.spot);
        return result;
      }, {
        labels: [],
        datasets: [
          {
            data: [],
            fill: false,
            borderColor: '#42A5F5'
          }
        ]
      });
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
