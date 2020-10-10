const getorcreatePool = <T>(cls: { __pool?: T[] }) => {
    if (!cls) return null;
    let pool: T[];
    if (Object.prototype.hasOwnProperty.call(cls, '__pool')) {
        pool = cls.__pool;
    } else {
        pool = [];
        Object.defineProperty(cls, '__pool', {
            value: pool,
        });
    }
    return pool;
};

const get = <T>(Cls: { new(): T } & { __pool?: T[] }, params?: Record<string, any>): T => {
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
    const cls: { __pool?: T[] } = inst.constructor as any;
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
