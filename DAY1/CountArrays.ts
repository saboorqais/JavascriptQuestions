type MixedArray = (number | string | object | any[])[];

var example2DArray: MixedArray= [1, 2, 3]
var count:number; 
function countArrays(array : MixedArray)
{
    count=0 
    countArraysRecursive(array)
    console.log("Total Arrays in our Input is :" + (count))
   
}
function countArraysRecursive(array:MixedArray){
   
    for (let item of array){
        
        if(Array.isArray(item)){
            count=count+1
            countArraysRecursive(item)
            
            
        }

    }
}


countArrays(example2DArray)


