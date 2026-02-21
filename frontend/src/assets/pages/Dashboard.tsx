import CalendarComponent from '../components/CalendarComponent';
import { useAuth } from '../context/authContext';
import { StatBars } from '../components/StatBars';
import { TaskList } from '../components/TaskList';
import StatsChart from '../components/StatsChart';
import type {ChartDataPoint} from '../components/StatsChart';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getStatsHandler } from '../services/apiService';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    console.log("aaaaaaaaaaaaaaaaaaaaa Dashboard useEffect triggered. User:", user, "isLoading:", isLoading);
    const token = localStorage.getItem('token'); 

    const fetchStats = async () => {
      if (!token) return;

      try {
        const response = await getStatsHandler();
        console.log("Dashboard stats response:", response);

        if (Array.isArray(response)) {
          setChartData(response);
        }
      } catch (err: any) {
        console.error("Błąd Axios:", err.response?.data || err.message);
      }
    };

    fetchStats();
  }, []);

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
    return <div className="text-white p-10">Nie jesteś zalogowany.</div>;
  }

  return (
    <div className="min-h-screen lg:h-full grid grid-cols-1 lg:grid-cols-12 grid-rows-auto lg:grid-rows-6 gap-6 p-4 lg:p-0">
      
      {/* 1. SEKCJA STATYSTYK */}
      <section className="col-span-1 lg:col-span-3 lg:row-span-4 flex flex-col gap-4">
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

      {/* 2. MINI KALENDARZ */}
      <section className="col-span-1 lg:col-span-6 lg:row-span-4 bg-white/2 border border-white/5 rounded-3xl p-2 overflow-hidden h-[400px] lg:h-auto">
        <CalendarComponent variant="mini" />
      </section>

      {/* 3. TASK LISTA */}
      <section className="col-span-1 lg:col-span-3 lg:row-span-4 bg-[#1a1c2e]/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 overflow-hidden flex flex-col h-[400px] lg:h-auto">
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

      {/* 4. WYKRESY PROGRESU - TUTAJ WRZUCAMY KOMPONENT */}
      <section className="col-span-1 lg:col-span-12 lg:row-span-2 bg-[#1a1a1a]/50 border border-white/5 rounded-3xl overflow-hidden min-h-[250px]">
        {chartData.length > 0 ? (
          <StatsChart data={chartData} />
        ) : (
          <div className="h-full flex items-center justify-center text-white/20 italic">
             <div className="text-center">
                <p>Brak danych do analizy progresu</p>
                <p className="text-[10px] mt-2">(Wykonaj pierwsze zadania, aby Python wygenerował wykres)</p>
             </div>
          </div>
        )}
      </section>

    </div>
  );
};

export default Dashboard;