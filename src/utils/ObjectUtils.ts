/**
 * 格式化浮点数
 */
const parseFloat = (v: any) => +v || 0;

/**
 * 格式化为整数
 */
const parseInt = (v: any) => ~~v;

/**
 * 与原生toFixed不同的是，如果是2.10则会变成2.1
 */
const toFixed = (num: number, fractionDigits?: number) => parseFloat(num.toFixed(fractionDigits));

export const ObjectUtils = {
    parseFloat,
    parseInt,
    toFixed,
};
