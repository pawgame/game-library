/** 从数组中取随机项 */
const random = <T>(arr: T[]): T => {
    if (!arr || !arr.length) return null;
    return arr[Math.floor(Math.random() * arr.length)];
};

/** 对数组随机排序 */
const sortRandom = <T>(arr: T[]) => {
    if (!arr || !arr.length) return arr;
    arr.sort(() => (Math.random() > 0.5 ? -1 : 1));
    return arr;
};

const removeItems = <T>(list: T[], ...items: T[]) => {
    if (!items.length || !list.length) return;
    for (let i = 0, len = list.length; i < len; i++) {
        if (items.length > 0 && items.indexOf(list[i]) !== -1) {
            list.splice(i, 1);
            i -= 1;
            len -= 1;
        } else {
            break;
        }
    }
};

export const ArrayUtils = {
    random,
    sortRandom,
    removeItems,
};
