import axios from 'axios';

const api = axios.create({
    // ดึง URL จาก .env ที่เราตั้งไว้
    baseURL: import.meta.env.VITE_API_BASE_URL,
    // ยอมรับระส่งคุกกี้ HTTPOnly อัตโนมัติ
    withCredentials: true,
    // ตั้งค่าหัวข้อส่งข้อมูลเป็น JSON
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- ทริคเสริม: ระบบดักจับ Error (Interceptors) ---
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // ถ้าหลังบ้านตอบกลับมาว่า 401 (Token หมดอายุ หรือไม่ได้ Login)
        if (error.response?.status === 401) {
            console.error('Session expired, please login again.');
            // คุณสามารถสั่งเด้งไปหน้าหน้า Login ได้ที่นี่
            // window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default api;