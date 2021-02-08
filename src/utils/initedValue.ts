/**
 * cache and use inited value
 */
export const initedValue = <T>(valueBuilder: () => T, caller?: unknown) => {
    let isInit = false;
    let value: T;

    const get = () => {
        if (!isInit) {
            isInit = true;
            value = valueBuilder.call(caller);
        }
        return value;
    };

    const reBuild = () => {
        isInit = true;
        value = valueBuilder.call(caller);
        return value;
    };

    return { get, reBuild };
};
