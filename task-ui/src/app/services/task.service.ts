import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../environments/api-base-url';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${API_BASE_URL}/tasks`;

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getTaskById(id:number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/"+id);
  }
  createTask(formData:any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl,formData);
  }
  editTask(task:any): Observable<any[]> {
    return this.http.put<any[]>(this.apiUrl,task);
  }
  deleteTask(id:number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl+"/"+id);
  }
}
