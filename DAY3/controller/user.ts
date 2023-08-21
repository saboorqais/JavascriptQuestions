import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import {
  Post,
  UserDataObject,
  UserDataPostObject,
} from "../types/responseTypes";

/**
 * Fetches Users and Posts from the Database and Append Each
 * User with its Posts
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {string} req.query.zipcode - The zipcode of users to fetch.(optional)
 * @example
 * // Example response when no query parameters are provided:
 * // Status: 200 OK
 * // Response:
 * // [
 * //   {
 * //  "id": 1,
 * //  "name": "Leanne Graham",
 * //   "username": "Bret",
 * //   "email": "Sincere@april.biz",
 * //  "address": {
 * //    "street": "Kulas Light",
 * //    "suite": "Apt. 556",
 * //    "city": "Gwenborough",
 * //   "zipcode": "92998-3874",
 * //    "geo": {
 * //      "lat": "-37.3159",
 * //      "lng": "81.1496"
 * //    }
 * //  },
 * //  "phone": "1-770-736-8031 x56442",
 * //  "website": "hildegard.org",
 * //  "company": {
 * //    "name": "Romaguera-Crona",
 * //    "catchPhrase": "Multi-layered client-server neural-net",
 * //    "bs": "harness real-time e-markets"
 * //  },....
 * // ]
 */
export async function getUsers(req: Request, res: Response) {
  try {
    //Getting TargetZipCode from the Request Object to Be filtered
    const targetZipcode = req.query.zipcode as string | undefined;

    let responseUser: AxiosResponse<UserDataObject[]> = await axios.get<
      UserDataObject[]
    >(`${process.env.BASE_URL}/users`);
    let responsePost: AxiosResponse<Post[]> = await axios.get<Post[]>(
      `${process.env.BASE_URL}/posts`
    );

    let users: UserDataObject[] = responseUser.data;
    let posts: Post[] = responsePost.data;

    const finalUsers: UserDataPostObject[] = [];
    //We are modifiying the Users List and assigning each User with its Published Post
    for (let user of users) {
      let postArray: Post[] = [];

      for (let post of posts) {
        if (post.userId == user.id) {
          postArray.push(post);
        }
      }
      finalUsers.push({ ...user, posts: postArray });
    }
    let matchingUsers: UserDataPostObject[] = [];
    //Checking if User Gave the Query Parameter
    if (targetZipcode) {
      matchingUsers = finalUsers.filter(
        (user) => user.address.zipcode === targetZipcode
      );
    }
    //If no Zipcode Is given then we will return all Users
    else {
      matchingUsers = [...finalUsers];
    }

    if (matchingUsers.length > 0) {
      res.status(200).json({ users: matchingUsers });
    } else {
      res.status(404).send("No users found with the specified zipcode.");
    }
  } catch (error: Error | unknown | undefined) {
    if (error instanceof Error) {
      res.status(500).send(`Error fetching users : ${error.message}`);
    } else {
      res.status(500).send(`Error fetching users : ${error}`);
    }
  }
}
/**
 * Fetches Users and Posts from the Database and Append Each
 * User with its Posts
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @example
 * // Example response when no query parameters are provided:
 * // Status: 200 OK
 * // Response:
 * // [
 * //   {
 * //  "id": 1,
 * //  "name": "Leanne Graham",
 * //   "username": "Bret",
 * //   "email": "Sincere@april.biz",
 * //  "address": {
 * //    "street": "Kulas Light",
 * //    "suite": "Apt. 556",
 * //    "city": "Gwenborough",
 * //   "zipcode": "92998-3874",
 * //    "geo": {
 * //      "lat": "-37.3159",
 * //      "lng": "81.1496"
 * //    }
 * //  },
 * //  "phone": "1-770-736-8031 x56442",
 * //  "website": "hildegard.org",
 * //  "company": {
 * //    "name": "Romaguera-Crona",
 * //    "catchPhrase": "Multi-layered client-server neural-net",
 * //    "bs": "harness real-time e-markets"
 * //     "posts":[{
 * //  "userId": 1,
 * //  "id": 1,
 * //  "title": "...",
 * //  "body": "e....."
 * // },....]
 * //  },....
 * // ]
 */
export async function getUsersPost(req: Request, res: Response) {
  try {
    //Getting Id from Request Object as Query Parameter
    const id: string = req.params.id;
    const responsePost: AxiosResponse<Post[]> = await axios.get<Post[]>(
      `${process.env.BASE_URL}/posts?userId=${id}`
    );
    const responseUser: AxiosResponse<UserDataObject> =
      await axios.get<UserDataObject>(`${process.env.BASE_URL}/users/${id}`);
    const posts: Post[] = responsePost.data;
    const user: UserDataObject = responseUser.data;
    res.status(200).send({ ...user, posts });
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
}
