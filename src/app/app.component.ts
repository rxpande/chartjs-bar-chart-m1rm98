import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { BarInterface } from './data.interface';
import * as chartData from './data.json';
import * as q2 from './q2.json';
import * as q3 from './q3.json';
import * as q4 from './q4.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class AppComponent implements OnInit {
  dataArray: BarInterface[] = [];
  data: any;
  chart: any;
  quarter: string = 'Q1';
  q1: any = chartData;
  q2: any = q2;
  q3: any = q3;
  q4: any = q4;

  ngOnInit() {
    let options: any,
    ctx: any = document.getElementById('areaChart') as HTMLElement;
    ctx.style.backgroundColor = '#FFFFFF';

    this.loadData(null, this.quarter);

    this.data = {
      labels: ['Chicago', 'London', 'Frankfurt'],
      datasets: this.dataArray,
    };

    options = {
      responsive: false,
      onClick: (event, chartElement: any[]) => {
        console.log(event, chartElement[0]);

        if (chartElement.length > 0) {
          const index = chartElement[0].index;
          const datasetIndex = chartElement[0].datasetIndex;
          const label = this.data.labels[index];

          const value = this.data.datasets[datasetIndex].data[index];
          console.log(`Chart Data:`, datasetIndex, index, value, label, this.data);
        }

        
      },
      legend: {
        display: false,
      },
      layout: {
        padding: 15,
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            gridLines: {
              display: true,
            },
            ticks: {
              display: true,
              fontSize: 12,
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: true,
            },
            ticks: {
              display: true,
              fontSize: 12,
            },
          },
        ],
      },
    };

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.data,
      options: options,
    });
  }

  loadData(arr: any, span: any) {
    this.dataArray = [];
    this.quarter = span;
    arr === null ? (arr = chartData) : '';
    for (let key in arr) {
      if (arr.hasOwnProperty(key)) {
        this.dataArray.push(arr[key]);
      }
    }
    if (arr != null && this.data != undefined) {
      this.data.datasets = this.dataArray;
      this.chart.update();
    }
  }

  // Refresh canvas dimensions
  onResize(event: any) {
    this.chart.render();
  }
}
