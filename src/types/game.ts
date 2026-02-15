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
}

export type GetGamePlayerResponse = BaseResponse<Player[]>;