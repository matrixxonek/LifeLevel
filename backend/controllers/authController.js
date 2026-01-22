import User from "../models/userModel.js";
import Stats from "../models/statsModel.js";
import sequelize from "../config/db.js";
import {hashPassword, comparePasswords, generateToken} from "../services/authService.js";


export const registerUser = async (req, res)=>{
    //wprowadza dane do bazy danych z nowym userem i do tabeli stats nowy wynik dla niego
    //generuje token i przekazuje na frontend?
    const t = await sequelize.transaction();
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await hashPassword(password);

        const newUser = await User.create(
            {username, email, password: hashedPassword}, {transaction: t}
        );
        await Stats.create({
            userId: newUser.id,
            level: 1,
            totalExp: 0,
            mindExp: 0,
            physicalExp: 0,
            socialExp: 0,
            currentStreak: 0
        }, { transaction: t });
        await t.commit();

        const token = generateToken(newUser);

        res.status(201).json({ token, user: { id: newUser.id, username } });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: error.message });
    }
}
export const loginUser = async (req, res)=>{
    //wysyła zapytanie o dane konkretnego usera, porównuje z tym co dostał w req poprzez bcrypt.compare

    //jak się zgadza to daje token
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ 
            where: { email },
            include: [{ model: Stats }] // Od razu pobierzemy level i XP
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await comparePasswords(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = generateToken(user);
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                stats: user.Stat // Dane z tabeli Stats
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getMe = async (req, res)=>{
    try {
        // req.user.id mamy z tokena dzięki middleware
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email'], // nie wysyłaj hasła!
            include: [{ model: Stats }] // od razu pobierz statystyki level/xp
        });
        
        if (!user) return res.status(404).json({ message: "User not found" });
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};