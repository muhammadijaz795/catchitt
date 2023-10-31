import create from 'zustand';

interface AuthState {
    isLoggedIn: boolean;
    _id: string | null;
    token: string | null;
    email: string | null;
    balance: number,
    name?: string | null; // Make the name property optional
    cache: any | null;
    selectedIndex: number | null; // Define selectedIndex in your store
    setIndex: (index: number) => void;
    selectedTab: number; // Define selectedIndex in your store
    setTab: (index: number) => void;
    settingsDropdown: boolean | null;
    setSettingsDropdown: (isOpen: boolean) => void;
    login: (email: string, token: string, _id: string, balance: number, name?: string) => void; // Update the login function signature
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
  const balanceItem = sessionStorage.getItem('balance');
  const balance = balanceItem !== null ? parseFloat(balanceItem) : 0;


  return {
      isLoggedIn,
      name: isLoggedIn ? name : '',
      email: isLoggedIn ? email : '',
      token: isLoggedIn ? token : '',
      _id: isLoggedIn ? _id : '',
      cache: isLoggedIn ? cache : '',
      balance, // Set balance as a number


      selectedIndex: 0,
      setIndex: (index: number) => set({ selectedIndex: index }),
      selectedTab: 1,
      setTab: (index: number) => set({ selectedTab: index }),
    settingsDropdown: false,
    setSettingsDropdown: (isOpen: boolean) => set({settingsDropdown: isOpen}),

      login: (email: string, token: string, _id: string, balance: number, name?: string) => {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('_id', _id);
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('balance', balance.toString())
          if (name) {
              sessionStorage.setItem('name', name !== '' ? name : '');
              set({ isLoggedIn: true, name, balance, email, token, _id, selectedIndex: 0 });
          } else {
              set({ isLoggedIn: true, name: '', balance, email, token, _id, selectedIndex: 0,  });
          }
      },
      logout: () => {
          set({ isLoggedIn: false, name: '', email: '', token: '', _id: '', balance: 0, cache: [] }); // Ensure balance is set as 0
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('_id');
          sessionStorage.removeItem('isLoggedIn');
          sessionStorage.removeItem('name');
          sessionStorage.removeItem('cache');
          sessionStorage.removeItem('balance');
      },
  };
});
