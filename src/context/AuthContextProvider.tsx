import { useState, createContext, type ReactNode } from "react";

// Type ของ User
export interface User {
    id: string;
    username: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function loadUserFromStorage(): User | null {
    try {
        const stored = localStorage.getItem("user");
        return stored ? (JSON.parse(stored) as User) : null;
    } catch {
        localStorage.removeItem("user");
        return null;
    }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(loadUserFromStorage);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
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
