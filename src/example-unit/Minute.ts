export class Minute {
    private value: number;

    constructor(value: number) {
        this.value = value % 60;
    }

    increment() {
        this.value = (this.value + 1) % 60;
    }

    getValue(): number {
        return this.value;
    }
}