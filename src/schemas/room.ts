import { z } from "zod";

export const roomSchema = z.object({
    room_name: z.string()
        .min(1, { message: "กรุณากรอกชื่อห้อง" }),
    total_player: z.number()
        .min(1, { message: "กรุณาเลือกจำนวนผู้เล่น" }),
    create_by: z.string()
});

export type RoomInput = z.infer<typeof roomSchema>;

export const joinRoomSchema = z.object({
    room_id: z.string()
        .min(1, { message: "กรุณากรอกรหัสห้อง" }),
});

export type JoinRoomInput = z.infer<typeof joinRoomSchema>;
