import axios from "axios";

export const AuthApi = axios.create({
    baseURL: "https://reqres.in/api",
    headers: {
        'x-api-key': 'reqres-free-v1'
    }
})

export const BrokerApi = axios.create({
    baseURL: "http://localhost:3000/"
})

