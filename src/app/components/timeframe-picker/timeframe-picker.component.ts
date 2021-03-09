import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeframe-picker',
  templateUrl: './timeframe-picker.component.html',
  styleUrls: ['./timeframe-picker.component.scss']
})
export class TimeframePickerComponent {
  buttonsList: any[] = [];

  constructor() {
    this.buttonsList = [
      {label: '1D'},
      {label: '1M'},
      {label: '1Y'},
    ];
  }

  changeTimeframe(timeframe: string): void {
    console.log(timeframe);
  }

}
