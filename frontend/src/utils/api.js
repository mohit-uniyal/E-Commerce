const baseURL='http://localhost:4000/api';

export const apiEndPoints={
    register: `${baseURL}/user/register`,
    login: `${baseURL}/user/login`,
    getUserDetails: `${baseURL}/user/userDetails`,
    logout: `${baseURL}/user/logout`
}