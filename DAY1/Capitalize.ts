
var nameArray : Array<string> = ["Slyvia", "Kristal", "Sharilyn", "Calista"]


function capitalizeName(array :Array<string>) :(string)[] {

    let capitalizedNames:Array<string>= []
    for (let name of array) {
        let captilizedNamed:string = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        capitalizedNames.push(captilizedNamed)
    }
    return capitalizedNames

}

console.log(capitalizeName(nameArray)) 