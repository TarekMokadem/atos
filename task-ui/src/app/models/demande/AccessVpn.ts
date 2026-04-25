import { Port } from './Port';

export interface AccessVpn {
  id: number;
  ip: string;
  description: string;
  module: string;
  environment: string;
  ports: Port[];
}
