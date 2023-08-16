const { log } = require("console")

var example2DArray = [[1, 2, 3], [1, 2, 3], [1, 2, 3], [[1], [[2],[3]], [4]]]

function countArraysRecursive(array){
   
    for (let item of array){
        console.log(item);
        if(Array.isArray(item)){
            count =count+1
            countArraysRecursive(item)
            
            
        }else{
            return 
        }

    }
}
function countArrays(array)
{
    var  count = 0
    countArraysRecursive(array)
    console.log("Total Arrays in our Input is :" + (count))
   
}

countArrays(example2DArray)
countArrays(example2DArray)


console.log("Total Arrays in our Input is :" + (count))