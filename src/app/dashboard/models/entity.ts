export class Entity {

  public id?: number;
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
