type ConvertFunc = (k: string) => string;
export type AnyJson =
  | boolean
  | number
  | string
  | null
  | undefined
  | JsonArray
  | JsonMap;
interface JsonMap {
  [key: string]: AnyJson;
}
type JsonArray = Array<AnyJson>;

// Handle nested json data with function 'camelizeStr' & 'snakifyStr'
function convertCase(convertFunc: ConvertFunc) {
  function converter(thing: AnyJson): AnyJson {
    // array
    if (Array.isArray(thing)) {
      return thing.map((i) => converter(i));
    }
    // object
    if (thing && typeof thing === "object") {
      const newObj: JsonMap = {};
      Object.keys(thing).forEach((k: string) => {
        newObj[convertFunc(k)] = converter(thing[k]);
      });
      return newObj;
    }
    return thing;
  }
  return converter;
}

// camelizeStr('item_quantity') // 'itemQuantity'
function camelizeStr(str: string): string {
  return str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());
}

// snakifyStr('itemQuantity') // 'item_quantity'
function snakifyStr(str: string): string {
  return str.replace(/(?:^|\.?)([A-Z])/g, (_, x) => `_${x.toLowerCase()}`);
}

// delay(1000)
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// addCommas(1000) // '1,000'
function addCommas(num: number): string {
  return num.toLocaleString();
}

export default {
  camelizeStr,
  snakifyStr,
  delay,
  camelizeKeys: convertCase(camelizeStr),
  snakifyKeys: convertCase(snakifyStr),
  addCommas,
};
