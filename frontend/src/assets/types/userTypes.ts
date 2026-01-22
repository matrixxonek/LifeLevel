export interface User {
  id: number;
  username: string;
  email: string;
  stats: Stats;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateStats: (newStats: Stats) => void;
}

export interface Stats {
  id: number;
  userId: string;
  level: number;
  totalExp: number;
  mindExp: number;
  physicalExp: number;
  socialExp: number;
  currentStreak: number;
  createdAt?: string;
  updatedAt?: string;
}