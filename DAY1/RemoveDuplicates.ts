type InputArray = (number | string)[];
type OutputArray = (number | string)[];
type DynamicObject = {
  [key: string]: number | string;
};

var duplicatesArray: InputArray = [1, 0, 1, 0];
//avoid let and var and prefer const
function removeDuplicates(array: InputArray): OutputArray {
  var ArraysKeys: DynamicObject = {};
  for (let item of array) {
    ArraysKeys[item] = item;
  }

  let keysList: string[] = Object.keys(ArraysKeys);
  let uniqueArray = keysList.map((item) => ArraysKeys[item]);
  return uniqueArray;
}

export function removeDuplicatesWithSet(array: InputArray): OutputArray {
  return [...new Set(array)];
}
