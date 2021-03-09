import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryChartsViewComponent} from './pages/category-charts-view/category-charts-view.component';

const routes: Routes = [
  {path: '', redirectTo: 'chart', pathMatch: 'full'},
  {path: 'chart', component: CategoryChartsViewComponent},
  {path: 'chart/:category', component: CategoryChartsViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
