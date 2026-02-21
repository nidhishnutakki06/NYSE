export const THEME = {
    colors: {
        background: '#09090B',
        card: '#18181B',
        primary: '#CBFB5E', // Volt Green
        text: {
            default: '#FFFFFF',
            muted: '#A1A1AA', // zinc-400
        }
    },
    animations: {
        buttonHover: 'hover:scale-105 transition-all duration-300',
        buttonGlow: 'hover:shadow-[0_0_15px_rgba(203,251,94,0.3)]',
    }
};

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    WORKOUT_LIBRARY: '/workouts',
    TRAINING_STUDIO: '/training',
    NUTRITION: '/nutrition',
    HABITS: '/habits',
    ANALYTICS: '/analytics',
};
