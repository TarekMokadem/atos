import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../environments/api-base-url';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = `${API_BASE_URL}/leaves`;

  constructor(private http: HttpClient) { }

  getLeaves(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getLeaveById(id:number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/"+id);
  }
  createLeave(formData:any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl,formData);
  }
  editLeave(leave:any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl,leave);
  }
  deleteLeave(id:number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl+"/"+id);
  }
}
