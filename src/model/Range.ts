import { Handler } from '../utils/Handler';
import { ObjectUtils } from '../utils/ObjectUtils';

/** 数值范围模型 */
export class Range {
    private _min = 0;
    private _max = 100;
    private _value = 0;

    private _changeHander: Handler;

    onChange(caller: any, handler: Function, args?: any[], once?: boolean) {
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
        v = ObjectUtils.parseFloat(v);
        if (this._min === v) return;
        this._min = v;
        this.correct();
        this.doChange();
    }

    get max() {
        return this._max;
    }

    set max(v: number) {
        v = ObjectUtils.parseFloat(v);
        if (this._max === v) return;
        this._max = v;
        this.correct();
        this.doChange();
    }

    get value() {
        return this._value;
    }

    set value(v: number) {
        v = ObjectUtils.parseFloat(v);
        if (this._value === v) return;
        this._value = v;
        this.correct();
        this.doChange();
    }
}
