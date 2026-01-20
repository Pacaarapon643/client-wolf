import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '../schemas/auth';
import { useNavigate } from 'react-router';
import { registerUser } from '../api/auth';

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema)
    });

    const navigate = useNavigate();

    const onSubmit = async (data: RegisterInput) => {
        try {
            const response = await registerUser(data);
            console.log(response);
            alert("สมัครสมาชิกสำเร็จ! 🐺");
            navigate('/');
        } catch (err: any) {
            console.log(err.message);
            alert(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 relative overflow-hidden">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] animate-slide-up">

                <h1 className="text-4xl text-center font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-[#FF4D00] animate-rainbow-text bg-[length:200%_auto] mb-8">
                    สมัครสมาชิก
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {/* Username */}
                    <div className="flex flex-col gap-1">
                        <label className="text-white text-sm ml-1">ชื่อผู้ใช้</label>
                        <input
                            {...register("user_name")}
                            className={`bg-white/5 border ${errors.user_name ? 'border-red-500' : 'border-white/10'} p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                            placeholder="ตั้งชื่อนักล่าหมาป่าของคุณ"
                        />
                        {errors.user_name && <span className="text-red-400 text-xs">{errors.user_name.message}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label className="text-white text-sm ml-1">อีเมล</label>
                        <input
                            {...register("email")}
                            className={`bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                            placeholder="ตัวอย่าง: wolf@forest.com"
                        />
                        {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1">
                        <label className="text-white text-sm ml-1">รหัสผ่าน</label>
                        <input
                            type="password"
                            {...register("password")}
                            className={`bg-white/5 border ${errors.password ? 'border-red-500' : 'border-white/10'} p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                            placeholder="รหัสผ่านลับ..."
                        />
                        {errors.password && <span className="text-red-400 text-xs">{errors.password.message}</span>}
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-1">
                        <label className="text-white text-sm ml-1">ยืนยันรหัสผ่าน</label>
                        <input
                            type="password"
                            {...register("confirmPassword")}
                            className={`bg-white/5 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/10'} p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                            placeholder="กรอกรหัสผ่านอีกครั้ง"
                        />
                        {errors.confirmPassword && <span className="text-red-400 text-xs">{errors.confirmPassword.message}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'กำลังลงทะเบียน...' : 'เริ่มการผจญภัย'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;