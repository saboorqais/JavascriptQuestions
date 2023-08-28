import {Request, Response} from "express";
import axios, {AxiosResponse} from "axios";
import {
    Comment,
    DynamicStringObject,
    Post,
    PostComment,
    UserDataObject,
    UserDataPostObject
} from "../types/responseTypes";
import {makeGetRequest} from "../utils/axios";
import {findMatch} from "../utils/genericQueryHelper";

/**
 * Fetches Users and Posts from the Database and Append Each
 * User with its Posts
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {string} req.query.title - The title of Posts to search for.(optional)
 * @param {string} req.query.body - The Body of Posts to search for.(optional)
 * @example
 * // Example response when no query parameters are provided:
 * // Status: 200 OK
 * // Response:
 * //{
 * //       "userId": 1,
 * //      "id": 1,
 * //      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
 * //      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
 * //       "comments": [
 * //          {
 * //               "postId": 1,
 * //               "id": 1,
 * //               "name": "id labore ex et quam laborum",
 * //               "email": "Eliseo@gardner.biz",
 * //               "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
 * //           },
 * **/


//Promote Object Destructring
export async function getPosts(req: Request, res: Response) {
    try {
        //Getting TargetZipCode from the Request Object to Be filtered
        const query: DynamicStringObject = req.query as DynamicStringObject;

        //Approach Redefine Excessive Comments GET
        const response: AxiosResponse<Post[]> = await makeGetRequest<Post[]>(
            `${process.env.BASE_URL}/posts/`
        );
        const allPosts: Post[] = response.data;
        const queryLength: number = Object.keys(query).length
        const matchingPosts: Post[] =
            queryLength > 0
                ? allPosts.filter((post: Post) => {
                    return findMatch<Post, DynamicStringObject>(post, query);
                })
                : [...allPosts];
        if (!(matchingPosts.length > 0)) {
            res.status(404).send("No Posts found with the specified Query.");
        }
        const results: Post[] = await Promise.all(
            matchingPosts.map(async (post: Post) => {
                // Perform some asynchronous operation on 'item'
                const result:AxiosResponse<Post[]> = await makeGetRequest<Post[]>(
                    `${process.env.BASE_URL}/comments?postId=${post.id}`
                );
                return {
                    ...post,
                    comments: result.data,
                };
            })
        );

        if (matchingPosts.length > 0) {
            res.status(200).json({posts: results});
        } else {
            res.status(200).send(results);
        }
    } catch (error) {
        res.status(500).send("Error searching posts");
    }
}
