import { z } from 'zod';

export const registerSchema = z.object({
    user_name: z.string()
        .min(1, { message: "กรุณากรอกชื่อผู้ใช้" })
        .min(4, { message: "ชื่อผู้ใช้อย่างน้อยต้องมี 4 ตัวอักษร" }),

    email: z.email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),

    password: z.string()
        .min(6, { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }),

    confirmPassword: z.string()
        .min(1, { message: "กรุณายืนยันรหัสผ่าน" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
});

export type RegisterInput = z.infer<typeof registerSchema>;