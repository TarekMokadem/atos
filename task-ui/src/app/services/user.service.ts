import { Injectable } from '@angular/core';
import { User } from '../models/User';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { API_BASE_URL } from '../../environments/api-base-url';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      login: 'johndoe',
      deviceSerialNumber: 'SN12345678',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      login: 'janesmith',
      deviceSerialNumber: 'SN87654321',
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      login: 'alicej',
      deviceSerialNumber: 'SN11223344',
    },
    {
      id: 4,
      firstName: 'Bob',
      lastName: 'Brown',
      login: 'bobbrown',
      deviceSerialNumber: 'SN44556677',
    },
    {
      id: 5,
      firstName: 'Carol',
      lastName: 'White',
      login: 'carolw',
      deviceSerialNumber: 'SN99887766',
    },
    {
      id: 6,
      firstName: 'David',
      lastName: 'Black',
      login: 'davidb',
      deviceSerialNumber: 'SN55443322',
    },
    {
      id: 7,
      firstName: 'Eve',
      lastName: 'Green',
      login: 'eveg',
      deviceSerialNumber: 'SN77665544',
    },
    {
      id: 8,
      firstName: 'Frank',
      lastName: 'Blue',
      login: 'frankb',
      deviceSerialNumber: 'SN22334455',
    },
    {
      id: 9,
      firstName: 'Grace',
      lastName: 'Yellow',
      login: 'gracey',
      deviceSerialNumber: 'SN11224433',
    },
    {
      id: 10,
      firstName: 'Hank',
      lastName: 'Purple',
      login: 'hankp',
      deviceSerialNumber: 'SN33445566',
    },
    {
      id: 11,
      firstName: 'Ivy',
      lastName: 'Orange',
      login: 'ivyo',
      deviceSerialNumber: 'SN66778899',
    },
    {
      id: 12,
      firstName: 'Jack',
      lastName: 'Grey',
      login: 'jackg',
      deviceSerialNumber: 'SN88990011',
    },
    {
      id: 13,
      firstName: 'Kathy',
      lastName: 'Red',
      login: 'kathyr',
      deviceSerialNumber: 'SN77889900',
    },
    {
      id: 14,
      firstName: 'Larry',
      lastName: 'Silver',
      login: 'larrys',
      deviceSerialNumber: 'SN55667788',
    },
    {
      id: 15,
      firstName: 'Mona',
      lastName: 'Gold',
      login: 'monag',
      deviceSerialNumber: 'SN66770011',
    },
    {
      id: 16,
      firstName: 'Nick',
      lastName: 'Bronze',
      login: 'nickb',
      deviceSerialNumber: 'SN22337788',
    },
    {
      id: 17,
      firstName: 'Olivia',
      lastName: 'Pink',
      login: 'oliviap',
      deviceSerialNumber: 'SN33441122',
    },
    {
      id: 18,
      firstName: 'Paul',
      lastName: 'Violet',
      login: 'paulv',
      deviceSerialNumber: 'SN44556600',
    },
    {
      id: 19,
      firstName: 'Quinn',
      lastName: 'Cyan',
      login: 'quinnc',
      deviceSerialNumber: 'SN55668899',
    },
    {
      id: 20,
      firstName: 'Rita',
      lastName: 'Magenta',
      login: 'ritam',
      deviceSerialNumber: 'SN66778800',
    },
  ];

  getAllUsers(): User[] {
    return this.users;
  }


  private apiUrl = `${API_BASE_URL}/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getUserById(id:number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/"+id);
  }
  getAuthenticatedUser(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/authenticated");
  }
  createUser(formData:any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl,formData);
  }
  editUser(task:any): Observable<any[]> {
    return this.http.put<any[]>(this.apiUrl,task);
  }
  deleteUser(id:number): Observable<any[]> {
    return this.http.delete<any[]>(this.apiUrl+"/"+id);
  }
}
