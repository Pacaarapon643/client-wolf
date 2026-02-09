import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'


const Navbar = () => {
    const { user, isLoggedIn, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-950 via-purple-950/50 to-slate-950 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => navigate('')}
                    >
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🐺</span>
                        <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                            WEREWOLF
                        </span>
                    </div>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                {/* User Avatar */}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-bold">
                                    {user?.username.charAt(0).toUpperCase()}
                                </div>
                                {/* Username */}
                                <span className="text-white font-medium">{user?.username}</span>
                                {/* Logout Button */}
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-400 rounded-xl font-medium transition-all hover:scale-105"
                                >
                                    ออกจากระบบ
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-xl font-medium transition-all hover:scale-105"
                                >
                                    เข้าสู่ระบบ
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
                                >
                                    สมัครสมาชิก
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 py-6 flex flex-col gap-4">
                    {isLoggedIn ? (
                        <>
                            {/* Mobile User Info */}
                            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg">
                                    {user?.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-white font-medium text-lg">{user?.username}</span>
                            </div>
                            {/* Mobile Logout Button */}
                            <button
                                onClick={logout}
                                className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-400 rounded-xl font-medium transition-all"
                            >
                                ออกจากระบบ
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    navigate('/login')
                                    setIsMenuOpen(false)
                                }}
                                className="w-full px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-xl font-medium transition-all"
                            >
                                เข้าสู่ระบบ
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/register')
                                    setIsMenuOpen(false)
                                }}
                                className="w-full px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 transition-all"
                            >
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
