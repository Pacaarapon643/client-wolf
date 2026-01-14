import './HomePage.css'

const HomePage = () => {
    return (
        <div className="home-container">
            {/* Background Effects */}
            <div className="bg-glow"></div>
            <div className="stars"></div>

            {/* Main Content */}
            <div className="home-content">
                {/* Logo Section */}
                <div className="logo-section">
                    <div className="moon-icon">🌙</div>
                    <h1 className="game-title">WEREWOLF</h1>
                    <p className="game-subtitle">หมาป่าล่าชาวบ้าน</p>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                    <button className="action-btn create-btn">
                        <span className="btn-icon">🎮</span>
                        <span className="btn-text">สร้างห้อง</span>
                    </button>

                    <button className="action-btn join-btn">
                        <span className="btn-icon">🚪</span>
                        <span className="btn-text">เข้าร่วมห้อง</span>
                    </button>

                    <button className="action-btn rules-btn">
                        <span className="btn-icon">📖</span>
                        <span className="btn-text">วิธีเล่น</span>
                    </button>
                </div>

                {/* Footer */}
                <div className="home-footer">
                    <p>🐺 Werewolf Online v1.0</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage
