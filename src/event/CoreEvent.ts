import { EventData } from './EventDefines';
import { EventDispatcher } from './EventDispatcher';

const innerEventDispatcher = new EventDispatcher();
const eventCache: EventData[] = [];
export const dispatch = (type: string, data?: unknown) => {
    let evt: EventData;
    if (eventCache.length) {
        evt = eventCache.pop();
        evt.type = type;
        evt.data = data;
    } else {
        evt = {
            type,
            data,
        };
    }
    innerEventDispatcher.dispatch(evt);
    eventCache.push(evt);
};
export const coreEvent = innerEventDispatcher;
