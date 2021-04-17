

/** ビート推定器のインターフェース */
export interface IBeatEstimator {
	/** BPSビンの個数 */
	readonly numOfBpsBins: number;
	/** リセット状態 */
	readonly isReset: boolean;
	/** 推定されたBPS */
	readonly estimatedBps: number;
	/** 推定された基準時刻 */
	readonly estimatedAnchorTimeInSeconds: number;

	/** 新しいビートを入力する */
	beat(now_time_in_seconds: number): void;

	/** 推定器の状態をリセットする（推定をやり直す） */
	reset(): void;
}
