export type Method = (...args: any[]) => any;


declare global {
    interface Window {
        supportWebp: boolean;
    }
}
