import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface faultCategory {
  details: any
}

interface addFaultCategory {
  success: boolean,
  message: string
}

interface faultCategoryDetails {
  faultCategoryDetails: any
}

interface faultCategoryNameUnique {
  unique: boolean
}

interface updateFaultCategoryName {
  success: boolean,
  message: string
}

interface deleteFaultCategory {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class MachineFaultCategoryService {

  private faultCategoryUrl = '/api/faultCategories'

  constructor(private http: HttpClient) { }

  addFaultCategory(faultCategoryName): Observable<addFaultCategory> {
    return this.http.post<addFaultCategory>(this.faultCategoryUrl, { faultCategoryName })
  }

  getFaultCategory(): Observable<faultCategory> {
    return this.http.get<faultCategory>(this.faultCategoryUrl)
  }

  getFaultCategoryDetails(_id): Observable<faultCategoryDetails> {
    const url = `${this.faultCategoryUrl}/${_id}`;
    return this.http.get<faultCategoryDetails>(url)
  }

  updateFaultCategory(_id,faultCategoryName): Observable<updateFaultCategoryName> {
    const url = `${this.faultCategoryUrl}/${_id}`;
    return this.http.patch<updateFaultCategoryName>(url, {
      faultCategoryName
    })
  }

  deleteFaultCategory(_id): Observable<deleteFaultCategory> {
    const url = `${this.faultCategoryUrl}/${_id}`;
    return this.http.delete<deleteFaultCategory>(url)
  }

  isFaultCategoryNameUnique(faultCategoryName): Observable<faultCategoryNameUnique> {
    const url = `${this.faultCategoryUrl}/check/${faultCategoryName}`;
    return this.http.get<faultCategoryNameUnique>(url)
  }

}
