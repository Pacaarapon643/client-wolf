import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"
import { LoginSchema, type LoginInput } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUser } from "../api/auth";


const LoginPage = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema)
    })

    const onSubmit = async (data: LoginInput) => {
        try {
            const res = await LoginUser(data);
            navigate('/')
        } catch (error: any) {
            if (error.message === "record not found") {
                alert("ไม่พบผู้ใช้งาน");
            } else
                alert(error.message);
        }

    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 relative overflow-hidden">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] animate-slide-up">
                <h1 className="text-4xl text-center font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-[#FF4D00] animate-rainbow-text bg-[length:200%_auto] mb-8">
                    เข้าสู่ระบบ
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {/* email */}
                    <div className="flex flex-col gap-1">
                        <label className="text-white text-sm ml-1">อีเมล์</label>
                        <input
                            type="text"
                            {...register("email")}
                            className={`bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                            placeholder="กรอกอีเมล์ของคุณที่นี้"
                        />
                        {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
                    </div>
                    {/* pasword */}
                    <div className="flex flex-col gap-1">
                        <label className="text-white text-sm ml-1">รหัสผ่าน</label>
                        <input
                            type="password"
                            {...register("password")}
                            className={`bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                            placeholder="กรอกรหัสผ่านของคุณที่นี้"
                        />
                        {errors.password && <span className="text-red-400 text-xs">{errors.password.message}</span>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                    </button>
                </form>

            </div>
        </div>
    )
}

export default LoginPage