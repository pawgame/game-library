import { EventData, EventHandler } from '../event/EventDefines';
import { EventDispatcher } from '../event/EventDispatcher';

/** 游戏的全局代理类 */
export class GFacade {
    static readonly inst = new GFacade();

    private _innerEventDispatcher: EventDispatcher;
    private _eventCache: EventData[];

    constructor() {
        this.initEvent();
    }

    /// /////////////////////////////////////// Event
    private initEvent() {
        this._innerEventDispatcher = new EventDispatcher();
        this._eventCache = [];
    }

    dispatch<T>(type: string, data?: T) {
        let evt: EventData;
        if (this._eventCache.length) {
            evt = this._eventCache.pop();
            evt.type = type;
            evt.data = data;
        } else {
            evt = {
                type,
                data,
            };
        }
        this._innerEventDispatcher.dispatch(evt);
        this._eventCache.push(evt);
    }

    addListener(type: string, caller: unknown, listener: EventHandler) {
        this._innerEventDispatcher.addListener(type, caller, listener);
    }

    addMultiListener(caller: unknown, interests: Record<string, EventHandler>) {
        this._innerEventDispatcher.addMultiListener(caller, interests);
    }

    removeListener(type: string, caller: unknown, listener: EventHandler) {
        this._innerEventDispatcher.removeListener(type, caller, listener);
    }

    removeMultiListener(caller: unknown, interests: Record<string, EventHandler>) {
        this._innerEventDispatcher.removeMultiListener(caller, interests);
    }

    dispatchEvent(event: EventData) {
        this._innerEventDispatcher.dispatch(event);
    }
}
