import { useState } from 'react'
import './Navbar.css'

interface NavbarProps {
    isLoggedIn?: boolean
    username?: string
    onLogin?: () => void
    onLogout?: () => void
    onRegister?: () => void
}

const Navbar = ({
    isLoggedIn = false,
    username = '',
    onLogin,
    onLogout,
    onRegister
}: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <div className="navbar-logo">
                    <span className="logo-icon">🐺</span>
                    <span className="logo-text">Werewolf</span>
                </div>

                {/* Desktop Navigation */}
                <div className="navbar-nav">
                    <a href="#" className="nav-link">หน้าแรก</a>
                    <a href="#" className="nav-link">วิธีเล่น</a>
                    <a href="#" className="nav-link">ลีดเดอร์บอร์ด</a>
                </div>

                {/* Auth Section */}
                <div className="navbar-auth">
                    {isLoggedIn ? (
                        <div className="user-section">
                            <div className="user-avatar">
                                {username.charAt(0).toUpperCase()}
                            </div>
                            <span className="user-name">{username}</span>
                            <button className="auth-btn logout-btn" onClick={onLogout}>
                                ออกจากระบบ
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <button className="auth-btn login-btn" onClick={onLogin}>
                                เข้าสู่ระบบ
                            </button>
                            <button className="auth-btn register-btn" onClick={onRegister}>
                                สมัครสมาชิก
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <a href="#" className="mobile-nav-link">หน้าแรก</a>
                <a href="#" className="mobile-nav-link">วิธีเล่น</a>
                <a href="#" className="mobile-nav-link">ลีดเดอร์บอร์ด</a>
                <div className="mobile-auth">
                    {isLoggedIn ? (
                        <>
                            <div className="mobile-user-info">
                                <div className="user-avatar">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                <span>{username}</span>
                            </div>
                            <button className="auth-btn logout-btn" onClick={onLogout}>
                                ออกจากระบบ
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="auth-btn login-btn" onClick={onLogin}>
                                เข้าสู่ระบบ
                            </button>
                            <button className="auth-btn register-btn" onClick={onRegister}>
                                สมัครสมาชิก
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
