export class UserDTO {
    public id: number;
    public name: string;
    public displayName: string;

    constructor(id: number, name: string, displayName: string) {
        this.id = id;
        this.name = name;
        this.displayName = displayName;
    }
}