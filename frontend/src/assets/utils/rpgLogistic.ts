import type { LevelData } from '../types/rpgTypes';

export const calculateRank = (exp: number): LevelData => {
    const base_exp = 100;
    const level = Math.floor(Math.sqrt(exp/base_exp)) + 1;
    const min_level_exp = Math.pow(level -1, 2) * base_exp;
    const max_level_exp = Math.pow(level, 2) * base_exp - 1;
    const progress_percent = ((exp - min_level_exp) / (max_level_exp - min_level_exp)) * 100;
    return {
        level,
        progress: Math.min(Math.max(progress_percent, 0), 100),
        min_level_exp,
        max_level_exp
    };
}