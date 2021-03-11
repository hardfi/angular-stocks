import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { CategoryChartsViewComponent } from './pages/category-charts-view/category-charts-view.component';
import { TimeframePickerComponent } from './components/timeframe-picker/timeframe-picker.component';
import { DeviceService } from './services/device.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ChartComponent } from './components/chart/chart.component';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService, SharedModule } from 'primeng/api';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StateService } from './services/state.service';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    CategoryChartsViewComponent,
    TimeframePickerComponent,
    ChartComponent,
    SpinnerComponent,
  ],
  imports: [
    ChartModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    SharedModule,
    DropdownModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastModule,
  ],
  providers: [DeviceService, StateService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
