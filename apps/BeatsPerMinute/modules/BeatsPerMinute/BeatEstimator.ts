import { IBeatEstimator } from './IBeatEstimator';


/** ビート推定器の実装 */
export class BeatEstimator implements IBeatEstimator {
	/** BPS */
	#bpsBins : Float64Array;
	/** 最新のビート回転子の状態 */
	#beatSpinXs : Float64Array;
	/** 最新のビート回転子の状態 */
	#beatSpinYs : Float64Array;
	/** ローパスフィルタの係数（新しい値の反映のされにくさ） */
	#lowPassAlpha : number;
	/** リセット状態 */
	#isReset : boolean = true;
	/** 推定されたBPS */
	#estimatedBps : number = 0;
	/** 推定された基準時刻 */
	#estimatedAnchorTimeInSeconds : number = 0;

	constructor(
		beginBps : number,
		endBps : number,
		numOfBpsBins : number,
		endPoint : boolean = false,
		lowPassAlpha : number = 0.95
	) {
		this.#lowPassAlpha = lowPassAlpha;

		this.#bpsBins = new Float64Array(numOfBpsBins);
		let endIndex = endPoint ? (this.#bpsBins.length - 1) : this.#bpsBins.length;
		for (let index = 0; index < this.#bpsBins.length; index++) {
			const bps = ((endIndex - index) * beginBps + index * endBps) / endIndex;
			this.#bpsBins[index] = bps;
		}

		this.#beatSpinXs = new Float64Array(this.#bpsBins.length);
		this.#beatSpinYs = new Float64Array(this.#bpsBins.length);
	}

	get numOfBpsBins() {
		return this.#bpsBins.length;
	}

	get isReset() {
		return this.#isReset;
	}

	get estimatedBps() {
		return this.#estimatedBps;
	}

	get estimatedAnchorTimeInSeconds() {
		return this.#estimatedAnchorTimeInSeconds;
	}

	beat(now_time_in_seconds : number) {;
		const now_time_in_radians = 2 * Math.PI * now_time_in_seconds;

		if (this.#isReset) {
			this.#isReset = false;
			for (let index = 0; index < this.#bpsBins.length; index++) {
				const bps = this.#bpsBins[index];
				const now_time_in_n_radians = now_time_in_radians * bps;
				this.#beatSpinXs[index] = Math.cos(now_time_in_n_radians);
				this.#beatSpinYs[index] = Math.sin(now_time_in_n_radians);
			}
		} else {
			for (let index = 0; index < this.#bpsBins.length; index++) {
				const bps = this.#bpsBins[index];
				const now_time_in_n_radians = now_time_in_radians * bps;
				this.#beatSpinXs[index] = (
					this.#lowPassAlpha * this.#beatSpinXs[index]
					+ (1 - this.#lowPassAlpha) * Math.cos(now_time_in_n_radians)
				);
				this.#beatSpinYs[index] = (
					this.#lowPassAlpha * this.#beatSpinYs[index]
					+ (1 - this.#lowPassAlpha) * Math.sin(now_time_in_n_radians)
				);
			}
		}

		let bestScore = -Infinity;
		let bestBps = 0.0;
		let bestAnchorTimeInSeconds = 0.0;
		for (let index = 0; index < this.#bpsBins.length; index++) {
			const score = this.#beatSpinYs[index] ** 2 + this.#beatSpinXs[index] ** 2;
			if (bestScore < score) {
				const bps = this.#bpsBins[index];
				const time_in_n_radians = Math.atan2(this.#beatSpinYs[index], this.#beatSpinXs[index]);
				const time_in_seconds = time_in_n_radians / (2 * Math.PI * bps);

				bestScore = score;
				bestBps = bps;
				bestAnchorTimeInSeconds = time_in_seconds;
			}
		}

		this.#estimatedBps = bestBps;
		this.#estimatedAnchorTimeInSeconds = bestAnchorTimeInSeconds;
	}

	reset() {
		this.#isReset = true;
	}
}
