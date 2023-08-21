type DynamicObject = {
  [key: string]: number;
};

type InnerArray = (string | number)[];

let objectMap: DynamicObject = {
  D: 1,
  B: 2,
  C: 3,
};
function mappingKeystoArray(objectMap: DynamicObject): InnerArray[] {
  let mapped2DArray: InnerArray[] = [];
  for (let key in objectMap) {
    mapped2DArray.push([key, objectMap[key]]);
  }
  return mapped2DArray;
}

console.log(mappingKeystoArray(objectMap));
