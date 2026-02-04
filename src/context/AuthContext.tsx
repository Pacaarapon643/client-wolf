import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// 1. กำหนด Type ของ User
interface User {
    id: string;
    username: string;
    email: string;
}


interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

// 3. สร้าง Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. สร้าง Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    // โหลดข้อมูล user จาก localStorage เมื่อ component mount ครั้งแรก
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Failed to parse user from localStorage:", error);
                localStorage.removeItem("user");
            }
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // เก็บใน localStorage ด้วย
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    const isLoggedIn = user !== null;

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 5. สร้าง Hook สำหรับใช้งาน
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};