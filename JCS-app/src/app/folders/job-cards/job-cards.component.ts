import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-cards',
  templateUrl: './job-cards.component.html',
  styleUrls: ['./job-cards.component.css']
})
export class JobCardsComponent implements OnInit {

  jobs:any;
  
  constructor(private jobService: JobService,
              private appRoutes: Router) { }

  ngOnInit() {
      this.jobService.getJobs()
      .subscribe(
        res => this.jobs = res,
        err => console.log(err)
      )
    }

}
