import create from 'zustand';

interface AuthState {
    isLoggedIn: boolean;
    name?: string | null; // Make the name property optional
    token: string | null;
    email: string | null;
    cache: any | null;
    login: (email: string, token: string, name?: string) => void; // Update the login function signature
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
    // Check if a user is already logged in based on session storage
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const email = sessionStorage.getItem('email');
    const token = sessionStorage.getItem('token');
    const name = sessionStorage.getItem('name');
    const cache = sessionStorage.getItem('cache');

    return {
        isLoggedIn,
        name: isLoggedIn ? name : '',
        email: isLoggedIn ? email : '',
        token: isLoggedIn ? token : '',
        cache: isLoggedIn ? cache : '',
        login: (email: string, token: string, name?: string, cache?: []) => {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('isLoggedIn', 'true');
            if (name) {
                sessionStorage.setItem('name', name);
                set({ isLoggedIn: true, name, email, token });
            } else {
                set({ isLoggedIn: true, email, token });
            }
        },
        logout: () => {
            set({ isLoggedIn: false, name: '', email: '', token: '', cache: [] });
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('cache');
        },
    };
});
