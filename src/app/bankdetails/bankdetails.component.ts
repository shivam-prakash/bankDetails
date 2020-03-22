import { Component, OnInit } from '@angular/core';
import { BankService } from '../service/bank.service';
import { BankData } from '../models/bank-data';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { from } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.css']
})
export class BankdetailsComponent implements OnInit {
  bankDataRes = new BankData();
  dataSet: BankData[];
  config: any;
  count: number;
  key: string;
  reverse: boolean;
  p = 1;
  reverseValueDays = false;
  reverseDays = false;
  constructor(private bankService: BankService) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.count
    };
  }

  ngOnInit() {
    this.getBankDetails();
  }

  getBankDetails() {
    this.bankService.getBankDetails().subscribe((res: BankData[]) => {
      this.dataSet = res;
      this.count = this.dataSet.length;


    }, (err) => {
      alert(err);
    });
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }

  sortAmt(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  sortDays() {
    if (this.reverseDays) {

      this.bankService.getBankDetails()
        .pipe(
          map((res: object[]) => res.sort((a, b) => new Date(a['Date']).getTime() - new Date(b['Date']).getTime()))
        ).subscribe((res: BankData[]) => {
          this.dataSet = res;
          this.count = this.dataSet.length;

        });
    } else if (!this.reverse) {


      this.bankService.getBankDetails()
        .pipe(
          map((res: object[]) => res.sort((a, b) => new Date(b['Date']).getTime() - new Date(a['Date']).getTime()))
        ).subscribe((res: BankData[]) => {
          this.dataSet = res;
          this.count = this.dataSet.length;

        });
    }

    this.reverseDays = !this.reverseDays;


  }
  sortValueDays() {
    console.log(this.reverseValueDays);
    if (this.reverseValueDays) {
      console.log("revsort");

      this.bankService.getBankDetails()
        .pipe(
          map((res: object[]) => res.sort((a, b) => new Date(a['Value Date']).getTime() - new Date(b['Value Date']).getTime()))
        ).subscribe((res: BankData[]) => {
          this.dataSet = res;
          this.count = this.dataSet.length;

        });
    } else if (!this.reverse) {
      console.log("sort");

      this.bankService.getBankDetails()
        .pipe(
          map((res: object[]) => res.sort((a, b) => new Date(b['Value Date']).getTime() - new Date(a['Value Date']).getTime()))
        ).subscribe((res: BankData[]) => {
          this.dataSet = res;
          this.count = this.dataSet.length;

        });
    }

    this.reverseValueDays = !this.reverseValueDays;
  }
}
