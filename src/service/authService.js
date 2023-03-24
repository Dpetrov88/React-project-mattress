import {requestFactory} from './requester';

const baseUrl = `http://localhost:3030/users`;

export const authServiceFactory = (token) => {
    const request = requestFactory(token);

    return {
        login: (data) => request.post(`${baseUrl}/login`, data),
        register: (data) => request.post(`${baseUrl}/register`, data),
        logout: () => request.get(`${baseUrl}/logout`),
    }
};

// export const login = (data) => {
//     return request.post(`${baseUrl}/login`, data);
// };

// export const register = (data) => {
//     return request.post(`${baseUrl}/register`, data);
// };

// export const logout = () => {
//     return request.get(`${baseUrl}/logout`);
// };