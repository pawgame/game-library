/**
 * 格式化浮点数
 */
const parseFloat = (v: any) => {
    return +v || 0;
}

/**
 * 格式化为整数
 */
const parseInt = (v: any) => {
    return ~~v;
}

export const ObjectUtils = {
    parseFloat,
    parseInt,
}
