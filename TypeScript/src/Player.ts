export class Player {
    private name: string;
    private place: number = 0;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    getPlace(): number {
        return this.place;
    }

    setPlace(newPlace: number) {
        this.place = newPlace;
    }
}
