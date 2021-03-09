import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  menuItems: any[] = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.menuItems = [
      {label: 'Finance', link: 'finance'},
      {label: 'Banking', link: 'banking'},
      {label: 'Agriculture', link: 'agriculture'},
      {label: 'Clothing', link: 'clothing'},
      {label: 'Technology', link: 'technology'},
    ];
  }

  goToCategory(url: string): void {
    this.router.navigate(['chart/' + url]);
  }

}
