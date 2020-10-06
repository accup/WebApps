export interface IShapeLayer {
    getShapeLabel(length: number, index: number): string;

    forwardShape(shape: number[]): number[] | string;
}