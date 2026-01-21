import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import Navbar from "./components/Navbar"

// Layout component with Navbar
function Layout() {
    return (
        <div>
            <Navbar
                isLoggedIn={false}
                username=""
                onLogout={() => console.log('Logout')}
            />
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
        ],
    },

])

// App component
function App() {
    return <RouterProvider router={router} />
}


export default App