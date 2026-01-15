import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

interface NavbarProps {
    isLoggedIn?: boolean
    username?: string
    onLogout?: () => void
}

const Navbar = ({
    isLoggedIn = false,
    username = '',
    onLogout
}: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        onLogout?.()
        navigate('/')
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🐺</span>
                    <span className="logo-text">Werewolf</span>
                </Link>



                {/* Auth Section */}
                <div className="navbar-auth">
                    {isLoggedIn ? (
                        <div className="user-section">
                            <div className="user-avatar">
                                {username.charAt(0).toUpperCase()}
                            </div>
                            <span className="user-name">{username}</span>
                            <button className="auth-btn logout-btn" onClick={handleLogout}>
                                ออกจากระบบ
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="auth-btn login-btn">
                                เข้าสู่ระบบ
                            </Link>
                            <Link to="/register" className="auth-btn register-btn">
                                สมัครสมาชิก
                            </Link>
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
                <div className="mobile-auth">
                    {isLoggedIn ? (
                        <>
                            <div className="mobile-user-info">
                                <div className="user-avatar">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                <span>{username}</span>
                            </div>
                            <button className="auth-btn logout-btn" onClick={handleLogout}>
                                ออกจากระบบ
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="auth-btn login-btn" onClick={() => setIsMenuOpen(false)}>
                                เข้าสู่ระบบ
                            </Link>
                            <Link to="/register" className="auth-btn register-btn" onClick={() => setIsMenuOpen(false)}>
                                สมัครสมาชิก
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
