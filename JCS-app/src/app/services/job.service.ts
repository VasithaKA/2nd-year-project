import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http:HttpClient, private router:Router) { }
  
  getJobs(){
    return this.http.get(`http://localhost:5000/api/jobs/jobs/list`);
  }

  getJobDetails(id){
    return this.http.get(`http://localhost:5000/api/jobs/jobs/`+id);
  }
}
