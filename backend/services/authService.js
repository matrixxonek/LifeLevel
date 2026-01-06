import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePasswords = async(plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

export const generateToken = (user) => {
    return jwt.sign(
        {id: user.id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );
};