/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                wolf: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                },
                dark: {
                    900: '#0a0a0f',
                    800: '#1a1a2e',
                    700: '#16213e',
                }
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
                'twinkle': 'twinkle 8s ease-in-out infinite',
                'fade-in': 'fade-in 0.8s ease-out',
                'wolf-pulse': 'wolf-pulse 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-glow': {
                    '0%, 100%': {
                        opacity: '0.4',
                        transform: 'translate(-50%, -50%) scale(1)',
                    },
                    '50%': {
                        opacity: '0.7',
                        transform: 'translate(-50%, -50%) scale(1.1)',
                    },
                },
                twinkle: {
                    '0%, 100%': { opacity: '0.5' },
                    '50%': { opacity: '0.2' },
                },
                'fade-in': {
                    from: {
                        opacity: '0',
                        transform: 'translateY(30px)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                'wolf-pulse': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                },
            },
        },
    },
    plugins: [],
}
