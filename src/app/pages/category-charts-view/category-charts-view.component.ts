import {ChangeDetectionStrategy, Component, OnChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category-charts-view',
  templateUrl: './category-charts-view.component.html',
  styleUrls: ['./category-charts-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryChartsViewComponent implements OnChanges {
  chartList: any[] = [];
  category: string;
  chartOptions: any;
  data: any;

  constructor(private route: ActivatedRoute) {
    this.chartList = [
      'one', 'two', 'three', 'four', 'five', 'six'
    ];
    this.data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
          fill: false,
          borderColor: '#42A5F5'
        },
      ]
    };

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

  ngOnChanges(): void {
    const category = this.route.snapshot.paramMap.get('category');
    if (category !== this.category) {
      this.category = category;
    }
  }

}
