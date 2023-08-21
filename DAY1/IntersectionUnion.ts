import { removeDuplicatesWithSet } from "../DAY1/RemoveDuplicates";

type SetItem = (number | string)[];

function findIntersection(firstArray: SetItem, secondArray: SetItem): SetItem {
  let intersectionArray: SetItem = firstArray.filter((item) =>
    secondArray.includes(item)
  );

  return intersectionArray;
}

function findUnion(firstArray: SetItem, secondArray: SetItem): SetItem {
  let joinArray: SetItem = [...firstArray, ...secondArray];

  return [...new Set(joinArray)];
}

function main(): SetItem[] {
  let array1: SetItem = [1, 2, 3];
  let array2: SetItem = [4, 5, 6];

  array1 = removeDuplicatesWithSet(array1);
  array2 = removeDuplicatesWithSet(array2);

  return [findIntersection(array1, array2), findUnion(array1, array2)];
}

main();

console.log(main());
