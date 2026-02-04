import type { RoomInput } from "../schemas/room";
import type { GetCountRoomResponse, GetRoomsResponse } from "../types/room";
import api from "./axios";

export const createRoom = async (data: RoomInput) => {
    try {
        const response = await api.post(`/rooms/create`,
            data
        )
        return response.data;
    } catch (error: any) {
        const backendError = error.response?.data;
        throw new Error(backendError?.error || backendError?.message || "สร้างห้องไม่สำเร็จ");
    }
}

export const getRoom = async (): Promise<GetRoomsResponse> => {
    try {
        const response = await api.get(`/rooms/all`)
        return response.data;
    } catch (error: any) {
        const backendError = error.response?.data;
        throw new Error(backendError?.error || backendError?.message || "ดึงข้อมูลไม่สำเร็จ");
    }
}

export const GetCountRoom = async (): Promise<GetCountRoomResponse> => {
    try {
        const response = await api.get(`/rooms/count`)
        return response.data;
    } catch (error: any) {
        const backendError = error.response?.data;
        throw new Error(backendError?.error || backendError?.message || "ดึงข้อมูลไม่สำเร็จ");
    }
}