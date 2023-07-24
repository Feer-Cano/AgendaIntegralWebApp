
export class Service {
    public id?: number;
    public name?: string;
    public description?: string;
    public isActive?: number;
    public costs?: string[];

    constructor (
        options: {
            isActive: number
        }
    ) {
        this.isActive = options.isActive;
    }
}
