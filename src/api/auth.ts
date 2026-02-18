import type { LoginInput, RegisterInput } from "../schemas/auth";
import type { GetAuthResponse } from "../types/auth";
import api from './axios';


export const RegisterUser = async (data: RegisterInput) => {
    try {
        const response = await api.post(`/auths/register`,
            data
        )
        return response.data;
    } catch (error: unknown) {
        const backendError = (error as { response?: { data?: { error?: string; message?: string } } }).response?.data;
        throw new Error(backendError?.error || backendError?.message || "เกิดข้อผิดพลาด");
    }
}

export const LoginUser = async (data: LoginInput): Promise<GetAuthResponse> => {
    try {
        const response = await api.post(`/auths/login`,
            data
        )
        console.log(response);

        return response.data;
    } catch (error: unknown) {
        const backendError = (error as { response?: { data?: { error?: string; message?: string } } }).response?.data;
        throw new Error(backendError?.error || backendError?.message || "เข้าสู่ระบบไม่สำเร็จ");
    }
}
