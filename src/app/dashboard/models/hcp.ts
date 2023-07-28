
export class Hcp {
  public id?: number;
  public hcpTypeId?: number;
  public firstName?: string;
  public lastName?: string;
  public birthSex?: number;
  public birthDate?: Date;
  public professionalLicense?: string;
  public type?: string;
  public hcpType?: any;


  public isActive?: number;

    constructor (
        options: {
            isActive: number
        }
    ) {
        this.isActive = options.isActive;
    }
}

