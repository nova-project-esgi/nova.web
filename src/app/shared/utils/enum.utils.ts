export class EnumUtils {

  public static convertEnumToItemList(enumeration: any, convertOrder = ConvertOrder.KEY): Item[] {
    enumeration = !enumeration ? [] : enumeration;
    if (!Array.isArray(enumeration)) {
      return this.convertObjEnum(enumeration, convertOrder);
    }
    return this.convertArrEnum(enumeration, convertOrder);
  }

  public static convertEnumToObj<T>(enumeration: any): { [p: string]: T[keyof T] } {
    const enumObj: { [p: string]: T[keyof T] } = {};
    this.convertEnumToItemList(enumeration).forEach(item => enumObj[item.key] = item.value);
    return enumObj;
  }

  private static convertArrEnum(enumeration: any[], convertOrder): Item[] {
    const itemList: Item[] = [];
    const halfSize = enumeration.length / 2;
    for (let i = 0; i < halfSize; i++) {
      if (convertOrder === ConvertOrder.KEY) {
        itemList.push({key: enumeration[i], value: enumeration[halfSize + i]});
      } else {
        itemList.push({value: enumeration[i], key: enumeration[halfSize + i]});
      }
    }
    return itemList;
  }

  private static convertObjEnum(enumeration: any, convertOrder): Item[] {
    const itemList: Item[] = [];
    const keys = Object.keys(enumeration).filter(k => isNaN(Number(k)));
    keys.forEach(k => {
      if (convertOrder === ConvertOrder.KEY) {
        itemList.push({key: k, value: enumeration[k]});
      } else {
        itemList.push({key: enumeration[k], value: k});
      }
    });
    return itemList;
  }

}

export enum ConvertOrder {
  KEY,
  VALUE
}

export interface Item {
  key: any;
  value: any;
}
