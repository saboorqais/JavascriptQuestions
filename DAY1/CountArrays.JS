const { log } = require("console")

var example2DArray = [1, 2, 3]
var count; 
function countArrays(array)
{
    count=0 
    countArraysRecursive(array)
    console.log("Total Arrays in our Input is :" + (count))
   
}
function countArraysRecursive(array){
   
    for (let item of array){
        
        if(Array.isArray(item)){
            count=count+1
            countArraysRecursive(item)
            
            
        }

    }
}


countArrays(example2DArray)


