const { log } = require("console");
const fetch = require("node-fetch")
function getPhoneNumbers(data) {
    let phoneNumbers = []
    for (let item of data) {
        phoneNumbers.push(item.phone)
    }
    return phoneNumbers
}

function getDataUsingCallbacks(url, callback) {

    fetch(url).then(response => response.json())
        .then(data => {
            callback(data); // Call the provided callback with the response data
        })
}

getDataUsingCallbacks("https://jsonplaceholder.typicode.com/users",(data)=>{
    console.log(getPhoneNumbers(data))
})

function createPromise(url) {
    return new Promise((resolve, reject) => {

        fetch(url).then(response => {
            if (!(response.status == 200)) {
                throw new Error(`Request Error ${response.status}`)
            }
            return response.json()
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })



    })
}

function getDataUsingPromise(url) {
    createPromise(url).then(
        data => {
            console.log(getPhoneNumbers(data))
        }
    ).catch(err => {
        console.log(err)
    })
}
getDataUsingPromise("https://jsonplaceholder.typicode.com/users")


async function awaitCreate(url){
    try {
        let response = await fetch(url)
        const data = await response.json();
        return data;
    
    } catch (error) {
        throw error
    }
}

async function getDataUsingAsync(url){

try {
    let data = await awaitCreate(url)
    console.log( getPhoneNumbers(data))
} catch (error) {
    throw error
}


}

getDataUsingAsync("https://jsonplaceholder.typicode.com/users")