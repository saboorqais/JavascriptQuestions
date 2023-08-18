import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { Comment, Post, PostComment } from '../types/responseTypes';



export async function getPostWithComments(req: Request, res: Response) {
    try {
        const id: string = req.params.id;

        const responseComments: AxiosResponse<Comment[]> = await axios.get<Comment[]>(`${process.env.BASE_URL}/posts/${id}/comments`);
        const responsePost: AxiosResponse<Post> = await axios.get<Post>(`${process.env.BASE_URL}/posts/${id}`);

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
export async function getPosts(req: Request, res: Response) {
    try {
        const titleKeyword = req.query.title as string | undefined;
        const bodyKeyword = req.query.body as string | undefined;

        // Fetch posts from an external API using Axios (example URL)
        const response: AxiosResponse<Post[]> = await axios.get<Post[]>(`${process.env.BASE_URL}/posts/`);
        const responseComments: AxiosResponse<Comment[]> = await axios.get<Comment[]>(`${process.env.BASE_URL}/comments`);

        const comments: Comment[] = responseComments.data;
        const allPosts: Post[] = response.data;

        const finalPosts: PostComment[] = []





        for (let post of allPosts) {

            let commentArray: Comment[] = []

            for (let comment of comments) {
                if (comment.postId == post.id) {
                    commentArray.push(comment)
                }

            }
            finalPosts.push({ ...post, comments: commentArray })

        }

        let matchingPosts: Post[] = [];

        if (titleKeyword && bodyKeyword) {
            let titleRegExp = new RegExp(titleKeyword, 'i');
            let bodyRegExp = new RegExp(bodyKeyword, 'i');
            let posts: Post[] = finalPosts.filter(post => titleRegExp.test(post.title) || bodyRegExp.test(post.body));
            matchingPosts = [...posts]
        }

        else if (bodyKeyword) {
            let bodyRegExp = new RegExp(bodyKeyword, 'i');
            let posts: Post[] = finalPosts.filter(post => bodyRegExp.test(post.body));
            matchingPosts = [...posts, ...matchingPosts]

        }
        else if (titleKeyword) {
            let titleRegExp = new RegExp(titleKeyword, 'i');
            let posts: Post[] = finalPosts.filter(post => titleRegExp.test(post.title));
            matchingPosts = [...posts, ...matchingPosts]
        }


        if (matchingPosts.length > 0) {
            res.status(200).json({ posts: matchingPosts });
        } else {
            res.status(200).send(finalPosts);
        }
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).send('Error searching posts');
    }
}



