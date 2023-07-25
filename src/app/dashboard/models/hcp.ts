import { TypeHCPTypes } from '../interfaces/type-HCPTypes';

export class Hcp {
  public id?: number;
  public hcpTypeId?: TypeHCPTypes;
  public firstName?: string;
  public lastName?: string;
  public birthSex?: number;
  public birthDate?: Date;
  public professionalLicense?: string;
  public type?: string;
  public hcpTypes?: TypeHCPTypes;


  public isActive?: number;

    constructor (
        options: {
            isActive: number
        }
    ) {
        this.isActive = options.isActive;
    }
}

