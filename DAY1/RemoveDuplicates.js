var duplicatesArray = [1, 2, 3, 4, 5, 1, 1, 1, 1,"John","John"]



function removeDuplicates(array) {

    var ArraysKeys = {

    }
    for (let item of array) {
            ArraysKeys[item] = item
    }

    let keysList = Object.keys(ArraysKeys)
    let uniqueArray  = keysList.map((item)=>(
        ArraysKeys[item]
    ))
    return uniqueArray
}

function removeDuplicatesWithSet(array){

return [...new Set(array)]

}


module.exports = {
    removeDuplicatesWithSet
}




