import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../environments/api-base-url';

@Injectable({
  providedIn: 'root'
})
export class StatutService {
  private apiUrl = `${API_BASE_URL}/statut`;

  constructor(private http: HttpClient) { }

  getStatuts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getStatutById(id:number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/"+id);
  }
  createStatut(formData:any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl,formData);
  }
  editStatut(leave:any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl,leave);
  }
  deleteStatut(id:number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl+"/"+id);
  }
}
