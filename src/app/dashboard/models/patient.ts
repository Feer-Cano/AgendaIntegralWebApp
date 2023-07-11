export class Patient {
    public id?: number;
    public firstName?: string;
    public lastName?: string;
    public birthSex?: number;
    public birthDate?: Date;
    public maritalStatus?: string;
    public medicalRecord?: string;
    public isActive?: number;

    constructor (
        options: {
            isActive: number
        }
    ) {
        this.isActive = options.isActive;
    }
}
