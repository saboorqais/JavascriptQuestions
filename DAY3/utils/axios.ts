import axios, { AxiosResponse, AxiosError } from 'axios';

async function makeRequest<T>(url:string,method:string): Promise<AxiosResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios<T>({
        url,
        method,
    })
    return response;
  } catch (error) {
    throw error
  }
}

export async function makeGetRequest<T>(url:string): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axios.get<T>(url)
      return response;
    } catch (error) {

      throw error;
    }
  }
  
export  async function makePostRequest<T>(url:string,payload:string): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axios.post<T>(url,payload)
      return response;
    } catch (error) {
      throw error;
    }
  }
  
