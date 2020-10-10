import { ObjectPool } from './ObjectPool';

export class Handler {
    static create(caller: any, method: Function, args?: any[], once = true) {
        return ObjectPool.get(Handler).setTo(caller, method, args, once);
    }

    private static __globalID = 0;

    private _id: number;
    private _method: Function;
    private _caller: any;
    private _args: any[];
    private _once: boolean;

    setTo(caller: any, method: Function, args?: any[], once = true) {
        this._id = ++Handler.__globalID;
        this._method = method;
        this._caller = caller;
        this._args = args;
        this._once = once;
        return this;
    }

    run() {
        this.runWith();
    }

    runWith(...appendArgs: any[]) {
        // eslint-disable-next-line no-nested-ternary
        const args = appendArgs
            ? (this._args ? this._args.concat(appendArgs) : appendArgs)
            : (this._args ? this._args.concat() : null);
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
    compare(caller: any, func: Function) {
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
