import { Handler } from '../utils/Handler';
import { ObjectUtils } from '../utils/ObjectUtils';
import { Method } from '../utils/types';

/** 数值范围模型 */
export class Range {
    private _min = 0;
    private _max = 100;
    private _value = 0;

    private _changeHander: Handler;

    onChange(caller: unknown, handler: Method, args?: unknown[], once?: boolean) {
        if (!this._changeHander) {
            this._changeHander = Handler.create(caller, handler, args, once);
        } else {
            this._changeHander.setTo(caller, handler, args, once);
        }
    }

    protected doChange() {
        if (this._changeHander) {
            const hander = this._changeHander;
            if (hander.once) {
                this._changeHander = null;
            }
            hander.run();
        }
    }

    private correct() {
        this._value = Math.max(this._min, this._value);
        this._value = Math.min(this._max, this._value);
    }

    setData(v: number, min: number, max: number) {
        this._value = v;
        this._min = min < max ? min : max;
        this._max = min < max ? max : min;
        this.correct();
        this.doChange();
    }

    get min() {
        return this._min;
    }

    set min(v: number) {
        const fixedValue = ObjectUtils.toFloat(v);
        if (this._min === fixedValue) return;
        this._min = fixedValue;
        this.correct();
        this.doChange();
    }

    get max() {
        return this._max;
    }

    set max(v: number) {
        const fixedValue = ObjectUtils.toFloat(v);
        if (this._max === fixedValue) return;
        this._max = fixedValue;
        this.correct();
        this.doChange();
    }

    get value() {
        return this._value;
    }

    set value(v: number) {
        const fixedValue = ObjectUtils.toFloat(v);
        if (this._value === fixedValue) return;
        this._value = fixedValue;
        this.correct();
        this.doChange();
    }
}
