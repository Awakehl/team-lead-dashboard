export class ImportFilterDTO {
    public short: number;
    public long: number;

    constructor(short: number, long: number) {
        this.short = short;
        this.long = long;
    }
}