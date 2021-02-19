/* eslint-disable no-param-reassign */
export interface ChainNode<T> {
    pre: ChainNode<T>;
    next: ChainNode<T>;
    data: T;
}

/** 单项链表 */
export class Chain<T> {
    private static _cache: ChainNode<unknown>[] = [];

    private _first: ChainNode<T>;
    private _last: ChainNode<T>;

    private _count = 0;

    private createNode(data: T): ChainNode<T> {
        if (!Chain._cache.length) {
            return { pre: null, next: null, data };
        }
        const node = Chain._cache.pop();
        node.data = data;
        node.pre = null;
        node.next = null;
        return node as ChainNode<T>;
    }

    removeNode(node: ChainNode<T>) {
        if (!node) return;
        if (node.pre) {
            node.pre.next = node.next;
        }
        if (node.next) {
            node.next.pre = node.pre;
        }
        node.pre = null;
        node.next = null;
        node.data = null;
        Chain._cache.push(node);
    }

    removeData(data: T) {
        let inst = this._first;
        while (inst) {
            if (inst.data === data) {
                this.removeNode(inst);
                break;
            }
            inst = inst.next;
        }
    }

    /** 将数据添加到链表起始位置，并返回链表长度 */
    unshift(data: T) {
        if (!this._first) {
            return this.push(data);
        }

        const newNode = this.createNode(data);
        this._first.pre = newNode;
        newNode.next = this._first;

        this._first = newNode;
        this._count++;
        return this._count;
    }

    /** 链表尾部追加数据，并返回链表长度 */
    push(data: T) {
        const newNode = this.createNode(data);
        if (!this._last) {
            this._first = newNode;
            this._last = newNode;
        } else {
            this._last.next = newNode;
            newNode.pre = this._last;

            this._last = newNode;
        }
        this._count++;
        return this._count;
    }

    /** 从链表首位删除并返回该数据 */
    shift() {
        if (!this._first) return null;
        const { data } = this._first;
        const newFirst = this._first.next;
        this.removeNode(this._first);

        this._first = newFirst;
        if (!newFirst) {
            this._last = null;
        }
        this._count--;
        return data;
    }

    /** 从链表尾部删除并返回数据 */
    pop() {
        if (!this._last) return null;
        const { data } = this._last;
        const newLast = this._last.pre;
        this.removeNode(this._last);

        this._last = newLast;
        if (!newLast) {
            this._first = null;
        }
        this._count--;
        return data;
    }

    /** 首位数据 */
    get first() {
        return this._first ? this._first.data : null;
    }

    /** 末尾数据 */
    get last() {
        return this._last ? this._last.data : null;
    }

    /** 链表长度 */
    get count() {
        return this._count;
    }

    some(handler: (item: T) => boolean): boolean {
        let inst = this._first;
        if (!inst) return false;
        let has = handler(inst.data);
        inst = inst.next;
        while (inst && !has) {
            inst = inst.next;
            has = handler(inst.data);
        }
        return has;
    }

    forEachNode(handler: (item: ChainNode<T>) => unknown) {
        let inst = this._first;
        while (inst) {
            handler(inst);
            inst = inst.next;
        }
    }

    forEach(handler: (item: T) => unknown) {
        let inst = this._first;
        while (inst) {
            handler(inst.data);
            inst = inst.next;
        }
    }
}
