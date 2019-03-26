import { Component, OnInit } from '@angular/core';
import { TechnicianService } from '../../services/technician.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tech-detail-report',
  templateUrl: './tech-detail-report.component.html',
  styleUrls: ['./tech-detail-report.component.css']
})
export class TechDetailReportComponent implements OnInit {

  LineChart = [];
  LineChart1 = [];
  technician = {};
  chartData: any;

  constructor(private technicianService: TechnicianService,
    private route: ActivatedRoute,
    private appRoutes: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.getTechnicianDetail(this.route.snapshot.params['id'],this.route.snapshot.params['year']);

    this.getTechnicianCompleted(this.route.snapshot.params['id'],this.route.snapshot.params['year']);

    this.technicianService.getTechnicianDetails(this.route.snapshot.params['id']).subscribe(
      res => this.technician = res,
      err => console.log(err)
    )
  }

  year : number = 2019;

  discreate(){
    this.year = this.year - 1;
this.getTechnicianDetail(this.route.snapshot.params['id'], this.year);
  }

  increate(){
    this.year = this.year + 1;
this.getTechnicianDetail(this.route.snapshot.params['id'], this.year);
  }

year1 : number = 2019;

incret(){
  this.year1 = this.year1 + 1;
this.getTechnicianCompleted(this.route.snapshot.params['id'], this.year1);
}

decret(){
  this.year1 = this.year1 - 1;
  this.getTechnicianCompleted(this.route.snapshot.params['id'], this.year1);
}

  getTechnicianDetail(id,year) {
    this.http.get('http://localhost:5000/api/assignTechnicians/jobs/' + id+'/'+year).subscribe(data => {
      console.error(data);
      this.LineChart = new Chart('lineChart', {
        type: 'line',
        data: {
          labels: ["jan", "feb", "march", "april", "may", "june", "july", "aug", "sep", "oct", "nov", "dec"],
          datasets: [{
            label: 'number of Assinged job',
            data: data['data'],
            fill: false,
            lineTension: 0,
            borderColor: "red",
            borderWidth: 1
          }]
        },
        options: {
          // title:{
          //   text:"Line Chart",
          //   display:true},
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'No of Jobs'
              },
              ticks:{
                beginAtZero:true,
                stepSize: 1
              }
            }],
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month'
              }
            }]
          }
        },
      })
      this.chartData = ['data'];
      });
    }

    getTechnicianCompleted(id,year) {
      this.http.get('http://localhost:5000/api/solves/job/' + id+'/'+year+'/complete').subscribe(data => {
        console.error(data);
        this.LineChart1 = new Chart('lineChart1', {
          type: 'line',
          data: {
            labels: ["jan", "feb", "march", "april", "may", "june", "july", "aug", "sep", "oct", "nov", "dec"],
            datasets: [{
              label: 'number of Assinged job',
              data: data['data'],
              fill: false,
              lineTension: 0,
              borderColor: "red",
              borderWidth: 1
            }]
          },
          options: {
            // title:{
            //   text:"Line Chart",
            //   display:true},
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'No of Jobs'
                },
                ticks:{
                  beginAtZero:true,
                  stepSize: 1
                }
              }],
              xAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Month'
                }
              }]
            }
          },
        })
        this.chartData = ['data'];
        //  });
      }

      //   getTechnicianCompleted(id) {
      //     // this.http.get('http://localhost:3000/solve/solve/'+id+'/completed').subscribe(data => {
      //     //   console.log(data);
      //       this.LineChart1 = new Chart('lineChart1',{
      //         type:'line',
      //         data:{
      //           labels:["jan","feb","march","april","may","june","july","aug","sep","oct","nov","dec"],
      //           datasets:[{
      //             label:'number of completed jobs',
      //             data:["0","4","3","3","1","2","5","6","3","8","1","4"],
      //             fill:false,
      //             lineTension:0,
      //             borderColor:"red",
      //             borderWidth:1
      //           }]
      //         },
      //         options:{
      //         //   title:{
      //         //     text:"Line Chart",
      //         //     display:true
      //         // },
      //           scales:{
      //               yAxes:[{
      //                 scaleLabel: {
      //                   display: true,
      //                   labelString: 'No of Jobs'
      //                 },
      //                 ticks:{
      //                   beginAtZero:true,
      //                   stepValue:2
      //                 }
      //               }],
      //               xAxes: [ {
      //                 display: true,
      //                 scaleLabel: {
      //                   display: true,
      //                   labelString: 'Month'
      //                 }
      //               } ]

      //           }
      //         }
      //       })
      //       this.chartData = ['data'];
      //     //});
      //   }

      // }

    )
  }
}