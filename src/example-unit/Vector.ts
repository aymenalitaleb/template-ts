export class Vector {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    setX(x: number): void {
        this.x = x;
    }

    setY(y: number): void {
        this.y = y;
    }

    add(vector: Vector): Vector {
        return new Vector(this.x + vector.getX(), this.y + vector.getY());
    }

    subtract(vector: Vector): Vector {
        return new Vector(this.x - vector.getX(), this.y - vector.getY());
    }

    multiply(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }
 }