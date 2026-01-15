import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"

const App = () => {
  // ตัวอย่างการใช้งาน - สามารถเชื่อมต่อกับ state management ได้ภายหลัง
  const handleLogin = () => {
    console.log('Open login modal')
  }

  const handleLogout = () => {
    console.log('Logout')
  }

  const handleRegister = () => {
    console.log('Open register modal')
  }

  return (
    <div >
      <Navbar
        isLoggedIn={false}
        username=""
        onLogin={handleLogin}
        onLogout={handleLogout}
        onRegister={handleRegister}
      />
      <HomePage />
    </div>
  )
}

export default App