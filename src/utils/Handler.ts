import { ObjectPool } from './ObjectPool';
import { Method } from './types';

export class Handler {
    static create(caller: unknown, method: Method, args?: unknown[], once = true) {
        return ObjectPool.get(Handler).setTo(caller, method, args, once);
    }

    private static _$globalID = 0;

    private _id: number;
    private _method: Method;
    private _caller: unknown;
    private _args: unknown[];
    private _once: boolean;

    setTo(caller: unknown, method: Method, args?: unknown[], once = true) {
        this._id = Handler._$globalID++;
        this._method = method;
        this._caller = caller;
        this._args = args;
        this._once = once;
        return this;
    }

    run() {
        this.runWith();
    }

    runWith(...appendArgs: unknown[]) {
        // eslint-disable-next-line no-nested-ternary
        const args = appendArgs
            ? this._args
                ? this._args.concat(appendArgs)
                : appendArgs
            : this._args
            ? this._args.concat()
            : null;
        this._method.apply(this._caller, args);
        if (this._once) {
            this.recycle();
        }
        if (args) {
            args.length = 0;
            args.length = 0;
        }
    }

    recycle() {
        if (this._id === 0) return;
        this._method = null;
        this._caller = null;
        this._args = null;
        this._id = 0;
        this._once = false;
        ObjectPool.recycle<Handler>(this);
    }

    /**
     * 比较两个Handler的函数体是否相同
     */
    compare(caller: unknown, func: Method) {
        return this._method === func && this._caller === caller;
    }

    get once() {
        return this._once;
    }

    get isRecycle() {
        return this._id === 0;
    }

    get caller() {
        return this._caller;
    }

    get method() {
        return this._method;
    }
}
