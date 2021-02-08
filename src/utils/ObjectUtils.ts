/**
 * 格式化浮点数
 */
const toFloat = (v: unknown) => +v || 0;

/**
 * 格式化为整数
 */
const toInt = (v: unknown) => ~~v;

/**
 * 格式化为无浮号整数
 */
const toUint = (v: unknown) => +v >>> 0;

/**
 * 格式化为字符串
 */
const toString = (v: unknown) => (v ?? '') as string;

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

const parseJSON = (v: unknown) => {
    const type = typeof v;
    if (type === 'object') return v;
    if (type !== 'string') return null;
    try {
        return JSON.parse(v as string);
    } catch (e) {
        return null;
    }
};

const twoPWR16DBL = 1 << 16;
const twoPWR32DBL = twoPWR16DBL * twoPWR16DBL;
/** 解析Long数据为number */
const parseLong = (long: { low: number; high?: number; unsigned?: boolean }) => {
    if (!long) return 0;
    if (typeof long === 'number') return long;
    if (long.unsigned) return (long.high >>> 0) * twoPWR32DBL + (long.low >>> 0);
    return long.high * twoPWR32DBL + (long.low >>> 0);
};

const isFunction = (func: unknown) => {
    return typeof func === 'function';
};

const isEmpty = (obj: unknown) => {
    if (!obj) return true;
    return Object.keys(obj).length === 0;
};

export const ObjectUtils = {
    toFloat,
    toInt,
    toUint,
    toFixed,
    toString,
    parseJSON,
    parseLong,
    isFunction,
    isEmpty,
};
