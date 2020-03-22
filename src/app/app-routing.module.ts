import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankdetailsComponent } from './bankdetails/bankdetails.component';
import { AnalyticsComponent } from './analytics/analytics.component';


const routes: Routes = [{ path: 'bankdetails', component: BankdetailsComponent },
{ path: 'analytics', component: AnalyticsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
