import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/authContext'; // Importujemy context

const MainLayout = () => {
  const { user } = useAuth(); // Wyciągamy dane użytkownika

  return (
    <div className="flex h-screen w-full bg-[#121212] overflow-hidden text-[#F8F5F2]">
      <Sidebar />

      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Dekoracyjne tło */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-[#3A3E5B]/20 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />

        {/* Dynamiczny Nagłówek */}
        <header className="h-20 flex items-center justify-between px-8 z-10">
          {/* Powitanie po lewej */}
          <div className="hidden md:block">
            <h2 className="text-xl font-light text-white/90">
              Witaj, <span className="font-bold text-[#FFE9D6]">{user?.username || 'Adepcie'}</span>
            </h2>
          </div>

          {/* Status po prawej */}
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 backdrop-blur-sm">
            <div className="text-right">
              {/* Zakładamy, że user ma pole level, jeśli nie - na razie hardcode '1' */}
              <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Poziom {user?.stats?.level || 1}</p>
              <p className="text-sm font-medium">{user?.stats?.totalExp || 0} XP</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 relative z-10">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default MainLayout;