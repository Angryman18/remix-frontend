import axios from "axios";
import { CreatePost } from "~/model";

const GET_AND_CREATE_POST: string = process.env.BACKEND_URL + "/post";
const GET_SINGLE_POST : string = process.env.BACKEND_URL + '/getSinglePost'

export const fetchAllPost: Function = async (): Promise<any> => {
  try {
    const response = await axios.get(GET_AND_CREATE_POST);
    return response.data;
  } catch (err: any) {
    return Promise.reject(err?.response);
  }
};

export const getSinglePost: Function = async (slug: string): Promise<any> => {
  try {
    const response = await axios(GET_SINGLE_POST + '/?slug=' + slug);
    return response.data
  } catch(err: any) {
    return Promise.reject(err?.response)
  }
}

export const createNewPost: Function = async (
  Obj: CreatePost
): Promise<any> => {
  try {
    const response = await axios.post(GET_AND_CREATE_POST, Obj);
    return response.data;
  } catch (err: any) {
    return Promise.reject(err?.response);
  }
};
