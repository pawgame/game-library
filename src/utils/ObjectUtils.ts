/**
 * 格式化浮点数
 */
const parseFloat = (v: any) => +v || 0;

/**
 * 格式化为整数
 */
const parseInt = (v: any) => ~~v;

/**
 * 与原生toFixed不同的是，如果是2.10则会变成2.1; 1.16是1.1而不是1.2
 */
const toFixed = (num: number, fractionDigits = 0) => {
    const dotIndex = `${num}`.indexOf('.');
    if (dotIndex === -1) {
        return num;
    }
    const fixedNum = `${num}`.substr(
        0,
        fractionDigits > 0 ? dotIndex + fractionDigits + 1 : dotIndex,
    );
    return parseFloat(fixedNum);
};

export const ObjectUtils = {
    parseFloat,
    parseInt,
    toFixed,
};
