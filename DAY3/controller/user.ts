import { Request, Response } from 'express';
import axios , { AxiosResponse }from 'axios';
import { Post, UserDataObject } from '../types/responseTypes';


export async function getUsers(req: Request, res: Response) {
    try {
        console.log("running");
        const response :AxiosResponse<UserDataObject[]> = await axios.get<UserDataObject[]>(`${process.env.BASE_URL}/users`);
        console.log(response.data);
        const users: UserDataObject[] = response.data;
        res.status(200).send({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
}

// Assuming similar functionality for filterUsers
export async function filterUsers(req: Request, res: Response) {
    try {
        console.log("running");
        const response :AxiosResponse<UserDataObject[]> = await axios.get<UserDataObject[]>(`${process.env.BASE_URL}/users`);
        console.log(response.data);
        const users: UserDataObject[] = response.data;
        res.status(200).send({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
}


// Assuming similar functionality for filterUsers
export async function getUsersPost(req: Request, res: Response) {
    try {
      
        const id: string = req.params.id;
        console.log(id)
        const responsePost :AxiosResponse<Post[]> = await axios.get<Post[]>(`${process.env.BASE_URL}/posts?userId=${id}`);
        const responseUser :AxiosResponse<UserDataObject> = await axios.get<UserDataObject>(`${process.env.BASE_URL}/users/${id}`);

       
        const posts: Post[] = responsePost.data;
        const user: UserDataObject = responseUser.data;
        res.status(200).send({...user, posts });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
}


