import type { RegisterInput } from "../schemas/auth";
import axios from "axios";

const API_BAEE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (data: RegisterInput) => {
    try {
        const response = await axios.post(`${API_BAEE_URL}/auths/register`,
            data
        )
        return response.data;
    } catch (error: any) {
        const backendError = error.response?.data;
        throw new Error(backendError?.error || backendError?.message || "เกิดข้อผิดพลาด");
    }
}