/**
 * 通知器 - 集成监听全局事件
 */
import { EventHandler } from '../event/EventDefines';
import { coreEvent } from '../event/CoreEvent';

export class Notifier {
    protected readonly _events: Record<string, EventHandler>;

    constructor() {
        this._events = {};
        this.doReady();
        coreEvent.addMultiListener(this, this._events);
    }

    protected doReady() {
        //
    }
}
