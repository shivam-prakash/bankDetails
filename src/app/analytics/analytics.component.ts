import { Component, OnInit, AfterViewInit, ɵConsole } from '@angular/core';
import { BankService } from '../service/bank.service';
import { BankData } from '../models/bank-data';
import { map } from 'rxjs/operators';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  dataSet: BankData[];
  count: number;
  lineDataXAxis: void;
  lineDataYAxis: any;
  startDate: Date;
  endDate: Date;
  deposited = 0;
  withdrawn = 0;

  constructor(private bankService: BankService) { }


  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Balance Amount', lineTension: 0, pointBorderWidth: 2, },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    lineTension: 0,
    responsive: true,
    anchor: 'start',


    scales: {
      yAxes: [{
        ticks: {},
        gridLines: { display: true }
      }]
    },
    maintainAspectRatio: false
  };

  lineChartColors: Color[] = [
    {
      borderColor: ' #8CC1FD',
      backgroundColor: '#8CC1FD'
    },
  ];


  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'bar';




  pieChartData: ChartDataSets[] = [
    { data: [], label: 'Withdrawal vs deposited', lineTension: 0, pointBorderWidth: 2, },
  ];

  pieChartLabels: Label[] = [];

  pieChartOptions = {
    rotation: 150,
    responsive: true,

    legend: {
      position: 'right',
    },
    labels: {
      usePointStyle: false,
      position: 'bottom',
      align: 'end',
      padding: 100,

    }
    ,
    animation: {
      animateScale: true
    }

  };


  pieChartColors: Color[] = [
    {
      borderColor: ['rgb(72,128,255)', 'rgb(35,200,181)'],
      backgroundColor: ['rgb(72,128,255)', 'rgb(35,200,181)']
    },
  ];


  pieChartLegend = true;
  pieChartPlugins = [];
  pieChartType = 'pie';


  ngOnInit() {
    this.getBankDetails();

  }
  ngAfterViewInit() {
    this.extractXData();
    this.extractYData();
  }

  getBankDetails() {
    this.bankService.getBankDetails()
      .pipe(
        map((res: object[]) => res.sort((a, b) => new Date(a['Date']).getTime() - new Date(b['Date']).getTime()))
      ).subscribe((res: BankData[]) => {

        this.dataSet = res;

        this.count = this.dataSet.length;

        this.extractXData();
        this.extractYData();

      }, (err) => {
        alert(err);
      });
  }



  extractXData() {
    console.log(this.dataSet[this.count - 1]);
    this.lineChartLabels = [];

    this.startDate = new Date(this.dataSet[1].Date);
    console.log(this.startDate);
    this.endDate = new Date(this.dataSet[this.count - 1].Date);
    console.log(this.endDate);
    const dateArray: Date[] = [];
    var currentDate = this.startDate;
    while (currentDate <= this.endDate) {
      dateArray.push(new Date(currentDate));

      currentDate.setDate((currentDate.getDate()) + 1);

    }
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    console.log(dateArray);
    dateArray.forEach(function (value: Date, key) {

      const day = value.getDate();

      const month = value.getMonth();

      this.lineChartLabels.push(monthNames[month] + day);
    }.bind(this));


  }
  extractYData() {


    this.dataSet.forEach(function (value, key) {
      var processData = value['Balance AMT'].replace(/\,/g, '');
      console.log(processData);
      this.lineChartData[0].data.push(processData);

    }.bind(this));
    console.log("linedata" + this.lineChartData[0].data);

    this.dataSet.forEach(function (value, key) {
      if (value['Deposit AMT']) {
        this.deposited++;
      } else if (value['Withdrawal AMT']) {
        this.withdrawn++;
      }

    }.bind(this));
    console.log(this.deposited);
    this.pieChartData[0].data.push(this.deposited);
    this.pieChartData[0].data.push(this.withdrawn);
    this.pieChartLabels.push('No of  deposits');
    this.pieChartLabels.push('No of withdrawal');




  }


}




