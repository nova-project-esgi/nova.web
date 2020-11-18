export class ArrayUtils {
  static closest(needle: number, array: number[]): number {
    return array.reduce((a, b) => {
      const aDiff = Math.abs(a - needle);
      const bDiff = Math.abs(b - needle);
      if (aDiff === bDiff) {
        return a > b ? a : b;
      } else {
        return bDiff < aDiff ? b : a;
      }
    });
  }

  static pushUniq<T>(dst: T[], predicate: (dstItem: T, item: T) => boolean, ...items: T[]): number {
    items = items.filter(
      (newItem) => !dst.some(
        (existingItem) => predicate(newItem, existingItem)
      ));
    return dst.push(...items);
  }

  static findAndRemove<T, U = T>(target: T[], predicate: (dstItem: T, item: U) => boolean, ...items: U[]): number {
    let deleteCnt = 0;
    items.forEach(item => {
      let idx = 0;
      while (idx >= 0) {
        idx = target.findIndex(t => predicate(t, item));
        if (idx >= 0) {
          target.splice(idx, 1);
          deleteCnt++;
        }
      }
    });
    return deleteCnt;
  }

  static groupBy<V, K>(items: V[], keyAccessor: (item: V) => K ): Map<K, V[]> {
    const map = new Map<K, V[]>();
    items.forEach(item => {
      const key = keyAccessor(item);
      if (!map.has(key)){
        map.set(key, [item]);
      } else {
        map.get(key).push(item);
      }
    });
    return map;
  }


}
