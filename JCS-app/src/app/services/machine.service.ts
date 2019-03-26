import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http:HttpClient, private router:Router) { }

  getMachines(){
    return this.http.get(`http://localhost:5000/api/machines/machines/machines`);
  }

  getMachineDetail(id){
    return this.http.get(`http://localhost:5000/api/machines/machines/machines/`+id);
  }
}
