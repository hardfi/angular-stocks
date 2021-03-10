import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MobileService} from '../../services/mobile.service';
import {ApiService} from '../../api/api.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  menuItems: string[] = [];
  isMobile: boolean;
  isLandscape: boolean;

  constructor(private router: Router,
              private mobileService: MobileService,
              private apiService: ApiService) {
    this.mobileService.isMobile$.subscribe(isMobile => this.isMobile = isMobile);
    this.mobileService.isLandscape$.subscribe(isLandscape => this.isLandscape = isLandscape);
  }

  ngOnInit(): void {
    this.getUserStocks();
  }

  getUserStocks(): void {
    this.apiService.getUserStocks()
      .then(response => {
        Object.values(response.data).forEach(stock => {
          if (!this.menuItems.includes(stock.sector)) {
            this.menuItems.push(stock.sector);
          }
        });
        this.goToCategory(this.menuItems[0]);
      })
      .catch(err => console.warn(err));
  }

  goToCategory(sector: string): void {
    this.router.navigate(['chart/' + sector.toLowerCase()]);
  }

}
