import { initedValue } from './initedValue';

const build = (): Record<string, string> => {
    if (!window || !window.location) return {};
    let s = window.location.search;
    if (!s) return {};
    s = s.split('?')[1];
    s = s.split('#')[0];
    const dic: Record<string, string> = {};

    const arrS = s.split('&');
    let arrItem: string[];
    arrS.forEach((item) => {
        if (!item) return;
        arrItem = item.split('=');
        const key = arrItem[0];
        dic[key] = arrItem.length > 1 ? arrItem[1] : key;
    });
    return dic;
};

const initedQueryValue = initedValue(build);

const get = (key: string) => {
    const dic = initedQueryValue.get();
    return dic[key];
};

/** 浏览器地址参数管理 */
export const Query = {
    get,
    getDic: initedQueryValue.get,
    reBuild: initedQueryValue.reBuild,
};
