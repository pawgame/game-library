export const format = (str: string, args: any[] | Record<string, string>) => {
    if (!args || !str) return str;
    let reg: RegExp;
    let result = str;
    if (Array.isArray(args)) {
        for (let i = 0; i < args.length; i++) {
            reg = new RegExp(`({)${i}(})`, 'g');
            result = result.replace(reg, args[i]);
        }
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
