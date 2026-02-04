// Response หลัง Login สำเร็จ
export interface GetAuthResponse {
    status: number;
    result: string;
    data: AuthResponse; // ← เป็น object เดียว ไม่ใช่ Array
    message: string;
}

// ข้อมูลผู้ใช้ที่ได้จาก Backend
export interface AuthResponse {
    id: string;
    user_name: string;
    email: string;
}
