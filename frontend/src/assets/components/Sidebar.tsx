import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Trophy, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/authContext';

const Sidebar = () => {
  const { logout } = useAuth();

  // Definicja linków dla łatwiejszego zarządzania
  const navLinks = [
    { to: '/', icon: <LayoutDashboard size={24} />, label: 'Dashboard' },
    { to: '/calendar', icon: <Calendar size={24} />, label: 'Kalendarz' },
    { to: '/stats', icon: <Trophy size={24} />, label: 'Statystyki' },
    { to: '/settings', icon: <Settings size={24} />, label: 'Ustawienia' },
  ];

  return (
    <aside className="w-20 md:w-64 h-screen bg-[#121212] border-r border-white/10 flex flex-col transition-all duration-300">
      {/* Logo / Ikona Akademii */}
      <div className="p-6 flex items-center justify-center md:justify-start gap-4">
        <div className="w-10 h-10 bg-[#FFE9D6] rounded-xl flex items-center justify-center text-[#3A3E5B] shadow-[0_0_15px_rgba(255,233,214,0.3)]">
          <span className="font-bold text-xl">L</span>
        </div>
        <span className="hidden md:block font-bold text-[#F8F5F2] tracking-wider uppercase text-sm">
          LifeLevel
        </span>
      </div>

      {/* Nawigacja */}
      <nav className="flex-1 px-4 mt-6 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `
              flex items-center justify-center md:justify-start gap-4 p-3 rounded-xl transition-all duration-300 group
              ${isActive 
                ? 'bg-[#FFE9D6]/10 text-[#FFE9D6] shadow-[inset_0_0_10px_rgba(255,233,214,0.05)]' 
                : 'text-white/40 hover:text-white/70 hover:bg-white/5'}
            `}
          >
            <div className="transition-transform group-hover:scale-110">
              {link.icon}
            </div>
            <span className="hidden md:block font-medium text-sm">
              {link.label}
            </span>
            {/* Mała kropka sygnalizująca aktywność tylko dla aktywnego linku */}
            <div className="absolute left-0 w-1 h-6 bg-[#FFE9D6] rounded-r-full opacity-0 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      {/* Przycisk Wyloguj na dole */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center md:justify-start gap-4 p-3 text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all group"
        >
          <LogOut size={24} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden md:block font-medium text-sm">Wyloguj</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;