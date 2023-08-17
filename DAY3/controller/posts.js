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

async function getPostWithComments(req, res) {

    try {
        const id = req.params.id;
        const responseComments = await fetch(`${process.env.BASE_URL}/posts/${id}/comments`);
        const responsePosts = await fetch(`${process.env.BASE_URL}/posts/${id}`);
        const comments = await responseComments.json();
        const posts = await responsePosts.json();
        console.log(posts)
        console.log(comments)
        res.status(200).send({...posts,comments} );
    } catch (error) {
        console.log(error)
        res.status(500).send('Error fetching Posts');
    }

}




module.exports = {getPosts,getPostWithComments}