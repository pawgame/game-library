import { Method } from '../types';
import { Singleton } from '../utils/Singleton';

export interface IView {
    show: (data?: unknown) => unknown;
    hide: Method;
    isShow: boolean;
    bringTop?: (data?: unknown) => unknown;
}

const toggle = <T extends IView>(viewCls: { new (): T }, state = -1, data?: unknown) => {
    if (!viewCls) return null;
    if (state === 0 && !Singleton.get(viewCls)) return null;
    const viewInst = Singleton.get(viewCls);
    // 切换打开和关闭
    if (state === -1) {
        if (viewInst.isShow) {
            viewInst.hide();
        } else {
            viewInst.show(data);
        }
    } else if (state === 1) {
        // 打开
        if (viewInst.isShow) {
            viewInst.bringTop?.(data);
        } else {
            viewInst.show(data);
        }
    } else if (state === 0 && viewInst.isShow) {
        // 关闭
        viewInst.hide();
    }

    return viewInst;
};

const register = <T>(viewName: string, viewCls: { new (): T }) => {
    Singleton.registerInst(viewName, viewCls);
};

const toggleByName = <T extends IView>(viewName: string, state = -1, data?: unknown) => {
    if (!viewName) {
        return null;
    }
    const viewCls = Singleton.getRegistedInst(viewName) as { new (): T };
    if (!viewCls) return null;
    return toggle(viewCls, state, data);
};

export const View = {
    toggle,
    register,
    toggleByName,
};
