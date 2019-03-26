import { Component, OnInit } from '@angular/core';
import { RankingService } from '../../services/ranking.service';
import { Router, ActivatedRoute } from "@angular/router";
import { TechnicianService } from '../../services/technician.service';

@Component({
  selector: 'app-ranking-report',
  templateUrl: './ranking-report.component.html',
  styleUrls: ['./ranking-report.component.css']
})
export class RankingReportComponent implements OnInit {

  rank: any;
  employees: any;
  constructor(private rankingService:RankingService,   private appRoutes: Router,
    private route: ActivatedRoute, private technicianService:TechnicianService) { }

  ngOnInit() {
    this.technicianService.getTechnicians().subscribe(
      res=>{
        console.log(res);
        this.employees = res;
      },err=>
      console.log(err)
    )
  }

  getRank(id){
    this.rankingService.getRank(id).subscribe(
      res=>{
        this.rank = res;
        console.log(res);
      },err=>
      console.log(err)
    )
  }
}
