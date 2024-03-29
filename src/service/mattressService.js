import { requestFactory } from "./requester"

const baseUrl = 'http://localhost:3030/data/mattress';

 export const mattressServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(baseUrl);
        const mattress = Object.values(result);
        
        return mattress;
    };
    const getSearch = async (query) => {
        let q = query.search
        const result = await request.get(`${baseUrl}?where=brand%20LIKE%20%22${q}%22`);
        const mattress = Object.values(result);
        
        return mattress;
    };


     const getOne = async (mattressId) => {
            const result = await request.get(`${baseUrl}/${mattressId}`);
            
            return result;
    };
    
    const create = async (data) => {
        const result = await request.post(baseUrl, data);
        
        return result;
    };

    const edit = async (mattressId, data) => request.put(`${baseUrl}/${mattressId}`, data)

    const deleteGame = (gameId) => request.delete(`${baseUrl}/${gameId}`);

    return {
        getAll,
        getOne,
        create,
        getSearch,
        edit,
        delete:deleteGame,
        
    };
}