var example2DArray = [[],{}]

function countArrays(array){
    count = 0
    for (let item of array){
        if(Array.isArray(item)){
            count +=1
        }
    }

    return count
}


console.log("Total Arrays in our Input is :" + countArrays(example2DArray))