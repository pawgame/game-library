const tempDate = new Date();

/**
 * 经过的天数
 * @param from 开始时间戳 秒
 * @param to 当前时间戳 秒
 * @return 如果是同一天则返回0，以此递增
 */
const getOverDays = (from: number, to: number) => {
    tempDate.setTime(from * 1000);
    tempDate.setHours(0, 0, 0, 0);
    const fromStamp = tempDate.getTime();

    tempDate.setTime(to * 1000);
    tempDate.setHours(0, 0, 0, 0);
    const toStamp = tempDate.getTime();
    return Math.round((toStamp - fromStamp) / (24 * 3600 * 1000));
};

export const DateUtils = {
    getOverDays,
};
