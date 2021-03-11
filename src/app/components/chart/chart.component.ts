import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData } from '../../models/chart';
import { Timeframe } from '../../models/timeframe';
import { format, fromUnixTime } from 'date-fns';
import { SpotsService } from '../../api/spots.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnChanges {
  @Input() chartName: string;
  @Input() timeframe: Timeframe;
  chartOptions: any;
  data: ChartData;

  constructor(
    private spotsService: SpotsService,
    private changeDetector: ChangeDetectorRef,
    private toast: MessageService
  ) {
    this.chartOptions = {
      legend: false,
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: '#495057',
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              fontColor: '#495057',
            },
          },
        ],
      },
    };
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (this.chartName) {
      this.getChartData();
    }
  }

  getChartData(): void {
    this.spotsService
      .getSpots(this.chartName, this.timeframe)
      .then((response) => {
        const data = response.data;
        this.data = Object.values(data).reduce(
          (result, spot) => {
            result.labels.push(format(fromUnixTime(spot.date), 'P'));
            result.datasets[0].data.push(spot.spot);
            return result;
          },
          {
            labels: [],
            datasets: [
              {
                data: [],
                fill: false,
                borderColor: '#42A5F5',
              },
            ],
          }
        );
        this.changeDetector.detectChanges();
      })
      .catch(() => this.toast.add({ severity: 'error', summary: 'Error', detail: 'Cannot download stocks list.' }));
  }
}
