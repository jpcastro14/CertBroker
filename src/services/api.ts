import axios from "axios";

export const AuthApi = axios.create({
    baseURL: "https://reqres.in/api",
    headers: {
        'x-api-key': 'reqres-free-v1'
    }
})

export const BrokerApi = axios.create({
    baseURL: "http://172.28.239.228:3000"
})

export async function fetchBrokers() {
    const response = await BrokerApi.get("/brokers/")
    if (response.status !== 200) {
        throw new Error("Failed to fetch brokers");
    }
    return response.data;
}