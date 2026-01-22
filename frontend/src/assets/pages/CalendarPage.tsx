import { motion } from 'framer-motion';
import CalendarComponent from '../components/CalendarComponent';

const CalendarPage = () => {
  return (
    <motion.div 
      // Animacja wejścia na stronę (płynne wyłanianie się)
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col space-y-6"
    >
      <div className="flex items-end justify-between px-4">
        <div>
          <h1 className="text-3xl font-bold text-[#F8F5F2] tracking-tight">
            Wielkie Arkany Czasu
          </h1>
          <p className="text-[#FFE9D6]/60 text-sm italic">
            Zapisuj swoje misje i obserwuj bieg przeznaczenia...
          </p>
        </div>
        
        <div className="text-right hidden md:block">
          <span className="text-xs uppercase tracking-[0.2em] text-white/30">Lokalizacja:</span>
          <p className="text-[#FFE9D6]/80 font-medium text-sm">Główna Biblioteka Akademii</p>
        </div>
      </div>

      {/* Główny kontener kalendarza */}
      <div className="flex-1 bg-white/2 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-6 shadow-2xl overflow-hidden">
        <CalendarComponent variant="full" />
      </div>

      <div className="flex gap-6 px-6 pb-2 text-[10px] uppercase tracking-widest text-white/40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"></span>
          <span>Wiedza (Mind)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
          <span>Trening (Physical)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.6)]"></span>
          <span>Wyprawy (Social)</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarPage;