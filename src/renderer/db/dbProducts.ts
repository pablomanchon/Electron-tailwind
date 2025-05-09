import axios from "axios";
import { BASE_URL } from "./db";

export const findAllProducts = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/productos`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const findProductById = async (id: number) => {
    try {
        const res = await axios.get(`${BASE_URL}/productos/${id}`)
        return res.data;
    } catch (error) {
        throw error;
    }
}