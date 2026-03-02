import type { BaseResponse } from "./base";

export interface ChatMessage {
    sender: string;
    content: string;
    timestamp: string;
}

interface Player {
    user_name: string;
    user_id: string;
    slot_index: number;
    is_dead: boolean;
    img: string;
    is_join: boolean;
    is_werewolf: boolean;
}

export type GetGamePlayerResponse = BaseResponse<Player[]>;

export interface GameEvent {
    type: string;
    event_type: string; // "death", "saved", "night", "execute", "info"
    message: string;
    night_count: number;
}