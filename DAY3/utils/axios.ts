import axios, {AxiosResponse} from 'axios';


export async function makeGetRequest<T>(url: string): Promise<AxiosResponse<T>> {
    try {
        return await axios.get<T>(url);
    } catch (error) {

        throw error;
    }
}

export async function makePostRequest<T>(url: string, payload: string): Promise<AxiosResponse<T>> {
    try {
        return await axios.post<T>(url, payload);
    } catch (error) {
        throw error;
    }
}
  
