import { EventData, EventHandler } from './EventDefines';
import { Handler } from '../utils/Handler';

export class EventDispatcher {
    private readonly _eventDic: Record<string, Handler[]>;

    constructor() {
        this._eventDic = {};
    }

    addListener(type: string, caller: any, listener: EventHandler) {
        if (!type || listener == null) return;
        const all: Handler[] = this._eventDic[type];
        if (!all) {
            this._eventDic[type] = [Handler.create(caller, listener, null, false)];
            return;
        }
        const alreadyHas = all.some((item) => item.compare(caller, listener));
        if (!alreadyHas) {
            all.push(Handler.create(caller, listener, null, false));
        }
    }

    addMultiListener(caller: any, interests: Record<string, EventHandler>) {
        if (!interests) return;
        Object.entries(interests).forEach(([type, listener]) => {
            if (!type || !listener) return;
            this.addListener(type, caller, listener);
        });
    }

    removeListener(type: string, caller: any, listener: EventHandler) {
        if (!type || listener == null) return;
        const all = this._eventDic[type];
        if (!all || !all.length) return;
        all.some((item, index) => {
            if (item.compare(caller, listener)) {
                all.splice(index, 1);
                if (all.length === 0) {
                    this._eventDic[type] = null;
                    delete this._eventDic[type];
                }
                return true;
            }
            return false;
        });
    }

    removeMultiListener(caller: any, interests: Record<string, EventHandler>) {
        if (!interests) return;
        Object.entries(interests).forEach(([type, listener]) => {
            if (!type || !listener) return;
            this.removeListener(type, caller, listener);
        });
    }

    dispatch(event: EventData) {
        if (!event) return;
        let all = this._eventDic[event.type];
        if (!all || !all.length) return;
        all = all.concat();
        while (all.length) {
            all.shift().runWith(event);
        }
        all.length = 0;
        all = null;
    }
}
