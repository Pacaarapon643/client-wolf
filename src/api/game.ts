import type { GetGamePlayerResponse } from "@/types/game";
import type { BaseResponseString } from "../types/base";
import api from "./axios";

export const GetRole = async (room_id: string, user_id: string): Promise<BaseResponseString> => {
    try {
        const response = await api.get(`/games/role`, {
            params: {
                room_id: room_id,
                user_id: user_id
            }
        })

        return response.data;

    } catch (error: any) {
        const backendError = error.response?.data;
        throw new Error(backendError?.error || backendError?.message || "ดึงข้อมูลไม่สำเร็จ");
    }
}

export const GetGamePlayer = async (game_id: string, role: string): Promise<GetGamePlayerResponse> => {
    try {
        const response = await api.get(`/games/game`, {
            params: {
                game_id: game_id,
                role: role
            }
        })
        return response.data;

    } catch (error: any) {
        const backendError = error.response?.data;
        throw new Error(backendError?.error || backendError?.message || "ดึงข้อมูลไม่สำเร็จ");
    }
}