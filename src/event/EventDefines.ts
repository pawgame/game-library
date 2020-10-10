export type EventData = {
    type: string;
    data?: any;
};

export type EventHandler = (data?: EventData) => any;
