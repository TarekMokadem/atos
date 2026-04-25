import { AccessVpn } from "./AccessVpn";
import { User } from "../User";

export interface AccessDetails{
    id:number,
    description:string,
    accessVpns: AccessVpn[],
    users:User[]
}