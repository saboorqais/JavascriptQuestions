const fetch = require("node-fetch")
async function getComments(req, res) {

    try {
      
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        console.log(response)
        const comments = await response.json();
        res.status(200).send({comments} );
    } catch (error) {
        res.status(500).send('Error fetching Comments');
    }

}

module.exports = {getComments}