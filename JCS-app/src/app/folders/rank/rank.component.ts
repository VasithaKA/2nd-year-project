import { Component, OnInit, Input } from '@angular/core';
import { RankingService } from '../../services/ranking.service';
import { TechnicianService } from '../../services/technician.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
@Input() id : number;
@Input() lastName : String;
@Input() firstName : String;
  rank: any;
  technician: Object;
  constructor(private rankingService:RankingService, private technicianService:TechnicianService) { }

  ngOnInit() {
    this.getRank(this.id);
  }

  getRank(id){
    this.rankingService.getRank(id).subscribe(
      res=>{
        this.rank = res;
        console.log(res)
      },err=>console.log(err)
    )
  }

}
