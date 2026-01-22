import CalendarComponent from '../components/CalendarComponent';
import { useAuth } from '../context/authContext';
import { StatBars } from '../components/StatBars';
import { TaskList } from '../components/TaskList';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  console.log('Czy trwa autoryzacja: ', isLoading);
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#121212]">
        <p className="text-[#FFE9D6] animate-pulse tracking-widest uppercase text-xs">
          Wczytywanie profilu bohatera...
        </p>
      </div>
    );
  }
  if (!user) {
    return <div>Nie jesteś zalogowany.</div>;
  }
  console.log('Dane użytkownika w Dashboard:', user);
  return (
    <div className="h-full grid grid-cols-12 grid-rows-6 gap-6">
      
      {/* 1. SEKCJA STATYSTYK (Eliksiry) - Lewa kolumna */}
      <section className="col-span-12 lg:col-span-3 row-span-4 flex flex-col gap-4">
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-around">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#FFE9D6]/50 mb-4">Twoje Atrybuty</h3>
          
          <StatBars stats={user?.stats || null} />

          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
             <div className="text-center">
                <p className="text-[10px] text-white/30 uppercase">Streak</p>
                <p className="text-lg font-bold text-orange-400">{user?.stats?.currentStreak} 🔥</p>
             </div>
             <div className="text-center">
                <p className="text-[10px] text-white/30 uppercase">Total XP</p>
                <p className="text-lg font-bold text-[#FFE9D6]">{user?.stats?.totalExp}</p>
             </div>
          </div>
        </div>
      </section>

      {/* 2. MINI KALENDARZ - Środek */}
      <section className="col-span-12 lg:col-span-6 row-span-4 bg-white/2 border border-white/5 rounded-3xl p-2 overflow-hidden">
        <CalendarComponent variant="mini" />
      </section>

      {/* 3. TASK LISTA - Prawa strona */}
      <section className="col-span-12 lg:col-span-3 row-span-4 bg-[#1a1c2e]/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 overflow-hidden flex flex-col">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#FFE9D6]/50 mb-4 text-center lg:text-left">
          Zlecenia na dziś
        </h3>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <TaskList variant="mini" />
        </div>
        <Link to="/tasks" className="text-center text-[9px] uppercase tracking-widest text-[#FFE9D6]/30 hover:text-[#FFE9D6]/60 transition-colors mt-4 block">
          Pełny Dziennik →
        </Link>
      </section>

      {/* 4. WYKRESY PROGRESU - Cały dół */}
      <section className="col-span-12 row-span-2 bg-[#1a1a1a]/50 border border-white/5 rounded-3xl p-6 flex items-center justify-center text-white/20 italic">
        <div className="text-center">
           <p>Tutaj pojawią się Twoje wykresy progresu</p>
           <p className="text-[10px] mt-2">(Analiza generowana przez Python Analytics)</p>
        </div>
      </section>

    </div>
  );
};

export default Dashboard;