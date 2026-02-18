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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Session expired, please login again.');
            // บังคับให้ login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;