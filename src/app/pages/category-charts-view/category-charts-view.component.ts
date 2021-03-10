import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../api/api.service';
import {Stock} from '../../models/stock';

@Component({
  selector: 'app-category-charts-view',
  templateUrl: './category-charts-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryChartsViewComponent {
  chartList: Stock[] = [];
  sector: string;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private changeDetector: ChangeDetectorRef) {
    this.route.params.subscribe(params => {
      const sector = params.sector;
      if (sector !== this.sector) {
        this.sector = sector;
        this.getUserStocks();
      }
    });
  }

  getUserStocks(): void {
    this.apiService.getUserStocks()
      .then(response => {
        this.chartList = Object.values(response.data).filter(stock => stock.sector.toLowerCase() === this.sector);
        this.changeDetector.detectChanges();
      })
      .catch(err => console.warn(err));
  }

}
