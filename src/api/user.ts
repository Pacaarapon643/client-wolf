import type { GetCountUserResponse } from "../types/user"

import api from "./axios"

export const getCountUser = async (): Promise<GetCountUserResponse> => {
    try {
        const response = await api.get(`/users/count`)
        return response.data

    } catch (error: any) {
        const backendError = error.response?.data;
        throw new Error(backendError?.error || backendError?.message || "ดึงข้อมูลไม่สำเร็จ");
    }
}