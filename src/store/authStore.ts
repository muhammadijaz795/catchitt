import create from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  _id: string | null;
  token: string | null;
  email: string | null;
  balance: number;
  name?: string | null;
  cache: any | null;
  selectedIndex: number | null;
  setIndex: (index: number) => void;
  selectedTab: number;
  setTab: (index: number) => void;
  settingsDropdown: boolean | null;
  setSettingsDropdown: (isOpen: boolean) => void;
  login: (email: string, token: string, _id: string, balance: number, name?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Check if a user is already logged in based on localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const _id = localStorage.getItem('_id');
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const cache = localStorage.getItem('cache');
  const balanceItem = localStorage.getItem('balance');
  const balance = balanceItem !== null ? parseFloat(balanceItem) : 0;
  const settingsDropdown = localStorage.getItem('settingsDropdown') === 'true';

  return {
    isLoggedIn,
    name: isLoggedIn ? name : '',
    email: isLoggedIn ? email : '',
    token: isLoggedIn ? token : '',
    _id: isLoggedIn ? _id : '',
    cache: isLoggedIn ? cache : '',
    balance,
    settingsDropdown,

    selectedIndex: 0,
    setIndex: (index: number) => {
      set({ selectedIndex: index });
      localStorage.setItem('selectedIndex', index.toString());
    },
    selectedTab: 1,
    setTab: (index: number) => {
      set({ selectedTab: index });
      localStorage.setItem('selectedTab', index.toString());
    },

    login: (email: string, token: string, _id: string, balance: number, name?: string) => {
      localStorage.setItem('token', token);
      localStorage.setItem('_id', _id);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('balance', balance.toString());
      if (name) {
        localStorage.setItem('name', name !== '' ? name : '');
        set({ isLoggedIn: true, name, balance, email, token, _id, selectedIndex: 0 });
      } else {
        set({ isLoggedIn: true, name: '', balance, email, token, _id, selectedIndex: 0 });
      }
    },
    logout: () => {
      set({ isLoggedIn: false, name: '', email: '', token: '', _id: '', balance: 0, cache: [] });
      localStorage.removeItem('token');
      localStorage.removeItem('_id');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('name');
      localStorage.removeItem('cache');
      localStorage.removeItem('balance');
    },
    setSettingsDropdown: (isOpen: boolean) => {
      set({ settingsDropdown: isOpen });
      localStorage.setItem('settingsDropdown', isOpen ? 'true' : 'false');
    },
  };
});
