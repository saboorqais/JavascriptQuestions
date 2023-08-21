import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { Comment, Post, PostComment } from "../types/responseTypes";

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
export async function getPosts(req: Request, res: Response) {
  try {
    //getting Keywords from the Request Object
    const titleKeyword = req.query.title as string | undefined;
    const bodyKeyword = req.query.body as string | undefined;

    const response: AxiosResponse<Post[]> = await axios.get<Post[]>(
      `${process.env.BASE_URL}/posts/`
    );
    const responseComments: AxiosResponse<Comment[]> = await axios.get<
      Comment[]
    >(`${process.env.BASE_URL}/comments`);

    const comments: Comment[] = responseComments.data;
    const allPosts: Post[] = response.data;

    const finalPosts: PostComment[] = [];
    // Iterating over the Posts and Assigning each Post with its respective Comments
    for (let post of allPosts) {
      let commentArray: Comment[] = [];

      for (let comment of comments) {
        if (comment.postId == post.id) {
          commentArray.push(comment);
        }
      }
      finalPosts.push({ ...post, comments: commentArray });
    }

    let matchingPosts: Post[] = [];
    //Now We will check If the title and Body Exist in the Posts List
    if (titleKeyword && bodyKeyword) {
      let titleRegExp = new RegExp(titleKeyword, "i");
      let bodyRegExp = new RegExp(bodyKeyword, "i");
      let posts: Post[] = finalPosts.filter(
        (post) => titleRegExp.test(post.title) || bodyRegExp.test(post.body)
      );
      matchingPosts = [...posts];
    }
    //If Body Keywords Exist then We will return based on this
    else if (bodyKeyword) {
      let bodyRegExp = new RegExp(bodyKeyword, "i");
      let posts: Post[] = finalPosts.filter((post) =>
        bodyRegExp.test(post.body)
      );
      matchingPosts = [...posts, ...matchingPosts];
    }
    //If Title Keywords Exist then We will return based on this
    else if (titleKeyword) {
      let titleRegExp = new RegExp(titleKeyword, "i");
      let posts: Post[] = finalPosts.filter((post) =>
        titleRegExp.test(post.title)
      );
      matchingPosts = [...posts, ...matchingPosts];
    }
    //If No Keywords are given then we will return all the values
    else {
      matchingPosts = [...finalPosts];
    }

    if (matchingPosts.length > 0) {
      res.status(200).json({ posts: matchingPosts });
    } else {
      res.status(200).send(finalPosts);
    }
  } catch (error) {
    res.status(500).send("Error searching posts");
  }
}
