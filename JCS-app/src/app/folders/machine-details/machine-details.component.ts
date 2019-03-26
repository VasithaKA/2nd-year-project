import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MachineService } from '../../services/machine.service';
import { Router, ActivatedRoute, ParamMap} from "@angular/router";
import { switchMap } from 'rxjs/operators';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-machine-details',
  templateUrl: './machine-details.component.html',
  styleUrls: ['./machine-details.component.css']
})
export class MachineDetailsComponent implements OnInit {
  LineChart=[];
  LineChart1=[];
  machine={};
  item=[];
  chartData: any;
  chartData1: any;

  constructor(private machineService: MachineService,
     private appRoutes: Router,
     private route: ActivatedRoute,
     private http: HttpClient
    ) { }

   ngOnInit() {

    this.getMachineDetails(this.route.snapshot.params['id'],this.route.snapshot.params['year']);

   // this.getMachineDetailDaily(this.route.snapshot.params['id']);

    this.machineService.getMachineDetail(this.route.snapshot.params['id']) .subscribe(
      res => this.machine = res,
      err => console.log(err)
    )
  }
   
  year : number = 2019;

  discreate(){
    this.year = this.year - 1;
this.getMachineDetails(this.route.snapshot.params['id'], this.year);
  }

  increate(){
    this.year = this.year + 1;
this.getMachineDetails(this.route.snapshot.params['id'], this.year);
  }

  getMachineDetails(id,year) {
    this.http.get('http://localhost:5000/api/jobs/jobs/jobs/'+id+'/'+year).subscribe(data => {
      console.error(data)
      this.LineChart = new Chart('lineChart',{
        type:'line',
        data:{
          labels:["jan","feb","march","april","may","june","july","aug","sep","oct","nov","dec"],
          datasets:[{
             label:'number of breakdown',
            data:data['data'],
            fill:false,
            lineTension:0,
            borderColor:"red",
            borderWidth:1
          }]
        },
        // data:{
        //   labels:["jan","feb","march","april","may","june","july","aug","sep","oct","nov","dec"],
        //   datasets:[{
        //      label:'number of breakdown',
        //     data:["0","4","3","3","1","2","5","6","3","8","1","4"],
        //     fill:false,
        //     lineTension:0,
        //     borderColor:"blue",
        //     borderWidth:1
        //   },{
        //     label:'number of oil leaks',
        //     data:["1","2","2","4","7","8","5","1","2","3","4","6"],
        //     fill:false,
        //     lineTension:0,
        //     borderColor:"red",
        //     borderWidth:1
        //   }
        // ]
        // },
        options:{
          title:{
            text:"Line Chart",
            display:false
        },
          scales:{
            yAxes:[{
              scaleLabel: {
                display: true,
                labelString: 'No of Breakdowns'
              },
              ticks:{
                beginAtZero:true,
                stepSize: 1
              }
            }],
            xAxes: [ {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month'
              }
            } ]
          }
        }
      })
      this.chartData =['data'];
     // this.chartData = ['data','data1'];
  }
  //getMachineDetailDaily(id) {
    //this.http.get('http://localhost:3000/jobs/machinejob/'+id).subscribe(data => {
     // console.error(data);
      //this.LineChart1 = new Chart('lineChart1',{
       // type:'line',
        // data:{
        //   labels:["jan","feb","march","april","may","june","july","aug","sep","oct","nov","dec"],
        //   datasets:[{
        //      label:'number of breakdown',
        //     data:["1","2","2","3","1","2","5","1","3","3","1","4"],
        //     fill:false,
        //     lineTension:0,
        //     borderColor:"red",
        //     borderWidth:1
        //   }]
        // },
  //       data:{
  //         labels:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"],
  //         datasets:[{
  //            label:'number of breakdown',
  //           data:["0","0","1","1","0","0","0","0","0","0","1","4"],
  //           fill:false,
  //           lineTension:0,
  //           borderColor:"blue",
  //           borderWidth:1
  //         },{
  //           label:'number of oil leaks',
  //           data:["1","2","2","4","7","8","5","1","2","3","4","6"],
  //           fill:false,
  //           lineTension:0,
  //           borderColor:"red",
  //           borderWidth:1
  //         }
  //       ]
  //       },
  //       options:{
  //         title:{
  //           text:"Line Chart",
  //           display:false
  //       },
  //         scales:{
  //           yAxes:[{
  //             scaleLabel: {
  //               display: true,
  //               labelString: 'No of Breakdowns'
  //             },
  //             ticks:{
  //               beginAtZero:true
  //             }
  //           }],
  //           xAxes: [ {
  //             display: true,
  //             scaleLabel: {
  //               display: true,
  //               labelString: 'Date'
  //             }
  //           } ]
  //         }
  //       }
  //     })
  //     //this.chartData =['data'];
  //     this.chartData = ['data','data1'];
  // }
)};
}
