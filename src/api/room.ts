import type { RoomInput } from "../schemas/room";
import type { BaseResponseNodata } from "../types/base";
import type { GetCountRoomResponse, GetRoomByIdResponse, GetRoomMemberResponse, GetRoomsResponse } from "../types/room";
import api from "./axios";

type BackendError = { response?: { data?: { error?: string; message?: string } } };

export const createRoom = async (data: RoomInput): Promise<GetRoomByIdResponse> => {
    try {
        const response = await api.post(`/rooms/create`,
            data
        )
        return response.data;
    } catch (error: unknown) {
        const backendError = (error as BackendError).response?.data;
        throw new Error(backendError?.error || backendError?.message || "สร้างห้องไม่สำเร็จ");
    }
}

export const getRoom = async (): Promise<GetRoomsResponse> => {
    try {
        const response = await api.get(`/rooms/all`)
        return response.data;
    } catch (error: unknown) {
        const backendError = (error as BackendError).response?.data;
        throw new Error(backendError?.error || backendError?.message || "ดึงข้อมูลไม่สำเร็จ");
    }
}

export const GetCountRoom = async (): Promise<GetCountRoomResponse> => {
    try {
        const response = await api.get(`/rooms/count`)
        return response.data;
    } catch (error: unknown) {
        const backendError = (error as BackendError).response?.data;
        throw new Error(backendError?.error || backendError?.message || "ดึงข้อมูลไม่สำเร็จ");
    }
}

export const GetRoomById = async (roomId: string): Promise<GetRoomByIdResponse> => {
    try {
        const response = await api.get(`/rooms/detail`,
            {
                params: {
                    room_id: roomId
                }
            }
        )

        return response.data;
    } catch (error: unknown) {
        const backendError = (error as BackendError).response?.data;
        throw new Error(backendError?.error || backendError?.message || "ดึงข้อมูลไม่สำเร็จ");
    }
}

export const JoinRoom = async (roomId: string): Promise<BaseResponseNodata> => {
    try {
        const response = await api.put(`/rooms/join`,
            {},
            {
                params: {
                    room_id: roomId
                }
            }
        )

        return response.data;
    } catch (error: unknown) {
        const backendError = (error as BackendError).response?.data;
        throw new Error(backendError?.error || backendError?.message || "ดึงข้อมูลไม่สำเร็จ");
    }
}


export const JoinRoomMember = async (roomId: string, userId: string, maxRoom: number): Promise<void> => {
    try {
        await api.post(`rooms/join-member`, {
            room_id: roomId,
            user_id: userId,
            max_room: maxRoom
        })
    } catch (error: unknown) {
        const backendError = (error as BackendError).response?.data;
        throw new Error(backendError?.error || backendError?.message || "ดึงข้อมูลไม่สำเร็จ");
    }
}


export const GetRoomMember = async (roomId: string, maxRoom: number): Promise<GetRoomMemberResponse> => {
    try {
        const response = await api.get(`/rooms/member`,
            {
                params: {
                    room_id: roomId,
                    max_room: maxRoom
                }
            }
        )

        return response.data;
    } catch (error: unknown) {
        const backendError = (error as BackendError).response?.data;
        throw new Error(backendError?.error || backendError?.message || "ดึงข้อมูลไม่สำเร็จ");
    }
}
