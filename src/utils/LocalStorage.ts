import { ObjectUtils } from './ObjectUtils';

type StorageDB = {
    getItem: (key: string) => string;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
};

export class LocalStorage {
    static readonly defaultInst = new LocalStorage('$pawgame');

    private _data: any;
    readonly mainKey: string;
    private _db: StorageDB;

    constructor(mainKey: string, db?: StorageDB) {
        this.mainKey = mainKey;
        this._db = db || localStorage;
        this.initialize();
    }

    private initialize() {
        try {
            const strData = this._db.getItem(this.mainKey);
            this._data = strData ? JSON.parse(strData) : {};
        } catch (e) {
            this._data = {};
        }
    }

    /**
     * TODO ADD CallLater
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private invalidate(now?: boolean) {
        this._db.setItem(this.mainKey, JSON.stringify(this._data));
    }

    getBool(key: string) {
        return ObjectUtils.parseInt(this._data[key]) === 1;
    }

    setBool(key: string, v: boolean, now?: boolean) {
        const numV = v ? 1 : 0;
        if (numV === this._data[key]) return;
        this._data[key] = numV;
        this.invalidate(now);
    }

    getStr(key: string) {
        return this._data[key];
    }

    setStr(key: string, value: string, now?: boolean) {
        if (this._data[key] === value) return;
        this._data[key] = value;
        this.invalidate(now);
    }

    getNum(key: string) {
        return ObjectUtils.parseFloat(this._data[key]);
    }

    setNum(key: string, value: number, now?: boolean) {
        const formatValue = ObjectUtils.parseFloat(value);
        if (this._data[key] === formatValue) return;
        this._data[key] = formatValue;
        this.invalidate(now);
    }

    getObj(key: string) {
        return this._data[key];
    }

    setObj(key: string, obj: any, now?: boolean) {
        this._data[key] = obj;
        if (!obj) {
            delete this._data[key];
        }
        this.invalidate(now);
    }

    clearItem(key: string) {
        this._data[key] = null;
        delete this._data[key];
        this.invalidate();
    }

    clearAll() {
        this._data = {};
        this._db.removeItem(this.mainKey);
    }
}
