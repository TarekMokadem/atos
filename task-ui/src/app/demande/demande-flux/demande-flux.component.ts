import { Component } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

export interface destinationVpn {
  id: number,
  ip: string,
  description: string,
  ports: number[],
  identification: string,
}

@Component({
  selector: 'app-demande-flux',
  templateUrl: './demande-flux.component.html',
  styleUrl: './demande-flux.component.scss'
})



export class DemandeFluxComponent {

  ips: string[] = [];
  separatorKeysCodes = [ENTER, COMMA];
  addOnBlur = true;

  newDestinationVpn: destinationVpn = {
    id: 0,
    ip: '',
    description: '',
    ports: [],
    identification: ''
  };
  destinationVpns: destinationVpn[] = [];
  displayedColumnsVpn: string[] = ['ip', 'identification','ports'];

  
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.ips.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(ip: any): void {
    const index = this.ips.indexOf(ip);
    if (index >= 0) {
      this.ips.splice(index, 1);
    }
  }

  edit(ip: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(ip);
      return;
    }

    const index = this.ips.indexOf(ip);
    if (index >= 0) {
      this.ips[index] = value;
    }
  }

  addAccessVpn(): void {
    this.newDestinationVpn.ports = this.newDestinationVpn.ports.toString().split(/[\s,]+/).map(Number);

    this.destinationVpns.push(this.newDestinationVpn);

    const currentidentification = this.newDestinationVpn.identification;
  
    this.newDestinationVpn = {
      id: this.destinationVpns.length + 1,
      ip: '',
      description: '',
      ports: [],
      identification: currentidentification,
    };
    this.destinationVpns = [...this.destinationVpns]
    console.log(this.destinationVpns);
    
  }
}
