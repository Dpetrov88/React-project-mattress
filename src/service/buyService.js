import { requestFactory } from "./requester";

const baseUrl = 'http://localhost:3030/data/buy';

 const request = requestFactory();


export const getBuy =async ( mattressId,userId) => {
    const result = await request.get(`${baseUrl}?where=mattressId%3D%22${mattressId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    return result;
}

export const getAll = async (userId) => {
   
    const result = await request.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    const buyers = Object.values(result);
    return buyers;
    };

export const create = async ( mattress, mattressId) => {
    const result = await request.post(baseUrl, { mattress, mattressId });
        
    return result;

};