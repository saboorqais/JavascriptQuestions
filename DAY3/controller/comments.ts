import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { Comment } from "../types/responseTypes";

/**
 * Fetches Comments from the Database
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @example
 * // Example response when no query parameters are provided:
 * // Status: 200 OK
 * // Response:
 * //  [ {
 * //   "postId": 1,
 * //    "id": 1,
 * //  "name": "i.....",
 * //  "email": ".....",
 * //  "body": "....."
 * //   },...]
 */
export async function getComments(req: Request, res: Response) {
  try {
    const response: AxiosResponse<Comment[]> = await axios.get<Comment[]>(
      `${process.env.BASE_URL}${process.env.BASE_COMMENT_URL}`
    );
    const comments: Comment[] = response.data;
    res.status(200).send({ comments });
  } catch (error) {
    res.status(500).send("Error fetching Comments");
  }
}

/**
 * Fetches a Single Comment from the Database against given ID
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {string} req.query.id - The id of comment to fetch.(optional)
 * @example
 * // Example response when no query parameters are provided:
 * // Status: 200 OK
 * // Response:
 * //  {
 * // "postId": 1,
 * //"id": 1,
 * //"name": "id labore ex et quam laborum",
 * //"email": "Eliseo@gardner.biz",
 * //"body": ""
}
 */

export async function getComment(req: Request, res: Response) {
  try {
    //getting ID from Request Object
    const id: string = req.params.id;

    const response: AxiosResponse<Comment[]> = await axios.get<Comment[]>(
      `${process.env.BASE_URL}/posts/${id}/comments`
    );

    const comments: Comment[] = response.data;

    //returning Comments for specified ID
    res.status(200).send({ comments });
  } catch (error) {
    res.status(500).send("Error fetching Comments");
  }
}
