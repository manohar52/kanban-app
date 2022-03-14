import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:4000/"
});

const { get, post, put, delete: remove } = apiClient;
export { get, post, put, remove };

