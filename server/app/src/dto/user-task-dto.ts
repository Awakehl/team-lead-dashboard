export class UserTaskDTO {
    public key: string;
    public userId: number;

    constructor(key: string, userId: number) {
        this.key = key;
        this.userId = userId;
    }
}