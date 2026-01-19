import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
    id: string
    username: string
    email: string
    character?: string
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (userData: User) => void
    logout: () => void
    updateCharacter: (character: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = (userData: User) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const updateCharacter = (character: string) => {
        if (user) {
            const updatedUser = { ...user, character }
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
                updateCharacter
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
