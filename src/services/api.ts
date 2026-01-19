// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

// API Response Types
export interface ApiResponse<T> {
    status: string
    result: string
    data?: T
    message?: string
}

export interface RegisterRequest {
    email: string
    user_name: string
    password: string
}

// API Error Class
export class ApiError extends Error {
    statusCode?: number
    response?: any

    constructor(
        message: string,
        statusCode?: number,
        response?: any
    ) {
        super(message)
        this.name = 'ApiError'
        this.statusCode = statusCode
        this.response = response
    }
}

// Auth API Service
export const authApi = {
    async register(data: RegisterRequest): Promise<ApiResponse<any>> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/auths/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()
            console.log(response);
            console.log(result);

            if (!response.ok) {
                // Construct error message from response
                let errorMessage = 'Registration failed'

                if (result.error && result.message) {
                    errorMessage = `${result.error}\n${result.message}`
                } else if (result.error) {
                    errorMessage = result.error
                } else if (result.message) {
                    errorMessage = result.message
                }

                throw new ApiError(
                    errorMessage,
                    response.status,
                    result
                )
            }

            return result
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            throw new ApiError(
                error instanceof Error ? error.message : 'Network error occurred',
                undefined,
                error
            )
        }
    },

    async login(email: string, password: string): Promise<ApiResponse<any>> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/auths/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const result = await response.json()
            console.log(response);
            console.log(result);

            if (!response.ok) {
                // Construct error message from response
                let errorMessage = 'Login failed'

                if (result.error && result.message) {
                    errorMessage = `${result.error}\n${result.message}`
                } else if (result.error) {
                    errorMessage = result.error
                } else if (result.message) {
                    errorMessage = result.message
                }

                throw new ApiError(
                    errorMessage,
                    response.status,
                    result
                )
            }

            return result
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            throw new ApiError(
                error instanceof Error ? error.message : 'Network error occurred',
                undefined,
                error
            )
        }
    }
}
