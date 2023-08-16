var example2DArray = [[],{}]
count = 0
for (let item of example2DArray){
    if(Array.isArray(item)){
        count +=1
    }
}
console.log("Total Arrays in our Input is :" + count)