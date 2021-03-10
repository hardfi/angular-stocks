import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuBarComponent} from './components/menu-bar/menu-bar.component';
import {CategoryChartsViewComponent} from './pages/category-charts-view/category-charts-view.component';
import {TimeframePickerComponent} from './components/timeframe-picker/timeframe-picker.component';
import {MobileService} from './mobile.service';

import {ButtonModule} from 'primeng/button';
import {ChartModule} from 'primeng/chart';
import {DropdownModule} from 'primeng/dropdown';
import {SharedModule} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    CategoryChartsViewComponent,
    TimeframePickerComponent
  ],
  imports: [
    ChartModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    SharedModule,
    DropdownModule,
    BrowserAnimationsModule
  ],
  providers: [MobileService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
