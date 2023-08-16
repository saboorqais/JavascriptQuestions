const { log } = require("console")

var example2DArray = [[1, 2, 3], [1, 2, 3], [1, 2, 3], [[1], [[2],[3]], [4]]]
var  count = 0
function countArrays(array){
   
    for (let item of array){
        console.log(item);
        if(Array.isArray(item)){
            count =count+1
            countArrays(item)
            
            
        }else{
            return 
        }

    }


}
countArrays(example2DArray)

console.log("Total Arrays in our Input is :" + (count))