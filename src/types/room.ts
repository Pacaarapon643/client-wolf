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
    room_id: string;
    room_status: string;
}

export interface RoomMember {
    is_ready: boolean;
    slot_index: number;
    is_host: boolean;
    user_name: string;
    user_id: string;
    empty_slot: boolean;
}


export type GetCountRoomResponse = BaseResponse<number>;

export type GetRoomsResponse = BaseResponse<Room[]>;

export type GetRoomByIdResponse = BaseResponse<Room>;

export type GetRoomMemberResponse = BaseResponse<RoomMember[]>;
