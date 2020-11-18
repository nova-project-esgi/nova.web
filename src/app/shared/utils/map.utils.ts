import {KeyValue} from '@angular/common';

export class MapUtils{
  public static keyValueArray<K, V>(map: Map<K, V>): KeyValue<K, V>[]{
    const arr: KeyValue<K, V>[] = [];
    map?.forEach((value, key) => {
      arr.push({key, value});
    });
    return arr;
  }
}
