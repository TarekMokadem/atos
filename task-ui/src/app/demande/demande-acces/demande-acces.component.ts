import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Port } from 'src/app/models/demande/Port';
import { AccessDemande } from 'src/app/models/demande/AccessDemande';
import { AccessDetails } from 'src/app/models/demande/AccessDetails';
import { AccessVpn } from 'src/app/models/demande/AccessVpn';
import { UserService } from 'src/app/services/user.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { AccessDemandeService } from 'src/app/services/access-demande.service';

@Component({
  selector: 'app-demande-acces',
  templateUrl: './demande-acces.component.html',
  styleUrl: './demande-acces.component.scss'
})
export class DemandeAccesComponent implements OnInit {

  tmp: string = "";

  accessDemande : AccessDemande = {
    id:10,
    description:'',
    accessDetails: [],
  };
  accessDemandeService: AccessDemandeService = inject(AccessDemandeService);

  accessDetails : AccessDetails = {
    id:0,
    description:'',
    accessVpns: [],
    users:[]
  };

  newAccessVpn: AccessVpn = {
    id: 0,
    ip: '',
    description: '',
    ports: [],
    module: '',
    environment: ''
  };

  accessVpns: AccessVpn[] = [];
  checked = false;
  filterValue: string='';
  userService: UserService = inject(UserService);

  selectedUsers: User[]=[];
  selectedUserIds: number[] = [];
  userList: User[]=[];
  filteredUserList: User[] = [...this.userList] ;

  displayedColumns: string[] = ['name', 'login', 'deviceSerialNumber', 'actions'];
  displayedColumnsVpn: string[] = ['environment', 'module', 'ip', 'ports', 'delete'];

  constructor() {
    this.userList= this.userService.getAllUsers().slice();
  };

  ngOnInit(): void {
    this.filteredUserList = [...this.userList];
  };


  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    
    this.filteredUserList = this.userList.filter(user =>
      user.firstName.toLowerCase().includes(this.filterValue.toLowerCase()) || 
      user.lastName.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      user.deviceSerialNumber.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  };

  onCheckboxChange(user: User, event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedUsers.push(user);
      this.selectedUserIds.push(user.id);
    } else {
      this.selectedUsers = this.selectedUsers.filter(u => u.id !== user.id);
      this.selectedUserIds = this.selectedUserIds.filter(id => id !== user.id);
    }
  };
  
  
  addAccessVpn(): void {
    const portStrings = this.tmp.split(/[\r\n]/);
    const ports: Port[] = portStrings.map(portString => {
      const [description, numbers] = portString.split(':');
      const numberArray = numbers.split(',').map(number => number.trim());
      return { description: description.trim(), number: numberArray };
    });

    this.newAccessVpn.ports = ports;
    console.log(this.newAccessVpn);

    this.accessVpns.push(this.newAccessVpn);

    const currentModule = this.newAccessVpn.module;
    const currentEnvironment = this.newAccessVpn.environment;
  
    this.newAccessVpn = {
      id: this.accessVpns.length + 1,
      ip: '',
      description: '',
      ports: [],
      module: currentModule,
      environment: currentEnvironment
    };
    this.accessVpns = [...this.accessVpns]
    
  }
  //==============================
  addToDetails(): void {
    this.accessDetails.accessVpns.push(...this.accessVpns);
    this.accessVpns = [];
    this.accessDetails.users.push(...this.selectedUsers);
    console.log(this.accessDetails);
  }

  addToDemande(): void {
    this.accessDemande.accessDetails.push(this.accessDetails);
    this.accessDetails ={
      id:0,
      description:'',
      accessVpns: [],
      users:[]
    }
    console.log(this.accessDemande);
  }

  save(): void {
    this.accessDemandeService.createAccessDemande(this.accessDemande);
    this.accessDemande = {
      id:10,
      description:'',
      accessDetails: [],
    }
  }

  deleteVpn(vpn: AccessVpn): void {
    this.accessVpns = this.accessVpns.filter(item => item !== vpn);
  }
}
