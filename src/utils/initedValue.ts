/**
 * cache and use inited value
 */
export const initedValue = <T>(valueBuilder: () => T, caller?: any) => {
    let isInit = false;
    let value: T;
    return () => {
        if (!isInit) {
            isInit = true;
            value = valueBuilder.call(caller);
        }
        return value;
    };
};
