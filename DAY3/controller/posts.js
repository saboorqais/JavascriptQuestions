const fetch = require("node-fetch")
async function getPosts(req, res) {

    try {
      
        const response = await fetch(`${process.env.BASE_URL}/posts`);
        console.log(response)
        const posts = await response.json();
        res.status(200).send({posts} );
    } catch (error) {
        res.status(500).send('Error fetching Posts');
    }

}

module.exports = {getPosts}