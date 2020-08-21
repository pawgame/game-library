import {EventHandler} from "./EventDefines";

export class EventDispatcher {
    private _eventDic: Record<string, EventHandler>[] = [];

    addListener(type: string, listener: EventHandler) {
        let all = this._eventDic[type];
        if (!all) {
            all = [listener];
            this._eventDic[type] = all;
        } else if (!all.includes(listener)) {
            all.push(listener);
        }
    }

    removeListener(type: string, listener: EventHandler) {
        const all = this._eventDic[type];
        if (!all || !all.length) return;
        const i = all.indexOf(listener);
        if (i === -1) return;
        all.splice(i, 1);
    }

    dispatch(type: string, data?: any) {
        const all = this._eventDic[type];
        if (!all || !all.length) return;
        const copyAll = all.concat();
        copyAll.forEach((item) => {
            item(data);
        });
        copyAll.length = 0;
    }
}
