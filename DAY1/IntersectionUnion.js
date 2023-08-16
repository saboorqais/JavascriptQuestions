

const { removeDuplicatesWithSet } =require("./RemoveDuplicates")

function findIntersection(firstArray,secondArray){


let intersectionArray = firstArray.filter(item => secondArray.includes(item))


return intersectionArray
}

function findUnion(firstArray,secondArray){

let joinArray = [...firstArray,...secondArray]

return [...new Set(joinArray)]

}



function main(){

let array1= [1,1,1,1,1]
let array2 = [1,3,"john",1,1,1,1,1,1,1,1,31]


array1 = removeDuplicatesWithSet(array1)
array2 = removeDuplicatesWithSet(array2)


return [findIntersection(array1,array2),findUnion(array1,array2)]

}

main()

console.log(main())