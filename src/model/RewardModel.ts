export type RewardVo = {
    type?: number | string;
    itemID: number | string;
    count: number;
};

/**
 * 解析奖励配置字段
 * @param strRewards 奖励描述文本，如 '10001:1;10002:10'
 * @param itemSplitSymbol 区分道具的间隔字符
 * @param keyvalueSplitSymbol 描述道具数量属性的间隔字符
 */
export const decodeReward = (strRewards: string, itemSplitSymbol = ';', keyvalueSplitSymbol = ':') => {
    if (typeof strRewards !== 'string') {
        return [];
    }
    const result: RewardVo[] = [];
    const arr = strRewards.split(itemSplitSymbol);
    arr.forEach((item) => {
        if (!item) return;
        const arrItem = item.split(keyvalueSplitSymbol);
        if (arrItem.length < 2) return;
        result.push({ itemID: arrItem[0], count: ~~arrItem[1] });
    });
    return result;
};
