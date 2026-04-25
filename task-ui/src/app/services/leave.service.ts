import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = `${environment.apiUrl}/leaves`;

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
