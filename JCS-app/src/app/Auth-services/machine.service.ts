import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface registerResponse {
  success: boolean,
  message: string
}

interface machineDetails {
  details: any
}

interface machineIdIsUnique {
  unique: boolean
}

interface amachineDetails {
  details: any
}

interface updateDetails {
  success: boolean,
  message: string
}

interface machineBySupevisor {
  details: any
}

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private machineUrl = '/api/machines'

  constructor(private http: HttpClient) { }

  isUserIdUnique(machineId): Observable<machineIdIsUnique> {
    const url = `${this.machineUrl}/check/${machineId}`;
    return this.http.get<machineIdIsUnique>(url)
  }

  registerMachine(serialNumber, location, departmentId, supervisorId): Observable<registerResponse> {
    return this.http.post<registerResponse>(this.machineUrl, {
      serialNumber,
      location,
      departmentId,
      supervisorId
    })
  }

  getMachine(): Observable<machineDetails> {
    return this.http.get<machineDetails>(this.machineUrl)
  }

  getMachineDetails(_id): Observable<amachineDetails> {
    const url = `${this.machineUrl}/machine/${_id}`;
    return this.http.get<amachineDetails>(url)
  }

  updateMachine(_id, serialNumber, location, departmentId, supervisorId): Observable<updateDetails> {
    const url = `${this.machineUrl}/${_id}`;
    return this.http.patch<updateDetails>(url, {serialNumber, location, departmentId, supervisorId})
  }

  getMachineBySupevisor(_id): Observable<machineBySupevisor> {
    const url = `${this.machineUrl}/supervisor/${_id}`;
    return this.http.get<machineBySupevisor>(url)
  }

}