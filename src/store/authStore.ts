import create from 'zustand';

interface AuthState {
    isLoggedIn: boolean;
    name?: string | null; // Make the name property optional
    token: string | null;
    email: string | null;
    cache: any | null;
    selectedIndex: number | null; // Define selectedIndex in your store
    setIndex: (index: number) => void;
    selectedTab: number; // Define selectedIndex in your store
    setTab: (index: number) => void;
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

        selectedIndex: 0, // Initialize selectedIndex
        setIndex: (index: number) => set({ selectedIndex: index }),

        selectedTab: 0,
        setTab: (index: number) => set({ selectedTab: index }),

        login: (email: string, token: string, name?: string, cache?: []) => {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('isLoggedIn', 'true');
            if (name) {
                sessionStorage.setItem('name', name);
                set({ isLoggedIn: true, name, email, token, selectedIndex: 0 }); // Reset selectedIndex to 0
            } else {
                set({ isLoggedIn: true, email, token, selectedIndex: 0 });
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
