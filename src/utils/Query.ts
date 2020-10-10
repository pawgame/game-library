let isInit = false;
const dic: { [key: string]: string } = {};

const init = () => {
    if (isInit) return;
    isInit = true;

    if (!window.location) return;
    let s = window.location.search;
    if (!s) return;
    s = s.split('?')[1];
    s = s.split('#')[0];

    const arrS = s.split('&');
    let arrItem: string[];
    arrS.forEach((item) => {
        if (!item) return;
        arrItem = item.split('=');
        const key = arrItem[0];
        dic[key] = arrItem.length > 1 ? arrItem[1] : key;
    });
};

const get = (key: string) => {
    if (!isInit) {
        init();
    }
    return dic[key];
};

const getDic = () => {
    if (!isInit) {
        init();
    }
    return dic;
};

/** 浏览器地址参数管理 */
export const Query = {
    get,
    getDic,
};
