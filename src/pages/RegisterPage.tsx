import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi, ApiError } from '../services/api'
import Modal from '../components/Modal'
import type { ModalType } from '../components/Modal'
import './RegisterPage.css'

interface RegisterFormData {
    username: string
    email: string
    password: string
    confirmPassword: string
}

const RegisterPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState<Partial<RegisterFormData>>({})
    const [isLoading, setIsLoading] = useState(false)

    // Modal state
    const [modalState, setModalState] = useState<{
        isOpen: boolean
        type: ModalType
        message: string
    }>({
        isOpen: false,
        type: 'info',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user types
        if (errors[name as keyof RegisterFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<RegisterFormData> = {}

        if (!formData.username.trim()) {
            newErrors.username = 'กรุณากรอกชื่อผู้ใช้'
        } else if (formData.username.length < 3) {
            newErrors.username = 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร'
        }

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

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน'
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

        try {
            // Call register API
            const response = await authApi.register({
                email: formData.email,
                user_name: formData.username,
                password: formData.password
            })

            console.log('Register success:', response)

            // Show success modal
            setModalState({
                isOpen: true,
                type: 'success',
                message: `สมัครสมาชิกสำเร็จ!\nยินดีต้อนรับ`
            })

            // Clear form
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.error('Register error:', error)

            if (error instanceof ApiError) {
                setModalState({
                    isOpen: true,
                    type: 'error',
                    message: error.message
                })
            } else {
                setModalState({
                    isOpen: true,
                    type: 'error',
                    message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองอีกครั้ง'
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="register-container">
            {/* Background Effects */}
            <div className="register-bg-glow"></div>
            <div className="register-stars"></div>

            {/* Register Card */}
            <div className="register-card">
                {/* Header */}
                <div className="register-header">
                    <div className="register-icon">🐺</div>
                    <h1 className="register-title">สมัครสมาชิก</h1>
                    <p className="register-subtitle">เข้าร่วมการผจญภัยในโลกหมาป่า</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="register-form">
                    {/* Username */}
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            <span className="label-icon">👤</span>
                            ชื่อผู้ใช้
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`form-input ${errors.username ? 'error' : ''}`}
                            placeholder="กรอกชื่อผู้ใช้"
                        />
                        {errors.username && (
                            <span className="error-message">{errors.username}</span>
                        )}
                    </div>

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

                    {/* Confirm Password */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">
                            <span className="label-icon">🔐</span>
                            ยืนยันรหัสผ่าน
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                            placeholder="ยืนยันรหัสผ่านอีกครั้ง"
                        />
                        {errors.confirmPassword && (
                            <span className="error-message">{errors.confirmPassword}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="register-submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading-spinner">⏳</span>
                        ) : (
                            <span>สมัครสมาชิก</span>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="register-footer">
                    <p>มีบัญชีอยู่แล้ว? <Link to="/login" className="footer-link">เข้าสู่ระบบ</Link></p>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={modalState.isOpen}
                type={modalState.type}
                message={modalState.message}
                onClose={() => {
                    setModalState({ ...modalState, isOpen: false })
                    // Navigate to login after success
                    if (modalState.type === 'success') {
                        setTimeout(() => navigate('/login'), 300)
                    }
                }}
            />
        </div>
    )
}

export default RegisterPage
