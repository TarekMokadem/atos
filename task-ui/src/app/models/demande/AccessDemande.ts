import { AccessDetails } from "./AccessDetails";

export interface AccessDemande{
    id:number,
    description:string,
    accessDetails: AccessDetails[],
}