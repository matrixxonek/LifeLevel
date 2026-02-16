import User from '../models/userModel.js';
import { Op } from 'sequelize';

export const getSyncTargets = async (req, res) => {
    try {
        // Pobieramy tylko ID i dane dostępowe, żeby nie przesyłać haseł itp.
        const users = await User.findAll({
            attributes: ['id', 'githubUsername', 'stravaAccessToken'],
            // Pobierz tylko tych, którzy mają przynajmniej jedno z nich
            where: {
                [Op.or]: [
                    { githubUsername: { [Op.ne]: null } },
                    { stravaAccessToken: { [Op.ne]: null } }
                ]
            }
        });
        res.json(users);
    } catch (error) {
        console.error("BŁĄD SEQUELIZE:", error); // To wypisze błąd w terminalu Node
        res.status(500).json({ error: error.message })
    }
};