import React from 'react';
import { motion } from 'framer-motion';
import type { TaskItemProps } from '../types/rpgTypes';

export const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, isMini }) => {
  // Mapowanie kolorów kategorii
  const categoryColors: Record<string, string> = {
    Mind: 'text-blue-400',
    Physical: 'text-green-400',
    Social: 'text-pink-400',
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-all group"
    >
      {/* Custom Checkbox / Orb */}
      <button 
        onClick={() => onComplete(task.id)}
        className="w-5 h-5 border-2 border-[#FFE9D6]/30 rounded-md flex items-center justify-center group-hover:border-[#FFE9D6]/60 transition-colors bg-[#646cff]"
      >
        <div className="w-2 h-2 bg-[#FFE9D6] rounded-sm opacity-0 group-hover:opacity-20 transition-opacity" />
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isMini ? 'max-w-37.5' : ''}`}>
          {task.title}
        </p>
        <div className="flex gap-2 items-center">
          <span className={`text-[10px] font-bold ${categoryColors[task.category] || 'text-white/30'}`}>
            {task.category}
          </span>
          <span className="text-[10px] text-white/20">•</span>
          <span className="text-[10px] text-white/30">
            {task.priority} Priority
          </span>
        </div>
      </div>
    </motion.div>
  );
};