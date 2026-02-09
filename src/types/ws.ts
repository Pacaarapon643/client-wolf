interface WsMessage {
    type: string;
    user_id: string;
    room_id: string;
    username: string;
    content: string;
}

export type { WsMessage };
