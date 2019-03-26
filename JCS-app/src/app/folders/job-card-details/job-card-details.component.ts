import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-card-details',
  templateUrl: './job-card-details.component.html',
  styleUrls: ['./job-card-details.component.css']
})
export class JobCardDetailsComponent implements OnInit {

  job={}

  constructor(private jobService: JobService,
              private appRoutes: Router,
              private route:ActivatedRoute
            ) { }

 ngOnInit() {
    this.jobService.getJobDetails(this.route.snapshot.params['id']) .subscribe(
      res =>{
        console.log(res),
        this.job= res
      }, 
     
      err => console.log(err)
    );

}
}