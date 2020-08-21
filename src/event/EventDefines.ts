export type Event = {
    type: string;
    data: any;
}

export type EventHandler = (event?: Event) => any;
