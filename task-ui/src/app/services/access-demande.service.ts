import { Injectable } from '@angular/core';
import { AccessDemande } from '../models/demande/AccessDemande';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessDemandeService {

  AccessDemandes : AccessDemande[] = [
  ]



  private dataUrl = `${environment.apiUrl}/access-requests`; 

  constructor(private http: HttpClient) { 
    this.initializeAccessDemandes();
    //console.log(this.transformDataPost(this.test1));
  }

  ngOnInit() {
    this.initializeAccessDemandes();
  }

  getAllAccessDemands(): AccessDemande[] {
    this.initializeAccessDemandes();
    return this.AccessDemandes;
  }

  getAccessDemand(id:number): void{}

  createAccessDemande(accessDemande: AccessDemande): void {
    const transformedData = this.transformDataPost(this.test1);
    console.log('Posting data:', transformedData);
    this.http.post(this.dataUrl, transformedData).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Error creating access demande'));
      })
    ).subscribe();
  }


  transformDataGet(data: any): AccessDemande {
    return {
      id: data.id,
      description: data.description,
      accessDetails: data.accessDetails.map((detail: any) => ({
        id: detail.id,
        description: detail.description,
        accessVpns: detail.accessVpns.map((vpn: any) => ({
          id: vpn.id,
          ip: vpn.ip,
          description: vpn.description,
          module: vpn.module,
          environment: vpn.environment,
          ports: vpn.accessPorts.map((port: any) => ({
            number: port.number.split(','),
            description: port.description
          }))
        })),
        users: detail.users.map((user: any) => ({
          id: user.id,
          firstName: user.firstname ?? 'Unknown',  
          lastName: user.lastname ?? 'Unknown',    
          loginVpn: user.loginVpn ?? 'Unknown',    
          deviceSerialNumber: user.deviceNumber ?? 'Unknown',
        }))
      }))
    };
  }

  test1 : AccessDemande =     {
    "id": 1,
    "description": "TEST POST from client",
    "accessDetails": [
      {
        "id": 101,
        "description": "VPN access for dev environment",
        "accessVpns": [
          {
            "id": 1001,
            "ip": "192.168.0.1",
            "description": "Development VPN",
            "module": "DevModule",
            "environment": "Development",
            "ports": [
              {
                "number": ["8080", "8443"],
                "description": "Dev ports"
              }
            ]
          },
          {
            "id": 1002,
            "ip": "192.168.0.2",
            "description": "Staging VPN",
            "module": "StagingModule",
            "environment": "Staging",
            "ports": [
              {
                "number": ["8081", "8444"],
                "description": "Staging ports"
              },
              {
                "number": ["8080", "8443"],
                "description": "Dev ports"
              }
            ]
          }
        ],
        "users": [
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
          }
        ]
      },
      {
        "id": 102,
        "description": "VPN access for production environment",
        "accessVpns": [
          {
            "id": 1003,
            "ip": "192.168.0.3",
            "description": "Production VPN",
            "module": "ProdModule",
            "environment": "Production",
            "ports": [
              {
                "number": ["8082", "8445"],
                "description": "Prod ports"
              }
            ]
          }
        ],
        "users":[
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
          }
        ]
      }
    ]
  }
  

  transformDataPost(data: AccessDemande): any {
    return {
      description: data.description,
      accessDetails: data.accessDetails.map((detail: any) => ({
        description: detail.description,
        accessVpns: detail.accessVpns.map((vpn: any) => ({
          ip: vpn.ip,
          description: vpn.description,
          module: vpn.module,
          environment: vpn.environment,
          accessPorts: vpn.ports.map((port: any) => ({
            number: port.number.join(','),
            description: port.description
          }))
        })),
        users: detail.users.map((user: any) => ({
          id: user.id
        }))
      }))
    };
  }

  test : any = {
    "id": 28,
    "description": "Access request for the new project",
    "accessDetails": [
        {
            "id": 39,
            "description": "VPN access for dev environment",
            "users": [
                {
                    "id": 1,
                    "firstname": null,
                    "lastname": null,
                    "creationDate": null,
                    "email": null,
                    "password": null,
                    "role": null,
                    "loginVpn": "ssssss15",
                    "deviceNumber": "a123456789",
                    "username": null
                }
            ],
            "accessVpns": [
                {
                    "id": 28,
                    "ip": "192.168.0.1",
                    "description": "Development VPN",
                    "module": "DevModule",
                    "environment": "Development",
                    "accessPorts": [
                        {
                            "id": 7,
                            "number": "443,6465,65465,654",
                            "description": "https"
                        }
                    ]
                },
                {
                    "id": 29,
                    "ip": "192.168.0.2",
                    "description": "Staging VPN",
                    "module": "StagingModule",
                    "environment": "Staging",
                    "accessPorts": []
                }
            ]
        },
        {
            "id": 40,
            "description": "VPN access for production environment",
            "users": [
                {
                    "id": 2,
                    "firstname": null,
                    "lastname": null,
                    "creationDate": null,
                    "email": null,
                    "password": null,
                    "role": null,
                    "loginVpn": "ommmm",
                    "deviceNumber": "b159753258",
                    "username": null
                }
            ],
            "accessVpns": [
                {
                    "id": 30,
                    "ip": "192.168.0.3",
                    "description": "Production VPN",
                    "module": "ProdModule",
                    "environment": "Production",
                    "accessPorts": []
                }
            ]
        }
    ]
  }

  private initializeAccessDemandes(): void {
    this.http.get<any[]>(this.dataUrl).pipe(
      map(dataArray => {
        // Transform each item in the array
        return dataArray.map(data => this.transformDataGet(data));
      }),
      tap(transformedDataArray => {
        this.AccessDemandes = transformedDataArray;
      })
    ).subscribe(); // Subscribing here to initiate the request
  }
  

}
