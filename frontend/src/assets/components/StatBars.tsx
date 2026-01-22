import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { calculateRank } from '../utils/rpgLogistic';
import type {StatBarsProps} from '../types/rpgTypes';

const SingleBar = ({ name, exp, colors }: { name: string, exp: number, colors: string }) => {
  const { level, progress, max_level_exp } = useMemo(() => calculateRank(exp), [exp]);

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-1 text-[10px] uppercase tracking-widest text-white/50">
        <span className="font-bold text-white/80">{name} (Lvl {level})</span>
        <span>{exp} / {max_level_exp + 1} XP</span>
    </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`h-full bg-linear-to-r ${colors}`}
        />
      </div>
    </div>
  );
};

export const StatBars: React.FC<StatBarsProps> = ({ stats }) => {
  return (
    <div className="flex flex-col gap-4 lg:gap-6 p-2 lg:p-4 w-full">
      <SingleBar 
        name="Wiedza" 
        exp={stats?.mindExp || 0} 
        colors="from-blue-500 to-cyan-400" 
      />
      <SingleBar 
        name="Siła" 
        exp={stats?.physicalExp || 0} 
        colors="from-emerald-500 to-lime-400" 
      />
      <SingleBar 
        name="Relacje" 
        exp={stats?.socialExp || 0} 
        colors="from-fuchsia-500 to-pink-400" 
      />
    </div>
  );
};