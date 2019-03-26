import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface addFault {
  success: boolean,
  message: string
}

interface fault {
  details: any
}

interface faultDetails {
  faultDetails: any
}

interface updateFaultDetails {
  success: boolean
  message: string
}

interface deleteFault {
  success: boolean,
  message: string
}

interface faultNameUnique {
  unique: boolean
}

@Injectable({
  providedIn: 'root'
})
export class MachineFaultService {

  private faultUrl = '/api/faults'

  constructor(private http: HttpClient) { }

  addFault(faultName, faultDescription, faultCategoryId): Observable<addFault> {
    return this.http.post<addFault>(this.faultUrl, {
      faultName,
      faultDescription,
      faultCategoryId
    })
  }

  getFault(): Observable<fault> {
    return this.http.get<fault>(this.faultUrl)
  }

  getFaultDetails(_id): Observable<faultDetails> {
    const url = `${this.faultUrl}/${_id}`;
    return this.http.get<faultDetails>(url)
  }

  updateFault(_id, faultName, faultDescription, faultCategoryId): Observable<updateFaultDetails> {
    const url = `${this.faultUrl}/${_id}`;
    return this.http.patch<updateFaultDetails>(url, {
      faultName,
      faultDescription,
      faultCategoryId
    })
  }

  deleteFault(_id): Observable<deleteFault> {
    const url = `${this.faultUrl}/${_id}`;
    return this.http.delete<deleteFault>(url)
  }

  isFaultNameUnique(faultName): Observable<faultNameUnique> {
    const url = `${this.faultUrl}/check/${faultName}`;
    return this.http.get<faultNameUnique>(url)
  }

}
