import create from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accountType: string | null;
  _id: string | null;
  token: string | null;
  email: string | null;
  balance: number;
  name: string | null;
  username: string | null;
  cache: any | null;
  selectedIndex: number | null;
  setIndex: (index: number) => void;
  selectedTab: number;
  setTab: (index: number) => void;
  settingsDropdown: boolean | null;
  setSettingsDropdown: (isOpen: boolean) => void;
  login: (email: string, accountType: string, token: string, _id: string, balance: number, username: string, name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get, api) => {
  // Check if a user is already logged in based on localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const accountType = localStorage.getItem('accountType');
  const _id = localStorage.getItem('_id');
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const username = localStorage.getItem('username');
  const cache = localStorage.getItem('cache');
  const balanceItem = localStorage.getItem('balance');
  const balance = balanceItem !== null ? parseFloat(balanceItem) : 0;
  const settingsDropdown = localStorage.getItem('settingsDropdown') === 'true';

  return {
    isLoggedIn,
    accountType: isLoggedIn ? accountType : null,
    name: isLoggedIn ? name : null,
    username: isLoggedIn ? username : null,
    email: isLoggedIn ? email : null,
    token: isLoggedIn ? token : null,
    _id: isLoggedIn ? _id : null,
    cache: isLoggedIn ? cache : null,
    balance,
    settingsDropdown,

    selectedIndex: null,
    setIndex: (index: number) => {
      set({ selectedIndex: index });
      localStorage.setItem('selectedIndex', index.toString());
    },
    selectedTab: 1,
    setTab: (index: number) => {
      set({ selectedTab: index });
      localStorage.setItem('selectedTab', index.toString());
    },

    login: (email: string, accountType: string, token: string, _id: string, balance: number, username: string, name: string) => {
      localStorage.setItem('token', token);
      localStorage.setItem('accountType', accountType);
      localStorage.setItem('_id', _id);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('balance', balance.toString());
      localStorage.setItem('email', email);
      localStorage.setItem('username', username);
      localStorage.setItem('name', name);
      set({ isLoggedIn: true, accountType, name, username, balance, email, token, _id, selectedIndex: 0 });
    },
    logout: () => {
      set({ isLoggedIn: false, accountType: null, name: null, username: null, email: null, token: null, _id: null, balance: 0, cache: null });
      localStorage.removeItem('token');
      localStorage.removeItem('accountType');
      localStorage.removeItem('_id');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('name');
      localStorage.removeItem('cache');
      localStorage.removeItem('balance');
      localStorage.removeItem('email');
      localStorage.removeItem('username');
    },
    setSettingsDropdown: (isOpen: boolean) => {
      set({ settingsDropdown: isOpen });
      localStorage.setItem('settingsDropdown', isOpen ? 'true' : 'false');
    },
  };
});
