import { IShapeLayer } from "./core"


export class Conv1d implements IShapeLayer {
    outChannels = 1;
    kernelSize = [1];
    stride = [1];
    padding = [0];
    dilation = [1];

    getShapeLabel(length: number, index: number): string {
        if (index == 0) return "Batch";
        if (index == 1) return "Channel";
        if (index == 2) return "X";

        return "";
    }

    forwardShape(shape: number[]): number[] | string {
        if (shape.length != 3) return "shapeLayer.invalids.invalidDimension";

        const [n_in, , w_in] = shape;
        const k = this.kernelSize;
        const p = this.padding;
        const d = this.dilation;
        const s = this.stride;
        const n_out = n_in;
        const c_out = this.outChannels;
        const w_out = Math.floor((w_in + 2 * p[0] - d[0] * (k[0] - 1) - 1) / s[0] + 1);

        if (w_out <= 0) return "shapeLayer.invalids.biggerKernelX";

        return [n_out, c_out, w_out];
    }

    clone(): Conv1d {
        return Object.assign(new Conv1d(), {
            outChannels: this.outChannels,
            kernelSize: this.kernelSize.slice(),
            stride: this.stride.slice(),
            padding: this.padding.slice(),
            dilation: this.dilation.slice(),
        });
    }
}


export class Conv2d implements IShapeLayer {
    outChannels = 1;
    kernelSize = [1, 1];
    stride = [1, 1];
    padding = [0, 0];
    dilation = [1, 1];

    getShapeLabel(length: number, index: number): string {
        if (index == 0) return "Batch";
        if (index == 1) return "Channel";
        if (index == 2) return "Y";
        if (index == 3) return "X";

        return "";
    }

    forwardShape(shape: number[]): number[] | string {
        if (shape.length != 4) return "shapeLayer.invalids.invalidDimension";

        const [n_in, , h_in, w_in] = shape;
        const k = this.kernelSize;
        const p = this.padding;
        const d = this.dilation;
        const s = this.stride;
        const n_out = n_in;
        const c_out = this.outChannels;
        const h_out = Math.floor((h_in + 2 * p[0] - d[0] * (k[0] - 1) - 1) / s[0] + 1);
        const w_out = Math.floor((w_in + 2 * p[1] - d[1] * (k[1] - 1) - 1) / s[1] + 1);

        if (h_out <= 0) return "shapeLayer.invalids.biggerKernelY";
        if (w_out <= 0) return "shapeLayer.invalids.biggerKernelX";

        return [n_out, c_out, h_out, w_out];
    }


    clone(): Conv2d {
        return Object.assign(new Conv2d(), {
            outChannels: this.outChannels,
            kernelSize: this.kernelSize.slice(),
            stride: this.stride.slice(),
            padding: this.padding.slice(),
            dilation: this.dilation.slice(),
        });
    }
}


export class Conv3d implements IShapeLayer {
    outChannels = 1;
    kernelSize = [1, 1, 1];
    stride = [1, 1, 1];
    padding = [0, 0, 0];
    dilation = [1, 1, 1];

    getShapeLabel(length: number, index: number): string {
        if (index == 0) return "Batch";
        if (index == 1) return "Channel";
        if (index == 2) return "Z";
        if (index == 3) return "Y";
        if (index == 4) return "X";

        return "";
    }

    forwardShape(shape: number[]): number[] | string {
        if (shape.length != 5) return "shapeLayer.invalids.invalidDimension";

        const [n_in, , d_in, h_in, w_in] = shape;
        const k = this.kernelSize;
        const p = this.padding;
        const d = this.dilation;
        const s = this.stride;
        const n_out = n_in;
        const c_out = this.outChannels;
        const d_out = Math.floor((d_in + 2 * p[0] - d[0] * (k[0] - 1) - 1) / s[0] + 1);
        const h_out = Math.floor((h_in + 2 * p[1] - d[1] * (k[1] - 1) - 1) / s[1] + 1);
        const w_out = Math.floor((w_in + 2 * p[2] - d[2] * (k[2] - 1) - 1) / s[2] + 1);

        if (d_out <= 0) return "shapeLayer.invalids.biggerKernelZ";
        if (h_out <= 0) return "shapeLayer.invalids.biggerKernelY";
        if (w_out <= 0) return "shapeLayer.invalids.biggerKernelX";

        return [n_out, c_out, d_out, h_out, w_out];
    }

    clone(): Conv3d {
        return Object.assign(new Conv3d(), {
            outChannels: this.outChannels,
            kernelSize: this.kernelSize.slice(),
            stride: this.stride.slice(),
            padding: this.padding.slice(),
            dilation: this.dilation.slice(),
        });
    }
}



export class ConvTranspose1d implements IShapeLayer {
    outChannels = 1;
    kernelSize = [1];
    stride = [1];
    padding = [0];
    outputPadding = [0];
    dilation = [1];

    getShapeLabel(length: number, index: number): string {
        if (index == 0) return "Batch";
        if (index == 1) return "Channel";
        if (index == 2) return "X";

        return "";
    }

    forwardShape(shape: number[]): number[] | string {
        if (shape.length != 3) return "shapeLayer.invalids.invalidDimension";

        const [n_in, , w_in] = shape;
        const k = this.kernelSize;
        const p = this.padding;
        const d = this.dilation;
        const s = this.stride;
        const o = this.outputPadding;
        const n_out = n_in;
        const c_out = this.outChannels;
        const w_out = (w_in - 1) * s[0] - 2 * p[0] + d[0] * (k[0] - 1) + o[0] + 1;

        return [n_out, c_out, w_out];
    }

    clone(): ConvTranspose1d {
        return Object.assign(new ConvTranspose1d(), {
            outChannels: this.outChannels,
            kernelSize: this.kernelSize.slice(),
            stride: this.stride.slice(),
            padding: this.padding.slice(),
            outputPadding: this.outputPadding.slice(),
            dilation: this.dilation.slice(),
        });
    }
}


export class ConvTranspose2d implements IShapeLayer {
    outChannels = 1;
    kernelSize = [1, 1];
    stride = [1, 1];
    padding = [0, 0];
    outputPadding = [0, 0];
    dilation = [1, 1];

    getShapeLabel(length: number, index: number): string {
        if (index == 0) return "Batch";
        if (index == 1) return "Channel";
        if (index == 2) return "Y";
        if (index == 3) return "X";

        return "";
    }

    forwardShape(shape: number[]): number[] | string {
        if (shape.length != 4) return "shapeLayer.invalids.invalidDimension";

        const [n_in, , h_in, w_in] = shape;
        const k = this.kernelSize;
        const p = this.padding;
        const d = this.dilation;
        const s = this.stride;
        const o = this.outputPadding;
        const n_out = n_in;
        const c_out = this.outChannels;
        const h_out = (h_in - 1) * s[0] - 2 * p[0] + d[0] * (k[0] - 1) + o[0] + 1;
        const w_out = (w_in - 1) * s[1] - 2 * p[1] + d[1] * (k[1] - 1) + o[1] + 1;

        return [n_out, c_out, h_out, w_out];
    }

    clone(): ConvTranspose2d {
        return Object.assign(new ConvTranspose2d(), {
            outChannels: this.outChannels,
            kernelSize: this.kernelSize.slice(),
            stride: this.stride.slice(),
            padding: this.padding.slice(),
            outputPadding: this.outputPadding.slice(),
            dilation: this.dilation.slice(),
        });
    }
}


export class ConvTranspose3d implements IShapeLayer {
    outChannels = 1;
    kernelSize = [1, 1, 1];
    stride = [1, 1, 1];
    padding = [0, 0, 0];
    outputPadding = [0, 0, 0];
    dilation = [1, 1, 1];

    getShapeLabel(length: number, index: number): string {
        if (index == 0) return "Batch";
        if (index == 1) return "Channel";
        if (index == 2) return "Z";
        if (index == 3) return "Y";
        if (index == 4) return "X";

        return "";
    }

    forwardShape(shape: number[]): number[] | string {
        if (shape.length != 5) return "shapeLayer.invalids.invalidDimension";

        const [n_in, , d_in, h_in, w_in] = shape;
        const k = this.kernelSize;
        const p = this.padding;
        const d = this.dilation;
        const s = this.stride;
        const o = this.outputPadding;
        const n_out = n_in;
        const c_out = this.outChannels;
        const d_out = (d_in - 1) * s[0] - 2 * p[0] + d[0] * (k[0] - 1) + o[0] + 1;
        const h_out = (h_in - 1) * s[1] - 2 * p[1] + d[1] * (k[1] - 1) + o[1] + 1;
        const w_out = (w_in - 1) * s[2] - 2 * p[2] + d[2] * (k[2] - 1) + o[2] + 1;

        return [n_out, c_out, d_out, h_out, w_out];
    }

    clone(): ConvTranspose3d {
        return Object.assign(new ConvTranspose3d(), {
            outChannels: this.outChannels,
            kernelSize: this.kernelSize.slice(),
            stride: this.stride.slice(),
            padding: this.padding.slice(),
            outputPadding: this.outputPadding.slice(),
            dilation: this.dilation.slice(),
        });
    }
}