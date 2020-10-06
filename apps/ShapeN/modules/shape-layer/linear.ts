import { IShapeLayer } from "./core"


export class Linear implements IShapeLayer {
    outFeatures = 1;

    getShapeLabel(length: number, index: number): string {
        if (index == 0) return "Batch";
        if (index == length - 1) return "Feature";

        return "";
    }

    forwardShape(shape: number[]): string | number[] {
        const h_in = shape[shape.length - 1];
        return [...shape.slice(0, -1), this.outFeatures];
    }
}