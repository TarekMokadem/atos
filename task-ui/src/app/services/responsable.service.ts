import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../environments/api-base-url';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  private apiUrl = `${API_BASE_URL}/responsable`;

  constructor(private http: HttpClient) { }

  getResponsables(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getResponsableById(id:number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/"+id);
  }
  createResponsable(formData:any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl,formData);
  }
  editResponsable(leave:any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl,leave);
  }
  deleteRespnsable(id:number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl+"/"+id);
  }
}
