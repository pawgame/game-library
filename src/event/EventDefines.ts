export type EventData = {
    type: string;
    data?: unknown;
};

export type EventHandler = (data?: EventData) => unknown;
