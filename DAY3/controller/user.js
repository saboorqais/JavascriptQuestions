

const fetch = require("node-fetch")
async function getUsers(req, res) {

    try {
        console.log("running")
        const response = await fetch(`${process.env.BASE_URL}/users`);
        console.log(response)
        const users = await response.json();
        res.status(200).send({users} );
    } catch (error) {
        res.status(500).send('Error fetching users');
    }

}

module.exports = {getUsers}