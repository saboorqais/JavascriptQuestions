import { Request, Response } from 'express';
import axios, { AxiosResponse }from 'axios';
import { Comment, Post } from '../types/responseTypes';


export async function getPosts(req: Request, res: Response) {
    try {
        const response :AxiosResponse<Post[]>= await axios.get<Post[]>(`${process.env.BASE_URL}/posts`);
        const posts: Post[] = response.data;

        console.log(posts);
        res.status(200).send({ posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Error fetching Posts');
    }
}


export async function getPostWithComments(req: Request, res: Response) {
    try {
        const id: string = req.params.id;

        const responseComments :AxiosResponse<Comment[]>= await axios.get<Comment[]>(`${process.env.BASE_URL}/posts/${id}/comments`);
        const responsePost :AxiosResponse<Post>= await axios.get<Post>(`${process.env.BASE_URL}/posts/${id}`);

        const comments: Comment[] = responseComments.data;
        const post: Post = responsePost.data;

        console.log(post);
        console.log(comments);

        res.status(200).send({ ...post, comments });
    } catch (error) {
        console.error('Error fetching post and comments:', error);
        res.status(500).send('Error fetching Posts');
    }
}



module.exports = {getPosts,getPostWithComments}