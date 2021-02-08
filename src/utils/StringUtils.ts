export const format = (str: string, args: string[] | Record<string, string>) => {
    if (!args || !str) return str;
    let reg: RegExp;
    let result = str;
    if (Array.isArray(args)) {
        args.forEach(([item, index]) => {
            reg = new RegExp(`({)${index}(})`, 'g');
            result = result.replace(reg, item);
        });
    } else {
        Object.entries(args).forEach(([key, value]) => {
            reg = new RegExp(`({${key}})`, 'g');
            result = result.replace(reg, value);
        });
    }
    return result;
};

export const StringUtils = {
    format,
};
