let objectMap = {
D: 1,
B: 2,
C: 3
}


function mappingKeystoArray(array){
let mapped2DArray=[]
for(let key in objectMap){
    mapped2DArray.push([key,objectMap[key]])
}
return mapped2DArray
}

console.log(mappingKeystoArray(objectMap))