import { Handler } from './Handler';

export class Signal<T> {
    private _handerList: Handler[];

    dispatch(data: T) {
        if (!this._handerList || !this._handerList.length) return;
        const all = this._handerList.concat();
        all.forEach((item) => {
            item.runWith(data);
        });
    }

    on(caller: unknown, handler: (data: T) => unknown, args?: unknown[], once?: boolean) {
        if (!this._handerList) {
            this._handerList = [Handler.create(caller, handler, args, once)];
        } else {
            const hasPre = this._handerList.some((item) => {
                return item.compare(caller, handler);
            });
            if (!hasPre) {
                this._handerList.push(Handler.create(caller, handler, args, once));
            }
        }
    }

    off(caller: unknown, handler: (data: T) => unknown) {
        for (let i = 0, len = this._handerList.length; i < len; i++) {
            const itemHandler = this._handerList[i];
            if (itemHandler.compare(caller, handler)) {
                itemHandler.recycle();
                this._handerList.splice(i, 1);
                break;
            }
        }
    }
}
