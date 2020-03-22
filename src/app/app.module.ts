import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankdetailsComponent } from './bankdetails/bankdetails.component';
import { BankService } from './service/bank.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { AnalyticsComponent } from './analytics/analytics.component';

@NgModule({
  declarations: [
    AppComponent,
    BankdetailsComponent,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,
    NgxPaginationModule, Ng2SearchPipeModule,
    Ng2OrderModule, FormsModule, CommonModule, ChartsModule
  ],
  providers: [BankService],
  bootstrap: [AppComponent]
})
export class AppModule { }
