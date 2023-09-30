import create from 'zustand';

interface AuthState {
    isLoggedIn: boolean;
    _id: string | null;
    token: string | null;
    email: string | null;
    name?: string | null; // Make the name property optional
    cache: any | null;
    selectedIndex: number | null; // Define selectedIndex in your store
    setIndex: (index: number) => void;
    selectedTab: number; // Define selectedIndex in your store
    setTab: (index: number) => void;
    login: (email: string, token: string, _id: string, name?: string) => void; // Update the login function signature
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
    // Check if a user is already logged in based on session storage
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const _id = sessionStorage.getItem('_id');
    const email = sessionStorage.getItem('email');
    const token = sessionStorage.getItem('token');
    const name = sessionStorage.getItem('name');
    const cache = sessionStorage.getItem('cache');

    return {
        isLoggedIn,
        name: isLoggedIn ? name : '',
        email: isLoggedIn ? email : '',
        token: isLoggedIn ? token : '',
        _id: isLoggedIn ? _id : '',
        cache: isLoggedIn ? cache : '',

        selectedIndex: 0, // Initialize selectedIndex
        setIndex: (index: number) => set({ selectedIndex: index }),

        selectedTab: 1,
        setTab: (index: number) => set({ selectedTab: index }),

        login: (email: string, token: string, _id: string, name?: string) => {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('_id', _id);
            sessionStorage.setItem('isLoggedIn', 'true');
            if (name) {
              sessionStorage.setItem('name', name);
              set({ isLoggedIn: true, name, email, token, _id, selectedIndex: 0 }); // Reset selectedIndex to 0
            } else {
              set({ isLoggedIn: true, email, token, _id, selectedIndex: 0 });
            }
          },
          
        logout: () => {
            set({ isLoggedIn: false, name: '', email: '', token: '', _id: '', cache: [] });
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('_id');
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('cache');
        },
    };
});
