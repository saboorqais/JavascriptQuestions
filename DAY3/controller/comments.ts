
import axios, { AxiosResponse }  from 'axios';
import  { Request, Response } from 'express';
import { Comment } from '../types/responseTypes';


export async function getComments(req: Request, res: Response) {

    try {
        const response :AxiosResponse<Comment[]>= await axios.get<Comment[]>(`${process.env.BASE_URL}/comments`);
       
        const comments:Comment[] = response.data;
        res.status(200).send({ comments });
    } catch (error) {
        res.status(500).send('Error fetching Comments');
    }

}


export async function getComment(req: Request, res: Response) {

    try {
        const id: string = req.params.id;

        const response:AxiosResponse<Comment[]> = await axios.get<Comment[]>(`${process.env.BASE_URL}/posts/${id}/comments`);
        const comments: Comment[] = response.data;
        
        console.log(comments);
        res.status(200).send({ comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Error fetching Comments');
    }

}

