/**从数组中取随机项 */
const random = <T>(arr: T[]): T => {
    if (!arr || !arr.length) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}

/**对数组随机排序 */
const sortRandom = <T>(arr: T[]) => {
    if (!arr || !arr.length) return arr;
    arr.sort(() => {
        return Math.random() > 0.5 ? -1 : 1;
    })
    return arr;
}

export const ArrayUtils = {
    random,
    sortRandom,
};
