const isQQ = (str: string) => {
    // 1 首位不能是0  ^[1-9]
    // 2 必须是 [5, 11] 位的数字  \d{4, 9}
    const reg = /^[1-9][0-9]{4,9}$/gim;
    return reg.test(str);
};

// 检查字符串是否为合法手机号码
const isPhone = (str: string) => {
    const reg = /^(0|86|17951)?(13[0-9]|14[57]|15[012356789]|17[678]|18[0-9]|19[0-9])[0-9]{8}$/;
    return reg.test(str);
};

export const RegExpUtils = {
    isQQ,
    isPhone,
}
