import { useState } from 'react'
import { Link } from 'react-router-dom'
import './LoginPage.css'

interface LoginFormData {
    email: string
    password: string
}

const LoginPage = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState<Partial<LoginFormData>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user types
        if (errors[name as keyof LoginFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<LoginFormData> = {}

        if (!formData.email.trim()) {
            newErrors.email = 'กรุณากรอกอีเมล'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง'
        }

        if (!formData.password) {
            newErrors.password = 'กรุณากรอกรหัสผ่าน'
        } else if (formData.password.length < 6) {
            newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            console.log('Login with:', formData, 'Remember:', rememberMe)
            alert('เข้าสู่ระบบสำเร็จ!')
            setIsLoading(false)
        }, 1500)
    }

    return (
        <div className="login-container">
            {/* Background Effects */}
            <div className="login-bg-glow"></div>
            <div className="login-stars"></div>

            {/* Login Card */}
            <div className="login-card">
                {/* Header */}
                <div className="login-header">
                    <div className="login-icon">🌙</div>
                    <h1 className="login-title">เข้าสู่ระบบ</h1>
                    <p className="login-subtitle">ยินดีต้อนรับกลับสู่โลกหมาป่า</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="login-form">
                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            <span className="label-icon">📧</span>
                            อีเมล
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-input ${errors.email ? 'error' : ''}`}
                            placeholder="example@email.com"
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            <span className="label-icon">🔒</span>
                            รหัสผ่าน
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-input ${errors.password ? 'error' : ''}`}
                            placeholder="กรอกรหัสผ่าน"
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="form-options">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span>จดจำฉัน</span>
                        </label>
                        <a href="#" className="forgot-password">ลืมรหัสผ่าน?</a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading-spinner">⏳</span>
                        ) : (
                            <span>เข้าสู่ระบบ</span>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="divider">
                    <span>หรือ</span>
                </div>

                {/* Social Login */}
                <div className="social-login">
                    <button className="social-btn google-btn">
                        <span className="social-icon">🔍</span>
                        <span>เข้าสู่ระบบด้วย Google</span>
                    </button>
                </div>

                {/* Footer */}
                <div className="login-footer">
                    <p>ยังไม่มีบัญชี? <Link to="/register" className="footer-link">สมัครสมาชิก</Link></p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
