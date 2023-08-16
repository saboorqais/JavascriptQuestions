var duplicatesArray = [1, 2, 3, 4, 5, 1, 1, 1, 1,"John","John"]



function removeDuplicates(array) {

    var ArraysKeys = {


    }

    for (let item of array) {

        if (ArraysKeys.hasOwnProperty(item)) {
            ArraysKeys[item] = ArraysKeys[item] + 1

        }
        else {
            ArraysKeys[item] = 0
        }

    }
    return Object.keys(ArraysKeys)
}

console.log(removeDuplicates(duplicatesArray));