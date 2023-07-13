import { TypeEntity } from "./../interfaces/type-entity";

export class Tag {
  public id?: number;
  public typeEntityId?: TypeEntity;
  public name?: string;
  public isActive?: number;

  constructor (
    options: {
        isActive: number
    }
) {
    this.isActive = options.isActive;
}
}
