
export class User {

  public id?: number;
  public firstName?: string;
  public lastName?: string;
  public birthSex?: number;
  public birthDate?: Date;
  public mobilePhone?: string;
  public email?: string;
  public password?: string;
  public token?: string;
  public isActive?: number;
  public contacts?: any;


    constructor (
        options: {
            isActive: number
        }
    ) {
        this.isActive = options.isActive;
    }
}

