import type { BaseResponse } from "./base";

export interface Room {
    id: string;
    room_name: string;
    total_player: number;
    total_player_current: number;
    is_end: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    create_by: string;
}


export type GetCountRoomResponse = BaseResponse<number>;


export type GetRoomsResponse = BaseResponse<Room[]>;


export type GetRoomDetailResponse = BaseResponse<Room>;