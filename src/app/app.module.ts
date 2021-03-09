import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {ButtonModule} from 'primeng/button';
import {ChartModule} from 'primeng/chart';
import {SharedModule} from 'primeng/api';
import {MenuBarComponent} from './components/menu-bar/menu-bar.component';
import {CategoryChartsViewComponent} from './pages/category-charts-view/category-charts-view.component';
import { TimeframePickerComponent } from './components/timeframe-picker/timeframe-picker.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
