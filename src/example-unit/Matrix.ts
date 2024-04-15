export class Matrix {
    protected values: number[][];

    constructor(values: number[][]) {
        this.values = values;
    }

    getValue(row: number, col: number): number {
        return this.values[row][col];
    }

    multiply(matrix1: number[][], matrix2: number[][]): number[][] {
        const result: number[][] = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    result[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }
        }

        return result;
    }

}