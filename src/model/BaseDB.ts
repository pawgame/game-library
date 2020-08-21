export class BaseDB<T> {
    protected _all: T[];
    protected _dic: { [mainKey: string]: T };
    /** 主键 */
    protected _mainKey: string;

    constructor(rawData: any[], mainKey: string) {
        this._mainKey = mainKey || 'id';
        this.decode(rawData);
    }

    protected decode(data: T[]) {
        if (!data || !data.length) return;
        this._dic = {};
        this._all = [];

        const len = data.length;
        for (let i = 0; i < len; i++) {
            const vo: T = this.createVo(data[i]);
            this._all.push(vo);
            this._dic[vo[this._mainKey]] = vo;
        }
    }

    protected createVo(data: any): T {
        return data;
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
