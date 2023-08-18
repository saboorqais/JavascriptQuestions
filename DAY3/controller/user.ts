import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { DynamicStringObject, Post, UserDataObject, UserDataPostObject } from '../types/responseTypes';


// Assuming similar functionality for filterUsers
export async function getUsers(req: Request, res: Response) {
    try {

        const targetZipcode = req.query.zipcode as string | undefined;

        let responseUser: AxiosResponse<UserDataObject[]> = await axios.get<UserDataObject[]>(`${process.env.BASE_URL}/users`);
        let responsePost: AxiosResponse<Post[]> = await axios.get<Post[]>(`${process.env.BASE_URL}/posts`);

        let users: UserDataObject[] = responseUser.data;
        let posts: Post[] = responsePost.data;


        const finalUsers: UserDataPostObject[] = []

        for (let user of users) {

            let postArray: Post[] = []

            for (let post of posts) {
                if (post.userId == user.id) {
                    postArray.push(post)
                }

            }
            finalUsers.push({ ...user, posts: postArray })

        }





        let matchingUsers: UserDataPostObject[] = []
        if (targetZipcode) {
            matchingUsers = finalUsers.filter(user => user.address.zipcode === targetZipcode);
        } else {
            matchingUsers = finalUsers
        }

        if (matchingUsers.length > 0) {
            res.status(200).json({ users: matchingUsers });
        } else {
            res.status(404).send('No users found with the specified zipcode.');
        }

    } catch (error: Error | unknown | undefined) {
        if (error instanceof Error) {
            res.status(500).send(`Error fetching users : ${error.message}`);
        } else {
            res.status(500).send(`Error fetching users : ${error}`);
        }

    }
}



export async function getUsersPost(req: Request, res: Response) {
    try {

        const id: string = req.params.id;
        const responsePost: AxiosResponse<Post[]> = await axios.get<Post[]>(`${process.env.BASE_URL}/posts?userId=${id}`);
        const responseUser: AxiosResponse<UserDataObject> = await axios.get<UserDataObject>(`${process.env.BASE_URL}/users/${id}`);
        const posts: Post[] = responsePost.data;
        const user: UserDataObject = responseUser.data;
        res.status(200).send({ ...user, posts });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
}


