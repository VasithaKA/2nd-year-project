import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor(private http:HttpClient, private router:Router) { }

  getTechnicians(){
    return this.http.get(`http://localhost:5000/api/employees/employeetype/5c5b2b72f297792f7441bc3a`);
  }

  getTechnicianDetails(id){
    return this.http.get(`http://localhost:5000/api/employees/employeetype/5c5b2b72f297792f7441bc3a/`+id);
    
  }
}
