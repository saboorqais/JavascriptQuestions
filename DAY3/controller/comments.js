const fetch = require("node-fetch")
async function getComments(req, res) {

    try {

        const response = await fetch(`${process.env.BASE_URL}/comments`);
        console.log(response)
        const comments = await response.json();
        res.status(200).send({ comments });
    } catch (error) {
        res.status(500).send('Error fetching Comments');
    }

}


async function getComment(req, res) {

    try {
        const id = req.params.id;

        const response = await fetch(`${process.env.BASE_URL}/posts/${id}/comments`);
        console.log(response)
        const comments = await response.json();
        console.log(comments)
        res.status(200).send({ "comments": comments });
    } catch (error) {
        res.status(500).send('Error fetching Comments');
    }

}

module.exports = { getComments, getComment }