/**
 * 格式化浮点数
 */
const parseFloat = (v: any) => {
    return +v || 0;
}

const parseInt = (v: any) => {
    return ~~v;
}

export const Object = {
    parseFloat,
    parseInt,
}
