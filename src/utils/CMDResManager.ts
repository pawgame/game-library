import { Signal } from './Signal';

export interface CMDRes {
    cmd: number | string;
    code: number;
    data?: unknown;
}

/**
 * CMDRes风格的信号触发器
 */
export class CMDResManager {
    static readonly inst = new CMDResManager();

    private _cmdSignalDic: Record<number | string, Signal<CMDRes>>;
    constructor() {
        this._cmdSignalDic = {};
    }

    /** 注册 */
    reg(cmd: number | string, caller: unknown, handler: (res: CMDRes) => unknown) {
        let cmdSignal = this._cmdSignalDic[cmd];
        if (!cmdSignal) {
            cmdSignal = new Signal<CMDRes>();
            this._cmdSignalDic[cmd] = cmdSignal;
        }
        cmdSignal.on(caller, handler, null, false);
    }

    /** 取消注册 */
    unReg(cmd: number | string, caller: unknown, handler: (res: CMDRes) => unknown) {
        const cmdSignal = this._cmdSignalDic[cmd];
        if (!cmdSignal) return;
        cmdSignal.off(caller, handler);
    }

    /** 执行 */
    route(cmd: number | string, code: number, data?: unknown) {
        const cmdSignal = this._cmdSignalDic[cmd];
        if (!cmdSignal) return;
        cmdSignal.dispatch({ cmd, code, data });
    }
}
