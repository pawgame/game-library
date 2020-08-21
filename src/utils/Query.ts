let _isInit = false;
const _dic: { [key: string]: string } = {};

const init = () => {
    if (_isInit) return;
    _isInit = true;

    if (!window['location']) return;
    let s = window.location.search;
    if (!s) return;
    s = s.split('?')[1];
    s = s.split('#')[0];

    const arr_s = s.split('&');
    let arr_item: string[];
    for (let item of arr_s) {
        if (!item) continue;
        arr_item = item.split('=');
        const key = arr_item[0];
        _dic[key] = arr_item.length > 1 ? arr_item[1] : key;
    }
}

const get = (key: string) => {
    !_isInit && init();
    return _dic[key];
}

const getDic = () => {
    !_isInit && init();
    return _dic;
}

/**浏览器地址参数管理 */
export const Query = {
    get: get,
    getDic: getDic
}
