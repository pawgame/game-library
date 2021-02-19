// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Method = (...args: any[]) => any;

declare global {
    interface Window {
        supportWebp: boolean;
    }
}
