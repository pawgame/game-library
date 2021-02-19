/**
 * 通知器 - 集成监听全局事件
 */
import { EventHandler } from '../event/EventDefines';
import { GFacade } from './GFacade';

export class Notifier {
    protected readonly _events: Record<string, EventHandler>;
    protected readonly _facade = GFacade.inst;

    constructor() {
        this._events = {};
        this.doReady();
        this._facade.addMultiListener(this, this._events);
    }

    protected doReady() {
        //
    }
}
