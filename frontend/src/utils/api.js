const baseURL='http://localhost:4000/api';

export const apiEndPoints={
    register: `${baseURL}/user/register`,
    login: `${baseURL}/user/login`,
    getUserDetails: `${baseURL}/user/userDetails`,
    logout: `${baseURL}/user/logout`,
    getCategories: `${baseURL}/category/get-categories`,
    createCategory: `${baseURL}/category/create-category`,
    deleteCategory: `${baseURL}/category/delete-category`,
    editCategory: `${baseURL}/category/update-category`,
    createProduct: `${baseURL}/product/create-product`,
    getProducts: `${baseURL}/product/get-products`,
    getProduct: `${baseURL}/product/get-product`,
    updateProduct: `${baseURL}/product/update-product`,
    deleteProduct: `${baseURL}/product/delete-product`
}