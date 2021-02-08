const getorcreatePool = <T>(cls: { _$pool?: T[] }) => {
    if (!cls) return null;
    let pool: T[];
    if (Object.prototype.hasOwnProperty.call(cls, '_$pool')) {
        pool = cls._$pool;
    } else {
        pool = [];
        Object.defineProperty(cls, '_$pool', {
            value: pool,
        });
    }
    return pool;
};

const get = <T>(Cls: { new (): T } & { _$pool?: T[] }, params?: Record<string, unknown>): T => {
    const pool = getorcreatePool(Cls);
    const inst = pool.length ? pool.pop() : new Cls();
    if (params) {
        Object.keys(params).forEach((key) => {
            inst[key] = params[key];
        });
    }
    return inst;
};

const recycle = <T>(inst: T) => {
    const cls: { _$pool?: T[] } = inst.constructor as unknown;
    if (cls) {
        const pool = getorcreatePool(cls);
        if (pool) {
            pool.push(inst);
        }
    }
};

export const ObjectPool = {
    get,
    recycle,
};
