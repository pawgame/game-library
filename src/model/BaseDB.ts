export class BaseDB<T> {
    protected _all: T[];
    protected _dic: { [mainKey: string]: T };
    /** 主键 */
    protected _mainKey: string;

    constructor(rawData: unknown[], mainKey: string) {
        this._mainKey = mainKey || 'id';
        this.decode(rawData);
    }

    protected decode(rawData: unknown[]) {
        if (!rawData || !rawData.length) return;
        this._dic = {};
        this._all = [];

        rawData.forEach((item) => {
            const vo = this.createVo(item);
            this._all.push(vo);
            this._dic[vo[this._mainKey]] = vo;
        });
    }

    protected createVo(data: unknown): T {
        return data as T;
    }

    get(mainKey: number | string) {
        return this._dic ? this._dic[mainKey] : null;
    }

    getAll() {
        return this._all;
    }

    getDic() {
        return this._dic;
    }
}
