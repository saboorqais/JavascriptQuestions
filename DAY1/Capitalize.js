var nameArray = ['Saboor', "Akram", "AKRAM", ""]


function capitalizeName(array) {

    let capitalizedName = []
    for (let name of nameArray) {
        capitalizedName.push(name.toUpperCase())

    }
    return capitalizedName

}

console.log(capitalizeName(nameArray))