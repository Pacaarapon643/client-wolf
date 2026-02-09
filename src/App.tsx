import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import GameLobbyPage from "./pages/GameLobbyPage"
import GameRoomPageTest from "./pages/GameRoomPageTest"
import WebSocketTestPage from "./pages/WebSocketTestPage"
import Navbar from "./components/Navbar"
import TestPage from "./pages/test"
import { AuthProvider } from "./context/AuthContext"
import GameRoomPage from "./pages/GameRoomPage"

// Layout component with Navbar
function Layout() {
    return (
        <div>
            <Navbar />  {/* ← ไม่ต้องส่ง props แล้ว จะใช้ useAuth ข้างใน */}
            <Outlet /> {/* แสดง child routes ตรงนี้ */}
        </div>
    )
}

// สร้างโครงสร้าง Route
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "register",
                element: <RegisterPage />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "lobby",
                element: <GameLobbyPage />,
            },
            {
                path: "room/test",
                element: <GameRoomPageTest />,
            },
            {
                path: "room/:roomId",
                element: <GameRoomPage />,
            },
            {
                path: "ws-test",
                element: <WebSocketTestPage />,
            },
            {
                path: "test",
                element: <TestPage />,
            }
        ],
    },

])

// App component
function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}

export default App