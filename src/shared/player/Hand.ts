import Object from "@rbxts/object-utils";

interface HandItem {
  [key: string]: number;
}

export default class Hand<T extends HandItem> {
  private items: T;

  constructor(initialItems: T) {
    this.items = initialItems;
  }

  merge(newHand: Partial<T>): T {
    return Object.assign(this.items, newHand);
  }

  update(key: keyof T, count: number): T {
    const newBalance = this.items[key] + count;
    if (newBalance < 0) {
      error(`${tostring(key)} underflow`);
    }
    this.items[key] = newBalance as T[keyof T];
    return this.items;
  }

  deduct(newHand: Partial<T>): T {
    const temp = { ...this.items };
    (Object.keys(newHand) as Array<keyof T>).forEach((key) => {
      if (newHand[key] !== undefined) {
        temp[key] = (temp[key] - newHand[key]!) as T[keyof T];
      }
    });
    return temp;
  }

  get(key: keyof T): number {
    return this.items[key];
  }

  has(req: Partial<T>): false | Partial<T> {
    const tempBalance = this.deduct(req);
    const negativeBalance = (Object.keys(tempBalance) as Array<keyof T>).some((key) => tempBalance[key] < 0);
    if (negativeBalance) return false;
    return tempBalance;
  }
}
