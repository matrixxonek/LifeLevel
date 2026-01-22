import type { CalendarTask } from './types';

export interface LevelData {
  level: number;
  progress: number;
  min_level_exp: number;
  max_level_exp: number;
}

export interface StatBarsProps {
  stats: {
    mindExp: number;
    physicalExp: number;
    socialExp: number;
  } | null;
}

export interface TaskItemProps {
  task: CalendarTask;
  onComplete: (id: string) => void;
  isMini?: boolean;
}