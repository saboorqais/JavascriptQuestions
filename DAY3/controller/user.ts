import { Request, Response } from 'express';
import axios , { AxiosResponse }from 'axios';
import { UserDataObject } from '../types/responseTypes';


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
