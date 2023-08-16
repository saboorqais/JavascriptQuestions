let objectMap = { '1': {}, '2': 0, '3': [], '4': 0, '5': 0, "John": 1 }


function mappingKeystoArray(array){
let mapped2DArray=[]
for(let key in objectMap){
    mapped2DArray.push([key,objectMap[key]])
}
return mapped2DArray
}

console.log(mappingKeystoArray(objectMap))