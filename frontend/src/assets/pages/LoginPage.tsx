import React, { useState } from 'react';
import { useAuth } from '../context/authContext.tsx';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPage = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  
  // Dane formularza
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register(formData);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Coś poszło nie tak w trakcie rytuału...');
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-4">
      {/* Tło z poświatą Indigo Dusk */}
      <div className="absolute inset-0 bg-radial-gradient from-[#3A3E5B]/20 to-transparent pointer-events-none" />

      <motion.div 
        layout
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-4xl shadow-2xl z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">📜</h1>
          <h2 className="text-2xl font-bold text-[#F8F5F2]">
            {isLogin ? 'Dziennik Adepta' : 'Nowy Rekrut'}
          </h2>
          <p className="text-white/50 text-sm">
            {isLogin ? 'Wypowiedz swoje runy dostępu' : 'Zapisz się w księgach Akademii'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-xs uppercase tracking-widest text-[#FFE9D6]/70 mb-1 ml-1">Nazwa Adepta</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFE9D6]/50 transition-colors"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#FFE9D6]/70 mb-1 ml-1">E-mail</label>
            <input
              type="email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFE9D6]/50 transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#FFE9D6]/70 mb-1 ml-1">Hasło</label>
            <input
              type="password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFE9D6]/50 transition-colors"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {error && <p className="text-red-400 text-xs mt-2 ml-1">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#FFE9D6] text-[#3A3E5B] font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all mt-6 shadow-lg shadow-[#FFE9D6]/10"
          >
            {isLogin ? 'Wejdź do Akademii' : 'Rozpocznij Naukę'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white/40 text-sm hover:text-[#FFE9D6] transition-colors"
          >
            {isLogin ? 'Nie masz jeszcze konta? Zarejestruj się' : 'Masz już runy dostępu? Zaloguj się'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;