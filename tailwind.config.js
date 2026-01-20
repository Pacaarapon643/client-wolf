/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            dropShadow: {
                'glow': '0 0 20px rgba(255, 255, 255, 0.7)',
                'rainbow': [
                    '0 0 10px rgba(255, 0, 255, 0.5)',
                    '0 0 20px rgba(0, 255, 255, 0.3)',
                ]
            },

            fontFamily: {
                // ตั้งชื่อว่า 'kanit' (หรือชื่ออะไรก็ได้ตามใจชอบ)
                'kanit': ['Kanit', 'sans-serif'],
            },
            colors: {
                dark: {
                    900: '#0a0a0f',
                    800: '#1a1a2e',
                    700: '#16213e',
                }
            },

            keyframes: {
                'rainbow-text-animation': {
                    '0%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                    '100%': { 'background-position': '0% 50%' },
                },
                'rainbow-hue': {
                    'from': { 'filter': 'hue-rotate(0deg)' },
                    'to': { 'filter': 'hue-rotate(360deg)' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'floating': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' }, // ลอยขึ้นไป 15px แล้วกลับลงมา
                },
            },

            animation: {
                'rainbow-text': 'rainbow-text-animation 2s linear infinite',
                'rainbow-hue': 'rainbow-hue 2s linear infinite',
                'slide-up': 'slide-up 2s ease-out forwards',
                'floating': 'floating 3s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}