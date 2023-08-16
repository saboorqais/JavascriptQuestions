var nameArray = ['Saboor', "Akram", "AKRAM", ""]


function capitalizeName(array) {

    let capitalizedNames = []
    for (let name of nameArray) {
        let captilizedNamed = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        capitalizedNames.push(captilizedNamed)

    }
    return capitalizedNames

}

console.log(capitalizeName(nameArray)) 