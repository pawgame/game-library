export const format = (str: string, args: any[] | Record<string, string>) => {
    if (!args || !str) return str;
    let reg: RegExp;
    if (Array.isArray(args)) {
        for (let i = 0; i < args.length; i++) {
            reg = new RegExp(`({)${i}(})`, 'g');
            str = str.replace(reg, args[i]);
        }
    } else {
        Object.entries(args).forEach(([key, value]) => {
            reg = new RegExp(`({${key}})`, 'g');
            str = str.replace(reg, value);
        })
    }
    return str;
};

export const StringUtils = {
    format,
}
